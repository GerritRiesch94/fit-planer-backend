import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AthleteController } from './athlete/athlete.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Athlete, AthleteSchema } from './athlete/database/athlete.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: Athlete.name, schema: AthleteSchema }]),
  ],
  controllers: [AppController, AthleteController],
  providers: [AppService],
})
export class AppModule {}
