
class ShareDailyCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "ShareDailyCtrl";
    }

    protected _ui: ui.panel.ShareUI;

    protected static _instanceInGame: ShareDailyCtrl;
    public static get instance(): ShareDailyCtrl {
        if (!this._instanceInGame)
            this._instanceInGame = new ShareDailyCtrl();
        return this._instanceInGame;
    }

    
    public show() {
        this.showself();
    }

    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.ShareUI();
            EventManager.instance.registerOnObject(this, this._ui._share, Laya.Event.CLICK, this, this.onTouch);
        }

        


        EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.RESIZE, this, this.onResize);
        EventManager.instance.registerOnObject(this, this._ui, Laya.Event.REMOVED, this, this.afterShow);
        this.onShow();
    }

    public onShow(): void {
        super.onShow();
        if(GameConfig.CHANNEL){
            this._ui._share.skin = "res/share/share_bg_"+GameConfig.CHANNEL+".png"
        }
        else
        {
            this._ui._share.skin = "res/share/share_bg.png"
        }
    }

    public share(){
        ShareDlalog.instance.show()
    }

    public onTouch() {
        var path = "res/bg/"+GameConfig.CHANNEL+".jpg"
        if(GameConfig.SUB_ID){
            path = "res/bg/"+GameConfig.CHANNEL+"_"+GameConfig.SUB_ID+".jpg"
        }
        
        Native.instance.share(5,1,"","",path)
    }


    
}

