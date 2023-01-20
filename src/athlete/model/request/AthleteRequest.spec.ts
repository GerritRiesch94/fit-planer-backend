import { Address, AthleteRequest, mapToAthleteDbModel } from './AthleteRequest';
import { Athlete } from '../../database/athlete.schema';

describe('AthleteRequest Test', () => {
  it('should map to expected athlete model', () => {
    // arrange
    const athleteRequest: AthleteRequest = {
      title: 'Mr.',
      firstName: 'Ash',
      lastName: 'Ketchum',
      age: '34',
      gender: 'm',
      address: {
        street: 'Street 1',
        addressAppendix: 'First Floor',
        postCode: '12345',
        city: 'Alabastia',
        state: 'Kanto',
        country: 'Japan',
      },
      email: 'ash.ketchum@pokemail.com',
      phoneNumber: '0123456789',
    };

    // act
    const result = mapToAthleteDbModel(athleteRequest);

    // assert
    expect(result).toStrictEqual({
      combinedName: 'Mr. Ash Ketchum',
      age: '34',
      gender: 'm',
      combinedAddress: 'Street 1, First Floor, 12345 Alabastia, Kanto, Japan',
      email: 'ash.ketchum@pokemail.com',
      phoneNumber: '0123456789',
    } as Athlete);
  });

  it.each([
    {
      input: {
        street: 'Street 1',
        postCode: '12345',
        city: 'Alabastia',
        country: 'Japan',
      } as Address,
      expected: 'Street 1, 12345 Alabastia, Japan',
      case: 'map without appendix and state',
    },
    {
      input: {
        street: 'Street 1',
        addressAppendix: 'First Floor',
        postCode: '12345',
        city: 'Alabastia',
        country: 'Japan',
      } as Address,
      expected: 'Street 1, First Floor, 12345 Alabastia, Japan',
      case: 'map with appendix and without state',
    },
    {
      input: {
        street: 'Street 1',
        postCode: '12345',
        city: 'Alabastia',
        state: 'Kanto',
        country: 'Japan',
      } as Address,
      expected: 'Street 1, 12345 Alabastia, Kanto, Japan',
      case: 'map without appendix and with state',
    },
    {
      input: {
        street: 'Street 1',
        addressAppendix: 'First Floor',
        postCode: '12345',
        city: 'Alabastia',
        state: 'Kanto',
        country: 'Japan',
      } as Address,
      expected: 'Street 1, First Floor, 12345 Alabastia, Kanto, Japan',
      case: 'map with every property present',
    },
  ])(
    'it should map to expected address string for case: $case ',
    ({ input, expected }) => {
      // arrange
      const athleteRequest: AthleteRequest = {
        title: 'Mr.',
        firstName: 'Ash',
        lastName: 'Ketchum',
        age: '34',
        gender: 'm',
        address: { ...input },
        email: 'ash.ketchum@pokemail.com',
        phoneNumber: '0123456789',
      };

      // act
      const result = mapToAthleteDbModel(athleteRequest);

      // assert
      expect(result.combinedAddress).toBe(expected);
    },
  );
});
