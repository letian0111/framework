class LingXi {
    public static GAME_TYPE_CREATE_INFO = {
       
        "guanpai": {
            "createInfo": [
                { "key": "must_do", "value": 1 },
                { "key": "enabled_aaa", "value": 0 },
                { "key": "call_score", "value": 0 },

                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,12局", "values": [8, 12], "value": 8, "cost": 1, "des": ["8局", "12局"], "itemSpace": 200 },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "3人,2人", "values": [3, 2], "value": 3, "costDivide": 1, "des": ["3人", "2人"], "changeDispatch": true, "itemSpace": 200 },
                { "key": "gps", "value": 0 },
                //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"] },
                { "name": "countSelect", "title": "手牌数", "key": "card_cnt", "texts": "15张,16张", "values": [15, 16], "value": 16, "des": ["15张", "16张"], "itemSpace": 180 },
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
            ],
            "cost": 0,

            "costDivide": [3, 2],
            "costs": [2, 3],

            "ruleKey": ["tableid", "totalHandCount", "gps", "card_cnt", "hide_ccnt", "must_do", "boom_reward", "enabled_aaa", "winner_first", "call_score"],
            "ruleValue": [[], [], ["", "防作弊"], ["手牌数:15", "手牌数:16"], ["", "牌数不显示"], ["", "必须管"], ["", "炸弹奖分"], ["", "AAA算炸"], ["", "赢家先出"], ["", "抢关"]],
            "important":[0,0,0,0,0,0,0,0,1,0],
            "ch_name":"关牌",
        },
        
        "lingxi_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "4人,3人,2人", "values": [4,3,2], "value": 3, "costDivide": 1, "des": ["4人", "3人", "2人"], "matchvalue": 3, "itemSpace": 270, "changeDispatch": true },
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,12局,18局", "values": [6, 12, 18], "value": 12, "cost": 1, "des": ["6局", "12局", "18局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "key": "gps", "value": 1 },
                 { "name": "countSelect", "title": "起胡", "key": "min_tai", "texts": "不限,10台,13台", "values": [0, 10, 13], "value": 0, "des": ["不限", "10台", "13台"], "itemSpace": 120, "space": 2},
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [4, 3, 2],
            "costs": [1, 2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps"],//, "base_score"],
            "ruleValue": [[], [], ["", "防作弊"]],//, ["1分", "2分", "3分"]],
            "important":[0,0,0],
            "ch_name":"灵溪炮台",
        },
    }
      public static SHARE_DESC = {
        "guanpai": {
            "max_hand_cnt": { 8: "8局", 12: "12局" },
            "max_player": { 3: "3人局", 2: "2人局" },
            "gps": ["", "防作弊"],
            "card_cnt": { 15: "15张", 16: "16张" },
            "hide_ccnt": ["", "牌数不显示"],
            "must_do": ["", "必须管"],
            "boom_reward": ["", "炸弹奖分"],
            "enabled_aaa": ["", "AAA算炸"],
            "winner_first": ["", "赢家先出"],
            "call_score": ["", "抢关"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },
       
        "lingxi_mj":{
            "max_hand_cnt": { 6: "6局", 12: "12局", 18: "18局" },
            "max_player": { 4: "4人局", 3: "3人局", 2:"2人局" },
            "gps": ["", "防作弊"],
            "min_tai":{0: "不限", 10 : "10台", 13: "13台"},
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        }

    }
}