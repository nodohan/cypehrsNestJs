import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';


@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService) { }




}
