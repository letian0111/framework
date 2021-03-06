/*
*  @author seacole
* 商场竖;
*/
class ShopVCtrl extends ShopCtrl {
    constructor() {
        super();
        this["name"] = "ShopVCtrl";
    }

    private static _instance: ShopVCtrl;
    public static get instance(): ShopVCtrl {
        if (!this._instance)
            this._instance = new ShopVCtrl();
        return this._instance;
    }

    protected _ui: ui.panel.ShopVUI;

    /**
    * 这里完成new ui，添加注册监听等初始化工作
    */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.ShopVUI();
            this._ui._list.itemRender = ShopRenderer;
            this._ui._list.scrollBar.visible = false;
            this._ui._list.renderHandler = new Laya.Handler(this, this.updateList);
            this._ui._list.mouseHandler = new Laya.Handler(this, this.selectList);

            EventManager.instance.registerOnObject(this, this._ui._close, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.SHOP_CFG_GET, this, this.setList);
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.REFRESH_ROLE_INFO, this, this.onRefreshRoleInfo);
        }
        super.beforeShow();
        this.onShow();
    }
}