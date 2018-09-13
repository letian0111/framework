class BasePhzHoldCardView extends Laya.View{
     public seatid
     public dir
     public cardsView = []
     public cards = []
     protected posX
     protected posY
     protected _scale
     protected RES_PATH = "phz_card/"
     constructor(seatid, dir) {
        super();
        this.init(seatid, dir)
  //       if(dir == 1){
		// 	// Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
		// }
        // Dispatcher.on("mask_same_card",this,this.markSameCard)
        // Dispatcher.on("clear_same_card",this,this.clearMarkCard)
    }

    protected onResize(){
        let cards = this.cards
        this.cards = []
        this.cardsView = []
        this.updateView(cards)        
    }

    public init(seatid, dir){
        this.seatid = seatid
        this.dir = dir
        this.posX = 0
        this.posY = 0
        this._scale = 1
    }

    protected getHoldModel(target_dir){
        return ui.daye_phz.HoldCardUI
    }

    public addHoldCard(info){
        let target_dir = Utils.getDir(info.fromSeatid)
        log("info.fromSeatid"+info.fromSeatid+"target_dir"+target_dir+"this.dir"+this.dir+"selfseatid"+BaseGameData.selfSeatid)
        let model = this.getHoldModel(target_dir)
        let hold_card = new model()
        hold_card.scale(this._scale, this._scale)
        this.addChild(hold_card)
        
        hold_card.pos(this.posX,this.posY)
        log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        log([this.x+this.posX, this.y+this.posY])


        let offset = this.checkLeft()? 1 : -1
        hold_card.zOrder = this.cardsView.length + 1
        this.posX = this.posX + hold_card.width * offset

        let cards = info.cards
        log(cards)
        if(info.opttype == GameDef.OptType.MJ_CHI){
            cards = [cards[2],cards[1],cards[0]]
        }
        log("chipenggang ============================")
        log(cards)
        for(let i = 0;i < 4;i++){
            let v = cards[i]
            if (v && v!= 0 ){
                hold_card["card_"+i]._bg.skin = this.RES_PATH + "1/other_" +(v%100)+".png"
                hold_card["card_"+i]._back.visible = false
                if (i==2 &&info.opttype == GameDef.OptType.MJ_CHI) {
                    hold_card["card_"+i]._mask.visible = true
                }
            }
            else if(v == 0){
                hold_card["card_"+i]._back.visible = true
            }
            else{
                hold_card["card_"+i].visible = false
            }
        }
        this.cardsView.push(hold_card)
        this.cards.push(info)
    }

    public updateIndex(){
        for(var k in this.cardsView){
            let view = this.cardsView[k]
            this.setChildIndex(view, this.cards.length - 1 - parseInt(k))
        }
    }


    public updateView(cardsInfo){
        this.removeChildren()
        this.posX = 0
        this.posY = 0
        for(var k in cardsInfo){
            let info = cardsInfo[k]
            this.addHoldCard(info)
        }
    }

    public clearUI(){
        for (var k in this.cardsView){
            let view = this.cardsView[k]
            view.removeSelf()
            view = null
        }
        this.cardsView = []
        this.cards = []
    }

    public checkLeft(){
        return (this.dir == 1 || this.dir == 4)
    }

    public getHoldPos(){
        let pos = this.localToGlobal(new laya.maths.Point(0,0))
        
        if (this.dir == 1){
            pos.x = pos.x + this.width
        }else if (this.dir == 2){
            pos.y = pos.y-this.height
        }else if (this.dir == 3){
            pos.x = pos.x-this.width
        }else if (this.dir == 4){
            pos.y = pos.y+this.height
        }
        
        return pos
    }
}