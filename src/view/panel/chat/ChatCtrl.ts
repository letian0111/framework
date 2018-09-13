/*
* @author seacole
 * 创建桌子
*/
class ChatCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "ChatCtrl";
    }

    private static _instance: ChatCtrl;
    public static get instance(): ChatCtrl {
        if (!this._instance)
            this._instance = new ChatCtrl();
        return this._instance;
    }

    protected _ui: ui.panel.ChatNUI;
    private _listEmojData: any[];
    private _listMesData: any[];
    private _selectTab: number = 0;
    private _type: number;
    private _data: any;
    private _isMsg = false

    public static TYPE_REAL_TIME: number = 1;
    public static TYPE_GAME_END: number = 2;

    private test(e: Laya.Event) {
        this.hide();
    }
    public show(): void {
        this._selectTab = 0;
        this.showself();
    }
    public hide(): boolean {
        if (this._ui) {
            this._ui.removeSelf();
            return true;
        }
        if (this._uiMask) {
            this._uiMask.removeSelf();
            return true;
        }
        return false;
    }
    /**
     * 这里完成new ui，添加注册监听等初始化工作
     */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.ChatNUI();
            this._ui._emoList.itemRender = emojiRender;
            this._ui._emoList.scrollBar.visible = false;
            this._ui._emoList.renderHandler = new Laya.Handler(this, this.updateListResult);
            this._ui._mesList.itemRender = mesRender;
            this._ui._mesList.scrollBar.visible = false;
            this._ui._mesList.renderHandler = new Laya.Handler(this, this.updateListVisiter);
            EventManager.instance.registerOnObject(this, this._ui._emoji, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._message, Laya.Event.CLICK, this, this.onTouch)
            this._ui._emoList.selectEnable = true;
            //this._ui._emoList.mouseHandler = new Laya.Handler(this, this.onEmoji);
            this._ui._mesList.selectEnable = true;
            this._ui._mesList.mouseHandler = new Laya.Handler(this, this.onMessage);
            //this._ui._close.visible = false;
            //this._ui._close.on(Laya.Event.CLICK, this, this.hide)
            // this._ui.on(Laya.Event.CLICK, AppControl.getInstance().AppStage.BGLevel, this.test)
            // this._ui.on(Laya.Event.CLICK, AppControl.getInstance().AppStage.MainLevel, this.test)
            //this._ui.on(Laya.Event.CLICK, AppControl.getInstance().AppStage.GUILevel, this.test)
            // this._ui.on(Laya.Event.CLICK, AppControl.getInstance().AppStage.ToolTipLevel, this.test)
            // this._ui.on(Laya.Event.CLICK, AppControl.getInstance().AppStage.SystemLevel, this.test)
            // this._ui.on(Laya.Event.CLICK, AppControl.getInstance().AppStage.LoadingLevel, this.test)
            // EventManager.instance.registerOnObject(this, this._ui._btnClose, Laya.Event.CLICK, this, this.onTouch);
            this._ui._uiMask.visible = false
            this._ui._mesList.repeatY = 14
        }
        super.beforeShow();
        this.onShow();
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
            this._ui._mesList.scrollBar.touchScrollEnable = false;
            this._ui._mesList.scrollBar.mouseWheelEnable = false;
            this._ui._emoList.scrollBar.touchScrollEnable = false;
            this._ui._emoList.scrollBar.mouseWheelEnable = false;
        }
        if (e.type == "mouseout") {
            this._ui._mesList.scrollBar.touchScrollEnable = true;
            this._ui._mesList.scrollBar.mouseWheelEnable = true;
            this._ui._emoList.scrollBar.touchScrollEnable = true;
            this._ui._emoList.scrollBar.mouseWheelEnable = true;
        }
        if (e.type == "mouseup") {
            this._ui._mesList.scrollBar.touchScrollEnable = true;
            this._ui._mesList.scrollBar.mouseWheelEnable = true;
            this._ui._emoList.scrollBar.touchScrollEnable = true;
            this._ui._emoList.scrollBar.mouseWheelEnable = true;
        }
    }
    private onEmoji(e: Laya.Event, index: number) {
        if (e.type == "click") {
            console.log("index=============" + index)
            server.playerChatReq(GameDef.CHAT_TYPE.EMOJI, String(index))
            this.hide()
        }
    }

    private onMessage(e: Laya.Event, index: number) {
        if (e.type == "click") {
            console.log("index=============" + index)
            this.hide()
            if(this._isMsg){
                HintCtrl.instance.show("十秒内请不要频繁点击！")
                
                return
            }
             Laya.timer.once(10*1000, this, function(){  
                this._isMsg = false
             })
            server.playerChatReq(GameDef.CHAT_TYPE.QUICK_MESSAGE, String(index))
            this._isMsg = true
            
            
        }
    }
    /**
    * 开启监听，配置宽高，添加到舞台
    */
    public onShow(): void {
        this._ui._tabBtn.selectedIndex = 0
        //Utils.injectProp(this._ui._chatbox, BaseGameData.tablelayout.CHAT_CONTENT_LAYOUT)
        this._ui._chatbox.right = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + 0 : 0;
        this._ui._chatbox.centerY = 0
        this.checkTab();
        this._ui._mesList.array = GameDef.CHAT_MESSAGE[BaseGameData.gameType]
        let len = ChatContent.CHAT_EMOJI.length
        let arr = []
        for (let i = 0; i < len; i += 2) {
            let data = []
            data.push({
                source: "emoji/e"+(i+1)+".png",
                index: i
            })
            if (i + 1 < len) data.push({
                source: "emoji/e"+(i+2)+".png",
                index: i + 1
            })
            arr.push(data)
        }
        this._ui._emoList.array = arr
        this._ui._mesList.array = GameDef.CHAT_MESSAGE[BaseGameData.gameType]
        super.onShow();
        // this.tweenSelf();

    }

    // protected tweenSelf():void
    // {
    //     this._ui.right=414;
    //     this._ui.bottom=155;
    //     this._ui.scale(0,0);
    //     Laya.Tween.clearTween(this._ui);
    //     Laya.Tween.to(this._ui,{scaleX:1,scaleY:1,right:120,bottom:0},200,Laya.Ease.backOut);
    // }

    /**
     * 离开时调度
     */
    public afterShow(): void {
        super.afterShow();
    }

    private onTouch(e: Laya.Event): void {
        switch (e.currentTarget) {
            // case this._ui._btnClose:
            //     this.hide();
            //     break;

            case this._ui._emoji:
                this.selectTab = 1;
                break;

            case this._ui._message:
                this.selectTab = 0;
                break;
        }
    }

    private set selectTab(value: number) {
        if (this._selectTab != value) {
            this._selectTab = value;
            this.checkTab();
        }
    }
    private onresize(){
        super.onResize()
         this._ui._chatbox.right = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + 0 : 0;
    }


    private checkTab(): void {
        // if (this._selectTab == 0) {
        //     this._ui._emoji.alpha = 1;
        //     this._ui._message.alpha = 0.01;
        // }else {
        //     this._ui._emoji.alpha = 0.01;
        //     this._ui._message.alpha = 1;
        // }
        this._ui._emojiBox.visible = this._selectTab == 1;
        this._ui._mesBox.visible = this._selectTab == 0;
        if (this._selectTab == 0) {
            this._ui._message.skin = "chat/tab_msg_selected_bg.png"
            this._ui._msg_s1.visible = false
            this._ui._msg_us1.visible = true

            this._ui._emoji.skin = "chat/tab_emoj_unselected_bg.png"
            this._ui._e_s1.visible = true
            this._ui._e_us1.visible = false
        } else {
            this._ui._message.skin = "chat/tab_msg_unselected_bg.png"
            this._ui._msg_s1.visible = true
            this._ui._msg_us1.visible = false

            this._ui._emoji.skin = "chat/tab_emoj_selected_bg.png"
            this._ui._e_s1.visible = false
            this._ui._e_us1.visible = true
        }
    }

    /***渲染单元格时的回调方法***/
    private updateListResult(cell: emojiRender, index: number): void {
        cell.update(index);
        this.addLisitener(cell)
    }

    /***渲染单元格时的回调方法***/
    private updateListVisiter(cell: mesRender, index: number): void {
        cell.update(index);
        this.addLisitener(cell)
    }


}

class emojiRender extends ui.panel.EmojiItemUI {

    private _index1: number
    private _index2: number

    constructor() {
        super();
        this.init()
    }

    protected init() {
        this._e1.on(Laya.Event.CLICK, this, this.onEmoji)
        this._e2.on(Laya.Event.CLICK, this, this.onEmoji)
    }

    protected onEmoji(e: Laya.Event) {
        let idx = this._index1
        if (this._e1 == e.target) {
            log("e1" + this._index1)
        } else if (this._e2 == e.target) {
            log("e2" + this._index2)
            idx = this._index2
        }
        server.playerChatReq(GameDef.CHAT_TYPE.EMOJI, String(idx))
        ChatCtrl.instance.hide()
    }

    public update(index) {
        let len = this.dataSource.length
        this._index1 = this.dataSource[0].index
        this._e1.skin = this.dataSource[0].source
        if (1 == len) {
            this._e2.visible = false
            this._index1 = -1
        } else {
            this._index2 = this.dataSource[1].index
            this._e2.skin = this.dataSource[1].source
        }

    }
}

class mesRender extends ui.panel.MsgItemUI {
    private _line
    constructor() {
        super()
        this.init()
    }
    protected init() {
        this._line = new Laya.Image("chat/icon_line.png")
        this.addChild(this._line)
        this._line.centerX = 0
        this._line.bottom = 1
    }

    public update(index) {
        this._msg.text = this.dataSource
    }
}