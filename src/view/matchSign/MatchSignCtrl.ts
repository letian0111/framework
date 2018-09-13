/*
* @author seacole
* 比赛报名;
*/
module matchSign {
    export class MatchSignCtrl extends BaseCtrl {
        constructor() {
            super();
            this["name"] = "MatchSignCtrl";
        }

        private static _instance: MatchSignCtrl;
        public static get instance(): MatchSignCtrl {
            if (!this._instance)
                this._instance = new MatchSignCtrl();
            return this._instance;
        }

        protected _ui: ui.matchSign.MatchSignUI;
        private _signKind: MatchSignKind;
        public show(): void {
            this.showself();
        }

        /**
         * 这里完成new ui，添加注册监听等初始化工作
         */
        public beforeShow(): void {
            if (!this._ui) {
                this._ui = new ui.matchSign.MatchSignUI();
                this._signKind = new MatchSignKind();
                this._ui.addChild(this._signKind);
                this._signKind.x = this._ui._btnCreate.x + (this._ui._btnCreate.width - this._signKind.width) * 0.5;
                this._signKind.bottom = this._ui._btnCreate.bottom + this._ui._btnCreate.height + 10;
                this._signKind.visible = false;
                EventManager.instance.registerOnObject(this, this._ui._close, Laya.Event.CLICK, this, this.hide);
                EventManager.instance.registerOnObject(this, this._ui._btnCreate, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, this._ui._btnJoin, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, this._ui._btnHelp, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, this._ui._hisclose, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, this._ui._matchhistory, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, this._ui._box, Laya.Event.CLICK, this, this.onTouch);
                EventManager.instance.registerOnObject(this, Dispatcher.eventDispatcher, EventNames.MATCH_LIST_CHANGE, this, this.onListChange);
                this._ui._list.itemRender = MatchSignMatchListRenderer;
                this._ui._list.scrollBar.elasticDistance = 100;
                this._ui._list.scrollBar.visible = false;
                this._ui._list.renderHandler = new Laya.Handler(this, this.updateList);
                this._ui._list.array = [];
                this._ui._list.mouseHandler = new Laya.Handler(this, this.selectList);


                this._ui._hislist.itemRender = MatchHisRenderer;
                this._ui._hislist.scrollBar.visible = false;
                this._ui._hislist.scrollBar.elasticDistance = 100;
                this._ui._hislist.selectEnable = true;
                this._ui._hislist.renderHandler = new Laya.Handler(this, this.updateHisList);
                this._ui._hislist.mouseHandler = new Laya.Handler(this, this.onSelect);
                this._ui._hislist.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollListsChanged);
                this._ui._hislist.array = [];
                // this._ui._tab.selectHandler = new Laya.Handler(this, this.checkTab);
                // this._ui._tab.selectedIndex = 0;
            }
            super.beforeShow();
            this.onShow();
        }

        /***渲染单元格时的回调方法***/
        private updateHisList(cell: MatchHisRenderer, index: number): void {
            cell.updata();
        }

        private getReward(gid){
            webService.getMatchReward(server.uid,gid,function(data){
                if(data.code == 0){
                    for(var k in this._listArr){
                        let v = this._listArr[k]
                        if(v.gid == gid){
                            v.award = 1
                            break
                        }
                    }
                }
            }.bind(this))
        }

        /***选择单元格回调***/
    private onSelect(e: Laya.Event): void {
        if (e.type == "mousedown") {
            this._ui._list.scrollBar.touchScrollEnable = false;
            this._ui._list.scrollBar.mouseWheelEnable = false;
        }
        if (e.type == "mouseout") {
            this._ui._list.scrollBar.touchScrollEnable = true;
            this._ui._list.scrollBar.mouseWheelEnable = true;
        }
        if (e.type == "mouseup") {
            this._ui._list.scrollBar.touchScrollEnable = true;
            this._ui._list.scrollBar.mouseWheelEnable = true;
        }
        if (e.type == Laya.Event.CLICK) {
            if (e.target.name == "award") {
                var gid: number = (e.target.parent as MenuHistoryScoreRenderer).dataSource.gid;
                this.getReward(gid)
            }else{  
                var gid: number = (e.target as MatchHisRenderer).dataSource.gid;
                this.getReward(gid)
            }       
                
        }
        // else if (e.type == Laya.Event.MOUSE_OUT) {
        //     if (this._list.scrollBar.value >= this._list.scrollBar.max)
        //         this.getNextPage();
        // }
    }

        private _refreshFirstPage: boolean;
        private _refreshListsMore: boolean;
        private onScrollListsChanged(): void {
            if (this._ui._list.scrollBar.value < 0)
                this._refreshFirstPage = true;
            else if (this._ui._hislist.scrollBar.value > 0)
                this._refreshFirstPage = false

            if (this._refreshFirstPage && this._ui._hislist.scrollBar.value == 0)
                this.getFirstPage(true);

            if (this._ui._hislist.scrollBar.value > this._ui._hislist.scrollBar.max)
                this._refreshListsMore = true;
            else if (this._ui._hislist.scrollBar.value < this._ui._hislist.scrollBar.max)
                this._refreshListsMore = false

            if (this._refreshListsMore && this._ui._hislist.scrollBar.value == this._ui._hislist.scrollBar.max)
                this.getNextPage();
        }

        private _listArr: Array<any>;
        private _currRefreshPage: number;
        private _maxPageCount: number;
        private _isFirstPageGet: boolean;
        private _lastGid: number;
        private _lastGtype: number;
        public get lastGInfo(): boolean {
            if (this._lastGid && this._lastGtype)
                return true;
            else
                return false;
        }
        public getFirstPage(isRefresh: boolean = false): void {
            if (!this._isFirstPageGet || isRefresh) {
                if (!this._isFirstPageGet)
                webService.getMatchHistoryList(1, 3, this.onGetHistoryList.bind(this));
                this._isFirstPageGet = true;
            }
        }

        private getNextPage(): void {
            if (this._currRefreshPage < this._maxPageCount)
                webService.getMatchHistoryList(this._currRefreshPage + 1, 3, this.onGetHistoryList.bind(this));
        }

        private clear(): void {
            this._isFirstPageGet = false;
            this._currRefreshPage = 0;
            this._maxPageCount = 0;
            this._listArr = [];
            // this._dicDetail = {};
            // this._detailTotal = {};
        }

        private onGetHistoryList(response: any): void {
        if (response.code == 0) {
            if (this._currRefreshPage < response.page)
                this._currRefreshPage = response.page;
            this._maxPageCount = response.page_cnt;
            for (var i: number = 0; i < response.data.length; i++) {
                var flag: boolean = true;
                
                for (var j: number = 0; j < this._listArr.length; j++) {
                    if (this._listArr[j].gid == response.data[i].gid) {
                        flag = false;
                        break;
                    }
                }
                if (flag)
                    this._listArr.push(response.data[i]);
            }
            this._listArr.sort(this.onSort);
            this._ui._hislist.array = this._listArr;
           
        }
    }

    private onSort(a: any, b: any): number {
        if (!a.hasOwnProperty("end_time"))
            a.end_time = 0;
        if (!b.hasOwnProperty("end_time"))
            b.end_time = 0;
        if (a.end_time > b.end_time)
            return -1;
        else if (a.end_time < b.end_time)
            return 1;
        else
            return 0;
    }

        /**
        * 开启监听，配置宽高，添加到舞台
        */
        public onShow(): void {
            super.onShow();
            this._signKind.visible = false;
            this._ui._hisbox.visible = false;
            this.checkTab();
            this.startTimer();
        }
        /**
         * 离开时调度
         */
        public afterShow(): void {
            super.afterShow();
            for (var i: number = 0; i < this._ui._list.cells.length; i++) {
                this._ui._list.cells[i].stopTimer();
            }
            this.stopTimer();
        }


        private onTouch(e: Laya.Event): void {
            switch (e.currentTarget) {
                case this._ui._btnHelp:
                    HelpCtrl.instance.show(true, [1]);
                    e.stopPropagation();
                    break;

                case this._ui._btnCreate:
                    this._signKind.visible = !this._signKind.visible;
                    e.stopPropagation();
                    break;

                case this._ui._btnJoin:
                    JoinTableCtrl.instance.show();
                    e.stopPropagation();
                    break;
                case this._ui._matchhistory:
                    this._ui._hisbox.visible = true;
                    this.clear()
                    this.getFirstPage(true);
                    break;
                case this._ui._hisclose:
                    this._ui._hisbox.visible = false;
                    break
                default:
                    this._signKind.visible = false;
                    break;
            }
        }

        /***渲染单元格时的回调方法***/
        protected updateList(cell: MatchSignMatchListRenderer, index: number): void {
            cell.updata();
        }

        private selectList(e: Laya.Event, index: number): void {
            if (e.type == Laya.Event.CLICK) {
                if (e.target instanceof Laya.Button && e.target.name != "returnMatch") {

                }
                else {
                    webService.joinTable(String(this._ui._list.getItem(index).code), (response: any) => {
                        if (response.code == 0) {
                            GameConfig.setServerUrl(response.ip);
                            GameConfig.joinTable(response);
                        }
                        else {
                            AlertInGameCtrl.instance.show(GameConfig.language.match_not_exist, null, 0, false);
                            this.checkTab();
                        }
                    });
                }
            }
        }

        private checkTab(): void {
            MatchSignData.getMatchList();
            this._ui._list.scrollBar.value = 0;
        }

        private onListChange(): void {
            this._ui._labNoHistory.visible = MatchSignData._matchShowList.length == 0;
            this._ui._list.array = MatchSignData._matchShowList;
        }

        private startTimer(): void {
            this.stopTimer();
            Laya.timer.loop(10 * 1000, this, this.onTimer);
        }

        private stopTimer(): void {
            Laya.timer.clear(this, this.onTimer);
        }

        private onTimer(): void {
            if (!MatchSignInfoCtrl.instance.parent)
                MatchSignData.getStatus();
        }
    }
}