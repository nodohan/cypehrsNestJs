import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchStats } from './stats/entity/matchStats.entity';
import { StatsModule } from './stats/stats.module';
import { StatsService } from './stats/stats.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: '1234',
      database: 'test',
      entities: [MatchStats],
      synchronize: false,
    })
    , UserModule
    , StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
