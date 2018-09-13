/*
* @author seacole
 * 设置
*/
class DayeSetupCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "DayeSetupCtrl";
    }

    private static _instance: DayeSetupCtrl;    

    public static get instance(): DayeSetupCtrl {
        if (!this._instance)
            this._instance = new DayeSetupCtrl();
        return this._instance;
    }

    protected _ui: ui.panel.PhzSetupUI;
    private bgCallback
    // private _hasBtnExit: boolean;
    public show(hasBtnExit: boolean): void {
        // this._hasBtnExit = hasBtnExit;
        this.showself();
    }

    /**
     * 这里完成new ui，添加注册监听等初始化工作
     */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.PhzSetupUI();

            EventManager.instance.registerOnObject(this, this._ui.btn_lan_1, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui.btn_lan_2, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._sliMusic, Laya.Event.CHANGED, this, this.onMusicChange);
            EventManager.instance.registerOnObject(this, this._ui._sliSound, Laya.Event.CHANGED, this, this.onSoundChange);
            // EventManager.instance.registerOnObject(this, this._ui._btnSound, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._btnExit, Laya.Event.CLICK, this, this.onDisband);

            EventManager.instance.registerOnObject(this, this._ui.btn_bg_1, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui.btn_bg_2, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui.btn_bg_3, Laya.Event.CLICK, this, this.onTouch);

            // this._ui._labVerApp.text = "";
            // this._ui._labVerRes.text = "";
            // this._ui._sliMusic.showLabel = false;
            // this._ui._sliMusic.allowClickBack = false;
            // this._ui._sliSound.showLabel = false;
            // this._ui._sliSound.allowClickBack = false;
            // // this._ui._btnCardBigClose.hitArea = new Laya.Rectangle(95, 9, 75, 51);
            // // this._ui._btnCardBigOpen.hitArea = new Laya.Rectangle(15, 9, 75, 51);

            // if (Native.instance.isNative) {
            //     if (GameConfig.APP_VER)
            //         this._ui._labVerApp.text = StringUtils.format(GameConfig.language.ver1, GameConfig.APP_VER);
            //     if (GameConfig.RES_VER)
            //         this._ui._labVerRes.text = StringUtils.format(GameConfig.language.ver2, GameConfig.RES_VER);
            // }
            // else {
            //     if (GameConfig.RES_VER)
            //         this._ui._labVerRes.text = StringUtils.format(GameConfig.language.ver3, GameConfig.RES_VER);
            // }
        }
        super.beforeShow();
        this.onShow();
    }

    /**
    * 开启监听，配置宽高，添加到舞台
    */
    public onShow(): void {
        super.onShow();
        this._ui._btnExit.visible = true;
        // this._ui._boxBig.visible = BaseGameData.gameType && GameDef.isMaJiang(BaseGameData.gameType);
        this.checkBg();
        this.checkLanguage();
        this.checkMusic();
        this.checkSound();
        this.tweenSelf();
    }
    /**
     * 离开时调度
     */
    public afterShow(): void {
        super.afterShow();
    }

    private onTouch(e: Laya.Event): void {
        switch (e.currentTarget) {
            case this._ui.btn_lan_1:
                this._ui.btn_lan_1.skin = "daye_phz/setting/img_point_2.png"
                this._ui.btn_lan_2.skin = "daye_phz/setting/img_point_1.png"

                this.changLanguage(0);
                break;
            case this._ui.btn_lan_2:
                this._ui.btn_lan_2.skin = "daye_phz/setting/img_point_2.png"
                this._ui.btn_lan_1.skin = "daye_phz/setting/img_point_1.png"

                this.changLanguage(1);
                break;
            case this._ui.btn_bg_1:
                log("333333333333")
                this._ui.btn_bg_1.skin = "daye_phz/setting/img_point_2.png"
                this._ui.btn_bg_2.skin = "daye_phz/setting/img_point_1.png"
                this._ui.btn_bg_3.skin = "daye_phz/setting/img_point_1.png"

                this.setBg(1);
                break;
            case this._ui.btn_bg_2:
                log("44444444444444444")
                this._ui.btn_bg_2.skin = "daye_phz/setting/img_point_2.png"
                this._ui.btn_bg_1.skin = "daye_phz/setting/img_point_1.png"
                this._ui.btn_bg_3.skin = "daye_phz/setting/img_point_1.png"

                this.setBg(2);
                break;
            case this._ui.btn_bg_3:
                log("5555555555555555")
                this._ui.btn_bg_3.skin = "daye_phz/setting/img_point_2.png"
                this._ui.btn_bg_1.skin = "daye_phz/setting/img_point_1.png"
                this._ui.btn_bg_2.skin = "daye_phz/setting/img_point_1.png"

                this.setBg(3);
                break;

            // case this._ui._btnSoundOn:
            // case this._ui._btnSoundOff:
            //     SoundManager.instance.switchEffect();
            //     this.checkSound();
            //     break;

            // case this._ui._btnCardBigOpen:
            //     this._ui._btnCardBigOpen.visible = false;
            //     this._ui._btnCardBigClose.visible = true;
            //     GameConfig.bigcard = 1
            //     break;

            // case this._ui._btnCardBigClose:
            //     this._ui._btnCardBigClose.visible = false;
            //     this._ui._btnCardBigOpen.visible = true;
            //     GameConfig.bigcard = 0
            //     break;

            // case this._ui._close:
            //     this.hide();
            //     break;

        }
    }
    
    private onDisband(): void {
        Dispatcher.dispatch(EventNames.MENU_TOUCH, [null, 1]);
        SoundManager.instance.playBtnEffect(1);
    }

    // private checkBigCard(): void {
    //     var value = GameConfig.bigcard
    //     this._ui._btnCardBigOpen.visible = value == 1 ? false : true
    //     this._ui._btnCardBigClose.visible = value == 1 ? true : false
    // }

    private checkMusic(): void {
        let value = SoundManager.instance.musicMute;
        let res = "daye_phz/setting/img_close.png"
        if (value) {
            res = "daye_phz/setting/img_open.png"
        }
        this._ui._sliMusic.skin = res
        // this._ui._sliMusic.value = value * 100;
    }

    private checkSound(): void {
        let value = SoundManager.instance.effectMute;
        let res = "daye_phz/setting/img_close.png"
        if (value) {
            res = "daye_phz/setting/img_open.png"
        }
        this._ui._sliSound.skin = res
    }
    
    private checkLanguage() :void {
        let lan = SoundManager.instance.language + 1
        
        this._ui.btn_lan_1.skin = "daye_phz/setting/img_point_" + (3-lan) + ".png"
        this._ui.btn_lan_2.skin = "daye_phz/setting/img_point_" + lan + ".png"

    }

    private onMusicChange(e: Laya.Event): void {
        SoundManager.instance.switchMusic()
        this.checkMusic()
    }

    private onSoundChange(e: Laya.Event): void {
        SoundManager.instance.switchEffect()
        this.checkSound()
    }
    
    private changLanguage(language) {
         let lan = SoundManager.instance.language
         if (language != lan) {
             SoundManager.instance.language = language
         }
    }

    private checkBg() {
        let key = "table_bg" + BaseGameData.gameType
        let idx = localStorage.getItem(key)
        for (let i = 1; i <= 3; i++) {
            let key = i
            if (idx.toString() == (i-1).toString()) {
                this._ui["btn_bg_"+i].skin = "daye_phz/setting/img_point_2.png"
            }
            else {
                this._ui["btn_bg_"+i].skin = "daye_phz/setting/img_point_1.png"
            }
        }
    }
    
    public setBgCallback(callback) {
        this.bgCallback = callback
    }

    private setBg(number) {
        if (this.bgCallback) {
            this.bgCallback(number-1)
            this.hide()
        }
    }

}
