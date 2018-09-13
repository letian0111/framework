class ZhangXin {
    public static GAME_TYPE_CREATE_INFO = {
        "shisanshui": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,16局,24局", "values": [8, 16, 24], "value": 16, "cost": 1, "des": ["8局", "16局", "24局"], "itemSpace": 235 },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,3人,4人,5人", "values": [2, 3, 4, 5], "value": 4, "costDivide": 1, "des": ["2人", "3人", "4人", "5人"], "itemSpace": 100, "changeDispatch": true },
                //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"], "matchvalue": 0 },
                { "key": "gps", "value": 0 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [
                        {
                            "name": "select", "title": "加大小王", "key": "jdxw", "texts": "不加王 ,加一王,加大小王", "values": [0, 1, 2], "value": 0, "des": ["不加王", "加一王", "加大小王"],
                            "itemSpace": 100
                        },
                        { "name": "select", "title": "玩法选择", "key": "mm", "texts": "不买苍蝇,黑桃A    ,黑桃5,黑桃10", "values": [0, 1, 2, 3], "value": 0, "des": ["不买苍蝇", "黑桃A", "黑桃5", "黑桃10"] ,"itemSpace": 75},
                        { "name": "select", "title": "玩法选择", "key": "sz", "texts": "A2345最小,A2345仅比10JQKA小", "values": [0, 1], "value": 0, "des": ["A2345最小", "A2345仅比10JQKA小"] ,"itemSpace": 50},
                        
                        { "name": "choose", "title": "玩法选择", "key": "jys", "texts": "加一色", "values": [0, 1], "value": 1, "des": ["", "加一色"],"changeOn": {
                                "max_player": {
                                    "selected": { 5:true},
                                    "disabled": { 2:false,3:false,4:false,5:true},
                                }
                            } },
                        { "name": "choose", "title": "玩法选择", "key": "csjb", "texts": "冲三翻倍", "values": [0, 1], "value": 1, "des": ["", "冲三翻倍"] }
                        ], "space": 4
                },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": [2, 3, 4, 5],
            "costs": [2, 4,6],
            "ruleKey": ["tableid", "totalHandCount", "gps", "jdxw", "jys", "csjb", "mm","sz"],
            "ruleValue": [[], [], ["", ""], ["不加王", "加一王", "加大小王"], ["", "加一色"], ["", "冲三翻倍"], ["不买苍蝇", "黑桃A", "黑桃5", "黑桃10"],["A2345最小", "A2345仅比10JQKA小"]],
            "important":[0,0,0,0,0,0,0,0],
            "new":1,
            "ch_name":"十三水",
        },
      
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
            "new":1,
             "ch_name":"跑得快",
        },
        "daye_phz": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,12局", "values": [6, 12], "value": 6, "cost": 1, "des": ["6局", "12局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "key": "max_player", "value": 3 },
                // { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,4人", "values": [2, 4], "value": 4, "costDivide": 1, "des": ["2人", "4人"], "matchvalue": 4 ,"itemSpace": 270 },
                //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 1, "des": ["", "防作弊"], "matchvalue": 0 },
                { "key": "gps", "value": 1 },
                //{ "name": "select", "title": "摆牌方式", "key": "fold_type", "texts": "独立摆放,合并摆放", "values": [0, 1], "value": 1, "des": ["独立摆放", "合并摆放"], "matchvalue": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [3],
            "costs": [1, 2],
            "ruleKey": ["tableid", "totalHandCount", "gps"],
            "ruleValue": [[], [], ["", "防作弊"],],
             "ch_name":"大冶字牌",
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
            "costs": [1, 2],
            "ruleKey": ["tableid", "totalHandCount", "gps"],
            "ruleValue": [[], [], ["", "防作弊"],],
             "ch_name":"斗地主",
        },

        "hongzhong_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,3人,4人", "values": [2, 3, 4], "value": 4, "costDivide": 1, "des": ["2人", "3人", "4人"], "matchvalue": 4, "itemSpace": 270, "changeDispatch": true },
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局,12局", "values": [4,8,12], "value": 8, "cost": 1, "des": ["4局", "8局", "12局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "key": "gps", "value": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [2, 3, 4],
            "costs": [1,1, 2],
            "ruleKey": ["tableid", "totalHandCount", "gps"],// "zhua_ma", "zhua_ma_double", "zhua_ma_plus", "eyes_258", "one_color_double", "duiduihu_double"],
            "ruleValue": [[], [], ["", "防作弊"], ],//["不抓", "1个", "4个", "6个"], ["", "抓码翻倍"], ["", "清胡多抓2码"], ["", "258做将"], ["", "清一色翻倍"], ["", "对对胡翻倍"]],
             "ch_name":"红中麻将",
        },
        "daye_db": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局,12局", "values": [4,8,12], "value":  8, "cost": 1, "des": ["4局", "8局","12局"], "itemSpace": 250 },
                { "key": "gps", "value": 0 },
                { "key": "max_player", "value": 4 },
                { "name": "countSelect", "title": "模式", "key": "xipai", "texts": "洗牌,不洗牌", "values": [0, 1], "value": 0, "des": ["洗牌", "不洗牌"], "itemSpace": 235,"btn":"炸弹满天飞，把把带给你心惊肉跳的感受"},
                {
                    "name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [
                        { "name": "select", "title": "癞子", "key": "shifter", "texts": "癞子单出3,癞子单出2", "values": [0, 1], "value": 0, "des": ["癞子单出3","癞子单出2"] },
                        { "name": "select", "title": "滚炸", "key": "lian_bomb", "texts": "无滚炸, 有滚炸", "values": [0, 1], "value": 0, "des": ["无滚炸","有滚炸"], "itemSpace": 202},
                        { "name": "choose", "title": "平局", "key": "draw", "texts": "100分算平局", "values": [0, 1], "value": 0, "des": ["", "100分算平局"]},
                        { "name": "choose", "title": "干直拱", "key": "no_score", "texts": "未抓分算干直拱", "values": [0, 1], "value": 0, "des": ["", "未抓分算干直拱"]},
                        { "name": "choose", "title": "带喜钱", "key": "xiqian", "texts": "带喜钱", "values": [0, 1], "value": 1, "des": ["", "带喜钱"]},

                    ], "space": 3
                },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": [4],
            "costs": [1, 2,3],

            "ruleKey": ["tableid", "totalHandCount", "gps", "shifter", "lian_bomb", "draw", "no_score", "xiqian","xipai"],
            "ruleValue": [[], [], ["", "防作弊"], ["癞子单出3","癞子单出2"], ["无滚炸","有滚炸"], ["", "100分算平局"], ["", "未抓分算干直拱"], ["", "带喜钱"],["洗牌","不洗牌"]],
            "important":[0,0,0,0,0,0,0,1],
            "ch_name":"大冶打拱",
        },
        "daban_3p": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局,12局", "values": [4,8,12], "value":  8, "cost": 1, "des": ["4局", "8局","12局"], "itemSpace": 200 },
                { "key": "gps", "value": 0 },
                { "key": "max_player", "value": 3 },
                { "name": "countSelect", "title": "手牌", "key": "hand_card", "texts": "手牌显示,手牌不显示", "values": [0, 1], "value": 0, "des": ["手牌显示", "手牌不显示"] },
                { "name": "countSelect", "title": "底牌", "key": "left_card", "texts": "底牌显示,底牌不显示", "values": [0, 1], "value": 0, "des": ["底牌显示", "底牌不显示"] },
                { "name": "countSelect", "title": "抢庄", "key": "banker", "texts": "允许抢庄,不允许抢庄", "values": [0, 1], "value": 0, "des": ["允许抢庄", "不允许抢庄"] },                
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": [3],
            "costs": [1, 2, 3],

            "ruleKey": ["tableid", "totalHandCount", "gps", "hand_card", "left_card", "banker",],
            "ruleValue": [[], [], ["", "防作弊"], ["手牌显示", "手牌不显示"], ["底牌显示", "底牌不显示"], ["允许抢庄", "不允许抢庄"]],
            "important":[0,0,0,0,0,1],
             "ch_name":"三人拱",
        },
    }

     public static SHARE_DESC = {
        "shisanshui": {
            "max_hand_cnt": { 8: "8局", 16: "16局", 24: "24局" },
            "max_player": { 2: "2人局", 3: "3人局", 4: "4人局" , 5: "4人局" },
            "gps": ["", "防作弊"],
            "jdxw": ["不加王", "加一王", "加大小王"],
            "mm": ["不买苍蝇", "黑桃A", "黑桃5", "黑桃10"],
            "jys": ["","加一色"],
            "csjb": ["","冲三翻倍"],
            "sz":["A2345最小","A2345仅比10JQKA小"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },
   
        "daye_phz": {
            "max_hand_cnt": { 6: "6局", 12: "12局" },
            "max_player": { 3: "3人局" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
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
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
  
        "daye_db":{
            "max_hand_cnt": { 4: "4局",8:"8局" ,12: "12局" },
            "max_player": { 4: "4人局" },
            "shifter": ["癞子单出3", "癞子单出2"],
            "lian_bomb": ["无滚炸","有滚炸"], 
            "draw": ["", "100分算平局"], 
            "no_score": ["", "未抓分算干直拱"], 
            "xiqian": ["","带喜钱"],
            "xipai": ["洗牌","不洗牌"],
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },
        "daban_3p":{
            "max_hand_cnt": { 4: "4局",8:"8局" ,12: "12局" },
            "max_player": { 3: "3人局" },
            "hand_card": ["手牌显示", "手牌不显示"],
            "left_card": ["底牌显示", "底牌不显示"], 
            "banker": ["允许抢庄", "不允许抢庄"],
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },

    }
}