import { Controller, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MatchStats } from 'src/matches/entities/matchStats.entity';
import { MatchesStatsService } from './matches-stats.service';

@Controller('matches/stats')
@ApiTags('매칭 통계')
export class MatchesStatsController {

    constructor(private mastchStatsService: MatchesStatsService) {
    };

    @Get("/")
    matchStatsList(@Param("dayStr") dayStr: string): Promise<MatchStats[]> {
        return this.mastchStatsService.findBy(dayStr);
    }

    // URL : /matches/stats/:dayStr
    @ApiOperation({ summary: '오늘의 통계', description: '오늘을 기준으로 한 주간/월간 통계를 제공한다.' })
    @ApiCreatedResponse({ description: '통계데이터를 전달한다.', type: MatchStats })
    @Get(":dayStr")
    matchStats(@Param("dayStr") dayStr: string): Promise<MatchStats[]> {
        return this.mastchStatsService.findBy(dayStr);
    }


}
