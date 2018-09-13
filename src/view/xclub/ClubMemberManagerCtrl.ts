/*
* @author seacole
 * 俱乐部创建
*/
module club {


	export class ClubMemberManagerCtrl extends BaseCtrl {

		private static CtrlType = {
			TYPE_MEMBER_LIST: 1,			//成员列表
			TYPE_SHENHE_MEMBER_LIST: 2,		//审核列表
			TYPE_RECORD_LIST: 3,			//记录列表
			TYPE_SEARCH_MEMBER_LIST: 4,		//查找成员的列表
			TYPE_RECORD_DETAIL: 5,          //记录详情
		}
		constructor() {
			super();
			this["name"] = "ClubMemberManagerCtrl";
		}
		private _ctrlType = ClubMemberManagerCtrl.CtrlType.TYPE_MEMBER_LIST
		private static _instance: ClubMemberManagerCtrl;
		private _refreshMembersFirstPage: boolean;
		private _refreshMembersMore: boolean;
		private _refreshResultsMore: boolean;
		private _refreshResultsFirstPage: boolean;
		private _cid: number;
		private _myClub: any;
		private _isManager = false
		private _lastUid: any
		private _detailTotal
		private _record_playersArr
		private _record_gtype
		static get instance(): ClubMemberManagerCtrl {
			if (!this._instance)
				this._instance = new ClubMemberManagerCtrl();
			return this._instance;
		}

		protected _ui: ui.club.ClubMemberListViewUI;

		public showMemberList(cid: number): void {
			this._ctrlType = ClubMemberManagerCtrl.CtrlType.TYPE_MEMBER_LIST
			this._cid = cid;
			this._myClub = ClubManager.getClubByCid(this._cid);
			ClubManager.getMemberList(this._myClub.cid, 1);
			this.showself();
			this.changeContntByType()
		}
		public showReviewMemberList(cid: number): void {
			this._ctrlType = ClubMemberManagerCtrl.CtrlType.TYPE_SHENHE_MEMBER_LIST
			// this._cid = cid;
			this._cid = cid;
			// this._myClub = ClubManager.getClubByCid(this._cid);
			ClubManager.getReviewList(this._cid)
			this.showself();
			this.changeContntByType()
		}
		public showRecordList(cid: number): void {
			this._ctrlType = ClubMemberManagerCtrl.CtrlType.TYPE_RECORD_LIST
			this._cid = cid;
			// this._myClub = ClubManager.getClubByCid(this._cid);
			this._myClub = ClubManager.getClubByCid(this._cid);
			ClubManager.getResultList(this._myClub.cid, 1);
			this.showself();
			this.changeContntByType()
		}
		public showSearchMemberList(cid: number): void {
			this._ctrlType = ClubMemberManagerCtrl.CtrlType.TYPE_SEARCH_MEMBER_LIST
			this._cid = cid;
			this._myClub = ClubManager.getClubByCid(this._cid);

			this.showself();
			this.changeContntByType()
		}
		public beforeShow(): void {
			if (!this._ui) {
				this._ui = new ui.club.ClubMemberListViewUI();

				this._ui._listMember.itemRender = ClubListMemberRenderer;
				this._ui._listMember.array = []
				this._ui._listMember.scrollBar.visible = false;
				this._ui._listMember.scrollBar.elasticDistance = 100;
				this._ui._listMember.selectEnable = true;
				this._ui._listMember.renderHandler = new Laya.Handler(this, this.updateMemberList);
				this._ui._listMember.mouseHandler = new Laya.Handler(this, this.selectMemberList);
				this._ui._listMember.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollMemberChanged);

				this._ui._listReview.itemRender = ClubListReviewMemberRenderer;
				this._ui._listReview.scrollBar.visible = false;
				this._ui._listReview.scrollBar.elasticDistance = 100;
				this._ui._listReview.selectEnable = true;
				this._ui._listReview.array = []
				this._ui._listReview.renderHandler = new Laya.Handler(this, this.updateMemberReviewList);
				this._ui._listReview.mouseHandler = new Laya.Handler(this, this.selectReviewMemberList);
				this._ui._listReview.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollResultChanged);

				this._ui._listRecord.itemRender = ClubListRecordRenderer;
				this._ui._listRecord.scrollBar.visible = false;
				this._ui._listRecord.scrollBar.elasticDistance = 100;
				this._ui._listRecord.selectEnable = true;
				this._ui._listRecord.renderHandler = new Laya.Handler(this, this.updateReconrdList);
				this._ui._listRecord.mouseHandler = new Laya.Handler(this, this.selectRecordList);
				this._ui._listRecord.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollResultChanged);

				this._ui._listSearchMember.itemRender = ClubListMemberRenderer;
				this._ui._listSearchMember.scrollBar.visible = false;
				this._ui._listSearchMember.scrollBar.elasticDistance = 100;
				this._ui._listSearchMember.selectEnable = true;
				this._ui._listSearchMember.array = []
				this._ui._listSearchMember.renderHandler = new Laya.Handler(this, this.updateSearchMemberList);
				this._ui._listSearchMember.mouseHandler = new Laya.Handler(this, this.selectMemberList);
				//this._ui._lstSearchMember.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollResultChanged);


				this._ui._listDetail.itemRender = MenuHistoryDetailRenderer;
				this._ui._listDetail.scrollBar.visible = false;
				this._ui._listDetail.selectEnable = true;
				this._ui._listDetail.renderHandler = new Laya.Handler(this, this.updateRecordListDetail);
				this._ui._listDetail.mouseHandler = new Laya.Handler(this, this.onSelectRecordDetail);

				TextRender.WID = 860 / 6
				this._ui._record_players.itemRender = TextRender
				this._ui._record_players.array = []
				this._ui._record_players.renderHandler = new Laya.Handler(this, (cell: TextRender, idx: number) => {
					cell.updata(idx)
				})


				EventManager.instance.registerOnObject(this, this._ui._btnDrcy, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btnCzcy, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btnDsh, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btnTjcy, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btnQuit, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btnBack, Laya.Event.CLICK, this, this.hide);
				EventManager.instance.registerOnObject(this, this._ui._mask, Laya.Event.CLICK, this, this.hide);


				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_MEMBERS_LIST, this, this.onUpdateMembersList);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_REVIEW_AGREE_SUCC, this, this.onAgreeSucc);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_REVIVW_MEMBERS_LIST, this, this.onUpdateReviewMembersList);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_RESULTS_LIST, this, this.onUpdateClubResultsList);

				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_SEARCH_MEMBER_LOCAL_SUCC, this, this.onUpdateSearchMembersList);

			}
			super.beforeShow();
			this.onShow();
		}
		/***渲染单元格时的回调方法***/
		private updateMemberList(cell: ClubListMemberRenderer, index: number): void {
			if (this._myClub.memberList && this._myClub.memberList.length) {
				cell.updata(this._myClub.memberList);
			}

		}
		private updateReconrdList(cell, index: number): void {
			cell.updata(index);
		}
		private updateMemberReviewList(cell: ClubListReviewMemberRenderer, index: number): void {
			cell.updata();
		}

		private updateSearchMemberList(cell: ClubListMemberRenderer, index: number) {
			if (this._myClub.memberList && this._myClub.memberList.length) {
				cell.updata(this._myClub.memberList);
			}

		}
		private onAgreeSucc() {
			ClubManager.getMemberList(this._myClub.cid, 1);
		}
		private onUpdateReviewMembersList(cid: number) {
			if (this._myClub.cid == cid) {
				this._ui._listReview.array = this._myClub.reviewMembers;
			}
		}
		private onUpdateMembersList(cid: number): void {
			if (this._myClub.cid == cid) {
				let memberList = []
				for (let i = 0; i < this._myClub.members.length; i++) {
					for (var j = 0; j < this._myClub.members[i].length; j++) {
						memberList.push(this._myClub.members[i][j])
					}

				}

				this._myClub.memberList = memberList
				this._ui._listMember.array = this._myClub.memberList;
				this.checkManager()
				this._ui._btnTjcy.visible = this._ui._btnDrcy.visible = this._ui._btnDsh.visible = this._ui._btnCzcy.visible = this._isManager
				this._ui._btnQuit.visible = !this._isManager
			}
		}
		private onUpdateSearchMembersList(cid: number) {
			if (this._myClub.cid == cid) {
				if (this._lastUid) {
					let club = ClubManager.getClubByCid(this._cid);
					if (!club) {
						return
					}
					let members = club.members
					let data = []
					for (let i = 0; i < members.length; i++) {
						for (var j = 0; j < members[i].length; j++) {
							if (members[i][j].uid == this._lastUid) {
								//查到
								data.push(this._myClub.members[i][j])
								this._ui._listSearchMember.array = data;
								break
							}
						}
					}
				}
			}
		}
		public changeContntByType() {
			//根据type做隐藏处理
			if (this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_MEMBER_LIST) {
				this._ui._btnTjcy.visible = this._ui._btnDrcy.visible = this._ui._btnDsh.visible = this._ui._btnCzcy.visible =
					this._ui._labelZhushi.visible = this._ui._boxAcceptInvite.visible = this._ui._btnQuit.visible = false
				this._ui._boxRecord.visible = this._ui._listReview.visible = this._ui._listRecord.visible = this._ui._listSearchMember.visible = false
				this._ui._listMember.visible = true
				this._ui._listDeatilBox.visible = false
				this._ui._title.skin = "club/img/img_tile_member.png"
			}
			else if (this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_SHENHE_MEMBER_LIST) {
				this._ui._btnTjcy.visible = this._ui._btnDrcy.visible = this._ui._btnDsh.visible = this._ui._btnCzcy.visible = this._ui._btnQuit.visible = false
				this._ui._boxRecord.visible = this._ui._listMember.visible = this._ui._listRecord.visible = this._ui._listSearchMember.visible = false
				this._ui._labelZhushi.visible = this._ui._boxAcceptInvite.visible = false
				this._ui._listReview.visible = true
				this._ui._listDeatilBox.visible = false
				this._ui._title.skin = "club/img/img_tile_requst.png"

			}
			else if (this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_RECORD_LIST) {
				this._ui._btnTjcy.visible = false
				this._ui._btnDrcy.visible = false
				this._ui._btnDsh.visible = false
				this._ui._btnCzcy.visible = false
				this._ui._btnQuit.visible = false
				this._ui._listMember.visible = this._ui._listReview.visible = this._ui._listSearchMember.visible =
					this._ui._labelZhushi.visible = this._ui._boxAcceptInvite.visible = false
				this._ui._listRecord.visible = true
				this.checkManager()
				this._ui._boxRecord.visible = this._isManager
				this._ui._listDeatilBox.visible = false
				this._ui._title.skin = "club/img/img_tile_record.png"
				clubWebService.getClubGamesInfo(this._cid, this.onGetClubGamesInfo.bind(this));
			}
			else if (this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_RECORD_DETAIL) {
				this._ui._btnTjcy.visible = this._ui._btnDrcy.visible = this._ui._btnDsh.visible = this._ui._btnCzcy.visible = this._ui._btnQuit.visible = false
				this._ui._listMember.visible = this._ui._listReview.visible =
					this._ui._labelZhushi.visible = this._ui._boxAcceptInvite.visible = false
				this._ui._boxRecord.visible = this._ui._listRecord.visible = false
				this._ui._listDeatilBox.visible = true
				this._ui._title.skin = "club/img/img_tile_record.png"
			}
			else if (this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_SEARCH_MEMBER_LIST) {
				this._ui._btnTjcy.visible = this._ui._btnDrcy.visible = this._ui._btnDsh.visible = this._ui._btnCzcy.visible =
					this._ui._labelZhushi.visible = this._ui._boxAcceptInvite.visible = this._ui._btnQuit.visible = false
				this._ui._boxRecord.visible = this._ui._listReview.visible = this._ui._listRecord.visible = this._ui._listMember.visible = false
				this._ui._listSearchMember.visible = true
				this._ui._title.skin = "club/img/img_tile_member.png"
			}
			// this._myClub = ClubManager.getClubByCid(this._cid);
			// for (var index = 0; index < array.length; index++) {
			// 	var element = array[index];

			// }
			this.checkManager()
			if (this._ctrlType != ClubMemberManagerCtrl.CtrlType.TYPE_RECORD_DETAIL && this._ctrlType != ClubMemberManagerCtrl.CtrlType.TYPE_RECORD_LIST) {
				this._ui._btnTjcy.visible = this._ui._btnDrcy.visible = this._ui._btnDsh.visible = this._ui._btnCzcy.visible = this._isManager
				this._ui._btnQuit.visible = !this._isManager
			}
			//}
		}
		private checkManager() {
			let club = ClubManager.getClubByCid(this._cid);
			if (!club) {
				return
			}
			let members = club.members
			let uid = server.uid
			for (let i = 0; i < members.length; i++) {
				for (var j = 0; j < members[i].length; j++) {
					if (members[i][j].uid == uid) {
						this._isManager = ClubManager.isCreator(members[i][j].role)
						break
					}
				}
			}
		}
		private onScrollMemberChanged(e): void {
			if (this._ui._listMember.scrollBar.value < 0)
				this._refreshMembersFirstPage = true;
			else if (this._ui._listMember.scrollBar.value > 0)
				this._refreshMembersFirstPage = false

			if (this._refreshMembersFirstPage && this._ui._listMember.scrollBar.value == 0)
				ClubManager.getMemberList(this._myClub.cid, 1);

			if (this._ui._listMember.scrollBar.value > this._ui._listMember.scrollBar.max)
				this._refreshMembersMore = true;
			else if (this._ui._listMember.scrollBar.value < this._ui._listMember.scrollBar.max)
				this._refreshMembersMore = false

			if (this._refreshMembersMore && this._ui._listMember.scrollBar.value == this._ui._listMember.scrollBar.max)
				ClubManager.getMemberList(this._myClub.cid);
		}
		private onScrollResultChanged(e): void {
			if (this._ui._listRecord.scrollBar.value < 0)
				this._refreshResultsFirstPage = true;
			else if (this._ui._listRecord.scrollBar.value > 0)
				this._refreshResultsFirstPage = false

			if (this._refreshResultsFirstPage && this._ui._listRecord.scrollBar.value == 0)
				ClubManager.getResultList(this._myClub.cid, 1);

			if (this._ui._listRecord.scrollBar.value > this._ui._listRecord.scrollBar.max)
				this._refreshResultsMore = true;
			else if (this._ui._listRecord.scrollBar.value < this._ui._listRecord.scrollBar.max)
				this._refreshResultsMore = false

			if (this._refreshResultsMore && this._ui._listRecord.scrollBar.value == this._ui._listRecord.scrollBar.max)
				ClubManager.getResultList(this._myClub.cid);
		}
		private onScrollReviewMemberChanged(e): void {
			// if (this._ui._listRecord.scrollBar.value < 0)
			// 	this._refreshResultsFirstPage = true;
			// else if (this._ui._listRecord.scrollBar.value > 0)
			// 	this._refreshResultsFirstPage = false

			// if (this._refreshResultsFirstPage && this._ui._listRecord.scrollBar.value == 0)
			// 	ClubManager.getResultList(this._myClub.cid, 1);

			// if (this._ui._listRecord.scrollBar.value > this._ui._listRecord.scrollBar.max)
			// 	this._refreshResultsMore = true;
			// else if (this._ui._listRecord.scrollBar.value < this._ui._listRecord.scrollBar.max)
			// 	this._refreshResultsMore = false

			// if (this._refreshResultsMore && this._ui._listRecord.scrollBar.value == this._ui._listRecord.scrollBar.max)
			// 	ClubManager.getResultList(this._myClub.cid);
		}
        /**
        * 开启监听，配置宽高，添加到舞台
        */
		public onShow(): void {
			super.onShow();
			//this._ui._input.text="";
			this.tweenSelf();
		}
        /**
         * 离开时调度
         */
		public afterShow(): void {
			super.afterShow();
		}

		private onTouch(e: Laya.Event): void {
			switch (e.currentTarget) {
				case this._ui._btnDrcy:
					//导入成员
					AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false);
					break
				case this._ui._btnCzcy:
					//查找成员
					ClubSearchPlayer.instance.show(1, this._cid, function (uid) {

						let club = ClubManager.getClubByCid(this._cid);
						if (!club) {
							return
						}
						let members = club.members
						let flag = false
						for (let i = 0; i < members.length; i++) {
							for (var j = 0; j < members[i].length; j++) {
								if (members[i][j].uid == uid) {
									//查到
									this._lastUid = uid
									Dispatcher.dispatch(EventNames.CLUB_SEARCH_MEMBER_LOCAL_SUCC, this._cid);
									this.showSearchMemberList(this._cid)
									flag = true
									ClubSearchPlayer.instance.hide()
									break
								}
							}
						}
						if (!flag) {
							HintCtrl.instance.show(GameConfig.language.club_search_error_2);
						}



					}.bind(this))
					break
				case this._ui._btnDsh:
					//待审核	
					this.showReviewMemberList(this._cid)

					break
				case this._ui._btnTjcy:
					//添加成员
					ClubSearchPlayer.instance.show(2, this._cid)
					break
				case this._ui._btnQuit:
					let name = this._myClub.title
					ClubAlert.instance.show(StringUtils.format(GameConfig.language.club_quit, name), this, this.quitClub);
					break
			}
		}
		private selectMemberList(e: Laya.Event) {
			if (e.type == Laya.Event.CLICK) {


				if (e.target.name == "_btnOpt") {
					//对成员操作
					let uid = (e.target.parent as ClubListMemberRenderer).dataSource.uid;
					let forbid = (e.target.parent as ClubListMemberRenderer).dataSource.forbid;
					ClubMasterOpt.instance.show(uid, forbid, this._cid)
				}
			}
		}
		private selectReviewMemberList(e: Laya.Event) {
			if (e.type == Laya.Event.CLICK) {
				if (e.target.name == "_btnRefuse") {
					//拒绝
					let uid = (e.target.parent as ClubListReviewMemberRenderer).dataSource.uid;

					ClubManager.review(this._cid, uid, 2)
				}
				else if (e.target.name == "_btnAgree") {
					//同意
					let uid = (e.target.parent as ClubListReviewMemberRenderer).dataSource.uid;
					ClubManager.review(this._cid, uid, 1)
				}
			}
		}
		public hide(): void {
			if (this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_SHENHE_MEMBER_LIST || this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_SEARCH_MEMBER_LIST) {
				this.showMemberList(this._cid)
			}
			else if (this._ctrlType == ClubMemberManagerCtrl.CtrlType.TYPE_RECORD_DETAIL) {
				this.showRecordList(this._cid)
			}
			else {

				if (this._ui)
					this._ui.removeSelf();
				if (this._uiMask)
					this._uiMask.removeSelf();
			}
		}
		protected tweenSelf(callback = null): void {
			this._ui.pos(AppControl.getInstance().stage.width * 0.5, AppControl.getInstance().stage.height * 0.5);
			this._ui.scale(1, 1);
			Laya.Tween.clearTween(this._ui);
			Laya.Tween.to(this._ui, { scaleX: 1, scaleY: 1, x: (AppControl.getInstance().stage.width - this._ui.width) / 2, y: (AppControl.getInstance().stage.height - this._ui.height) / 2 }, 0, Laya.Ease.backOut,
				Laya.Handler.create(this, function () {
					if (callback) {
						callback()
					}
				}));
		}

		// 记录相关
		protected onUpdateClubResultsList() {
			this._ui._listRecord.array = this._myClub.results
		}
		private selectRecordList(e: Laya.Event, index: number) {
			if (e.type == Laya.Event.CLICK) {
				let info = this._myClub.results
				let gid = info[index].gid
				this._record_gtype = info[index].gtype
				webService.getHistoryNoraml(gid, 2, this.onGetHistoryDetail.bind(this));
				this._ctrlType = ClubMemberManagerCtrl.CtrlType.TYPE_RECORD_DETAIL
				this.changeContntByType()
			}
		}
		private onGetHistoryDetail(response: any, gid: number, gtype: number): void {
			if (response.code == 0) {
				this._detailTotal = []
				this._record_playersArr = []

				// if (this._detailTotal[gid])
				// 	return;
				// if (!this._detailTotal[gid])
				// 	this._detailTotal[gid] = [];
				if (response.data) {
					for (var i: number = 0; i < response.data.length; i++) {
						let data = JSON.parse(response.data[i])
						data.gtype = gtype
						response.data[i] = data;
						for (var k in data.ss) {
							let v = data.ss[k]
							let str = Utils.getFitNickName(v.n, 10)
							if (this._record_playersArr.indexOf(str) < 0) {
								this._record_playersArr.push(str)
							}
						}
					}
				}
				this._ui._listDetail.array = response.data;
				this._ui._record_players.array = this._record_playersArr
				// this.showDetail(gid, gtype);
			}
		}

		// 战绩详情
		private updateRecordListDetail(cell: MenuHistoryDetailRenderer, index: number): void {
			// this.deniedScroll(cell._video, [this._list, this._listDetail, this._players])
			cell.playersArr = this._record_playersArr
			cell.updata();
		}

		// 点击详情
		private onSelectRecordDetail(e: Laya.Event, index): void {
			if (e.type == Laya.Event.CLICK) {
				// goto播录像
				var vid: string
				var gtype: number
				if (e.target.name == "video") {
					vid = (e.target.parent as MenuHistoryDetailRenderer).dataSource.vid;
					gtype = this._record_gtype
				} else {
					vid = (e.currentTarget as MenuHistoryDetailRenderer).dataSource.vid;
					gtype = this._record_gtype
				}
				LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_DELAY);
				var testPath = GameConfig.WEB_SERVICE_URL + "/history/video?vid=" + vid;
				Laya.loader.load(testPath, Laya.Handler.create(this, this.onGetVidoInfo, [gtype]), null, Laya.Loader.BUFFER)
			}
		}


		// 获取记录中的消耗
		private onGetClubGamesInfo(response: any): void {
			if (response.code == 0) {
				this._ui._labelTrecord.text = StringUtils.format(GameConfig.language.club_game_num_today, response.today ? response.today : 0)
				this._ui._labelYrecord.text = StringUtils.format(GameConfig.language.club_game_num_yesterday, response.yesterday ? response.yesterday : 0)
				this._ui._labelTotalcost.text = StringUtils.format(GameConfig.language.club_game_cost_all, response.diamond ? response.diamond : 0)
			}
		}

		// 获取录像信息
		private onGetVidoInfo(gtype: number, data: number): void {
			LoadingUI.instance.hide();
			if (data) {
				GameConfig.IS_MATCH = false;
				AppControl.getInstance().showPage(GameConfig.getGamePage(GameDef.GAME_NAME[gtype - 1]), 1, String(gtype), data);
			}
		}
		protected onResize(): void {
			this._ui.height = AppControl.getInstance().stage.height;
			this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			this._ui.centerX = 100
			this._ui.centerY = 0
		}

		private quitClub(): void {
			ClubManager.quitClub(this._cid)
			this.hide()
		}
	}
}