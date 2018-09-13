/*
* @author seacole
 * 创建桌子
*/
class CreateRoomCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "CreateRoomCtrl";
    }
    protected _createInfo = {}
    protected _newCreateInfo = {}
    protected _desc = {}
    public _cost        
    public _costDivide
    public _costs           
    private _gameType

    public _totalCost           //房主付需要消耗的钻石
    public _costPeopleNum       //钻石消耗人数

    private static _instance: CreateRoomCtrl;
    public static get instance(): CreateRoomCtrl {
        if (!this._instance)
            this._instance = new CreateRoomCtrl();
        return this._instance;
    }

    protected _ui: ui.panel.CreateRoomUI;
    private _name
    private _data
    private _tabBtns
    private _paytype: number;
    private _games;
    private _type = "-1";  //游戏类型

    private _tabIndex = 0;  //0是创建房间 1是玩法介绍
    private _gameArray = []
    public _cid: number;

    private iHtml: Laya.HTMLIframeElement;

    private arrayCreateRoomGame = {}
    public show(cid: number = 0, paytype: number = 0): void {
        Laya.MouseManager.multiTouchEnabled = false
        //this._gameType = type
        //this._data = param
        this._games = GameDef.showGames

        this._cid = cid;
        this._paytype = paytype

        this.showself();
    }

    /**
     * 这里完成new ui，添加注册监听等初始化工作
     */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.CreateRoomUI();
            EventManager.instance.registerOnObject(this, this._ui._btnCreate, Laya.Event.CLICK, this, this.onTouch);
            this._ui._btnBack.on(Laya.Event.CLICK, this, this.hide)
            //this._ui._btnCreate.on(Laya.Event.CLICK, this, this.onTouch)
            this._ui._rulePanel.vScrollBar.visible = false
            this._ui._wanfaPanel.vScrollBar.visible = false
            this._ui._rulePanel.content.hitTestPrior = false
            this._ui._rulePanel.hitTestPrior = false

            this._ui._gamelist.itemRender = CreateRoomRender
            this._ui._gamelist.scrollBar.visible = false;
            this._ui._gamelist.scrollBar.elasticDistance = 90;
            this._ui._gamelist.renderHandler = new Laya.Handler(this, this.updateGameList);
            this._ui._gamelist.array = [];
            this._ui._gamelist.mouseHandler = new Laya.Handler(this, this.tabTouch);
        }
        super.beforeShow();
        this.initView();
        this.onShow();
    }
    //初始化界面
    public initView(): void {
        this._gameArray = []
        GameConfig.GAME_NAMES = GameConfig.GAME_NAMES || []
        for (var k in this._games) {
            let v = this._games[k]
            let type = v[0] || 1
            let name = GameDef.GAME_NAME[type-1]
            let data = {type:v[0], name:String(k), isSelect: false, order:GameConfig.GAME_NAMES.indexOf(name)}
            this._gameArray.push(data)
        }
        this._gameArray.sort(function(a, b){
            if (a.order < b.order) 
                return -1
            else
                return 1
        })
        this._ui._gamelist.array = this._gameArray
        EventManager.instance.registerOnObject(this, this._ui._title_create, Laya.Event.CLICK, this, this.topTabTouch);
        EventManager.instance.registerOnObject(this, this._ui._title_wanfa, Laya.Event.CLICK, this, this.topTabTouch);
    }


    /**
    * 开启监听，配置宽高，添加到舞台
    */
    public onShow(): void {
        super.onShow();

        //始终展示规则页面
        this._ui._wanfaUI.visible = false
        this._ui._ruleUI.visible = true
        Laya.Tween.to(this._ui._title_selectSlider, { x: 128, y: 36 }, 0, null);
        this.tweenSelf(this.checkLocal.bind(this));

        
        this._ui._rulePanel.visible = true
    }
    /**
     * 离开时调度
     */
    public afterShow(): void {
        super.afterShow();
        this.checkLocal()
        
    }

    private onTouch(e: Laya.Event): void {
        switch (e.currentTarget) {
            case this._ui._btnCreate:
                this.create();
                break;
        }
    }
    private topTabTouch(e: Laya.Event) {
        SoundManager.instance.playBtnEffect(SoundConfig.SOUND_BTN_NORMAL);
        if (e.currentTarget == this._ui._title_create) {
            this._ui._wanfaUI.visible = false
            this._ui._ruleUI.visible = true
            this._ui._rulePanel.visible = true
            Laya.Tween.to(this._ui._title_selectSlider, { x: 128, y: 36 }, 100, null);
        }
        else if (e.currentTarget == this._ui._title_wanfa) {
            this._ui._wanfaUI.visible = true
            this._ui._ruleUI.visible = false
            this._ui._rulePanel.visible = false
            Laya.Tween.to(this._ui._title_selectSlider, { x: 380, y: 36 }, 100, null);
        }
    }

    private tabTouch(e: Laya.Event, index:number): void {
        if (e && e.type != Laya.Event.CLICK) 
            return
        for (var k in this._gameArray) {
            let data = this._gameArray[k]
            data.isSelect = (index == parseInt(k))
        }
        this._ui._gamelist.array = this._gameArray
        let info = this._gameArray[index]
        this._gameType = info.name;
        //展示玩法内容
        this.showCreateInfo(info.name);

        //展示规则
        this.showGameRule(info.name);
        // log(e.currentTarget.name);
    }
    //设置标签页状态
   
    private showGameRule(type) {
        this._ui._wanfaPanel.removeChildren()
        let _href = ""
        _href = "res/html/"+GameDef.GAME_NAME[parseInt(type)-1]+".html"
        this.iHtml = new Laya.HTMLIframeElement();//span.normal {color : #925b3d;font-size : 24;font-family:"PingFangSC-Ruglar";line-height:18px}

        this.iHtml.style.fontSize = 24;
        this.iHtml.style.color = "#925b3d";
        this.iHtml.style.fontFamily = "PingFangSC-Ruglar";
        this.iHtml.style.leading = 20;
        this._ui._wanfaPanel.addChild(this.iHtml);
        this.iHtml.width = this._ui._wanfaPanel.width;
        Laya.timer.loop(300, this, this.onLoop);
        Laya.timer.once(60000, this, this.clearTimer);
        this.iHtml.href = _href;


    }
    private onLoop(): void {
        if (this.iHtml.height > this._ui._wanfaPanel.height) {
            this._ui._wanfaPanel.vScrollBar.stopScroll();
            this._ui._wanfaPanel.vScrollBar.setScroll(0, this.iHtml.height - this._ui._wanfaPanel.height, 0);
            this.clearTimer();
        }
    }

    private clearTimer(): void {
        Laya.timer.clear(this, this.onLoop);
        Laya.timer.clear(this, this.clearTimer);
    }

    private showCreateInfo(type) {
        this._ui._rulePanel.removeChildren()
        this._ui._chargePos.removeChildren()
        this._type = type
        this._name = GameDef.GAME_NAME[type - 1]
        let createInfo = GameConfig.getCreateInfoByGameName(this._name)
        let info = createInfo.createInfo
        this._cost = createInfo.cost
        this._costDivide = createInfo.costDivide
        this._costs = createInfo.costs

        let text = localStorage.getItem(this._name);
        this._createInfo = JSON.parse(text) || {};
        this._newCreateInfo = {}
        this._desc = {}
        let y = 0
        for (var k in info) {
            let view = new CreateItem()
            view.scaleX = 0.9
            view.scaleY = 0.9
            let data
            if (info[k].key == "charge_type" && this._cid && this._paytype == 1) {
                var tmp: any = {};
                Utils.deepCopy(info[k], tmp);
                tmp.des = ["俱乐部支付"];
                tmp.texts = ["俱乐部支付"];
                tmp.values = [2];
                view.dataSource = tmp;
                data = tmp
            }
            else {
                view.dataSource = info[k]
                data = info[k]
            }
           
            if (info[k].key == "charge_type") {
                let view = new ChargeSelect(data, this._createInfo, this._newCreateInfo, this._desc, this._ui._chargePos, this._ui._labelCost)
                view.x = -10
                view.y = -20
                this._ui._chargePos.addChild(view)
                if (this._cid && this._paytype == 1) {
                    this._newCreateInfo["charge_type"] = 2
                }
            }
            else {
                view.updata(this.updateKey.bind(this), this._createInfo, this._newCreateInfo, this._desc)
                view.y = y
                view.x = 10
                y = y + view.height

                this._ui._rulePanel.addChild(view)
            }
            this.addLisitener(view)
        }
    }
    public addLisitener(view) {
        view.on(Laya.Event.MOUSE_DOWN, this, this.onViewTouch)

        view.on(Laya.Event.MOUSE_MOVE, this, this.onViewTouch);

        view.on(Laya.Event.MOUSE_UP, this, this.onViewTouch);
        view.on(Laya.Event.MOUSE_OUT, this, this.onViewTouch);
    }
    public onViewTouch(e: Laya.Event) {
        // log(e.type)
        switch (e.type) {
        }
        if (e.type == "mousedown") {

            this._ui._rulePanel.vScrollBar.touchScrollEnable = false;
            this._ui._rulePanel.vScrollBar.mouseWheelEnable = false;
        }
        if (e.type == "mouseout") {
            this._ui._rulePanel.vScrollBar.touchScrollEnable = true;
            this._ui._rulePanel.vScrollBar.mouseWheelEnable = true;
        }
        if (e.type == "mouseup") {
            this._ui._rulePanel.vScrollBar.touchScrollEnable = true;
            this._ui._rulePanel.vScrollBar.mouseWheelEnable = true;
        }
    }
    public updateKey(key, value) {
        this._newCreateInfo[key] = value
        console.info(this._newCreateInfo)
    }
    protected checkLocal() {
        let text = localStorage.getItem("creatable");
        if (text) {
            let flag = true
            for (var k in this._gameArray) {
                let data = this._gameArray[k]

                if (data.type == text) {
                    this.tabTouch(null, parseInt(k));
                    flag = false
                }
            }

            if(flag){
                this.tabTouch(null, 0);
            }
        }
        else {
            this.tabTouch(null, 0);
        }
    }
    private create(): void {

        let desc = ""
        for (var k in this._desc) {
            if (k != "undefined" && this._desc[k] != "") {
                desc = desc + this._desc[k] + ","
            }
        }
        if (desc.length)
            desc = desc.substr(0, desc.length - 1);
        console.log("desc================" + desc)

        var str: string = JSON.stringify(this._newCreateInfo);

        console.info(this._desc)
        var score: string = "0"
        var count: string = this._newCreateInfo["max_hand_cnt"]
        webService.createTable(this._cid, this._gameType, this._name, count, this._newCreateInfo["max_player"], str, (response: any) => {
            if (response.code == 0) {
                if(response.game_name!=this._name ){
                    if (response.game_rule) {
                    let desc = ""
                    let rule = JSON.parse(response.game_rule)
                    for (var k in rule) {
                        let v = rule[k]

                        if ((k == "max_hand_cnt" || k == "charge_type" || k == "max_player") && MatchConfig.isMatch(response.game_mode))
                            continue;

                        let splitDes =  GameConfig.getShareInfoByGameName(response.game_name)[k][v]
                        if (splitDes && splitDes != "") {
                            desc = desc + splitDes + ","
                        }
                    }
                    if (desc.length)
                        desc = desc.substr(0, desc.length - 1);
                    GameConfig.DESC[response.game_code] = desc
                }

                }else
                {
                    this._newCreateInfo["desc"] = desc
                    var storeStr: string = JSON.stringify(this._newCreateInfo);
                    localStorage.setItem(this._name, storeStr);
                    localStorage.setItem("creatable", this._type);
                    GameConfig.DESC[response.game_code] = desc;
                }
              
                
                GameConfig.setServerUrl(response.ip);
                GameConfig.joinTable(response)
            }
            else {
                if (!club.ClubManager.dealClubErrorCode(response.code)) {
                    if (response.code == 1005) {
                        AlertInGameCtrl.instance.show(GameConfig.language.diamond_out, function (type) {
                            if (type == AlertCtrl.CONFIRM) {
                                ShopCtrl.instance.show();
                            }
                        });
                    } else if (response.code == 9001) {
                        HintCtrl.instance.show("操作太过频繁");
                    } else {
                        HintCtrl.instance.show(GameConfig.language.create_table_fail + " code:" + response.code);
                    }
                }
            }
        });
    }


    protected onResize(): void {
        this._ui.width = AppControl.getInstance().stage.width>1280? 1280 : AppControl.getInstance().stage.width;
        this._ui.height =  AppControl.getInstance().stage.height;
        //this._ui.centerY = AppControl.getInstance().stage.height > 1280 ? 1 : 0
        this._ui.centerX = AppControl.getInstance().stage.width > 1280 ? 1 : 0
        //this.setTabPos();
        //this._tabLobby.width = AppControl.getInstance().stage.width;
        AppControl.getInstance().resetScreen();
    }

    protected updateGameList(cell: CreateRoomRender, index: number): void {
        cell.update();
    }

}

class CreateRoomRender extends ui.panel.CreateRoomGameUI {
    constructor() {
        super();
    }

    public update() {
        let type = this._dataSource.type
        let isSelect = this._dataSource.isSelect

       
        this._select.visible = isSelect
        this._unselect.visible = !isSelect
        let color = isSelect ? "#c85200" : "#8a4e2c"
        this._gameName.color = color

        let name =GameDef.GAME_NAME[type - 1]
        let createInfo = GameConfig.getCreateInfoByGameName(name)
        this._gameName.text = createInfo.ch_name
        if(createInfo.test){
            this._imgTest.visible = true
            this._imgTest.skin = "createRoom/img_test.png"
        }
        else if(createInfo.new){
            this._imgTest.visible = true
            this._imgTest.skin = "createRoom/img_new.png"
        }
        else if(createInfo.hot){
            this._imgTest.visible = true
            this._imgTest.skin = "createRoom/img_hot.png"
        }else
        {
            this._imgTest.visible = false
        }


    }
}
