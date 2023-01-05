import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AthleteController } from './athlete/athlete.controller';

@Module({
  imports: [],
  controllers: [AppController, AthleteController],
  providers: [AppService],
})
export class AppModule {}
