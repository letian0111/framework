/*
 * @author seacole
* WebService;
*/
class WebService {
    constructor() {

    }
    uuid: string;

    /**
	 * 调用API
	 * @param module
	 * @param action
	 * @param callback
	 * @param params
	 * @param method
     * @param type          //0普通接口 1充值接口
	 */
    callApi(module: string, action: string, callback: Function = null, params: any = null, method: string = 'post', header: any[] = [], type: number = 0): void {
        if (!params) {
            params = {};
        }
        let baseUril = GameConfig.WEB_SERVICE_URL
        let m: Function = method == 'post' ? Ajax.POST : Ajax.GET;
        if (type == 1) {
            //调用充值接口
            //baseUril = GameConfig.WEB_SERVICE_RECHARGE_URL

            m = method == 'post' ? Ajax.PHP_POST : Ajax.PHP_GET;
        }
        // params.pf = 4;
        let url: string = baseUril + '/' + module + '/' + action;

        let uid: string = GameLogic.userData.getItem('uid');
        let token: string = GameLogic.userData.getItem('token');
        if (uid)
            header.push("uid", uid);
        if (token)
            header.push("tk", token);
        header.push("os", Native.instance.OS);
        m.call(Ajax, url, params, (content: any) => {
            log('get:' + content);
            if (callback) {
                let response: any = JSON.parse(content);
                if (response && response.hasOwnProperty("code") && response.code == 401) {
                    console.warn("401");
                    Dispatcher.dispatch(EventNames.UNAUTHORIZED);
                }
                else
                    callback(response);
            }
        }, null, header);
    }


    regist(uname: string, upwd: string, nickname: string, callback: Function): void {
        this.callApi('user', 'reg', (response) => {
            callback(response);
        }, { uname, upwd, nickname });
    }


    /**
     * 游客登录
     */
    touristLogin(uuid: string, callback: any): void {
        this.startDelayCall(1);
        this.callApi('user', 'tourist_login', (response) => {
            this.clearDelayCall();
            callback(response);
        }, { uuid });
    }

    /**
     * 通行证登录
     */
    passportLogin(uname: string, upwd: string, callback: any): void {
        this.startDelayCall(1);
        this.callApi('user', 'login', (response) => {
            this.clearDelayCall();
            callback(response);
        }, { uname, upwd });
    }

    /**
     * 微信登录
     */
    loginByWxFromWechat(code, callback): void {
        this.callApi('user', 'wxlogin', (response) => {
            callback(response);
        }, { wxid: GameConfig.WX_APPID, code });
    }

    /**
     * 开房
     */
    createTable(cid: number, type: string, name: string, hand_cnt: string, max_player: string, info: string, callback: any): void {
        this.startDelayCall();
        LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_DELAY, null, null, null, 5000);
        this.callApi('game', 'create', (response) => {
            this.clearDelayCall();
            LoadingUI.instance.hide();
            callback(response);
        }, { cid, type, name, hand_cnt, max_player, info, callback });
    }

    test(cid: number, callback): void {
        LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_DELAY, null, null, null, 5000);
        this.callApi('game', 'create', (response) => {
            LoadingUI.instance.hide();
            callback(response);
        }, { cid, "type": "3", "name": "jinyun_mj", "hand_cnt": 8, "max_player": 4, "info": "{\"max_hand_cnt\":8,\"max_player\":4,\"gps\":0,\"qghu_bao\":0,\"zh4_bao\":0,\"ying_seven\":0,\"xia_zhuang\":0,\"qizi\":0,\"gen_pai\":0,\"charge_type\":0}" });

    }

    test2(cid: number, callback): void {
        LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_DELAY, null, null, null, 5000);
        this.callApi('match', 'create', (response) => {
            LoadingUI.instance.hide();
            callback(response);
        }, { cid, "type": "3", "name": "jinyun_mj", "hand_cnt": "0", "max_player": 4, "info": "{\"max_player\":4,\"qghu_bao\":0,\"zh4_bao\":0,\"ying_seven\":0,\"qizi\":0,\"gen_pai\":0,\"xia_zhuang\":0,\"gps\":0,\"charge_type\":0,\"max_hand_cnt\":8}", "matchrule": "{\"matchmode\":101,\"title\":\"zhc137的比赛\",\"cost\":\"0\",\"starttime\":\"1516083360\"}}" });

    }




    /**
     * 开房
     */
    joinTable(code: string, callback: any): void {
        this.startDelayCall();
        LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_DELAY, null, null, null, 5000);
        this.callApi('game', 'join', (response) => {
            this.clearDelayCall();
            LoadingUI.instance.hide();
            if (response.game_rule) {
                let desc = ""
                let rule = JSON.parse(response.game_rule)
                for (var k in rule) {
                    let v = rule[k]

                    if ((k == "max_hand_cnt" || k == "charge_type" || k == "max_player") && MatchConfig.isMatch(response.game_mode))
                        continue;
                        
                    let splitDes = GameConfig.getShareInfoByGameName(response.game_name)[k][v]
                    if (splitDes && splitDes != "") {
                        desc = desc + splitDes + ","
                    }
                }
                if (desc.length)
                    desc = desc.substr(0, desc.length - 1);
                GameConfig.DESC[response.game_code] = desc
            }
            callback(response);
        }, { code });
    }

    /**
     * 获取人物信息
     */
    getUserInfo(uid: number, callback: any): void {
        var params: any;
        if (GameConfig.pid)
            params = { uid, pid: GameConfig.pid };
        else
            params = { uid }
        this.callApi('user', 'info', (response) => {
            GameConfig.pid = 0;
            if (response.code == 0) {
                RoleManager.addRoleByInfos([response])
            }
            callback(response);
        }, params);
    }

    /**
     * 获取人物信息
     */
    getUserInfos(uids: Array<number>, callback: any): void {
        var params: any;
        this.callApi('user', 'infos', (response) => {
            if (callback)
                if (response.code == 0) {
                    RoleManager.addRoleByInfos(response.data)
                }
            callback(response);
        }, { uids });
    }

    getHistoryList(page: number, limit_day: number = 3, callback: any): void {
        this.callApi('history', 'list', (response) => {
            callback(response);
        }, { page, limit_day });
    }

    getMatchHistoryList(page: number, limit_day: number = 3, callback: any): void {
        this.callApi('history', 'match_list', (response) => {
            callback(response);
        }, { page, limit_day });
    }

    getHistoryProfit(callback): void {
        this.callApi("history", 'profit', (response) => {
            callback(response);
        })
    }

    getHistoryMatch(gid: number, page, gtype: number, title: string, player: number, time: number, rank: number, callback: any): void {
        this.callApi("history", 'item', (response) => {
            callback(response, gid, gtype, title, player, time, rank);
        }, { gid, page, gtype: 1 })
    }

    getHistoryNoraml(gid: number, gtype: number, callback: any): void {
        this.callApi('history', 'item', (response) => {
            callback(response, gid, gtype);
        }, { gid, gtype: 0 });
    }


    getVideoDetail(vid: string, gtype: number, callback: any): void {
        this.callApi('history', 'video', (response) => {
            callback(response, gtype);
        }, { vid }, "get");
    }

    getWxLoginUrl(): string {
        let redirect_uri = GameConfig.GAME_URL + "index.html" + Laya.Browser.window.location.search
        redirect_uri = encodeURIComponent(redirect_uri);
        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + GameConfig.WX_APPID + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_userinfo&state=wx#wechat_redirect";
    }

    getWxConfig(callback: any): void {
        if (!Native.instance.isNative && Native.instance.isWeiXin) {
            this.callApi('config', 'wx-jssdk', (response) => {
                callback(response);
            }, { wxid: GameConfig.WX_APPID, url: encodeURIComponent(Laya.Browser.window.location.href.split('#')[0]) });
        }
    }

    reportor(params: any): void {
        this.callApi('config', 'log', (response) => {
            // callback(response);
        }, params);
    }

    getPrizeList(callback: any): void {
        this.callApi('ticket', 'get_prizelist', (response) => {
            callback(response);
        });
    }

    getPrizeHistory(callback: any): void {
        this.callApi('ticket', 'get_history', (response) => {
            callback(response);
        });
    }

    exchangePrize(prize_id, prize_cnt, callback): void {
        this.callApi('ticket', 'exchange', (response) => {
            callback(response);
        }, { prize_id, prize_cnt});
    }

    lotteryHistory(uid,callback):void{
         this.callApi('activity', 'lottery_history', (response) => {
            callback(response);
        },{uid});
    }

    lotteryList(callback):void{
         this.callApi('activity', 'lottery_list', (response) => {
            callback(response);
        });
    }

    lottery(callback):void{
        this.callApi('activity', 'lottery', (response) => {
            callback(response);
        });
    }

    getTaskList(callback): void{
        this.callApi('task', 'get_tasklist', (response) => {
            callback(response);
        });
    }

    getTaskStatus(callback): void{
        this.callApi('task', 'get_taskdata', (response) => {
            callback(response);
        });
    }

    getTaskPrize(callback): void{
        this.callApi('task', 'get_taskprize', (response) => {
            callback(response);
        });
    }

    lotteryChance(): void{
        this.callApi('activity', 'lottery_chance', (response) => {
        });
    }

    getPhoneCode(phone, callback): void{
        this.callApi('config', 'get_sms', (response) => {
        },{phone, callback});
    }

    bindPhone(phone, code, callback): void{
        this.callApi('user', 'bind_phone', (response) => {
            callback(response)
        },{phone,code, callback});
    }


    // $uid = $this ->_request ->getPost('uid');
    // $os_id = $this ->_request ->getPost('os_id'); //     1android,2ios,,3other
    // $goods_id = $this ->_request ->getPost('goods_id'); //道具ID
    //platform_id    1 应用内支付 ，2 h5支付 。 3 微信SDK支付
    //pid  道具id
    //openid
    rechagre(id: number, cburl: string, callback: any): void {
        let os_id = 3
        if (Native.instance.isIOS) {
            os_id = 2
        }
        if (Native.instance.isAndroid) {
            os_id = 3
        }

        let platform_id
        let _OS = Native.instance.OS
        if (Native.instance.isWeiXin) _OS = OSConfig.WEIXIN
        switch (_OS) {
            case OSConfig.IOS_NATIVE_STORE:
            case OSConfig.ANDROID_NATIVE:
                platform_id = 1
                break;
            case OSConfig.WEIXIN:
                platform_id = 3
                break;
            case OSConfig.IOS_NATIVE_INHOUSE:
                break;
            case OSConfig.IOS_WEB:
            case OSConfig.ANDROID_WEB:
            case OSConfig.OTHERS_WEB:
            case OSConfig.UNKNOWN:
                platform_id = 2
                break;
            default:
                platform_id = 2
                break;
        }
        var use_redirct = 0;
        
        //洪湖,桐江特殊处理
        if (Native.instance.isIOS&&GameConfig.CHANNEL == "honghu" && GameConfig.APP_VER == "1.00") {
            platform_id = 1
            os_id = 3
        }
         if (Native.instance.isIOS&&GameConfig.CHANNEL == "tongjiang" &&(GameConfig.APP_VER == "1.0.0"||GameConfig.APP_VER == "1.00")) {
            platform_id = 1
            os_id = 3
        }

        if(GameConfig.CHANNEL == "juezhan"||GameConfig.CHANNEL == "badao"||GameConfig.CHANNEL == "zhangxin"){
            platform_id = 2;
            use_redirct = 1;
        }
        
        LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_ATONCE, null, null, null, 5000);

        this.callApi('agent/public', 'create_order', (response) => {
            LoadingUI.instance.hide();
            callback(response);
        }, { uid: server.uid, pid: id, openid: server.openid, os_id: os_id, platform_id: platform_id, use_redirct: use_redirct }, 'post', [], 1
            //server.uid
            //1336916
        );


    }

    query(order: string, callback: any): void {
        this.callApi('agent/public/notify', 'query', (response) => {
            callback(response);
        }, { uid: server.uid, order: order }, 'post', [], 1);
    }

    getShopCfg(callback): void {

        let _os = "64"
        if (Native.instance.isIOS) {
            _os = "ios"

            //洪湖,桐江特殊处理
            if ((GameConfig.CHANNEL == "honghu" && GameConfig.APP_VER == "1.00")||(GameConfig.CHANNEL == "tongjiang" && (GameConfig.APP_VER == "1.0.0"||GameConfig.APP_VER == "1.00"))) {
                 _os = "android"
            }else
            {
                 _os = "ios"
            }
        }

        if (Native.instance.isAndroid) {
            _os = "android"
        }
        this.callApi('agent/active/shop', 'list', (response) => {
            callback(response);
        }, { os: _os }, 'post', [], 1);
    }

    checkUpdata(callback): void {
        var flag: boolean;
        var appver: string = NativeHelper.instance.getAppVersion();
        var tmp: Array<string> = appver.split(".");
        if (tmp.length == 3) {
            if (!isNaN(Number(tmp[0])) && !isNaN(Number(tmp[1])) && !isNaN(Number(tmp[2])))
                flag = true;
        }
        if (flag) {
            this.callApi('config', 'update', (response) => {
                callback(response);
            }, { "appver": appver });
        }
        else
            callback({ code: -1 });
    }

    getAnnounce(callback): void {
        this.callApi('config', 'marquee', (response) => {
            callback(response);
        }, {});
    }

    /**
     * 苹果内购下单
     * @param id 
     * @param group_id 
     * @param callback 
     */
    iapOrder(id: number, group_id: number, callback: any): void {
        this.callApi('pay/iap', 'order', (response) => {
            callback(response);
        }, { uid: server.uid, group_id: group_id, goods_id: id });
    }

    protected clearDelayCall(): void {
        Laya.timer.clear(this, this.delayCall);
    }

    protected startDelayCall(type: number = 2): void {
        this.clearDelayCall();
        Laya.timer.once(5000, this, this.delayCall, [type]);
    }

    private delayCall(type: number): void {
        var str: string = "";
        if (type == 1)
            str = "登录失败,请检查网络连接";
        else
            str = "网络连接失败，请重试";
        AlertInGameCtrl.instance.show(str, null, 0, false);
    }

    //领奖
    getMatchReward(uid, gid, callback): void {
        // let  _os = "64"
        // if(GameConfig.IS_IOS_EXAMINE){
        //     _os = "ios"
        // }

        this.callApi('agent/active/sys', 'prize', (response) => {
            callback(response);
        }, { uid: uid, gid: gid }, 'post', [], 1);
    }

    //绑定代理
    bindUser(uid,callback): void{
        this.callApi('user', 'bind', (response) => {
            callback(response);
        }, { bid: uid });
    }

    //检查绑定
    checkBind(callback): void {
        // let  _os = "64"
        // if(GameConfig.IS_IOS_EXAMINE){
        //     _os = "ios"
        // }

        this.callApi('agent/mobile', 'check', (response) => {
            callback(response);
        }, { uid: server.uid }, 'post', [], 1);
    }


    //手机验证码
    mobileCode(mobile, callback): void {
        // let  _os = "64"
        // if(GameConfig.IS_IOS_EXAMINE){
        //     _os = "ios"
        // }

        this.callApi('agent/mobile', 'send', (response) => {
            callback(response);
        }, { mobile: mobile }, 'post', [], 1);
    }

    //绑定手机
    bindMobile(mobile, code, callback): void {
        // let  _os = "64"
        // if(GameConfig.IS_IOS_EXAMINE){
        //     _os = "ios"
        // }

        this.callApi('agent/mobile', 'bind', (response) => {
            callback(response);
        }, { uid: server.uid, mobile: mobile, code: code }, 'post', [], 1);
    }


    //检查身份证
    checkCard(callback): void {
        // let  _os = "64"
        // if(GameConfig.IS_IOS_EXAMINE){
        //     _os = "ios"
        // }

        this.callApi('agent/card', 'check', (response) => {
            callback(response);
        }, { uid: server.uid }, 'post', [], 1);
    }

    //绑定身份证
    cardBind(idCard, realname, callback): void {
        // let  _os = "64"
        // if(GameConfig.IS_IOS_EXAMINE){
        //     _os = "ios"
        // }

        this.callApi('agent/card', 'bind', (response) => {
            callback(response);
        }, { uid: server.uid, idCard: idCard, realname: realname }, 'post', [], 1);
    }

    //分享送钻石
    shareDiamond(callback): void {
        this.callApi('agent/active/share', 'get', (response) => {
            callback(response);
        }, { uid: server.uid }, 'post', [], 1);
    }
    
    // 检查绑定邀请码状态
    checkBindInvite(): void {
        this.callApi('user', 'get_bind_pid', (response) => {
            if (response.code == 0) {
                if (response.pid && response.pid > 0) {
                    Dispatcher.dispatch(EventNames.USER_BIND_SUCC);
                }
                else {
                     Dispatcher.dispatch(EventNames.USER_BIND_FAIL);
                }
            }            
        }, { uid: server.uid });
    }
}
var webService = new WebService();