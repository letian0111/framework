/*
* @author seacole
* 大厅顶部组件;
*/
class HHHallTopUI extends ui.components.Hall.HHHallTopUI {
    private _head: HeadUI;
    constructor() {
        super();
        this.name = "HHHallTopUI";
        this._head = new HeadUI();
        this._head.setImageBounds(90, 90)
        this._head.nameLimit = 20
        this._head.setLabName({ x: 148, y: 12, align: "left", color: "#0d0d0d", fontSize: 24 });
        this._head.setLabInfo(HeadUI.TYPE_UID, { x: 79, y: 63, align: "left", color: "#bee7fe", fontSize: 22 });
        this._head.pos(0, 0);
        this._headinfo.addChild(this._head);
        this._head.setVisiableNameAndID(false);

        
        // if(GameConfig.IS_IOS_EXAMINE){
        //     this._btn_exchange.visible = false
        //      this._ticketNum.visible = false
        // }

        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.REFRESH_ROLE_INFO, this, this.onRefreshRoleInfo);
        EventManager.instance.registerOnObject(this, this._btn_buydiamond, Laya.Event.CLICK, this, this.onTouch);
        // EventManager.instance.registerOnObject(this, this._btn_exchange, Laya.Event.CLICK, this, this.onTouch);
        //EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.RESIZE, this, this.onResize);

        this.initBg()
        // this._btn_exchange.mouseEnabled = false
        EventManager.instance.enableOnObject(this);
    }


    protected initBg(){
        if (GameConfig.CID == GameDef.APP_TYPE.DAYE) {
            this._bg.skin = "res/img/img_daye_topdi.png"
        }
    }
    /**
    * 鼠标点击事件
    */
    private onTouch(e: Laya.Event,param) {
        switch (e.currentTarget) {
             case this._btn_buydiamond:
            //购买钻石
            log("弹出商城");
             ShopCtrl.instance.show();
                break;
            // case this._btn_exchange:
            // //奖券兑换
            // log("弹出兑换");
            //     break;
        }
    
    }

     private onRefreshRoleInfo(): void {
        this._head.data = GameLogic.selfData;
        //Utils.getFitNickName(GameLogic.selfData.nickname,6)

        this._name.text = Utils.getFitNickName(GameLogic.selfData.nickname,6)

        this._id.text = "ID:"+GameLogic.selfData.uid
        this._btn_buydiamond.label = ""+GameLogic.selfData.diamond
        // this._btn_exchange.label = ""+GameLogic.selfData.ticket
        // this._diamondNum.text = ""+GameLogic.selfData.diamond
        // this._ticketNum.text = "0"
    }
     
}