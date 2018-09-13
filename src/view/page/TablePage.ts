/*
* @author seacole
* 游戏界面基础类 所有共有数据在这里处理，具体UI控制和独有数据每个游戏各自处理;
*/
class TablePage extends AppPage {
    constructor() {
        super();
        this._loadDatas = this._loadDatas.concat([{ url: ResourceConfig.SHEET_TONGYONG, type: Laya.Loader.ATLAS }, { url: ResourceConfig.SHEET_GAME_NAME, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_TABLE, type: Laya.Loader.ATLAS }, { url: ResourceConfig.SHEET_GAME_LOGO, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_CHAT, type: Laya.Loader.ATLAS }, { url: ResourceConfig.BG_TABLE, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.BITMAP_FONT_WAKENG1_JSON, type: Laya.Loader.JSON }, { url: ResourceConfig.BITMAP_FONT_WAKENG1_PNG, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.SHEET_PLAY_SHEET, type: Laya.Loader.ATLAS }, { url: ResourceConfig.SHEET_DIALOG, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.BITMAP_FONT_MENU1_JSON, type: Laya.Loader.JSON }, { url: ResourceConfig.BITMAP_FONT_MENU1_PNG, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.BITMAP_FONT_MENU2_JSON, type: Laya.Loader.JSON }, { url: ResourceConfig.BITMAP_FONT_MENU2_PNG, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.SHEET_COMMON, type: Laya.Loader.ATLAS },

        { url: ResourceConfig.IMG_FUFENG, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.IMG_ZHENGFEN, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.SHEET_GPS, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.GPS_BG, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.SHEET_FENSHU_FNT, type: Laya.Loader.JSON }, { url: ResourceConfig.SHEET_FENSHU, type: Laya.Loader.IMAGE },
        { url: ResourceConfig.SHEET_CHAT, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_1, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_2, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_3, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_4, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_5, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_6, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_7, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_RULEVIEW_MJ, type: Laya.Loader.ATLAS },
        { url: ResourceConfig.SHEET_EMOJI_8, type: Laya.Loader.ATLAS }]);
        if (GameConfig.IS_BANSHU)
            this._loadDatas = this._loadDatas.concat([{ url: ResourceConfig.SHEET_BANSHU, type: Laya.Loader.ATLAS }]);
        this.name = "TablePage";
        this.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.bgColor = "#000000";
        DialogManager.instance.addDialog("GPS_TIP", BaseGpsTip)
    }

    protected _table: ui.page.TablePageUI;
    protected _tablePop: ui.components.table.TablePopUI;
    protected _playerUis: Array<PlayerInGameUI>;
    protected _recordUI: RecordUI;
    protected _menu: TableMenuUI;
    private _netSignalUI: NetSignalUI;
    private _batteryUI: BatteryUI;
    private _isWxRecordSend: boolean;
    private _isWxRecording: boolean;
    private _sheetData: any;
    private _fontData1Roomid: FontData;//房号
    private _bitMapFontRoomid: BPFont;//倍数
    private _voteNtfmsg                //暂存解散房间信息
    protected _tableInfoView: MJTableInfoView
    protected _ruleView: MJRuleInfoView;

    //protected _tableInfo: ui.components.table.TableInfoUI
    protected createChild(): void {
        super.createChild();
        PreLoadingUI.instance.hide();
    }
    public destroy(): void {
        EventManager.instance.clearEvents(this);
        super.destroy();
        //重置chat_pos
        GameDef.CHAT_POS = [
            [],
            [2, 2],
            [2, 1, 2],
            [2, 1, 2, 2],
        ]
        if (BaseGameData.isRecord != 1 && !GameConfig.IS_BANSHU && !GameConfig.IS_MATCH) {
            NativeHelper.instance.voiceQuitRoom(BaseGameData.voiceRoomName, function (result) {

            })
        }
        RealTimeSpeechManager.instance.off(EventNames.REALTIME_MIC, this, this.onMic);
        RealTimeSpeechManager.instance.off(EventNames.REALTIME_SPEAKER, this, this.onSpeaker);
        server.stopCache();
        this.clearData();
        SoundManager.instance.stopMusic();
        this._menu.removeListener();
        BaseGameData.gameType = "";
        BaseGameData.isVoiceJoined = false;
    }

    protected init(...params): void {
        AppControl.getInstance().AppStage.registUnauthorized();
        super.init.apply(this, params);
        var i: number;
        if (!this._table) {
            this._table = new ui.page.TablePageUI();
            this._tablePop = new ui.components.table.TablePopUI();
            this._netSignalUI = new NetSignalUI();
            this._netSignalUI.y = 10;

            //暂时隐藏
            this._netSignalUI.visible = false


            this._tablePop.addChild(this._netSignalUI);


            this._batteryUI = new BatteryUI();
            this._batteryUI.y = 15;
            this._batteryUI.visible = false;
            if (Native.instance.isNative)
                this._tablePop.addChild(this._batteryUI);
            this._recordUI = new RecordUI();
            this._menu = new TableMenuUI();
            // Utils.injectProp(this._menu, BaseGameData.tablelayout.MENU_CONTENT_LAYOUT)


            this._sheetData = null;
            this._tablePop._btnTest.visible = GameConfig.IS_TEST;

            this._tablePop._btnTest.right = 28
            this._tablePop._btnTest.bottom = 100


            //返回大厅，查看战绩

            this._tablePop._btnCheckResult.visible = false

            //倍数美术字
            // this._fontData1Roomid = new FontData();
            // this._fontData1Roomid.init(FontConfig.FONT_WAKENG_1, Laya.loader.getRes(ResourceConfig.BITMAP_FONT_WAKENG1_JSON),
            //     Laya.loader.getRes(ResourceConfig.BITMAP_FONT_WAKENG1_PNG), 50, BPFont.LEFT);
            // this._bitMapFontRoomid = FontManager.instance.addFont(this._fontData1Roomid);
            // this._tablePop._inviteUI.addChild(this._bitMapFontRoomid);
            // this._bitMapFontRoomid.pos(140, 103);
            // this._bitMapFontRoomid.text = "";





        }
        if (GameConfig.IS_BANSHU) {
            this._menu._btnChat.visible = false;
            this._tablePop._inviteUI.removeSelf();
            this._tablePop._btnZBKS.centerX = 0
        }
        this._menu._btnChat.right = 28
        if (GameConfig.IS_MATCH) {
            this._menu._btnChat.visible = false;
            this._menu._checkBox_laba.visible = false;
            this._menu._checkBox_huatong.visible = false;
        }
        if (!Native.instance.isNative) {
            this._menu._checkBox_laba.visible = false;
            this._menu._checkBox_huatong.visible = false;
        }

        //强制关闭听筒话筒 
        // if (1) {

        //     this._menu._checkBox_laba.visible = false;
        //     this._menu._checkBox_huatong.visible = false;

        //     if (Native.instance.isNative) {
        //         RealTimeSpeechManager.instance.closeMic();
        //         RealTimeSpeechManager.instance.closeSpeaker();
        //         if (this._tablePop._aniTip) {
        //             this._tablePop._aniTip.ani1.stop();
        //             this._tablePop._aniTip.removeSelf();
        //         }
        //     }
        // }


        if (this._tablePop._aniTip) {
            this._tablePop._aniTip.visible = false;
        }
        //this._tablePop._aniTip.visible = false;
        this._tablePop._tuoguan.visible = false;

        this._tablePop.bottom = NaN
        this._tablePop.centerY = 0
        this._table.bottom = NaN
        this._table.centerY = 0
        this.addView(this._table);
        this.addView(this._tablePop);
        this._tablePop.addChild(this._menu);
        this.addView(DialogManager.instance)
        DialogManager.instance.mouseThrough = true;
        this._tablePop.mouseThrough = true;
        this._menu.addListener();
        this._menu._box.visible = false;
        // this._tablePop._btnMicrophone.visible = Native.instance.isWeiXin;
        Utils.injectProp(this._menu, BaseGameData.tablelayout.MENU_CONTENT_LAYOUT)
        Utils.injectProp(this._menu._checkBox_laba, BaseGameData.tablelayout.PLAY_SOUND_LAYOUT)
        Utils.injectProp(this._menu._checkBox_huatong, BaseGameData.tablelayout.SSYY_LAYOUT)
        Utils.injectProp(this._menu._btnMenu, BaseGameData.tablelayout.MENU_LAYOUT)
        // Utils.injectProp(this._menu._btnRestart, BaseGameData.tablelayout.MENU_LAYOUT)
        Utils.injectProp(this._menu._btnChat, BaseGameData.tablelayout.CHAT_LAYOUT)
        // Utils.injectProp(this._menu._btnMicrophone, BaseGameData.tablelayout.MENU_LAYOUT)
        Utils.injectProp(this._tablePop._aniTip, BaseGameData.tablelayout.SSYY_TIP_LAYOUT)
        Utils.injectProp(this._table._bg, BaseGameData.tablelayout.BG_LAYOUT)
        Utils.injectProp(this._table._logo, BaseGameData.tablelayout.LOGO_LAYOUT)

        if (GameConfig.IS_BANSHU)
            this._table._logo.source = Laya.Loader.getRes("banshu/gameLogo_" + BaseGameData.gameType + ".png");
        else
            this._table._logo.source = Laya.Loader.getRes("gameLogo/" + GameDef.GAME_LOGO[BaseGameData.gameType] + ".png");
        this._netSignalUI.onNetChange();
        this.clearData();
        // 1是否是录像 2gametype 3录像2进制文件        
        var isVideo: boolean = params.length && params[0] == 1;
        if (isVideo) {
            BaseGameData.isRecord = 1
            BaseGameData.gameType = params[1]
            this._sheetData = params[2]

        } else {
            if (!GameConfig.IS_BANSHU && !GameConfig.IS_MATCH) {
                RealTimeSpeechManager.instance.on(EventNames.REALTIME_MIC, this, this.onMic);
                RealTimeSpeechManager.instance.on(EventNames.REALTIME_SPEAKER, this, this.onSpeaker);
                NativeHelper.instance.voiceJoinRoom(BaseGameData.voiceRoomName, function (response) {
                    if (response.result == 1) { // GV_ON_JOINROOM_SUCC
                        BaseGameData.voiceMemberID = response.memberID;
                        if (BaseGameData.selfSeatid)
                            server.tableDataReq(1, BaseGameData.voiceMemberID);
                        BaseGameData.isVoiceJoined = true;
                        if (BaseGameData.selfSeatid)
                            RealTimeSpeechManager.instance.setMic();
                        else
                            RealTimeSpeechManager.instance.passiveCloseMic();
                        RealTimeSpeechManager.instance.setSpeaker();
                        Native.instance.voiceMemberVoiceCallback();
                        // NativeHelper.instance.voiceOpenMic();
                    }
                });
            }
        }
        this._tablePop.visible = BaseGameData.isRecord > 0 ? false : true
        DialogManager.instance.addDialog("PLAYER_INFO", PlayerInfoDialog)
        Laya.Browser.document.addEventListener("visibilitychange", function () {
            if (!TableEndCtrl.instance.parent && !TableEndShuCtrl.instance.parent && !DialogManager.instance.hasDialog("MATCH_OVER") &&
                !DialogManager.instance.hasDialog("MATCH_OUT_WIN") && !DialogManager.instance.hasDialog("MATCH_OUT_LOSE")) {
                if (GameConfig.IS_TEST) {

                }
                else {
                    server.reconnect()
                }
                //console.log(Laya.Browser.document.hidden);
            }
            // Modify behavior...
        });
    }

    protected initEvent(): void {
        EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.CLICK, this, this.onStageTouch);
        EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.MOUSE_UP, this, this.onStageTouch);
        EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.MOUSE_OUT, this, this.onStageTouch);
        //EventManager.instance.registerOnObject(this, this._menu._btnRestart, Laya.Event.MOUSE_DOWN, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._menu._btnMicrophone, Laya.Event.MOUSE_DOWN, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._tablePop._btnBack, Laya.Event.MOUSE_DOWN, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._tablePop._btnEnd, Laya.Event.MOUSE_DOWN, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._menu._btnChat, Laya.Event.MOUSE_DOWN, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._tablePop._btnTest, Laya.Event.MOUSE_DOWN, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._tablePop._btnRealTime, Laya.Event.CLICK, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._tablePop._inviteUI._btnInvite, Laya.Event.CLICK, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._menu._btnMatchRecord, Laya.Event.CLICK, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._menu._checkBox_huatong, Laya.Event.CLICK, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._menu._checkBox_laba, Laya.Event.CLICK, this, this.onBtnTouch);
        EventManager.instance.registerOnObject(this, this._tablePop._tuoguan, Laya.Event.CLICK, this, this.onBtnTouch);

        EventManager.instance.registerOnObject(this, this._tablePop._btnCheckResult, Laya.Event.CLICK, this, this.onBtnTouch);


        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.PLAY_RECORD, this, this.onPlayRecord);
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.PLAY_RECORD_END, this, this.stopChatVisiter);
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.VOICE_CHANGE, this, this.onVoiceChange);
        EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.PLAYER_DATA_COMPLETED, this, this.onPlayerInfoComleted);


        EventManager.instance.registerOnObject(this, server, EventNames.CONNECT_SERVER, this, this.onConnectToServer);
        EventManager.instance.registerOnObject(this, server, EventNames.SERVER_ERROR, this, this.onServerError);
        EventManager.instance.registerOnObject(this, server, EventNames.SHOW_DISCONNECT, this, this.onDisconnectServer);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_TABLE_INFO_NTF, this, this.onTableInfoNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_SITDOWN_REP, this, this.onSitdownRepHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_SITDOWN_NTF, this, this.onSitdownNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_STANDUP_REP, this, this.onStandupRepHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_STANDUP_NTF, this, this.onStandupNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_START_TABLE_REP, this, this.onStartTableRepHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_START_TABLE_NTF, this, this.onStartTableNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_TABLE_WILL_END_NTF, this, this.onTableWillEndNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_PLAYER_READY_REP, this, this.onPlayerReadyRepHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_PLAYER_READY_NTF, this, this.onPlayerReadyNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_EMOTICON_NTF, this, this.onEmoticonNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_USE_GOODS_REP, this, this.onUseGoodsRepHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_USE_GOODS_NTF, this, this.onUseGoodsNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_GAME_START_NTF, this, this.onGameStartNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_REAL_TIME_RECORD_REP, this, this.onRealTimeRecordRepHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_OFFLINE_NTF, this, this.onOfflineNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_PlAYER_TABLE_STATUS_NTF, this, this.onPlayerTableStatusNtfHandler)
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_PLAYER_CHAT_NTF, this, this.onPlayerChatNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_VOTE_REP, this, this.onVoteRepHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_VOTE_NTF, this, this.onVoteNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_TABLE_END_NTF, this, this.onTableEndNtfHandler);
        EventManager.instance.registerOnObject(this, server, EventNames.GAME_TABLE_DATA_NTF, this, this.onTableDataNtfHandler);
        // EventManager.instance.registerOnObject(this, server, EventNames.GAME_RECONNECT_INFO, this, this.onReconnectInfoHandler);
        // EventManager.instance.registerOnObject(this, server, EventNames.GAME_SHOW_INFO_NTF, this, this.onShowInfoNtfHandler);
        Dispatcher.on(EventNames.CHECK_READY, this, this.checkNextBtn)
        this._table.on(Laya.Event.CLICK, this, () => { this.hideChatDialog(); })


        this._menu._checkBox_laba.on("change", this, this.updateRevVoice, [this._menu._checkBox_laba]);
    }
    protected updateRevVoice(checkbox_laba) {
        if (checkbox_laba.selected == true) {
            //打开接收语音
        }
        else {
            //关闭接收语音
        }
    }
    protected layoutChild(): void {
        super.layoutChild();
        SoundManager.instance.playBg("bg1");
        if (this._playerUis) {
            for (var i = 1; i < this._playerUis.length; i++) {
                this._playerUis[i].clear();
                this._playerUis[i].removeSelf()
            }
            this._playerUis = null
        }
        if (!BaseGameData.isRecord && !GameConfig.IS_MATCH) {
            LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_ATONCE);
            server.connect();
        }

        if (GameConfig.IS_MATCH)
            server.joinMatchReq()
        if (GameConfig.IS_MATCH) {
            this._menu._btnMatchRecord.visible = true
            Utils.injectProp(this._tablePop._btnMatchRecord, BaseGameData.tablelayout.MATCH_RECORD_LAYOUT)

        } else {
            this._menu._btnMatchRecord.visible = false
        }
        this.removeSeatViews()
        this.initSeatViews()
        // this._tablePop._tuoguan.visible = false
        // this.this.NtfHandler({ "tableid": "16973", "maxPlayer": 4 });
        // this.onPlayerInfoNtfHandler({ "uid": 1002, "seatid": 3, "status": 1 });
        // this.onGameInfoNtfHandler({ "totalHandCount": 8, "baseScore": 1 });
        // this.onSitdownNtfHandler({ "uid": 1004, "seatid": 2 });
        // this.onPlayerReadyNtfHandler({ "seatid": 2 });
        //  this.onSitdownNtfHandler({ "uid": 1003, "seatid": 4 });
        // this.onPlayerReadyNtfHandler({ "seatid": 4 });
        // this.onStandupNtfHandler({ "uid": 1002, "seatid": 3 });

    }

    protected onResize(e: laya.events.Event): void {
        this._table.width = 0;
        this._table.width = AppControl.getInstance().stage.width;
        this._table.height = AppControl.getInstance().stage.height > TableLayout.STAGE.height ? TableLayout.STAGE.height : AppControl.getInstance().stage.height;
        this._tablePop.width = 0;
        this._tablePop.width = AppControl.getInstance().stage.width;
        this._tablePop.height = AppControl.getInstance().stage.height > TableLayout.STAGE.height ? TableLayout.STAGE.height : AppControl.getInstance().stage.height;
        this._table._box.width = this._tablePop.width > TableLayout.STAGE.width ? TableLayout.STAGE.width : AppControl.getInstance().stage.width;
        this._table._box.height = this._tablePop.height;
        this._table._box.centerX = 0;
        //this._menu.x = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) * 0.5 + 20 : 20;
        if (Native.instance.isNative) {
            this._batteryUI.x = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? AppControl.getInstance().stage.width * 0.5 + 640 - 60 : AppControl.getInstance().stage.width - 60;
            this._netSignalUI.x = this._batteryUI.x - 50;
        }
        else {
            this._netSignalUI.x = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? AppControl.getInstance().stage.width * 0.5 + 640 - 50 : AppControl.getInstance().stage.width - 50;
            this._batteryUI.x = this._netSignalUI.x - 60;
        }
        //log(AppControl.getInstance().stage.width)
        //log(TableLayout.STAGE.width)

        //log((AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2)



        //按钮 适配背景

        this._tablePop._btnMatchRecord.right = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + BaseGameData.tablelayout.MATCH_RECORD_LAYOUT["right"] : BaseGameData.tablelayout.MATCH_RECORD_LAYOUT["right"];

        this._tablePop._aniTip.right = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + BaseGameData.tablelayout.SSYY_TIP_LAYOUT["right"] : BaseGameData.tablelayout.SSYY_TIP_LAYOUT["right"];
        this._menu.right = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + BaseGameData.tablelayout.MENU_CONTENT_LAYOUT["right"] : BaseGameData.tablelayout.MENU_CONTENT_LAYOUT["right"];




        //this._tablePop._btnBack.centerY = this._tablePop._btnEnd.centerY = this._tablePop._inviteUI.centerY ;
        if (this._ruleView) {
            this._ruleView.left = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + 10 : 10;
        }

        AppControl.getInstance().resetScreen();
    }

    /**
     * 断线时。不需要去刷新位置信息
     */
    protected clearData(needCheckIsGameing: boolean = true): void {
        BaseGameData.init();
        Laya.timer.clearAll(this)
        Laya.Tween.clearAll(this)
        AnimationManager.instance.endAnimations()
        AniEffectManager.instance.clearAll()
        this.stopChatVisiter(false);
        this._isWxRecording = false;
        this._isWxRecordSend = false;
        if (this._tablePop._btnCheckResult) {
            this._tablePop._btnCheckResult.visible = this._tablePop._btnZBKS.visible = this._tablePop._inviteUI.visible = this._tablePop._btnBack.visible = this._tablePop._btnEnd.visible = false;
        }
        WxWeb.instance.clearRecord();
        var i: number;
        if (this._playerUis) {
            for (i = 1; i < this._playerUis.length; i++) {
                this._playerUis[i].clear(needCheckIsGameing);
            }
        }
    }

    /**
     * 连接上服务器
     */
    protected onConnectToServer(): void {
        LoadingUI.instance.hide();
        if (GameConfig.IS_MATCH)
            server.joinMatchReq()
    }

    /**
     * 连接失败
     */
    protected onServerError(): void {

    }

    /**
     * 显示房号等信息
     */
    protected setTableInfo(): void {
        if (!BaseGameData.isRecord) {
            this._tablePop._btnZBKS.visible = this._tablePop._inviteUI.visible = !BaseGameData.isTableStart && !GameConfig.IS_MATCH;
            this._tablePop._inviteUI.centerY = 0
            this._tablePop._btnZBKS.centerY = 0
            this._tablePop._inviteUI.centerX = -170
            this._tablePop._btnZBKS.centerX = 170
            this._tablePop._btnZBKS.on(Laya.Event.CLICK, this, function () {
                server.playerReadyReq()
            })
            if (!BaseGameData.isTableStart && BaseGameData.owner == server.uid) {
                this._tablePop._inviteUI.centerX = 0
                this._tablePop._btnZBKS.visible = false

            }

            if (BaseGameData.owner == server.uid) {
                this._tablePop._btnBack.visible = this._tablePop._btnEnd.visible = !BaseGameData.isTableStart && !GameConfig.IS_MATCH;
                if (this.screenMode == Laya.Stage.SCREEN_VERTICAL) {
                    this._tablePop._btnBack.centerX = 170;
                    this._tablePop._btnEnd.centerX = -170;
                }
                else {
                    this._tablePop._btnBack.centerX = 260;
                    this._tablePop._btnBack.centerY = 50;
                    this._tablePop._btnEnd.centerX = -260;
                    this._tablePop._btnEnd.centerY = 50;
                }
            }
            else {
                this._tablePop._btnEnd.visible = false;
                this._tablePop._btnBack.visible = !BaseGameData.isTableStart && !GameConfig.IS_MATCH;
                // this._tablePop._btnBack.centerX = this._tablePop._btnEnd.centerX = 0;
                if (this.screenMode == Laya.Stage.SCREEN_VERTICAL) {
                    this._tablePop._btnBack.centerX = 170;
                    this._tablePop._btnEnd.centerX = -170;
                }
                else {
                    this._tablePop._btnBack.centerX = 260;
                    this._tablePop._btnBack.centerY = 50;
                    this._tablePop._btnEnd.centerX = -260;
                    this._tablePop._btnEnd.centerY = 50;
                }
            }
        }

        if (!this._tablePop._next.visible && BaseGameData.isTableStart && !BaseGameData.isRecord)
            this._tablePop._wait.visible = !BaseGameData.isGameing;

        if (!GameConfig.IS_MATCH) {
            this._tablePop._tuoguan.visible = false
        }
        if (GameConfig.IS_IOS_EXAMINE) {
            this._tablePop._inviteUI.visible = false
        }
        //隐藏桌面上的离开房间和解散房间
        this._tablePop._btnBack.visible = this._tablePop._btnEnd.visible = false

        // //返回大厅，查看战绩
        // this._tablePop._labInfo.text=StringUtils.format(GameConfig.language.table_info,BaseGameData.tableid,BaseGameData.currHandCount?BaseGameData.currHandCount:1);
        // this._tablePop._labInfo.text = "";

        //上传gps定位
        server.uploadInfoReq()
        this.checkTableStart()
    }

    // 设置规则位置等信息
    protected checkTableStart() {
        if (!BaseGameData.isRecord) {
            let checkStart = !BaseGameData.isTableStart && !GameConfig.IS_MATCH
            this._tablePop._btnZBKS.visible = checkStart
            this._tablePop._inviteUI.centerY = 95
            this._tablePop._btnZBKS.centerY = 95
            this._tablePop._inviteUI.centerX = -170
            this._tablePop._btnZBKS.centerX = 170
            this._tablePop._next.centerX = 0
            if (!BaseGameData.isTableStart && BaseGameData.owner == server.uid) {
                this._tablePop._inviteUI.centerX = 0
                this._tablePop._btnZBKS.visible = false

            }
            if (this._tableInfoView) {
                this._tableInfoView.removeSelf()
                this._tableInfoView = null
            }
            if (checkStart) {
                this._tableInfoView = new MJTableInfoView()
                this._table.addChild(this._tableInfoView)
                this._tableInfoView.centerX = 0
                this._tableInfoView.centerY = -55
            }
            else if (BaseGameData.ruleInfo) {
                this.showRule([{ info: BaseGameData.ruleInfo }])
            }
        }
    }

    // 显示规则
    protected showRule(info) {
        if (BaseGameData.isRecord) {
            if (this._ruleView) {
                this._ruleView.removeSelf()
                this._ruleView = null
            }
        }
        if (this._tableInfoView) {
            this._tableInfoView.show(info[0].info)
            return
        }

        if (!this._ruleView) {
            this._ruleView = new MJRuleInfoView()
            this._ruleView.top = 0
            this._ruleView.left = AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + 10 : 10;
            this._table.addChild(this._ruleView)
        }
        this._ruleView.show(info[0].info)
    }
    /**
     * 断开连接
     */
    protected onDisconnectServer(code: number): void {
        this.clearData(false);
        if (code) {
            LoadingUI.instance.hide();
            AlertInGameCtrl.instance.show(GameConfig.language.socket_disconnect[code], this.back, 0, false)
        }
        else
            LoadingUI.instance.show(LoadingUI.TYPE_NO_BG_ATONCE);
    }

    /**
     * 桌子信息
     */
    protected onTableInfoNtfHandler(msg: any): void {
        BaseGameData.onTableInfoNtfHandler(msg);
        var i: number;
        // if (!this._playerUis) {
        //     this._playerUis = [null];
        //     for (i = 1; i <= BaseGameData.maxPlayer; i++) {
        //         var playerUI: PlayerInGameUI = new PlayerInGameUI();
        //         playerUI.index = i;
        //         playerUI.clear();
        //         this._playerUis.push(playerUI);
        //         // this._tablePop._box.addChild(playerUI);
        //         this._table._box.addChild(playerUI)
        //         this._table._box.zOrder = GameZorder.Player
        //     }
        // }
        this.removeSeatViews()
        this.initSeatViews()
        this._table._box.visible = true
        for (i = 0; i < msg.playerinfo.length; i++) {
            this.onPlayerInfoNtfHandler(msg.playerinfo[i]);
        }
        // this._tablePop._menu._btnEnd.disabled = BaseGameData.owner != server.uid;
        // if(Utils.checkSeatid(BaseGameData.selfSeatid)){
        PlayerManager.instance.movePlayer(false)
        // }
       


        this.setTableInfo();
        this.checkSelfSeatid()
        this.checkNextBtn()
        this.changeAllSeatToSeat()

        //返回大厅，查看战绩

        this._tablePop._btnCheckResult.visible = false
        this._voteNtfmsg = null


        AlertDissolveCtrl.instance.hide()
        Dispatcher.dispatch(EventNames.MENU_CHECK);



    }

    public initSeatViews() {
        var info = { "seatid": 1, "dir": 1 }
        this._table._box.visible = false
        for (var i = 1; i <= BaseGameData.maxPlayer; i++) {
            let pos = Utils.currentPos(i)
            info.seatid = i
            info.dir = i
            let player = PlayerManager.instance.addPlayerView(i, info)
            player.dir = i
            this._table._box.addChild(player)
            this._table._box.zOrder = GameZorder.Player
            Utils.injectProp(player, BaseGameData.tablelayout.SEAT_LAYOUT[BaseGameData.maxPlayer - 1][pos - 1])
            // player.pos(BaseGameData.tablelayout.SEAT_LAYOUT[BaseGameData.maxPlayer-1][pos-1].x, BaseGameData.tablelayout.SEAT_LAYOUT[BaseGameData.maxPlayer-1][pos-1].y)
        }
    }


    public removeSeatViews() {
        PlayerManager.instance.removeAllPlayer()
        BaseGameData.offset = 0
    }

    public changeAllSeatToSeat() {
        for (var i = 1; i <= BaseGameData.maxPlayer; i++) {
            if (!BaseGameData.getPlayerDataBySeatid(i)) {
                this.changeSeatToSeat(i)
            }
        }
    }

    public changeSeatToSeat(seatid) {
        // _gameDataMgr:removeSeatInfo(seatid)
        if (!Utils.checkSeatid(BaseGameData.selfSeatid)) {
            PlayerManager.instance.changeToSeat(seatid)
        } else {
            PlayerManager.instance.changeToEmpty(seatid)
        }
    }


    protected checkSelfSeatid() {
        if (GameConfig.IS_MATCH) return
        if (!BaseGameData.selfSeatid) {
            for (let i = 1; i <= BaseGameData.maxPlayer; i++) {
                if (!BaseGameData.getPlayerDataBySeatid(i)) {
                    if (BaseGameData.divide) {
                        if (server.uid == BaseGameData.owner) {
                            server.sitdownReq(0)
                        } else {
                            // let text = StringUtils.format(GameConfig.language.sit_down_tip, BaseGameData.divide);
                            // AlertInGameCtrl.instance.show(text, (type: number) => {
                            //     if (type == AlertCtrl.CONFIRM) {
                                     server.sitdownReq(0)
                            //     }
                            // }, 0, true, ResourceConfig.ALERT_TISHI);
                        }
                        break
                    } else {
                        server.sitdownReq(0)
                        break
                    }
                }
            }

        }
    }

    public checkNextBtn() {

        // let data = BaseGameData.getPlayerDataBySeatid(BaseGameData.selfSeatid)
        // if (data.status == 1 && (!BaseGameData.isTableStart && !GameConfig.IS_MATCH)) {
        //     this._tablePop._btnZBKS.visible = false
        //     this._tablePop._inviteUI.visible = true
        //     this._tablePop._inviteUI.centerX = 0
        // }


        if (this._tablePop && this._tablePop._next)
            this._tablePop._next.visible = false;





        let player = BaseGameData.getPlayerDataBySeatid(BaseGameData.selfSeatid)

        if (player && player.status == 1 && player.seatid > 0 && !BaseGameData.isRecord
            // && BaseGameData.gameType != GameDef.GAME_TYPE.SHISANSHUI
            && !GameConfig.IS_MATCH && !BaseGameData.isTableStart && BaseGameData.currHandCount <= 1) {
            this._tablePop._btnZBKS.visible = false
            this._tablePop._inviteUI.visible = true
            this._tablePop._inviteUI.centerX = 0

            if (this._tablePop._btnCheckResult.visible) {
                this._tablePop._next.visible = false
                this._tablePop._inviteUI.visible = false
                this._tablePop._btnZBKS.visible = false
            }
        }



        if (player && player.status == 0 && player.seatid > 0 && !BaseGameData.isRecord
            // && BaseGameData.gameType != GameDef.GAME_TYPE.SHISANSHUI
            && !GameConfig.IS_MATCH) {
            this._tablePop._next.visible = true
            this._tablePop._wait.visible = false
            if (BaseGameData.isGameing == false) {
                this._tablePop._next.on(Laya.Event.CLICK, this, function () {
                    server.playerReadyReq()
                })
            }
            if (this._tablePop._btnZBKS.visible) {
                this._tablePop._next.visible = false
            }
            if (this._tablePop._btnCheckResult.visible) {
                this._tablePop._next.visible = false
                this._tablePop._inviteUI.visible = false
                this._tablePop._btnZBKS.visible = false
            }

        } else {
            this._tablePop._wait.visible = false
            this._tablePop._next.visible = false
            if (GameConfig.IS_MATCH && BaseGameData.isTableStart)
                this._tablePop._wait.visible = true
        }


        if (GameConfig.IS_IOS_EXAMINE) {
            this._tablePop._inviteUI.visible = false
        }
    }

    /**
     * 玩家信息
     */
    protected onPlayerInfoNtfHandler(msg: any): void {
        BaseGameData.onPlayerInfoNtfHandler(msg);
        PlayerManager.instance.changeSeatToPlayer(msg.uid, msg.seatid)
        let player = BaseGameData.getPlayerDataByUid(msg.uid)
        if (player && server.uid == player.uid && GameConfig.IS_MATCH && player.isLeave) {
            this._tablePop._tuoguan.visible = true
        }
        // this.setPlayerUIStatus(msg.uid == server.uid, msg.uid, msg.seatid);
        // for (var i: number = 1; i < this._playerUis.length; i++) {
        //     this._playerUis[i].checkIsGameing();
        // }
    }

    protected onSitdownRepHandler(msg: any): void {
        if (msg.result) {
            GameLogic.selfData.game_code = 0
            var errorCode: Object = GameConfig.language.sit_down_errorcode;
            if (msg.result == 5) {
                if (BaseGameData.maxPlayer > 2) {
                    AlertInGameCtrl.instance.show(GameConfig.language.sit_down_error, null, 0, false);
                }
            } else if (msg.result == 100) {
                if (BaseGameData.divide) {
                    if (GameLogic.selfData.diamond >= BaseGameData.divide) {
                        HintCtrl.instance.show(errorCode[msg.result]);
                    } else {
                        AlertInGameCtrl.instance.show("余额不足,是否前往充值", (type: number) => {
                            if (type == AlertCtrl.CONFIRM) {
                                ShopCtrl.instance.show();
                            }
                        });
                    }
                } else {
                    HintCtrl.instance.show(errorCode[msg.result]);
                }
            } else {
                if (errorCode.hasOwnProperty(msg.result))
                    HintCtrl.instance.show(errorCode[msg.result]);
                else
                    HintCtrl.instance.show(StringUtils.format(GameConfig.language.sit_down_fail, msg.result));
            }
        }


        // var a:Object;a.

    }

    /**
     * 玩家坐下
     */
    protected onSitdownNtfHandler(msg: any): void {
        BaseGameData.onSitdownNtfHandler(msg);
        SoundManager.instance.playEffect("player_enter", 0, 1, false, 1, true);
        PlayerManager.instance.changeSeatToPlayer(msg.uid, msg.seatid)
        // this.setPlayerUIStatus(msg.uid == server.uid, msg.uid, msg.seatid);
        if (msg.uid == server.uid) {
            GameLogic.selfData.game_code = BaseGameData.tableid
            PlayerManager.instance.movePlayer(false)
        }
        Dispatcher.dispatch(EventNames.MENU_CHECK);
    }

    // private setPlayerUIStatus(needReset: boolean, uid: number, seatid: number): void {
    //     var i: number;
    //     var index: number;
    //     if (needReset) {
    //         for (i = 1; i < this._playerUis.length; i++) {
    //             this._playerUis[i].status = PlayerInGameUI.STATUS_CAN_SIT;
    //         }

    //         //有人坐的状态置位坐下
    //         for (i = 0; i < BaseGameData.players.length; i++) {
    //             index = this.getPlayerUIBySeatId(BaseGameData.players[i].seatid);
    //             if (index) {
    //                 this._playerUis[index].status = PlayerInGameUI.STATUS_ALREADY_SIT;
    //                 this._playerUis[index].data = BaseGameData.players[i];
    //             }
    //         }
    //         //如果自己在桌子上，没人坐的座位设置为空
    //         if (BaseGameData.selfSeatid) {

    //             for (i = 1; i < this._playerUis.length; i++) {
    //                 if (this._playerUis[i].status == PlayerInGameUI.STATUS_CAN_SIT)
    //                     this._playerUis[i].status = PlayerInGameUI.STATUS_EMPTY;
    //             }
    //         }
    //         //如果自己不在桌子上，没人坐的座位设置为可以坐下
    //         else {
    //             for (i = 1; i < this._playerUis.length; i++) {
    //                 if (this._playerUis[i].status == PlayerInGameUI.STATUS_EMPTY)
    //                     this._playerUis[i].status = PlayerInGameUI.STATUS_CAN_SIT;
    //             }
    //         }
    //     }
    //     else {
    //         index = this.getPlayerUIBySeatId(seatid);
    //         if (index) {
    //             var playerData: PlayerData = BaseGameData.getPlayerDataByUid(uid);
    //             if (playerData.seatid > 0) {
    //                 this._playerUis[index].status = PlayerInGameUI.STATUS_ALREADY_SIT;
    //                 this._playerUis[index].data = playerData;
    //             }
    //             else {
    //                 if (BaseGameData.selfSeatid)
    //                     this._playerUis[index].status = PlayerInGameUI.STATUS_EMPTY;
    //                 else
    //                     this._playerUis[index].status = PlayerInGameUI.STATUS_CAN_SIT;
    //             }
    //         }
    //     }

    // }

    /**
     * 获取对应seatid的UI  如果自己在桌子上，最下方是自己，否则，最下方是1号位玩家
     */
    protected getPlayerUIBySeatId(seatid: number): number {
        if (seatid) {
            if (BaseGameData.selfSeatid) {
                var minus: number = seatid - BaseGameData.selfSeatid + 1;
                if (minus <= 0)
                    minus += BaseGameData.maxPlayer;
                return minus;
            }
            else
                return seatid;
        }
        else
            return 0;
    }

    protected onStandupRepHandler(msg: any): void {
        if (msg.result)
            HintCtrl.instance.show(GameConfig.language.standup_fail);
    }

    /**
     * 玩家站起
     */
    protected onStandupNtfHandler(msg: any): void {
        BaseGameData.onStandupNtfHandler(msg);
        this.changeAllSeatToSeat()
        // this.setPlayerUIStatus(msg.uid == server.uid, msg.uid, msg.seatid);
        // for (var i: number = 1; i < this._playerUis.length; i++) {
        //     this._playerUis[i].checkIsGameing();
        // }
        if (msg.uid == server.uid) {
            GameLogic.selfData.game_code = 0
        }
        Dispatcher.dispatch(EventNames.MENU_CHECK);
    }

    protected onStartTableRepHandler(msg: any): void {
        if (msg.result)
            HintCtrl.instance.show(GameConfig.language.start_table_fail);
    }

    /**
     * 桌子开始
     */
    protected onStartTableNtfHandler(msg: any): void {
        Dispatcher.dispatch(EventNames.MENU_CHECK);
    }

    /**
     * 桌子即将结束
     */
    protected onTableWillEndNtfHandler(msg: any): void {
        GameLogic.selfData.game_code = 0
        let text = "房间已解散"
        if (BaseGameData.divide && BaseGameData.selfSeatid) {
            text = "房间已解散,<br>返还" + BaseGameData.divide + "钻石"
        }
        AlertInGameCtrl.instance.show(text, this.back, null, false);
    }

    protected back() {

        AnimationManager.instance.endAnimations()
        Laya.timer.clearAll(this)
        Laya.Tween.clearAll(this)
        Utils.backToMenu()
    }

    protected onPlayerReadyRepHandler(msg: any): void {
        if (msg.result)
            HintCtrl.instance.show(GameConfig.language.player_ready_fail);
    }

    protected onPlayerReadyNtfHandler(msg: any): void {
        BaseGameData.onPlayerReadyNtfHandler(msg);
        if (msg.seatid == BaseGameData.selfSeatid) {
            this._tablePop._next.visible = false
            this._tablePop._btnShuffle.visible = false
            this._tablePop._wait.visible = false
            this._tablePop._btnZBKS.visible = false
            this._tablePop._inviteUI.centerX = 0
            if (BaseGameData.isTableStart) {
                this._tablePop._wait.visible = true
            }

        }
    }

    /**
     * 发表情
     * msg.emoticon_num
     * msg.seatid
     */
    protected onEmoticonNtfHandler(msg: any): void {

    }

    protected onUseGoodsRepHandler(msg: any): void {
        if (msg.result)
            HintCtrl.instance.show(GameConfig.language.use_goods_fail);
    }

    /**
     * 使用道具
     * msg.id
     * msg.use_seatid
     * msg.target_seatid
     */
    protected onUseGoodsNtfHandler(msg: any): void {
    }


    protected onGameStartNtfHandler(msg: any): void {
        this._voteNtfmsg = null
        BaseGameData.onGameStartNtfHandler(msg);
        var i: number;
        // if (!this._playerUis) {
        //     this._playerUis = [null];
        //     for (i = 1; i <= BaseGameData.maxPlayer; i++) {
        //         var playerUI: PlayerInGameUI = new PlayerInGameUI();
        //         playerUI.index = i;
        //         playerUI.clear();
        //         this._playerUis.push(playerUI);
        //         this._tablePop._box.addChild(playerUI);
        //     }
        // }
        this._table._box.visible = true
        for (i = 0; i < msg.players.length; i++) {
            this.onPlayerInfoNtfHandler(msg.players[i]);
        }
        // for (var i: number = 1; i < this._playerUis.length; i++) {
        //     this._playerUis[i].checkIsGameing();
        // }
        PlayerManager.instance.moveToGameStart(false)
        this.setTableInfo();
        Dispatcher.dispatch(EventNames.MENU_CHECK);
        if (this._ruleView) {
            this._ruleView.updateRound()
        }
    }

    /**
     * 结算 积分结算这里处理,win_score表示当局输赢积分，下面两项游戏自己处理逻辑
     * msg.win_type
     * msg.table_end     
     */
    protected onGameEndNtfHandler(msg: any): void {
        BaseGameData.onGameEndNtfHandler(msg);
        // for (var i: number = 1; i < this._playerUis.length; i++) {
        //     this._playerUis[i].checkIsGameing();
        // }
    }


    /**
     * 实时战绩，已将info保存到每个玩家
     */
    protected onRealTimeRecordRepHandler(msg: any): void {
        BaseGameData.onRealTimeRecordRepHandler(msg);
    }

    protected onOfflineNtfHandler(msg: any): void {
        BaseGameData.onOfflineNtfHandler(msg);
    }

    protected onReconnectInfoHandler(msg: any): void {
        // msg.gameplayer[0].cards[0].cards = [40,41,42,50,51,52,60,61,62,70,71,72,100,101];
        // this.removeSeatViews()
        // this.initSeatViews()
        BaseGameData.onReconnectInfoHandler(msg);

        PlayerManager.instance.moveToGameStart(false)
        Dispatcher.dispatch(EventNames.MENU_CHECK);
    }

    protected onShowInfoNtfHandler(msg: any): void {
    }

    protected onDetailNtfHandler(msg: any): void {
    }


    protected onTableDataNtfHandler(msg: any): void {
        BaseGameData.onTableDataNtfHandler(msg);
    }

    /**
     * 桌子结束
     */
    protected onTableEndNtfHandler(msg: any): void {
        //var time: number = Laya.Browser.now();
        var timestamp = (new Date()).valueOf();


        BaseGameData.onTableEndNtfHandler(msg);
        //Laya.timer.once(0, this, function () {
        if ((!DialogManager.instance.hasDialog("GAME_END") && !poker.GameEndWinCtrl.instance.parent && !poker.GameEndLoseCtrl.instance.parent) || BaseGameData.currHandCount < BaseGameData.totalHandCount) {
            if (this.screenMode == Laya.Stage.SCREEN_VERTICAL) {
                TableEndShuCtrl.instance.show(BaseGameData.tableEndInfo)
            } else {
                //TableEndCtrl.instance.show(BaseGameData.tableEndInfo)
                log("onTableEndNtfHandler:time:" + timestamp)
                this._tablePop._btnCheckResult.visible = true
                this._tablePop._inviteUI.visible = false
                this._tablePop._btnZBKS.visible = false
                this._tablePop._next.visible = false
                this._tablePop._wait.visible = false
            }
        }
        // })
        GameLogic.selfData.game_code = 0
        AlertDissolveCtrl.instance.hide()
        // ReportCtrl.instance.show(ReportCtrl.TYPE_GAME_END, msg);
    }

    protected onPlayerChatNtfHandler(msg: any): void {
        let player = BaseGameData.getPlayerDataByUid(msg.uid);
        if (msg.chatType == GameDef.CHAT_TYPE.RECORD) {
            if (msg.uid != server.uid) {
                var tmp: Array<any> = msg.chatContent.split(";");
                var time: number = tmp[0];
                var chatContent: string = tmp[1];

                if (player && player.seatid)
                    RecordManager.instance.downloadVoice(chatContent, player.seatid, "", time);
                else {
                    webService.getUserInfo(msg.uid, (response) => {
                        if (response.code == 0)
                            RecordManager.instance.downloadVoice(chatContent, 0, response.nickname, time);
                    });
                }

            }
        }
        else {
            if (player && player.seatid) {
                // var index: number = this.getPlayerUIBySeatId(player.seatid);
                // this._playerUis[index].playChat(msg)
                PlayerManager.instance.playChat(player.seatid, msg)
            }
        }

    }

    private onPlayRecord(seatid: number, nickname: string): void {
        if (seatid) {
            let player = BaseGameData.getPlayerDataBySeatid(seatid);
            if (player) {
                PlayerManager.instance._players[seatid].playChat({ chatType: GameDef.CHAT_TYPE.RECORD })
            }
        }
        else {
            this.showChatVisiter(nickname);
        }
    }

    private showChatVisiter(nickname: string): void {
        Laya.Tween.clearTween(this._tablePop._chatVisiter);
        this._tablePop._chatVisiter.visible = true;
        this._tablePop._chatVisiter._labNickname.text = nickname;
        this._tablePop._chatVisiter.y = -this._tablePop._chatVisiter.height;
        Laya.Tween.to(this._tablePop._chatVisiter, { y: 0 }, 300);
        this._tablePop._chatVisiter.ani1.play(1, true);
    }

    private stopChatVisiter(needTween: boolean = true): void {
        log("stopChatVisiter")
        if (this._tablePop && this._tablePop._chatVisiter) {
            Laya.Tween.clearTween(this._tablePop._chatVisiter);
            this._tablePop._chatVisiter.ani1.stop();
            if (needTween)
                Laya.Tween.to(this._tablePop._chatVisiter, { y: -this._tablePop._chatVisiter.height }, 300, null, Laya.Handler.create(this, () => { this._tablePop._chatVisiter.visible = false; }));
            else
                this._tablePop._chatVisiter.visible = false;
        }
    }

    private onVoiceChange(memberID: number, status: number, roomName: string): void {
        var playerData: PlayerData = BaseGameData.getPlayerDataByVoiceMemberid(memberID);
        if (playerData) {
            if (status == 98)
                playerData.isVoiceForbidden = false;
            else if (status == 99)
                playerData.isVoiceForbidden = true;

            //"MSG": "http:\/\/tongjiang.queyoujia.com\/main.min.js[1,undefined]\nTypeError: Cannot read property 'voiceChanged' of undefined"
            //2018/5/15 14:00
            if (PlayerManager.instance._players[playerData.seatid]) {
                PlayerManager.instance._players[playerData.seatid].voiceChanged(status);
            }

        }
        // this._playerUis[1].voiceChanged(status);
    }

    /**
     * 退到上一个场景
     */
    protected exit(): void {

    }

    protected onStageTouch(e: Laya.Event): void {

        if (e.type == Laya.Event.CLICK) {
            switch (e.target) {
                case this._menu._btnMenu:
                    break;
                default:
                    this._menu._box.visible = false;
                    Dispatcher.dispatch("handview", [e])
                    break;
            }
            switch (e.target.name) {
                case "ruleBtn":
                    if (this._tablePop._aniTip) {
                        this._tablePop._aniTip.ani1.stop();
                        this._tablePop._aniTip.visible = false //removeSelf();
                    }
                    localStorage.setItem("rule_tip_2", "1");
                    if (this._ruleView) {
                        this._ruleView.showRule()
                    }
                    break
                default:
                    if (this._ruleView) {
                        this._ruleView.hideRule()
                    }
                    break;
            }
        }
        else if (e.type == Laya.Event.MOUSE_UP) {// || e.type == Laya.Event.MOUSE_OUT
            if (this._isWxRecording) {
                var time: number = this._recordUI.stop();
                this._menu._btnMicrophone.off(Laya.Event.MOUSE_OVER, this, this.onBtnTouch);
                this._menu._btnMicrophone.off(Laya.Event.MOUSE_OUT, this, this.onBtnTouch);
                if (time >= 1000) {
                    RecordManager.instance.stopRecord(this._isWxRecordSend, BaseGameData.selfSeatid, GameLogic.selfData.nickname, time);
                }
                else {
                    RecordManager.instance.stopRecord(false, BaseGameData.selfSeatid, "");
                    HintCtrl.instance.show(GameConfig.language.record_short);
                }

                this._isWxRecording = false;
                this._isWxRecordSend = false;
            }
        }
    }

    /**
     * 一般按钮touch
     */
    protected onBtnTouch(e: Laya.Event): void {
        if (this.hideChatDialog())
            return;
        switch (e.currentTarget) {
            case this._tablePop._tuoguan:
                server.matchBackReq()
                this._tablePop._tuoguan.visible = false
                break;
            case this._tablePop._btnRealTime:
                // ReportCtrl.instance.show(ReportCtrl.TYPE_REAL_TIME);
                SetupCtrl.instance.show(false);
                break;

            case this._menu._btnChat:
                SoundManager.instance.playBtnEffect(SoundConfig.SOUND_BTN_NORMAL);
                ChatCtrl.instance.show();
                // ShopCtrl.instance.show();
                break;

            case this._tablePop._btnTest:


                break;

            case this._tablePop._inviteUI._btnInvite:
                Native.instance.share();
                break;

            case this._menu._btnMicrophone:
                if (e.type == Laya.Event.MOUSE_DOWN) {
                    SoundManager.instance.playBtnEffect(SoundConfig.SOUND_BTN_NORMAL);
                    this._isWxRecording = true;
                    this._isWxRecordSend = true;
                    this._recordUI.show();
                    RecordManager.instance.startRecord(() => {
                        this._recordUI.start();
                        if (!this._isWxRecording) {
                            this._recordUI.stop();
                            RecordManager.instance.stopRecord(false, BaseGameData.selfSeatid, "");
                        }
                    });

                    this._menu._btnMicrophone.on(Laya.Event.MOUSE_OVER, this, this.onBtnTouch);
                    this._menu._btnMicrophone.on(Laya.Event.MOUSE_OUT, this, this.onBtnTouch);
                }
                else if (e.type == Laya.Event.MOUSE_OVER) {
                    this._isWxRecordSend = true;
                    this._recordUI.upShow = true;
                }
                else if (e.type == Laya.Event.MOUSE_OUT) {
                    this._isWxRecordSend = false;
                    this._recordUI.cancelShow = true;
                }
                break;

            case this._menu._checkBox_huatong:
                SoundManager.instance.playBtnEffect(SoundConfig.SOUND_BTN_NORMAL);
                if (this._tablePop._aniTip) {
                    this._tablePop._aniTip.ani1.stop();
                    this._tablePop._aniTip.visible = false //removeSelf();
                }
                localStorage.setItem("ssyy_tip_2", "1");
                if (BaseGameData.selfSeatid) {
                    this._menu._checkBox_huatong.mouseEnabled = false;
                    RealTimeSpeechManager.instance.switchMic();
                }
                else
                    HintCtrl.instance.show(GameConfig.language.realtime_mic);
                break;

            case this._menu._checkBox_laba:
                this._menu._checkBox_laba.mouseEnabled = false;
                RealTimeSpeechManager.instance.switchSpeaker();
                break;
            case this._menu._btnMatchRecord:
                DialogManager.instance.callDialog("MATCH_RECORD")
                server.matchRecordReq()
                break

            case this._tablePop._btnBack:
                Dispatcher.dispatch(EventNames.MENU_TOUCH, [null, 2]);
                SoundManager.instance.playBtnEffect(1);
                break;

            case this._tablePop._btnEnd:
                Dispatcher.dispatch(EventNames.MENU_TOUCH, [null, 1]);
                SoundManager.instance.playBtnEffect(1);
                break;
            case this._menu._btnRestart:
                let isAutoLogin: boolean = LoginManager.instance.orderedLogin(true);
                if (!isAutoLogin)
                    AppControl.getInstance().showPage(LoginPage, LoginPage.PARAMS0_FIRST_ENTER);
                break;

            case this._tablePop._btnCheckResult:
                //查看战绩
                TableEndCtrl.instance.show(BaseGameData.tableEndInfo)

                break;
        }
    }

    private setMenu(): void {

    }

    public onVoteRepHandler(msg) {
        if (msg.result == 99) {
            HintCtrl.instance.show("解散太频繁")
        }
    }


    protected onVoteNtfHandler(msg) {
        console.info(msg)
        if (msg.voteType == 1) {
            if (!msg.voteResult) {
                console.log("=================================AlertDissolveCtrl   show")
                AlertDissolveCtrl.instance.show("", this.onDisReq, msg.timeout, false, "common/title_disglove.png", msg.result)
                this._voteNtfmsg = msg
                //log(BaseGameData.players)
            }

        }

    }
    protected onPlayerInfoComleted(): void {
        console.log("=================================onPlayerInfoComleted()")
        if (this._voteNtfmsg && AlertDissolveCtrl.instance.isVisiable()) {
            this.onVoteNtfHandler(this._voteNtfmsg)
        }


    }
    protected onPlayerTableStatusNtfHandler(msg) {
        BaseGameData.onPlayerTableStatusNtfHandler(msg)
        if (msg.uid == server.uid) {
            let player = BaseGameData.getPlayerDataByUid(msg.uid)
            if (player && player.isLeave) {
                this._tablePop._tuoguan.visible = true
            } else {
                this._tablePop._tuoguan.visible = false
            }
        }
        // let play = BaseGameData.getPlayerDataByUid(msg.uid)
        // let offline = msg.status >> 1
        // let leave = msg.status >> 2
    }

    protected onDisReq(result) {
        server.playerVoteReq(1, 2, result)
    }

    public PlaySheet() {
        let view = new PlaySheetView()
        this.addPopup(view)
        view.width = this._table.width
        view.init(this._sheetData)
    }

    protected onMic(type: string, code: number): void {
        if (code == 0)
            this._menu._checkBox_huatong.selected = type == "off";
        else {
            var isOpen: string = localStorage.getItem(RealTimeSpeechManager.CONST_MIC);
            if (isOpen == "on")
                this._menu._checkBox_huatong.selected = false;
            else
                this._menu._checkBox_huatong.selected = true;
        }

        this._menu._checkBox_huatong.mouseEnabled = true;
        this._menu._checkBox_huatong.visible = true;
        if (localStorage.getItem("ssyy_tip_2") == "1") {
            this._tablePop._aniTip.visible = false// removeSelf();
        }
        else {
            this.showAniTip(0)
        }


        //强制隐藏
        // this._menu._checkBox_huatong.mouseEnabled = false;
        // this._menu._checkBox_huatong.visible = false;
    }

    protected onSpeaker(type: string, code: number): void {
        if (code == 0)
            this._menu._checkBox_laba.selected = type == "off";
        else {
            var isOpen: string = localStorage.getItem("r_speaker");
            if (!isOpen || isOpen == "on")
                this._menu._checkBox_laba.selected = false;
            else
                this._menu._checkBox_laba.selected = true;
        }
        this._menu._checkBox_laba.visible = true;
        this._menu._checkBox_laba.mouseEnabled = true;

        //强制隐藏
        // this._menu._checkBox_laba.mouseEnabled = false;
        // this._menu._checkBox_laba.visible = false;
    }

    private hideChatDialog(): boolean {
        if (!ChatCtrl.instance.parent)
            return false;
        return ChatCtrl.instance.hide();
    }
    public setGps(): void {
        if (!GameConfig.IS_IOS_EXAMINE) {
            let gpsTip = DialogManager.instance.callDialog("GPS_TIP")
            gpsTip.show()
        }
    }

    public showAniTip(type) {
        let pos = [
            { right: AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + BaseGameData.tablelayout.SSYY_TIP_LAYOUT["right"] : BaseGameData.tablelayout.SSYY_TIP_LAYOUT["right"] },
            { right: AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + BaseGameData.tablelayout.SSYY_TIP_LAYOUT["right"] : BaseGameData.tablelayout.SSYY_TIP_LAYOUT["right"] },

            {
                left: AppControl.getInstance().stage.width > TableLayout.STAGE.width ? (AppControl.getInstance().stage.width - TableLayout.STAGE.width) / 2 + 90 : 90,
                top: AppControl.getInstance().stage.height > TableLayout.STAGE.height ? (AppControl.getInstance().stage.height - TableLayout.STAGE.height) / 2 + 45 : 45
            },
        ]
        Utils.deepCopy(pos[type], this._tablePop._aniTip)
        this._tablePop._aniTip.ani1.play(1, true);
        this._tablePop._aniTip._img.skin = "table/tips_new_" + type + ".png"
        this._tablePop._aniTip.visible = true;
        Laya.Tween.to(this._tablePop, [], 0, null, Laya.Handler.create(this, function () {
            if (this._tablePop._aniTip) {
                this._tablePop._aniTip.ani1.stop();
                this._tablePop._aniTip.visible = false// removeSelf();
            }
        }), 10000)
    }
}