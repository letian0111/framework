class ShuangKou {
    public static createInfo = [
        { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局", "values": [4,8], "value": 8, "cost": 1, "des": ["4局", "8局"],"itemSpace": 200},
        {"key":"gps","value":0},
        {"key":"max_player","value":4},
        {"name": "countSelect", "title": "倍率", "key": "multiple_rate", "texts":"1/2/4,1/2/3,0/2/4","values":[1,2,3], "value":1,"des":["1/2/4","1/2/3","0/2/4"],"itemSpace":100},
        
        {
            "name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [
                { "name": "choose", "title": "玩法选择", "key": "double_bright", "texts": "双明玩法", "values": [0, 1], "value": 1, "des": ["", "双明玩法"] },
               ], "space": 3
        },
        {"name": "countSelect", "title": "底分", "key": "base_score", "texts":"1分,2分,5分","values":[1,2,5], "value":1,"des":["1分","2分","5分"],"itemSpace":100},
        { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
    ]
    public static cost = 0
    //public static costDivide = 4
    //public static costs = [2,3]
    public static costDivide = [4]
    //public static costs = [[6,4],[9,6]]
    public static costs = [1,2]
    //public static costs = [[6,6],[9,9]]
    // public static ruleKey = ["tableid", "totalHandCount", "gps","card_cnt", "hide_ccnt", "must_do", "boom_reward", "enabled_aaa", "winner_first", "call_score"]
    // public static ruleValue = [[], [], ["", "防作弊"],["", "手牌数"], ["", "牌数不显示"], ["", "必须管"], ["", "炸弹奖分"], ["", "AAA算炸"], ["", "赢家先出"], ["", "抢关"]]

    public static ruleKey = ["tableid", "totalHandCount", "gps","multiple_rate", "double_bright", "base_score"]
    public static ruleValue = [[], [], ["", "防作弊"],["1/2/4","1/2/3","0/2/4"], ["", "双明玩法"], ["1分","2分","5分"]]

}