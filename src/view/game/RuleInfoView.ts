class RuleInfoView extends ui.components.RuleInfoUI {
    constructor(rule) {
        super();
        this.init(rule)
    }
    private texts = {}
    private textKey
    private textValue
    private _listData = []
    private _ruleInfo
    private handCountStr(){
        if(BaseGameData.gameType == GameDef.GAME_TYPE.TONGLU_MJ){
            if(30 == BaseGameData.totalHandCount||50 == BaseGameData.totalHandCount)
                return "片"
        }
        return "局"
    }

    private init(rule) {
        this._ruleInfo = rule
        if (GameConfig.IS_MATCH) {
            this._info.visible = false
        } else {
            this._info.visible = true
        }
        this._wanfa.text = GameDef.RULE_TITLE_MJ[BaseGameData.gameType]
        if (!!this._wanfa.text) {
            this._wanfa.visible = false
            this._list.y -= 20
        }
        this._list.y -= 20

        log(BaseGameData.gameType)
        Utils.injectProp(BaseGameData.ruleInfo,rule)

        let name = GameDef.GAME_NAME[parseInt(BaseGameData.gameType) - 1]
        let createInfo = GameConfig.getCreateInfoByGameName(name)
        this.textKey = createInfo.ruleKey
        this.textValue = createInfo.ruleValue
        
        log(BaseGameData.totalHandCount)
        this._listData = [
            { "name": BaseGameData.totalHandCount + this.handCountStr()},
            { "name": BaseGameData.maxPlayer + "人" }
        ]

        for (var k in rule) {
            let value = rule[k]
            if (this.textKey[value.name - 1] == "red_joker" && value.value == 1) {
                BaseGameData.SHIFTER_NUM = [72]
            } else {
                BaseGameData.SHIFTER_NUM = []
            }
            if (this.textKey[value.name - 1] == "fold_type") {
                BaseFoldCardManager.instance._foldType = value.value
            }
            BaseFoldCardManager.instance._foldType = 0
            if (value.name > 2) {
                this.texts[this.textKey[value.name - 1]] = this.textValue[value.name - 1][value.value]
                if (this.textValue[value.name - 1][value.value] && this.textValue[value.name - 1][value.value] != "") {
                    this._listData.push({ "name": this.textValue[value.name - 1][value.value] })
                }
            } else {
                if (value.name == 1) {
                    BaseGameData.tableid = value.value
                } else if (value.name == 2) {
                    BaseGameData.totalHandCount = value.value
                }
            }
        }
        if (BaseGameData.divide) {
            this._divide.text = "AA支付"
        } else {
            this._divide.text = "房主支付"
        }
        this._divide.visible = !GameConfig.IS_MATCH
        this._list.array = this._listData
        if (this._listData.length > 1) {
            this._ruleBg.height = 180 + (this._listData.length - 2) * 40
            this._list.height = this._listData.length * 40
            this._list.repeatY = this._listData.length
        }
        this._list.scrollBar.visible = false;
        this._list.itemRender = ruleRender;
        this._list.scrollBar.visible = false;
        this._list.renderHandler = new Laya.Handler(this, this.updateList);
        // this._playRule.text = this.texts["dian_pao"] 
        this._code.text = "房间  " + BaseGameData.tableid
        this._round.text = BaseGameData.currHandCount + "/" + BaseGameData.totalHandCount + this.handCountStr()
        if(BaseGameData.gameType == GameDef.GAME_TYPE.TONGLU_MJ && BaseGameData.totalHandCount >= 30){
             this._round.text = "第" + BaseGameData.currHandCount + "局"
        }
        Dispatcher.on(EventNames.TIME_CHANGE, this, this.onTimeChange);
        this.onTimeChange();

        // this._playRule.on(Laya.Event.CLICK,this,this.onClick)
        this._ruleBtn.on(Laya.Event.CLICK, this, this.onClick)
        this.on(Laya.Event.CLICK, this, this.close)
        this.mouseThrough = true


        //新增玩法展示
        let str = ""
        let length = this._listData.length
        let index = 0
        this._listData.forEach(c => {
           
            index++;
            if(index == length){
                 str += c.name
            }else
            {
                 str += c.name+","
            }
            
        });
        //this._wanfa_label.style.align = "center";
        this._wanfa_label.color = "#ffffff";

        this._wanfa_label.style.fontSize = 20;
        this._wanfa_label.style.leading = 10;
        this._wanfa_label.style.align = "left";

        this._wanfa_label.innerHTML = str
    }

    public updateRound() {
        this._round.text = "" + BaseGameData.currHandCount + "/" + BaseGameData.totalHandCount + this.handCountStr()
        if(BaseGameData.gameType == GameDef.GAME_TYPE.TONGLU_MJ && BaseGameData.totalHandCount >= 30){
            
            this._round.text = "" + BaseGameData.currHandCount + "局"
        }
    }

    private onTimeChange() {
        this._time.text = TimeUtils.getSystemTimeHM(true)
    }

    private onClick() {
        this._rule.visible = !this._rule.visible
    }

    public hideRule() {
        this._rule.visible = false
    }

    private close(e) {
        let rect = this._ruleBtn.getBounds()
        if (rect.contains(e.currentTarget.mouseX, e.currentTarget.mouseY)) {
            return
        }
        this._rule.visible = false
    }

    public updateLeftCount() {
        if (this._leftCard.visible == false) {
            this._leftCard.visible = true
        }
        this._leftLabel.text = String(BaseGameData.leftCard)
    }

    /***渲染单元格时的回调方法***/
    private updateList(cell: ruleRender, index: number): void {
        if (index == this._listData.length - 1) {
            cell.updata(true);
        } else {
            cell.updata(false);
        }

    }
}

class ruleRender extends ui.mj.RuleRenderItemUI {
    public updata(index) {
        this._text.text = this.dataSource.name
        if (index) this._line.visible = false
    }
}