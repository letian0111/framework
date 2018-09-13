/*
* @author seacole
 * 加入邀请码
*/
class BindInviteCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "BindInviteCtrl";
    }

    private static _instance: BindInviteCtrl;
    public static get instance(): BindInviteCtrl {
        if (!this._instance)
            this._instance = new BindInviteCtrl();
        return this._instance;
    }

    protected _ui: ui.panel.BindInviteUI;
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
            this._ui = new ui.panel.BindInviteUI();
           

             for (var i: number = 0; i <= 9; i++) {
                EventManager.instance.registerOnObject(this, this._ui["_btnNum_" + i], Laya.Event.CLICK, this, this.onKeyBordClick);
            }


        }
        super.beforeShow();      
        this._ui._lb_tips.text = StringUtils.format(GameConfig.language.bind_tips, GameConfig.getBindProfit())
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.KEYBOARD_NUM, this, this.onChanged);
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.USER_BIND_SUCC, this, this.onBindSuccess);
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
            case "12":
                if(this._input.length < 6){
                    HintCtrl.instance.show(GameConfig.language.bind_fail)
                }else{
                    webService.bindUser(this._input, this.onBindInvite.bind(this))
                }
                break;
            case "11":
                this._input = this._input.substr(0, this._input.length - 1);
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
        for (i = 1; i <= 6; i++) {
            this._ui["_label_"+i].text = ""
            this._ui["_label_"+i].visible = false;
        }
        for (i = 1; i <= this._input.length; i++) {
            this._ui["_label_"+i].text = this._input[i-1];
            this._ui["_label_"+i].visible = true;
        }
            
    }

   

    private onTouch(e:Laya.Event):void
    {
        switch(e.currentTarget)
        {
            
        }
    }
    
    //清空
    private clear(): void {
        this._input = "";
        var i: number;
        for (i = 1; i <= 6; i++) {
            this._ui["_label_"+i].text = "";
            this._ui["_label_"+i].visible = false;
        }
    }

    public onBindInvite(response){
        if (response.code == 0) {            
            this.startTimer()            
        }
        else {
            HintCtrl.instance.show(GameConfig.language.bind_fail);
        }
    }

    public onBindSuccess() {
        AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.bind_success, GameConfig.getBindProfit()), null, 0, false)
        this.stopTimer();
    }

   private startTimer(): void {
        this.stopTimer();
        Laya.timer.loop(10 * 1000, this, this.onTimer);
    }

    private stopTimer(): void {
        Laya.timer.clear(this, this.onTimer);
    }

    private onTimer() {
        webService.checkBindInvite()
    }
}