class ChatContent extends ui.panel.ChatContentUI {
    constructor() {
        super();
        Dispatcher.on(EventNames.PLAY_RECORD_END, this, this.onPlayRecordEnd);

        // this.init(info)

    }
    private dir
    private _chatType
    private _popleft
    private _seatid
    // private rotationList = [[], [], [0, 0, 0], [0, 0, 0, 0]]
    // private contentRotation = [[], [], [0, 0, 0], [0, 0, 0, 0]]
    private emojiCenterXList = [[], [0, 0], [100, -10, 100], [100, -10, -100, 3]]
    private emojiCenterYList = [[], [0, 0], [20, -30, 20], [20, -30, -10, -5]]
    private mesCenterXList = [[], [0, 0], [0, 0, 0], [0, 0, -120, 0]]
    private mesCenterYList = [[], [0, 0], [0, 0, 0], [0, 0, -200, 0]]
    private centerXList = [[], [0, 0], [0, 0, 3], [0, 0, 0, 3]]
    private centerYList = [[], [-7, -3], [-7, -8, -8], [-7, -8, -8, -8]]
    public static CHAT_EMOJI = [ResourceConfig.ANI_EMOJI_1,ResourceConfig.ANI_EMOJI_2,ResourceConfig.ANI_EMOJI_3, ResourceConfig.ANI_EMOJI_4,
     ResourceConfig.ANI_EMOJI_5, ResourceConfig.ANI_EMOJI_6,ResourceConfig.ANI_EMOJI_7,ResourceConfig.ANI_EMOJI_8]
    public static CHAT_EMOJI_TIME = [1,1,0.9,0.9,0.8,1,0.6,0.8]


    //private _emojiAni: ui.panel.EmojiUI
    private _chatRecord: ui.components.chat.ChatRecordUI;
    public set popleft(position) {
        this._popleft = position
        if (position == 1) {
            this._bg.visible = false
            this._bgEmoji.visible = false
        } else {
            this._bgEmojiLeft.visible = false
            this._bgLeft.visible = false
        }
    }
    public init(info, dir, seatid) {
        Laya.timer.clearAll(this)
        this.dir = dir
        this._seatid = seatid
        switch (info.chatType) {
            case GameDef.CHAT_TYPE.EMOJI:
                Laya.timer.clear(this, this.clear)
                this._bg.visible = false
                this._bgLeft.visible = false
                // if (!this._emojiAni) {
                //     this._emojiAni = new ui.panel.EmojiUI()
                this._bgEmoji.visible = false
                //     this.addChild(this._emojiAni)
                //     this._emoji.visible = false
                this._bgEmojiLeft.visible = false

                let ani_x,ani_y
                if (this._popleft == 1) {
                    ani_x = this._bgEmojiLeft.x-50
                    ani_y = this._bgEmojiLeft.y+60
                } else {
                    ani_x = this._bgEmoji.x+60
                    ani_y = this._bgEmoji.y+60
                }
                            
                AniEffectManager.instance.playEffect(this, true,ChatContent.CHAT_EMOJI[parseInt(info.chatContent)],2*ChatContent.CHAT_EMOJI_TIME[parseInt(info.chatContent)]*1000,{x:ani_x, y:ani_y},function(){
                    this.clear()
                }.bind(this))
                //}
                this.clear()
                break
            case GameDef.CHAT_TYPE.QUICK_MESSAGE:
                Laya.timer.clear(this, this.clear)
              
                this._bgEmoji.visible = false
                this._bgEmojiLeft.visible = false
                // if(!!this._emojiAni){
                //     this._emojiAni.visible = false
                // }
                if (this._popleft == 1) {
                    this._bgLeft.visible = true
                    this._messageLeft.text = GameDef.CHAT_MESSAGE[BaseGameData.gameType][parseInt(info.chatContent)]
                    this._messageLeft.right = 21 + this._messageLeft.width
                    this._bgLeft.width = this._messageLeft.width + 45
                } else {
                    this._bg.visible = true
                    this._bgLeft.visible = false
                    this._message.text = GameDef.CHAT_MESSAGE[BaseGameData.gameType][parseInt(info.chatContent)]
                    this._bg.width = this._message.width + 45
                }
                let player = BaseGameData.getPlayerDataBySeatid(this._seatid)
                let sex = player ? player.sex : 1
                SoundManager.instance.playEffect("message_" + info.chatContent, sex)
                this.clear()

                break

            case GameDef.CHAT_TYPE.RECORD:
                Laya.timer.clear(this, this.clear)
                this._bgEmoji.visible = false
                this._bgEmojiLeft.visible = false
                if (!this._chatRecord)
                    this._chatRecord = new ui.components.chat.ChatRecordUI();
                this._chatRecord.ani1.play(1, true);
                if (this._popleft == 1) {
                    this._bgLeft.visible = true
                    this._messageLeft.text = ""
                    this._bgLeft.width = 70
                    this._bgLeft.addChild(this._chatRecord);
                } else {
                    this._bg.visible = true
                    this._message.text = ""
                    this._bg.width = 70;
                    this._bg.addChild(this._chatRecord);
                }
                this._chatRecord.centerX = 0;
                this._chatRecord.centerY = 0;
                break;
        }
    }

    private getContentBox() {
        // this._bg.rotation = this.rotationList[BaseGameData.maxPlayer - 1][this.dir - 1]
        if (this.dir == 2)
            this._bg.scaleX = -1
    }
    private onPlayRecordEnd(): void {
        if (this._chatRecord)
            this._chatRecord.ani1.stop();
        this._chatRecord.removeSelf();
        this.visible = false;
    }

    private clear() {
        Laya.timer.once(2000, this, function () {
            this.visible = false
        })
    }


}