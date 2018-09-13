/*
 * @author seacole
 * 顶层弹窗 游戏中
*/
class AlertDissolveCtrl extends AlertInGameCtrl {
    constructor() {
        super();
        this["name"] = "AlertDissolveCtrl";
    }

    protected _ui: ui.panel.AlertInGameUI;
    protected _list: Laya.Image

    protected _dissloveItemLayout = []
    private _index = 0
    protected static _instanceDissolve: AlertDissolveCtrl;
    public static get instance(): AlertDissolveCtrl {
        if (!this._instanceDissolve)
            this._instanceDissolve = new AlertDissolveCtrl();
        return this._instanceDissolve;
    }

    public beforeShow(): void {
        console.log("beforeShow==================================")
        if (!this._ui) {
            this._ui = new ui.panel.AlertInGameUI();
            this._ui._labMsg.style.align = "center";
            this._ui._labMsg.style.color = "#423016";
            // this._ui._labMsg.style.strokeColor = "#3b6374";
            // this._ui._labMsg.style.stroke = 3;
            EventManager.instance.registerOnObject(this, this._ui._btns, Laya.Event.CLICK, this, this.onTouch);
            EventManager.instance.registerOnObject(this, AppControl.getInstance().stage, Laya.Event.RESIZE, this, this.onResize);
            EventManager.instance.registerOnObject(this, this._ui, Laya.Event.REMOVED, this, this.afterShow);
            this._autoHide = false;
            this._size = 22;
            this._ui._dissloveBox.visible = true
        }
        this.initLayout()
        this.onShow();

    }
    public isVisiable(){
        if(this._ui){
            return this._ui.visible
        }else
        {
            return false
        }
    }
    protected initLayout() {
        this._dissloveItemLayout = [[], [{ left: 25, centerY: 0 }, { right: 25, centerY: 0 }],
        [{ left: 25, centerY: -50 }, { right: 25, centerY: -50 }, { centerX: 25, centerY: 50 }],
        [{ left: 25, centerY: -50 }, { right: 25, centerY: -50 }, { left: 25, centerY: 50 }, { right: 25, centerY: 50 }],
        [{ left: 25, centerY: -80 }, { right: 25, centerY: -80 }, { left: 25, centerY: 0 }, { right: 25, centerY: 0 }, { centerX: 0, centerY: 80 }],
        [{ left: 25, centerY: -80 }, { right: 25, centerY: -80 }, { left: 25, centerY: 0 }, { right: 25, centerY: 0 }, { left: 25, centerY: 80 }, { right: 25, centerY: 80 }]]


    }
    public onShow(): void {
        console.log("onShow==================================")
        super.onShow();
        this._ui._imgTitle.source = Laya.Loader.getRes(this._title);

        this._ui._imgTitle.skin = "common/title_disglove.png"
        this._ui._btnConfirm.skin = "common/sBtn_agree.png"
        this._ui._btnCancel.skin = "common/sBtn_reject.png"

        if (this._needCancel) {
            this._ui._btnConfirm.centerX = -136;
            this._ui._btnCancel.visible = true;
        }
        else {
            this._ui._btnConfirm.centerX = 0;
            this._ui._btnCancel.visible = false;
        }
        log("AlertDissolveCtrl")
        log(this._params)
        if (this._params) {
            this.update(this._params)
        }
    }

    public update(info) {
        console.log("update==================================")
        let has = true
        let refusePlayer
        for (var k in info) {
            let player = info[k]
            if (BaseGameData.getPlayerDataByUid(player.uid) && BaseGameData.getPlayerDataByUid(player.uid).seatid == BaseGameData.selfSeatid) {
                this.waitDis(info)
                if (player.result > 0) {
                    has = false
                }
                break
            }
            if (player.result == 2) {
                this.showRefuse(BaseGameData.getPlayerDataByUid(player.uid))
                has = false
            }
        }
        if (has) {
            this.waitDis(info)
            this._ui._btnCancel.visible = true
            this._ui._btnConfirm.visible = true
            this._ui._btnConfirm.centerX = -138;
        }
    }

    public waitDis(info) {
        this._ui._btnCancel.visible = false
        this._ui._btnConfirm.visible = false
        this._ui._labMsg.visible = false
         this._ui._itemBox.visible = true
         this._ui._label_tip.visible = true
        // this._index++;
        // log(this._index)
        let player
        if(info[0]){
            player = BaseGameData.getPlayerDataByUid(info[0].uid)
            this._ui._label_tip.text = "玩家" + Utils.getFitNickName(player.nickname, 10) + "申请解散房间,是否同意?"
        }
       
        //log(player.nickname)
        this._ui._itemBox.removeChildren();

        let index = 0

        //log(BaseGameData.players)
        for (var k in BaseGameData.players) {
            let player = BaseGameData.players[k]
            let item = new ui.panel.AlertDissloveItemUI()

            item._name.text = Utils.getFitNickName(player.nickname, 10)

            this._ui._itemBox.addChild(item);


            Utils.injectProp(item, this._dissloveItemLayout[BaseGameData.maxPlayer - 1][index])

            index++

            for (var m in info) {
                let v = info[m]
                if (v.uid == player.uid) {
                    if (v.result == 1) {

                        item._status.skin = "common/img_gg.png"


                    } else if (v.result == 2) {

                        item._status.skin = "common/img_xx.png"
                        Laya.timer.once(1000, this, this.showRefuse, [player])
                    }
                    else {
                        item._status.skin = "common/img_wenhao.png"
                    }
                }
            }
        }

    }

    public showRefuse(player) {
        this._ui._label_tip.visible = false
        this._ui._labMsg.visible = true
        this._ui._itemBox.visible = false
        this._ui._imgTitle.skin = "common/title_disglove.png"
        this._ui._labMsg.innerHTML = "玩家" + player.nickname + "已拒绝,<br />房间解散失败,继续游戏";
        this._ui._btnConfirm.visible = true
        this._ui._btnConfirm.centerX = 0;
        this._ui._btnConfirm.skin = "common/sBtn_agree.png"
        this._ui._btnCancel.skin = "common/sBtn_reject.png"
        this._ui._btnCancel.visible = false
        if (this._list) {
            this._list.visible = false
        }

    }

    public chooseDis(info) {
        if (info.length == 0) return
        let player = BaseGameData.getPlayerDataByUid(info[0].uid)
        if (this._list) {
            this._list.visible = false
        }
        if (player) {
            this._ui._btnConfirm.centerX = -138;
            this._ui._btnConfirm.visible = true;
            this._ui._btnCancel.visible = true;

            this._ui._labMsg.innerHTML = "玩家" + player.nickname + "申请解散房间,<br />是否同意,<br />超过3分钟默认同意";
            this._ui._btnCancel.skin = "common/sBtn_reject.png"
            this._ui._btnConfirm.skin = "common/sBtn_agree.png"
        }
    }


}