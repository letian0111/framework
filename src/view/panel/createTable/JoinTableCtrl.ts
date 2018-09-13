/*
* @author seacole
 * 加入桌子
*/
class JoinTableCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "JoinTableCtrl";
    }

    private static _instance: JoinTableCtrl;
    public static get instance(): JoinTableCtrl {
        if (!this._instance)
            this._instance = new JoinTableCtrl();
        return this._instance;
    }

    protected _ui: ui.panel.JoinRoomUI;
    private _labs: Array<Laya.Label>;
    private _keyboard: KeyBoardNumUI;
    private _input: string;

    public show(): void {
        this.showself();
    }

    /**
     * 这里完成new ui，添加注册监听等初始化工作
     */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.JoinRoomUI();
            this._labs = [];
            for (var i: number = 1; i <= 6; i++) {
                let text = new Laya.Label()
                text.text = ""
                text.fontSize = 30
                text.color = "#833228"
                text.font = "Microsoft YaHei"
                this._ui["_img" + i].addChild(text);
                text.centerX=0;
                text.centerY=0;
                this._labs.push(text);
            }

             for (var i: number = 0; i <= 9; i++) {
                let text = new Laya.Label()
                text.text = ""
                text.fontSize = 50
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
                text.fontSize = 45
                text.color = "#fffefe"
                text.font = "Microsoft YaHei"
                let btn = this._ui["_btnNum_" + namesArr[i]]

                btn.addChild(text)
                text.centerX=0;
                text.centerY=-7;

            }

        }
        super.beforeShow();
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.KEYBOARD_NUM, this, this.onChanged);
        EventManager.instance.registerOnObject(this, this._ui._btnClose, Laya.Event.CLICK, this, this.onTouch);
        this._ui._btnNum_delete.name = "12"
        this._ui._btnNum_retry.name = "10"
        EventManager.instance.registerOnObject(this, this._ui._btnNum_delete, Laya.Event.CLICK, this, this.onKeyBordClick);
        EventManager.instance.registerOnObject(this, this._ui._btnNum_retry, Laya.Event.CLICK, this, this.onKeyBordClick);
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
        //this._ui._lab.text = GameConfig.language.join_table_1;
        this._ui._boxTips.visible=false;
        this.clear();
        this.tweenSelf();
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
            this.join();
        }
        else{
           //this._ui._lab.text = GameConfig.language.join_table_1;
            this._ui._boxTips.visible=false;
        }
            
    }

    private join(): void {
        if (this._input) {
            webService.joinTable(this._input, (response: any) => {
                if (response.code == 0) {
                    // this._ui._labRoom.focus = false;
                    GameConfig.setServerUrl(response.ip);
                    GameConfig.joinTable(response);
                    this.hide();
                }
                else {
                    //HintCtrl.instance.show(GameConfig.language.join_table_fail + " code:" + response.code);                    
                    this.clear();
                    //this._ui._lab.text = GameConfig.language.join_table_2;
                    HintCtrl.instance.show(GameConfig.language.join_table_2)
                    // this._ui._boxTips.alpha=0;
                    // Laya.Tween.to(this._ui._boxTips, { alpha: 1 }, 500);
                    // this._ui._boxTips.visible=true;
                    GameLogic.selfData.game_code = 0
                }
            });
        }
    }

    private onTouch(e:Laya.Event):void
    {
        switch(e.currentTarget)
        {
            case this._ui._btnClose:
                this.hide();
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