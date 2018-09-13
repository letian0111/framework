// 桌子信息子列表
module club {
    export class ClubDeskInfoRenderer extends ui.club.ClubDeskInfoRendererUI{
        constructor(ismatch = false) {
            super();
            this["name"] = "ClubDeskInfoRenderer";
            this._match = ismatch
        }
        private _match
        private callback
        private _desc
        public _parentPanel

        public getCountView(info) {
            let view = new Laya.RadioGroup()

            view.labels = info.texts
            view.skin = "createRoom/radio_rule.png"
            view.stateNum = 2
            view.labelPadding = "0,0,0,10"
            view.labelColors = "#9B5036,#9B5036"
            view.labelFont = "Microsoft YaHei"
            view.labelBold = true
            view.labelSize = 35
            view.space = 150
            view.mouseThrough = false
            view.hitTestPrior= true;
            // view..selectedIndex
            if(info.itemSpace){
                view.space=info.itemSpace*0.45
            }
            
            if (this._dataSource[info.key] >= 0 ) {
                let value = info.value
                info.value = this._dataSource[info.key]
                
                 let index = info.values.indexOf(info.value)

                 if(index==-1){

                     info.value = value
                 }
            } else {
                info.value = info.value
            }

            if (info.value >= 0) {
                let index = info.values.indexOf(info.value)
                // console.info(info.values.indexof(info.value))
                view.selectedIndex = index
                if (info.cost && CreateRoomCtrl.instance._costs && CreateRoomCtrl.instance._costs.length) {
                    CreateRoomCtrl.instance._cost = CreateRoomCtrl.instance._costs[index]
                    log(CreateRoomCtrl.instance._cost)
                }

                if(CreateRoomCtrl.instance._costPeopleNum){
                    CreateRoomCtrl.instance._totalCost = CreateRoomCtrl.instance._cost*CreateRoomCtrl.instance._costPeopleNum
                }
            }
            this._desc[info.key] = info.des[view.selectedIndex]
            //this.addLisitener(view)
          
            return view
        }

        
        public getSelectView(info) {
            let view = new Laya.RadioGroup()

            view.labels = info.texts
            view.skin = "createRoom/radio_rule.png"
            view.stateNum = 2
            view.labelPadding = "0,0,0,10"
            view.space = 90
            view.labelColors = "#9B5036,#9B5036"

            view.labelFont = "Microsoft YaHei"
            view.labelBold = true
            view.labelSize = 35
            view.mouseThrough = false
            
            if (this._dataSource[info.key] >= 0 ) {
                let value = info.value
                info.value = this._dataSource[info.key]
                
                 let index = info.values.indexOf(info.value)

                 if(index==-1){
                     info.value = value
                 }
            } else {
                info.value = info.value
            }


            if (info.value >= 0) {
                view.selectedIndex = info.value
            }
            this._desc[info.key] = info.des[info.value]
            if (info.changeOn) {
                for (let k in info.changeOn) {
                    let v = info.changeOn[k]
                    // Dispatcher.on(k, view, this.dispatchChange.bind(this, [view, v, k, info.changeOn]));
                    for (let j in v) {
                        let att = v[j]
                        if(j == "selectedIndex")
                        {
                            if(view.numChildren>= view.selectedIndex+1){
                                continue;
                            }

                        }
                    }
                    // Dispatcher.dispatch(k,this._newCreateInfo[k])
                }
            }
            return view
        }

        public getChooseView(info) {
            let box = new Laya.Box()
            let view = new Laya.CheckBox()

            view.skin = "createRoom/checkBox_rule.png"
            view.stateNum = 2
            view.label = info.texts
            view.labelColors = "#9B5036,#9B5036"
            view.labelPadding = "0,0,0,10"
            view.labelFont = "Microsoft YaHei"
            view.labelBold = true
            view.labelSize = 35
            view.mouseThrough = false
             
            if (this._dataSource[info.key] >= 0 ) {
                let value = info.value
                info.value = this._dataSource[info.key]
                
                 let index = info.values.indexOf(info.value)

                 if(index==-1){

                     info.value = value
                 }
            } else {
                info.value = info.value
            }

            
            if (info.value >= 0) {
                if (info.value == 1) {
                    view.selected = true
                } else {
                    view.selected = false
                }
            }
            this._desc[info.key] = info.des[info.value]
            view.on("change", this, this.updateLabel, [view, info]);

            if (info.changeOn) {
                
                for (let k in info.changeOn) {
                    let v = info.changeOn[k]
                    // Dispatcher.on(k, view, this.dispatchChange.bind(this, [view, v, k, info.changeOn]));
                    
                    // for (let j in v) {
                    //     let att = v[j]
                        
                    //     view[j] = att[this._newCreateInfo[k]]
                    // }
                    // Dispatcher.dispatch(k,this._newCreateInfo[k])
                }
            }

            box.addChild(view)
            return box
        }

        public updata(): void {
            if (this.dataSource) {
                let createInfo = this.dataSource
                if (!createInfo) {
                    return
                }
                this._desc = {}
                this.removeChildren()
                // this._createInfo = 
                if (createInfo.name == "select") {
                    let view = this.getSelectView(createInfo)
                    // view.x = 150
                    // view.y = 15
                    this.addChild(view)
                    // content._content.height = view.height + 30
                    // content.height = view.height + 40
                } else if (createInfo.name == "choose") {
                   
                    let view = this.getChooseView(createInfo)
                    // view.x = 150
                    // view.y = 15
                    this.addChild(view)
                    // content._content.height = view.height + 65
                    // content.height = view.height + 75
                } else if (createInfo.name == "chooseAndSelectselect") {
                    let view = this.getSelectView(createInfo)
                    this.addChild(view)
                    // if(createInfo.huanhang){
                    //     x = 150
                    //     y = y + 60
                    // }
                    
                    // view.x = x
                    // view.y = y 
                    // y = y + 60
                } else if (createInfo.name == "chooseAndSelectchoose") {
                    if(createInfo.matchvalue >= 0){
                        // this._createInfo[info.key] = info.matchvalue
                        // this._newCreateInfo[info.key] = info.matchvalue
                    }
                    let view = this.getChooseView(createInfo)
                    this.addChild(view)
                            // if (i == createInfo.space) {
                            //     i = 0
                            //     x = 150
                            //     y = y + 60
                            // } else {
                            //     x = 150 + i * (1100 - 60) / createInfo.space
                            // }
                            // i++
                            // view.x = x
                            // view.y = y
                        // }

                } else if (createInfo.name == "countSelect") {
                    let view = this.getCountView(createInfo)
                    // view.x = 150
                    // view.y = 15
                    this.addChild(view)
                    // content._content.height = view.height + 30
                    // content.height = view.height + 40
                } else if (createInfo.name == "chooseSelect") {
                    // let view = new ChooseAndSelect(createInfo, this._createInfo, this._newCreateInfo, this._desc, content)
                    // view.x = 5
                    // this.addChild(view)
                } else if (createInfo.name == "switchAndSelect") {
                    // let view = new SwitchAndSelect(createInfo, this._createInfo, this._newCreateInfo, this._desc)
                    // view.x = 5
                    // this.addChild(view)
                } else {
                    // this._createInfo[createInfo.key] = createInfo.value
                    // this._newCreateInfo[createInfo.key] = createInfo.value


                    if(createInfo.key == "max_player")
                    {
                        //当固定人数的时候
                         CreateRoomCtrl.instance._costPeopleNum = createInfo.value
                         if(CreateRoomCtrl.instance._cost){
                            CreateRoomCtrl.instance._totalCost = CreateRoomCtrl.instance._cost*CreateRoomCtrl.instance._costPeopleNum
                         }
                         
                    }
                }
            }
        }

        private updateLabel(checkBox: Laya.CheckBox, info) {
            SoundManager.instance.playBtnEffect(SoundConfig.SOUND_BTN_NORMAL);
            let value = 0
            if (checkBox.selected == true) {
                value = 1
            }
            // this._createInfo[info.key] = info.values[value]
            // this._newCreateInfo[info.key] = info.values[value]
            this._desc[info.key] = info.des[value]
            if (info.changeDispatch) {
                // Dispatcher.dispatch(info.key, [this._newCreateInfo[info.key], info])
            }
        }
    }

    class ChooseAndSelect extends ui.panel.CreateItemUI {
        private _createInfo
        private _newCreateInfo
        private _desc
        private _values = {}
        private _views = {}
        private _checks
        private _info
        private _costLabel
        private _costDivideLable
        private _selects
        constructor(info, createInfo, newCreateInfo, desc, content) {
            super();
            this._info = info
            this._createInfo = createInfo
            this._newCreateInfo = newCreateInfo
            this._desc = desc
            this._values = {}
            this._views = []
            this._checks = []
            this._selects = []
            //this._line.visible = false

            let view = new Laya.CheckBox()

            view.skin = "createRoom/checkBox_rule.png"
            view.stateNum = 2
            view.label = info.texts
            view.labelSize = 35
            view.labelColors = "#9B5036,#9B5036"
            view.labelPadding = "0,0,0,0"
             view.labelFont = "Microsoft YaHei"
            view.labelBold = true
            view.mouseThrough = false
            view.x = 30
            if (this._createInfo[info.key] >= 0) {
                info.value = this._createInfo[info.key]
            } else {
                info.value = info.value
            }
            if (info.value >= 0) {
                if (info.value == 1) {
                    view.selected = true
                } else {
                    view.selected = false
                }
            }
            this._createInfo[info.key] = info.value
            this._newCreateInfo[info.key] = info.value
            this._desc[info.key] = info.des[info.value]
            this._content.addChild(view)
            this._content.height = this._content.height + 40
            view.on("change", this, this.updateLabel, [view, info]);
            for (var k in info.info) {
                let v = info.info[k]
                if (v.name == "select") {
                    let select = this.getSelectView(v)
                    this._content.addChild(select)
                    select.pos(30, parseInt(k) * 40 + 45)
                    this._content.height = this._content.height + 40
                    this._selects.push(select)
                    if (view.selected == false) {
                        select.visible = false
                    }
                }
            }
            //this._line.visible = true
            this.height = this._content.height + 10
        }
        private onSelectChange(info, index: number): void {
            console.log("你选择了第 " + (index + 1) + " 项");
            this._createInfo[info.key] = info.values[index]
            this._newCreateInfo[info.key] = info.values[index]
            this._desc[info.key] = info.des[index]
            // this.callback(info.key, info.values[index])
        }
        public getSelectView(info) {
            let view = new Laya.RadioGroup()

            view.labels = info.texts
            view.skin = "createRoom/radio_rule.png"
            view.stateNum = 2
            view.labelPadding = "0,0,0,5"
            view.labelSize =35
             view.labelFont = "Microsoft YaHei"
            view.labelBold = true
            view.space = 100
            view.labelColors = "#9B5036,#9B5036"
            view.mouseThrough = false
            if (this._createInfo[info.key] >= 0) {
                info.value = this._createInfo[info.key]
            } else {
                info.value = info.value
            }
            if (info.value >= 0) {
                view.selectedIndex = info.value
            }
            this._createInfo[info.key] = info.value
            this._newCreateInfo[info.key] = info.value
            this._desc[info.key] = info.des[info.value]
            view.selectHandler = new Laya.Handler(this, this.onSelectChange, [info]);

            return view
        }

        private updateLabel(checkBox: Laya.CheckBox, info) {
            let value = 0
            if (checkBox.selected == true) {
                value = 1
                for (var k in this._selects) {
                    let v = this._selects[k]
                    v.visible = true
                }
            } else {
                for (var k in this._selects) {
                    let v = this._selects[k]
                    v.visible = false
                }
            }
            this._createInfo[info.key] = info.values[value]
            this._newCreateInfo[info.key] = info.values[value]
            this._desc[info.key] = info.des[value]

        }
    }

    class ChargeSelect extends ui.panel.CreateItemUI {
        private _createInfo
        private _newCreateInfo
        private _desc
        private _values = {}
        private _views = {}
        private _checks
        private _info
        private _costLabel
        private _costDivideLable
        private _labelCostNew
        constructor(info, createInfo, newCreateInfo, desc, content,labelCostUI) {
            super();
            this._info = info
            this._createInfo = createInfo
            this._newCreateInfo = newCreateInfo
            this._desc = desc
            this._values = {}
            this._views = []
            this._checks = []
            this._labelCostNew = labelCostUI
            //this._line.visible = false
            //info.value = this._createInfo[info.key] || info.value

            if(this._createInfo[info.key] == 0){
                info.value = 0
            }else if(this._createInfo[info.key] == 1)
            {
                info.value = 1
            }
            if(info.discount){
                //content._huodong.visible = true
                //content.ani1.play()
            }else{
                //content._huodong.visible = false
            }
            if (info.texts && info.value >= info.texts.length)
                info.value = info.texts.length - 1;
            for (var k in info.texts) {
                let v = info.texts[k]
                let box: Laya.Box = new Laya.Box()
                let view = new Laya.CheckBox()
                view.skin = "createRoom/radio_rule.png"
                view.stateNum = 2
                view.label = v
                view.mouseThrough = false
                view.labelColors = "#9C573A,#9C573A"
                view.labelPadding = "0,0,0,5"
                view.labelFont = "Microsoft YaHei"
                view.labelBold = true
                view.labelSize = 35
                if (info.value == parseInt(k)) {
                    view.selected = true
                    this._createInfo[info.key] = info.value
                    this._newCreateInfo[info.key] = info.value
                    this._desc[info.key] = info.des[info.value]
                } else {
                    view.selected = false
                }

                this._views[k] = box
                this._checks[k] = view
                box.addChild(view)
                box.y = 10
                this._content.addChild(box)


                box.x = 590 / info.texts.length * parseInt(k) + 30
                // view.centerY = 0
                box.on(Laya.Event.CLICK, this, this.updateLabel, [view]);
                this._createInfo[v.key] = v.value
                this._newCreateInfo[v.key] = v.value
                this._desc[v.key] = info.des[v.value]
                let costLable = new Laya.Label(k == "0" ? String(CreateRoomCtrl.instance._totalCost) : String(Math.ceil(CreateRoomCtrl.instance._totalCost / CreateRoomCtrl.instance._costPeopleNum)))
                box.addChild(costLable)
                if (CreateRoomCtrl.instance._totalCost == 0) {
                    // content._huodong.visible = true
                    // let freeLable = new Laya.Label("(限时免费)")
                    // box.addChild(freeLable)
                    // freeLable.color = "#9b5036"
                    // freeLable.fontSize = 20
                    // freeLable.pos(70, 45)
                }

                costLable.fontSize = 25
                costLable.x = view.x + view.width + 34
                costLable.y = 12
                costLable.color = "#9b5036"
                costLable.visible = false
                // let diamond = new Laya.Image("createTable/diamond.png")
                // box.addChild(diamond)
                //diamond.pos(view.x + view.width + 5, 16)
                if (k == "0") {
                    this._costLabel = costLable
                    Dispatcher.on("costchange", costLable, this.updateCost.bind(this));
                } else {
                    this._costDivideLable = costLable
                    Dispatcher.on("costdividechange", costLable, this.updateCostDivide.bind(this));
                }
            }
             this.updateRealCost()
            // this._content.height = this._content.height + 30
            // this.height = this.height + 40
        }
        private updateRealCost(){
             if(this._checks["0"].selected){

                 this._labelCostNew.text= "X"+this._costLabel.text
            }  
            else
            {
                this._labelCostNew.text= "X"+this._costDivideLable.text
            }

        }
        private updateCost(text) {
            this._costLabel.text = String(CreateRoomCtrl.instance._totalCost)
            if (this._costDivideLable)
                this._costDivideLable.text = Math.ceil(CreateRoomCtrl.instance._totalCost / CreateRoomCtrl.instance._costPeopleNum)
            

            this.updateRealCost()

        }

        private updateCostDivide(text) {
            this._costDivideLable.text = Math.ceil( CreateRoomCtrl.instance._totalCost / CreateRoomCtrl.instance._costPeopleNum)
            this.updateRealCost()
        }

        private updateLabel(checkBox: Laya.Box) {
            SoundManager.instance.playBtnEffect(SoundConfig.SOUND_BTN_NORMAL);
            for (var k in this._views) {
                let view = this._views[k]
                if (view == checkBox.parent || view == checkBox) {
                    this._checks[k].selected = true
                    if (k == "0") {
                        this._createInfo[this._info.key] = 0
                        this._newCreateInfo[this._info.key] = 0
                        this._desc[this._info.key] = this._info.des[0]

                        this._labelCostNew.text= "X"+this._costLabel.text
                    } else {
                        this._createInfo[this._info.key] = 1
                        this._newCreateInfo[this._info.key] = 1
                        this._desc[this._info.key] = this._info.des[1]

                        this._labelCostNew.text= "X"+this._costDivideLable.text
                    }
                } else {
                    this._checks[k].selected = false
                }
            }
        }
    }

    class SwitchAndSelect extends ui.panel.CreateItemUI {
        private _createInfo
        private _newCreateInfo
        private _desc
        private _values = {}
        private _views = {}
        constructor(info, createInfo, newCreateInfo, desc) {
            super();
            this._createInfo = createInfo
            this._newCreateInfo = newCreateInfo
            this._desc = desc
            this._values = {}
            for (var k in info.info) {
                let v = info.info[k]
                let view = new Laya.CheckBox()

                view.skin = "createRoom/checkBox_rule.png"
                view.stateNum = 2
                view.label = v.texts
                view.labelSize = 35

                view.labelColors = "#9C573A,#9C573A"
                view.labelPadding = "0,0,0,5"
                view.labelFont = "Microsoft YaHei"
                view.labelBold = true
                if (this._createInfo[v.key] >= 0) {
                    v.value = this._createInfo[v.key]
                } else {
                    v.value = v.value
                }
                if (v.value >= 0) {
                    if (v.value == 1) {
                        view.selected = true
                    } else {
                        view.selected = false
                    }
                }
                this._values[v.key] = v.value
                this._views[v.key] = view

                this._content.addChild(view)


                view.x = 590 / info.info.length * parseInt(k) + 30
                // view.centerY = 0
                view.on("change", this, this.updateLabel, [view, v]);
                this._createInfo[v.key] = v.value
                this._newCreateInfo[v.key] = v.value
                this._desc[v.key] = v.des[v.value]
            }
            this._content.height = this._content.height + 30
            this.height = this.height + 30
        }

        private updateLabel(checkBox: Laya.CheckBox, info) {
            let value = 0
            if (checkBox.selected == true) {
                value = 1
            }
            this._createInfo[info.key] = info.values[value]
            this._newCreateInfo[info.key] = info.values[value]
            this._desc[info.key] = info.des[info.values[value]]
            for (var k in this._values) {
                if (k != info.key && value == 1) {
                    this._createInfo[k] = 0
                    this._views[k].selected = false
                }
            }
        }
    }

    class HBar extends Laya.View {
        private _imgList = []
        private _bg
        private _button
        private _info
        private _divide
        private _createInfo
        private _newCreateInfo
        private _desc
        constructor(info, tableInfo, newCreateInfo, desc) {
            super();
            this._info = info
            this._createInfo = tableInfo
            this._newCreateInfo = newCreateInfo
            this._desc = desc
            this._bg = new Laya.Image("createTable/line.png")
            this._bg.sizeGrid = "2,2,2,2"
            this._bg.width = 530
            this._bg.anchorY = 0.5
            this.addChild(this._bg)
            let texts = info.texts.split(",")
            this._divide = 530 / (info.divide - 1)
            for (var i = 0; i < info.divide; i++) {
                let text = new Laya.Label(texts[i])
                text.anchorX = 0.5
                text.fontSize = 22
                text.align = "center"
                this.addChild(text)
                text.x = i * 530 / (info.divide - 1)
                text.y = -80

                let img = new Laya.Image("createTable/radio.png")
                img.anchorX = 0.5
                img.anchorY = 0.5
                this._bg.addChild(img)
                img.x = i * 530 / (info.divide - 1)//+10
                img.y = 4
                this._imgList.push(img)
            }
            this._createInfo[info.key] = this._createInfo[info.key] || info.value
            this._bg.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown)
            this._button = new Laya.Image("createTable/count.png")
            this.addChild(this._button)
            this._button.x = this._createInfo[info.key] * 530 / (info.divide - 1)//+10
            this._button.anchorX = 0.5
            this._button.anchorY = 0.5
            this._newCreateInfo[info.key] = this._createInfo[info.key]
            this._desc[info.key] = info.des[this._createInfo[info.key]]

        }

        /**按下事件处理*/
        private onMouseDown(e): void {
            //添加鼠标移到侦听
            this._bg.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            console.info(e.currentTarget.mouseX, e.currentTarget.mouseY)
            this._bg.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this._bg.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
        }
        /**移到事件处理*/
        private onMouseMove(e): void {
            // this.button.x = Math.max(Math.min(Laya.stage.mouseX, this.endPosition), this.beginPosition);
        }

        /**抬起事件处理*/
        private onMouseUp(e): void {
            let index = Math.floor((e.currentTarget.mouseX + 10) / this._divide)
            console.log(index)
            this._createInfo[this._info.key] = index
            this._newCreateInfo[this._info.key] = index
            this._button.x = index * this._divide//+10
            this._bg.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            this._bg.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this._bg.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp);

            // 滑动到目的地
            // var dist: number = Laya.stage.mouseX - this.buttonPosition;

            // var targetX = this.beginPosition;
            // if (dist > this.TOGGLE_DIST)
            //     targetX = this.endPosition;
            // Laya.Tween.to(this.button, { x: targetX }, 100);
        }

    }

    class HButtons extends Laya.View {
        private _imgList = []
        private _bg
        private _buttons
        private _info
        private _divide
        private _createInfo
        private _newCreateInfo
        private _desc
        constructor(info, tableInfo, newCreateInfo, desc) {
            super();
            this._info = info
            this._createInfo = tableInfo
            this._newCreateInfo = newCreateInfo
            this._desc = desc
            // this._bg = new Laya.Image("createTable/line.png")
            // this._bg.sizeGrid = "2,2,2,2"
            // this._bg.width = 530
            // this._bg.anchorY = 0.5
            // this.addChild(this._bg)
            this._buttons = []
            let texts = info.texts.split(",")
            this._divide = 530 / (info.divide - 1)
            for (var i = 0; i < info.divide; i++) {
                let text: component.BaseButton = new component.BaseButton("createTable/bar.png")
                text.label = texts[i]
                text.stateNum = 3
                text.labelSize = 25
                text.labelColors = "#9C573A,#705E40,#705E40,#705E40"
                this.addChild(text)
                text.x = i * 530 / info.divide
                text.y = -60
                text.name = String(i)
                this._buttons.push(text)
                let value
                if (this._createInfo[info.key] >= 0) {
                    value = this._createInfo[info.key]
                } else {
                    value = info.value
                }
                if (i == value) {
                    text.selected = true
                    this._createInfo[info.key] = i
                    this._newCreateInfo[info.key] = i
                    this._desc[info.key] = info.des[i]
                }
                // let img = new Laya.Image("createTable/radio.png")
                // img.anchorX = 0.5
                // img.anchorY = 0.5
                // this._bg.addChild(img)
                // img.x = i* 530 /(info.divide-1)//+10
                // img.y = 4
                // this._imgList.push(img)
            }

            this.on(Laya.Event.CLICK, this, this.onMouseDown)



        }

        /**按下事件处理*/
        private onMouseDown(e): void {
            //添加鼠标移到侦听
            // this._bg.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            // console.info(e.currentTarget.mouseX,e.currentTarget.mouseY)
            // this._bg.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            // this._bg.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
            for (var i = 0; i < this._info.divide; i++) {
                if (e.target.name == String(i)) {
                    this._buttons[i].selected = true
                    this._createInfo[this._info.key] = i
                    this._newCreateInfo[this._info.key] = i
                    this._desc[this._info.key] = this._info.des[i]
                } else {
                    this._buttons[i].selected = false
                }
            }
        }
    }

}