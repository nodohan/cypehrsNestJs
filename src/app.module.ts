import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchStats } from './matches/entities/matchStats.entity';
import { UserModule } from './user/user.module';
import { MatchesStatsController } from './matches/stats/matches-stats/matches-stats.controller';
import { MatchesStatsService } from './matches/stats/matches-stats/matches-stats.service';
import { MatchesModule } from './matches/matches.module';
import { Matches } from './matches/entities/match.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: '1234',
      database: 'test',
      entities: [MatchStats, Matches],
      synchronize: false,
    })
    , UserModule
    , MatchesModule],
  controllers: [AppController, MatchesStatsController],
  providers: [AppService, MatchesStatsService],
})
export class AppModule { }
