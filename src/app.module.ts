import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AthleteController } from './athlete/api/athlete.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Athlete, AthleteSchema } from './athlete/database/athlete.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AthleteDbServiceService } from './athlete/database/athlete-db-service.service';
import { MongoMemoryServer } from 'mongodb-memory-server';

const IS_LOCAL_ENV = 'IS_LOCAL_ENV';
const WITH_DOCKER = 'WITH_DOCKER';
const MONGODB_URI = 'MONGODB_URI';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/${process.env.NODE_ENV}.env` }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return await setupMongoDBConnection(config);
      },
    }),
    MongooseModule.forFeature([{ name: Athlete.name, schema: AthleteSchema }]),
  ],
  controllers: [AppController, AthleteController],
  providers: [AppService, AthleteDbServiceService, ConfigService],
})
export class AppModule {}

async function setupMongoDBConnection(
  config: ConfigService<Record<string, unknown>, false>,
): Promise<{ uri: string | undefined }> {
  if (
    config.get<string>(IS_LOCAL_ENV) === 'true' &&
    config.get<string>(WITH_DOCKER) === 'false'
  ) {
    console.log('Setup In Memory MongoDB');
    const inMemoryMongodb = await MongoMemoryServer.create();
    return { uri: inMemoryMongodb.getUri() };
  } else {
    console.log('Setup physical MongoDB');
    return { uri: config.get<string>(MONGODB_URI) };
  }
}
