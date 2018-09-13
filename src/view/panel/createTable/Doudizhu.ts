class Doudizhu {
    public static createInfo = [
        { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,12局", "values": [6, 12], "value": 6, "cost": 1, "des": ["6局", "12局"], "itemSpace": 120 ,"space" : 2,"changeDispatch": true},
        { "key":"max_player","value":3},
        // { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,4人", "values": [2, 4], "value": 4, "costDivide": 1, "des": ["2人", "4人"], "matchvalue": 4 ,"itemSpace": 270 },
        //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 1, "des": ["", "防作弊"], "matchvalue": 0 },
        {"key":"gps","value":1},
        //{ "name": "select", "title": "摆牌方式", "key": "fold_type", "texts": "独立摆放,合并摆放", "values": [0, 1], "value": 1, "des": ["独立摆放", "合并摆放"], "matchvalue": 1 },
        { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
    ]
    public static cost = 0
    //public static costDivide = 4
    //public static costs = [2, 4, 2, 4]
    public static costDivide = [3]
    //public static costs = [[4,8],[6,12],[2,4],[4,8]]
    public static costs = [2,3]
    //public static costs = [[8,8],[12,12],[4,4],[8,8]]
    public static ruleKey = ["tableid", "totalHandCount", "gps"]
    public static ruleValue = [[], [], ["", "防作弊"],]
}