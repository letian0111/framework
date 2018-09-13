class MJRuleInfoView extends ui.components.MJRuleInfoUI {
    constructor() {
        super();
    }
    private texts = {}
    private textKey
    private textValue
    private _listData = []
    private _ruleKey = []
    private _ruleInfo = []
    private handCountStr(){
        if(BaseGameData.gameType == GameDef.GAME_TYPE.TONGLU_MJ){
            if(30 == BaseGameData.totalHandCount||50 == BaseGameData.totalHandCount)
                return "片"
        }
        return "局"
    }

    public show(rule) {
        if (!rule || rule.length <= 0) {
            return
        }
        let tmp = []
        for (let i = 0; i < this._ruleInfo.length; i++) {
            tmp.push(this._ruleInfo[i])
        }
        this._ruleInfo = []
        for (let i in rule) {
            this._ruleInfo.push(rule[i])
        }
        if (this._ruleInfo.length <= 0) {
            this._ruleInfo = tmp
            return
        }
        // if (GameConfig.IS_MATCH) {
        //     this._info.visible = false
        // } else {
        //     this._info.visible = true
        // }

        if (!BaseGameData.gameType) {
            return
        }
        Utils.injectProp(BaseGameData.ruleInfo,rule)
        log(BaseGameData.ruleInfo)
        this._ruleInfo.sort(function(a, b) {
            if (a.name > b.name) {
                return 1
            }
            else {
                return -1
            }
        })
        let name = GameDef.GAME_NAME[parseInt(BaseGameData.gameType) - 1]
        let createInfo = GameConfig.getCreateInfoByGameName(name)
        if(createInfo)
        this._ruleKey = createInfo.ruleKey
        // this.textValue = createInfo.ruleValue
        
        // log(BaseGameData.totalHandCount)
        // this._listData = [
        //     { "name": BaseGameData.totalHandCount + this.handCountStr()},
        //     { "name": BaseGameData.maxPlayer + "人" }
        // ]

        this._round_1.text = BaseGameData.currHandCount.toString()
        this._round_2.text = "/" + BaseGameData.totalHandCount + this.handCountStr()
        if(BaseGameData.gameType == GameDef.GAME_TYPE.TONGLU_MJ && BaseGameData.totalHandCount >= 30){
            this._round_1.text = ""
            this._round_2.text = "第" + BaseGameData.currHandCount + "局"
        }
        Dispatcher.on(EventNames.TIME_CHANGE, this, this.onTimeChange);
        this.onTimeChange();
        // this._playRule.on(Laya.Event.CLICK,this,this.onClick)
        // EventManager.instance.registerOnObject(this, this._ruleBtn, Laya.Event.CLICK, this, this.onClick);
    }

    public updateRound() {
        this._round_1.text = BaseGameData.currHandCount.toString()
        this._round_2.text = "/" + BaseGameData.totalHandCount + this.handCountStr()
        if(BaseGameData.gameType == GameDef.GAME_TYPE.TONGLU_MJ && BaseGameData.totalHandCount >= 30){
            this._round_1.text = ""
            this._round_2.text = "第" + BaseGameData.currHandCount + "局"
        }
    }

    private onTimeChange() {
        this._time.text = TimeUtils.getSystemTimeHM(true)
    }

    public showRule() {
        if (!this._ruleInfo || this._ruleInfo.length <= 0) {
            return
        }
        let rules = []
        rules.push({key: "max_hand_cnt", value: BaseGameData.totalHandCount})
        for (let i = 0; i < this._ruleInfo.length; i++) {
            let v = this._ruleInfo[i]
            let index = parseInt(v.name)-1
            rules.push({key: this._ruleKey[index], value: v.value || 0})
        }
        club.ClubDeskInfo.instance.show({rule :rules, gtype :BaseGameData.gameType}, true)
        Laya.Tween.clearAll(this)
        Laya.Tween.to(this, [], 0, null, Laya.Handler.create(this, this.hideRule), 5000)
    }

    public hideRule() {
        club.ClubDeskInfo.instance.hide()
    }

    private close(e) {
        let rect = this._ruleBtn.getBounds()
        if (rect.contains(e.currentTarget.mouseX, e.currentTarget.mouseY)) {
            return
        }
        // this._rule.visible = false
    }

}