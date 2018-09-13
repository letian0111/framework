class BasePhzHandCardView extends Laya.View {
    public seatid: number;
    public dir;
    public cardsViews = [];
    public wOffset: number;
    public hOffset: number;
    public cardGroups = []
    public optCallBack: Function;
    protected _handCardView
    protected _cardView
    protected _flopcard
    public touchIndex = []
    public beginX = 0
    public beginY = 0
    public lineHeight = 360
    public offsetY = 292
    public touchRect: Laya.Rectangle;
    private operatArea: Laya.Sprite;
    private catch;
    private _cardX;
    private _cardY;
    protected _cardWidth;
    protected _cardHeight;
    private _scale
    private _isMoveing
    protected _maskCardsBut
    protected RES_PATH = "phz_card/"
    protected c_max = 3
    protected aniIndex
    protected tingInfo
    protected tingView

    constructor(seatid, dir, callback) {
        super();
        this.init(seatid, dir, callback)
    }

    public init(seatid, dir, optCallBack) {
        this._maskCardsBut = []
        this.seatid = seatid
        this.dir = dir
        this._scale = 1

        
        this.cardGroups = []
        this.cardsViews = []
        if (optCallBack) {
            this.optCallBack = optCallBack
        }

        this.initData()
        this.checkHandCardView()
        this.updateFlopCard(false)

        this._handCardView._tingTip.on(Laya.Event.CLICK, this, this.showTingView)
    }
    
    protected getModel(){
        return ui.daye_phz.HandCardUI
    }
    protected registerCardView(cardView) {
        this._cardView = cardView
    }

    protected onResize(): void {
        if (this.dir == 1 && Utils.checkSeatid(BaseGameData.selfSeatid)) {
            this.touchRect.width = Laya.stage.width
            this.touchRect.y = Laya.stage.height - 350
        }
    }

    public initTouch() {
        if (this.dir == 1 && Utils.checkSeatid(BaseGameData.selfSeatid)) {

            this._handCardView._view.on(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin)          
   
            this.touchRect = new Laya.Rectangle(0, Laya.stage.height - 350, Laya.stage.width, 350)

            Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        }
    }
    protected _isting
    private ChooseTing(isting) {
        this._isting = isting
        if (isting) {
            for (var k in this.cardsViews) {
                let view = this.cardsViews[k]
                let index = BaseGameData.tingCards.indexOf((view.card % 100))
                if (index >= 0) {
                    view.view._ting.visible = true
                } else {
                    view.view._mask.visible = true
                }
            }
        } else {
            for (var k in this.cardsViews) {
                let view = this.cardsViews[k]
                view.view._mask.visible = false
            }
        }
    }

    private initData() {

    }

    protected onTouchBegin(e: Laya.Event) {
        log("@@@@@@@@@@@@@@@@@@@@ onMouseDown @@@@@@@@@@@@@@@@@@@@@@@")
        if (!BaseGameData.isGameing) return
        if (BaseGameData.isRecord == 1) return

        if (this.cardGroups.length <= 0) {
            return false
        }
        if (!Utils.checkSeatid(BaseGameData.selfSeatid)) {
            return
        }
        this._handCardView._view.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMoved)
        this._handCardView._view.on(Laya.Event.MOUSE_UP, this, this.onTouchEnd)
        this._handCardView._view.on(Laya.Event.MOUSE_OUT, this, this.onTouchCancel)
        let compareX = e.currentTarget.mouseX
        let compareY = e.currentTarget.mouseY

        for (var i = 8; i >= 0; i--) {
            let group = this._handCardView["group_"+i]
            for (var j = this.c_max-1; j >=0; j--) {
                let view = group["card_"+j]
                let rect = view.getBounds()
                // let offsetX = this._handCardView._view.x
                let newRect = new Laya.Rectangle(group.x, view.y + this.offsetY, rect.width, rect.height)
                if (view && view.visible && (!view._mask.visible) && newRect.contains(compareX, compareY)) {
                    this.touchIndex = [i, j]
                    this.beginX = compareX
                    
                    this.removeDisCardAni()
                    this.setCardGray(true)
                    this.updateFlopCard(true)
                    if (this._handCardView._tingTip.visible == false) {
                        this.showTingView()
                    }
                    break
                }
            }
        }
    }

    private onTouchMoved(e: Laya.Event) {
        if (!this.touchIndex || this.touchIndex.length == 0) {
            return
        }  
        log("@@@@@@@@@@@@@  onTouchMove @@@@@@@@@@@@@@@@@@@") 
        let flopCard = this._handCardView.pick
        if (flopCard.visible) {
            this._handCardView.line.visible = true
            flopCard.x = e.currentTarget.mouseX - flopCard.width/2
            flopCard.y = e.currentTarget.mouseY - flopCard.height/2
        }
    }

    public onTouchEnd(e: Laya.Event) {
        log("@@@@@@@@@@@@@  onTouchEnd @@@@@@@@@@@@@@@@@@@")
        if (!this.touchIndex || this.touchIndex.length == 0) {
            return
        }  
        this.setCardGray(false)
        this.updateFlopCard(false)
        this.checkCardTouch()
        this.clearTingView()
        this._handCardView.line.visible = false
        this._handCardView.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMoved)
        let compareX = e.currentTarget.mouseX
        let compareY = e.currentTarget.mouseY        
        if (compareY < this.lineHeight - this._handCardView.pick.height/2 && BaseGameData.optSeatid && BaseGameData.optSeatid == this.seatid) {
            this.onClickCard()
        }
        else{            
            for (var i = 8; i >= 0; i--) {
                let group = this._handCardView["group_"+i]
                for (var j = this.c_max-1; j >=0; j--) {
                    let view = group["card_"+j]
                    let rect = view.getBounds()
                    let lineY = view.y + this.offsetY
                    let height = rect.height
                    if (!this.cardGroups[i] || j == this.cardGroups[i].length) {
                        lineY = 0
                        height = 108 * (this.c_max-j+1) + this.offsetY
                    }
                    // let offsetX = this._handCardView._view.x
                    let newRect = new Laya.Rectangle(group.x, lineY, rect.width, height)
                    if (view && newRect.contains(compareX, compareY)) {
                        if (!this.cardGroups[i] || this.cardGroups[i].length < this.c_max){
                            this._handCardView.pick.visible = true
                            let newX = i
                            let newY = j                            
                            let y = view.y+this.offsetY
                            let k = j
                            if (!this.cardGroups[i]) {
                                y = y + k * 108
                            }
                            else {
                                while (k > 1 && !this.cardGroups[i][k-1]) {
                                    k--
                                    y = y + 108
                                }
                            }
                            let time = newX - this.touchIndex[0] + newY - this.touchIndex[1]
                            Laya.Tween.to(this._handCardView.pick, {x: view.x+group.x, y: y}, time*10, null, Laya.Handler.create(this,function() {
                                this.updateFlopCard(false)
                                this.refreshHandView([newX, newY])
                                this.tingCard()
                            }), null)                                                 
                        }
                        break
                    }
                }
            }
        }
    }    
     
    public refreshHandView(index?) {
        let cards = base_phz.PHZGameData.removeCardByIndex(this.touchIndex, index)
        if (index && cards && cards.length > 0) {
            base_phz.PHZGameData.InsertCardByIndex(cards, index)
        }
        this.touchIndex = []
        this.checkCardGroups()
        this.showAllCards(this.cardGroups, true)
    }

    public onTouchCancel(e: Laya.Event) {
        log("@@@@@@@@@@@@@  onTouchCancel @@@@@@@@@@@@@@@@@@@")
        this.setCardGray(false)
        this.updateFlopCard(false)
        this.checkCardTouch()
        this.clearTingView()
        this._handCardView.line.visible = false
        this._handCardView.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMoved)
    }

    protected onClickCard(): void {
        let x = this.touchIndex[0]
        let y = this.touchIndex[1]
        if (x >= this.cardGroups || !this.cardGroups[x][y]) {
            return
        }
        let card = this.cardGroups[x][y]
        this.clearTingSign()
        this.refreshHandView()
        base_phz.PHZGameData.disTingCards(card)
        this.optCallBack(GameDef.OptType.MJ_DISCARD, card)
        this._handCardView._tingTip.visible = true      
    }

    public updateCardIndex() {
        let length = this.cardsViews.length - 1
        for (var k in this.cardsViews) {
            let view = this.cardsViews[k]
            this.setChildIndex(view, length - parseInt(k))
        }
    }

    public updatePos() {
        if ((this.dir == 1 && Utils.checkSeatid(BaseGameData.selfSeatid)) || BaseGameData.isRecord == 1) {
            // this.sortCardsViews()
            this.sortCards(this.cardGroups)
        }
        let catchIndex: number = -1
        // let width = this.CARD_WIDTH[this.dir-1]
        // let widthOffset = this.CARD_WIDTH_OFFSET[this.dir-1]
        // let height = this.CARD_HEIGHT[this.dir-1]
        // let heightOffset = this.CARD_HEIGHT_OFFSET[this.dir-1]
        this._isMoveing = true
        if (BaseGameData.isRecord == 1) {
            for (var k in this.cardsViews) {
                let view = this.cardsViews[k]
                let toX = parseInt(k) * this._cardWidth + this.wOffset
                let toY = parseInt(k) * this._cardHeight + this.hOffset
                Laya.Tween.to(view, { x: toX, y: toY }, 20)
                // v:runAction(cc.MoveTo:create(0.2,cc.p((k-1)*CARD_WIDTH[this.dir]+CARD_WIDTH_OFFSET[this.dir],(k-1)*CARD_HEIGHT[this.dir]+CARD_HEIGHT_OFFSET[this.dir])))
                view.bSelected = false
                if (this.dir == 4) {
                    view.zOrder = 12 - parseInt(k)
                } else {
                    view.zOrder = parseInt(k)
                }
            }
        } else {
            let cardsNum = this.cardsViews.length
            for (var k in this.cardsViews) {
                let view = this.cardsViews[k]
                if (this.catch && this.catch == view) {
                    view.bSelected = false
                    catchIndex = parseInt(k)
                } else {
                    // v:runAction(cc.MoveTo:create(0.2,cc.p((k-1)*CARD_WIDTH[this.dir]+CARD_WIDTH_OFFSET[this.dir],(k-1)*CARD_HEIGHT[this.dir]+CARD_HEIGHT_OFFSET[this.dir])))
                    let toX = parseInt(k) * this._cardWidth + this.wOffset
                    let toY = parseInt(k) * this._cardHeight + this.hOffset
                    Laya.Tween.to(view, { x: toX, y: toY }, 20)
                    view.bSelected = false
                }
            }
            if (catchIndex >= 0) {
                if (catchIndex == 0) {
                    Laya.Tween.to(this.catch, { x: this.wOffset }, 20, null, Laya.Handler.create(this, function () {
                        this.catch = null
                        this._isMoveing = false
                    }))
                } else {
                    TweenUtils.get(this.catch).to({ y: -110 }, 200).to({ x: catchIndex * this._cardWidth + this.wOffset }, 200).to({ y: 0 }, 200, null, Laya.Handler.create(this, function () {
                        this.catch = null
                        this._isMoveing = false
                    }));
                }
            }
            // this.touchRect = cc.rect(display.width-RECT_X-#this.cards*TOUCH_CARD_WIDTH, RECT_Y, 100+#this.cards*TOUCH_CARD_WIDTH, TOUCH_CARD_HEIGHT)
            // this.lastTouchTime = nil
        }
    }

    private moveCatch(index) {
        this.cardsViews[index] = this.catch
        this.catch = null
        this.touchRect = new Laya.Rectangle()
    }

    public moveCardsToRight(noAni?: boolean) {
        let len = this.cardGroups.length
        if (len == 0) {
            len = 9
        }
        for (let i in this.cardGroups) {
            this._handCardView["group_"+i].x = 205 + 49 * (9 - len) + parseInt(i) * 98
        }
        this._handCardView.bottom = 0
        // this._handCardView.zz.x = this._handCardView._view.x
        // this._handCardView.zz.y = this._handCardView._view.y
    }

    public removeCards(cards, noAni?) {
        this.updateHandCards(this.cardGroups)        
    }


    public removeAllCards() {
        for (var k in this.cardsViews) {
            let view = this.cardsViews[k]
            view.removeSelf()
            view = null
        }
        this.cardsViews = []
        // this.cardGroups = []
    }

    public showAllCards(cards, noAni) {
        if (!cards) {
            return
        }
        this.checkCardGroups(cards)
        this.checkHandCardView()   
        this.moveCardsToRight()
        this.checkCardTouch()
        let lx = 0
        let ly = 0
        let key = 0
        function cardAppear():void {
            if (ly >= this.cardGroups[lx].length && key < 2){
                key++
                return
            }
            if (key == 2) {
                lx = lx + 1
                ly = 0
                key = 0
            }
            if (lx >= this.cardGroups.length){
                Laya.timer.clear(this, cardAppear)
                this.checkCardTouch()
                return
            }
            let cardView = this._handCardView["group_"+lx]["card_"+ly]
            this.updateCardFront(cardView, this.cardGroups[lx][ly])
            cardView.alpha = 0
            Laya.Tween.to(cardView, {alpha :1}, 120, null)
            ly = ly + 1           
        }
        if (noAni) {
            for (let i = 0; i < cards.length;i++){
                let tiles = cards[i]
                for (let j = 0; j < tiles.length; j++) {
                    this.updateCardFront(this._handCardView["group_"+i]["card_"+j], this.cardGroups[i][j]) 
                }
            }
        }
        else{
            Laya.timer.loop(20, this, cardAppear)
        }
        this.checkCardGroups(this.cardGroups)
    }

    public updateCardFront(view, card){
        if (!view) {
            return
        }
        if (!card) {
            return
        }
        view.visible = true
        view._fan.visible = false
        view._ting.visible = false
        if (card && card > 0){
            view._back.visible = false
            view._bg.visible = true
            let path = this.RES_PATH + "1/self_" +(card%100)+".png"
            view._bg.skin = path
            card = card
            this.setSpecialCardFront(view)
        }
    }
    
    //检查是不是坎、提
    public checkCardTriplet(cards){
        if (!cards || cards.length == 0) {
            return false
        }
        if (cards.length <= 2) {
            return false
        }
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i]%100 != cards[i+1]%100){
                return false
            } 
        }
        return true
    }

    // 设置不能点击的卡牌未灰色
    public checkCardTouch(){
        this.checkCardGroups()
        let cards = this.cardGroups
        for (let i = 0; i < cards.length; i++) {
            let group = cards[i]
            let gray = this.checkCardTriplet(group)
            this.setGroupGray(i, gray)
        }
    }

    // 设置坎未灰色
    public setGroupGray(index, gray){
        let group = this.cardGroups[index]
        let groupView = this._handCardView["group_"+index]
        for (let i = 0; i < group.length; i++) {
            groupView["card_"+i]._mask.visible = gray
        }
    }

    public setSpecialCardFront(view){

    }

    // public setCardsOpacity( opac )
    // 	let cardViews = self:getCardViews()
    // 	for k,v in pairs(cardViews) do
    // 		v:setOpacity(opac)
    // 	end
    // end

    // public setCardsScale( scale )
    // 	for k,v in pairs(this.cardsViews) do
    // 		v:setScale(scale)
    // 	end
    // end

    public unSelectCards() {
        // _tingCardManager:clearAll()
        for (var k in this.cardsViews) {
            let view = this.cardsViews[k]
            view.unSelected()
        }
    }

    public unSelectSelfCards() {
        for (var k in this.cardsViews) {
            let view = this.cardsViews[k]
            if (view.isSelected()) {
                view.unSelected()
            }
        }
    }

    public sortCards(cards) {
        let length = cards.length
        for (var i = 0; i < length - 1; i++) {
            for (var j = i + 1; j < length; j++) {
                if (BaseGameData.SHIFTER_NUM == (cards[i] % 100) || BaseGameData.SHIFTER_NUM == (cards[j] % 100)) {
                    if (BaseGameData.SHIFTER_NUM == (cards[i] % 100) && BaseGameData.SHIFTER_NUM != (cards[j] % 100)) {
                        let a = cards[i]
                        cards[i] = cards[j]
                        cards[j] = a
                    }
                } else if ((cards[i] % 100) < (cards[j] % 100)) {
                    let a = cards[i]
                    cards[i] = cards[j]
                    cards[j] = a
                }
            }
        }
    }

    public updateHandCards(cards, count?, optcallback?) {
        this.showAllCards(cards, true)
        this.checkCardTouch()
        this.tingInfo = base_phz.PHZGameData.getTingInfo()
        if (this.tingInfo || this.tingInfo.length > 0) {
            this._handCardView._tingTip.visible = true 
        }
        else {
            this._handCardView._tingTip.visible = false
        }
    }

    // public refreshGroup(k, cards, optcallback){
    //     for (var j =0; j < 4; j++){
    //         this.updateCardFront(this._handCardView["group_"+k]["card"+j], cards[j])
    //     }   
    // }

    // public getCardSizeAndPos() {
    //     let x: number = (this.cardGroups.length - 1) * this.CARD_WIDTH[this.dir] + this.CARD_WIDTH_OFFSET[this.dir]
    //     let y: number = (this.cardGroups.length - 1) * this.CARD_HEIGHT[this.dir] + this.CARD_HEIGHT_OFFSET[this.dir]
    //     let width = this.CARD_WIDTH[this.dir]
    //     let height = this.CARD_HEIGHT[this.dir]
    //     return { x: x, y: y, width: width, height: height }
    // }

    // public clearCurrentOpt()
    // 	if _gameController.moveCard then
    // 		_gameController.moveCard:removeSelf()
    // 		_gameController.moveCard = nil
    // 		if this.touchIndex then
    // 			this.cardsViews[#this.cards+1-this.touchIndex]:setVisible(true)
    // 		end
    // 		this.cardX,this.cardY,this.beginX,this.beginY = nil,nil,nil,nil
    // 	end
    // end

    // public clearMoveCard()
    // 	if _gameController.moveCard then
    // 		_gameController.moveCard:removeSelf()
    // 		_gameController.moveCard = nil
// 	end
    // end
    public checkHandCardView(){
        if (!this._handCardView){
            let model = this.getModel()
            this._handCardView = new model()
            this.addChild(this._handCardView)
        }
        for (var i = 0; i < 9; i++) {
            for(var j = 0; j < this.c_max+1; j++) {
                this._handCardView["group_"+i]["card_"+j].visible = false
            }
        }
        this._handCardView.line.visible = false
        this._handCardView.pick._ting.visible = false
        this._handCardView.pick._fan.visible = false
    }

    public checkCardGroups(cards?) {
        if (!cards || cards.length == 0) {
            let player = BaseGameData.getPlayerDataBySeatid(BaseGameData.selfSeatid)
            if (player && player.handCards) {
                cards = player.handCards
            }
            
            else{
                return
            }
        }
        this.cardGroups = []
        for (let k in cards){
            let v = cards[k]
            log(v)
            if (v.cards){
                this.cardGroups.push(v.cards)
            }
            else{
                this.cardGroups.push(v)
            }
        }     
    }

    public clearUI() {
        for (var k in this.cardsViews) {
            let view = this.cardsViews[k]
            view.removeSelf()
            view = null
        }
        this.cardsViews = []
        // this.cardGroups = []
        // if (this._handCardView){
        //     this._handCardView.removeSelf()
        //     this._handCardView = null
        // }
    }

    public tingCard() {
        this.tingInfo = base_phz.PHZGameData.getTingInfo()
        if (!this.tingInfo || this.tingInfo.length <= 0) {
            return
        }
        log("TING =================================================")
        for (let card in this.tingInfo) {
            log(card)
            this.showTingSign(card)
        }
    }

    // 抓牌 放在最后一列第一个
    public setCatchCard(card) {
        // let index = []
        // let cards = this.cardGroups
        // if (this.cardGroups.length < 11){
        //     index = [this.cardGroups.length, 0] 
        // }else
        // while()
    }

    public clearTouch() {
        for (var k in this.cardsViews) {
            let view = this.cardsViews[k]
            view.view._mask.visible = true
        }
        this._handCardView._view.off(Laya.Event.MOUSE_DOWN, this, this.onTouchBegin)
        this._handCardView._view.off(Laya.Event.MOUSE_MOVE, this, this.onTouchMoved)
        this._handCardView._view.off(Laya.Event.MOUSE_UP, this, this.onTouchEnd)
        this._handCardView._view.off(Laya.Event.MOUSE_OUT, this, this.onTouchCancel)
    }
    public clearAll() {
        
    }

    // 添加打出的牌
    public updateFlopCard(appear){
        if (!appear){
            this._handCardView.pick.visible = false
            return
        }        
        this.checkCardGroups()
        let x = this.touchIndex[0]
        let y = this.touchIndex[1]
        let card = this.cardGroups[x][y]
        let flopCard = this._handCardView.pick
        let handGroup = this._handCardView["group_"+x]
        let handCard = handGroup["card_"+y]
        flopCard.visible = true
        flopCard._bg.skin = this.RES_PATH + "1/self_" +(card%100)+".png"
        flopCard._back.visible = false
        // let offsetX = this._handCardView._view.x
        flopCard.x = handGroup.x
        flopCard.y = handCard.y + this.offsetY
    }

    public setCardGray(gray){
        if (!this.touchIndex || this.touchIndex.length == 0) {
            return
        }
        let x = this.touchIndex[0]
        let y = this.touchIndex[1]
        let card = this._handCardView["group_"+x]["card_"+y]
        card._mask.visible = gray
   }
   
    public showDisCardAni() {
        let res = ResourceConfig.SHEET_PHZ_DISCARD_ANI
        this.aniIndex = AniEffectManager.instance.playEffect2(this._handCardView, res, 500, { x: 1110, y: 355 }, true)
        this.clearTingView()
        this._handCardView._tingTip.visible = false
        this.tingCard()
    }

    public removeDisCardAni() {
        if (this.aniIndex == null) {
            return
        }
        AniEffectManager.instance.removeEffect(this.aniIndex)
        this.aniIndex = null
    }

    public showTingSign(card) {
        if (this._handCardView._tingTip.visible == true) {
            return
        }
        for (let i in this.cardGroups) {
            let group = this.cardGroups[i]
            for (let j in group) {
                if (group[j]%100 == card) {
                    let cView = this._handCardView["group_"+i]["card_"+j]
                    cView._ting.visible = true 
                }
            }
        }
    }

    public clearTingSign() {
        for (var i = 0; i < 9; i++) {
            for(var j = 0; j < this.c_max+1; j++) {
                this._handCardView["group_"+i]["card_"+j]._ting.visible = false
            }
        }
    }

    public showTingView() {
        let info
        if (this.touchIndex && this.touchIndex.length > 0) {
            let x = this.touchIndex[0]
            let y = this.touchIndex[1]
            let card = this.cardGroups[x][y]
            if (this.tingInfo) {
                info = this.tingInfo[card%100]
            }
        }
        else {
            info = base_phz.PHZGameData.getTingInfo()
        }
        
        if (!info || info.length <= 0) {
            return
        }
        this.clearTingView()
        this.tingView = new daye_phz.TingCardView()
        this.addChild(this.tingView)
        this.tingView.x = 520 - (info.length - 1) * 70
        this.tingView.bottom = 340
        this.tingView.zOrder = this._handCardView.zOrder - 1
        this.tingView.show(info)
    }

    public clearTingView() {
        if (this.tingView) {
            this.tingView.removeSelf()
            this.tingView = null
        }

    }

}