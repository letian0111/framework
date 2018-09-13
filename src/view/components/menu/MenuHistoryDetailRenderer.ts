/*
* @author seacole
* 战绩统计List  Renderer;
*/
class MenuHistoryDetailRenderer extends ui.components.menu.MenuHistoryDetailRenderUI {
    constructor() {
        super();
    }
    public playersArr =[]
    public updata(): void {
        // var cfg: any = GameConfig.getGameCfgByGameType(this.dataSource.gtype);
        // if (cfg) {
            this._time.text = TimeUtils.Format("MM-dd hh:mm",this.dataSource.st)
            // this._labInfo.text = StringUtils.format(GameConfig.language.history_detail, this.dataSource.round, this.dataSource.score);
            if (this.parent){
                this.width = this.parent["width"] - 20;
                this._box.width = this.width - 200
            }
            this._box.removeChildren()
            let peace = this._box.width/this.dataSource.ss.length
            // for(var k in this.dataSource.ss){
            //     let v = this.dataSource.ss[k]
            //     // let view = new Laya.Box()
            //     // view.width = peace
                
            //     // this._box.addChild(view)
            //     //view.x = parseInt(k)*peace
            // }
        // }
        this.setHandCount()
        this.setTime()
        this.setScores()
    }

    protected setHandCount(){
        let str = "第"+this.dataSource.cnt+"局"
        this._hand_count.text = str
    }
    protected setTime(){
        this._txtTime.text = TimeUtils.Format("MM-dd hh:mm",this.dataSource.st)
    }

    protected setScores(){
        if(this.playersArr == []){
            return
        }
        let arr = []

        for(var k in this.playersArr){
            let nickname = this.playersArr[k]
            
            for(var v in this.dataSource.ss){
                if(this.dataSource.ss[v].n == nickname){
                    let s = this.dataSource.ss[v].s
                    arr.push(s+"")    
                }
            }
        }
        TextRender.WID = 860 / 6
        this._scores.initItems()
        this._scores.itemRender = TextRender
        this._scores.array = arr
        this._scores.renderHandler = new Laya.Handler(this, (cell:TextRender,idx:number)=>{
            cell.updata(idx)
            //cell.setWidth(860 /arr.length)
             //this._scores.refresh()
        })
       
    }

}