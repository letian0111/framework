class ExchangeCtrl extends BaseCtrl{
    
    public type_list = [
        {hot:1,
        name:"道具"},
        {hot:0,
        name:"电话卡"},
        {hot:0,
        name:"红包"}
    ]
    public reward_list = [
        [],[],[]
        // [{bg:"exchange/item.png",name:"记牌器1天",new:1,cost:100},
        // {bg:"exchange/item.png",name:"记牌器2天",new:1,cost:100},
        // {bg:"exchange/item.png",name:"记牌器3天",new:1,cost:100},
        // {bg:"exchange/item.png",name:"记牌器4天",new:1,cost:100}],
        // [{bg:"exchange/card1.png",name:"记牌器1天",new:1,cost:100}],
        // [{bg:"exchange/hongbao.png",name:"红包100",new:1,cost:100}],
    ]

    constructor() {
        super();
        this["name"] = "ExchangeCtrl";
    }

    private static _instance: ExchangeCtrl;
    public static get instance(): ExchangeCtrl {
        if (!this._instance)
            this._instance = new ExchangeCtrl();
        return this._instance;
    }

    protected _ui: ui.dialog.ExchangeUI;

    private _data
    show(){
        this._selectType = 0;
        
        this.showself();
    }

    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.dialog.ExchangeUI();
            EventManager.instance.registerOnObject(this, this._ui._close, Laya.Event.CLICK, this, this.hide);
            EventManager.instance.registerOnObject(this, this._ui._his, Laya.Event.CLICK, this, this.showhis);
            this._ui._typelist.scrollBar.visible = false;
            this._ui._rewardlist.scrollBar.visible = false;
            this._ui._typelist.itemRender = ExchangetypeRender;
            this._ui._typelist.renderHandler = new Laya.Handler(this, this.updateRank);
            this._ui._typelist.mouseHandler = new Laya.Handler(this, this.onClick);
            this._ui._typelist.array= this.type_list;
            this._ui._rewardlist.itemRender = ExchangeRewardRender;
            this._ui._rewardlist.renderHandler = new Laya.Handler(this, this.updateReward);
            this._ui._rewardlist.mouseHandler = new Laya.Handler(this, this.exchange)
            this._ui._rewardlist.array=[];
        
        }
        super.beforeShow();
        this.initView();
        this.onShow();
    }

    private _selectType
    
    //初始化界面
    public initView(): void {
        webService.getPrizeList((response) => {
            if (response.code == 0) {
                for (let item of response.prizes){
                    this.reward_list[Math.floor(item.group/100)-1].push(item)
                }
                this.checkTab();
            }
        });
    }

    private onClick(e:Laya.Event,index:number){
        if(e.type == "mousedown"){
            this._selectType = index;
            this._ui._typelist.array= this.type_list;
            this.checkTab()
        }
    }

    private showhis(){
        ExchangeListCtrl.instance.show({})
    }

    private exchange(e:Laya.Event,index:number){
        if(e.type == "mousedown"){
            if(!GameLogic.selfData.phone){
                BindPhoneCtrl.instance.show()
            }else{
                console.info(this.reward_list[this._selectType][index])
                webService.exchangePrize(1,1,function(data){
                    console.info(data)
                    if(data.code == 0){
                        HintCtrl.instance.show("兑换成功!")
                    }else{
                        HintCtrl.instance.show("兑换失败!")
                    }
                })
            }
        }
    }

    private checkTab(){
       this._ui._rewardlist.array = this.reward_list[this._selectType] 
    }

    protected updateRank(cell: ExchangetypeRender, index: number){
        cell.updata(index, this._selectType)
    }

    protected updateReward(cell: ExchangeRewardRender, index: number){
        cell.updata(index)
    }
}

class ExchangetypeRender extends ui.dialog.ExchangeTypeUI{
    constructor(){
        super()
    }  

    updata(index, selectType){
        this._txt.text = this.dataSource.name;
        if(selectType == index){
            this._btn.skin = "exchange/type1.png"
            this._txt.color = "#c10900"
        }else{
            this._btn.skin = "exchange/type0.png"
            this._txt.color = "#a3703f"
        }
        if(this.dataSource.hot > 0){
            
            this._hot.visible = true
           
        }else{
            this._hot.visible = false
        }
     
    }
}

class ExchangeRewardRender extends ui.dialog.ExchangeItemUI{
    constructor(){
        super()
    }

    updata(index){
        this._bg.skin = "exchange/"+this.dataSource.image;
        this._cost.value = this.dataSource.ticket_cnt;
        this._new.visible = this.dataSource.tag ? true : false;
        this._name.text = this.dataSource.name;
        
    }
}