

class BaseTingCardManager {
    constructor() {

    }
    private tingCardsView
	private _bg
	protected _tingClass
    private static _instance: BaseTingCardManager;
	public static get instance(): BaseTingCardManager {
		if (this._instance == undefined) {
			this._instance = new BaseTingCardManager();
		}
		return this._instance;
	}

	public registerClass(tingClass){
		this._tingClass = tingClass
	}

public initBaseView(view){
	this._bg = view
}

public tingCard(cardid){
	let info = BaseGameData.tingInfo[cardid%100]

	if (!info) return 
	this.clearAll()
	if (!this.tingCardsView){
		let cnt = this.getAlltingCnt()
		this.tingCardsView = new this._tingClass(info, cnt)
	}
	this._bg.addChild(this.tingCardsView)
	this.tingCardsView.zOrder = GameZorder.ChooseView
	this.tingCardsView.centerX = 0
	this.tingCardsView.bottom = 120
}

public getAlltingCnt(){
	switch (BaseGameData.gameType) {
	    case GameDef.GAME_TYPE.TONGLU_MJ:
            return 34
        case GameDef.GAME_TYPE.FUYANG_MJ:
            return 25
        case GameDef.GAME_TYPE.HONGZHONG_MJ:
            return 27            
	}
}
public clearAll(){
	if (this.tingCardsView){
		this.tingCardsView.clearUI()
		this.tingCardsView.removeSelf()
		this.tingCardsView = null
    }
}
}