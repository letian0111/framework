/*
* @author seacole
 * 俱乐部成员戏列表
*/
module club {
	export class ClubListReviewMemberRenderer extends ui.club.ClubListMemberRendererUI {
		constructor() {
			super();
		}

		public updata(): void {
				this._labelNickName.text = this.dataSource.nk ? this.dataSource.nk : "俱乐部成员对对对";
			

			var sex: number = this.dataSource.sex ? this.dataSource.sex : 1;
			// this.dataSource.avatar = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515770253325&di=47c9309c74a192b47bde773bcf2f135c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F500fd9f9d72a6059099ccd5a2334349b023bbae5.jpg";
			if (this.dataSource.avatar) {
				this._imgHead.loadImage(this.dataSource.avatar, 0, 0, 66, 66);
			}
			else{
				this._imgHead.skin = "tongyong/tongyong_avatar_male.png"
			}

			if(this.dataSource.uid){
				this._labelUid.text = this.dataSource.uid
			}
			if(this.dataSource.ltime){
				
				this._labelTime.text =TimeUtils.Format("yyyy-MM-dd \n   hh:mm",this.dataSource.ltime)
			}
			else
			{
				this._labelTime.text="时间未知"
			}
			//需要功能
			this._labelPlace.visible =false
			this._labelBeizhu.visible = false
			//this._labelTime.visible =false
			this._imgNoplay.visible = false
			//屏蔽隐藏
			this._labelStatus.visible = false
			this._btnOpt.visible = false




		}
	}
}