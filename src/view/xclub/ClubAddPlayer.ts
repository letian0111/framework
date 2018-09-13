/*
* @author seacole
 * 俱乐部查找成员
*/
module club {
    export class ClubAddPlayer extends BaseCtrl {
        constructor() {
            super();
            this["name"] = "ClubAddPlayer";
        }

        private static _instance: ClubAddPlayer;
        static get instance(): ClubAddPlayer {
            if (!this._instance)
                this._instance = new ClubAddPlayer();
            return this._instance;
        }

        protected _ui: ui.club.ClubSearchMemberUI;
        private _data: any;
        private _cid:any

        public show(data: any,cid:any): void {
            this._data = data[0];
            this._cid = cid
            this.showself();
            this._ui._labelNickname.text = Utils.getFitNickName(this._data.nk ? this._data.nk : "俱乐部成员对对对", 6);

            if (this._data.avatar) {
                this._ui._head.loadImage(this._data.avatar, 0, 0, 66, 66);
            }
            else {
                // this._ui._head.texture = null;
                // this._ui._head.source = null;
            }

            if (this._data.uid) {
                this._ui._labelid.text = "ID: " + this._data.uid
            }
        }

        public beforeShow(): void {
            if (!this._ui) {
                this._ui = new ui.club.ClubSearchMemberUI();
                EventManager.instance.registerOnObject(this, this._ui._btnReSearch, Laya.Event.CLICK, this, this.ontouch);
                EventManager.instance.registerOnObject(this, this._ui._btnAdd, Laya.Event.CLICK, this, this.ontouch);
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
        private showAddMember(data) {
            this.hide()
        }
        private ontouch(e: Laya.Event): void {
            switch (e.currentTarget) {
                case this._ui._btnReSearch:
                    // 重新查找
                    {
                        this.hide()
                        ClubSearchPlayer.instance.show(2,this._cid)
                        break;
                    }
                case this._ui._btnAdd:
                    // 加为成员
                    {
                        ClubManager.review(this._cid,this._data.uid,1)
                        break;
                    }

            }
        }

		protected onResize(): void {
			this._ui.height = AppControl.getInstance().stage.height;
			this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			this._ui.centerX = 100
			this._ui.centerY = 0
		}

    }
}