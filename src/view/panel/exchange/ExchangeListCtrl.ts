class ExchangeListCtrl extends BaseCtrl{
    
    public type_list = [
        {hot:1,
        name:"道具"},
        {hot:0,
        name:"电话卡"},
        {hot:1,
        name:"红包"}
    ]
    public reward_list = [
        [{bg:"exchange/item.png",name:"记牌器1天",new:1,cost:100},
        {bg:"exchange/item.png",name:"记牌器2天",new:1,cost:100},
        {bg:"exchange/item.png",name:"记牌器3天",new:1,cost:100},
        {bg:"exchange/item.png",name:"记牌器4天",new:1,cost:100}],
        [{bg:"exchange/card1.png",name:"记牌器1天",new:1,cost:100}],
        [{bg:"exchange/hongbao.png",name:"红包100",new:1,cost:100}],
    ]

    constructor() {
        super();
        this["name"] = "ExchangeListCtrl";
    }

    private static _instance: ExchangeListCtrl;
    public static get instance(): ExchangeListCtrl {
        if (!this._instance)
            this._instance = new ExchangeListCtrl();
        return this._instance;
    }

    protected _ui: ui.dialog.ExchangeListUI;

    private _data
    show(data){
        this._data = data;
        
        this.showself();
    }

    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.dialog.ExchangeListUI();
            this._ui._list.scrollBar.visible = false;
            this._ui._list.itemRender = ExchangeListRender;
            this._ui._list.renderHandler = new Laya.Handler(this, this.updateRank);
            this._ui._list.mouseHandler = new Laya.Handler(this, this.onClick);
            this._ui._list.array= [];    
        
        }
        super.beforeShow();
        this.initView();
        this.onShow();
    }

    private _selectType
    
    //初始化界面
    public initView(): void {
         webService.getPrizeHistory((response) => {
            if (response.code == 0) {
                this._ui._list.array= response.history; 
            }
        });
    }

    private onClick(e:Laya.Event,index:number){
        if(e.type == "mousedown"){
            //领奖
            if(e.target.name == "reward"){
                HintCtrl.instance.show("lalalala")
            }
        }
    }

    protected updateRank(cell: ExchangeListRender, index: number){
        cell.updata(index)
    }
}

class ExchangeListRender extends ui.dialog.ExchangeRecordUI{
    constructor(){
        super()
    }
    updata(index){
        console.info(this.dataSource)
        this._id.text = this.dataSource.id;
        this._name.text = this.dataSource.prize_name;
        this._time.text = this.dataSource.update_time;
        this._status.text = this.dataSource.check_status;
        // if(this.dataSource.check_note){
        //     this._reward.visible = true
        // }else{
        //     this._reward.visible = false
        // }
        
    }
}

