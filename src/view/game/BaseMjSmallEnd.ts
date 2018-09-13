class BaseMjSmallEnd extends ui.mj.SmallEndUI {
    constructor() {
        super();
        this["name"] = "BaseMjSmallEnd";

    }

    protected _listScoreData: any[];
    protected _data: Array<any>;
    protected _endType: number;
    protected _winType: number;
    public onSort(a, b): number {
        if (BaseGameData.winDetailObj[a.seatid] && !BaseGameData.winDetailObj[b.seatid]) return 1
        if (!BaseGameData.winDetailObj[a.seatid] && BaseGameData.winDetailObj[b.seatid]) return -1
        if (a.winScore > b.winScore) return 1;
        else return -1;
    }
    public show(data, data1, data2): void {
        this.addListeners()
        this.anchorX = 0
        this.anchorY = 0
        //this.scale(0.9,0.9)
        //this.y += 20
        //this.x += 20 
        this._bg.anchorX = 0.5
        this._bg.anchorY = 0.5
        //this._bg.scale(100, 100)
        this._data = data;
        this._data.sort(this.onSort)
        this._endType = data1;
        this._winType = data2
        let index = 1
        let posX = 40
        let posY = BaseGameData.maxPlayer * 130 + 10
        this._bg.removeChildren()
        if (this._winType == 0) {
            this._liuju.visible = true
            this._lose.visible = false
            this._win.visible = false
        } else {
            this._liuju.visible = false
        }

        for (let i = 1; i <= 4; i++) {
            let v = this.getViewBySeatId(i) as View
            v.visible = false
        }

        for (var k in this._data) {
            let v = this._data[k]

            if (v.winScore <= 0) {
                if (!BaseGameData.winDetailObj[v.seatid]) {
                    let view = this.addLoseItem(BaseGameData.getPlayerDataBySeatid(v.seatid), v.winScore)
                    view.visible = true
                    // this._bg.addChild(view)
                    // view.pos(posX,posY-view.height-10)
                    // posY = view.y
                }
            } else {
                let view = this.addWinItem(BaseGameData.getPlayerDataBySeatid(v.seatid), v.winScore)
                view.visible = true
            }
            if (this._winType && v.seatid === BaseGameData.selfSeatid) {
                if (v.winScore <= 0) {
                    this._lose.visible = true
                    this._win.visible = false
                } else {
                    this._lose.visible = false
                    this._win.visible = true
                }
            }
        }
        //this.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT
    }
    protected getHoldModel(target_dir) {
        if (target_dir == 2) {
            return ui.mj.HoldCard.Card_2_1UI
        } else if (target_dir == 3) {
            return ui.mj.HoldCard.Card_3_1UI
        } else if (target_dir == 4) {
            return ui.mj.HoldCard.Card_4_1UI
        } else if (target_dir == 1) {
            return ui.mj.HoldCard.Card_3_1UI
        }
    }

    protected getDir(seatid) {
        let dirList = [
            [[1]],
            [[1, 3], [3, 1]],
            [[1, 2, 4], [4, 1, 2], [2, 4, 1]],
            [[1, 2, 3, 4], [4, 1, 2, 3], [3, 4, 1, 2], [2, 3, 4, 1]]
        ]
        let dir = seatid

        if (!BaseGameData.winSeatid) {
            return dirList[BaseGameData.maxPlayer - 1][0][seatid - 1]
        }

        return dirList[BaseGameData.maxPlayer - 1][BaseGameData.winSeatid - 1][seatid - 1]
    }

    public addHoldCard(info) {
        let target_dir = this.getDir(info.fromSeatid)
        let view = this.getHoldModel(target_dir)
        let hold_card = new view()

        for (var i = 0; i < 4; i++) {
            let v = info.cards[i]
            if (v) {
                hold_card["card_" + (i + 1)]._bg.skin = "card/" + hold_card["card_" + (i + 1)].name + "/" + (v % 100) + ".png"
            } else {
                hold_card["card_" + (i + 1)].visible = false
            }
        }
        return hold_card
    }

    private nextRound() {
        if (GameConfig.IS_MATCH) {
            this.hide()
            if (DialogManager.instance.hasDialog("MATCH_WAIT")) {
                DialogManager.instance._dialogList["MATCH_WAIT"].visible = true
            }
        } else if (this._endType) {
            this.hide()
            TableEndCtrl.instance.show(BaseGameData.tableEndInfo)
        } else {
            server.playerReadyReq()
            if (this._endType) {
                DialogManager.instance.removeDialog("GAME_END")
                TableEndCtrl.instance.show(BaseGameData.tableEndInfo)
            } else {
                Laya.timer.once(100, this, function () {
                    DialogManager.instance.removeDialog("GAME_END")
                })
            }
        }
    }

    protected getViewBySeatId(seatId) {
        switch (seatId) {
            case 1: return this._p0
            case 2: return this._p1
            case 3: return this._p2
            case 4: return this._p3
        }
        return null
    }

    protected strScore(score) {
        if (0<score) {
            return "+" + score;
        }
        return "" + score;
    }


    protected addLoseItem(player, score,ViewClass=BaseCardView) {
        let view = this.getViewBySeatId(player.seatid) as ui.mj.smallEndItemUI
        if (!view) return
        //头像设置
        let head = new HeadUI();
        view._head.addChild(head)
        head.setImageBounds(73, 73)
        head.getInfo(player.uid || 0)

        head._labInfo.visible = false
        head._labName.visible = false
        view._dlg_win.visible = false
        //房主设置
        view._owner.visible = player.seatid == BaseGameData.owner
        view._score.text = this.strScore(score)


        //名称设置
        view._name.text = Utils.getFitNickName(player.nickname, 10)

        let index = 1
        let posX = 10
        let posY = 0
        for (var j in player.holdCards) {
            let holdInfo = player.holdCards[j]
            let holdCard = this.addHoldCard(holdInfo)
            view._card.addChild(holdCard)
            holdCard.scale(0.5 * 1.5, 0.5 * 1.5)
            holdCard.pos(posX, posY + 12)
            posX = posX + holdCard.width * 0.5 * 1.5 + 5
            console.log("posX======================" + posX)
        }
        let cards = player.handCards
        this.sortCards(cards)
        for (var m = cards.length - 1; m >= 0; m--) {
            let cardid = player.handCards[m]
            let handCard = new ViewClass(cardid, 1, null)
            handCard.scale(0.5 * 1.5, 0.5 * 1.5)
            view._card.addChild(handCard)
            handCard.pos(posX, posY)
            posX = posX + 35 * 1.5
        }
        view._tag_fc.visible = false
        view._tag_hu.visible = false
        return view
    }
    public sortCards(cards) {
        let length = cards.length
        for (var i = 0; i < length - 1; i++) {
            for (var j = i + 1; j < length; j++) {
                if (BaseGameData.SHIFTER_NUM.indexOf(cards[i] % 100) > -1 || BaseGameData.SHIFTER_NUM.indexOf(cards[j] % 100) > -1) {
                    if (BaseGameData.SHIFTER_NUM.indexOf(cards[i] % 100) > -1 && BaseGameData.SHIFTER_NUM.indexOf(cards[j] % 100) == -1) {
                        let a = cards[j]
                        cards[j] = cards[i]
                        cards[i] = a
                    }
                } else if ((cards[i] % 100) < (cards[j] % 100)) {
                    let a = cards[i]
                    cards[i] = cards[j]
                    cards[j] = a
                }
            }
        }
    }

    protected addWinItem(player, score,ViewClass=BaseCardView) {
        let view = this.getViewBySeatId(player.seatid) as ui.mj.smallEndItemUI
        if (!view) return
        //头像设置
        let head = new HeadUI();
        view._head.addChild(head)
        head.setImageBounds(73, 73)
        head.getInfo(player.uid || 0)

        head._labInfo.visible = false
        head._labName.visible = false
        view._dlg_win.visible = true
        //房主设置
        view._owner.visible = player.seatid == BaseGameData.owner
        view._score.text = this.strScore(score)
        //名称设置
        view._name.text = Utils.getFitNickName(player.nickname, 10)
        let index = 1
        let posX = 10
        let posY = 0
        let cardScale = 1.5
        for (var j in player.holdCards) {
            let holdInfo = player.holdCards[j]
            let holdCard = this.addHoldCard(holdInfo)
            view._card.addChild(holdCard)
            holdCard.scale(0.5 * cardScale, 0.5 * cardScale)
            holdCard.pos(posX, posY + 12)
            posX = posX + holdCard.width * 0.5 * cardScale + 5
            console.log("posX======================" + posX)
        }
        let cards = player.handCards
        this.sortCards(cards)
        for (var m = cards.length - 1; m >= 0; m--) {
            let cardid = player.handCards[m]
            let handCard = new ViewClass(cardid, 1, null)
            handCard.scale(0.5 * cardScale, 0.5 * cardScale)
            view._card.addChild(handCard)
            handCard.pos(posX, posY)
            posX = posX + 35 * cardScale
        }
        if (BaseGameData.winSeatid) {
            let handCard = new ViewClass(BaseGameData.winCard, 1, null)
            handCard.scale(0.5 * cardScale, 0.5 * cardScale)
            view._card.addChild(handCard)
            handCard.pos(posX + 15 * cardScale, posY)
            posX = posX + 15 * cardScale
        }

        
        return view
    }
    private signList = ["+", "-", "*", "/"]
    protected addDetail(type, value, sign) {
        let view = new Laya.View()
        let typeImg = new Laya.Image("gameEnd/" + type + ".png")
        view.addChild(typeImg)
        let text = this.signList[sign - 1] + value
        if (value < 0) {
            text = value
        }
        let num = new Laya.Label(text)
        num.font = "font_num_5"
        view.addChild(num)
        num.x = typeImg.width + 10
        num.y = 3
        return view
    }

    private updateListResult(cell: ReportDescRenderer, index: number): void {
        cell.updata();
    }

    public hide() {

        if (this._endType) {
            DialogManager.instance.removeDialog("GAME_END")
            TableEndCtrl.instance.show(BaseGameData.tableEndInfo)
        } else {
            Laya.timer.once(100, this, function () {
                // if (!BaseGameData.isGameing) {
                //     Dispatcher.dispatch(EventNames.CHECK_READY)
                // }
                DialogManager.instance.removeDialog("GAME_END")
            })

        }
    }

    public updateMatchRoundEnd() {
        this._next.skin = "gameEnd/showwait.png"
    }

    protected addListeners() {
        this._back_desk.on(Laya.Event.CLICK, this, this.onTouch)
        this._back_hall.on(Laya.Event.CLICK, this, this.onTouch)
        this._next.on(Laya.Event.CLICK, this, this.nextRound)
        if (this._endType) {
            this._next.visible = false
            this._back_hall.visible = true
        } else {
            this._back_hall.visible = false
        }
    }

    private onTouch(e: Laya.Event): void {
        if (e) {
            switch (e.target) {
                case this._back_desk:
                    this.hide()
                    break;
                case this._back_hall:
                    break;
                case this._next:
                    break;
            }
        }
    }
}
