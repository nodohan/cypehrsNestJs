import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { NeopleApi } from '../util/NeopleApi';
import { SearchNicknameDto } from './dto/SearchNicknameDto';

@Controller('users')
export class UserController {

    @Get(":nickname")
    user(@Param() searchNicknameDto: SearchNicknameDto,): any {
        return new NeopleApi().findUserByNickname(searchNicknameDto.nickname, searchNicknameDto.gameType);
    }

}
