import { Test, TestingModule } from '@nestjs/testing';
import { MatchesStatsService } from './matches-stats.service';

describe('MatchesStatsService', () => {
  let service: MatchesStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchesStatsService],
    }).compile();

    service = module.get<MatchesStatsService>(MatchesStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
