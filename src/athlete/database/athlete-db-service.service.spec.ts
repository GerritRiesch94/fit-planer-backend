import { Test, TestingModule } from '@nestjs/testing';
import { AthleteDbServiceService } from './athlete-db-service.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Athlete, AthleteSchema } from './athlete.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AthleteDbServiceService', () => {
  let service: AthleteDbServiceService;

  let mongodb: MongoMemoryServer;
  let athleteModel: Model<Athlete>;
  let uri: string;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    uri = mongodb.getUri();
    mongoConnection = (await connect(uri)).connection;
    athleteModel = mongoConnection?.model(Athlete.name, AthleteSchema);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AthleteDbServiceService,
        { provide: getModelToken(Athlete.name), useValue: athleteModel },
      ],
    }).compile();

    service = module.get<AthleteDbServiceService>(AthleteDbServiceService);
  });

  afterEach(async () => {
    await mongoConnection.dropDatabase();
  });

  afterAll(async () => {
    await mongoConnection.close();
    await mongodb.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save athlete in database', async () => {
    // act
    const savedAthlete = await service.create({
      combinedName: 'Stefan Sportler',
      age: '32',
      combinedAddress: 'Am Acker 31, 90469 Nürnberg',
      email: 'stefan.sportler@live.de',
      phoneNumber: '017612345678',
    });

    // assert
    expect(savedAthlete).toEqual(
      expect.objectContaining({
        combinedName: 'Stefan Sportler',
        age: '32',
        combinedAddress: 'Am Acker 31, 90469 Nürnberg',
        email: 'stefan.sportler@live.de',
        phoneNumber: '017612345678',
      }),
    );
  });

  it('should return all athletes', async () => {
    // arrange
    await new athleteModel({
      combinedName: 'Anna Athletin',
      age: '40',
      combinedAddress: 'Bergstraße 12, 90411Nürnberg',
      email: 'anna.athletin@live.de',
      phoneNumber: '016987654321',
    }).save();

    // act
    const savedAthletes = await service.findAll();

    // assert
    expect(savedAthletes).toEqual([
      expect.objectContaining({
        combinedName: 'Anna Athletin',
        age: '40',
        combinedAddress: 'Bergstraße 12, 90411Nürnberg',
        email: 'anna.athletin@live.de',
        phoneNumber: '016987654321',
      }),
    ]);
  });
});
