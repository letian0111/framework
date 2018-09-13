class SevenDayCtrl extends BaseCtrl{
    
    public type_list = [
        {hot:1,
        name:"7日"},
     
    ]
    public task_list

    constructor() {
        super();
        this["name"] = "SevenDayCtrl";
    }

    private static _instance: SevenDayCtrl;
    public static get instance(): SevenDayCtrl {
        if (!this._instance)
            this._instance = new SevenDayCtrl();
        return this._instance;
    }

    protected _ui: ui.panel.ActivityUI;

    private _data
    show(){
        this._selectType = 0;
        
        this.showself();
    }

    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.panel.ActivityUI();
            EventManager.instance.registerOnObject(this, this._ui._close, Laya.Event.CLICK, this, this.hide);
            this._ui._typelist.scrollBar.visible = false;
            this._ui._rewardlist.scrollBar.visible = false;
            this._ui._typelist.itemRender = ExchangetypeRender;
            this._ui._typelist.renderHandler = new Laya.Handler(this, this.updateRank);
            this._ui._typelist.mouseHandler = new Laya.Handler(this, this.onClick);
            this._ui._typelist.array= this.type_list;
            this._ui._rewardlist.itemRender = SevenDayRender;
            this._ui._rewardlist.renderHandler = new Laya.Handler(this, this.updateReward);
            this._ui._rewardlist.mouseHandler = new Laya.Handler(this, this.exchange)
            this._ui._rewardlist.array=[];
        
        }
        super.beforeShow();
        this.initView();
        this.onShow();
    }

    private _selectType
    public _curTaskId
    public _curTaskPro
    //初始化界面
    public initView(): void {
        
        webService.getTaskList((response) => {
            if (response.code == 0) {
                this.task_list = response.task;
                
                webService.getTaskStatus((response) => {
                    if (response.code == 0) {
                        this._curTaskId = response.task.cur_task_id;
                        this._curTaskPro = response.task.cur_task_progress;
                    }
                    for(var i = 1; i < this.task_list.length; i++){
                        this.task_list[i-1].status = response.task["status_"+i]
                    }

                    this.checkTab();
                });
                
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
        //    BindPhoneCtrl.instance.show()
      
        }
    }

    private checkTab(){
       this._ui._rewardlist.array = this.task_list
    }

    protected updateRank(cell: ExchangetypeRender, index: number){
        cell.updata(index, this._selectType)
    }

    protected updateReward(cell: SevenDayRender, index: number){
        cell.updata(index, this._curTaskId, this._curTaskPro)
    }
}

class SevenDayRender extends ui.panel.ActivityRenderUI{
    constructor(){
        super()
    }

    updata(index, taskid, progress){
        this._icon.skin = ""
        this._tite.text = this.dataSource.desc
        this._reward.text = this.dataSource.rewards_desc
        this._day.skin = "activity/day"+this.dataSource.id+".png"
        if(this.dataSource.rewards_ticket){
            this._icon.skin = "lottery/3.png"
        }else if(this.dataSource.rewards_diamond){
            this._icon.skin = "lottery/2.png"
        }else if(this.dataSource.rewards_hongbao){
            this._icon.skin = "lottery/4.png"
        }
        if(this.dataSource.id < taskid){
            this._mask.visible = true
            this._pre.value = 1
            this._pre.visible = true
            this._finish.visible = true
            this._bg.visible = true
            this._bg1.visible = true
            if(this.dataSource.status > 1){
                this._finish.skin = "activity/finished.png"
            }else{
               this._finish.skin = "dialog/btn_linqu.png" 
            }

        }else if(this.dataSource.id == taskid){
            this._mask.visible = false
            this._pre.value = progress/this.dataSource.count
            if(this.dataSource.status > 1){
                this._finish.skin = "activity/finished.png"
            }else if(this.dataSource.status == 1){
               this._finish.skin = "dialog/btn_linqu.png" 
            }else{
                this._finish.skin = "activity/finish.png"
            }
        }else{
            this._mask.visible = false
            this._tite.text = "任务暂未开启"
            this._pre.visible = false
            this._reward.text = ""
            this._finish.visible = false
            this._bg.visible = false
            this._bg1.visible = false
        }
    }
}