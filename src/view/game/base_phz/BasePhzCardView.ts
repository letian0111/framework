
class BasePhzCardView extends Laya.View{
    constructor(card, dir, cardType, optcallback?) {
        super();
		this.init(card, dir, cardType, optcallback)
		if(dir == 1){
			// Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
		}
    }

    protected HIGH_LIGHT_ZORDER = 1
    protected UPDELAY = 30
    protected OFFSET_Y = -30
    protected MOVE_CARDS_T = 0.1
    protected RES_PATH = "phz_card/"
    protected SHIFTER_NUM = 0
    protected dir:number
    protected cardType:number
    protected back:Laya.Image
    protected ishand:boolean
    protected callback:Function
	protected card:number
	protected front:Laya.Image
	protected isShow:boolean
	public bSelected:boolean
	public view
    protected static _pool: ObjectPool;

	protected getModel(){
		switch(this.cardType){
			case GameDef.PHZ_CARD_TYPE.BIG:   return ui.daye_phz.CardBigUI;
			case GameDef.PHZ_CARD_TYPE.SMALL: return ui.daye_phz.CardSmallUI;
			case GameDef.PHZ_CARD_TYPE.PICK:  return ui.daye_phz.CardPickUI;
		}
	}


    public onResize(){
		// if(Laya.stage.width/Laya.stage.height < 8/5 && this.dir == 1){
		// 	let scale = Laya.stage.width/1024
		// 	this.view.scale(scale,scale)
		// }else{
		// 	this.view.scale(1,1)
		// }
		this.view.scale(1,1)
	}

    protected init(card, dir, cardType, optcallback?){
        this.dir = dir
        this.cardType = cardType
        if (optcallback){
            this.callback = optcallback
        }
		let model = this.getModel()
		this.view = new model()
		this.addChild(this.view)
		this.updateFront(card)       
    }

	public updateFront(card){
		if (card > 0){
			this.view._back.visible = false
			this.view._bg.visible = true
			this.view._bg.skin = this.RES_PATH + "1/pick_" +(card%100)+".png"
			this.card = card
			this.setSpecialFront()
		}else{
			this.view._bg.visible = false
		}
		if (this.view._fan) {
			this.view._fan.visible = false
		}
		if (this.view._ting) {
			this.view._ting.visible = false
		}
	}

	public shuffle(){
		if(this.card > 0){
			if(this.view._bg.visible == true){
				this.view._bg.visible = false
				this.view._back.visible = true
			}else{
				this.view._bg.visible = true
				this.view._back.visible = false
			}
		}
	}

	public isSelected(){
		return this.bSelected
	}
    
    // 字牌选中后颜色发生改变
	public selected(){
		if (this.bSelected) {
			return 
		}
		this.bSelected = true
		this.y = this.y + this.OFFSET_Y
	}

	public unSelected(){
		if (!this.bSelected) {
			return 
		}
		this.bSelected = false
		this.y = this.y - this.OFFSET_Y
		if(this.y < 0) {
			this.y = 0
		}
	}

	public showFoldBg(){
		let bg = new Laya.Image("card/fold_bg.png")
		bg.sizeGrid = "10,10,10,10"
		bg.width = 96
		bg.height = 126
		bg.centerX = -14
		bg.centerY = -12
		this.addChildAt(bg,0)
	}

    public borrowCard(){
        
    }

	// 特殊字牌显示的扩展接口
	public setSpecialFront() {        
	}
}