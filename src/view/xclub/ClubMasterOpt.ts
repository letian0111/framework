/*
* @author seacole
 * 俱乐部管理操作界面
*/
module club {
    export class ClubMasterOpt extends BaseCtrl {
        constructor() {
            super();
            this["name"] = "ClubMasterOpt";
        }

        private static _instance: ClubMasterOpt;
        static get instance(): ClubMasterOpt {
            if (!this._instance)
                this._instance = new ClubMasterOpt();
            return this._instance;
        }

        protected _ui: ui.club.ClubPlayerOptUI;
        private _uid: any;
        private _cid: any;
        private _forbid: any;

        public show(uid, forbid, cid): void {
            this._uid = uid;
            this._cid = cid;
            this._forbid = forbid ? forbid : 0;
            this.showself();
        }

        public beforeShow(): void {
            if (!this._ui) {
                this._ui = new ui.club.ClubPlayerOptUI();
                EventManager.instance.registerOnObject(this, this._ui._btnSetplace, Laya.Event.CLICK, this, this.ontouch);
                EventManager.instance.registerOnObject(this, this._ui._btnAddremark, Laya.Event.CLICK, this, this.ontouch);
                EventManager.instance.registerOnObject(this, this._ui._btnNoPlay, Laya.Event.CLICK, this, this.ontouch);
                EventManager.instance.registerOnObject(this, this._ui._btnAddotherclub, Laya.Event.CLICK, this, this.ontouch);
                EventManager.instance.registerOnObject(this, this._ui._btnDelete, Laya.Event.CLICK, this, this.ontouch);
                EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_FORBID_GAME_SUCC, this, this.onForbidGameSucc);
            }

            super.beforeShow();
            this.onShow();
        }

        /**
        * 开启监听，配置宽高，添加到舞台
        */
        public onShow(): void {
            super.onShow();
            this._ui._btnNoPlay.skin = "club/button/sBtn_no_game.png"
            if (this._forbid > 0) {
                this._ui._btnNoPlay.skin = "club/button/sBtn_allow_game.png"
            }
            this.tweenSelf();
        }
        /**
         * 离开时调度
         */
        public afterShow(): void {
            super.afterShow();
        }
        private showAddMember(data) {
            this.hide()
            ClubAddPlayer.instance.show(data, this._cid)
        }
        private ontouch(e: Laya.Event): void {
            EventManager.instance.registerOnObject(this, this._ui._btnSetplace, Laya.Event.CLICK, this, this.ontouch);
            EventManager.instance.registerOnObject(this, this._ui._btnAddremark, Laya.Event.CLICK, this, this.ontouch);
            EventManager.instance.registerOnObject(this, this._ui._btnNoPlay, Laya.Event.CLICK, this, this.ontouch);
            EventManager.instance.registerOnObject(this, this._ui._btnAddotherclub, Laya.Event.CLICK, this, this.ontouch);
            EventManager.instance.registerOnObject(this, this._ui._btnDelete, Laya.Event.CLICK, this, this.ontouch);
            switch (e.currentTarget) {
                case this._ui._btnSetplace:
                    //设置管理
                    AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false);
                    break
                case this._ui._btnAddremark:
                    //添加备注
                    ClubAddRemark.instance.show(this._cid, this._uid)
                    break
                case this._ui._btnNoPlay:
                    //禁止玩牌 .  0允许游戏 1禁止游戏
                    {
                        let memberInfo = ClubMemberManager.getRole(this._uid)
                        let opt = 0
                        if (memberInfo.forbid) {
                            opt = 0
                        } else {
                            opt = 1
                        }
                        ClubManager.setMemberForbidGame(this._cid, this._uid, opt)
                    }

                    break
                case this._ui._btnAddotherclub:
                    //添加到其他朋友圈
                    AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false);
                    break
                case this._ui._btnDelete:
                    //踢出朋友圈
                    ClubManager.kick(this._cid, this._uid)
                    break
            }
        }
        private onForbidGameSucc(uid) {
            //游戏禁止 和允许 操作成功

            let club = ClubManager.getClubByCid(this._cid)


            //赋值本地
            for (let i = 0; i < club.members.length; i++) {
                for (var j = 0; j < club.members[i].length; j++) {

                    if (club.members[i][j].uid == uid) {
                        if (club.members[i][j].forbid) {
                            club.members[i][j].forbid = 0
                            ClubMemberManager.dic[this._cid][uid].forbid = 0
                        } else {
                            club.members[i][j].forbid = 1
                            ClubMemberManager.dic[this._cid][uid].forbid = 1
                        }

                        break;
                    }

                }
            }
            Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_MEMBERS_LIST, this._cid);

            this.hide()
        }
        protected onResize(): void {
            this._ui.height = AppControl.getInstance().stage.height;
            this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
            this._ui.centerX = 100
            this._ui.centerY = 0
        }
    }
}