/*
* @author seacole
 * 俱乐部审核成员集
*/
class ClubReviewMemberManager extends RoleManager {
    // "sex":"1","avatar":"","uid":363686,"nk":"zhc134"
    public static dic: any = {};
    public static addRoleByInfos(data: Array<any>): void {
        if (data) {
            for (var i: number = 0; i < data.length; i++) {
                ClubReviewMemberManager.dic[data[i].uid] = data[i];
                ClubReviewMemberManager.dic[data[i].uid].nickname = data[i].nk || data[i].nickname;
            }
        }
    }
    public static addClubMemberInfos(userdata: Array<any>, cludMemberdata: Array<any>): void {
        if (userdata && cludMemberdata) {
            for (var i: number = 0; i < userdata.length; i++) {
                for (var j: number = 0; j < cludMemberdata.length; j++) {
                    if (cludMemberdata[j].uid == userdata[i].uid) {
                        //申请的时间戳,可能不是这个字段
                       ClubReviewMemberManager.dic[userdata[i].uid].ltime = cludMemberdata[j].ltime
                       break;
                    }
                }
            }
        }
    }
    public static initClubReviewMemberManager(){
        ClubReviewMemberManager.dic={}
    }
    public static getRole(uid: number): any {
        if (ClubReviewMemberManager.dic[uid])
            return ClubReviewMemberManager.dic[uid];
        return null;
    }

}