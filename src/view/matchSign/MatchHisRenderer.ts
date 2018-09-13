/*
* @author seacole
* 比赛奖励Renderer;
*/
module matchSign {
	export class MatchHisRenderer extends ui.matchSign.MatchHistoryRendererUI {
		constructor() {
			super();
		}


		public updata(): void {
			if (this.dataSource) {
				this._time.text = TimeUtils.timeChange(this.dataSource.end_time * 1000)
				this._award.visible = false
				this._award.label = ""
				this._labRank.text = this.dataSource.title + "中获得第"+this.dataSource.rank+"名"
				if(this.dataSource.sys){
					MatchSignData.getReward(this.dataSource.sys,function(data){
						let hasreward = false
						for(var k in data){
							let v = data[k]
							if (this.dataSource.rank <= v.end_rank){
								hasreward = true
								if (v.type == 2){
									this._labRank.text = this._labRank.text + "获得" + v.amount+ "元红包"
								}else{
									this._labRank.text = this._labRank.text + "获得" + v.amount+ "颗钻石"
								}
								break;
							}
						}
						if (hasreward){
							this._award.visible = true
							if(this.dataSource.award == 0){
								this._award.skin = "matchSign/award_1.png"
							}else{
								this._award.skin = "matchSign/award_2.png"
							}
						}else{
							this._award.visible = false
						}
					}.bind(this))
				}
			}
		}
	}
}