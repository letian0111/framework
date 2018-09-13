class BaZhang {
     public static createInfo = [
        
        
        {"name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts":"10局,20局","values":[10,20], "value":20, "cost":1, "des":["10局","20局"],"itemSpace":235},
        {"name": "countSelect", "title": "人数", "key": "max_player", "texts":"2人,3人,4人,5人,6人","values":[2,3,4,5,6], "value":4, "costDivide":1, "des":["2人","3人","4人","5人","6人"],"itemSpace":100,"changeDispatch":true},
        //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"], "matchvalue": 0 },
        {"key":"gps","value":0},
        {"name": "chooseAndSelect", "line":1, "title": "玩法", "info":[
                                                            {"name": "select", "title": "去不去牌", "key": "qp", "texts":"不去牌,去2-4,去2-6","values":[0,1,2], "value":2, "des":["不去牌","去2-4","去2-6"],
                                                            "itemSpace":200,"changeOn":{"max_player":{"labels":{2:"不去牌,去2-4,去2-6",3:"不去牌,去2-4,去2-6",4:"不去牌,去2-4,去2-6",5:"不去牌,去2-4",6:"不去牌"},
                                                                                        "selectedIndex":{2:0,3:0,4:0,5:1,6:0}}}},
                                                          
                                                            {"name": "choose", "title": "玩法选择", "key": "hbl", "texts":"红波浪","values":[0,1], "value":1, "des":["","红波浪"]},
                                                            {"name": "choose", "title": "玩法选择", "key": "wpp", "texts":"无抛牌","values":[0,1], "value":1, "des":["","无抛牌"]},
                                                            {"name": "choose", "title": "玩法选择", "key": "dxw", "texts":"大小王","values":[0,1], "value":1, "des":["","大小王"]},
                                                            {"name": "choose", "title": "玩法选择", "key": "tqkc", "texts":"提前开车","values":[0,1], "value":0, "des":["","提前开车"]}], "space" : 3 },
        {"name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts":["房主支付","AA支付"],"values":[0,1], "value":1, "des":["房主支付","AA支付"]},
        ]
      public static cost = 0
      //public static costDivide = 4                                              
      //public static costs = [2,4,8]
      public static costDivide = [2,3,4,5,6]
      //public static costs = [[4,6,8,10,12],[8,12,16,20,24]]
      public static costs = [2,4]
      //public static costs = [[10,10,10,10,10],[20,20,20,20,20]]
      public static ruleKey = ["tableid", "totalHandCount","gps","qp", "hbl","wpp","dxw","tqkc"]
      public static ruleValue = [[], [],["",""],["不去牌", "去2-4", "去2-6"], ["", "红波浪"],["", "无抛牌"],["", "大小王"],["", "提前开车"]]                                                           
}