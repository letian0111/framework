class LeftCardView extends ui.mj.PaiduiUI{
    constructor(){
        super()
    }

    public updateLeftCount(){
        if(this._left.visible == false){
            this._left.visible = true
        }
        this._left.value = String(BaseGameData.leftCard)
    }

    public updateShifter(){
        // this._card0._back.visible = false
        // this._card0._bg.skin = "card/5/"+BaseGameData.SHIFTER_NUM+".png"
        for(var k in BaseGameData.SHIFTER_NUM){
            let v = BaseGameData.SHIFTER_NUM[k]
            this["_card"+k].visible = true
            this["_card"+k]._back.visible = false;
            this["_card"+k]._bg.skin = "card/5/"+v+".png"
        }
    }

    
}