/*
* @author seacole
 * 俱乐部数据管理
*/
module club {
	export class ClubManager {
		constructor() {

		}

		private static _myClubs: Array<any>;
		public static get myClubs(): Array<any> {
			return ClubManager._myClubs;
		}

		public static clearAll(): void {
			ClubManager._myClubs = [];
		}
		/**
		 * cid
		 * title
		 * role 100创始人
		 * currmem 当前人数
		 * maxmem 总人数
		 * gcnt 比赛数
		 * 
		 * game_page
		 * game_page_cnt
		 * games
		 * 
		 * result_page
		 * result_page_cnt
		 * results
		 * 
		 * member_page
		 * member_page_cnt
		 * members
		 * 
		 * diamond 俱乐部钻石
		 * paytype 0成员自费 1俱乐部付费
		 */

		public static getClubByCid(cid: number): any {
			for (var i: number = 0; i < ClubManager._myClubs.length; i++) {
				if (cid == ClubManager._myClubs[i].cid)
					return ClubManager._myClubs[i];
			}
			return null;
		}

		public static isInClub(cid: number): boolean {
			if (ClubManager._myClubs) {
				for (var i: number = 0; i < ClubManager._myClubs.length; i++) {
					if (ClubManager._myClubs[i].cid == cid)
						return true;
				}
			}
			return false;
		}

		public static removeGames(cid: number): void {
			var club: any = ClubManager.getClubByCid(cid);
			if (club) {
				club.games = null;
				club.game_page = 0;
				club.game_page_cnt = 0;
			}
		}

		public static removeGame(cid: number, code: number): void {
			var club: any = ClubManager.getClubByCid(cid);
			if (club) {
				if (club.games && club.games.length) {
					for (var i: number = 0; i < club.games.length; i++) {
						if (club.games[i].code == code) {
							club.games.splice(i, 1);
							Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_GAMES_LIST, cid);
							break;
						}
					}
				}
			}
		}

		public static removeResults(cid: number): void {
			var club: any = ClubManager.getClubByCid(cid);
			if (club) {
				club.results = null;
				club.result_page = 0;
				club.result_page_cnt = 0;
			}
		}

		public static removeMembers(cid: number): void {
			var club: any = ClubManager.getClubByCid(cid);
			if (club) {
				club.members = null;
				club.member_page = 0;
				club.member_page_cnt = 0;
			}
		}

		public static isCreator(role: number): boolean {
			return role >= 100;
		}

		private static removeClub(cid: number): void {
			for (var i: number = 0; i < ClubManager._myClubs.length; i++) {
				if (cid == ClubManager._myClubs[i].cid) {
					ClubManager._myClubs.splice(i, 1);
					break;
				}
			}
			Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_LIST);
		}

		private static onSortClub(a: any, b: any): number {
			if (!a.hasOwnProperty("role"))
				a.role = 0;
			if (!b.hasOwnProperty("role"))
				b.role = 0;
			if (a.role >= 100 && b.role < 100)
				return -1;
			else if (a.role < 100 && b.role >= 100)
				return 1;
			else
				return 0;
		}

		private static onSortGames(a: any, b: any): number {
			if (!a.hasOwnProperty("gid"))
				a.gid = 0;
			if (!b.hasOwnProperty("gid"))
				b.gid = 0;
			if (a.gid > b.gid)
				return -1;
			else if (a.gid < b.gid)
				return 1;
			else
				return 0;
		}

		private static onSortResults(a: any, b: any): number {
			if (!a.hasOwnProperty("end_time"))
				a.end_time = 0;
			if (!b.hasOwnProperty("end_time"))
				b.end_time = 0;
			if (a.end_time > b.end_time)
				return -1;
			else if (a.end_time < b.end_time)
				return 1;
			else
				return 0;
		}

		private static getMyClubCount(): number {
			if (ClubManager._myClubs) {
				var count: number = 0;
				for (var i: number = 0; i < ClubManager._myClubs.length; i++) {
					if (ClubManager.isCreator(ClubManager._myClubs[i].role)) {
						count++;
					}
				}
				return count;
			}
			return 0;
		}

		public static isClubFull(): boolean {
			return ClubManager.getMyClubCount() >= 3;
		}


		// ---------------------后面是web接口-----------------------------------


		/**
		 * 获取我的俱乐部列表
		 */
		public static getMyClub(): void {
			clubWebService.getMyClub((response: any) => {
				if (response.code == 0) {
					if (!ClubManager._myClubs)
						ClubManager._myClubs = [];
					//深度拷贝	
					response.data = response.data || []
					for (var i: number = 0; i < response.data.length; i++) {
						var flag: boolean = true;
						for (var j: number = 0; j < ClubManager._myClubs.length; j++) {
							if (ClubManager._myClubs[j].cid == response.data[i].cid) {
								flag = false;
								Utils.deepCopy(response.data[i], ClubManager._myClubs[j]);
								break;
							}
						}
						if (flag)
							ClubManager._myClubs.push(response.data[i]);
					}
					//删除没有的
					for (var j: number = 0; j < ClubManager._myClubs.length;) {
						var flag: boolean = true;
						for (var i: number = 0; i < response.data.length; i++) {
							if (ClubManager._myClubs[j].cid == response.data[i].cid) {
								flag = false;
							}
						}
						if (flag)
							ClubManager._myClubs.splice(j, 1);
						else
							j++;
					}
					ClubManager._myClubs.sort(ClubManager.onSortClub);
					Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_LIST);
					Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_GAMES_LIST);
					Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_MEMBERS_LIST);
				}
			});
		}

		public static createClub(title: string, notice: string, room: number, check: number): void {
			clubWebService.createClub(title, notice, room, check, (response) => {
				if (response.code == 0) {
					HintCtrl.instance.show(GameConfig.language.create_succ);
					if (!ClubManager._myClubs)
						ClubManager._myClubs = [];
					Dispatcher.dispatch(EventNames.CLUB_CREATE_SUCC, response.cid);
					Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_LIST);
					// ClubManager._myClubs.push(response.data);
					ClubManager.getMyClub();
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.create_fail, response.code), null, 0, false);
				}
			});
		}

		public static settingClub(cid: number, title: string, notice: string, room: number, check: number): void {
			clubWebService.settingClub(cid, title, notice, room, check, (response) => {
				if (response.code == 0) {
					HintCtrl.instance.show(GameConfig.language.setting_succ);
					let club = this.getClubByCid(cid)
					club.title = title
					club.notice = notice
					club.game_type = room
					club.join_type = check
					Dispatcher.dispatch(EventNames.CLUB_CREATE_SUCC);
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.setting_fail, response.code), null, 0, false);
				}
			});
		}

		public static searchClub(cid: number): void {
			clubWebService.searchClub(cid, (response) => {
				if (response.code == 0) {
					response.cid = cid;
					Dispatcher.dispatch(EventNames.CLUB_SEARCH_SUCC, response);
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.search_fail, response.code), null, 0, false);
				}

			});
		}

		public static joinClub(cid: number): void {
			clubWebService.joinClub(cid, (response) => {
				if (response.code == 0) {
					HintCtrl.instance.show(GameConfig.language.join_club_succ);
					if (!ClubManager._myClubs)
						ClubManager._myClubs = [];
					Dispatcher.dispatch(EventNames.CLUB_JOIN_SUCC);
					// ClubManager._myClubs.push(response.data);
					ClubManager.getMyClub();
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.join_club_fail, response.code), null, 0, false);
				}
			});
		}

		// {"cnt":"1","grule":"{\"max_player\":3,\"max_hand_cnt\":8,\"gps\":1,\"black_call\":0,\"no_3_double\":0,\"has_boom\":0,\"boom_max\":3,\"charge_type\":0}","code":{"code":181959},"gid":"1404","status":"0","gtype":"2"}
		// status >0 表示开赛
		public static getGameList(cid: number, gtype: number, page: number = 0, isDelete: boolean = false): void {
			var c: any = ClubManager.getClubByCid(cid);
			if (!c)
				return;
			var p: number = ClubManager.getPage(page, c.game_page, c.game_page_cnt);
			if (p != -1) {
				clubWebService.getGameList(cid, gtype, p, (response) => {
					if (response.code == 0) {
						var club: any = ClubManager.getClubByCid(response.cid ? response.cid : cid);
						if (club) {
							if (isDelete) {
								club.game_page = 0;
								club.games = [];
							}

							club.games = club.games || [];
							response.data = response.data || []
							if (response.data && response.data.length < 10 && page == 1)
								club.games = []
							for (let i = club.games.length - 1; i >= 0; i--) {
								let game = club.games[i]
								if (game.gtype != gtype) {
									club.games.splice(i, 1)
								}
							}
							if (response.data && response.data.length) {
								for (var i: number = 0; i < response.data.length; i++) {
									var flag: boolean = true;
									for (var j: number = 0; j < club.games.length; j++) {
										if (club.games[j].gid == response.data[i].gid) {
											flag = false;
											Utils.deepCopy(response.data[i], club.games[j]);
											break;
										}
									}
									if (flag)
										club.games.push(response.data[i]);
								}
								club.games.sort(ClubManager.onSortGames);
							}
							if (!club.game_page || club.game_page < response.page)
								club.game_page = response.page;
							club.game_page_cnt = response.page_cnt;
							Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_GAMES_LIST, cid);
						}
					}
				})
			}

		}

		public static getResultList(cid: number, page: number = 0): void {
			var c: any = ClubManager.getClubByCid(cid);
			if (!c)
				return;
			var p: number = ClubManager.getPage(page, c.result_page, c.result_page_cnt);
			if (p != -1) {
				clubWebService.getResultList(cid, p, (response) => {
					if (response.code == 0) {
						var club: any = ClubManager.getClubByCid(response.cid ? response.cid : cid);
						if (club) {
							if (!club.results)
								club.results = [];
							if (response.data && response.data.length) {
								for (var i: number = 0; i < response.data.length; i++) {
									var flag: boolean = true;
									for (var j: number = 0; j < club.results.length; j++) {
										if (club.results[j].gid == response.data[i].gid) {
											flag = false;
											Utils.deepCopy(response.data[i], club.results[j]);
											break;
										}
									}
									if (flag)
										club.results.push(response.data[i]);
								}
								club.results.sort(ClubManager.onSortResults);
							}
							if (!club.result_page || club.result_page < response.page)
								club.result_page = response.page;
							club.result_page_cnt = response.page_cnt;
							Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_RESULTS_LIST, cid);
						}
					}
				})
			}
		}

		public static getInfo(cid: number): void {
			clubWebService.getClubInfo(cid, (response) => {
				if (response.code == 0) {
					var club: any = ClubManager.getClubByCid(response.cid ? response.cid : cid);
					if (club) {
						club.diamond = response.diamond;
						club.notice = response.notice;
						club.game_type = response.game_type ? response.game_page : 0;
						club.join_type = response.join_type ? response.join_type : 0;
						club.paytype = response.paytype ? response.paytype : 0;
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_DIAMOND, cid);
					}
				}
				else {
					ClubManager.dealClubErrorCode(response.code);
					ClubManager.removeClub(cid);
					// Dispatcher.dispatch(EventNames.CLUB_DELETE_SUCC, cid);
				}

			})
		}

		public static getMemberList(cid: number, page: number = 0): void {
			var c: any = ClubManager.getClubByCid(cid);
			if (!c)
				return;
			var p: number = ClubManager.getPage(page, c.member_page, c.member_page_cnt);
			if (p != -1) {
				clubWebService.getMembersList(cid, p, (response) => {
					if (response.code == 0) {
						var club: any = ClubManager.getClubByCid(response.cid ? response.cid : cid);
						if (club) {
							// 测试用
							// response.data=response.data.concat(response.data);
							// response.data=response.data.concat(response.data);
							// response.data=response.data.concat(response.data);					
							if (!club.member_page || club.member_page < response.page)
								club.member_page = response.page;
							club.member_page_cnt = response.page_cnt;
							//if (!club.members)

							if (!club.members) {
								club.members = []
							}
							club.members[p - 1] = club.members[p - 1] || [];
							if (!ClubMemberManager.getMemberByClub(cid)) {
								ClubMemberManager.initClubMember(cid)
							}
							// if (response.data) {
							// 	ClubMemberManager.clearMember(response.data,cid)
							// }

							if (response.data && response.data.length) {
								var uids: Array<number> = [];
								var cludMembers = [];
								for (var i: number = 0; i < response.data.length; i++) {
									var role: any = ClubMemberManager.getMember(response.data[i].uid, cid);
									if (role) {
										Utils.deepCopy(role, response.data[i]);
									}
									else {
										uids.push(response.data[i].uid);
										cludMembers.push(response.data[i])
									}
								}
								for (var i: number = 0; i < response.data.length; i++) {
									var flag: boolean = true;
									for (var j: number = 0; j < club.members[p - 1].length; j++) {
										if (club.members[p - 1][j].uid == response.data[i].uid) {
											flag = false;
											Utils.deepCopy(response.data[i], club.members[p - 1][j]);
											break;
										}
									}
									if (flag)
										club.members[p - 1].push(response.data[i]);
								}
								ClubManager.getMemberInfos(club.cid, uids, cludMembers);
							}
							Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_MEMBERS_LIST, cid);
						}
					}
				})
			}
		}
		private static getReviewMemberInfos(cid: number, uids: Array<number>, cludMembers) {
			if (uids && uids.length) {
				webService.getUserInfos(uids, (response) => {
					if (response.code == 0) {
						var club: any = ClubManager.getClubByCid(cid);
						if (club) {
							ClubReviewMemberManager.addRoleByInfos(response.data);
							ClubReviewMemberManager.addClubMemberInfos(response.data, cludMembers);

							for (var i: number = 0; i < response.data.length; i++) {
								for (var j: number = 0; j < club.reviewMembers.length; j++) {
									if (club.reviewMembers[j].uid == response.data[i].uid) {
										//Utils.deepCopy(response.data[i], club.members[j]);
										var role: any = ClubReviewMemberManager.getRole(response.data[i].uid);
										if (role) {
											Utils.deepCopy(role, club.reviewMembers[j]);
										}
										break;
									}
								}
							}
							Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_REVIVW_MEMBERS_LIST, cid);
						}
					}

				});
			}
		}
		private static getMemberInfos(cid: number, uids: Array<number>, cludMembers): void {
			if (uids && uids.length) {
				webService.getUserInfos(uids, (response) => {
					if (response.code == 0) {
						var club: any = ClubManager.getClubByCid(cid);
						if (club) {
							ClubMemberManager.addMemberByInfos(response.data, cid);
							ClubMemberManager.addClubMemberInfos(response.data, cludMembers, cid);



							for (var i: number = 0; i < response.data.length; i++) {
								for (var j: number = 0; j < club.members.length; j++) {
									for (var k: number = 0; k < club.members[j].length; k++) {
										if (club.members[j][k].uid == response.data[i].uid) {
											//Utils.deepCopy(response.data[i], club.members[j]);
											var role: any = ClubMemberManager.getMember(response.data[i].uid, cid);
											if (role) {
												Utils.deepCopy(role, club.members[j][k]);
											}
											break;
										}
									}
								}
							}
							Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_MEMBERS_LIST, cid);
						}
					}

				});
			}
		}

		public static renameClub(cid: number, title: string): void {
			clubWebService.renameClub(cid, title, (response) => {
				if (response.code == 0) {
					var club: any = ClubManager.getClubByCid(cid);
					if (club) {
						HintCtrl.instance.show(GameConfig.language.modify_succ);
						club.title = title;
						Dispatcher.dispatch(EventNames.CLUB_RENAME_SUCC, cid);
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_LIST);
					}
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.modify_fail, response.code), null, 0, false);
				}
			});
		}

		public static quitClub(cid: number): void {
			clubWebService.quitClub(cid, (response) => {
				if (response.code == 0) {
					HintCtrl.instance.show(GameConfig.language.quit_succ);
					Dispatcher.dispatch(EventNames.CLUB_QUIT_SUCC, cid);
					ClubManager.removeClub(cid);
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.quit_fail, response.code), null, 0, false);
				}
			});
		}

		public static setClubPaytype(cid: number, paytype: number): void {
			clubWebService.setClubPaytype(cid, paytype, (response) => {
				if (response.code == 0) {
					var club: any = ClubManager.getClubByCid(cid);
					if (club) {
						HintCtrl.instance.show(StringUtils.format(GameConfig.language.paytype_succ, GameConfig.language.paytype[paytype]));
						club.paytype = paytype;
						Dispatcher.dispatch(EventNames.CLUB_PAY_TYPE_CHANGE, cid);
					}
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.paytype_fail, response.code), null, 0, false);
				}
			});
		}

		public static deleteClub(cid: number): void {
			clubWebService.deleteClub(cid, (response) => {
				if (response.code == 0) {
					HintCtrl.instance.show(GameConfig.language.delete_succ);
					Dispatcher.dispatch(EventNames.CLUB_DELETE_SUCC, cid);
					ClubManager.removeClub(cid);
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.delete_fail, response.code), null, 0, false);
				}
			});
		}

		public static kick(cid: number, uid: number): void {
			clubWebService.kick(cid, uid, (response) => {
				if (response.code == 0) {
					var club: any = ClubManager.getClubByCid(cid);
					if (club) {
						HintCtrl.instance.show(GameConfig.language.kick_succ);
						if (club.members) {
							// for (var i: number = 0; i < club.members.length; i++) {
							for (let i = 0; i < club.members.length; i++) {
								for (var j = 0; j < club.members[i].length; j++) {
									if (club.members[i][j].uid == uid) {
										club.members[i].splice(j, 1);
										break;
									}
								}
							}
						}
						if (club.currmem)
							club.currmem--;
						Dispatcher.dispatch(EventNames.CLUB_KICK_OUT_SUCC, [cid, uid]);
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_MEMBERS_LIST, cid);
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_GAMES_LIST);
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_LIST);
					}
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.kick_fail, response.code), null, 0, false);
				}
			});
		}

		public static recharge(cid: number, cnt: number): void {
			clubWebService.clubRecharge(cid, cnt, (response) => {
				if (response.code == 0) {
					var club: any = ClubManager.getClubByCid(cid);
					if (club) {
						HintCtrl.instance.show(GameConfig.language.club_recharge_succ);
						if (club.diamond)
							club.diamond += cnt;
						else
							club.diamond = cnt;

						GameLogic.selfData.diamond -= cnt;
						Dispatcher.dispatch(EventNames.CLUB_RECHARGE_SUCC, cid);
						Dispatcher.dispatch(EventNames.REFRESH_ROLE_INFO);
					}
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.club_recharge_fail, response.code), null, 0, false);
				}
			});
		}

		private static getPage(page: number, currPage, maxPage: number): number {
			if (page) {
				return page;
			}
			else {
				if (currPage >= maxPage)
					return -1;
				else
					return currPage + 1;
			}
		}

		public static dealClubErrorCode(code: number): boolean {
			var str: string = GameConfig.language.club_web_error_code[code];
			if (str) {
				AlertInGameCtrl.instance.show(str, null, 0, false);
				return true;
			}
			return false;
		}
		//审核
		public static review(cid: number, uid: number, opt: number): void {
			clubWebService.clubReview(cid, uid, opt, (response) => {
				if (response.code == 0) {
					var club: any = ClubManager.getClubByCid(cid);
					if (!club)
						return

					if (club.reviewMembers&&club.reviewMembers.length > 0) {
						for (var i: number = 0; i < club.reviewMembers.length; i++) {
							if (club.reviewMembers[i].uid == uid) {
								club.reviewMembers.splice(i, 1);
								break;
							}
						}
					}

					if (opt == 1) {
						//提示审核成功
						//加到club成员里 刷新　club列表　
						HintCtrl.instance.show("添加成功");
						Dispatcher.dispatch(EventNames.CLUB_REVIEW_AGREE_SUCC);
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_REVIVW_MEMBERS_LIST, cid);

					}
					else if (opt == 2) {
						//提示拒绝成功
						//从审核列表移除 刷新审核列表ß
						HintCtrl.instance.show("拒绝成功");
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_REVIVW_MEMBERS_LIST, cid);
					}
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format("审核失败", response.code), null, 0, false);
				}
			});
		}
		//获取审核列表
		public static getReviewList(cid: number): void {

			var c: any = ClubManager.getClubByCid(cid);
			if (!c)
				return;

			clubWebService.getReviewList(cid, (response) => {
				if (response.code == 0) {
					var club: any = ClubManager.getClubByCid(response.cid ? response.cid : cid);
					if (club) {

						if (!club.reviewMembers)
							club.reviewMembers = [];

						if (response.data && response.data.length) {
							var uids: Array<number> = [];
							var cludMembers = [];
							for (var i: number = 0; i < response.data.length; i++) {
								var role: any = ClubReviewMemberManager.getRole(response.data[i].uid);
								if (role) {
									Utils.deepCopy(role, response.data[i]);
								}
								else {
									uids.push(response.data[i].uid);
									cludMembers.push(response.data[i])
								}
							}
							for (var i: number = 0; i < response.data.length; i++) {
								var flag: boolean = true;
								for (var j: number = 0; j < club.reviewMembers.length; j++) {
									if (club.reviewMembers[j].uid == response.data[i].uid) {
										flag = false;
										Utils.deepCopy(response.data[i], club.reviewMembers[j]);
										break;
									}
								}
								if (flag)
									club.reviewMembers.push(response.data[i]);
							}
							ClubManager.getReviewMemberInfos(club.cid, uids, cludMembers);
						}
						Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_REVIVW_MEMBERS_LIST, cid);

					}
					else {
						if (!ClubManager.dealClubErrorCode(response.code))
							AlertInGameCtrl.instance.show(StringUtils.format("获取审核列表失败", response.code), null, 0, false);
					}
				}
			});
		}
		//设置备注
		public static setMemberRemark(cid: number, opt_uid: number, remark): void {
			clubWebService.setMemberRemark(cid, opt_uid, remark, (response) => {
				if (response.code == 0) {
					HintCtrl.instance.show("修改成功");
					Dispatcher.dispatch(EventNames.CLUB_REMARK_SUCC, opt_uid);
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format("修改备注失败", response.code), null, 0, false);
				}
			});
		}
		//设置禁止玩家游戏
		public static setMemberForbidGame(cid: number, opt_uid: number, opt_type: number): void {
			clubWebService.setMemberForbidGame(cid, opt_uid, opt_type, (response) => {
				if (response.code == 0) {
					HintCtrl.instance.show("修改成功");
					Dispatcher.dispatch(EventNames.CLUB_FORBID_GAME_SUCC, opt_uid);
				}
				else {
					if (!ClubManager.dealClubErrorCode(response.code))
						AlertInGameCtrl.instance.show(StringUtils.format("修改失败", response.code), null, 0, false);
				}
			});
		}

		// 加入桌子
		public static joinRoom(code: number) {
			if (code > 0) {
				webService.joinTable(String(code), (response: any) => {
					if (response.code == 0) {
						GameConfig.setServerUrl(response.ip);
						GameConfig.joinTable(response)
					}
					else {
						GameLogic.selfData.game_code = 0
						if (response.code == 1207)
							AlertInGameCtrl.instance.show(GameConfig.language.join_table_fail_1207, null, 0, false);
						else if (response.code == 1208)
							AlertInGameCtrl.instance.show(GameConfig.language.join_table_fail_1208, null, 0, false);
						else
							AlertInGameCtrl.instance.show(GameConfig.language.join_fail, null, 0, false);
						GameLogic.selfData.getInfo(true);
					}
				});
			}
		}
	}
}