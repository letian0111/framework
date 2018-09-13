/*
* @author seacole
* 倒计时的钟;
*/
module poker {
	export class Clock extends ui.poker.PokerClockUI {
		constructor() {
			super();
			this.init();
		}

		protected init(): void {
			this._num.value = "0"
			// this._fontData = new laya.ui.FontClip("poker/daojishi.png","0123456789")
			// // new FontData();
			// // this._fontData.init(FontConfig.FONT_GUANPAI_1, Laya.loader.getRes(ResourceConfig.BITMAP_FONT_GUANPAI1_JSON),
			// // 	Laya.loader.getRes(ResourceConfig.BITMAP_FONT_GUANPAI1_PNG), 50, BPFont.CENTER, FontData.TYPE_TIME, false);
			// // this._fontData.text = "0";
			// // this._bpFont = FontManager.instance.addFont(this._fontData);
			// // this.addChild(this._bpFont);
			// this.addChild(this._fontData)
			// this._fontData.pos(25, 28);
		}

		protected _fontData;
		protected _bpFont: BPFont;
		protected _time

		public set time(value: number) {
			this.ani1.stop();
			// this._bpFont.start(value);
			this._num.value = String(value)
			this._time = value
			Laya.timer.loop(1000,this,this.showtime)
			// this._fontData.value = value
			if (value > 5) {
				Laya.timer.clear(this, this.onWarn);
				Laya.timer.once(value * 1000 - 5000, this, this.onWarn);
			}
			else
				this.ani1.play(0, true);
		}

		protected showtime(){
			this._time --
			if (this._time < 0) this._time = 0
			this._num.value = String(this._time)
			if (this._time == 0){
				Laya.timer.clear(this, this.showtime);
			}
		}

		protected onWarn(): void {
			SoundManager.instance.playEffect("timeup", 0);
			this.ani1.play(0, true);
		}


		public stop(): void {
			Laya.timer.clear(this, this.onWarn);
			// this._bpFont.stop();
			Laya.timer.clear(this, this.showtime);
			this._num.value = "0"
			this.ani1.stop();
		}


	}
}