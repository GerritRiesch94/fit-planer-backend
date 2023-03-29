import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('api/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getData(
    @Param('id') id: string,
    @Query('skip') skip: number,
    @Query('top') top: number,
    @Res() response: Response,
  ): Promise<void> {
    // should represent a database service, api call, etc.
    const data = this.appService.searchForIdAndPaginate(id, skip, top);

    if (data.length > 0) {
      response.status(200).send(data);
    } else {
      response.status(204).send();
    }
  }
}
