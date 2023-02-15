import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { MatchStats } from './entity/matchStats.entity';
import { StatsService } from './stats.service';

@Controller('/stats/')
export class StatsController {

    constructor(private statsService: StatsService) {

    };

    @Get("matchStats/:dayStr")
    matchStats(@Param("dayStr") dayStr: string): Promise<MatchStats[]> {
        return this.statsService.findBy(dayStr);
    }

}
