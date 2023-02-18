import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchStats } from './entities/matchStats.entity';
import { MatchesStatsController } from './stats/matches-stats/matches-stats.controller';
import { MatchesStatsService } from './stats/matches-stats/matches-stats.service';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Matches } from './entities/match.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MatchStats, Matches])],
    exports: [TypeOrmModule],
    controllers: [MatchesStatsController, MatchesController],
    providers: [MatchesStatsService, MatchesService]
})
export class MatchesModule {

}
