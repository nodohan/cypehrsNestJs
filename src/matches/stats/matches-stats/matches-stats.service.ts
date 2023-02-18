import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchStats } from 'src/matches/entities/matchStats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesStatsService {

    constructor(
        @InjectRepository(MatchStats)
        private statsRepository: Repository<MatchStats>) {
    }

    findBy(statsDate: string): Promise<MatchStats[]> {
        return this.statsRepository.findBy({ statsDate: statsDate });
    }


}
