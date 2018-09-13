/*
* @author seacole
 * 俱乐部
*/
module club {
	export class ClubHallList extends ui.club.clubHallListUI {
		constructor() {
			super();
			this["name"] = "ClubHallList";
		}
        
        private _p
		public show(p: Laya.View): void {
			this._p = p
			this.init()
		}
        
        /**
         * 这里完成new ui，添加注册监听等初始化工作
         */
		public init(): void {
			this._club_list.itemRender = MyClubListRenderer;
			this._club_list.scrollBar.elasticDistance = 100;
			this._club_list.scrollBar.visible = false;
			this._club_list.renderHandler = new Laya.Handler(this, this.updateList);
			this._club_list.array = [];
			this._club_list.mouseHandler = new Laya.Handler(this, this.selectList);
			EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_DELETE_SUCC, this, this.onUpdateClub);
		    EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_QUIT_SUCC, this, this.onUpdateClub);
            ClubManager.getMyClub();
		}


		/***渲染单元格时的回调方法***/
		protected updateList(cell: ClubListRenderer, index: number): void {
			cell.updata();
		}

		private selectList(e: Laya.Event, index: number): void {
			if (e.type == Laya.Event.CLICK) {
				let data = this._club_list.array[index]
				ClubCtrl.instance.show(this._p, data.cid)
			}
		}

		public onUpdateClubList(): void {
			this._img_no_club.visible = true
			if (ClubManager.myClubs && ClubManager.myClubs.length) {
				this._club_list.array = ClubManager.myClubs;
				log(this._club_list.array)
				if (this._club_list.array.length > 0) {
					this._img_no_club.visible = false
				}
			}
			else {
				this._club_list.array = [];
			}
		}

		public onUpdateClub():void {
			ClubManager.getMyClub();
		}
	}
}