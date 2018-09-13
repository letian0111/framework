class ChoiceCard extends Laya.Image {
     constructor(cards, choiceType, optcallback) {
        super();
		this.init(cards, choiceType, optcallback)
    }
    protected bg
    protected choiceType 
    protected callback
    protected cards
    protected _replace_function

    public replace_card(cardid){
        if(BaseGameData.SHIFTER_NUM.indexOf(cardid%100) > -1){
            cardid = 78
        }else if(cardid%100 == 78){
            cardid = BaseGameData.SHIFTER_NUM[0]
        }
        return cardid
    }

    protected init(cards, choiceType, optcallback){
        this.callback = optcallback
        this.choiceType = choiceType
        this.cards = cards

        var B = function(C, D) {
            return C > D;
        };
        this.cards.sort(B);
        this.bg = new Laya.Image("opt/card_border.png")
        this.bg.sizeGrid = "10,10,10,10,0" 
        this.addChild(this.bg)
        // this.bg.sizeGrid = 
        this.bg.width = 20
        for (var k in this.cards){
            let v = this.cards[k]
            let index = parseInt(k)
            let view = new ui.mj.HoldCard.Card_1UI() 
            if(BaseGameData.gameType == GameDef.GAME_TYPE.JINYUN_MJ){
                view._bg.skin = "card/"+view.name+"/"+ (this.replace_card(v)%100) + ".png"  
            }else{
                view._bg.skin = "card/"+view.name+"/"+ (v%100) + ".png"  
            } 
            this.bg.addChild(view)
            view.pos(index*view.width+10,10)
            this.bg.width = this.bg.width + view.width
        }
        // this.bg.width = this.bg.width+20
        this.bg.height = 90
        this.bg.on(Laya.Event.CLICK, this, this.optCard)
    }

    protected optCard(){
        this.callback(this.choiceType, this.cards)
    }
}