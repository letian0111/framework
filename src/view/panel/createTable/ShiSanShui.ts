class ShiSanShui {
     public static createInfo = [
        
        
        {"name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts":"8局,16局,24局","values":[8,16,24], "value":16, "cost":1, "des":["8局","16局","24局"],"itemSpace":235},
        {"name": "countSelect", "title": "人数", "key": "max_player", "texts":"2人,3人,4人,5人","values":[2,3,4,5], "value":4, "costDivide":1, "des":["2人","3人","4人","5人"],"itemSpace":100,"changeDispatch":true},
        //{ "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"], "matchvalue": 0 },
        {"key":"gps","value":0},
        {"name": "chooseAndSelect", "line":1, "title": "玩法", "info":[
                                                            {"name": "select", "title": "加大小王", "key": "jdxw", "texts":"不加王,加一王,加大小王","values":[0,1,2], "value":0, "des":["不加王","加一王","加大小王"],
                                                            "itemSpace":200},
                                                          
                                                            {"name": "choose", "title": "玩法选择", "key": "jys", "texts":"加一色","values":[0,1], "value":1, "des":["","加一色"]},
                                                            {"name": "choose", "title": "玩法选择", "key": "csjb", "texts":"冲三翻倍","values":[0,1], "value":1, "des":["","冲三翻倍"]},
                                                            {"name": "select", "title": "玩法选择", "key": "mm", "texts":"不买苍蝇,黑桃A,黑桃5,黑桃10","values":[0,1,5,10], "value":0, "des":["不买苍蝇","黑桃A","黑桃5","黑桃10"]}], "space" : 3 },
        {"name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts":["房主支付","AA支付"],"values":[0,1], "value":1, "des":["房主支付","AA支付"]},
        ]
      public static cost = 0
      //public static costDivide = 4                                                
      //public static costs = [2,4,8]
      public static costDivide = [2,3,4,5,6]
      //public static costs = [[4,6,8,10,12],[8,12,16,20,24]]
      public static costs = [2,4]
      //public static costs = [[10,10,10,10,10],[20,20,20,20,20]]
      public static ruleKey = ["tableid", "totalHandCount","gps","jdxw", "jys","csjb","mm"]
      public static ruleValue = [[], [],["",""],["不加王","加一王","加大小王"], ["","加一色"],["","冲三翻倍"],["不买苍蝇","黑桃A","黑桃5","黑桃10"]]                                                           
}