module daye_phz {
    export class GamePlayerView extends component.BasePlayer{
        constructor(p){
            super(p)
        }
        
        protected huxiBg:Laya.Image;
        protected huxiTxt:Laya.Text;
        protected timeLabel:Laya.Text;
        protected timeOut
        
        protected huxi:number
        protected initView(p){
            if (this.view._box.visible==false) {
                return
            }
            this.view._imgScoreBg.skin = "daye_phz/icon/bg_score.png"
            this.view._imgScoreBg.width = 103
            this.view._imgScoreBg.height = 29
            this.updateHuxi(0)
        }

        protected updateHuxi(num) {
            if (this.view._box.visible==false) {
                return
            }
            if (!this.huxiBg) {
                this.addHuxiInfo()
            }
            this.huxi = this.huxi + num    
            this.huxiTxt.text = this.huxi.toString()
            // if (this.huxi >= 10) {
            //     this.huxiTxt.x = this.view._labScore.x-13
            // }
            // else{
                this.huxiTxt.x = this.view._labScore.x-5
            // }
        }

        public clearHuxi() {
            this.huxi = 0
            this.huxiTxt.text = this.huxi.toString()
        }

        protected addHuxiInfo() {
            this.huxi = 0

            this.huxiBg = new Laya.Image("daye_phz/icon/bg_huxi.png");
            this.view.addChild(this.huxiBg)
            this.huxiBg.x = this.view._imgScoreBg.x
            this.huxiBg.y = this.view._imgScoreBg.y + this.view._imgScoreBg.height+5

            this.huxiTxt = new Laya.Text()
            this.huxiTxt.fontSize = this.view._labScore.fontSize
            this.huxiTxt.color = "#f7eac8"
            this.huxiTxt.x = this.view._labScore.x-5
            this.huxiTxt.y = this.view._labScore.y + this.view._imgScoreBg.height-9
            this.view.addChild(this.huxiTxt)
        }

        public checkOtherUnit(value: number) {
            this.huxiBg.visible = value == PlayerInGameUI.STATUS_ALREADY_SIT
            this.huxiTxt.visible = value == PlayerInGameUI.STATUS_ALREADY_SIT
        }

        public clear() {
            super.clear()
            this.huxiTxt.text = ""
            this.timeLabel.text = ""
        }
        
        public timeLoop():void {
            this.timeOut = this.timeOut - 1
            log("time------------------------------------------------")
            log(this.timeOut)
            this.timeLabel.text = this.timeOut
            this.timeLabel.x = (this.view._imgDisconnect.width - this.timeLabel.width) / 2
            this.timeLabel.y = (this.view._imgDisconnect.height - this.timeLabel.height) / 2

            if (this.timeOut == 0) {
                Laya.timer.clear(this, this.timeLoop)
            }
        }
        public startTimeLimit(timeOut) {
            if (this.timeLabel) {
                this.removeTimeLimit()
            }
            this.view._ani.visible = true
            timeOut = timeOut || 20
            if (!this.timeLabel) {
                this.timeLabel = new Laya.Text()
                this.timeLabel.fontSize = 48
                this.timeLabel.color = "#ffffff"
                this.timeLabel.alpha = 0.48*255                
                
                this.addChild(this.timeLabel)
            }
            this.timeLabel.text = timeOut.toString()
            this.timeLabel.x = (this.view._imgDisconnect.width - this.timeLabel.width) / 2
            this.timeLabel.y = (this.view._imgDisconnect.height - this.timeLabel.height) / 2
            
            this.timeOut = timeOut
            Laya.timer.loop(1000, this, this.timeLoop)
            this.view._ani.visible = false
            SkeletonAniManager.instance.playSkeletonAni(this.view._ani, "res/daye_phz/ani/timeLimit/touxiang.sk", true, timeOut, {x:0, y:0})
        }

        public removeTimeLimit() {
            this.view._ani.visible = false
            if (this.timeLabel) {
                Laya.timer.clear(this, this.timeLoop)
                this.timeLabel.removeSelf()
                this.timeLabel = null
            }
        }

        public setOtherVisible() {
            this.huxiBg.visible = this.view._box.visible
            this.huxiTxt.visible = this.view._box.visible
        }

        public checkOtherScore() {
            let p = BaseGameData.getPlayerDataBySeatid(this._seatid)
            this.huxi = p.huxi
            this.updateHuxi(0)
        }
    }
}