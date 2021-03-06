class GuanPai {
    public static createInfo = [
        {"key":"must_do","value":1},
        {"key":"enabled_aaa","value":0},
        {"key":"call_score","value":0},

        { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,12局", "values": [8,12], "value": 8, "cost": 1, "des": ["8局", "12局"],"itemSpace": 200},
        { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "3人,2人", "values": [3, 2], "value": 3, "costDivide": 1, "des": ["3人", "2人"], "changeDispatch": true,"itemSpace": 200 },
        {"key":"gps","value":0},
        //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"] },
        { "name": "countSelect", "title": "手牌数", "key": "card_cnt", "texts": "15张,16张", "values": [15, 16], "value": 16, "des": ["15张", "16张"] ,"itemSpace": 180},
        {
            "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [
                { "name": "choose", "title": "玩法选择", "key": "hide_ccnt", "texts": "牌数不显示", "values": [0, 1], "value": 0, "des": ["", "牌数不显示"] },
                // { "name": "choose", "title": "玩法选择", "key": "must_do", "texts": "必须管", "values": [0, 1], "value": 0, "des": ["", "必须管"] },
                { "name": "choose", "title": "玩法选择", "key": "boom_reward", "texts": "炸弹奖分", "values": [0, 1], "value": 1, "des": ["", "炸弹奖分"] },
                // { "name": "choose", "title": "玩法选择", "key": "enabled_aaa", "texts": "AAA算炸", "values": [0, 1], "value": 0, "des": ["", "AAA算炸"] },
                { "name": "choose", "title": "玩法选择", "key": "winner_first", "texts": "赢家先出", "values": [0, 1], "value": 1, "des": ["", "赢家先出"] },
               ], "space": 3
        },
        { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
    ]
    public static cost = 0
    //public static costDivide = 4
    //public static costs = [2,3]
    public static costDivide = [3,2]
    //public static costs = [[6,4],[9,6]]
    public static costs = [2,3]
    //public static costs = [[6,6],[9,9]]
    // public static ruleKey = ["tableid", "totalHandCount", "gps","card_cnt", "hide_ccnt", "must_do", "boom_reward", "enabled_aaa", "winner_first", "call_score"]
    // public static ruleValue = [[], [], ["", "防作弊"],["", "手牌数"], ["", "牌数不显示"], ["", "必须管"], ["", "炸弹奖分"], ["", "AAA算炸"], ["", "赢家先出"], ["", "抢关"]]

     public static ruleKey = ["tableid", "totalHandCount", "gps","card_cnt", "hide_ccnt", "must_do", "boom_reward", "enabled_aaa", "winner_first", "call_score"]
    public static ruleValue = [[], [], ["", "防作弊"],["", "手牌数"], ["", "牌数不显示"], ["", "必须管"], ["", "炸弹奖分"], ["", "AAA算炸"], ["", "赢家先出"], ["", "抢关"]]

}