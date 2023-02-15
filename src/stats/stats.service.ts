import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchStats } from './entity/matchStats.entity';

@Injectable()
export class StatsService {

    constructor(
        @InjectRepository(MatchStats)
        private statsRepository: Repository<MatchStats>) {
    }

    findBy(statsDate: string): Promise<MatchStats[]> {
        return this.statsRepository.findBy({ statsDate: statsDate });
    }

}
