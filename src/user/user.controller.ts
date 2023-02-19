import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { json } from 'express';
import { NeopleApi } from '../util/NeopleApi';
import { SearchNicknameDto } from './dto/SearchNicknameDto';

@ApiTags("닉네임 조회")
@Controller('users')
export class UserController {

    @ApiOperation({ summary: '닉네임 조회', description: '해당 닉네임명의 사용자를 네오플api를 통하여 조회한다.' })
    @ApiCreatedResponse({ description: '닉네임에 해당하는 유저의 전적 정보를 전달한다', type: json })
    @Get(":nickname")
    user(@Param() searchNicknameDto: SearchNicknameDto,): any {
        return new NeopleApi().findUserByNickname(searchNicknameDto.nickname, searchNicknameDto.gameType);
    }

}
