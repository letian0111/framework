class HongHu {
    public static GAME_TYPE_CREATE_INFO = {
        "daban": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局,12局", "values": [4,8,12], "value":  8, "cost": 1, "des": ["4局", "8局"], "itemSpace": 200 },
                { "key": "gps", "value": 0 },
                { "key": "max_player", "value": 4 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [
                        { "name": "select", "title": "癞子", "key": "shifter", "texts": "癞子单出3,癞子单出2", "values": [0, 1], "value": 0, "des": ["癞子单出3","癞子单出2"] },
                        { "name": "choose", "title": "带喜钱", "key": "xiqian", "texts": "带喜钱", "values": [0, 1], "value": 1, "des": ["", "带喜钱"]},
                       

                    ], "space": 3
                },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": [4],
            "costs": [1, 2,3],

            "ruleKey": ["tableid", "totalHandCount", "gps", "shifter", "xiqian"],
            "ruleValue": [[], [], ["", "防作弊"], ["癞子单出3","癞子单出2"], ["", "带喜钱"]],
            "important":[0,0,0,1,0],
            "ch_name":"洪湖打板",
        },
       
    }

      public static SHARE_DESC = {
        "daban":{
            "max_hand_cnt": { 4: "4局",8:"8局" ,12: "12局" },
            "max_player": { 4: "4人局" },
            "xiqian": ["","带喜钱"],
            "shifter": ["癞子单出3", "癞子单出2"],
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },
    }
}