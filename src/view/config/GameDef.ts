class GameDef {
    public static OptType = {
        MJ_DISCARD: 0,
        MJ_DRAW: 1,
        MJ_CHI: 2,
        MJ_PENG: 3,
        MJ_MNGANG: 4,
        MJ_ANGANG: 5,
        MJ_PENGGANG: 6,
        MJ_TING: 7,
        MJ_HU: 8,
        MJ_QI: 9,
        MJ_MISS_HU: 10,
        MJ_FLOWER: 11,
        MJ_CHOICE: 12, //溫州麻將買底
        MJ_PIAO: 15,
        MJ_ANKOU: 16,
        MJ_DEAL: 17,
        CALL_SCORE: 18,
        CALL_SCORE2: 19,
        SHOW_CARDS: 20,
        RECONNECT: 21,
        PA_MAKE_S: 22,
        PA_MAKE_N: 23,
        POINT_OUT: 24,
        MISS_PENG: 25,
        MISS_CHI: 26,
        PIAO: 27,
        SK_JIEFENG: 28, //双扣接风
        SHARE_OTHER:29,    //打板对家明牌
        QI_PAI:30,          //双扣弃牌
        MJ_MUST_HU:31,
        HAIDILAOYUE:32,
    }

    public static ShowInfoType = {
        SHOW_DICE: 1,
        DEAL_CARDS: 2,
        SHUFFLE_CARD: 3,
        WIN_DEATIL: 4,
        WIN_TYPE: 5,
        CALL_SCORE: 6,
        DRAW_SHIFTER: 7,
        SHOW_OPT_END: 8,
        QUAN_LEI_DA: 9,
        GEN_PAI: 10,
        ZUIHOU4: 11,
        MNGANG: 12,
        ANGANG: 13,
        PENGGANG: 14,
        CANCELGANG: 15,
        START_TIME: 16,
        START_GAME: 17,
        BAO_TING: 18,
        LIAN_ZHUANG: 19,
        MING_PAI: 20,
        HUAN_WEI: 21,
        SI_SHOW: 22,
        CALL_SCORE2: 23,
        ZHUA_MA: 24,
        TABLE_SCORE : 25,   //打板 刷新桌面分数
        PLAYER_SCORE : 26,  //打板 刷新玩家抓分
        MING_JI:27,         //明鸡

        QI_PAI_END:28,      //双扣弃牌 结束

        SPECIAL_TYPE:29,      //八张十三水特殊牌型
        SCORE_BONUS:30,     //底分翻倍
        SHUFFLE_CARDS_NUM :31,	//八张，十三水洗牌次数
        OP_CARD:32,         //对家牌
        HAIDILAOYUE: 33,    // 海底捞月
    }

    public static TABLE_OPT = {
        SHUFFLE: 1,               // 洗牌   
    }    

    public static DETAIL_TYPE = {
        WIN_DEATIL: 1,
        SHOW_RULE: 2,
        WIN_SPECIAL: 3,
        GUN_DETAIL: 4,
        LOSE_DETAIL: 5,
        HISTORY_DETAIL: 6,
        PHZ_CARDS: 7,
        PHZ_TING: 8,
        SHOW_CARDS: 9,
    }

    public static AREA_TYPE = {
        HAND_CARD: 1,
        FOLD_CARD: 2,
        HOLD_CARD: 3,
        FLOWER_CARD: 4,
        TING_CARD: 5,
        WIN_CARD: 6,
        QI_PAI:7,        
    }
    public static MJ_WIN_TYPE = {
        NO_WIN: 0,						//流局
        WIN_ALL: 1,					//自摸胡
        WIN_ONE: 2,					//点炮胡
        WIN_KONG: 3,					//抢杠胡
        DISBAND: 4,					//解散
        HOT_KONG: 5, 
    }
    public static WIN_TYPE = {
        MJ_DIANPAO: 1, //点炮
        MJ_HUAPAI: 2, //花牌
        MJ_ANKA: 3, //暗刻
        MJ_ZIMO: 4, //自摸
        MJ_QIAZHANG: 5, //掐张
        MJ_MENQING: 6, //门清
        MJ_QUEMEN: 7, //缺门
        MJ_BAOTING: 8, //报听
        MJ_GANG: 9, //杠
        WIN_258: 10, //258
        EYES_258: 11, //258做将
        SEVEN_PAIRS: 12, //七对
        PURE_COLOR: 13, //清一色
        PAO: 14, // 炮
        DANDIAO: 15, // 单吊
        YING_SEVEN_PAIRS: 16, //硬七对
        DUIDUIHU: 17, //对对胡
        SANCAI: 18,//三财神
        GANGKAI: 19,//杠开
        HAIDILAOYUE: 20,//海底捞月
        QUANZI: 21,//全字
        QIANGGANG: 22,//抢杠
        SHISANBUKAO: 23,//十三不靠
        QIZI: 24,//7字

        TIANHU: 25,//天胡
        DIHU: 26,//地胡
        GEN_PAI: 27,//跟牌
        XIAZHUANG: 28,//下庄
        HAOQI: 29,//豪七
        HAO_DUIDUIHU: 30,//豪大对
        BIANZHANG: 31,//边张
        SHUANG_HAOQI: 32,//双豪七
        SAN_HAOQI: 33,//三豪七
        CAI_PIAO: 34,//财飘
        GANG_PIAO: 35,//杠飘
        PIAO_GANG: 36,//飘杠
        SHI_FENG: 37,//十风
        BAOTOU: 38,//爆头      
        MIX_COLOR:39, //混一色
        QUANFENG:40, //全风向
        BU_HUA:41, //杠花
        HARD_ZIMO: 42,//硬自摸
        SOFT_ZIMO: 43,//软自摸
        ZHUA_MA: 44,// 抓码
        HOT_KONG: 45, //热铳
    }
    public static IS_WU_PAO_PAI = {
        YOU_PAO_PAI: 0,         //有抛牌
        WU_PAO_PAI: 1,          //无抛牌
        WU_SAN_SHUN: 3,         //无三顺抛牌
        WU_JINTIAO_HE_SANSHUN: 4,//无金条抛牌和三顺抛牌
    }
    public static PHZ_CARD_TYPE = {
        BIG: 1,
        SMALL: 2,
        PICK: 3,
    }

    public static WIN_TYPE_SYMBOL = {
        1: "+",
        2: "+",
        3: "*",
        4: "*",
        5: "*",
        6: "*",
        7: "*",
        8: "*",
        9: "+",
        10: "*",
        11: "*",
        12: "*",
        13: "*",
        14: "+"
    }

    public static WIN_TYPE_STRING = {
        1: '点炮',
        2: '花牌',
        3: '暗扣',
        4: '自摸',
        5: '掐张',
        6: '门清',
        7: '缺门',
        8: '报听',
        9: '杠分'
    }

    public static CHAT_MESSAGE = {
        1: ["不要木讷了，克里马擦些",
            "你咋回事呢？出牌这么慢",
            "还让不让我摸牌了，一个劲碰",
            "打张让我碰下啊",
            "没将没将，打两一样",
            "炸得忒色，廖咋咧",
            "来来来，我看你还能打个啥",
            " 臭水平，打的啥牌嘛",
            "都不要点炮，我要扣炸弹",
            "伙计，不要碰了，上碰下炸，你小心点",
            "哎呀，手气真是好"
        ],
        2: ["你太牛啦！",
            "手气真好！",
            "快点出牌啊",
            "今天真高兴",
            "你放炮，我不胡",
            "你家里是开银行的吧",
            "不好意思，我有事要先走一步啦",
            "你的牌打得太好啦"

        ],
        3: ["跟你们玩真有意思",
            "哥哥姐姐你们哪里人啊",
            "打快点啊，睡去了",
            "还给不给人摸牌了",
            "想要什么牌就来什么牌",
            "全部都是卡牌怎么打打哦",
            "都是些不搭牌",
            "你的麻将打的缙云第一名",
            "暗杠都被你碰没了",
            "别吵别吵，吵什么",
            "赢的人今天晚上请吃夜宵",
            "一直输，短裤都输没了"
        ],
        4: ["很高兴见到各位",
            "这把牌真好，要全垒打了",
            "今天手气真差",
            "给我来点好牌吧",
            "快点啊，等好久了",
            "为什么总是我中枪",
            "我要打枪了",
            "特殊牌，来个特殊牌",
            "别急，先让我想想",
            "哈喽，快摊牌了",
            "大家快穿好防弹衣",
            "这把牌输惨了"
        ],
        5: ["跟你们玩真有意思",
            "哥哥姐姐你们哪里人啊",
            "打快点啊，睡去了",
            "还给不给人摸牌了",
            "想要什么牌就来什么牌",
            "全部都是卡牌怎么打打哦",
            "都是些不搭牌",
            "你的麻将打的缙云第一名",
            "暗杠都被你碰没了",
            "别吵别吵，吵什么",
            "赢的人今天晚上请吃夜宵",
            "一直输，短裤都输没了"
        ],
        6: ["跟你们玩真有意思",
            "哥哥姐姐你们哪里人啊",
            "打快点啊，睡去了",
            "还给不给人摸牌了",
            "想要什么牌就来什么牌",
            "全部都是卡牌怎么打打哦",
            "都是些不搭牌",
            "你的麻将打的缙云第一名",
            "暗杠都被你碰没了",
            "别吵别吵，吵什么",
            "赢的人今天晚上请吃夜宵",
            "一直输，短裤都输没了"
        ],
        7: ["你太牛了",
            "哈哈，手气真好",
            "快点出牌啊",
            "今天真高兴",
            "你放炮，我不胡",
            "你家里是开银行的吧",
            "不好意思，我有事要先走一步了",
            "你的牌打得太好了",
            "大家好，很高兴见到各位",
            "怎么又断线了，网络怎么这么差呀"
        ],
        8: ["打牌不怕炸，说明胆子大",
            "我说你能快点嘛",
            "投降输一半，骚年们，放下武器吧",
            "要快要快，不能像个老太太",
            "我到底跟你有什么仇，什么怨",
            "啊呀妈呀，太刺激了",
            "哇，你的牌打得不错啊",
            "我炸你个桃花朵朵",
            "一手臭牌，只能留着下蛋啦"

        ],
        9: ["你的牌打的也太好了",
            "快点吧我等到花都谢了",
            "和你合作真是太愉快了",
            "吐了个槽的整个一个悲剧啊",
            "怎么炸弹这么多，我都被炸晕了",
            "投降输一半，速度投降吧",
            "不要吵了有什么好吵的，专心玩牌吧",
            "大清早的，鸡都还没叫慌什么嘛",
        ],
        10: ["不要木讷了，克里马擦些",
            "你咋回事呢？出牌这么慢",
            "还让不让我摸牌了，一个劲碰",
            "打张让我碰下啊",
            "没将没将，打两一样",
            "炸得忒色，廖咋咧",
            "来来来，我看你还能打个啥",
            " 臭水平，打的啥牌嘛",
            "都不要点炮，我要扣炸弹",
            "伙计，不要碰了，上碰下炸，你小心点",
            "哎呀，手气真是好"
        ],
        11: ["不要吵不要吵了，专心玩游戏吧",
            "不要走，决战到天亮",
            "你的牌打的真好",
            "你的牌打的真的是太差了",
            "快点儿出啊，上网不要钱吗",
            "慌什么嘛，多看一下不行吗",
            "网络真是差，又断线了"
        ],
        12: ["你的牌打的也太好了",
            "快点吧我等到花都谢了",
            "和你合作真是太愉快了",
            "吐了个槽的整个一个悲剧啊",
            "怎么炸弹这么多，我都被炸晕了",
            "投降输一半，速度投降吧",
            "不要吵了有什么好吵的，专心玩牌吧",
            "大清早的，鸡都还没叫慌什么嘛",
        ],
        13: ["你的牌打的也太好了",
            "快点吧我等到花都谢了",
            "和你合作真是太愉快了",
            "吐了个槽的整个一个悲剧啊",
            "怎么炸弹这么多，我都被炸晕了",
            "投降输一半，速度投降吧",
            "不要吵了有什么好吵的，专心玩牌吧",
            "大清早的，鸡都还没叫慌什么嘛",
        ],
        14: ["不要木讷了，克里马擦些",
            "你咋回事呢？出牌这么慢",
            "还让不让我摸牌了，一个劲碰",
            "打张让我碰下啊",
            "没将没将，打两一样",
            "炸得忒色，廖咋咧",
            "来来来，我看你还能打个啥",
            " 臭水平，打的啥牌嘛",
            "都不要点炮，我要扣炸弹",
            "伙计，不要碰了，上碰下炸，你小心点",
            "哎呀，手气真是好"
        ],
        15: ["你的牌打的也太好了",
            "快点吧我等到花都谢了",
            "和你合作真是太愉快了",
            "吐了个槽的整个一个悲剧啊",
            "怎么炸弹这么多，我都被炸晕了",
            "投降输一半，速度投降吧",
            "不要吵了有什么好吵的，专心玩牌吧",
            "大清早的，鸡都还没叫慌什么嘛",  
        ],
        16: ["拐子我来啦尬事啊",
            "机日多输卡我们",
            // "快滴卡，瞎打",
            "来来来接倒搞再来一盘",
            "哪门搞的又离线哒三个等一个",
            "你是少林寺出来的吧这么狠",
            // "哪门这么摸啊，快滴卡出啊",
            // "快点出",
            "完哒完哒拐哒拐哒打错哒",
            "是时候表演真正的技术了",
        ],
        19: ["你快点出啊，打牌真慢",
            "你慌什么啊，我要看清楚啦",
            "我跟你一边真是背手",
            "八九型，你的牌打的真牛叉",
            "同志们，慢慢玩，我要回去睡觉了",
            "走什么，再玩几盘",
            "你别吵行不行",         
        ],
        20: ["你快点出啊，打牌真慢",
            "你慌什么啊，我要看清楚啦",
            "我跟你一边真是背手",
            "八九型，你的牌打的真牛叉",
            "同志们，慢慢玩，我要回去睡觉了",
            "走什么，再玩几盘",
            "你别吵行不行",  
        ],       
        21: ["哎呀快滴卡瞎打",
            "放倒放倒我糊了",
            "拐子们数，我来了噶事啦",
            "机日多发滴卡福利给我们",
            "雷打都不动，反正我听是落了地",
            "麻将一首歌上碰下自摸",
            "输的西表死烂鸟，快滴卡", 
            "稀烂的牌，么把人打的燥死鸟",
            "咿呀，你们这一个个好积极啊",
            "咿呀，这牌真体面",
            "这哪门好意思又摸了",
            "知巴是昨日踩了狗屎粑粑地火这么好",
        ],
        22: ["哎呀快滴卡瞎打",
            "放倒放倒我糊了",
            "拐子们数，我来了噶事啦",
            "机日多发滴卡福利给我们",
            "雷打都不动，反正我听是落了地",
            "麻将一首歌上碰下自摸",
            "输的西表死烂鸟，快滴卡", 
            "稀烂的牌，么把人打的燥死鸟",
            "咿呀，你们这一个个好积极啊",
            "咿呀，这牌真体面",
            "这哪门好意思又摸了",
            "知巴是昨日踩了狗屎粑粑地火这么好",
        ],
        
    }
    public static CHAT_TYPE = {
        QUICK_MESSAGE: 1,
        EMOJI: 2,
        RECORD: 3
    }

    public static APP_TYPE = {
        TONGJIANG: 1,
        DAYE: 2,
    }

    public static GAME_NAME = [
        "shanxi_mj",
        "wakeng",
        "jinyun_mj",
        "shisanshui",
        "jinyun_gs_mj",
        "jinyun_hz_mj",
        "shangqiu_mj",
        "guanpai",
        "bazhang",
        "tonglu_mj",
        "daye_phz",
        "shuangkou",
        "doudizhu",
        "fuyang_mj",
        "hongzhong_mj",
        "daban",
        "bull",
        "hundred_bull",
        "daye_db",
        "daban_3p",
        "xiantao_mj",
        "lingxi_mj",
    ]

    public static GAME_NAME_CH = [
        "陕西麻将",
        "挖坑",
        "缙云玩法",
        "十三水",
        "广式玩法",
        "壶镇玩法",
        "商丘麻將",
        "关牌",
        "扑克八张",
        "杭州麻将",
        "大冶字牌",
        "经典双扣",
        "斗地主",
        "富阳麻将",
        "红中麻将",
        "洪湖打板",
        "牛牛",
        "百人牛牛",
        "大冶打拱",
        "三人拱",
        "仙桃赖晃",
        "灵溪炮台"
    ]

    public static GAME_TYPE = {
        SHANXI_MJ: "1",
        WAKENG: "2",
        JINYUN_MJ: "3",
        SHISANSHUI: "4",
        JINYUN_GS_MJ: "5",
        JINYUN_HZ_MJ: "6",
        SHANGQIU_MJ: "7",
        GUANPAI: "8",
        BAZHANG: "9",
        TONGLU_MJ: "10",
        DAYE_PHZ: "11",
        SHUANGKOU: "12",
        DOUDIZHU: "13",
        FUYANG_MJ: "14",
        HONGZHONG_MJ: "15",
        DABAN: "16",
        BULL: "17",
        HUNDRED_BULL: "18",
        DAYE_DB: "19",
        DABAN_3P: "20",
        XIANTAO_MJ: "21",
        LINGXI_MJ: "22",
    }

    public static CLUB_DESK_PLAYER_CNT = {
        "1":4,
        "2":4,
        "3":4,
        "4":4,
        "5":4,
        "6":4,
        "7":4,
        "8":3,
        "9":4,
        "10":4,
        "11":3,
        "12":4,
        "13":3,
        "14":2,
        "15":4,
        "16":4,
        "17":4,
        "18":4,
        "19":4,
        "20":3,
        "21":4,
    }

    public static GAME_TYPE_CREATE_INFO = {
        "shanxi_mj": {
            "createInfo": [{ "key": "max_player", "value": 4 },

            { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,16局", "values": [8, 16], "value": 8, "cost": 1, "des": ["8局", "16局"] },
            { "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"] },
            { "name": "select", "title": "玩法", "key": "dian_pao", "texts": "只炸不胡,普通平胡", "values": [0, 1], "value": 0, "des": ["只炸不胡", "普通平胡"] },

            {
                "name": "chooseAndSelect", "title": "可选", "info": [
                    { "name": "choose", "title": "玩法选择", "key": "has_wind", "texts": "带风牌", "values": [0, 1], "value": 0, "des": ["", "带风牌"] },
                    { "name": "choose", "title": "玩法选择", "key": "red_joker", "texts": "红中赖子", "values": [0, 1], "value": 0, "des": ["", "红中赖子"] },
                    { "name": "choose", "title": "玩法选择", "key": "eyes_258", "texts": "258硬将", "values": [0, 1], "value": 0, "des": ["", "258硬将"] },
                    { "name": "choose", "title": "玩法选择", "key": "win_258_double", "texts": "胡258加番", "values": [0, 1], "value": 0, "des": ["", "胡258加番"] },
                    { "name": "choose", "title": "玩法选择", "key": "eyes_258_double", "texts": "将258加番", "values": [0, 1], "value": 0, "des": ["", "将258加番"] },
                    { "name": "choose", "title": "玩法选择", "key": "one_color", "texts": "清一色加番", "values": [0, 1], "value": 0, "des": ["", "清一色加番"] }], "space": 3,
            },
            {
                "name": "switchAndSelect", "info": [
                    { "name": "choose", "title": "玩法选择", "key": "seven_pairs", "texts": "可胡7对(不加番)", "values": [0, 1], "value": 0, "des": ["", "可胡7对(不加番)"] },
                    { "name": "choose", "title": "玩法选择", "key": "seven_pairs_double", "texts": "可胡7对(加番)", "values": [0, 1], "value": 0, "des": ["", "可胡7对(加番)"] },
                ], "space": 2,
            },

            { "name": "hbuttons", "title": "炮子", "key": "pao", "texts": "0炮,1炮,2炮,3炮,4炮,自由炮", "values": [0, 1, 2, 3, 4, 5], "value": 0, "divide": 6, "des": ["0炮", "1炮", "2炮", "3炮", "4炮", "自由炮"] },
            { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 0, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": 4,
            "costs": [0, 48],
            "ruleKey": ["tableid", "totalHandCount", "gps", "dian_pao", "has_wind", "red_joker", "eyes_258", "win_258_double", "eyes_258_double", "seven_pairs", "seven_pairs_double", "one_color", "pao"],
            "ruleValue": [[], [], ["", "防作弊"], ["只炸不胡", "普通平胡"], ["", "风牌"], ["", "红中赖子"], ["", "258硬将"], ["", "胡258加番"], ["", "将258加番"], ["", "7对"], ["", "7对加番"], ["", "清一色加番"], ["0炮", "1炮", "2炮", "3炮", "4炮", "自由炮"]]
        },
        "wakeng": {
            "createInfo": [{ "key": "max_player", "value": 3 },
            { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,16局", "values": [8, 16], "value": 8, "cost": 1, "des": ["8局", "16局"] },
            { "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 1, "des": ["", "防作弊"] },
            {
                "name": "chooseAndSelect", "title": "玩法", "info": [
                    { "name": "select", "title": "玩法", "key": "black_call", "texts": "叫分,黑挖", "values": [0, 1], "value": 0, "des": ["叫分", "黑挖"] },
                    { "name": "choose", "title": "玩法选择", "key": "no_3_double", "texts": "无3翻倍", "values": [0, 1], "value": 0, "des": ["", "无3翻倍"] },
                ], "space": 2,
            },
            { "name": "select", "title": "炸弹", "key": "has_boom", "texts": "不带炸弹,带炸弹", "values": [0, 1], "value": 0, "des": ["不带炸弹", "带炸弹"] },
            { "name": "countSelect", "title": "炸弹倍数", "key": "boom_max", "texts": "3炸,不限", "values": [3, 999], "value": 3, "des": ["3炸", "不限"] },
            { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 0, "des": ["房主支付", "AA支付"] },
            ],

            "cost": 0,
            "costDivide": 3,
            "costs": [0, 48],
        },
        // "sz":["A2345最小","A2345仅比10JQKA小"],
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
                        
                        { "name": "choose", "title": "玩法选择", "key": "jys", "texts": "加一色", "values": [0, 1], "value": 1, "des": ["", "加一色"] },
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
        },
        "jinyun_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,16局,24局", "values": [8, 16, 24], "value": 8, "cost": 1, "des": ["8局", "16局", "24局"], "matchvalue": 8 },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "4人,3人,2人", "values": [4, 3, 2], "value": 4, "costDivide": 1, "des": ["4人", "3人", "2人"], "changeDispatch": true, "matchvalue": 4 },
                { "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"], "matchvalue": 0 },

                {
                    "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [
                        { "name": "choose", "title": "玩法选择", "key": "qghu_bao", "texts": "抢杠胡包", "values": [0, 1], "value": 0, "des": ["", "抢杠胡包"] },
                        { "name": "choose", "title": "玩法选择", "key": "zh4_bao", "texts": "最后四张包", "values": [0, 1], "value": 0, "des": ["", "最后四张包"] },
                        { "name": "choose", "title": "玩法选择", "key": "ying_seven", "texts": "硬板七对", "values": [0, 1], "value": 0, "des": ["", "硬板七对"] },
                        { "name": "choose", "title": "玩法选择", "key": "xia_zhuang", "texts": "50根下庄", "values": [0, 1], "value": 0, "des": ["", "50根下庄"], "matchvalue": 0 },
                        { "name": "choose", "title": "玩法选择", "key": "qizi", "texts": "7字", "values": [0, 1], "value": 0, "des": ["", "7字"] },
                        { "name": "choose", "title": "玩法选择", "key": "gen_pai", "texts": "跟牌", "values": [0, 1], "value": 0, "des": ["", "跟牌"], "changeOn": { "max_player": { "visible": { 4: true, 3: false, 2: false } } } }], "space": 3
                },
                { "name": "select", "title": "摆牌方式", "key": "fold_type", "texts": "独立摆放,合并摆放", "values": [0, 1], "value": 1, "des": ["独立摆放", "合并摆放"], "matchvalue": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 0, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": 4,
            "costs": [2, 4, 6],
            "ruleKey": ["tableid", "totalHandCount", "gps", "qghu_bao", "zh4_bao", "ying_seven", "xia_zhuang", "qizi", "gen_pai", "fold_type"],
            "ruleValue": [[], [], ["", "防作弊"], ["", "抢杠胡包"], ["", "最后四张包"], ["", "硬板七对"], ["", "50根下庄"], ["", "7字"], ["", "跟牌"], ["独立摆放", "合并摆放"]]
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
        },
        "jinyun_gs_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,16局,24局", "values": [8, 16, 24], "value": 8, "cost": 1, "des": ["8局", "16局", "24局"], "matchvalue": 8 },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "4人,3人,2人", "values": [4, 3, 2], "value": 4, "costDivide": 1, "des": ["4人", "3人", "2人"], "changeDispatch": true, "matchvalue": 4 },
                { "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"], "matchvalue": 0 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [
                        { "name": "choose", "title": "玩法选择", "key": "special_double", "texts": "特殊牌型翻倍", "values": [0, 1], "value": 0, "des": ["", "特殊牌型翻倍"] },
                        { "name": "choose", "title": "玩法选择", "key": "qgh_bg", "texts": "抢杠胡包杠", "values": [0, 1], "value": 0, "des": ["", "抢杠胡包杠"] },
                        { "name": "choose", "title": "玩法选择", "key": "gangkai_bg", "texts": "杠上开花包杠", "values": [0, 1], "value": 0, "des": ["", "杠上开花包杠"] },
                    ], "space": 2
                },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 0, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": 4,
            "costs": [2, 4, 6],
            "ruleKey": ["tableid", "totalHandCount", "gps", "special_double", "qgh_bg", "gangkai_bg"],
            "ruleValue": [[], [], ["", "防作弊"], ["", "特殊牌型翻倍"], ["", "抢杠胡包杠"], ["", "杠上开花包杠"]]
        },
        "jinyun_hz_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "8局,16局,24局", "values": [8, 16, 24], "value": 8, "cost": 1, "des": ["8局", "16局", "24局"], "matchvalue": 8 },
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "4人,3人,2人", "values": [4, 3, 2], "value": 4, "costDivide": 1, "des": ["4人", "3人", "2人"], "changeDispatch": true, "matchvalue": 4 },
                { "name": "gps", "key": "gps", "texts": "开启防作弊功能", "values": [0, 1], "value": 0, "des": ["", "防作弊"], "matchvalue": 0 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [
                        { "name": "choose", "title": "玩法选择", "key": "qghu_bao", "texts": "抢杠胡包", "values": [0, 1], "value": 0, "des": ["", "抢杠胡包"] },
                        { "name": "choose", "title": "玩法选择", "key": "zh4_bao", "texts": "最后四张包", "values": [0, 1], "value": 0, "des": ["", "最后四张包"] },
                        { "name": "choose", "title": "玩法选择", "key": "ying_seven", "texts": "硬板七对", "values": [0, 1], "value": 0, "des": ["", "硬板七对"] },
                        { "name": "choose", "title": "玩法选择", "key": "xia_zhuang", "texts": "50根下庄", "values": [0, 1], "value": 0, "des": ["", "50根下庄"], "matchvalue": 0 },
                        { "name": "choose", "title": "玩法选择", "key": "qizi", "texts": "7字", "values": [0, 1], "value": 0, "des": ["", "7字"] },
                        { "name": "choose", "title": "玩法选择", "key": "gen_pai", "texts": "跟牌", "values": [0, 1], "value": 0, "des": ["", "跟牌"], "changeOn": { "max_player": { "visible": { 4: true, 3: false, 2: false } } } }], "space": 3
                },
                { "name": "select", "title": "摆牌方式", "key": "fold_type", "texts": "独立摆放,合并摆放", "values": [0, 1], "value": 1, "des": ["独立摆放", "合并摆放"], "matchvalue": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 0, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": 4,
            "costs": [2, 4, 6],
            "ruleKey": ["tableid", "totalHandCount", "gps", "qghu_bao", "zh4_bao", "ying_seven", "xia_zhuang", "qizi", "gen_pai", "fold_type"],
            "ruleValue": [[], [], ["", "防作弊"], ["", "抢杠胡包"], ["", "最后四张包"], ["", "硬板七对"], ["", "50根下庄"], ["", "7字"], ["", "跟牌"], ["独立摆放", "合并摆放"]]
        },
        "shangqiu_mj": {},
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
            "costs": [2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps"],
            "ruleValue": [[], [], ["", "防作弊"],]
        },
        "shuangkou": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "5局,8局", "values": [5, 8], "value": 8, "cost": 1, "des": ["5局", "8局"], "itemSpace": 200 },
                { "key": "gps", "value": 0 },
                { "key": "max_player", "value": 4 },
                { "name": "countSelect", "title": "倍率", "key": "multiple_rate", "texts": "1/2/4,1/2/3,0/2/4", "values": [0, 1, 2], "value": 1, "des": ["1/2/4", "1/2/3", "0/2/4"], "itemSpace": 100 },

                {"name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [{ "name": "choose", "title": "玩法选择", "key": "double_bright", "texts": "双明玩法", "values": [0, 1], "value": 1, "des": ["", "双明玩法"] },
                                                                                { "name": "choose", "title": "玩法选择", "key": "qi_pai", "texts": "弃牌", "values": [0, 1], "value": 1, "des": ["", "弃牌"] },], "space": 3},
                
                 //暂时屏蔽底分选择，默认1分                                                       
                //{ "name": "countSelect", "title": "底分", "key": "base_score", "texts": "1分,2分,5分", "values": [0, 1, 2], "value": 0, "des": ["1分", "2分", "5分"], "itemSpace": 100 },
                { "key": "base_score", "value": 0 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"] },
            ],
            "cost": 0,
            "costDivide": [4],
            "costs": [2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps", "multiple_rate", "double_bright", "qi_pai", "base_score"],
            "ruleValue": [[], [], ["", "防作弊"], ["1/2/4", "1/2/3", "0/2/4"], ["", "双明玩法"], ["", "弃牌"],["", "", ""]],
            "important":[0,0,0,0,0,1,0],
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
        },

        "fuyang_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,10局", "values": [6, 10], "value": 6, "cost": 1, "des": ["6局", "10局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "key": "max_player", "value": 2 },
                { "key": "gps", "value": 1 },
                { "name": "countSelect", "title": "玩法", "key": "dianpao", "texts": "2台起(4台起点炮),3台起(5台起点炮)", "values": [0, 1], "value": 0, "des": ["2台起(4台起点炮)", "2台起(硬自摸)"], "itemSpace": 120, "space": 2 },
                // { "name": "countSelect", "title": "底分", "key": "base_score", "texts": "1分,2分,3分", "values": [1, 2, 3], "value": 1, "des": ["1分", "2分", "3分"], "itemSpace": 100 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "可选", "info": [

                        { "name": "choose", "title": "玩法选择", "key": "jiezhuang", "texts": "接庄", "values": [0, 1], "value": 0, "des": ["", "接庄"] },
                    ], "space": 3
                },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [2],
            "costs": [2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps", "dianpao", "jiezhuang"],//, "base_score"],
            "ruleValue": [[], [], ["", "防作弊"], ["2台起(4台起点炮)", "3台起(5台起点炮)"], ["不接庄", "接庄"]],//, ["1分", "2分", "3分"]],
            "important":[0,0,0,0,1],
        },
        "hongzhong_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "2人,3人,4人", "values": [2, 3, 4], "value": 4, "costDivide": 1, "des": ["2人", "3人", "4人"], "matchvalue": 4, "itemSpace": 270, "changeDispatch": true },
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,12局", "values": [6, 12], "value": 6, "cost": 1, "des": ["6局", "12局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
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
            "ruleValue": [[], [], ["", "防作弊"], ]//["不抓", "1个", "4个", "6个"], ["", "抓码翻倍"], ["", "清胡多抓2码"], ["", "258做将"], ["", "清一色翻倍"], ["", "对对胡翻倍"]],
        },
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
            "ruleValue": [[], [], ["", "防作弊"],]
        },
        "daye_db": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局,12局", "values": [4,8,12], "value":  8, "cost": 1, "des": ["4局", "8局"], "itemSpace": 200 },
                { "key": "gps", "value": 0 },
                { "key": "max_player", "value": 4 },
                {
                    "name": "chooseAndSelect", "line": 1, "title": "玩法", "info": [
                        { "name": "select", "title": "癞子", "key": "shifter", "texts": "癞子单出3,癞子单出2", "values": [0, 1], "value": 0, "des": ["癞子单出3","癞子单出2"] },
                        { "name": "select", "title": "滚炸", "key": "lian_bomb", "texts": "无滚炸, 有滚炸", "values": [0, 1], "value": 0, "des": ["无滚炸","有滚炸"] },
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

            "ruleKey": ["tableid", "totalHandCount", "gps", "shifter", "lian_bomb", "draw", "no_score", "xiqian"],
            "ruleValue": [[], [], ["", "防作弊"], ["癞子单出3","癞子单出2"], ["无滚炸","有滚炸"], ["", "100分算平局"], ["", "未抓分算干直拱"], ["", "带喜钱"]],
            "important":[0,0,0,0,0,0,0,1],
        },
        "daban_3p": {
            "createInfo": [
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "4局,8局,12局", "values": [4,8,12], "value":  8, "cost": 1, "des": ["4局", "8局"], "itemSpace": 200 },
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
        },
        "xiantao_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "3人,4人", "values": [3, 4], "value": 3, "costDivide": 1, "des": ["3人", "4人"], "matchvalue": 3, "itemSpace": 270, "changeDispatch": true },
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,12局,18局", "values": [6, 12, 18], "value": 12, "cost": 1, "des": ["6局", "12局", "18局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "key": "gps", "value": 1 },
                { "name": "countSelect", "title": "底分", "key": "base_score", "texts": "1分,2分,5分", "values": [0, 1, 2], "value": 0, "des": ["1分", "2分", "5分"], "itemSpace": 120, "space": 2 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [3, 4],
            "costs": [1, 2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps", , "base_score"],//, "base_score"],
            "ruleValue": [[], [], ["", "防作弊"], ["1分", "2分", "5分"]],//, ["1分", "2分", "3分"]],
            "important":[0,0,0,1],
        },
        "lingxi_mj": {
            "createInfo": [
                { "name": "countSelect", "title": "人数", "key": "max_player", "texts": "4人,3人,2人", "values": [4,3,2], "value": 3, "costDivide": 1, "des": ["4人", "3人", "2人"], "matchvalue": 3, "itemSpace": 270, "changeDispatch": true },
                { "name": "countSelect", "title": "局数", "key": "max_hand_cnt", "texts": "6局,12局,18局", "values": [6, 12, 18], "value": 12, "cost": 1, "des": ["6局", "12局", "18局"], "itemSpace": 120, "space": 2, "changeDispatch": true },
                { "key": "gps", "value": 1 },
                { "name": "chargeSelect", "title": "收费方式", "key": "charge_type", "texts": ["房主支付", "AA支付"], "values": [0, 1], "value": 1, "des": ["房主支付", "AA支付"], "matchvalue": 0, "discount": 1 },
            ],
            "cost": 0,
            "costDivide": [4, 3, 2],
            "costs": [1, 2, 3],
            "ruleKey": ["tableid", "totalHandCount", "gps"],//, "base_score"],
            "ruleValue": [[], [], ["", "防作弊"]],//, ["1分", "2分", "3分"]],
            "important":[0,0,0],
        },
    }

    public static CHAT_POS = [
        [],
        [2, 2],
        [2, 1, 2],
        [2, 1, 2, 2],
    ]
    public static RESULT_POS = [
        [],
        [2, 1, 1, 2],
        [2, 1, 1, 2],
        [2, 1, 1, 2],
        [2, 1, 1, 1, 2, 2],
        [2, 1, 1, 1, 2, 2]
    ]
    public static getGameTypeByGameName(name: string): number {
        var idx: number = GameDef.GAME_NAME.indexOf(name);
        return idx + 1;
    }

    private static _currentGames: Array<number>
    public static get currentGames(): Array<number> {
        if (!GameDef._currentGames) {
            GameDef._currentGames = [];
            for (var i: number = 0; i < GameConfig.GAMES.length; i++) {
                var type: number = GameDef.getGameTypeByGameName(GameConfig.GAMES[i]);
                if (type)
                    GameDef._currentGames.push(type);
            }
            GameDef._currentGames.sort();
        }
        return GameDef._currentGames;
    }

    private static _currentMatchs: Array<number>
    public static get currentMatchs(): Array<number> {
        if (!GameDef._currentMatchs) {
            GameDef._currentMatchs = [];
            for (var i: number = 0; i < GameConfig.MATCHS.length; i++) {
                var type: number = GameDef.getGameTypeByGameName(GameConfig.MATCHS[i]);
                if (type)
                    GameDef._currentMatchs.push(type);
            }
            GameDef._currentMatchs.sort();
        }
        return GameDef._currentMatchs;
    }

    public static isMaJiang(gameType: string): boolean {
        if (gameType == GameDef.GAME_TYPE.JINYUN_GS_MJ || gameType == GameDef.GAME_TYPE.JINYUN_MJ ||
            gameType == GameDef.GAME_TYPE.JINYUN_HZ_MJ || gameType == GameDef.GAME_TYPE.SHANGQIU_MJ ||
            gameType == GameDef.GAME_TYPE.SHANXI_MJ)
            return true;
        else
            return false;
    }

    private static _showGames
    public static _showDes
    public static get showGames() {
        if (!GameDef._showGames) {
            GameDef._showGames = {};
            GameDef._showDes = {}
            let i = 1
            for (var k in GameConfig.SHOW_GAME) {
                var type: number = GameDef.getGameTypeByGameName(k);
                GameDef._showDes[type] = i
                if (type) {
                    if (!GameDef._showGames[type])
                        GameDef._showGames[type] = [];
                }
                let v = GameConfig.SHOW_GAME[k]
                for (let j in v) {
                    let t = GameDef.getGameTypeByGameName(v[j])
                    if (t) {
                        GameDef._showGames[type].push(t)
                    }
                }
                i++
            }
            // GameDef._currentGames.sort();
        }
        return GameDef._showGames;
    }

    public static ruleKey = ["tableid", "totalHandCount", "gps", "qghu_bao", "zh4_bao", "ying_seven", "xia_zhuang", "qizi", "gen_pai"]
    public static ruleValue = [[], [], ["GPS关", "GPS开"], ["", "抢杠胡包"], ["", "最后四张包"], ["", "硬板七对"], ["", "50根下庄"], ["", "7字"], ["", "跟牌"]]

    public static SHARE_DESC = {
        "shangqiu_mj": {
            "max_hand_cnt": { 8: "8局", 16: "16局", 24: "24局" },
            "max_player": { 4: "4人局", 3: "3人局", 2: "2人局" },
            "gps": ["", "防作弊"],
            "ting": ["", "报听"],
            "ting_hu": ["不听管胡", "不听不胡"],
            "que_men": ["", "缺门"],
            "ankou": ["", "杠卡"],
            "qia_zhang": ["", "掐张"],
            "men_qing": ["", "门清"],
            "seven_pairs": ["", "可胡七对"],
            "dian_pao": ["", "可点炮胡"],
            "charge_type": ["房主支付", "AA支付"],
            "bian_zhang": ["", "边张"]
        },
        "jinyun_hz_mj": {
            "max_hand_cnt": { 8: "8局", 16: "16局", 24: "24局" },
            "max_player": { 4: "4人局", 3: "3人局", 2: "2人局" },
            "gps": ["", "防作弊"],
            "qghu_bao": ["", "抢杠胡包"],
            "zh4_bao": ["", "最后四张包"],
            "ying_seven": ["", "硬板七对"],
            "xia_zhuang": ["", "50根下庄"],
            "qizi": ["", "7字"],
            "gen_pai": ["", "跟牌"],
            "fold_type": ["独立摆放", "合并摆放"],
            "charge_type": ["房主支付", "AA支付"]

        },
        "jinyun_gs_mj": {
            "max_hand_cnt": { 8: "8局", 16: "16局", 24: "24局" },
            "max_player": { 4: "4人局", 3: "3人局", 2: "2人局" },
            "gps": ["", "防作弊"],
            "special_double": ["", "特殊牌型翻倍"],
            "qgh_bg": ["", "抢杠胡包杠"],
            "gangkai_bg": ["", "杠上开花包杠"],

            "charge_type": ["房主支付", "AA支付"]

        },
        "jinyun_mj": {
            "max_hand_cnt": { 8: "8局", 16: "16局", 24: "24局" },
            "max_player": { 4: "4人局", 3: "3人局", 2: "2人局" },
            "gps": ["", "防作弊"],
            "qghu_bao": ["", "抢杠胡包"],
            "zh4_bao": ["", "最后四张包"],
            "ying_seven": ["", "硬板七对"],
            "xia_zhuang": ["", "50根下庄"],
            "qizi": ["", "7字"],
            "gen_pai": ["", "跟牌"],
            "fold_type": ["独立摆放", "合并摆放"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]

        },

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
        "shanxi_mj": {
            "max_hand_cnt": { 12: "12局", 24: "24局", 36: "36局" },
            "max_player": { 4: "4人局", 3: "3人局", 2: "2人局" },
            "gps": ["", "防作弊"],
            "dian_pao": ["只炸不胡", "普通平胡"],
            "has_wind": ["", "风牌"],
            "red_joker": ["", "红中赖子"],
            "eyes_258": ["", "258硬将"],
            "win_258_double": ["", "胡258加番"],
            "eyes_258_double": ["", "将258加番"],
            "seven_pairs": ["", "7对"],
            "seven_pairs_double": ["", "7对加番"],
            "one_color": ["", "清一色加番"],
            "pao": ["0炮", "1炮", "2炮", "3炮", "4炮", "自由炮"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },

        "wakeng": {
            "max_hand_cnt": { 12: "12局", 24: "24局", 36: "36局" },
            "max_player": { 4: "4人局", 3: "3人局", 2: "2人局" },
            "gps": ["", "防作弊"],
            "no_3_double": ["", "无3翻倍"],
            "black_call": ["叫分", "黑挖"],
            "has_boom": ["不带炸弹", "带炸弹"],
            "boom_max": ["3炸", "不限"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
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
        "daye_phz": {
            "max_hand_cnt": { 6: "6局", 12: "12局" },
            "max_player": { 3: "3人局" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
        "shuangkou": {
            "max_hand_cnt": { 5: "5局", 8: "8局" },
            "max_player": { 4: "4人局" },
            "multiple_rate": { 0: "1/2/4", 1: "1/2/3", 2: "0/2/4" },
            "double_bright": ["", "双明玩法"],
            "qi_pai": ["", "弃牌"],
            "base_score": { 0: "1分", 1: "2分", 2: "5分" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },
        "doudizhu": {
            "max_hand_cnt": { 6: "6局", 12: "12局" },
            "max_player": { 3: "3人局" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
        "fuyang_mj": {
            "max_hand_cnt": { 6: "6局", 10: "10局" },
            "max_player": { 2: "2人局" },
            "dianpao": { 0: "2台起(4台起点炮)", 1: "3台起(5台起点炮)" },
            "base_score": { 1: "1分", 2: "2分", 3: "3分"},
            "jiezhuang": { 0: "", 1: "接庄" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
        "hongzhong_mj": {
            "max_hand_cnt": { 6: "6局", 12: "12局" },
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
        "daban":{
            "max_hand_cnt": { 4: "4局",8:"8局" ,12: "12局" },
            "max_player": { 4: "4人局" },
            "xiqian": ["","带喜钱"],
            "shifter": ["癞子单出3", "癞子单出2"],
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"]
        },
        "bull": {
            "max_hand_cnt": { 10: "10局", 20: "20局", 30: "30局"},
            "max_player": { 2: "2人局", 3: "3人局", 4: "4人局", 5: "5人局", 6: "6人局" },
            "button_mode": { 1: "抢庄", 2: "看牌抢庄", 3: "霸王庄" },
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
        "xiantao_mj": {
            "max_hand_cnt": { 6: "6局", 12: "12局", 18: "18局" },
            "max_player": { 3: "3人局", 4: "4人局" },
            "base_score": { 0: "1分", 1: "2分", 2: "5分"},
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        },
        "lingxi_mj":{
            "max_hand_cnt": { 6: "6局", 12: "12局", 18: "18局" },
            "max_player": { 4: "4人局", 3: "3人局", 2:"2人局" },
            "gps": ["", "防作弊"],
            "charge_type": ["房主支付", "AA支付", "俱乐部支付"],
        }
    }

    public static RULE_TITLE_MJ = {
        "1": "玩法",
        "3": "缙云玩法",
        "5": "广式玩法",
        "6": "壶镇玩法",
        "7": "商丘玩法",
        "9": "扑克八张",

    }

    public static GAME_LOGO = {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "3",
        "6": "3",
        "7": "7",
        "8": "8",
        "9": "9",
        "10": "10",
        "11": "11",
        "12": "12",
        "13": "13",
        "14": "14",
        "15": "15",
        "16": "16",
        "17": "17",
        "18": "18",
        "19": "19",
        "20": "20",
        "21": "21",
    }

    /**
     * 游戏背景
     */
    public static GAME_BG = {
        "1": [],
        "2": [],
        "3": [
            "res/bg/mj1.png",
            "res/bg/mj2.png",
            "res/bg/mj3.png",
            "res/bg/mj4.png",
        ],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": [
            "res/bg/mj1.png",
            "res/bg/mj2.png",
            "res/bg/mj3.png",
            "res/bg/mj4.png",
        ],
        "12": [],
        "11": [
            "res/bg/phz1.png",
        ],
        "14": [
            "res/bg/fybg1.png"
        ],
        "15": [
            "res/bg/mj1.png",
            "res/bg/mj2.png",
            "res/bg/mj3.png",
            "res/bg/mj4.png",
        ],
        "16": [
            "res/bg/bg_daban_0.jpg",
            "res/bg/bg_daban_1.jpg",
            "res/bg/bg_daban_2.jpg",
        ],
        "19": [
            "res/bg/bg_daban_0.jpg",
            "res/bg/bg_daban_1.jpg",
            "res/bg/bg_daban_2.jpg",
        ],
        "20": [
            "res/bg/bg_daban_0.jpg",
            "res/bg/bg_daban_1.jpg",
            "res/bg/bg_daban_2.jpg",
        ],
        "21": [
            "res/bg/mj1.png",
            "res/bg/mj2.png",
            "res/bg/mj3.png",
            "res/bg/mj4.png",
        ],
        "22": [
            "res/bg/mj1.png",
            "res/bg/mj2.png",
            "res/bg/mj3.png",
            "res/bg/mj4.png",
        ],
    }

    public static SCORE_BG = {
        "1": "menu/item_bg_0.png",
        "2": "menu/item_bg_2.png",
        "3": "menu/item_bg_0.png",
        "4": "menu/item_bg_1.png",
        "5": "menu/item_bg_0.png",
        "6": "menu/item_bg_0.png",
        "7": "menu/item_bg_0.png",
        "8": "menu/item_bg_2.png",
    }


}