import { Test, TestingModule } from '@nestjs/testing';
import { AthleteController } from './athlete.controller';
import { AthleteDbServiceService } from './database/athlete-db-service.service';

describe('AthleteController', () => {
  let controller: AthleteController;
  const athleteDbServiceMock = { findAll: jest.fn(), create: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AthleteController],
      providers: [
        { provide: AthleteDbServiceService, useValue: athleteDbServiceMock },
      ],
    }).compile();

    controller = module.get<AthleteController>(AthleteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all athletes for get api', async () => {
    // arrange
    const athleteResponse = {
      combinedName: 'Stefan Sportler',
      age: '32',
      combinedAddress: 'Am Acker 31, 90469 Nürnberg',
      email: 'stefan.sportler@live.de',
      phoneNumber: '017612345678',
    };

    const findAllSpy = jest
      .spyOn(athleteDbServiceMock, 'findAll')
      .mockReturnValue(athleteResponse);

    // act
    const result = await controller.findAllAthletes();

    // assert

    expect(result).toStrictEqual(athleteResponse);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  it('should successfully create athlete for post api', async () => {
    // arrange
    const athleteResponse = {
      combinedName: 'Stefan Sportler',
      age: '32',
      combinedAddress: 'Am Acker 31, 90469 Nürnberg',
      email: 'stefan.sportler@live.de',
      phoneNumber: '017612345678',
    };
    const createSpy = jest
      .spyOn(athleteDbServiceMock, 'create')
      .mockReturnValue(athleteResponse);

    const athleteToCreate = {
      combinedName: 'Stefan Sportler',
      age: '32',
      combinedAddress: 'Am Acker 31, 90469 Nürnberg',
      email: 'stefan.sportler@live.de',
      phoneNumber: '017612345678',
    };

    // act

    const result = await controller.createAthlete(athleteToCreate);

    // assert
    expect(result).toStrictEqual(athleteResponse);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toBeCalledWith(athleteToCreate);
  });
});
