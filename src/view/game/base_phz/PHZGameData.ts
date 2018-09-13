module base_phz{
    export class PHZGameData extends BaseGameData {
        constructor() {
            super();
        }
        public static init(): void {
            super.init()
        }

        public static flopCard:number;
        public static stackCards = []
        public static winType:number;
        public static endType:number;
        public static loser_seatid:number;
        public static handMax = 9;
        public static foldCard = []
        public static tingInfos = []

        // 初始牌
        public static startCardMove(msg: any): void {
            var infos = msg.playerInfo;
            if (infos[0].seatid != BaseGameData.selfSeatid) {
                return
            }
            var seatinfo = this.getPlayerDataBySeatid(BaseGameData.selfSeatid)
            for (let k in infos[0].cards){
                let item = infos[0].cards[k]
                let copy = []
                for (let i = 0; i < item.cards.length; i++){
                    copy[i] = item.cards[i]
                }
                seatinfo.handCards.push(copy)
            }
            // log(seatinfo.handCards)
            // log([BaseGameData.leftCard, msg.globalInfo])
            BaseGameData.leftCard = BaseGameData.leftCard - parseInt(msg.globalInfo);
        }

        public static onReconnectInfoHandler(msg: any): void {
            super.onReconnectInfoHandler(msg);
            for (var k in msg.gameplayer) {
                let info = msg.gameplayer[k]                
                let player = BaseGameData.getPlayerDataByUid(info.uid)
                player.huxi = info.huxi || 0
                player.handCards = []
                this.tingInfos = []
                for (var j in info.cards) {
                    let cardSet = info.cards[j]
                    cardSet.opttype = cardSet.opttype || 0
                    cardSet.cards = cardSet.cards || []
                    if (cardSet.opttype == GameDef.OptType.MJ_DRAW) {
                        if (cardSet.cards.length > 0) {
                            player.handCards.push(cardSet.cards)
                        }
                    }
                    if (cardSet.opttype == GameDef.OptType.MJ_TING) {
                        let info = [
                            cardSet.cards[0],
                            cardSet.fromSeatid,
                            cardSet.count,
                        ]
                        this.tingInfos.push(info)
                    }
                }
                Dispatcher.dispatch(EventNames.PLAYER_DATA_CHANGED, player.uid);
            }
            this.flopCard = msg.cards[0]
        }
        
        public static removeCardByIndex(index, newidx){
            if (!index || index.length < 2) {
                return
            }
            let x = index[0]
            let y = index[1]
            let playerInfo = this.getPlayerDataBySeatid(BaseGameData.selfSeatid)
            let handCards = playerInfo.handCards
            let group = handCards[x] || []
            if (group.opttype) {
                return
            }
            let card = group.splice(y, 1)
            if (group.length == 0){
                if (!newidx || newidx[0] != x) {
                    handCards.splice(x, 1)
                }                
                if (newidx && x < newidx[0]) {
                    newidx[0]--
                }
            }
            return card
        }

        public static InsertCardByIndex(cards, index){
            let card = cards[0]
            if (!card) {
                return
            }
            let x = index[0]
            let y = index[1]
            let playerInfo = this.getPlayerDataBySeatid(BaseGameData.selfSeatid)
            let handCards = playerInfo.handCards
            if (x >= handCards.length){
                x = handCards.length
                handCards[x] = []
            }
            let group = handCards[x]
            if (group.length == 0 || group.length <= y) {
                 group.push(card)
            }
            else{
                group.splice(y, 0, card)
            }                   
        }
        
        public static setOptSeatid(seatid){
            this.optSeatid = seatid
        }

        public static cardMove(msg) {
            let info = msg
            let playerInfo = super.getPlayerDataBySeatid(info.toSeatid)
            // log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
            // if (playerInfo) {
            //     log(playerInfo.handCards)
            // }
            if (!info.areaid) {
                BaseGameData.leftCard = BaseGameData.leftCard - msg.cards.length;
            }
            if (info.areaid == GameDef.AREA_TYPE.HAND_CARD) {
                if (msg.opttype == GameDef.OptType.MJ_PIAO) {
                    BaseGameData.leftCard = BaseGameData.leftCard - msg.cards.length;
                }
            //     for (let i in playerInfo.handCards) {
            //         let group = playerInfo.handCards[i]
            //         if ((group[0]%100 == group[1]%100) && (group[0]%100 == card%100)) {
            //             group.push(card[0])
            //             triplet = true
            //             index = i
            //         }
            //     }
            //     if (!triplet) {
            //         let double = false
            //         for (let i in playerInfo.handCards) {
            //             let group = playerInfo.handCards[i]
            //             if (group.length < 3) {
            //                 if (group[0]%100 == card[0]%100){
            //                     group.splice(0, 0, card[0])
            //                 }
            //                 else if (group[1]%100 == card[0]%100){
            //                     group.splice(1, 0, card[0])
            //                 }
            //             }
            //             double = true
            //         }
            //         if (!double) {
            //             if (playerInfo.handCards.length < this.handMax) {
            //                 playerInfo.handCards.push(msg.cards)
            //             }
            //             else {
            //                 playerInfo.handCards[this.handMax-1].push(msg.cards[0])
            //             }
            //         }
            //     }
            //     else {
            //         let groups = playerInfo.handCards.splice(index, 1)
            //         let group = groups[0]
            //         if (group) {
            //             for (let i = 0; i< playerInfo.handCards.length;i++) {
            //                 let tiles = playerInfo.handCards[i]
            //                 if (tiles[0]%100 > group[0]%100 && group) {
            //                     playerInfo.handCards.splice(i, 0, group)
            //                     group = null
            //                     break
            //                 }
            //             }                    
            //             playerInfo.handCards.push(group)
            //         }
            //     }
                
                //---------------------挖坑用到--------------------
                if (playerInfo.uid != server.uid && msg.cards && msg.opttype == GameDef.OptType.SHOW_CARDS) {
                    playerInfo.handCardCount += msg.cards.length;
                }
                //---------------------挖坑用到--------------------
                Dispatcher.dispatch(EventNames.PLAYER_DATA_CHANGED, playerInfo.uid);
                // for (var k in info.cards){
                //     let v = info.cards[k]
                //     seatinfo.handCards.push(v)
                //     // if (BaseGameData.isRecord == 1){
                //         BaseGameData.leftCard = BaseGameData.leftCard - 1
                //     // }
                // }
            } else if (info.areaid == GameDef.AREA_TYPE.FOLD_CARD && info.opttype != GameDef.OptType.RECONNECT) {
                this.removeHandCards(info)           
                playerInfo.foldCards.push(info.cards[0])
                BaseGameData.discards.push(info.cards[0])
            } else if (info.areaid == GameDef.AREA_TYPE.HOLD_CARD) {
                if (info.count && info.count > 0) {
                    playerInfo.huxi = playerInfo.huxi || 0
                    playerInfo.huxi = playerInfo.huxi + info.count
                    PlayerManager.instance.addHuxi(info.toSeatid, info.count)
                }
                this.foldCard = []
                let opt = {
                    opttype: info.opttype,
                    cards: info.cards,
                    fromSeatid: info.fromSeatid
                }
                let count = 2
                if (info.opttype == GameDef.OptType.MJ_CHI || info.opttype == GameDef.OptType.MJ_PENG) {
                    count = info.cards.length - 1
                    BaseGameData.discards.pop()
                } else if (info.opttype == GameDef.OptType.MJ_MNGANG) {
                    BaseGameData.discards.pop()
                    count = 3
                } else if (info.opttype == GameDef.OptType.MJ_ANGANG) {
                    count = info.cards.length
                } else if (info.opttype == GameDef.OptType.MJ_PENGGANG) {
                    count = 1
                }

                this.removeCard(playerInfo, info.cards)

                if (info.opttype < GameDef.OptType.MJ_ANGANG) {
                    let fromSeatInfo = BaseGameData.getPlayerDataBySeatid(info.fromSeatid)
                    let foldIndex = fromSeatInfo.foldCards.pop()
                }
                for (let i = 0; i < info.cards.length / 3; i++){
                    let c = info.cards
                    let opt1 = {
                        opttype: info.opttype,
                        cards: [c[i], c[i+1], c[i+2]],
                        fromSeatid: info.fromSeatid
                    }
                    
                    playerInfo.holdCards.push(opt1)
                }
                
            
            } else if (info.areaid == GameDef.AREA_TYPE.TING_CARD) {
                let length = 0
                let i = 0
                let tingKey
                let count = 0
                let winIndex
                for (var k in info.cards) {
                    let v = info.cards.info[k]
                    if (k == "0" || parseInt(k) == count + length + 1) {
                        length = v
                        i = 0
                        count = parseInt(k)
                    } else if (parseInt(k) < count + length + 1) {
                        if (i == 0) {
                            tingKey = v % 100
                            BaseGameData.tingCards.push(tingKey)
                            BaseGameData.tingInfo[tingKey] = []
                        } else {
                            BaseGameData.tingInfo[tingKey].push(v)
                        }
                        i++
                    }
                }
            } else if (info.areaid == GameDef.AREA_TYPE.WIN_CARD) {
                BaseGameData.winCard = info.cards[0]
                BaseGameData.winSeatid = info.toSeatid
                // if(info.toSeatid == BaseGameData.selfSeatid){
                //     let player = BaseGameData.getPlayerDataBySeatid(info.toSeatid)
                //     let index = player.handCards.indexOf(BaseGameData.winCard)
                //     if (index >= 0){
                //         player.handCards.splice(index,1)
                //     }
                // }
                console.log("BaseGameData.winCard==========" + BaseGameData.winCard + "BaseGameData.winSeatid" + BaseGameData.winSeatid)
            } else if (info.areaid == GameDef.AREA_TYPE.FLOWER_CARD) {
                this.flopCard = info.cards[0]
            }
        }
        
        protected static removeHandCards(info: any): void {
            let p = BaseGameData.getPlayerDataBySeatid(info.toSeatid);        
            p.handCardCount -= info.cards.length;
            this.removeCard(p, info.cards)
            Dispatcher.dispatch(EventNames.PLAYER_DATA_CHANGED, p.uid);
        }
        
        protected static removeCard(p, cards) :void {
            if (p.seatid != BaseGameData.selfSeatid) {
                return
            }
            for (let k = 0; k < cards.length; k++) {
                for (let i = 0; i < p.handCards.length;i++) {
                    let group = p.handCards[i]
                    let index = group.indexOf(cards[k]);
                    if (index >= 0) {
                        group.splice(index, 1);
                    }
                }
            }
            for (let i = p.handCards.length-1; i>=0; i--){
                let group = p.handCards[i]
                if (!group || group.length == 0) {
                    p.handCards.splice(i, 1);
                }
            }
            // log(p.handCards)
        } 

        public static getHuxi(seatid) {
            let player = BaseGameData.getPlayerDataBySeatid(seatid)
            if (player && player.huxi){
                return player.huxi 
            }
            else{
                return 0
            }     
        }

        public static onShowCardsNtfHandler(msg) {
            for (var k in msg.showncards) {
                let cardInfo = msg.showncards[k]
                let player = BaseGameData.getPlayerDataBySeatid(cardInfo.seatid)
                let stacks = cardInfo.handcards
                log("@@@@@@@@@@@@@@@@@@@@@@  onShowCardsNtfHandler")
                // log(stacks)
                if (stacks && stacks.length > 0) {
                    for (let k in stacks) {
                        this.stackCards.push(stacks[k])
                    }
                }
                player.handCards = []
                player.holdCards = []
                let holds = cardInfo.holdCards
                let index
                player.handCards = []
                for (let i in holds) {
                    holds[i].opttype = holds[i].opttype || 1
                    if (holds[i].opttype == GameDef.OptType.MJ_DRAW) {
                        player.handCards.push(holds[i])
                    }
                    else {
                        player.holdCards.push(holds[i])
                    }
                }
                // if (player.seatid == BaseGameData.winSeatid && player.seatid != BaseGameData.selfSeatid){
                //     player.handCards = [BaseGameData.winCard].concat(player.handCards)
                //     // player.handCards.push(BaseGameData.winCard)
                // }
            }
        }   

         public static saveWinDetail(data) {
            for (var k in data) {
                // log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
                // log(data[k])
                let playerInfo = data[k]
                BaseGameData.winDetailObj[playerInfo.seatid] = playerInfo.info[0]
                BaseGameData.winCard = playerInfo.cards[0].cards[0]
            }
        }

        public static onGameEndNtfHandler(msg: any): void {
            BaseGameData.onGameEndNtfHandler(msg)
            this.winType = msg.win_type || 0
            this.endType = msg.table_end || 0
            // BaseGameData.isGameing = false;
            // for (var i = 0; i < msg.scores.length; i++) {
            //     var player: PlayerData = BaseGameData.getPlayerDataBySeatid(msg.scores[i].seatid);
            //     if (player) {
            //         player.reset();
            //         Utils.injectProp(player, msg.scores[i]);
            //         Dispatcher.dispatch(EventNames.PLAYER_DATA_CHANGED, player.uid);
            //     }
            // }
        }

        public static saveLoserDetail(seatid) {
            this.loser_seatid = parseInt(seatid) || 0
        }

        public static getCardsType(cards, isHand) {
            return 1
        }

        public static calcuHuxi(cards, cardType) {
            return 1
        }

        public static saveFoldCard(seatid, card) {
            if (!seatid || !card) {
                return
            }
            this.foldCard = [seatid, card]
        }

        public static getCardCnt(card) {
            let cnt = 0
            let seatid = BaseGameData.selfSeatid
            let p = BaseGameData.getPlayerDataBySeatid(seatid)
            if (p.handCards && p.handCards.length > 0) {
                for (let k in p.handCards) {
                    let group = p.handCards[k]
                    for (let i in group){
                        if (group[i] % 100 == card){
                            cnt++
                        }
                    }
                }
            }
            return cnt
        }
        
        public static getTingInfo() {
            return this.tingInfos
        }

        public static tingAllCards(msg) {
            this.tingInfos = []
            let infos = msg.playerInfo[0].info || []
            let cards = msg.playerInfo[0].cards || []
            let pre = 0
            let last = 0
            for (let k in infos) {
                let c = infos[k].value
                pre = last
                last = infos[k].sign
                this.tingInfos[c] = []
                for (let i = pre; i < last; i++) {
                    let info = cards[i]
                    let data = [
                        info.cards[0],
                        info.fromSeatid,
                        info.count,
                    ]
                    this.tingInfos[c].push(data)
                }
            }
        }
        
        public static disTingCards(c?) {
            if (c) {
                c = c % 100
                let tmp = []
                // log(this.tingInfos[c])
                for (let i in this.tingInfos[c]) {
                    let info = this.tingInfos[c][i]
                    tmp.push([info[0], info[1], info[2]])
                }
                // log(tmp)
                this.tingInfos = []
                this.tingInfos = tmp
                // log(this.tingInfos)
            }
            else {
                this.tingInfos = []
            }
        }

        public static clearData(){
            // BaseGameData.clearData()
            this.winType = null
            this.flopCard = null
            this.stackCards = []
            this.foldCard = []
            this.endType = null
            this.loser_seatid = null
            this.tingInfos = []            
             for (var k in BaseGameData.players) {
                let p = BaseGameData.players[k]
                p.huxi = 0
            }
        }
    }
}