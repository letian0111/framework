
class LotteryCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "LotteryCtrl";
    }

    protected _ui: ui.dialog.LotteryUI;

    protected static _instanceInGame: LotteryCtrl;
    public static get instance(): LotteryCtrl {
        if (!this._instanceInGame)
            this._instanceInGame = new LotteryCtrl();
        return this._instanceInGame;
    }

    public _data
    private wheelState;
    private curSpeed;
    private gearNum;
    private defaultAngle;
    private gearAngle;
    private finalAngle;
    private decAngle;
    private spinTime;
    private config = {
        maxSpeed: {
            default: 5,
            max: 15,
            min: 2,
            tooltip: "最大速度"
        },
        duration: {
            default: 3,
            max: 5,
            min: 1,
            tooltip: "减速前旋转时间"
        },
        acc: {
            default: 0.1,
            max: 0.2,
            min: 0.01,
            tooltip: "加速度"
        }
    }
    private maxSpeed;
    private duration;
    private acc;
    private targetID = 0;
    private rewards = [
        {type:1,amount:100},
        {type:2,amount:100},
        {type:3,amount:100},
        {type:4,amount:100},
        {type:1,amount:100},
        {type:2,amount:100},
        {type:3,amount:100},
        {type:4,amount:100},
        
    ]
    public show(data) {
        this._data = data;
        this.showself();
    }
// -- 1 金币 2 钻石 3 奖券 4 红包
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.dialog.LotteryUI();
            EventManager.instance.registerOnObject(this, this._ui._start, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._share, Laya.Event.CLICK, this, this.share);
            EventManager.instance.registerOnObject(this, this._ui._chaxun, Laya.Event.CLICK, this, this.showList);
            EventManager.instance.registerOnObject(this, this._ui._back, Laya.Event.CLICK, this, this.hideList);
            EventManager.instance.registerOnObject(this, this._ui._close, Laya.Event.CLICK, this, this.hide);
            this._ui._list.scrollBar.visible = false;
            this._ui._list.itemRender = LotteryRender;
            this._ui._list.renderHandler = new Laya.Handler(this, this.updateReward);
            this._ui._list.array = [];
            this._ui._selflist.scrollBar.visible = false;
            this._ui._selflist.itemRender = LotterySelfRender;
            this._ui._selflist.renderHandler = new Laya.Handler(this, this.updateSelfReward);
            this._ui._selflist.array = [];
            
            for(var k in this._data){
                let v = this._data[k]
                let item = new ui.dialog.LotteryItemUI()
                item._rewardType.skin = "lottery/"+ v.money_type + ".png"
                item._amount.text = String(v.money);
                item.rotation = parseInt(k)*45;
                item.centerX = 0;
                item.y = 262.5
                this._ui._roll.addChild(item);
            }
        }

        EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.RESIZE, this, this.onResize);

        EventManager.instance.registerOnObject(this, this._ui, Laya.Event.REMOVED, this, this.afterShow);
        this.onShow();
    }

    public onShow(): void {
        super.onShow();
        webService.lotteryHistory(null, function(data){
            this._ui._list.array = data.history;
        }.bind(this))
        this._ui._self.visible = false
        this._ui._back.visible = false
    }

    public showList(){
        this._ui._self.visible = true
        this._ui._back.visible = true
        this._ui._share.visible = false
        webService.lotteryHistory(server.uid, function(data){
            this._ui._selflist.array = data.history;
        }.bind(this))
    }

    public hideList(){
        this._ui._self.visible = false
        this._ui._back.visible = false
        this._ui._share.visible = true
    }

    public share(){
        var path = "res/bg/"+GameConfig.CHANNEL+".jpg"
        Native.instance.share(5,1,"","",path)
    }

    public onTouch() {
        if (this.wheelState) {
            return
        }else{
            webService.lottery(function(data){
                this._ui._ani.visible = false;
                this._ui.ani1.stop();
                this.targetID = data.lotteryid;
                this.decAngle = 2 * 360;
                this.wheelState = 1;
                this.curSpeed = 0;
                this.spinTime = 0;
                this.defaultAngle = 360 / 8 ;
                this.gearNum = 8;
                
                this.gearAngle = 360 / this.gearNum;
                this.maxSpeed = MathUtils.makeRandomInt(this.config.maxSpeed.max, this.config.maxSpeed.min);
                this.acc = parseFloat(MathUtils.makeRandomFloat(this.config.acc.max, this.config.acc.min).toFixed(2));
                this.duration = MathUtils.makeRandomInt(this.config.duration.max, this.config.duration.min);
                Laya.timer.frameLoop(1, this, this.onTime);
            }.bind(this))
        }
       

    }
    

    public updateReward(cell: LotteryRender, index: number) {
        cell.updata(index)
    }

    public updateSelfReward(cell: LotteryRender, index: number) {
        cell.updata(index)
    }

    public onTime() {
        if (this.wheelState === 0) {
            return;
        }

        if (this.wheelState == 1) {
            // cc.log('....加速,speed:' + this.curSpeed);
            this.spinTime += 1;
            this._ui._roll.rotation = this._ui._roll.rotation + this.curSpeed;
            if (this.curSpeed <= this.maxSpeed) {
                this.curSpeed += this.acc;
            }
            else {
                if (this.spinTime < this.duration) {
                    return;
                }
                this.finalAngle = 360 - this.targetID * this.gearAngle + this.defaultAngle;
                this.maxSpeed = this.curSpeed;
                this._ui._roll.rotation = this.finalAngle;
                this.wheelState = 2;
            }
        }
        else if (this.wheelState == 2) {
            // cc.log('......减速');
            var curRo = this._ui._roll.rotation; 
            var hadRo = curRo - this.finalAngle;
            this.curSpeed = this.maxSpeed * ((this.decAngle - hadRo) / this.decAngle) + 0.2;
            this._ui._roll.rotation = curRo + this.curSpeed;

            if ((this.decAngle - hadRo) <= 0) {
                this.wheelState = 0;
                this._ui._roll.rotation = this.finalAngle;
                Laya.timer.clearAll(this)
                this._ui._ani.visible = true;
                this._ui.ani1.play(1,true)
            }


        }
    }
}

class LotteryRender extends ui.dialog.LotteryRenderUI {
    constructor() {
        super()
    }

    updata(index) {
        console.info(this.dataSource)
        this._name.text = this.dataSource.id_name;
        this._reward.text = this.dataSource.prize_name;
    }
}

class LotterySelfRender extends ui.dialog.LotterySelfRenderUI {
    constructor() {
        super()
    }

    updata(index) {
        console.info(this.dataSource)
        this._no.text = String(this.dataSource.create_time) + String(this.dataSource.id);
        this._time.text = TimeUtils.formatDateTime(this.dataSource.create_time*1000)
        this._name.text = this.dataSource.prize_name
    }
}