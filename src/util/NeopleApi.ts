import axios from 'axios';
//import myConfig from './config.js';
import * as commonUtil from './commonUtil';

type apiParam = {
    uri: string;
    qs: {
        apikey: string;
        nickname?: string;
        wordType?: string;
        limit?: number;
        gameTypeId?: string;
        startDate?: string;
        endDate?: string;
    }
}

type Error = {
    resultCode: number;
}

export class NeopleApi {
    private seasonStartDay: string;
    private nickOpt: apiParam;
    private matchOpt: apiParam;
    private apiKey: string;

    constructor() {
        this.apiKey = "왱알왱알"; //오픈금지
        this.seasonStartDay = "2022-08-18 11:00"; //이번시즌 시작일 

        this.nickOpt = {
            uri: "https://api.neople.co.kr/cy/players",
            qs: { nickname: '', wordType: 'match', limit: 3, apikey: this.apiKey }
        };

        this.matchOpt = {
            uri: "https://api.neople.co.kr/cy/matches/",
            qs: { apikey: this.apiKey }
        };
    }

    private async call(opt: apiParam): Promise<any> {
        let result = await axios.get(opt.uri, {
            params: opt.qs
        });
        return result.status == 200 ? result.data : null;
    };

    async matchList(userId: string, gameType: string, startDate: string, endDate: string) {
        let matchInfo: apiParam = {
            uri: `https://api.neople.co.kr/cy/players/${userId}/matches`,
            qs: { apikey: this.apiKey, gameTypeId: gameType, limit: 100, startDate: startDate, endDate: endDate }
        };
        return await this.matchInfo(matchInfo, null);
    };

    async matchInfo(matchInfo: any, mergeData: any): Promise<JSON> {
        try {
            let result = await this.call(matchInfo);
            //logger.debug("뭐받음", result);
            console.log("뭐받음", result);
            mergeData = mergeJson(mergeData, result);
            let next = result.matches.next;
            if (next != null) {
                //logger.debug("NEXT가 있어요 ", next);
                console.log("NEXT가 있어요 ", next);
                matchInfo.qs.next = next;
                await this.matchInfo(matchInfo, mergeData);
            }

            console.log("매치인포", mergeData);
            return mergeData;
        } catch (err) {
            console.log("오류발생: ", err);
            return null;
        }
    };

    async getPlayerIdByName(nickname: string) {
        this.nickOpt.qs.nickname = nickname;
        return await this.call(this.nickOpt).then(async (result) => {
            let json = JSON.parse(result);
            if (json.rows == null || json.rows.length == 0) {
                return null;
            }
            return json.rows[0].playerId;
        });
    }

    async findUserByNickname(nickname: string, gameType: string): Promise<JSON | Error> {
        this.nickOpt.qs.nickname = nickname;

        let resultJson: any = null;
        let userInfo: any = null;
        let today = new Date();
        userInfo = await this.call(this.nickOpt);

        if (userInfo == null) {
            return { 'resultCode': -1 };
        }

        let userId: string = userInfo.rows[0].playerId;
        let diffDay: number = dateDiff(new Date(this.seasonStartDay), today);
        let startDate: Date = new Date(this.seasonStartDay);
        let endDate: Date = getMinDay(commonUtil.addDays(startDate, 90), today);

        while (diffDay >= 0) {
            resultJson = mergeJson(resultJson, await this.matchList(userId, gameType, commonUtil.timestamp(startDate), commonUtil.timestamp(endDate)));
            startDate = endDate;
            endDate = getMinDay(commonUtil.addDays(startDate, 90), today);
            diffDay = diffDay - 90;
        }
        return resultJson;
    };

    async searchMatchInfo(matchId: string): Promise<JSON> {
        this.matchOpt.uri += matchId;

        return await this.call(this.matchOpt).then(async (result) => {
            return JSON.parse(result);
        });
    };
}

function mergeJson(mergeData: any, resultJson: any): JSON {
    if (mergeData == null) {
        mergeData = resultJson;
    } else if (resultJson != null) {
        if (mergeData.matches == undefined) {
            mergeData.matches = resultJson.matches;
        } else {
            mergeData.matches.rows = mergeData.matches.rows.concat(resultJson.matches.rows);
        }
    }
    return mergeData;
}

// 두개의 날짜를 비교하여 차이를 알려준다.
function dateDiff(_date1: Date, _date2: Date): number {
    var diffDate_1 = _date1;
    var diffDate_2 = _date2;

    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth() + 1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth() + 1, diffDate_2.getDate());

    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    return diff;
}

function getMinDay(date1: Date, date2: Date): Date {
    return date1.getTime() < date2.getTime() ? date1 : date2;
}

