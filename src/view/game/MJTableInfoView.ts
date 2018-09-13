class MJTableInfoView extends ui.components.MJTableInfoUI {
    constructor() {
        super();
    }
    private texts = {}
    private _infoStr
    private _ruleInfo

    public show(rule) {
        this._ruleInfo = rule
        Utils.injectProp(BaseGameData.ruleInfo,rule)
        this.initInfo()
        this.initList()
    }

    public initInfo() {
        let rule = this._ruleInfo
        let type = parseInt(BaseGameData.gameType)
        if (!BaseGameData.gameType) {
            return
        }
        let name = GameDef.GAME_NAME[type - 1]
        let createInfo = GameConfig.getCreateInfoByGameName(name)
        let info = createInfo.createInfo
        let show_max = false
        for (let v of info) {
            if (v.key == "max_player") {
                if (v.name && v.name == "countSelect") {
                    show_max = true
                    break
                }
            }
        }
        this._infoStr = ""
        this._lb_code.text = BaseGameData.tableid.toString()
        this._infoStr = this._infoStr + createInfo.ch_name
        this._infoStr = this._infoStr + "  " + StringUtils.format(GameConfig.language.total_hand_count, BaseGameData.totalHandCount)
        if (show_max) {
            this._infoStr = this._infoStr + "  " + StringUtils.format(GameConfig.language.max_player_cnt, BaseGameData.maxPlayer)
        }
    }

    public initList() {
        let rule = this._ruleInfo
        let type = parseInt(BaseGameData.gameType)
        let name = GameDef.GAME_NAME[type - 1]

        if (!name){
            
            return 
        }
        let createInfo = GameConfig.getCreateInfoByGameName(name)
        let ruleValue = createInfo.ruleValue
        let important = createInfo.important
        
        let text1 = []
        let text2 = []
        text1.push(this._infoStr)
        for (let v of rule) {
            let key = v.name - 1
            if (key >= 3) {
                let index = v.value || 0
                if (name == "guanpai" && key == 4) {
                    index = index - 15
                }
                let text = ruleValue[key][index]
                if (text.length > 0) {
                    if (important && important[key] == 1) {
                        let len = text2.length-1
                        if (len >= 0 && text2[len].length + text.length <= 25) {
                            text2[len] = text2[len] + "  " + text
                        }
                        else {
                            text2.push(text)
                        }
                    }
                    else {
                        let len = text1.length-1
                        if (len >= 0 && text1[len].length + text.length <= 25) {
                            text1[len] = text1[len] + "  " + text
                        }
                        else {
                            text1.push(text)
                        }
                    }
                }
            }
        }
        
        let height = 0
        let width = 0
        for (let i = 0; i < text1.length; i++) {
            let v = text1[i]
            let text = new Laya.Label(v)
            this._center.addChild(text)
            text.fontSize = 24
            text.color = "#ffffff"
            text.font = "Microsoft YaHei"            
            text.y = height            
            if (text2.length >= 1 && i == text1.length-1 && v.length < 27 && v.length + text2[0].length < 37) {
                log(v.length + text2[0].length)
                if (text2.length >= 1) {
                    width = (v.length + 3) * 8
                    text.centerX = -text2[0].length * 16
                }
            } 
            else{
                height = height + 38
                text.centerX = 0
            }
        }

        for (let i = 0; i < text2.length; i++) {
            let v = text2[i]
            let text = new Laya.Label(v)
            this._center.addChild(text)
            text.fontSize = 24
            text.color = "#ffcc00"
            text.font = "Microsoft YaHei"
            if (text2.length <= 1 && width > 0) {
                text.centerX = width
            } 
            else {
            text.centerX = 0
            }
            text.y = height
            height = height + 38
        }
        this._center.bottom = height + 25
    }
}
