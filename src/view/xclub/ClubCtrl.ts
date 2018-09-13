/*
* @author seacole
 * 俱乐部
*/
module club {
	export class ClubCtrl extends BaseCtrl {
		constructor() {
			super();
			this["name"] = "ClubCtrl";
		}

		private static _instance: ClubCtrl;
		public static get instance(): ClubCtrl {
			if (!this._instance)
				this._instance = new ClubCtrl();
			return this._instance;
		}

		protected _ui: ui.club.ClubUI;
		private _p: Laya.View;
		private _lastCid: number;
		private _curIndex: number
		private _curGame: number
		private _lastReqTime: number
		private _isGetMyClubCd: boolean;
		private _manager: boolean
		private _cur_cid: boolean
		private _game_list = []
		private _all_games = []
		private _game_page = []
		public show(p: Laya.View, cid?): void {
			this._p = p;
			if (cid) {
				this._cur_cid = cid
			}
			else {
				this._cur_cid = null
			}
			this.showself();
		}

        /**
         * 这里完成new ui，添加注册监听等初始化工作
         */
		public beforeShow(): void {
			if (!this._ui) {
				this._ui = new ui.club.ClubUI();

				// 俱乐部列表
				this._ui._club_list.itemRender = ClubHallListRenderer;
				this._ui._club_list.scrollBar.visible = false;
				this._ui._club_list.scrollBar.elasticDistance = 100;
				this._ui._club_list.renderHandler = new Laya.Handler(this, this.updateClubList);
				this._ui._club_list.array = [];
				this._ui._club_list.mouseHandler = new Laya.Handler(this, this.selectClubList);

				// 游戏桌子列表
				this._ui._desk_list.itemRender = ClubDeskRenderer;
				this._ui._desk_list.scrollBar.visible = false;
				this._ui._desk_list.scrollBar.elasticDistance = 100;
				this._ui._desk_list.renderHandler = new Laya.Handler(this, this.updateDeskList);
				this._ui._desk_list.array = [];
				this._ui._desk_list.mouseHandler = new Laya.Handler(this, this.selectDeskList);
				this._ui._desk_list.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollGameListChanged);

				// 游戏列表
				if (!this._curGame) {
					let key = "club_game_choice"
					this._curGame = parseInt(localStorage.getItem(key)) || 0;
				}
				this._game_list = []
				for (var k in GameConfig.SHOW_GAME) {
					for (var n in GameDef.GAME_NAME) {
						if (GameDef.GAME_NAME[n] == k) {
							let type = parseInt(n) + 1

							let name = GameDef.GAME_NAME[type - 1]
							let createInfo = GameConfig.getCreateInfoByGameName(name)
							if (createInfo)
								this._game_list.push({ type: type, name: createInfo.ch_name })
						}
					}
				}
				this._ui._game_name_list.itemRender = ClubGameNameRenderer;
				this._ui._game_name_list.scrollBar.visible = false;
				this._ui._game_name_list.scrollBar.elasticDistance = 100;
				this._ui._game_name_list.renderHandler = new Laya.Handler(this, this.updateGameNameList);
				this._ui._game_name_list.array = this._game_list;
				this._ui._game_name_list.mouseHandler = new Laya.Handler(this, this.selectGameNameList);
				this._ui._game_name_list.visible = this._game_list.length > 1

				EventManager.instance.registerOnObject(this, this._ui._btn_back, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_add, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_join_fast, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_switch, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_members, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_setting, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_record, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_charge, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_statistics, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_buy, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_LIST, this, this.onUpdateClubListData);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_GAMES_LIST, this, this.onUpdateGameListData);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_MEMBERS_LIST, this, this.checkManager);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_DIAMOND, this, this.updateClubInfo);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_REVIVW_MEMBERS_LIST, this, this.onUpdateReviewMembersListData);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_DELETE_SUCC, this, this.onDeleteClub);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_QUIT_SUCC, this, this.onDeleteClub);
			}
			super.beforeShow();
			this.onShow();
		}

        /**
        * 开启监听，配置宽高，添加到舞台
        */
		public onShow(): void {
			if (!this._ui.parent) {
				if (this._p) {
					this._p.addChild(this._ui);
				}
				this._ui.zOrder = 1;
			}
			this._curIndex = 0
			this._ui._btn_join_fast.visible = true
			this._ui._manager.visible = false;
			this._ui._btn_buy.visible = false;
			this._ui._btn_statistics.visible = false;
			this._ui._btn_setting.visible = this._ui._btn_charge.visible = false
			this._ui._btn_switch.skin = "club/img/img_switch_2.png"
			super.onShow(4);
			this.onResize();
			this.onUpdateClubListData();
			this.startTimer()

			// if (this._lastCid || !this._isGetMyClubCd) {
			// 	this._ui._btnCreate.visible = this._ui._btnJoin.visible = false;
			// 	ClubManager.getMyClub();
			// 	this._isGetMyClubCd = true;
			// 	Laya.timer.once(5000, this, () => {
			// 		this._isGetMyClubCd = false;
			// 	});
			// }
			// this._curIndex = this._curIndex || 0
			// this.onChoiceClub()
			// if (this._lastCid)
			// 	MyClubCtrl.instance.show(this._lastCid);
			// this.manager = false
		}

		protected onResize(): void {
			this._ui.height = AppControl.getInstance().stage.height;
			this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			if (this._uiMask) {
				this._uiMask.height = AppControl.getInstance().stage.height;
				this._uiMask.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			}
			this._ui.centerX = 0
			this._ui.centerY = 0
		}
        /**
         * 离开时调度
         */
		public afterShow(): void {
			super.afterShow();
		}

		public hide(): void {
			this._lastCid = 0;
			this.stopTimer()
			super.hide();
		}

		private startTimer(): void {
			this.stopTimer();
			Laya.timer.loop(10 * 1000, this, this.onTimer);
		}

		private stopTimer(): void {
			Laya.timer.clear(this, this.onTimer);
		}

		private onTimer(): void {
			ClubManager.getMyClub()
			// if (this._lastCid) {
			// 	ClubManager.getGameList(this._lastCid, 1)
			// 	ClubManager.getInfo(this._lastCid)
			// 	ClubManager.getReviewList(this._lastCid)
			// }
		}

		public addChild(node: Laya.Node): void {
			this._ui.addChild(node);
		}

		private onTouch(e: Laya.Event): void {
			switch (e.currentTarget) {
				case this._ui._btn_back:
					this.hide()
					break;
				case this._ui._btn_add:
					ClubJoin.instance.show()
					break;
				case this._ui._btn_join_fast:
					this.joinFast()
					break;
				case this._ui._btn_switch:
					if (this._ui._manager.visible) {
						this._ui._manager.visible = false
						this._ui._btn_join_fast.visible = true
						this._ui._btn_switch.skin = "club/img/img_switch_2.png"
					}
					else {
						this._ui._manager.visible = true
						this._ui._btn_join_fast.visible = false
						this._ui._btn_switch.skin = "club/img/img_switch_1.png"
					}
					break;
				case this._ui._btn_members:
					ClubMemberManagerCtrl.instance.showMemberList(this._lastCid)
					break;
				case this._ui._btn_setting:
					club.ClubCreate.instance.show(this._lastCid);
					break;
				case this._ui._btn_record:
					ClubMemberManagerCtrl.instance.showRecordList(this._lastCid)
					break;
				case this._ui._btn_charge:
					ClubRecharge.instance.show(this._lastCid)
					break;
				case this._ui._btn_buy:
					ClubShopCtrl.instance.show()
					break;
				case this._ui._btn_statistics:
					ClubStatistics.instance.show(this._lastCid)
					break;
			}
		}

		private onUpdateMembersListData() {

		}

		private checkManager() {
			let club = ClubManager.getClubByCid(this._lastCid);
			if (!club) {
				return
			}
			let members = club.members
			if (!members) {
				return
			}
			// this.manager = false
			let uid = GameLogic.selfData.uid;
			for (let i = 0; i < members.length; i++) {
				for (var j = 0; j < members[i].length; j++) {
					if (members[i][j].uid == uid) {
						let lastCheck = this.manager
						this.manager = ClubManager.isCreator(members[i][j].role)
						if (!lastCheck && this.manager) {
							this._ui._manager.visible = true
							this._ui._btn_join_fast.visible = false
							this._ui._btn_switch.skin = "club/img/img_switch_1.png"
						}
						break
					}
				}
			}
		}

		private set manager(value: boolean) {
			this._manager = value
			this._ui._btn_setting.visible = this._ui._btn_charge.visible = this._ui._btn_statistics.visible = value
			if (!GameConfig.IS_IOS_EXAMINE) {
				this._ui._btn_buy.visible = value
			}
		}

		private get manager() {
			return this._manager
		}

		public get lastCid(): number {
			return this._lastCid;
		}

		//******************************************  俱乐部列表刷新选中方法 *****************************************
		private onUpdateClubListData(): void {
			if (ClubManager.myClubs && ClubManager.myClubs.length) {
				this._ui._club_list.array = ClubManager.myClubs;
			}
			else {
				this._ui._club_list.array = [];
			}
			if (this._ui._club_list.array.length > 0) {
				this._curIndex = this._curIndex || 0
				this.onChoiceClub()
			}

			if (this._cur_cid) {
				let showChoice = false
				for (let i = 0; i < this._ui._club_list.array.length; i++) {
					let info = this._ui._club_list.array[i]
					if (info.cid == this._cur_cid) {
						this._curIndex = i
						break
					}
					showChoice = showChoice || (info.cid && info.cid > 0)
				}
				if (showChoice) {
					this.onChoiceClub()
				}
			}
		}

		/***渲染单元格时的回调方法***/
		protected updateClubList(cell: ClubHallListRenderer, index: number): void {
			cell.updata();
		}

		// 点击某一俱乐部
		private selectClubList(e: Laya.Event, index: number): void {
			if (e.type == Laya.Event.CLICK) {
				if (this._curIndex == index)
					return
				this._curIndex = index
				this._cur_cid = null
				this.manager = false
				this.onChoiceClub()
			}
		}

		// 选中当前俱乐部
		private onChoiceClub(): void {
			let index = this._curIndex
			let time = new Date().getTime()
			this._lastReqTime = this._lastReqTime || 0
			if (this._lastCid == this._ui._club_list.array[index].cid && time - this._lastReqTime < 8 * 1000) {
				return
			}
			if (this._lastCid != this._ui._club_list.array[index].cid)
				this._game_page = [1]
			this._lastReqTime = time
			this._lastCid = this._ui._club_list.array[index].cid
			let club = ClubManager.getClubByCid(this._lastCid);
			// 俱乐部信息
			if (club.notice) {
				this.updateClubInfo()
			}
			else {
				ClubManager.getInfo(this._lastCid)
			}
			// 玩家列表
			let members = club.members
			if (members && members.length > 0) {
				this.checkManager()
			}
			else {
				ClubManager.getMemberList(this._lastCid, 1)
			}
			// 游戏列表
			let games = club.games
			// if (games && games.length > 0) {
			//     this.onUpdateGameListData()
			// }
			// else {
			if (this._game_page.length <= 0)
				this._game_page = [1]
			if (this._curGame > this._game_list.length)
				this._curGame = 0
			let game = this._game_list[this._curGame]
			let gtype = game.type
			for (let page of this._game_page) {
				ClubManager.getGameList(this._lastCid, gtype, page)
			}
			// }
			let infos = this._ui._club_list.array
			for (let i = 0; i < infos.length; i++) {
				let info = infos[i]
				let choice = (index == i) ? 1 : 0
				info.choice = choice
			}
			this._ui._club_list.array = infos
		}


		//刷新俱乐部信息
		private updateClubInfo(): void {
			let info = this._ui._club_list.array[this._curIndex]
			if (!info) {
				return
			}

			this._ui._lb_clubid.text = info.cid
			if (info.notice) {
				this._ui._lb_notice.text = info.notice
			}
		}

		// 刷新俱乐部管理信息
		private updateClubManager(): void {

		}

		// private getGameList(cid) {
		// 	if (cid && cid != this._lastCid) {
		// 		return
		// 	}

		// }
		//******************************************  桌子列表刷新选中方法 *****************************************
		// 刷新游戏桌的游戏列表
		private onUpdateGameListData(): void {
			if (!this._lastCid) {
				return
			}
			let club = ClubManager.getClubByCid(this._lastCid);
			if (!club) {
				log("CAN NOT FIND CLIUB" + this._lastCid)
				return
			}
			let games = club.games || []
			// log(games)
			let oneGame = this._ui._game_name_list.array.length <= 1
			let value = this._ui._game_name_list.array[this._curGame]
			let curType = value ? value.type : 0
			let infos = [{ create: 1, max_player: GameDef.CLUB_DESK_PLAYER_CNT[curType] }]
			let uids = []
			this._all_games = []
			for (let info of games) {
				let data = this.dealDeskInfo(info)
				log(data)
				this._all_games.push(data)
				if (oneGame || data.gtype.toString() == curType) {
					infos.push(data)
				}
				//uids.push(this.dealDeskInfo(info).uids)
				data.uids.forEach(uid => {
					uids.push(uid)
				});
			}

			webService.getUserInfos(uids, (response) => {
				this._ui._desk_list.array = infos
			})
		}

		private onScrollGameListChanged(): void {
			let offset = 1400
			let last_page = []
			for (let i = 0; i < this._game_page.length; i++)
				last_page.push(this._game_page[i])
			this._game_page = []
			let start = this._ui._desk_list.scrollBar.value
			let end = start + 908
			let page1 = Math.floor(start / 1400)
			let page2 = Math.floor(end / 1400)
			for (let i = page1; i <= page2; i++) {
				this._game_page.push(i + 1)
			}
			let game = this._game_list[this._curGame]
			let gtype = game.type
			for (let page of this._game_page) {
				if (last_page.indexOf(page) < 0)
					ClubManager.getGameList(this._lastCid, gtype, page)
			}
		}

		protected dealDeskInfo(data) {
			let info
			info = Utils.deepCopy(data, info)
			let ruleStr = info.grule
			let rule = ruleStr.split('\"')
			for (let i = 0; i < rule.length; i++) {
				if (i % 2 == 0) {
					rule[i] = parseInt(rule[i].slice(1, -1))
				}
			}
			rule.splice(0, 1)
			info.rule = []
			let index = 0
			while (rule[index]) {
				let key = rule[index]
				let value = rule[index + 1]
				if (key != "gps" && key != "charge_type") {
					let tmp = { key: key, value: value }
					info.rule.push(tmp)
				}
				index = index + 2
			}

			// 处理uid
			info.uids = []
			let players = info.players || ""
			info.uids = players.split("|")
			for (let i = info.uids.length - 1; i >= 0; i--) {
				if (info.uids[i] == "") {
					info.uids.splice(i, 1)
				}
			}
			log(info)
			return info
		}

		/***渲染单元格时的回调方法***/
		protected updateDeskList(cell: ClubDeskRenderer, index: number): void {
			cell.updata();
		}

		// 点击桌子 第一张默认为创建
		private selectDeskList(e: Laya.Event, index: number): void {
			if (e.type == Laya.Event.CLICK) {
				if (index == 0) {
					CreateRoomCtrl.instance.show(this._lastCid, 1)
				}
				else {
					this.showDeskRule(index)
				}
			}
		}


		private showDeskRule(index) {
			let data = this._ui._desk_list.array[index]
			ClubDeskInfo.instance.show(data)
		}

		private joinFast() {
			let club = ClubManager.getClubByCid(this._lastCid);
			let games = this._ui._desk_list.array
			let canJoin = false
			for (let i = 1; i < games.length; i++) {
				let info = games[i]
				let max_player = 0
				for (let v of info.rule) {
					if (v.key == "max_player") {
						max_player = v.value
					}
				}
				if (info.uids.length < max_player) {
					canJoin = true
					ClubManager.joinRoom(parseInt(info.code))
				}
			}
			if (!canJoin) {
				AlertInGameCtrl.instance.show(GameConfig.language.join_fail_1, null, 0, false);
			}
		}

		private onUpdateReviewMembersListData() {
			let club = ClubManager.getClubByCid(this._lastCid)
			this._ui._tips.visible = false
			this._ui._tips_dot.visible = false
			if (!this.manager) {
				return
			}
			if (club.reviewMembers && club.reviewMembers.length > 0) {
				this._ui._tips.visible = true
				this._ui._tips_dot.visible = true
			}
		}

		protected onDeleteClub(cid) {
			if (this._ui._club_list.array.length <= 0) {
				this.hide()
			}
			if (this._ui._club_list.array.length == 1 && this._ui._club_list.array[0].cid == cid) {
				this.hide()
			}
			this._curIndex = 0
			this.onChoiceClub()
		}

		/***渲染单元格时的回调方法***/
		protected updateGameNameList(cell: ClubGameNameRenderer, index: number): void {
			let k = this._curGame == index ? 2 : 1
			cell.update(k);
		}

		private selectGameNameList(e: Laya.Event, index: number): void {
			if (e.type == Laya.Event.CLICK) {
				this._curGame = index
				let key = "club_game_choice"
				localStorage.setItem(key, this._curGame.toString())
				this._ui._game_name_list.array = this._game_list

				let value = this._ui._game_name_list.array[this._curGame]
				let curType = value ? value.type : 0
				let infos = [{ create: 1, max_player: GameDef.CLUB_DESK_PLAYER_CNT[curType] }]
				// for (let i = 0; i < this._all_games.length; i++) {
				// 	let data = this._all_games[i]
				// 	if (data.gtype == curType) {
				// 		infos.push(data)
				// 	}
				// }
				this._game_page = [1]
				let game = this._game_list[this._curGame]
				let gtype = game.type
				for (let page of this._game_page) {
					ClubManager.getGameList(this._lastCid, gtype, page)
				}

				this._ui._desk_list.array = infos
			}
		}
	}
	export class ClubGameNameRenderer extends ui.club.ClubGameNameRendererUI {
		constructor() {
			super()
		}

		public update(key) {
			this._button.skin = "club/button/sBtn_game_" + key + ".png"
			this._lb_name.text = this.dataSource.name
		}
	}

}
