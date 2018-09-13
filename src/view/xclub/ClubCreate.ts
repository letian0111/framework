/*
* @author seacole
 * 俱乐部创建
*/
module club {
	export class ClubCreate extends BaseCtrl {
		constructor() {
			super();
			this["name"] = "ClubCreate";

		}

		private static _instance: ClubCreate;
		static get instance(): ClubCreate {
			if (!this._instance)
				this._instance = new ClubCreate();
			return this._instance;
		}
        
		protected _cid:number
		protected _ui: ui.club.ClubCreateUI;
		protected show_disband:boolean
		protected _name: string
		protected _notice: string
		protected _room: number
		protected _check: number

		public show(cid?): void {
			this.showself();
			if (cid) {
				this._cid = cid
				this.show_disband = true
			}
			else {
				this._cid = null
				this.show_disband = false
			}
			// super.onShow();
			this.initCreateParams()
		}

		protected onResize(): void {
			this._ui.height = AppControl.getInstance().stage.height;
			this._ui.width = AppControl.getInstance().stage.width > 1280 ? 1280 : AppControl.getInstance().stage.width;
			this._ui.centerX = 100
			this._ui.centerY = 0
		}

		public beforeShow(): void {
			if (!this._ui) {
				this._ui = new ui.club.ClubCreateUI();
				EventManager.instance.registerOnObject(this, this._ui._btnCreate, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_disband, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_choice_1, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_choice_2, Laya.Event.CLICK, this, this.onTouch);
				EventManager.instance.registerOnObject(this, this._ui._btn_choice_3, Laya.Event.CLICK, this, this.onTouch);
				// EventManager.instance.registerOnObject(this, this._ui._close, Laya.Event.CLICK, this, this.hide);
				EventManager.instance.registerOnObject(this, this._ui._mask, Laya.Event.CLICK, this, this.hide);
				EventManager.instance.registerOnObject(this, this._ui._input_name, Laya.Event.INPUT, this, this.onNameChange);
				EventManager.instance.registerOnObject(this, this._ui._input_notice, Laya.Event.INPUT, this, this.onNoticeChange);
				EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.CLUB_CREATE_SUCC, this, this.onCreateSucc);
			}
			super.beforeShow();
			this.onShow();
		}

        /**
        * 开启监听，配置宽高，添加到舞台
        */
		public onShow(): void {		
			super.onShow();
			this.onResize()
			this.initCreateParams()			
			this.tweenSelf();
		}
        
        public initCreateParams():void {
            this._name = ""
            this._notice = ""
            this._room = 0
            this._check = 1
			this._ui._input_name.text = ""
			this._ui._input_notice.text = ""
			if (this._cid) {
				let info = ClubManager.getClubByCid(this._cid)
				this._name = info.title
				this._notice = info.notice
				this._room = info.game_type || 0
				this._check = info.join_type || 0
			}

            this._ui._input_name.prompt = "请输入俱乐部昵称";
            this._ui._input_notice.prompt = "请输入俱乐部公告";

            this._ui._btn_disband.visible = false
            if (this.show_disband) {
            	this._ui._btn_disband.visible = true
            }
            this._ui.choice_1.visible = (this._room == 0)
	        this._ui.choice_2.visible = (this._room == 1)
			this._ui.choice_3.visible = (this._check == 1)

			if (this._name && this._name.length > 0) {
				this._ui._input_name.prompt = ""
				this._ui._input_name.text = this._name
			}
			if (this._notice && this._notice.length > 0) {
				this._ui._input_notice.prompt = ""
				this._ui._input_notice.text = this._notice
			}
        }

        /**
         * 离开时调度
         */
		public afterShow(): void {
			super.afterShow();
		}
        
        // 输入俱乐部名字
		private onNameChange(e: Laya.Event): void {
			var flag: boolean;
			while (Utils.getCharCodeLength(this._ui._input_name.text) > 64) {
				flag = true;
				this._ui._input_name.text = this._ui._input_name.text.substring(0, this._ui._input_name.text.length - 1);
			}
			if (flag)
				HintCtrl.instance.show(GameConfig.language.match_name_too_long);
		    this._name = this._ui._input_name.text
		}
        
        // 输入俱乐部公告
        private onNoticeChange(e: Laya.Event): void {
			var flag: boolean;
			while (Utils.getCharCodeLength(this._ui._input_notice.text) > 300) {
				flag = true;
				this._ui._input_notice.text = this._ui._input_notice.text.substring(0, this._ui._input_notice.text.length - 1);				
			}
			if (flag)
				HintCtrl.instance.show(GameConfig.language.match_name_too_long);
		    this._notice = this._ui._input_notice.text
		}

		private onTouch(e: Laya.Event): void {
			switch (e.currentTarget) {
				case this._ui._btnCreate:
				    if (this.show_disband) {
                        this._name = Utils.removeHeadAndEndSpace(this._name);
						if (this._name && this._name.length > 0)
							ClubAlert.instance.show(StringUtils.format(GameConfig.language.club_setting_1, this._name), this, this.setting, this._cid, this._name, this._notice, this._room, this._check);
						else
							AlertInGameCtrl.instance.show(GameConfig.language.club_setting_2,null,0,false);
				    }
				    else {
						this._name = Utils.removeHeadAndEndSpace(this._name);
						this._notice = Utils.removeHeadAndEndSpace(this._notice);
						if (this._name && this._name.length > 0)
							if (this._notice && this._name.length > 0)
								ClubAlert.instance.show(StringUtils.format(GameConfig.language.club_create_1, this._name), this, this.create, this._name, this._notice, this._room, this._check);
							else
								AlertInGameCtrl.instance.show(GameConfig.language.club_create_4,null,0,false);
						else
							AlertInGameCtrl.instance.show(GameConfig.language.club_create_2,null,0,false);

					}
                    break
				case this._ui._btn_disband:
				    ClubAlert.instance.show(StringUtils.format(GameConfig.language.club_disband_1, this._name), this, this.disBandClub);
				    break

			    case this._ui._btn_choice_1:
			        this._room = 0
			        this._ui.choice_1.visible = true
			        this._ui.choice_2.visible = false
			        break

			    case this._ui._btn_choice_2:
			        this._room = 1
			        this._ui.choice_1.visible = false
			        this._ui.choice_2.visible = true
			        break

			    case this._ui._btn_choice_3:
			        this._check = 1 - this._check
			        this._ui.choice_3.visible = (this._check == 1)
			        break
			}
		}

		private create(params:any[]): void {
			var title:string = params[0]
			var notice:string = params[1]
			var room:number = params[2]
			var check:number = params[3]
			ClubManager.createClub(title, notice, room, check);	
		}

		private setting(params:any[]): void {
			var cid:number = params[0]
			var title:string = params[1]
			var notice:string = params[2]
			var room:number = params[3]
			var check:number = params[4]
			ClubManager.settingClub(cid, title, notice, room, check);
		}

		private onCreateSucc():void{
			this.hide();
		}

		private disBandClub():void {
            ClubManager.deleteClub(this._cid)
			this.hide()
		}

	}
}