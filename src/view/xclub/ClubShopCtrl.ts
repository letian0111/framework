/*
*  @author seacole
* 俱乐部商场横;
*/
class ClubShopCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "ClubShopCtrl";
    }

    private static _instance: ClubShopCtrl;
    public static get instance(): ClubShopCtrl {
        if (!this._instance)
            this._instance = new ClubShopCtrl();
        return this._instance;
    }

    protected _ui: ui.club.ClubShopUI;
    
    public show(): void {
        this.showself()
    }
    /**
    * 这里完成new ui，添加注册监听等初始化工作
    */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.club.ClubShopUI();

            EventManager.instance.registerOnObject(this, this._ui._btn_close, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._btn_buy, Laya.Event.CLICK, this, this.onTouch);
        }
        super.beforeShow();
        this.onShow();
    }
    public onShow(): void {
        super.onShow();
        GameLogic.selfData.query();
        if (GameConfig.cfgShop) {
            this.setList();
        }
        else {
            GameConfig.getShopCfg()
        }
        this.tweenSelf();
    }

    public setList(): void {
        if (!GameConfig.cfgClubShop || GameConfig.cfgClubShop.length <= 0) {
            HintCtrl.instance.show(GameConfig.language.common_tip_unopen_1);
            this.hide()
        }
    }


    private onTouch(e: Laya.Event): void {
        switch (e.currentTarget) {
            case this._ui._btn_close:
                this.hide()
                break;
            case this._ui._btn_buy:
                this.onConfirm()
                break;
        }
    }

    private onConfirm(): void {
        let value = GameConfig.cfgClubShop[0]
        SoundManager.instance.playBtnEffect(SoundConfig.SOUND_BTN_NORMAL);
        if (GameConfig.IS_BANSHU)
            HintCtrl.instance.show("该功能未开放");
        else
            Native.instance.recharge(value.pid, value.pkey);
    }
}