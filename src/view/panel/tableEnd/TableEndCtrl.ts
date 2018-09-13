class TableEndCtrl extends BaseCtrl {
    constructor() {
        super();
        this["name"] = "TableEndCtrl";

    }
    private _head: HeadUI;
    protected _ui: ui.components.TableEndUI;
    private _data: any;
    private _shareInfo
    private _shareText
    private _highestScore = 0
    private static _instance: TableEndCtrl;
    public static get instance(): TableEndCtrl {
        if (!this._instance)
            this._instance = new TableEndCtrl();
        return this._instance;
    }


    //private _endLayout = {headProp:{size:73}}
    public show(data) {
        this._data = data;

        this.showself()
    }
    public onresize(): void{
         super.onResize()



    }
    public beforeShow(): void {
        if (!this._ui) {
            this._ui = new ui.components.TableEndUI();
            this._ui._back.on(Laya.Event.CLICK, this, this.back)

            this._ui._btnShare.visible = true;
            this._ui._btnDownload.visible = false;

            EventManager.instance.registerOnObject(this, this._ui._btnShare, Laya.Event.CLICK, this, this.onShare);
            EventManager.instance.registerOnObject(this, this._ui._close, Laya.Event.CLICK, this, this.onClose);
            if (Native.instance.isNative) {
                //判断是原生app，则无需下载
                this._ui._ani.removeSelf();
                this._ui._btnShare.centerX = 240;
                this._ui._btnDownload.visible = false;
            }
            else {

                this._ui._btnShare.centerX = 0;
                this._ui._btnDownload.visible = true;
                this._ui._ani.hitArea = new Laya.Rectangle(-111, -28, 222, 56);
                EventManager.instance.registerOnObject(this, this._ui._btnDownload, Laya.Event.CLICK, this, this.onDownload);
                EventManager.instance.registerOnObject(this, this._ui._ani, Laya.Event.CLICK, this, this.onDownload);
                this._ui._ani.play(1, true);
            }

            
        }
        this._autoHide = false;
        super.beforeShow();
        this.onShow();
    }

    private back() {
        server.code = "";
        AppControl.getInstance().showPage(GameConfig.getHallPage());
        server.close();
    }

    private addTableEndItem(info, index) {
        // let height = BaseGameData.maxPlayer == 4 ? 98 : 124
        // let offset = BaseGameData.maxPlayer == 4 ? 12 : 25
         
        // BaseGameData.maxPlayer = this._data.length
        //BaseGameData.gameType = GameDef.GAME_TYPE.BAZHANG
        let headSize            //头像大小
        let kuangProp = {width: 0, height: 0,top:0,bottom:0}      //大框的属性
        let headPos = {centerX:0,centerY:0}       //头像的位置
        let headBgPos = {}      //头像背景
        let nameProp = {}       //名字的属性
        let uidProp = {}       //uid的属性
        let viewPos = []        //人物框位置
        let _top = 0
        //let kuangPos = {}
        switch (BaseGameData.gameType) {
            case GameDef.GAME_TYPE.SHISANSHUI:
            case GameDef.GAME_TYPE.BAZHANG:
                headSize = 100
                kuangProp = { width: 185, height: 400,top:10,bottom:10}
                headPos = { centerX: 0, centerY: -145 }
                headBgPos = { centerX: 0, centerY: -142 }
                nameProp = { centerX: 0, centerY: -70 }
                uidProp = { centerX: 0, centerY: -40 }
                _top = 180
                //八张2-6个人玩
                viewPos = [[],
                [{ centerX: -300, centerY: 0 }, { centerX: 300, centerY: 0 }],
                [{ centerX: -350, centerY: 0 }, { centerX: 0, centerY: 0 }, { centerX: 350, centerY: 0 }],
                [{ centerX: -450, centerY: 0 }, { centerX: -150, centerY: 0 }, { centerX: 150, centerY: 0 }, { centerX: 450, centerY: 0 }],
                [{ centerX: -450, centerY: 0 }, { centerX: -225, centerY: 0 }, { centerX: 0, centerY: 0 }, { centerX: 225, centerY: 0 }, { centerX: 450, centerY: 0 }],
                [{ centerX: -480, centerY: 0 }, { centerX: -288, centerY: 0 }, { centerX: -96, centerY: 0 }, { centerX: 96, centerY: 0 }, { centerX: 288, centerY: 0 }, { centerX: 480, centerY: 0 }]]
                break;
            case GameDef.GAME_TYPE.TONGLU_MJ:
                headSize = 100
                kuangProp = { width: 275, height: 420 , top:10,bottom:10}
                headPos = { centerX: -65, centerY: -145 }
                headBgPos = { centerX: -62, centerY: -142 }
                nameProp = { centerX: 60, centerY: -170 }
                uidProp = { centerX: 60, centerY: -130 }
                _top = 130
                //麻将2 ，4 人玩
                viewPos = [[],
                [{ centerX: -300, centerY: 0 }, { centerX: 300, centerY: 0 }],
                [],
                [{ centerX: -450, centerY: 0 }, { centerX: -150, centerY: 0 }, { centerX: 150, centerY: 0 }, { centerX: 450, centerY: 0 }]]
               
                break;
            case GameDef.GAME_TYPE.GUANPAI:
                headSize = 100
                kuangProp = { width: 275, height: 420 , top:10,bottom:10}
                headPos = { centerX: -65, centerY: -145 }
                headBgPos = { centerX: -62, centerY: -142 }
                nameProp = { centerX: 60, centerY: -170 }
                uidProp = { centerX: 60, centerY: -130 }
                 _top = 130
                //跑的快2 ，3 人玩
                viewPos = [[],
                [{ centerX: -300, centerY: 0 }, { centerX: 300, centerY: 0 }],
                [{ centerX: -400, centerY: 0 }, { centerX: 0, centerY: 0 }, { centerX: 400, centerY: 0 }]]
                
                break;
            
            case GameDef.GAME_TYPE.BULL:
                headSize = 100
                kuangProp = { width: 185, height: 400,top:10,bottom:10}
                headPos = { centerX: 0, centerY: -145 }
                headBgPos = { centerX: 0, centerY: -142 }
                nameProp = { centerX: 0, centerY: -70 }
                uidProp = { centerX: 0, centerY: -40 }
                _top = 180
                viewPos = [[],
                [{ centerX: -300, centerY: 0 }, { centerX: 300, centerY: 0 }],
                [{ centerX: -350, centerY: 0 }, { centerX: 0, centerY: 0 }, { centerX: 350, centerY: 0 }],
                [{ centerX: -450, centerY: 0 }, { centerX: -150, centerY: 0 }, { centerX: 150, centerY: 0 }, { centerX: 450, centerY: 0 }],
                [{ centerX: -450, centerY: 0 }, { centerX: -225, centerY: 0 }, { centerX: 0, centerY: 0 }, { centerX: 225, centerY: 0 }, { centerX: 450, centerY: 0 }],
                [{ centerX: -480, centerY: 0 }, { centerX: -288, centerY: 0 }, { centerX: -96, centerY: 0 }, { centerX: 96, centerY: 0 }, { centerX: 288, centerY: 0 }, { centerX: 480, centerY: 0 }]]
                break;
            
            default:
                headSize = 100
                kuangProp = { width: 275, height: 420, top:10,bottom:10}
                headPos = { centerX: -65, centerY: -145 }
                headBgPos = { centerX: -62, centerY: -142 }
                nameProp = { centerX: 60, centerY: -170 }
                uidProp = { centerX: 60, centerY: -130 }
                 _top = 130
                viewPos = [[],
                [{ centerX: -300, centerY: 0 }, { centerX: 300, centerY: 0 }],
                [{ centerX: -350, centerY: 0 }, { centerX: 0, centerY: 0 }, { centerX: 350, centerY: 0 }],
                [{ centerX: -450, centerY: 0 }, { centerX: -150, centerY: 0 }, { centerX: 150, centerY: 0 }, { centerX: 450, centerY: 0 }],
                [{ centerX: -450, centerY: 0 }, { centerX: -225, centerY: 0 }, { centerX: 0, centerY: 0 }, { centerX: 225, centerY: 0 }, { centerX: 450, centerY: 0 }],
                [{ centerX: -480, centerY: 0 }, { centerX: -288, centerY: 0 }, { centerX: -96, centerY: 0 }, { centerX: 96, centerY: 0 }, { centerX: 288, centerY: 0 }, { centerX: 480, centerY: 0 }]]
               
                break;
        }
        let view = new ui.components.TableEndItemUI()
        let head = new HeadUI()

        head.setImageBounds(headSize, headSize)

        view._avatar.addChild(head)

        head.getInfo(info.uid)
        Utils.injectProp(head, { top: 3, left: 3, right: 3, bottom: 3 })
        Utils.injectProp(view, kuangProp)
        Utils.injectProp(view, { anchorX: 0.5, anchorY: 0.5 })
        Utils.injectProp(view._avatar, { width: headSize, height: headSize })
        Utils.injectProp(view._avatar, headPos)
        Utils.injectProp(view._headBg, headBgPos)
        Utils.injectProp(view._headBg, { width: headSize + 15, height: headSize + 15 })
        Utils.injectProp(view.img_winner, { centerX:headPos.centerX,centerY:headPos.centerY-30})
        // Utils.injectProp(view.headBg,{width:headSize,height:headSize})
        Utils.injectProp(view._name, nameProp)
        Utils.injectProp(view._userid, uidProp)

        head._labInfo.visible = false
        head._labName.visible = false
        let player = BaseGameData.getPlayerDataByUid(info.uid)

        if (player) {
            view._name.text = Utils.getFitNickName(player.nickname, 10)
        }
        else {
            view._name.text = Utils.getFitNickName("未知", 10)
        }

        view._userid.text = "ID:" + info.uid

        //view.pos(viewPos[BaseGameData.maxPlayer-1][index].x, index * height + index * offset + 100)
        Utils.injectProp(view, viewPos[this._data.length - 1][index])
        
        //大赢家头像
       
        
        if(this._highestScore == info.score && this._highestScore!=0 ){
            view.img_winner.visible = true

            view._bg.skin = "common/img_kuang.png"
        }
        else
        {
            view.img_winner.visible = false
            view._bg.skin = "common/img_n_kuang.png"
        }



        this._ui._box.addChild(view)

        if(AppControl.getInstance().stage.width<1280){
            log("width :"+AppControl.getInstance().stage.width)
            log("scale :"+AppControl.getInstance().stage.width/1280)
            Utils.injectProp(view, {scaleX:AppControl.getInstance().stage.width/1280,scaleY:AppControl.getInstance().stage.width/1280})


            //let avatarL  = AppControl.getInstance().stage.width-20/this._data.length
            let viewWidth = view.width *AppControl.getInstance().stage.width/1280
            let offsetL = (AppControl.getInstance().stage.width-20-viewWidth*this._data.length)/(this._data.length+1)

            let halfL = (AppControl.getInstance().stage.width-20)/2
            let centerx = -halfL+(parseInt(index)+1)*(offsetL)+ (viewWidth/2)+parseInt(index)*viewWidth
            Utils.injectProp(view, {centerX: centerx,centerY: 0 })

        }
        else
        {
             Utils.injectProp(view, viewPos[this._data.length - 1][index])
        }

        //根据不同的字段添加
        //八张   最大输赢,胜利局数,总分

        //桐庐麻将 大胡次数，胡牌次数,点炮次数,最大翻数,总分

        //跑的快 最高得分,炸弹数,胜负局数,总分

        //胡牌次数 自模次数 最大胡息 总积分

     
        if (info.info) {
            view._info.top = _top
            let arr = []
            // arr.push(info.score)

            Utils.deepCopy(info.info,arr)
            arr.push(info.score)
            let length = arr.length
            view._list.repeatY = length
            
            let xx = (kuangProp.height-_top-68*length)/(length-1)
            
            
            view._list.spaceY = xx
            view._list.array = arr
            view._list.scrollBar.visible = false;
            view._list.itemRender = InfoRender;
            view._list.scrollBar.visible = false;
            view._list.renderHandler = new Laya.Handler(this, (cell: ruleRender, index: number) => {
                if (index == arr.length - 1) {
                    cell.updata(true)
                    // info.info.pop()
                } else {
                    cell.updata(false)
                }
            });
        }
    }
    /**
     * 
     * @param name 字段名称
     * @param value 字段值
     */
    private getOtherView(name, value) {
        let view = new ui.components.TableEndItemChildUI()



        //测试
        view._des.text = "总积分:" + value



        return view

    }
    /**
    * 开启监听，配置宽高，添加到舞台
    */
    public onShow(): void {
        super.onShow();
        console.info(this._data)
       
        let shareInfo = []
        this._shareText = ""
        this._ui._box.removeChildren()
        this._highestScore= 0
        for (var k in this._data) {
            let v = this._data[k]

            if(v.score>this._highestScore){
                this._highestScore = v.score
            }
        }
        for (var k in this._data) {
            let v = this._data[k]
            this.addTableEndItem(v, k)
            let player = BaseGameData.getPlayerDataByUid(v.uid)
            let info = { a: "", n: "", s: 1 }
            info.a = player.avatar
            info.n = Utils.getFitNickName(player.nickname, 16)
            info.s = v.score
            shareInfo.push(info)
            if (v.score >= 0) {
                this._shareText += Utils.getFitNickName(info.n, 16) + " +" + info.s + " | "
            } else {
                this._shareText += Utils.getFitNickName(info.n, 16) + " " + info.s + " | "
            }
        }
        let info = { "g": BaseGameData.gameType, "t": TimeUtils.Format("yyyy-MM-dd hh:mm"), "c": BaseGameData.totalHandCount, "p": shareInfo }
        this._shareInfo = JSON.stringify(info)


        // if (GameConfig.IS_BANSHU)
        //     this._ui._gamename.skin = "banshu/history_" + BaseGameData.gameType + ".png";
        // else
        //     this._ui._gamename.skin = "createTable/" + GameDef.GAME_LOGO[BaseGameData.gameType] + ".png"
        this._ui._gamename.skin = "common/title_gameType_" + GameDef.GAME_LOGO[BaseGameData.gameType] + ".png"
        this._ui._round.text = "局数:" + BaseGameData.currHandCount + "/" + BaseGameData.totalHandCount

        this._ui._roomid.text = "房号:"+BaseGameData.tableid
        if(BaseGameData.gameType == GameDef.GAME_TYPE.TONGLU_MJ && BaseGameData.totalHandCount >= 30){
            this._ui._round.text =  BaseGameData.totalHandCount + "片"
        }
        var time: number = Laya.Browser.now();
        var d: Date = new Date(time);
        this._ui._time.text = TimeUtils.Format("yyyy-MM-dd hh:mm")
        WxWeb.instance.onShareInfo(4, 0, "战绩" + BaseGameData.tableid, this._shareText, this._shareInfo)
    }

    /**
     * 离开时调度
     */
    public afterShow(): void {
        super.afterShow();
        if (this._ui._ani)
            this._ui._ani.stop();
    }
    private onClose(): void {
       
        this.hide();
    }
    private onShare(): void {
        if (Native.instance.isNative) {
            Native.instance.share(2, 0);
        } else {
            Native.instance.share(4, 0, "战绩" + BaseGameData.tableid, this._shareText, this._shareInfo);
        }
    }

    private onDownload(): void {
        Native.instance.gotoDownload();
    }
}

class InfoRender extends ui.components.TableEndItemChildUI {
    //private _lable : Laya.Label
    constructor() {
        super()
       // this.init()
    }
    public updata(isLast) {
        //log(this.dataSource.toString())

        //   this._score_5.font = "font_num_12"
        //             score1 = "+"+score1
        //         }else{
        //             this._score_5.font = "font_num_13"

        if(isLast){
            this._total.visible = true
            this._des.visible = false
            let score = parseInt(this.dataSource.toString())
            
            this._common_di.skin = "common/hong_di.png"
            if(score>=0){
                this._score.skin = "res/img/img_font_zhengfeng.png"
                this._score.sheet = "0123456789"
            }
            else
            {
                this._score.skin = "res/img/img_font_fufen.png"
                this._score.sheet = "-0123456789"
            }

            log(this.dataSource.toString())
            this._score.value = this.dataSource.toString()

        }else
        {   
            this._total.visible = false
            this._des.text = this.dataSource.toString()
        }
        


    }
    // private init() {
    //     this._lable = new Laya.Label("胡牌次数：1244")
    //     this._lable.fontSize = 22
    //     this._lable.align = "center"
    //     this._lable.color = "#966f62"
    //     this.addChild(this._lable)
    // }
}