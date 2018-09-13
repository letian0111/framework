/*
* @author seacole
 * 加入俱乐部
*/

module club {
    export class ClubDeskInfo extends BaseCtrl {
        constructor() {
            super();
            this["name"] = "ClubDeskInfo";
        }

        private static _instance: ClubDeskInfo;
        public static get instance(): ClubDeskInfo {
            if (!this._instance)
                this._instance = new ClubDeskInfo();
            return this._instance;
        }

        protected _ui: ui.club.ClubDeskInfoUI;
        private _info
        private _data
        private _keyboard: KeyBoardNumUI;
        private _input: string;
        private _inGame: boolean
        private _special = ["4", "10"]

        public show(info, inGame?): void {
            this._info = info
            if (inGame) 
                this._inGame = true
            else 
                this._inGame = false
            this.showself();
        }

        /**
         * 这里完成new ui，添加注册监听等初始化工作
         */
        public beforeShow(): void {
            if (!this._ui) {
                this._ui = new ui.club.ClubDeskInfoUI();
                this._ui._rule_list.itemRender = ClubDeskInfoRenderer;
                this._ui._rule_list.renderHandler = new Laya.Handler(this, this.updateRuleList);
                EventManager.instance.registerOnObject(this, this._ui._btn_join, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, this._ui._btn_quit, Laya.Event.CLICK, this, this.onTouch);
            }
            super.beforeShow();                    
            this.onShow();
        }
        

        // 在游戏内显示规则时
        public checkInGame(): void {
            this._ui._mask.alpha = 0.7
            if (!this._inGame) {                
                this._ui._btn_join.visible = true
                this._ui._btn_quit.visible = true
                this._ui._mask.visible = true
                this._ui._lb_code.visible = false
                this.onResize()
                return
            }
            this._ui._btn_join.visible = false
            this._ui._btn_quit.visible = false
            this._ui._mask.visible = false
            this._ui._lb_code.visible = true
            this._ui._lb_code.text = StringUtils.format(GameConfig.language.room_id, BaseGameData.tableid)
        }

        /**
        * 开启监听，配置宽高，添加到舞台
        */
        public onShow(): void {
            super.onShow();
            this.checkInGame()
            this._data = []
            for (let v of this._info.rule) {
                this._data.push(v)
            }
            
            let game_type = this._info.gtype
          
            let name = GameDef.GAME_NAME[game_type - 1]
            let createInfo = GameConfig.getCreateInfoByGameName(name)
            let info = createInfo.createInfo

            this._ui._lb_name.text = "【" + createInfo.ch_name + "】"

            // let text = localStorage.getItem(this._name);
            // this._createInfo = JSON.parse(text) || {};
            // this._newCreateInfo = {}
            // this._desc = {}
            // let y = 0
            for (let i = 0; i < this._data.length; i++) {
                for (let k in info) {
                    if (info[k].key == this._data[i].key) {
                        let value = this._data[i].value
                        this._data[i] = Utils.deepCopy(info[k], this._data[i])
                        this._data[i].value = value
                        break
                    }
                    if (info[k].info && info[k].info.length > 0) {
                        for (let j = 0; j < info[k].info.length; j++) {
                            if (info[k].info[j].key == this._data[i].key) {
                                let value = this._data[i].value
                                this._data[i] = Utils.deepCopy(info[k].info[j], this._data[i])
                                this._data[i].value = value
                                break
                            }
                        }
                    }
                }
            }
            // log("********************************")
            // log(this._data)
            for (let i = this._data.length-1; i>=0; i--) {
                let data = this._data[i]
                if (!data || !data.name || !data.key) {
                    this._data.splice(i, 1)
                }
            }
            if (name == "guanpai" && this._data[1].value == 0) {
                this._data[1].value = this._data[2].value
                this._data[2].value = 1
            }
            // log("********************************")
            // log(this._data)
            if (this._inGame && this._data.length <= 1) {
                this.hide()
            }
            this._ui._lb_wanfa.visible = this._data.length > 1
            this._ui._rule_list.height = 80 * this._data.length
            this._ui._bg.height = this._ui._rule_list.height + 220
            this._ui._rule_list.array = this._data
        }

        public afterShow(): void {
            super.afterShow();
        }

        private onTouch(e:Laya.Event):void
        {
            switch(e.currentTarget)
            {
                case this._ui._btn_quit:                
                    this.hide();
                    break;
                case this._ui._btn_join:
                    this.joinRoom();
                    break;
            }
        }

        private joinRoom() {
            ClubManager.joinRoom(this._info.code)
        }

        protected updateRuleList(cell: ClubDeskInfoRenderer, index: number){
            cell.updata()
        }
        protected onResize(): void {
			this._ui.height = AppControl.getInstance().stage.height;
			this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			this._ui.centerX = 0
			this._ui.centerY = 0
            this._ui._bg.width = 1024
            if (this._inGame) {
                this._ui._bg.scale(0.7, 0.7)
                this._ui._bg.centerX = -200 
                this._ui._bg.centerY = -80
                if (this._special.indexOf(BaseGameData.gameType) > -1) {
                    this._ui._bg.width = 1350
                    this._ui._bg.centerX = -87
                }
            }
            else {
                this._ui._bg.scale(1, 1)
                this._ui._bg.centerX = 0
                this._ui._bg.centerY = 0
                if (this._special.indexOf(this._info.gtype) > -1) {
                    this._ui._bg.width = 1200
                    this._ui._bg.centerX = 0
                }
            }
		}

        // public hide(): void {
        //     this._ui.visible = false
        // }
    }
}