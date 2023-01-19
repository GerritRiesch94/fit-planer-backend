import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AthleteResponse } from './model/response/AthleteResponse';
import { AthleteDbServiceService } from './database/athlete-db-service.service';
import {
  AthleteRequest,
  mapToAthleteDbModel,
} from './model/request/AthleteRequest';
import { ApiResponse } from '@nestjs/swagger';

@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteDbService: AthleteDbServiceService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: AthleteResponse,
    isArray: true,
  })
  @HttpCode(200)
  async findAllAthletes(): Promise<AthleteResponse[]> {
    return await this.athleteDbService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: AthleteResponse,
  })
  @HttpCode(201)
  async createAthlete(
    @Body() athleteRequest: AthleteRequest,
  ): Promise<AthleteResponse> {
    return await this.athleteDbService.create(
      mapToAthleteDbModel(athleteRequest),
    );
  }
}
