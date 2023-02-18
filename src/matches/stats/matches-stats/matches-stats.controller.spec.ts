import { Test, TestingModule } from '@nestjs/testing';
import { MatchesStatsController } from './matches-stats.controller';

describe('MatchesStatsController', () => {
  let controller: MatchesStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchesStatsController],
    }).compile();

    controller = module.get<MatchesStatsController>(MatchesStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
