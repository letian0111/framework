class JueZhan {
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
       
        "doudizhu": {
            "createInfo": [
                { "key": "max_player", "value": 3 },
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,12局", "values": [6, 12], "value": 6, "cost": 1, "des": ["6局", "12局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                // { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,4人", "values": [2, 4], "value": 4, "costDivide": 1, "des": ["2人", "4人"], "matchvalue": 4 ,"itemSpace": 270 },
                //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 1, "des": ["", "防作弊"], "matchvalue": 0 },
                { "key": "gps", "value": 1 },
                //{ "name": "select", "title": "摆牌方式", "key": "fold_type", "texts": "独立摆放,合并摆放", "values": [0, 1], "value": 1, "des": ["独立摆放", "合并摆放"], "matchvalue": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [3],
            "costs": [2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps"],
            "ruleValue": [[], [], ["", "防作弊"],],
            "ch_name":"斗地主",
        },

        "hongzhong_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,3人,4人", "values": [2, 3, 4], "value": 4, "costDivide": 1, "des": ["2人", "3人", "4人"], "matchvalue": 4, "itemSpace": 270, "changeDispatch": true },
                 { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局,12局", "values": [4,8,12], "value": 8, "cost": 1, "des": ["4局", "8局", "12局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "key": "gps", "value": 1 },
                // {
                //     "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [

                //         { "name": "select", "title": "抓码个数", "key": "zhua_ma", "texts": "不抓,1个,4个,6个", "values": [0, 1, 2, 3], "value": 0, "des": ["不抓", "1个", "4个", "6个"], "itemSpace": 90 },
                //         { "name": "choose", "title": "玩法选择", "key": "zhua_ma_double", "texts": "抓码翻倍", "values": [0, 1], "value": 0, "des": ["", "抓码翻倍"] },
                //         { "name": "choose", "title": "玩法选择", "key": "zhua_ma_plus", "texts": "清胡多抓2码", "values": [0, 1], "value": 0, "des": ["", "清胡多抓2码"] },
                //         { "name": "choose", "title": "258做将", "key": "eyes_258", "texts": "258做将", "values": [0, 1], "value": 0, "huanhang": true, "des": ["", "258做将"], "itemSpace": 90 },
                //         { "name": "choose", "title": "258做将", "key": "one_color_double", "texts": "清一色翻倍", "values": [0, 1], "value": 0, "huanhang": true, "des": ["", "清一色翻倍"], "itemSpace": 90 },
                //         { "name": "choose", "title": "258做将", "key": "duiduihu_double", "texts": "对对胡翻倍", "values": [0, 1], "value": 0, "huanhang": true, "des": ["", "对对胡翻倍"], "itemSpace": 90 },

                //     ], "space": 3
                // },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [2, 3, 4],
            "costs": [2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps"],// "zhua_ma", "zhua_ma_double", "zhua_ma_plus", "eyes_258", "one_color_double", "duiduihu_double"],
            "ruleValue": [[], [], ["", "防作弊"], ],//["不抓", "1个", "4个", "6个"], ["", "抓码翻倍"], ["", "清胡多抓2码"], ["", "258做将"], ["", "清一色翻倍"], ["", "对对胡翻倍"]],
            "ch_name":"红中麻将",
        },
        "bull": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "10局,20局,30局", "values": [10,20,30], "value": 10, "cost": 1, "des": ["10局", "20局", "30局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,3人,4人,5人,6人", "values": [2, 3, 4, 5, 6], "value": 6, "costDivide": 1, "des": ["2人", "3人", "4人", "5人", "6人"], "changeDispatch": true, "itemSpace": 100 },
                { "name": "countSelect", "title": "庄家", "key": "button_mode", "texts": "抢庄,看牌抢庄,霸王庄", "values": [1, 2, 3], "value": 1, "des": ["抢庄", "看牌抢庄", "霸王庄"], "changeDispatch": true, "itemSpace": 120 },
                { "key": "gps", "value": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [2, 3, 4, 5, 6],
            "costs": [1, 2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps"],
            "ruleValue": [[], [], ["", "防作弊"],],
            "ch_name":"牛牛",
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
        "doudizhu": {
            "max_hand_cnt": { 6: "6局", 12: "12局" },
            "max_player": { 3: "3人局" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
        "hongzhong_mj": {
            "max_hand_cnt": { 4: "4局", 8: "8局" , 12: "12局" },
            "max_player": { 2: "2人局", 3: "3人局", 4: "4人局" },
            // "zhua_ma": { 0: "", 1: "1个", 2: "4个", 3: "6个" },
            // "zhua_ma_double": { 0: "", 1: "抓马翻倍" },
            // "zhua_ma_plus": { 0: "", 1: "清胡抓吗+2" },
            // "eyes_258": { 0: "", 1: "" },
            // "one_color_double": { 0: "", 1: "" },
            // "duiduihu_double": { 0: "", 1: "" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
        "bull": {
            "max_hand_cnt": { 10: "10局", 20: "20局", 30: "30局"},
            "max_player": { 2: "2人局", 3: "3人局", 4: "4人局", 5: "5人局", 6: "6人局" },
            "button_mode": { 1: "抢庄", 2: "看牌抢庄", 3: "霸王庄" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
    }
}