import { Controller, Get } from '@nestjs/common';
import { GroupedMatches, MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {

    constructor(private mastchService: MatchesService) {
    };

    @Get("/count")
    matchStatsList(): Promise<GroupedMatches[]> {
        return this.mastchService.getMatchCounts();
    }


}