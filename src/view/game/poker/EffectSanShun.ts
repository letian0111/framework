/*
 * @author seacole
 * 双顺动画
*/
module poker {
	export class EffectSanShun extends ui.poker.sanlianduiUI {
		constructor() {
			super();			
		}
		private static _pool:ObjectPool;

		public static borrow(): poker.EffectSanShun {
			if (!EffectSanShun._pool)
				EffectSanShun._pool = ObjectPool.getInstance("poker.EffectSanShun", Laya.ClassUtils.getClass(poker.EffectSanShun));
			return EffectSanShun._pool.borrowObject() as poker.EffectSanShun;
		}

		public static return(effect: poker.EffectSanShun): void {
			if (EffectSanShun._pool)
				EffectSanShun._pool.returnObject(effect);
		}
		public play(scale:number):void
		{					
			this.scale(scale,scale);	
			this.ani1.play(1,false);		
			this.ani1.on(Laya.Event.COMPLETE,this,this.onComplete);	
		}

		private onComplete():void
		{
			this.ani1.off(Laya.Event.COMPLETE,this,this.onComplete);
			this.ani1.stop();
			this.removeSelf();
		}
	}
}