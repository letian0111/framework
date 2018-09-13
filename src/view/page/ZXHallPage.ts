/*
* @author seacole
* 大厅界面;
*/

class ZXHallPage extends HallPage {

    constructor() {
        super();

        this._loadDatas = this._loadDatas.concat({ url: ResourceConfig.SHEET_ZX_HALL, type: Laya.Loader.ATLAS});

        let games = GameDef.currentGames

        AppPage.register(ZXHallPage, this._loadDatas);
        this.name = "DayeHallPage";
    }

    public getHallModel() {
        return ui.page.ZhangxinHallUI
    }
}