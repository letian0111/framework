/*
* @author seacole
 * 加入俱乐部
*/

module club {
    export class ClubJoin extends BaseCtrl {
        constructor() {
            super();
            this["name"] = "ClubJoin";
        }

        private static _instance: ClubJoin;
        public static get instance(): ClubJoin {
            if (!this._instance)
                this._instance = new ClubJoin();
            return this._instance;
        }

        protected _ui: ui.club.ClubJoinUI;
        private _labs: Array<Laya.Label>;
        private _keyboard: KeyBoardNumUI;
        private _input: string;

        public show(): void {
            this._input = ""
            this.showself();
        }

        /**
         * 这里完成new ui，添加注册监听等初始化工作
         */
        public beforeShow(): void {
            if (!this._ui) {
                this._ui = new ui.club.ClubJoinUI();
                this._ui._confirm.visible = false
                this._labs = [];
                for (var i: number = 1; i <= 6; i++) {
                    let text = new Laya.Label()
                    text.text = ""
                    text.fontSize = 60
                    text.color = "#833228"
                    text.font = "Microsoft YaHei"
                    this._ui._img.addChild(text);
                    text.centerX = 74 * (i-3.5)
                    text.centerY = -7;
                    this._labs.push(text);
                }

                 for (var i: number = 0; i <= 9; i++) {
                    let text = new Laya.Label()
                    text.text = ""
                    text.fontSize = 44
                    text.color = "#833228"
                    text.font = "Microsoft YaHei"
                    let btn = this._ui["_btnNum_" + i]

                    btn.addChild(text)
                    text.centerX=0;
                    text.centerY=-7;
                    // text.x=100;
                    // text.y=50;
                    text.text=""+i;
                    
                    this._ui["_btnNum_" + i].name = i
                    EventManager.instance.registerOnObject(this, this._ui["_btnNum_" + i], Laya.Event.CLICK, this, this.onKeyBordClick);
                }


                let namesArr = ["delete","retry"]
                let namesArr_ch = ["删除","重输"]
                for (var i: number = 0; i <= 1; i++) {
                     let text = new Laya.Label()
                    text.text = namesArr_ch[i]
                    text.fontSize = 40
                    text.color = "#ffffff"
                    text.font = "Microsoft YaHei"
                    let btn = this._ui["_btnNum_" + namesArr[i]]

                    btn.addChild(text)
                    text.centerX=0;
                    text.centerY=-7;

                }

            }
            super.beforeShow();
            this._ui._btnNum_delete.name = "12"
            this._ui._btnNum_retry.name = "10"
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.KEYBOARD_NUM, this, this.onChanged);
            EventManager.instance.registerOnObject(this, this._ui._btnClose, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._mask2, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._btn_refind, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._btn_confirm, Laya.Event.CLICK, this, this.onTouch);
    
            EventManager.instance.registerOnObject(this, this._ui._btnNum_delete, Laya.Event.CLICK, this, this.onKeyBordClick);
            EventManager.instance.registerOnObject(this, this._ui._btnNum_retry, Laya.Event.CLICK, this, this.onKeyBordClick);
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_SEARCH_SUCC, this, this.onSearchSucc);
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_JOIN_SUCC, this, this.onJoinSucc);
            this.onShow();
        }

        private onKeyBordClick(e: Laya.Event): void {
            switch (e.type) {
                case Laya.Event.CLICK:
                    log(e.currentTarget.name);
                    Dispatcher.dispatch(EventNames.KEYBOARD_NUM, e.currentTarget.name);
                    break;
            }

        }
        /**
        * 开启监听，配置宽高，添加到舞台
        */
        public onShow(): void {
            super.onShow();
            this.onResize()
            //this._ui._lab.text = GameConfig.language.join_table_1;
            this._ui._boxTips.visible=false;
            this.clear();
            this.tweenSelf();
        }

        protected onResize(): void {
			this._ui.height = AppControl.getInstance().stage.height;
			this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			this._ui.centerX = 100
			this._ui.centerY = 0
		}
        /**
         * 离开时调度
         */
        public afterShow(): void {
            super.afterShow();
        }

        private onChanged(key: string): void {
            var num: number;
            switch (key) {
                case "10":
                    this._input = "";
                    break;

                case "12":
                    this._input = this._input.substr(0, this._input.length - 1);
                    break;

                case "11":
                    if (this._input.length >= 6)
                        return;
                    this._input += "0";
                    break;
                default:
                    if (this._input.length >= 6)
                        return;
                    this._input += key;
                    break;
            }
            if (this._input.length > 6)
                this._input = this._input.substr(0, 6);
            var i: number;
            for (i = 0; i < 6; i++) {
                this._labs[i].text = "";
                this._labs[i].visible = false;
            }
            for (i = 0; i < this._input.length; i++) {
                this._labs[i].text = this._input[i];
                this._labs[i].visible = true;
            }

            if (this._input.length == 6) {
                // this.showConfirm()
                this.search()
            }
            else{
               //this._ui._lab.text = GameConfig.language.join_table_1;
                this._ui._boxTips.visible=false;
            }
                
        }


        private search(): void {
            if (this._input) {
                var cid: number = Number(this._input);
                ClubManager.searchClub(cid);
            }
            else{
                AlertInGameCtrl.instance.show(GameConfig.language.club_create_3,null,0,false);
            }
        }

        private onSearchSucc(response): void {
            this._ui._confirm.visible = true
            // ClubSearch.instance.show(response);
            this._ui._lb_name.text = response.title
            this._ui._lb_creator.text = StringUtils.format(GameConfig.language.club_search_2, response.currmem ? response.currmem : 0, response.maxmem ? response.maxmem : 0);

        }
        private onJoinSucc():void{
            this.hide();
        }

        private joinClub(): void {
            this._ui._confirm.visible = false
            if (this._input) {
                var cid: number = Number(this._input);
                ClubManager.joinClub(cid);
                this.hide()
            }
        }

        private onTouch(e:Laya.Event):void {
            switch(e.currentTarget) {
                case this._ui._btnClose:                
                    this.hide();
                    break;
                case this._ui._mask2:
                case this._ui._btn_refind:
                    this._ui._confirm.visible = false
                    this.clear()
                    break;
                case this._ui._btn_confirm:
                    this.joinClub();
                    break;
            }
        }
        //回退
        private fallback(): void {
            this._input = this._input.substr(0, this._input.length - 1)
            var i: number;
            
            this._labs[this._labs.length-1].text = "";
            this._labs[this._labs.length-1].visible = false;

        }

        //清空
        private clear(): void {
            this._input = "";
            var i: number;
            for (i = 0; i < 6; i++) {
                this._labs[i].text = "";
                this._labs[i].visible = false;
            }
        }
    }
}