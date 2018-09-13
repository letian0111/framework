/*
* @author seacole
 * 我的俱乐部Renderer
*/
module club {
	export class ClubHallListRenderer extends ui.club.ClubHallListRendererUI {
		constructor() {
			super();
		}

		/**
	 * cid
	 * title
	 * role 100创始人
	 * cnt 总人数
	 * currcnt 当前人数
	 * gcnt 比赛数
	 */
		public updata(): void {
			this._lb_game_name.text = StringUtils.format(GameConfig.language.club_search_1, this.dataSource.cid);
			log(this._dataSource)
			this._lb_number.text = this._dataSource.currmem;
			this._bg.skin = "club/panel/img_club_1.png"
			if (this._dataSource.choice == 1) {
				this._bg.skin = "club/panel/img_club_2.png"
			}
			// this._labCount.text = StringUtils.format(GameConfig.language.club_game_1, this.dataSource.gcnt?this.dataSource.gcnt:0);
			// this._imgOwner.visible=ClubManager.isCreator(this.dataSource.role);
		}

	}
}