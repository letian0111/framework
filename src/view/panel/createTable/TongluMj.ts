
class TongluMj {
    public static createInfo = [
        { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,10局,30片,50片", "values": [6, 10, 30, 50], "value": 6, "cost": 1, "des": ["6局", "10局", "30片", "50片"], "itemSpace": 120 ,"space" : 2,"changeDispatch": true},
        { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,4人", "values": [2, 4], "value": 4, "costDivide": 1, "des": ["2人", "4人"], "matchvalue": 4 ,"itemSpace": 270, "changeDispatch": true},
        //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 1, "des": ["", "防作弊"], "matchvalue": 0 },
        {"key":"gps","value":1},
        {
            "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [

                { "name": "select", "title": "三牢起(硬自摸)", "key": "lao_3", "texts": "三牢起(硬自摸),一牢起(三牢点炮)", "values": [0, 1], "value": 0, "des": ["三牢起(硬自摸)", "一牢起(三牢点炮)"], "itemSpace": 90 },
                { "name": "select", "title": "不承包(限2吃2碰)", "key": "cheng_bao", "texts": "不承包(限2吃2碰),不承包(限两摊),承包/反承包", "values": [0, 1, 2], "value": 0, "des": ["不承包(限2吃2碰)", "不承包(限两摊)", "承包/反承包"], "itemSpace": 55,
                                                        "changeOn":{"max_player":{"labels":{2:"不承包(限2吃2碰),不承包(限两摊)",4:"不承包(限2吃2碰),不承包(限两摊),承包/反承包"},
                                                                   "selectedIndex":{2:0,4:1}}}},

                { "name": "choose", "title": "玩法选择", "key": "shi_feng", "texts": "十风", "values": [0, 1], "value": 0, "des": ["", "十风"] },
                { "name": "choose", "title": "玩法选择", "key": "chao_bao", "texts": "超包", "values": [0, 1], "value": 0, "des": ["", "超包"],"changeOn":{"max_hand_cnt":{"visible":{6:false,10:false,30:true,50:true}},"matchvalue":1}},
                { "name": "select", "title": "32封顶", "key": "max_32", "texts": "32封顶,64封顶", "values": [0, 1], "value": 0, "huanhang":true, "des": ["32封顶", "64封顶"],"itemSpace": 90,"changeOn":{"max_player":{"visible":{2:true,4:true}},"max_hand_cnt":{"visible":{6:true,10:true,30:false,50:false}},"matchvalue":1}},
                
            ],"space" : 3
        },
       
        //{ "name": "select", "title": "摆牌方式", "key": "fold_type", "texts": "独立摆放,合并摆放", "values": [0, 1], "value": 1, "des": ["独立摆放", "合并摆放"], "matchvalue": 1 },
        { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
    ]
    public static cost = 0
    //public static costDivide = 4
    //public static costs = [2, 4, 2, 4]
    public static costDivide = [2,4]
    //public static costs = [[4,8],[6,12],[2,4],[4,8]]
    public static costs = [2,3,1,2]
    //public static costs = [[8,8],[12,12],[4,4],[8,8]]
    public static ruleKey = ["tableid", "totalHandCount", "gps", "lao_3", "cheng_bao", "shi_feng","chao_bao"/*, "fold_type"*/]
    public static ruleValue = [[], [], ["", "防作弊"], ["三牢起(硬自摸)", "一牢起(三牢点炮)"], ["不承包(限2吃2碰)", "不承包(限两摊)", "承包/反承包"], ["", "十风"],["", "超包"]/*, ["独立摆放", "合并摆放"]*/]

}
