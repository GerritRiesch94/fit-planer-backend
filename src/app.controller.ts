import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app-controller')
@Controller('api/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @ApiOperation({ description: 'Get a list of strings' })
  @ApiResponse({
    status: 200,
    description: 'return list of strings for id and pagination params',
    type: [String],
  })
  @ApiResponse({
    status: 204,
    description: 'empty list found for given parameter',
  })
  @ApiResponse({
    status: 404,
    description: 'no resources found for given id',
  })
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
