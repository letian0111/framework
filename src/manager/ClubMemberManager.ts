/*
* @author seacole
 * 俱乐部成员集
*/
class ClubMemberManager extends RoleManager {
    // "sex":"1","avatar":"","uid":363686,"nk":"zhc134"
    public static dic: any = {};
    public static addMemberByInfos(data: Array<any>,cid:number): void {
        if (data) {
            for (var i: number = 0; i < data.length; i++) {
                // ClubMemberManager.dic[data[i].uid] = data[i];
                // ClubMemberManager.dic[data[i].uid].nickname = data[i].nk || data[i].nickname;
                
                ClubMemberManager.dic[cid][data[i].uid] = data[i]
                ClubMemberManager.dic[cid][data[i].uid].nickname = data[i].nk || data[i].nickname;
            }
        }
    }
    public static addClubMemberInfos(userdata: Array<any>, cludMemberdata: Array<any>,cid:number): void {
        if (userdata && cludMemberdata) {
            for (var i: number = 0; i < userdata.length; i++) {
                for (var j: number = 0; j < cludMemberdata.length; j++) {
                    if (cludMemberdata[j].uid == userdata[i].uid) {
                        if(ClubMemberManager.dic[cid][userdata[i].uid]){
                            ClubMemberManager.dic[cid][userdata[i].uid].forbid = cludMemberdata[j].forbid||0
                            ClubMemberManager.dic[cid][userdata[i].uid].remark = cludMemberdata[j].remark||0
                            ClubMemberManager.dic[cid][userdata[i].uid].role = cludMemberdata[j].role||0
                        }
                       break;
                    }
                }
            }
        }
    }
    public static initClubMember(cid){
        ClubMemberManager.dic[cid]={}
    }
    public static getMemberByClub(cid){
         if (ClubMemberManager.dic[cid])
            return ClubMemberManager.dic[cid]
        return null;
    }
    public static initClubMemberManager(){
        ClubMemberManager.dic={}
    }
    public static getMember(uid: number,cid:number): any {
        if (ClubMemberManager.dic[cid]&&ClubMemberManager.dic[cid][uid])
            return ClubMemberManager.dic[cid][uid];
        return null;
    }

}