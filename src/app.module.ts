import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AthleteController } from './athlete/athlete.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Athlete, AthleteSchema } from './athlete/database/athlete.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AthleteDbServiceService } from './athlete/database/athlete-db-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/${process.env.NODE_ENV}.env` }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `env/${process.env.NODE_ENV}.env`,
        }),
      ],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: Athlete.name, schema: AthleteSchema }]),
  ],
  controllers: [AppController, AthleteController],
  providers: [AppService, AthleteDbServiceService, ConfigService],
})
export class AppModule {}
