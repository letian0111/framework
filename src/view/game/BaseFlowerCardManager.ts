
class BaseFlowerCardManager {
    constructor() {

    }
    public flowerCardsViews = {};
	protected _flowerClass
    private static _instance: BaseFlowerCardManager;
	public static get instance(): BaseFlowerCardManager {
		if (this._instance == undefined) {
			this._instance = new BaseFlowerCardManager();
		}
		return this._instance;
	}

	public registerClass(flowerClass){
		this._flowerClass = flowerClass
	}

    public addFlowerCardView(seatid,dir){
    	if (!this.flowerCardsViews[seatid]){
    		let view = new this._flowerClass(seatid, dir)
    		this.flowerCardsViews[seatid] = view
    		return view
        }
    }

    public addFlowerCard(seatid,card){
    	this.flowerCardsViews[seatid].addCard(card, true)
    }

    public addFlowerCards(seatid,cards){
        for (let i in cards) {
            let card = cards[i]
            this.flowerCardsViews[seatid].addCard(card, true)
        }
    }

    public updateFlowerCards(seatid,cards){
    	this.flowerCardsViews[seatid].updateView(cards)
    }

    public clearAll(){
    	for (var k in this.flowerCardsViews){
            let view = this.flowerCardsViews[k]
            view.removeSelf()
    		view = null
        }
    	this.flowerCardsViews = {}
    }
}