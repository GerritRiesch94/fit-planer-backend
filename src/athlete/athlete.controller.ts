import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AthleteResponse } from './model/response/AthleteResponse';
import { AthleteDbServiceService } from './database/athlete-db-service.service';
import { AthleteRequest } from './model/request/AthleteRequest';

@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteDbService: AthleteDbServiceService) {}

  @Get()
  @HttpCode(200)
  async findAllAthletes(): Promise<AthleteResponse[]> {
    return await this.athleteDbService.findAll();
  }

  @Post()
  @HttpCode(201)
  async createAthlete(
    @Body() athleteRequest: AthleteRequest,
  ): Promise<AthleteResponse> {
    return await this.athleteDbService.create(athleteRequest);
  }
}
