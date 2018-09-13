/*
*  @author seacole
* 俱乐部统计列表
*/
class ClubStatistics extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "ClubStatistics";
    }

    private static _instance: ClubStatistics;
    public static get instance(): ClubStatistics {
        if (!this._instance)
            this._instance = new ClubStatistics();
        return this._instance;
    }
    
    protected _months = [
        31, 28, 31, 30, 
        31, 30, 31, 31,
        30, 31, 30, 31
    ]
    protected _ui: ui.club.ClubStatisticsUI;
    protected _cid: number
    protected _infos = []
    
    public show(cid): void {
    	this._cid = cid
        this.showself()
    }
    /**
    * 这里完成new ui，添加注册监听等初始化工作
    */
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.club.ClubStatisticsUI();

            this._ui._list.itemRender = ClubStatisticsRenderer;
			this._ui._list.scrollBar.visible = false;
			this._ui._list.scrollBar.elasticDistance = 100;
			this._ui._list.renderHandler = new Laya.Handler(this, this.updateStatistics)
			this._ui._list.array = [];

            EventManager.instance.registerOnObject(this, this._ui._btn_close, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._btn_day7, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._ui._btn_day30, Laya.Event.CLICK, this, this.onTouch);
        }
        
        super.beforeShow();
        this.onShow();
    }

    public onShow(): void {
        super.onShow();
        // GameLogic.selfData.query();
        // if (GameConfig.cfgShop) {
        //     this.setList();
        // }
        // else {
        //     GameConfig.getShopCfg()
        // }
        this._ui._btn_day7.skin = "club/button/sBtn_day7_1.png"
        this._ui._btn_day30.skin = "club/button/sBtn_day30_1.png"
        this._infos = []
        clubWebService.getStatistics(this._cid, this.onGetData.bind(this))
        this.tweenSelf();
    }
    
    // 处理记录数据
    public onGetData(response): void {
        if (response.code == 0 && response.info && response.info.length > 0) {
        	response.info.sort(this.onSort)
        	let date = this.getCurrentDate()
            let lastDay = response.info[response.info.length-1].day
            let k = 0

            while (this._infos.length < 40) {
                if (response.info[k] && parseInt(response.info[k].day) == date) {
                    this._infos.push(response.info[k])
                    k++
                }
                else {
                    let data = {day:date, game: 0, diamond:0}
                    this._infos.push(data)
                }
                if (date == lastDay) {
                    break
                }
                date = this.getPrevDate(date)
            }
        }
        
        for (let i = 0; i < this._infos.length; i++) {
        	this._infos[i].day = this.transfrom(this._infos[i].day)
        	this._infos[i].game = this._infos[i].game || 0
        	this._infos[i].diamond = Math.abs(this._infos[i].diamond) || 0
        }

        this._ui._list.array = this._infos
        this.onSwitch(1)
    }

    public onSort(a, b) {
    	if (a.day > b.day)
    		return -1
    	else 
    		return 1
    }

    // 获取今日数据
    public getCurrentDate(): number{
    	let myDate = new Date()
        let day = myDate.getDate()
        let month = myDate.getMonth()+1
        let year = myDate.getFullYear()

        return year*10000+month*100+day
    }

    // 获取前一天的日期
    public getPrevDate(date) {
        let num = parseInt(date)
        let day = num%100
        let month = Math.floor((num%10000)/100)
        let year = Math.floor(num/10000)
        if (day > 1) {
            day--
        }
        else if (month > 1) {            
            month--
            day = this._months[month-1]             
        }
        else {
            month = 12
            day = 31
            year = year--
        }
        
        return year*10000+month*100+day
    }
     
    // 日期转换
    public transfrom(date) {
    	if (!date) {
    		return 0
    	}
    	let num = parseInt(date)
        let day = num%100
        let month = Math.floor((num%10000)/100)
        let year = Math.floor(num/10000)
        let monthStr = month >= 10? month.toString(): "0" + month.toString()
        let dayStr = day >= 10? day.toString(): "0" + day.toString()
        let str = year.toString() + "-" + monthStr + "-" + dayStr
        return str
    }


    private onTouch(e: Laya.Event): void {
        switch (e.currentTarget) {
            case this._ui._btn_close:
                this.hide()
                break;
            case this._ui._btn_day7:
                this._ui._btn_day7.skin = "club/button/sBtn_day7_2.png"
		        this._ui._btn_day30.skin = "club/button/sBtn_day30_1.png"
                this.onSwitch(7)
                break;
             case this._ui._btn_day30:
                this._ui._btn_day7.skin = "club/button/sBtn_day7_1.png"
		        this._ui._btn_day30.skin = "club/button/sBtn_day30_2.png"
                this.onSwitch(30)
                break;
        }
    }
    // 切换
    private onSwitch(type): void {
        if (!this._infos ||this._infos.length <= 0) {
        	return
        }
        let game = 0
        let diamond = 0
        let len = type <= this._infos.length ? type : this._infos.length
        for (let i = 0; i < len; i++) {
        	game = game + parseInt(this._infos[i].game)
        }
        for (let i = 0; i < len; i++) {
            diamond = diamond + parseInt(this._infos[i].diamond)
        }
        this._ui._lb_count.text = StringUtils.format(GameConfig.language["club_statistics_cnt_"+type.toString()], game)
        this._ui._lb_diamond.text = StringUtils.format(GameConfig.language["club_statistics_diamond_"+type.toString()], diamond)
    }

    private updateStatistics(cell: ClubStatisticsRenderer, index: number): void {
    	cell.update();
    }
}

class ClubStatisticsRenderer extends ui.club.ClubStatisticsRenderUI {
	
	constructor() {
		super()
	}

	public update() {
		let info = this._dataSource
		this._lb_date.text = info.day
		this._lb_cnt.text = info.game
		this._lb_diamond.text = info.diamond
	}
}