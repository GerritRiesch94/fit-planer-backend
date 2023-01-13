import { Controller, Get, HttpCode } from '@nestjs/common';
import { AthleteResponse } from './model/response/AthleteResponse';
import { AthleteDbServiceService } from './database/athlete-db-service.service';

@Controller('athlete')
export class AthleteController {
  constructor(private readonly athleteDbService: AthleteDbServiceService) {}

  @Get()
  @HttpCode(200)
  async findAllAthletes(): Promise<AthleteResponse[]> {
    return await this.athleteDbService.findAll();
  }
}
