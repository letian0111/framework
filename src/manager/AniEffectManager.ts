class AniEffectManager {
    private aniList = []
    constructor() {
        this.aniList = []
    }

    private static _instance: AniEffectManager;
    public static get instance(): AniEffectManager {
        if (!this._instance) {
            this._instance = new AniEffectManager();
        }
        return this._instance;
    }


    public playEffectOnce(target, res, delay, pos, callback?){
        let ani = new Laya.Animation()
        ani.loadAnimation(res)
        ani.play(1,false)
        ani.zOrder = GameZorder.Ani+2
        let index = this.aniList.length
        Utils.injectProp(ani, pos)
        target.addChild(ani)
        this.aniList.push(ani)
        Laya.timer.once(delay, this, function(){
            ani.stop()
            ani.removeSelf()
            this.aniList.splice(index,1)
            if(callback)
                callback()
        })
    }
    public playEffect(target,loop, res, delay, pos, callback?){
        let ani = new Laya.Animation()
        ani.loadAnimation(res)
        ani.play(1,loop)
        ani.zOrder = GameZorder.Ani+2
        let index = this.aniList.length
        Utils.injectProp(ani, pos)
        target.addChild(ani)
        this.aniList.push(ani)
        Laya.timer.once(delay, this, function(){
            ani.stop()
            ani.removeSelf()
            this.aniList.splice(index,1)
            if(callback)
                callback()
        })
    }
    public playEffect2(target, res, delay, pos, isloop, callback?){
        if (isloop) {
            let ani = new Laya.Animation()
            ani.loadAnimation(res)
            ani.play(1, true)
            ani.zOrder = GameZorder.Ani+2
            let index = this.aniList.length
            Utils.injectProp(ani, pos)
            target.addChild(ani)
            this.aniList.push(ani)
            return index
        }
        else {
            this.playEffectOnce(target, res, delay, pos, callback)
        }
    }

    public removeEffect(index) {
        if (!this.aniList) {
            return
        }
        let ani = this.aniList[index]
        if (ani) {
            ani.stop()
            ani.removeSelf()
            this.aniList.splice(index,1)
        }
    }

    
    public clearAll(){
        Laya.timer.clearAll(this)
        for(var k in this.aniList){
            let v = this.aniList[k]
            v.stop()
            if(v.parent){
                v.removeSelf()
            }
        }
        this.aniList = []
    }
   
}