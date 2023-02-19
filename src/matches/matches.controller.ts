import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupedMatches, MatchesService } from './matches.service';

@ApiTags("매칭 정보")
@Controller('matches')
export class MatchesController {

    constructor(private mastchService: MatchesService) {
    };

    @ApiOperation({ summary: '공식 일별 판수', description: '최근 30일의 판수를 제공한다.' })
    @ApiCreatedResponse({ description: '통계데이터를 전달한다.', type: GroupedMatches })
    @Get("/count")
    matchStatsList(): Promise<GroupedMatches[]> {
        return this.mastchService.getMatchCounts();
    }


}