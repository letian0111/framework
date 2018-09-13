/*
* @author seacole
 * 俱乐部查找成员
*/
module club {
    export class ClubSearchPlayer extends BaseCtrl {
        constructor() {
            super();
            this["name"] = "ClubSearchPlayer";
        }

        private static _instance: ClubSearchPlayer;
        static get instance(): ClubSearchPlayer {
            if (!this._instance)
                this._instance = new ClubSearchPlayer();
            return this._instance;
        }

        protected _ui: ui.club.ClubAddmemberUI;
        private _data: any;
        private _searchType: any;
        private _callBack: any
        private _cid:any
        private static searchType = {
            SEARCH_LOCAL: 1,			    //俱乐部内搜索
            SEARCH_ADD: 2,		            //搜索并添加成员

        }


        public show(searchType,cid, callback?): void {
            //this._data = data;
            if (callback) {
                this._callBack = callback
            }
            this._cid = cid
            this._searchType = searchType
            this.showself();
            this._ui._inputName.text = ""
        }

        public beforeShow(): void {
            if (!this._ui) {
                this._ui = new ui.club.ClubAddmemberUI();
                EventManager.instance.registerOnObject(this, this._ui._inputName, Laya.Event.INPUT, this, this.onInputChange);
                EventManager.instance.registerOnObject(this, this._ui._btnSearch, Laya.Event.CLICK, this, this.ontouch);
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
            ClubAddPlayer.instance.show(data,this._cid)
        }
        private ontouch(e: Laya.Event): void {
            switch (e.currentTarget) {
                case this._ui._btnSearch:
                    // 查找
                    {
                        let uids = []
                        if (this._ui._inputName.text) {
                            if (this._searchType == ClubSearchPlayer.searchType.SEARCH_LOCAL) {
                                let  uid = parseInt(this._ui._inputName.text)
                                if(this._callBack){
                                    this._callBack(uid)
                                }
                            }
                            else if (this._searchType == ClubSearchPlayer.searchType.SEARCH_ADD) {
                                uids.push(parseInt(this._ui._inputName.text))
                                webService.getUserInfos(uids, (response) => {
                                    if (response.code == 0 && response.data.length > 0) {
                                        this.showAddMember(response.data)
                                    }
                                    else {
                                        HintCtrl.instance.show(GameConfig.language.club_search_error_1);
                                    }

                                });
                            }

                        }
                        else {
                            HintCtrl.instance.show(GameConfig.language.club_search_error_1);
                        }
                        break;
                    }
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
			if (this._uiMask) {
				this._uiMask.height = AppControl.getInstance().stage.height;
				this._uiMask.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			}
			this._ui.centerX = 0
			this._ui.centerY = 0
		}
    }
}