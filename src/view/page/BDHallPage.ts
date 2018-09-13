/*
* @author seacole
* 大厅界面;
*/

class BDHallPage extends AppPage {

    constructor() {
        super();

        this._loadDatas = this._loadDatas.concat([
            { url: ResourceConfig.SHEET_HH_HALL, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.SHEET_BD_HALL, type: Laya.Loader.ATLAS }, 
            { url: ResourceConfig.SHEET_CREATEROOM, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.BG_BD_HALL, type: Laya.Loader.IMAGE }, 
            { url: ResourceConfig.SHEET_TONGYONG, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.PART_MENU_BG2, type: Laya.Loader.IMAGE },
            { url: ResourceConfig.HISTORY_BG, type: Laya.Loader.IMAGE }, 
            { url: ResourceConfig.CREATE_ROOM_BG, type: Laya.Loader.IMAGE },
            { url: ResourceConfig.HISTORY_LIST_ITEM_BG, type: Laya.Loader.IMAGE },
            { url: ResourceConfig.HISTORY_LIST_DETAIL_BG, type: Laya.Loader.IMAGE },
            { url: ResourceConfig.HISTORY_END_BG, type: Laya.Loader.IMAGE },
            { url: ResourceConfig.SHEET_HISTORY_JSON, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.SHEET_SHARE_JSON, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.SHEET_CLUB, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.SHEET_CLUB_BUTTON, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.SHEET_CLUB_IMG, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.SHEET_CLUB_PANEL, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.SHEET_CLUB_ACTIVITY, type: Laya.Loader.ATLAS },
            { url: ResourceConfig.BG_DABAN_0, type: Laya.Loader.IMAGE },
            { url: ResourceConfig.BG_CLUB, type: Laya.Loader.IMAGE },
        ], { url: ResourceConfig.SHEET_COMMON, type: Laya.Loader.ATLAS });

        let games = GameDef.currentGames
       

        AppPage.register(BDHallPage, this._loadDatas);
        this.name = "BDHallPage";
        this.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.bgColor = "#000000";
        Dispatcher.on("show_share", this, this.showShare.bind(this));
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.USER_BIND_FAIL, this, this.onShowTopBtns);
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.USER_BIND_SUCC, this, this.onHideTopBtns);
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.UPDATE_MY_CLUB_LIST, this, this.onUpdateClubList);
    }

    private _menuUi
    private _hallTopUI: HHHallTopUI;

    private _tabFind: MenuFindUI;
    private _tabScore: MenuScoreUI;
    private _tabPerson: MenuPersonUI;
    private _tabs: Array<Laya.View>;
    private _clubList: club.ClubHallList
    private _paomadengLabel
    private _scale
    protected createChild(): void {
        super.createChild();
    }

    public destroy(): void {
        super.destroy();
        if (this._tabs) {
            for (var i: number = 0; i < this._tabs.length; i++) {
                if (this._tabs[i])
                    this._tabs[i]["removeListener"]();
            }
        }
        AnnounceManager.instance.stop();
        Laya.timer.clear(this, this.catlikeLoad);
        Laya.timer.clear(this, this.refreshInfo);
        this.stopTimer();
    }

    public getHallModel() {
        return ui.page.BaDaoHallUI
    }

    public getTopModel() {
        return HHHallTopUI
    }

    protected init(...params): void {
        super.init();
        AppControl.getInstance().AppStage.registUnauthorized();
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        // AppControl.getInstance().stage.width = 640;
        if (!this._menuUi) {
            let hallModel = this.getHallModel()
            this._menuUi = new hallModel;

            let topModel =  this.getTopModel()
            this._hallTopUI = new topModel();
            this._menuUi.addChild(this._hallTopUI);
            //this._hallTopUI.zOrder = 2
            this._hallTopUI.left = 0;
            this._hallTopUI.top = 0;


            //添加点击事件
            for (var i: number = 0; i < this._menuUi._bottomUI.numChildren; i++) {
                let child = this._menuUi._bottomUI.getChildAt(i);
                EventManager.instance.registerOnObject(this, child, Laya.Event.CLICK, this, this.onTouch);

            }
            let time = localStorage.getItem("share_"+server.uid)
            if (TimeUtils.isToday(parseInt(time))){
                this._menuUi._share.visible = false
            }else{
                this._menuUi._share.visible = false
                ShareDailyCtrl.instance.show()
            }
            // EventManager.instance.registerOnObject(this, this._menuUi._btnRank, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._menuUi._btnCreateRoom, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._menuUi._btnJoinRoom, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._menuUi._btnCreateClub, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._menuUi._btnJoinClub, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._menuUi._btnBangding, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._menuUi._btnNotice, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, this._menuUi._btnShare, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, "hideshare", this, this.hideShareDiamond);
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.MATCH_START_WARN, this, this.onMatchWarn);
            EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_CREATE_SUCC, this, this.onCreateClubSucc);

            Native.instance.deepLinkCallback();
        }
        this.onHideTopBtns()
        if (!Native.instance.isNative) {
            WxWeb.instance.onShare()
        }
        this._menuUi.addChild()

        this.addView(this._menuUi);
         
        this.initClub()
        if (!GameConfig.IS_IOS_EXAMINE) {
            this.initPaoMaDeng();
        }
        else {
            this._menuUi._labaBg.visible = false
            this._menuUi._label_match.text = "竞技场"
            this._menuUi._label_redbag.text = "红包场"
            // this._menuUi._btnRank.visible = false


            this._menuUi._btnActivity.visible =false
            this._menuUi._btnKefu.visible =false
            this._menuUi._btnShare.visible =false
            this._menuUi._btnClub.visible =false


            this._menuUi._flag.visible = false

            this._menuUi._btnRecord.x =1011
            this._menuUi._btnSet.x    =1158

            this._menuUi._btnShop.x =152
        }



        webService.checkBindInvite()
        Native.instance.checkNewVer();
        AnnounceManager.instance.start();

        if (matchSign.MatchSignData.backCode) {
            webService.joinTable(String(matchSign.MatchSignData.backCode), (response: any) => {
                if (response.code == 0) {
                    GameConfig.setServerUrl(response.ip);
                    GameConfig.joinTable(response);
                }
            });
        }

        if (params && params.length && params[0].match_code) {
            matchSign.MatchSignInfoCtrl.instance.show(params[0].match_code);
        }
        else if (params && params.length && params[0].room_code) {
            LoginManager.instance.checkJoinTable();
        }
        //比赛出来的返回到比赛列表
        else if (GameConfig.IS_MATCH) {
            matchSign.MatchSignCtrl.instance.show();
        }
        else
            this.getMatchList();
    }

    protected hideShareDiamond(){
        this._menuUi._share.visible = false
    }
    protected initPaoMaDeng() {

        //Laya.timer.loop(5000, this, function () {
        if (!this._paomadengLabel) {
            this._paomadengLabel = new Laya.Label()

            this._paomadengLabel.text = "游戏合伙人火爆招募中，详情请咨询官方客服微信："+GameConfig.KEFU
            this._paomadengLabel.fontSize = 30
            this._paomadengLabel.color = "#ffffff"
            this._paomadengLabel.font = "Microsoft YaHei"


            this._menuUi._mask.addChild(this._paomadengLabel)
            this._paomadengLabel.centerX = 800
            this._paomadengLabel.centerY = 0

            Laya.Tween.to(this._paomadengLabel, { centerX: -800, centerY: 0 }, 15000, null, Laya.Handler.create(this, this.onTween1))

        }

        //})
    }
    private onTween1(): void {
        // TODO Auto Generated method stub
        // num++;
        // trace(num);
        this._paomadengLabel.centerX = 800,
            this._paomadengLabel.centerY = 0
        Laya.Tween.clearTween(this.onTween1);
        Laya.Tween.to(this._paomadengLabel, { centerX: -800, centerY: 0 }, 15000, null, Laya.Handler.create(this, this.onTween2));
    }

    private onTween2(): void {
        // TODO Auto Generated method stub
        this._paomadengLabel.centerX = 800,
            this._paomadengLabel.centerY = 0
        Laya.Tween.clearTween(this.onTween2);
        Laya.Tween.to(this._paomadengLabel, { centerX: -800, centerY: 0 }, 15000, null, Laya.Handler.create(this, this.onTween1));
    }

    protected initTabs() {
        this._curretnSelectIdx = 0
        this._tabFind = new MenuFindUI();
        this._tabScore = new MenuScoreUI();
        this._tabPerson = new MenuPersonUI();

        this._menuUi.addChild(this._tabPerson);
        this._menuUi.addChild(this._tabScore);
        this._menuUi.addChild(this._tabFind);

        // this._tabPerson.zOrder = 1
        // this._tabScore.zOrder = 1
        // this._tabFind.zOrder = 1
        this._tabPerson.visible = false
        this._tabScore.visible = false
        this._tabFind.visible = false


        // this._menuUi.addChildAt(this._tabLobby, 2);
        // this._tabs = [this._tabLobby, this._tabFind, this._tabScore,this._tabPerson];
        this._tabs = [this._tabFind, null, this._tabScore, this._tabPerson];
        // EventManager.instance.registerOnObject(this, this._menuUi._btnDdz, Laya.Event.CLICK, this, this.onTouch);
        // EventManager.instance.registerOnObject(this, this._menuUi._btnMj, Laya.Event.CLICK, this, this.onTouch);
        // EventManager.instance.registerOnObject(this, this._menuUi._btnJoin, Laya.Event.CLICK, this, this.onTouch);
        Native.instance.deepLinkCallback();
        this.checkTab()
    }


    protected layoutChild(): void {
        super.layoutChild();
        SoundManager.instance.playBg("bg1");

        Laya.timer.once(5000, this, this.catlikeLoad);
        
        Laya.timer.frameOnce(3, this, this.refreshInfo);

    }

    private refreshInfo(): void {
        // GameLogic.selfData.getInfo(true);
        GameLogic.selfData.startQuery();
        //获取个人信息，刷新信息
        GameLogic.selfData.getInfo(true);
    }

    public loadRes(key: string, ...params): void {
        this.playBgm();
        this.initParams = params[0];
        if (AppPage._loadData[key]) {
            if (PreLoadingUI.instance.parent)
                PreLoadingUI.instance.show(AppPage._loadData[key], this, this.loadComplete);
            else
                LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_DELAY, AppPage._loadData[key], this, this.loadComplete);
        }
        else
            this.loadComplete();
    }

    protected loadComplete(): void {
        AppControl.getInstance().AppStage.clear();
        AppControl.getInstance().screenMode = this.screenMode;
        this.addToStage.apply(this, this.initParams);
        this.updateDisplayObjectList();
        PreLoadingUI.instance.hide();
        LoadingUI.instance.hide();
    }

    protected onResize(): void {
        // if (Laya.stage.width / Laya.stage.height < 8 / 5) {
        //         //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        //          AppControl.getInstance().stage.width = 1280
        // }
     

        this.setTabPos();
        // this._tabLobby.width = AppControl.getInstance().stage.width;

        if (!this._scale || Laya.stage.width / Laya.stage.height != this._scale) {
            if (!this._scale)
                this._scale = Laya.stage.width / Laya.stage.height
            if (Laya.stage.width / Laya.stage.height < 1280 / 720) {
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
               
                AppControl.getInstance().stage.width = 1280;

            } else {
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
                AppControl.getInstance().stage.height = 720;

            }
            this._scale = Laya.stage.width / Laya.stage.height;
            Laya.stage.setScreenSize(Laya.Browser.clientWidth * Laya.Browser.pixelRatio, Laya.Browser.clientHeight * Laya.Browser.pixelRatio);
        }
        this._menuUi.height = AppControl.getInstance().stage.height;
        this._menuUi.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
        this._menuUi.centerX = AppControl.getInstance().stage.width > 1280 ? 1 : 0
        AppControl.getInstance().resetScreen();
    }

    //左右各留50. tab的宽度为屏幕宽度，最大为640，居中显示
    private setTabPos(): void {


    }
    /**
    * 鼠标点击事件
    */
    templet: Laya.Templet;
    private onTouch(e: Laya.Event) {
        switch (e.currentTarget) {
            /*****************************/
            //下方按钮
            case this._menuUi._btnShop:
                //商城
                log("商城");
                ShopCtrl.instance.show();
                break;
            case this._menuUi._btnActivity:
                //活动
                log("活动");
                //测试骨骼动画
                //     SkeletonAniManager.instance.playSkeletonAni(Laya.stage,"res/skeletonAni/kaishi.sk",false,0,{x:600,y:350},function(){
                //     log("动画播放了")
                // })
                AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false)
                break;
            case this._menuUi._btnClub:
                //俱乐部
                log("俱乐部");
                AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false)
                break;
            case this._menuUi._btnRecord:
                //战绩
                log("战绩");
                this.showHistory();
                break;
            case this._menuUi._btnKefu:
                //客服
                if (GameConfig.IS_IOS_EXAMINE) {
                    AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false)
                    return
                }
                log("客服");
                KeFuCtrl.instance.show("本游戏仅供休闲娱乐使用，游戏中有任何问题请联系客服微信<br>微信号："+GameConfig.KEFU)
                break;
            case this._menuUi._btnSet:
                //设置
                log("设置");
                SetupCtrl.instance.show(true)
                break;
            case this._menuUi._btnShare:
                //分享
                if (GameConfig.IS_IOS_EXAMINE) {
                    AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false)
                    return
                }
                log("分享");
                Dispatcher.dispatch("show_share");
                break;
            /*****************************/
            //左侧按钮
            // case this._menuUi._btnRank:
            //     //排行榜
            //     log("排行榜");
            //     AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false)
            //     break;
            /*****************************/
            //中间按钮
            case this._menuUi._btnCreateRoom:
                //创建房间
                log("创建房间");
                this.createRoom();
                break;
            case this._menuUi._btnJoinRoom:
                //加入房间
                log("加入房间");
                this.join();
                break;
             case this._menuUi._btnCreateClub:
                //创建俱乐部
                log("创建俱乐部");
                // AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false)
                this.createClub();
                // this.clubtest()
                break;
            case this._menuUi._btnJoinClub:
                //加入俱乐部
                log("加入俱乐部");
                this.joinClub();
                break;
            case this._menuUi._btnMatch:
                //竞技场即比赛场
                log("比赛场");
                matchSign.MatchSignCtrl.instance.show();
                break;
            case this._menuUi._btnBangding:
                //绑定
                log("绑定");
                BindInviteCtrl.instance.show();
                // if (GameConfig.IS_IOS_EXAMINE)
                // {
                //     matchSign.MatchSignCtrl.instance.show();
                //     return
                // }
                // AlertInGameCtrl.instance.show(GameConfig.language.common_tip_unopen, null, 0, false)
                
                break;
            case this._menuUi._btnNotice:
                //绑定
                log("通知");
                log(GameConfig.language.bd_notice.length)
                AlertInGameSmallCtrl.instance.show(GameConfig.language.bd_notice, null, 0, false)
                break;
        }

    }

    private showShare() {
        ShareDlalog.instance.show()
    }

    private _curretnSelectIdx: number;


    private catlikeLoad(): void {
        Laya.loader.load([{ url: ResourceConfig.SHEET_CREATE_TABLE, type: Laya.Loader.ATLAS }, { url: ResourceConfig.SHEET_GAME_END, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_CHAT, type: Laya.Loader.ATLAS }, { url: ResourceConfig.SHEET_SETUP, type: Laya.Loader.ATLAS }]);
    }

    private getMatchList(): void {
        matchSign.MatchSignData.getMatchList();
        this.startTimer();
    }

    private startTimer(): void {
        this.stopTimer();
        Laya.timer.loop(10 * 1000, this, this.onTimer);
    }

    private stopTimer(): void {
        Laya.timer.clear(this, this.onTimer);
    }

    private onTimer(): void {
        if (!matchSign.MatchSignInfoCtrl.instance.parent && !matchSign.MatchSignCtrl.instance.parent)
            matchSign.MatchSignData.getStatus();
        club.ClubManager.getMyClub()
    }

    private onMatchWarn(match: any, type: number): void {
        if (!matchSign.MatchSignInfoCtrl.instance.parent) {
            if (!matchSign.MatchSignData._matchWarn[type][match.code]) {

                matchSign.MatchSignData._matchWarn[type][match.code] = true;
                AlertInGameCtrl.instance.show(StringUtils.format(GameConfig.language.match_start_warn[type], match.mrule.title), (value: number) => {
                    if (value == AlertCtrl.CONFIRM) {
                        webService.joinTable(String(match.code), (response: any) => {
                            if (response.code == 0) {
                                GameConfig.setServerUrl(response.ip);
                                GameConfig.joinTable(response);
                            }
                        });
                    }
                }, 0, true, "提示", null, ["tongyong/tongyong_btn_qianwang.png"]);
            }
        }
    }

    //创建房间
    private createRoom(): void {
        CreateRoomCtrl.instance.show();
    }
    //加入房间
    private join(): void {
        if (GameLogic.selfData.game_code > 0) {
            webService.joinTable(String(GameLogic.selfData.game_code), (response: any) => {
                if (response.code == 0) {
                    // this._ui._labRoom.focus = false;
                    GameConfig.setServerUrl(response.ip);
                    GameConfig.joinTable(response)
                }
                else {
                    GameLogic.selfData.game_code = 0
                    this.onRefreshRoleInfo();
                    AlertInGameCtrl.instance.show(GameConfig.language.join_fail, null, 0, false);
                    GameLogic.selfData.getInfo(true);
                }
            });
        } else {
            JoinTableCtrl.instance.show();
        }
    }
    private onRefreshRoleInfo(): void {

    }

    //创建俱乐部
    private createClub(): void {
        if (club.ClubManager.isClubFull()) {
            var str: string = GameConfig.language.club_web_error_code[1204];
            if (str) {
                AlertInGameCtrl.instance.show(str, null, 0, false);
            }
        }
        else if (GameLogic.selfData.diamond && GameLogic.selfData.diamond >=100) {
            club.ClubCreate.instance.show();
        }
        else {
            AlertInGameCtrl.instance.show(GameConfig.language.club_create_limit , null, 0, false);
        }
            
    }
    //加入俱乐部
    private joinClub(): void { 
        club.ClubJoin.instance.show();  
    }

    /**
     * 战绩
     */
    private showHistory(): void {
        if (!this._tabScore)
            this.initTabs()
        this._curretnSelectIdx = 2
        this._tabScore.clearLastInfo();
        this.checkTab();
    }


    private checkTab() {
        // if (this._curretnSelectIdx==this._menuUi._tab.selectedIndex)
        //     return;
        // this._curretnSelectIdx = this._menuUi._tab.selectedIndex;
        if (this._tabs[this._curretnSelectIdx] == this._tabScore)
            this._tabScore.getFirstPage();


        //this._tabLobby.visible = selectIdx == 0;
        //let toCenterX = this._menuUi["_item" + this._curretnSelectIdx].centerX
        this._tabFind.visible = this._curretnSelectIdx == 0;
        this._tabScore.visible = this._curretnSelectIdx == 2;
        this._tabPerson.visible = this._curretnSelectIdx == 3;
        if (this._tabScore.visible)
            this._tabScore.currentTag = MenuScoreUI.TAG_LIST;
        if (this._curretnSelectIdx == 1)
            club.ClubCtrl.instance.show(this._menuUi);
        else
            club.ClubCtrl.instance.hide();
    }
    // 俱乐部信息
    protected initClub() {
        if (!this._clubList) {
            this._clubList = new club.ClubHallList()
            this._menuUi._club.addChild(this._clubList)
        }
        //  club.ClubCtrl.instance.show(this._menuUi)
        this._clubList.show(this._menuUi)       
    }
    protected onUpdateClubList(){
        if (!this._clubList) {
            return
        }
        this._clubList.onUpdateClubList()
    }

    protected onCreateClubSucc(cid) {
        club.ClubCtrl.instance.show(this._menuUi, cid);
    }

    // 绑定成功后 右上角图标位置修改
    protected onShowTopBtns() {
        this._menuUi._btnNotice.right = 72
        this._menuUi._btnShare.right = 172
        this._menuUi._btnBangding.visible = true
    }

     protected onHideTopBtns() {
         this._menuUi._btnNotice.right = 100
        this._menuUi._btnShare.right = 220
        this._menuUi._btnBangding.visible = false
    }
}