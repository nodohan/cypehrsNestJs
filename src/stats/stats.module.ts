import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchStats } from './entity/matchStats.entity';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
    imports: [TypeOrmModule.forFeature([MatchStats])],
    exports: [TypeOrmModule],
    controllers: [StatsController],
    providers: [StatsService]
})
export class StatsModule {



}
