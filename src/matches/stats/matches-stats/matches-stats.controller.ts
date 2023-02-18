import { Controller, Get, Param } from '@nestjs/common';
import { MatchStats } from 'src/matches/entities/matchStats.entity';
import { MatchesStatsService } from './matches-stats.service';

@Controller('matches/stats')
export class MatchesStatsController {

    constructor(private mastchStatsService: MatchesStatsService) {

    };

    @Get("/")
    matchStatsList(@Param("dayStr") dayStr: string): Promise<MatchStats[]> {
        return this.mastchStatsService.findBy(dayStr);
    }

    @Get(":dayStr")
    matchStats(@Param("dayStr") dayStr: string): Promise<MatchStats[]> {
        return this.mastchStatsService.findBy(dayStr);
    }


}
