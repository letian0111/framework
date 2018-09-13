  
  //骨骼动画管理类  
    class SkeletonAniManager {
    private skeletonAniList = []
    constructor() {
        this.skeletonAniList = []
    }

    private static _instance: SkeletonAniManager;
    public static get instance(): SkeletonAniManager {
        if (!this._instance) {
            this._instance = new SkeletonAniManager();
        }
        return this._instance;
    }
    /**
     * 
     * @param target        //添加动画的父类
     * @param res           //资源路径
     * @param loop          //是否循环
     * @param delay         //延迟时间
     * @param pos           //位置
     * @param callback      //回调
     * @param nameOrIndex   //动画名字或者索引
     */
    public playSkeletonAni(target, res,loop, delay, pos, callback?,nameOrIndex?,zOrder?){

         let templet = new Laya.Templet();
         let paramarray = [templet,target,loop,delay,pos,callback,nameOrIndex]
         templet.on(Laya.Event.COMPLETE, this, this.parseComplete,paramarray);
         templet.on(Laya.Event.ERROR, this, this.onError);
         templet.loadAni(res);

    }
    onError() {
        console.log("parse error");
    }
    parseComplete(templet,target,loop,delay,pos,callback,nameOrIndex,zOrder) {
        // let paramarray = [templet,target,loop,delay,pos,callback,nameOrIndex]
        // //创建第一个动画
        var skeleton0: Laya.Skeleton;
        //从动画模板创建动画播放对象
        skeleton0 = templet.buildArmature(0);
        skeleton0.x=pos.x
        skeleton0.y=pos.y

       
        if(nameOrIndex){
            skeleton0.play(nameOrIndex,loop)
        }else
        {
            skeleton0.play(0,loop)
        }
        target.addChild(skeleton0);

        if (zOrder) {
            skeleton0.zOrder = zOrder
        }


        //let index = this.skeletonAniList.length
        if(delay>0){
            Laya.timer.once(delay*1000, this,this.delayCallBack,[skeleton0,callback],false)

        }
        else
        {   
             //骨骼动画只播放一次时的结束回调
            skeleton0.player.on(Laya.Event.STOPPED,this,this.delayCallBack,[skeleton0,callback]);
        }
      
        //骨骼动画重复播放每次都回调
       //skeleton0.player.on(Laya.Event.COMPLETE,this,this.onComplete);
       
    }
    delayCallBack(skeleton,callback) {
        let index = this.skeletonAniList.length
        skeleton.removeSelf()
        skeleton.destroy()

        this.skeletonAniList.splice(index,1)
         if(callback)
                callback()
    }
    public clearAll(){
        Laya.timer.clearAll(this)
        for(var k in this.skeletonAniList){
            let v = this.skeletonAniList[k]
            v.stop()
            if(v.parent){
                v.removeSelf()
                v.destroy()
            }
        }
        this.skeletonAniList = []
    }

}