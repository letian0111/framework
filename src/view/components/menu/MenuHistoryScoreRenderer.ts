/*
* @author seacole
* 战绩统计List  Renderer;
*/
class MenuHistoryScoreRenderer extends ui.components.menu.MenuHistoryScoreRendererUI {
    constructor() {
        super();
        if (GameConfig.IS_BANSHU)
            this._video.removeSelf();
        // this._video.on(Laya.Event.CLICK, this, this.click)
        // this._share.on(Laya.Event.CLICK, this, this.click)
        // this._share.mouseThrough = false
    }

    public updata(index): void {
        // var cfg: any = GameConfig.getGameCfgByGameType(this.dataSource.gtype);
        // if (cfg) {
        // if (this.dataSource.gtype == 3) {
        //     this._imgTile.skin = "menu/item_bg_0.png"
        // } else {
        //     this._imgTile.skin = "menu/item_bg_1.png"
        // }
        this._imgTile.skin = GameDef.SCORE_BG[this.dataSource.gtype]
        if (GameConfig.IS_BANSHU) {
            //this._imgGame.source = Laya.Loader.getRes("banshu/history_" + this.dataSource.gtype + ".png");
            let name = GameDef.GAME_NAME[this.dataSource.gtype - 1]
            let createInfo = GameConfig.getCreateInfoByGameName(name)
            this._gameName.text = createInfo.ch_name
        }

        else {
            //this._imgGame.source = Laya.Loader.getRes("menu/" + this.dataSource.gtype + ".png");
            let name = GameDef.GAME_NAME[this.dataSource.gtype - 1]
            let createInfo = GameConfig.getCreateInfoByGameName(name)
            if(createInfo)
                this._gameName.text = createInfo.ch_name
        }

        // this._labName.text = cfg.name;
        let _posindex = 0
        this._playerinfoBox.removeChildren()
        if (this.dataSource.info) {
             let info = JSON.parse(this.dataSource.info)
            for (var i = 0; i < info.length; i++) {
                var v = info[i];
                let label1 = new laya.ui.Label(Utils.getFitNickName(v.nk, 8))
                label1.fontSize = 30
                label1.color = "#b77a5c"
                label1.font = "Microsoft YaHei"
                let label2 = new laya.ui.Label(v.score)
                label2.color = "#b77a5c"
                label2.font = "Microsoft YaHei"
                label2.fontSize = 30
                label1.pos(30 + 150 * _posindex, 10)
                label2.pos(30 + 150 * _posindex, 60)
                this._playerinfoBox.addChild(label1)
                this._playerinfoBox.addChild(label2)


                if (v.score >= 0) {
                    label2.text = "+" + String(v.score)
                    this._imgScore.skin = "menu/score_bg_0.png"
                    //label2.font = "font_num_10"
                } else {
                    label2.text = v.score
                    this._imgScore.skin = "menu/score_bg_1.png"
                    //label2.font = "font_num_9"
                }
                _posindex++;
            }
        }
      
        this._labInfo.text = TimeUtils.timeChange(this.dataSource.end_time * 1000)
        // TimeUtils.Format("yyyy-MM-dd hh:mm:ss", this.dataSource.end_time)
        if (this.parent)
            this.width = this.parent["width"] - 20;

        //是比赛
        let show = true
        if (MatchConfig.isMatch(this.dataSource.gmode)) {
            this._imgMatch.visible = true;
            this._video.visible = false;
            this._labMatchTitle.text = this.dataSource.title;
            show = false
            //有排名
            if (this.dataSource.rank > 0) {
                this._score.text = this.dataSource.rank;
                this._imgDi.visible = this._imgMing.visible = this._imgScore.visible = this._score.visible = true;
                this._imgNoRank.visible = false;
                this._imgDi.right = this._score.right + this._score.displayWidth + 8;
                this._imgDi.alpha = this._imgMing.alpha = this._imgScore.alpha = this._score.alpha = 1;
            }
            else {
                this._imgDi.visible = this._imgMing.visible = this._imgScore.visible = this._score.visible = false;
                this._imgNoRank.visible = true;
                this._imgNoRank.alpha = 1
            }

        }
        else {
            this._score.visible = false;
            this._labMatchTitle.text = "";
            this._imgMatch.visible = false;
            this._video.visible = true;
            this._imgNoRank.visible = false;
            this._imgScore.visible = false;
            this._imgDi.visible = this._imgMing.visible = false;
        }

        this.setResult(show)
        this.setGameMessage(show)
        this.setPlayers(show)
        // }
    }

    protected click() {
        console.log("分享")
    }

    /**
     * 设置结果
     */
    protected setResult(show: boolean = true) {
        let score = this.dataSource.score
        if (0 < score) this._result.skin = "menu/win.png"
        if (0 == score) this._result.skin = "menu/tie.png"
        if (0 > score) this._result.skin = "menu/lose.png"
        this._result.visible = show
    }

    /**
     * 设置游戏信息
     */
    protected setGameMessage(show: boolean = true) {
        let str = "房间号: " + this.dataSource.gcode
        this._game_msg.text = str
        this._game_msg.visible = show
    }

    /**
     * 设置玩家信息
     */
    protected setPlayers(show: boolean = true) {
        // let score = this.dataSource.score
        // let str = (score > 0 ? "+" : "") + score
        // this._players.text = str
        this._players.visible = false
    }
}

// class PlayerRender extends Laya.Text{

// }