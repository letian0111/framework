/*
* @author seacole
* 比赛报名奖励Renderer;
*/
module matchSign {
	export class MatchSignRewardRenderer extends ui.matchSign.MatchSignRewardRendererUI {
		constructor() {
			super();
		}
		private HB = 2
		private ZS = 1
		public updata(): void {
			if (this.dataSource) {
				this._no.text = this.dataSource.name;
				this._desc.text = "";
				if(this.dataSource.type == this.HB){
					this._desc.text = this._desc.text + this.dataSource.amount + "元红包"
				}

				if(this.dataSource.type == this.ZS){
					this._desc.text = this._desc.text + this.dataSource.amount + "颗钻石"
				}

			}
		}

		public set selected(value: boolean) {
			// this._btn.selected = value;
		}
	}
}