/*
* @author seacole
 * 俱乐部Renderer
*/
module club {
    export class ClubDeskRenderer extends ui.club.ClubDeskUI {
        constructor() {
            super();
        }

        private index
        private max_player
        public updata(): void {
            if (this.dataSource.create && this.dataSource.create == 1) {
                let max_player = this.dataSource.max_player ? this.dataSource.max_player : 4
                for (let i = 1; i <= 4; i++) {
                    let chair = this["_chair_" + i]
                    chair.visible = (i <= max_player)
                    let avater = this["_avatar_" + i]
                    avater.visible = false
                }
                return
            }
            let rule = this._dataSource.rule
            if (!rule) {
                return
            }
            let max_player = 0
            for (let v of rule) {
                if (v.key == "max_player") {
                    max_player = v.value
                }
            }
            for (let i = 1; i <= 4; i++) {
                let chair = this["_chair_" + i]
                chair.visible = (i <= max_player)
            }
            this.index = 0
            this._img_desk.zOrder = 0
            this.showInfo()
        }

        private showInfo() {
            let uids = this.dataSource.uids
            // let uid = uids[this.index]
            for (var index = 0; index < 4; index++) {
                let num = index+1
                this["_avatar_"+num].visible = false
                this["_player_"+num].visible = false
            }
            for (var index = 0; index < uids.length; index++) {
                let uid = uids[index]
                if (!uid) {
                    return
                }
                if (index >= 4) {
                    return
                }
                let role = RoleManager.getRole(uid)
                if (role) {
                    this.showPlayer(RoleManager.getRole(uid),index+1)
                }
            }

        }
        private showPlayer(info,index) {
            if (!this.dataSource) {
                return
            }
           
            if (index > this.dataSource.uids.length) {
                return
            }
            this["_chair_" + index].visible = false
            this["_player_" + index].visible = true
            this["_avatar_" + index].visible = true
            this["_player_" + index].text = Utils.getFitNickName(info.nickname, 8)

            var sex: number = info.sex ? info.sex : 1;
            // chair.skin = "tongyong/tongyong_avatar_male.png"
            // this.dataSource.avatar = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515770253325&di=47c9309c74a192b47bde773bcf2f135c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F500fd9f9d72a6059099ccd5a2334349b023bbae5.jpg";
            
            if (info.avatar) {
                this["_avatar_" + index].loadImage(info.avatar, 0, 0, 66, 66);                
            }
            else {
                this["_avatar_" + index].skin = "tongyong/tongyong_avatar_male.png"
                this["_avatar_" + index].width = 66
                this["_avatar_" + index].height = 66
            }
        }
    }
}