
/**
 * @author xiemena
 * @description 分享界面
 */
class ShareDlalog extends BaseCtrl {

    public static LOGO: string = "SHARE_DLG"
    public _autoHide: boolean
    protected _ui: ui.dialog.ShareDlgUI
    constructor() {
        super()
        this["name"] = "ShareDlalog"
        this.init()
    }

    private static _instance: ShareDlalog
    public static get instance(): ShareDlalog {
        if (!this._instance)
            this._instance = new ShareDlalog()
        return this._instance
    }

    protected init() {
        this._ui = new ui.dialog.ShareDlgUI()
        // this._ui.anchorX = 0.5
        // this._ui.anchorY = 0.5
        this._ui._mask.centerX = 0
        this._ui._mask.centerY = 0
        // this.setTag("")
        let time = localStorage.getItem("share_" + server.uid)
        console.log("time===============" + time)
        if (TimeUtils.isToday(parseInt(time))) {
            this._ui._tag.visible = false
        } else {
            this._ui._tag.visible = true
        }
        this.addListener()
    }

    protected addListener() {
        this._ui._wechat.on(Laya.Event.CLICK, this, this.onTouch)
        this._ui._pyq.on(Laya.Event.CLICK, this, this.onTouch)
    }

    public setTag(skin: string) {
        this._ui._tag.visible = 0 != skin.length
        if (skin.length)
            this._ui._tag.skin = skin
    }

    public show() {
        this.showself()
    }

    private onTouch(e: Laya.Event) {
        switch (e.currentTarget) {
            case this._ui._wechat: {
                //Native.instance.share(5, 0, "", "", "res/bg/" + GameConfig.CHANNEL + ".jpg")
                var path = "res/bg/" + GameConfig.CHANNEL + ".jpg";
                if (GameConfig.SUB_ID) {
                    path = "res/bg/" + GameConfig.CHANNEL + "_" + GameConfig.SUB_ID + ".jpg";
                }
                Native.instance.share(5, 0, "", "", path);
            }
                break
            case this._ui._pyq:
            {
                 var path = "res/bg/" + GameConfig.CHANNEL + ".jpg";
                if (GameConfig.SUB_ID) {
                    path = "res/bg/" + GameConfig.CHANNEL + "_" + GameConfig.SUB_ID + ".jpg";
                }
                Native.instance.share(5, 1, "", "", path);
            }
                break
        }
    }
}