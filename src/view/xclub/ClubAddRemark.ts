/*
* @author seacole
 * 给玩家添加备注
*/
module club {
    export class ClubAddRemark extends BaseCtrl {
        constructor() {
            super();
            this["name"] = "ClubSearch";
        }

        private static _instance: ClubAddRemark;
        static get instance(): ClubAddRemark {
            if (!this._instance)
                this._instance = new ClubAddRemark();
            return this._instance;
        }

        protected _ui: ui.club.ClubAddRemarkUI;
        private _cid: any;
        private _uid: any;

        public show(cid, uid): void {
            this._cid = cid;
            this._uid = uid;
            this.showself();
        }

        public beforeShow(): void {
            if (!this._ui) {
                this._ui = new ui.club.ClubAddRemarkUI();

                EventManager.instance.registerOnObject(this, this._ui._inputName, Laya.Event.INPUT, this, this.onInputChange);
                EventManager.instance.registerOnObject(this, this._ui._btnFinish, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_REMARK_SUCC, this, this.onRemarkSucc);

            }
            super.beforeShow();
            this.onShow();
        }

        /**
        * 开启监听，配置宽高，添加到舞台
        */
        public onShow(): void {
            super.onShow();

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
                case this._ui._btnFinish:
                    //添加备注　

                    ClubManager.setMemberRemark(this._cid, this._uid, StringUtils.format(this._ui._inputName.text))
                    break;
            }
        }
        private onRemarkSucc(uid) {
            //备注修改成功

            let club = ClubManager.getClubByCid(this._cid)


            //赋值本地备注
            //for (var index = 0; index < club.members.length; index++) {
            for (let i = 0; i < club.members.length; i++) {
                for (var j = 0; j < club.members[i].length; j++) {
                    if (club.members[i][j].uid == uid) {
                        club.members[i][j].remark = StringUtils.format(this._ui._inputName.text)
                        ClubMemberManager.dic[this._cid][uid].remark = StringUtils.format(this._ui._inputName.text)
                        break;
                    }

                }
                Dispatcher.dispatch(EventNames.UPDATE_MY_CLUB_MEMBERS_LIST, this._cid);

                this.hide()
            }
        }
        private onInputChange(e: Laya.Event): void {
            var flag: boolean;
            while (Utils.getCharCodeLength(this._ui._inputName.text) > 20) {
                flag = true;
                this._ui._inputName.text = this._ui._inputName.text.substring(0, this._ui._inputName.text.length - 1);
            }
            if (flag)
                HintCtrl.instance.show(GameConfig.language.match_name_too_long);
        }
        protected onResize(): void {
            this._ui.height = AppControl.getInstance().stage.height;
            this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
            this._ui.centerX = 100
            this._ui.centerY = 0
        }

    }
}