class PageManager {
    public _pageList: any



    constructor() {

        this["name"] = "PageManager"
        this._pageList = {
            // "shanxi_mj": ShanXiMjPage,
            // "wakeng": WaKengPage,
            // "shisanshui": ShiSanShuiPage,
            // "jinyun_mj": TongluMjPage,
            // "jinyun_gs_mj": JinYunGsMjPage,//zhc测试代码 JinYunGsMjPage
            // "jinyun_hz_mj": JinYunHzMjPage,//zhc测试代码 JinYunHzMjPage
            // "shangqiu_mj": ShangQiuMjPage,//zhc测试代码 ShangQiuMjPage
            // "guanpai": GuanPaiPage,
            // "tonglu_mj": TongluMjPage,
            // "bazhang": BaZhangPage,
            // "shuangkou": ShuangKouPage,
            // "daye_phz": DayePhzPage,
            // "doudizhu": DoudizhuPage
        }
    }

    private static _instance: PageManager;
    public static get instance(): PageManager {
        if (!this._instance) {
            this._instance = new PageManager();
        }
        return this._instance;
    }

    public callPage(name, ...agrs) {
        return this._pageList[name]
    }

    public registerPage(name, page){
        this._pageList[name] = page;
    }
}