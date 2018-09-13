interface GpsMessage {
    exist: boolean,
    seatid: number,
    uid: number,
    longitude: number,
    latitude: number
}

const defaultGpsValue:number = -1000

class BaseGpsTip extends ui.components.gps.GpsTipUI {
    private gpsMsgs: Array<GpsMessage>
    private heads: Array<HeadUI>
    constructor() {
        super();
        this["name"] = "BaseGpsTip";
        this.init()
    }

    protected init() {
        this.centerY = 0
        this._btn_close.on(Laya.Event.CLICK, this, this.hide)
        server.on(EventNames.GAME_USER_INFO_REP, this, this.onUserInfoRep)
        this.gpsMsgs = []
        this.heads = []
        for (let i = 1; i <= 4; i++) {
            let msg: GpsMessage = {
                exist: false,
                seatid: i,
                uid: 0,
                longitude: 0,
                latitude: 0
            }
            this.gpsMsgs.push(msg)
            this.heads.push(null)
        }
    }

    private onUserInfoRep(info) {
        // log("玩家信息rep")
        // log(info)
        for (var k in info.info) {
            let v = info.info[k]
            let player = BaseGameData.getPlayerDataByUid(v.uid)
            if (player) {
                let sid = Utils.getDir(player.seatid)
                this.gpsMsgs[sid - 1].exist = true
                this.gpsMsgs[sid - 1].longitude = v.longitude
                this.gpsMsgs[sid - 1].latitude = v.latitude
                this.updateDis(sid)
            }
        }
    }


    private updateDis(seatid) {
        // for(var i = 1; i < 4; i++){
        //     if (seatid != i){
        //         this.updateDisFromTo(seatid, i)
        //     }
        // }
        if (1 == seatid) {
            this.updateDisFromTo(1, 2)
            this.updateDisFromTo(1, 3)
            this.updateDisFromTo(1, 4)
        }
        if (2 == seatid) {
            this.updateDisFromTo(1, 2)
            this.updateDisFromTo(2, 3)
            this.updateDisFromTo(2, 4)
        }
        if (3 == seatid) {
            this.updateDisFromTo(1, 3)
            this.updateDisFromTo(2, 3)
            this.updateDisFromTo(3, 4)
        }
        if (4 == seatid) {
            this.updateDisFromTo(1, 4)
            this.updateDisFromTo(2, 4)
            this.updateDisFromTo(3, 4)
        }
    }

    private updateDisFromTo(from, to) {
        let msgFrom = this.gpsMsgs[from - 1]
        let msgTo = this.gpsMsgs[to - 1]
        if (msgFrom.exist && msgTo.exist) {
            if (msgFrom.longitude!=defaultGpsValue && msgTo.longitude!=defaultGpsValue &&
                msgFrom.latitude!=defaultGpsValue && msgTo.latitude!=defaultGpsValue) {
                let dis = this.computeDis(msgFrom.longitude, msgTo.longitude, msgFrom.latitude, msgTo.latitude)
                this.setDistance(from, to, this.disToString(dis))
                this.checkWarning(from, to, dis)
            }
        }
    }


    private checkWarning(from, to, dis) {
        let warning = this.isWarning(dis)
        let line = "_g" + from.toString() + to.toString()
        this[line].skin = warning ? "gps/redLine.png" : "gps/whiteLine.png"
        let bg = "_d" + from.toString() + to.toString()
        this[bg]._bg.skin = warning ? "gps/readFrame.png" : "gps/unKnown.png"
    }

    /**
     * 设置距离
     * @param fromSeatId 
     * @param toSeatId 
     * @param dis 
     */
    public setDistance(fromSeatId, toSeatId, dis) {
        let k = "_d" + fromSeatId + "" + toSeatId
        this[k]._dis.text = dis
    }

    /**
     * 设置头像信息
     * @param seatId 
     * @param headView 
     */
    public setHead(seatId, headView) {
        let k = "_head" + seatId
        this[k].addChild(headView)
    }

    public hide() {
        DialogManager.instance.removeDialog("GPS_TIP")
    }
      /**
     * 玩家站起
     */
    // public onStandupNtfHandler(msg: any): void {
    //     // var player: PlayerData = BaseGameData.getPlayerDataByUid(msg.uid);
    //     // if (player) {
    //     //     player.seatid = 0;
    //     //     if (player.uid == server.uid) {
    //     //         BaseGameData.selfSeatid = 0;
    //     //         if (BaseGameData.isVoiceJoined && BaseGameData.isRecord != 1)
    //     //             RealTimeSpeechManager.instance.passiveCloseMic();
    //     //     }
    //     // }



    // }


    public show() {
        for (let i = 0; i < 4; i++) {
            let player = BaseGameData.getPlayerDataBySeatid(i + 1)
            if (player) {
                //if (player.ip == "") {
                server.userInfoReq([player.uid]);
                //}
                let dir = Utils.getDir(player.seatid)
                //player.seatid
                this.gpsMsgs[dir - 1].uid = player.uid
                if (null == this.heads[dir - 1]) {
                    let head = new HeadUI()
                    head.anchorX = 0.5
                    head.anchorY = 0.5
                    head.setImageBounds(73, 73)
                    this.setHead(dir, head)
                    this.heads[dir - 1] = head
                }
                this.heads[dir - 1].getInfo(player.uid)
                this.heads[dir - 1]._labName.centerX = -3
            }
        }
    }

    /**
     * 根据经纬度计算距离
     * @param long1 
     * @param lati1 
     * @param long2 
     * @param lati2 
     */
    private computeDis(long1, long2, lati1, lati2) {
        const pi = Math.PI
        const r = 6378137
        let radian = (d) => d * pi / 180.0
        let rlong1 = radian(long1), rlong2 = radian(long2)
        let rlati1 = radian(lati1), rlati2 = radian(lati2)
        let dis_long = rlong1 - rlong2
        let dis_lati = rlati1 - rlati2
        let dis: number = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(dis_lati / 2), 2)
            + Math.cos(rlati1) * Math.cos(rlati2) * Math.pow(Math.sin(dis_long / 2), 2))) * r
        return dis
    }

    private disToString(dis: number): string {
        if (dis < 1000)
            return parseInt(dis.toString()) + "m"
        return dis.toFixed(2) + "km"
    }

    private isWarning(dis): boolean {
        return dis < 100
    }

    public setMaxPlayer(num):void {
        if (!num || num < 2) {
            return
        }
        if (num == 2) {
            this.max_2.visible = true
            this.max_3.visible = false
            this.max_4.visible = false
            this._d24.x = 467
            this.players.y = 0
        }
        else if (num == 3) {
            this.max_2.visible = false
            this.max_3.visible = true
            this.max_4.visible = false
            this.max_3.y = -40
            this._d24.x = 317
            this.players.y = -50
        } 
        else if (num == 4) {
            this.max_2.visible = true
            this.max_3.visible = true
            this.max_4.visible = true
            this.max_3.y = 10  
            this._d24.x = 467
            this.players.y = 0    
        }
    }

    

}