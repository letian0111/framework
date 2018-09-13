class BullTableInfo {
    public static createInfo = [
        { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "1局,2局", "values": [1, 2], "value": 1, "cost": 1, "des": ["1局", "2局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
        { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,3人,4人,5人,6人", "values": [2, 3, 4, 5, 6], "value": 6, "costDivide": 1, "des": ["2人", "3人", "4人", "5人", "6人"], "changeDispatch": true, "itemSpace": 100 },
        { "name": "countSelect", "title": "庄家", "key": "button_mode", "texts": "抢庄,看牌抢庄", "values": [1, 2], "value": 1, "des": ["抢庄", "看牌抢庄"], "changeDispatch": true, "itemSpace": 120 },
        { "key": "gps", "value": 1 },
        { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
    ]
    public static cost = 0
    public static costDivide = [2, 3, 4, 5, 6]
    public static costs = [0, 0]
    public static ruleKey = ["tableid", "totalHandCount", "gps"]
    public static ruleValue = [[], [], ["", "防作弊"],]
}