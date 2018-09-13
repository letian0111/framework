class BindPhoneCtrl extends BaseCtrl {

    constructor() {
        super();
        this["name"] = "BindPhoneCtrl";
    }

    private static _instance: BindPhoneCtrl;
    public static get instance(): BindPhoneCtrl {
        if (!this._instance)
            this._instance = new BindPhoneCtrl();
        return this._instance;
    }

    protected _ui: ui.components.BindPhoneUI;

    private _data
    show() {
        this._selectType = 0;

        this.showself();
    }

    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.components.BindPhoneUI();
            EventManager.instance.registerOnObject(this, this._ui._code, Laya.Event.CLICK, this, this.code);
            EventManager.instance.registerOnObject(this, this._ui._bind, Laya.Event.CLICK, this, this.bind);
            // EventManager.instance.registerOnObject(this, this._ui._phone, Laya.Event.CHANGE, this, this.change);

        }
        super.beforeShow();
        this.initView();
        this.onShow();
    }

    private _selectType

    public 

    //初始化界面
    public initView(): void {

    }

    private checkMobile(str) {
        console.info(str)
        var re = /^1\d{10}$/
        if (re.test(str)) {
            alert("正确");
            webService.getPhoneCode(str, function(data){
                console.info(data)
            })
        } else {
            HintCtrl.instance.show("手机号不正确")
        }
    }

    private code() {
       this.checkMobile(this._ui._phone.text)
    }

    private bind() {
        var re = /^\d{6}$/ 
        if(!re.test(this._ui._verify.text)){
            HintCtrl.instance.show("验证码不正确");
            return
        }
        webService.bindPhone(this._ui._phone.text, this._ui._verify.text, function(data){
            console.info(data)
            if(data.code == 1008){
                HintCtrl.instance.show("验证码不正确");
            }else if(data.code == 1009){
                HintCtrl.instance.show("手机号已绑定");
            }else{
                HintCtrl.instance.show("绑定成功");
                GameLogic.selfData.phone = this._ui._phone.text
            }
        }.bind(this))
    }






}
