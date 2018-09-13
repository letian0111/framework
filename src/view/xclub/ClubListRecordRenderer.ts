/*
* @author seacole
 * 俱乐部战绩列表
*/
module club {
	export class ClubListRecordRenderer extends ui.club.ClubListRecordRendererUI {
		constructor() {
			super();
		}

		public updata(index): void {
			let totalData = this._dataSource.info
			this._label_num.text = (index + 1)
			this._imgType.skin = "common/title_gameType_" + this._dataSource.gtype + ".png"
			this._labelRule.text = this._dataSource.hand_cnt+"局"
			this._labelRoomid.text = StringUtils.format(GameConfig.language.room_id, this._dataSource.gcode);
			this._labelTime.text = TimeUtils.timeChange(this.dataSource.end_time * 1000);
			// 得分情况
			let datas = JSON.parse(totalData)
			let infos = []
			for (let k in datas) {
				let info = datas[k]
				infos.push(info)
			}
			for (let i = 0; i < infos.length; i++) {
				let info = infos[i]
				let k = i+1
				this["_player_"+k].visible = true
				this["_lb_name_"+k].text = info.nk
				this["_lb_uid_"+k].text = info.uid
				// this["_lb_score_"+k].text = info.score
				if (info.score > 0) {
					this["_lb_score_"+k].color = "#FF0000"
					this["_lb_score_"+k].text = "+" + info.score
				}
				else {
					this["_lb_score_"+k].color = "#1d1d1d"
					this["_lb_score_"+k].text = info.score
				}
			}
		}
	}
}