
class BxxCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "BxxCtrl";
    }

    private static _instance: BxxCtrl;
    public static get instance(): BxxCtrl {
        if (!this._instance)
            this._instance = new BxxCtrl();
        return this._instance;
    }

    public _ui: ui.mj.GameEndUI;
    private _listScoreData: any[];
    private _data: Array<any>;
    private _endType: number;
    private _winType: number

    public show(): void {
        this.showself();
    }

   
    

    /**
     * 这里完成new ui，添加注册监听等初始化工作
     */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.mj.GameEndUI();
        }
        super.beforeShow();
        this.onShow();
    }

    /**
    * 开启监听，配置宽高，添加到舞台
    */
    public onShow(): void {
        super.onShow();
        
    }
   
    /**
     * 离开时调度
     */
    public afterShow(): void {
        super.afterShow();
    }

}