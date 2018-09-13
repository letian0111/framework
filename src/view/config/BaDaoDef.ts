class BaDao {
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
            "ch_name":"十三水",
        },
        
        "bazhang": {
            "createInfo": [


                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "10局,20局", "values": [10, 20], "value": 20, "cost": 1, "des": ["10局", "20局"], "itemSpace": 235 },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,3人,4人,5人,6人", "values": [2, 3, 4, 5, 6], "value": 4, "costDivide": 1, "des": ["2人", "3人", "4人", "5人", "6人"], "itemSpace": 100, "changeDispatch": true },
                //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"], "matchvalue": 0 },
                { "key": "gps", "value": 0 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [
                        {
                            "name": "select", "title": "去不去牌", "key": "qp", "texts": "不去牌,去2-4,去2-6", "values": [0, 1, 2], "value": 2, "des": ["不去牌", "去2-4", "去2-6"],
                            "itemSpace": 200, "changeOn": {
                                "max_player": {
                                    "labels": { 2: "不去牌,去2-4,去2-6", 3: "不去牌,去2-4,去2-6", 4: "不去牌,去2-4,去2-6", 5: "不去牌,去2-4", 6: "不去牌" },
                                    "selectedIndex": { 2: 0, 3: 0, 4: 0, 5: 1, 6: 0 }
                                }
                            }
                        },

                        { "name": "choose", "title": "玩法选择", "key": "hbl", "texts": "红波浪", "values": [0, 1], "value": 1, "des": ["", "红波浪"] },
                        { "name": "choose", "title": "玩法选择", "key": "wpp", "texts": "无抛牌", "values": [0, 1], "value": 1, "des": ["", "无抛牌"] },
                        { "name": "choose", "title": "玩法选择", "key": "dxw", "texts": "大小王", "values": [0, 1], "value": 1, "des": ["", "大小王"] },
                        { "name": "choose", "title": "玩法选择", "key": "tqkc", "texts": "提前开车", "values": [0, 1], "value": 0, "des": ["", "提前开车"] }], "space": 3
                },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": [2, 3, 4, 5, 6],
            "costs": [2, 4],
            "ruleKey": ["tableid", "totalHandCount", "gps", "qp", "hbl", "wpp", "dxw", "tqkc"],
            "ruleValue": [[], [], ["", ""], ["不去牌", "去2-4", "去2-6"], ["", "红波浪"], ["", "无抛牌"], ["", "大小王"], ["", "提前开车"]],
            "important":[0,0,0,0,1,0,1,1],
            "ch_name":"扑克八张",
        },
        "tonglu_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,10局,30片,50片", "values": [6, 10, 30, 50], "value": 6, "cost": 1, "des": ["6局", "10局", "30片", "50片"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,4人", "values": [2, 4], "value": 4, "costDivide": 1, "des": ["2人", "4人"], "matchvalue": 4, "itemSpace": 270, "changeDispatch": true },
                //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 1, "des": ["", "防作弊"], "matchvalue": 0 },
                { "key": "gps", "value": 1 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [

                        { "name": "select", "title": "三牢起(硬自摸)", "key": "lao_3", "texts": "三牢起(硬自摸),一牢起(三牢点炮)", "values": [0, 1], "value": 0, "des": ["三牢起(硬自摸)", "一牢起(三牢点炮)"], "itemSpace": 90 },
                        {
                            "name": "select", "title": "不承包(限2吃2碰)", "key": "cheng_bao", "texts": "不承包(限2吃2碰),不承包(限两摊),承包/反承包", "values": [0, 1, 2], "value": 0, "des": ["不承包(限2吃2碰)", "不承包(限两摊)", "承包/反承包"], "itemSpace": 55,
                            "changeOn": {
                                "max_player": {
                                    "labels": { 2: "不承包(限2吃2碰),不承包(限两摊)", 4: "不承包(限2吃2碰),不承包(限两摊),承包/反承包" },
                                    "selectedIndex": { 2: 0, 4: 1 }
                                }
                            }
                        },

                        { "name": "choose", "title": "玩法选择", "key": "shi_feng", "texts": "十风", "values": [0, 1], "value": 0, "des": ["", "十风"] },
                        { "name": "choose", "title": "玩法选择", "key": "chao_bao", "texts": "超包", "values": [0, 1], "value": 0, "des": ["", "超包"], "changeOn": { "max_hand_cnt": { "visible": { 6: false, 10: false, 30: true, 50: true } }, "matchvalue": 1 } },
                        { "name": "select", "title": "32封顶", "key": "max_32", "texts": "32封顶,64封顶", "values": [0, 1], "value": 0, "huanhang": true, "des": ["32封顶", "64封顶"], "itemSpace": 90, "changeOn": { "max_player": { "visible": { 2: true, 4: true } }, "max_hand_cnt": { "visible": { 6: true, 10: true, 30: false, 50: false } }, "matchvalue": 1 } },

                    ], "space": 3
                },

                //{ "name": "select", "title": "摆牌方式", "key": "fold_type", "texts": "独立摆放,合并摆放", "values": [0, 1], "value": 1, "des": ["独立摆放", "合并摆放"], "matchvalue": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [2, 4],
            "costs": [2, 3, 1, 2],
            "ruleKey": ["tableid", "totalHandCount", "gps", "lao_3", "cheng_bao", "shi_feng", "chao_bao", "max_32"/*, "fold_type"*/],
            "ruleValue": [[], [], ["", "防作弊"], ["三牢起(硬自摸)", "一牢起(三牢点炮)"], ["不承包(限2吃2碰)", "不承包(限两摊)", "承包/反承包"], ["", "十风"], ["", "超包"], ["32封顶","64封顶"]/*, ["独立摆放", "合并摆放"]*/],
            "important":[0,0,0,0,0,1,0],
            "ch_name":"杭州麻将",
        },
       
          "shuangkou": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "5局,8局", "values": [5, 8], "value": 8, "cost": 1, "des": ["5局", "8局"], "itemSpace": 165 },
                { "key": "gps", "value": 0 },
                { "key": "max_player", "value": 4 },
                { "name": "countSelect", "title": "倍率", "key": "multiple_rate", "texts": "1/2/4,1/2/3,0/2/4", "values": [0, 1, 2], "value": 1, "des": ["1/2/4", "1/2/3", "0/2/4"], "itemSpace": 143 },
                 { "name": "countSelect", "title": "位置", "key": "huan_wei", "texts": "不换位,换位", "values": [0, 1], "value": 1, "des": ["不换位","换位"], "itemSpace": 110 },
                {"name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [{ "name": "choose", "title": "玩法选择", "key": "double_bright", "texts": "双明玩法", "values": [0, 1], "value": 1, "des": ["", "双明玩法"] },
                                                                                { "name": "choose", "title": "玩法选择", "key": "qi_pai", "texts": "弃牌", "values": [0, 1], "value": 1, "des": ["", "弃牌"] }
                                                                                ], "space": 4},
                
                 //暂时屏蔽底分选择，默认1分                                                       
                //{ "name": "countSelect", "title": "底分", "key": "base_score", "texts": "1分,2分,5分", "values": [0, 1, 2], "value": 0, "des": ["1分", "2分", "5分"], "itemSpace": 100 },
                { "key": "base_score", "value": 0 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": [4],
            "costs": [2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps", "multiple_rate", "double_bright", "qi_pai", "base_score","huan_wei"],
            "ruleValue": [[], [], ["", "防作弊"], ["1/2/4", "1/2/3", "0/2/4"], ["", "双明玩法"], ["", "弃牌"],["", "", ""],["不换位","换位"]],
            "important":[0,0,0,0,0,1,0],
            "ch_name":"经典双扣",
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
       
        "tonglu_mj": {
            "max_hand_cnt": { 6: "6局", 10: "10局", 30: "30片", 50: "50片" },
            "chao_bao": { 0: "", 1: "超包" },
            "lao_3": { 0: "三牢起(硬自摸)", 1: "一牢起(三牢点炮)" },
            "cheng_bao": { 0: "不承包(限2吃2碰)", 1: "不承包(限两摊)", 2: "承包/反承包" },
            "shi_feng": { 0: "", 1: "十风" },
            "max_player": { 2: "2人局", 4: "4人局" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
            "max_32": ["32封顶", "64封顶"]
        },
        "bazhang": {
            "max_hand_cnt": { 10: "10局", 20: "20局" },
            "max_player": { 2: "2人局", 3: "3人局", 4: "4人局", 5: "5人局", 6: "6人局" },
            "gps": ["", "防作弊"],
            "qp": { 0: "不去牌", 1: "去2-4", 2: "去2-6" },
            "hbl": ["", "红波浪"],
            "wpp": ["", "无抛牌"],
            "dxw": ["", "大小王"],
            "tqkc": ["", "提前开车 "],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },
      
       "shuangkou": {
            "max_hand_cnt": { 5: "5局", 8: "8局" },
            "max_player": { 4: "4人局" },
            "multiple_rate": { 0: "1/2/4", 1: "1/2/3", 2: "0/2/4" },
            "double_bright": ["", "双明玩法"],
            "qi_pai": ["", "弃牌"],
            "base_score": { 0: "1分", 1: "2分", 2: "5分" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
            "huan_wei":["不换位","换位"],
        },
        "doudizhu": {
            "max_hand_cnt": { 6: "6局", 12: "12局" },
            "max_player": { 3: "3人局" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
    }
}