import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matches } from './entities/match.entity';

export class GroupedMatches {
    dates: string;
    cnt: number;
}

@Injectable()
export class MatchesService {

    constructor(
        @InjectRepository(Matches)
        private matchesRepository: Repository<Matches>) {
    }

    async getMatchCounts(): Promise<GroupedMatches[]> {
        const rawMatches = await this.matchesRepository
            .createQueryBuilder()
            .select("DATE_FORMAT(matchDate, '%Y-%m-%d (%W)')", 'dates')
            .addSelect('COUNT(matchId)', 'cnt')
            .groupBy('dates')
            .orderBy('dates', 'DESC')
            .limit(30)
            .printSql()
            .getRawMany();

        return rawMatches.map((match) => ({
            dates: match.dates,
            cnt: match.cnt,
        }));
    }


}
