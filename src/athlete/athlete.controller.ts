import { Controller, Get, HttpCode } from '@nestjs/common';
import { AthleteResponse } from './model/response/AthleteResponse';

@Controller('athlete')
export class AthleteController {
  @Get()
  @HttpCode(200)
  findAllAthletes(): AthleteResponse[] {
    return [
      {
        combinedName: 'Stefan Sportler',
        age: '32',
        combinedAddress: 'Am Acker 31, 90469 Nürnberg',
        email: 'stefan.sportler@live.de',
        phoneNumber: '017612345678',
      },
      {
        combinedName: 'Anna Athletin',
        age: '40',
        combinedAddress: 'Bergstraße 12, 90411Nürnberg',
        email: 'anna.athletin@live.de',
        phoneNumber: '016987654321',
      },
    ];
  }
}
