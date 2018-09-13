class BaseFlowerCardView extends Laya.View{
    constructor(seatid, dir ) {
        super();
        this.init(seatid, dir)
    }
    
    protected flowerView
    protected _cards
    protected _uilength = 9
    protected dir
    protected seatid

    private getCardModel(){
        switch(this.dir){
            case 1: return ui.mj.FlowerCard.FlowerCard_1UI;
            case 2: return ui.mj.FlowerCard.FlowerCard_2UI;
            case 3: return ui.mj.FlowerCard.FlowerCard_3UI;
            case 4: return ui.mj.FlowerCard.FlowerCard_4UI;
        }
    }

    public init(seatid, dir){
        this.seatid = seatid
        this.dir = dir
        this._cards = []
        let model = this.getCardModel()
        this.flowerView = new model()
        this.addChild(this.flowerView)
        for(var i = 1;i <= this._uilength; i++){
            // this.flowerView["card_"+i].visible = false
        }
    }

    public addCard(cardid:number, ani?:boolean){        
        let index = this._cards.length
        let view = this.flowerView["card_"+(index+1)]
        if (!view) {
            return
        }
        this._cards.push(cardid)
        view.visible = true
        view._bg.skin = "card/"+this.dir+"/"+(cardid%100)+".png"
        if (ani) {
            view.alpha = 0
            view.scaleX = 7
            view.scaleY = 7
            Laya.Tween.to(view, {scaleX:1, scaleY:1,alpha:1}, 180, Laya.Ease.cubicOut)
        }
    }
    
    public updateView(cards) {
        this.clearUI()
        for (let i in cards) {
            let cardid = cards[i]
            this.addCard(cardid)   
        }
    }

    public clearUI(){
    	for(var i = 1;i <= this._uilength; i++){
            this.flowerView["card_"+i].visible = false
        }
    	this._cards = []
    }
}