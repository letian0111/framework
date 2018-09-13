/*
 * @author seacole
 * 顶层弹窗 游戏中
*/
class AlertInGameSmallCtrl extends AlertCtrl {
    constructor() {
        super();
        this["name"] = "AlertInGameSmallCtrl";
    }

    protected _ui: ui.panel.AlertInGameUI;

    protected static _instanceInGame: AlertInGameSmallCtrl;
    public static get instance(): AlertInGameSmallCtrl {
        if (!this._instanceInGame)
            this._instanceInGame = new AlertInGameSmallCtrl();
        return this._instanceInGame;
    }

    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.AlertInGameUI();
            this._ui._labMsg.style.align = "center";
            this._ui._labMsg.style.color = "#9b5036";
            // this._ui._labMsg.style.strokeColor = "#3b6374";
            // this._ui._labMsg.style.stroke = 3;
            EventManager.instance.registerOnObject(this, this._ui._btns, Laya.Event.CLICK, this, this.onTouch);
            this._autoHide = false;
            this._ui._dissloveBox.visible = false
        }


        EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.RESIZE, this, this.onResize);
        EventManager.instance.registerOnObject(this, this._ui, Laya.Event.REMOVED, this, this.afterShow);
        this.onShow();
    }

    public onShow(): void {
        this._size = (this._msg.length <= 100) ? 30 : 25
        super.onShow();
        var a: Object; 
        if (this._title == "提示")
            this._ui._imgTitle.source = Laya.Loader.getRes(ResourceConfig.ALERT_TISHI);
        else
            this._ui._imgTitle.source = Laya.Loader.getRes(this._title);
        
        this._ui._imgTitle.centerX = 0;
        this._ui._labMsg.style.fontSize = this._size
        this._ui._labMsg.style.leading = 10
        this._size = 20
        if (this._needCancel) {
            this._ui._btnConfirm.centerX = -136;
            this._ui._btnCancel.visible = true;
        }
        else {
            this._ui._btnConfirm.centerX = 0;
            this._ui._btnCancel.visible = false;
        }
    }
}