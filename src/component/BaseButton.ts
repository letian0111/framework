module component {
    /**     
     * 基础按钮控件，实现click监听事件
     */
    var Button = laya.ui.Button;
    export class BaseButton extends Button {
        /**
        * 音效类型
        */
        public soundType: number = 1;
        constructor(skin: string = null, label: string = "") {
            super(skin, label);
            this.on(Laya.Event.CLICK, this, this.onTouch);
            this.on(Laya.Event.DOUBLE_CLICK, this, this.onTouch);
        }

        private onTouch(e: Laya.Event): void {
            if (e) {
                switch (e.type) {
                    case Laya.Event.CLICK:
                    case Laya.Event.DOUBLE_CLICK:
                         SoundManager.instance.playBtnEffect(this.soundType);
                        break;
                }
            }
        }
    }
}