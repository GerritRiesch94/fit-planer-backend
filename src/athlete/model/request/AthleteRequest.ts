import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Athlete } from '../../database/athlete.schema';

@ApiExtraModels()
export class Address {
  @ApiProperty()
  street: string;
  @ApiProperty()
  addressAppendix?: string;
  @ApiProperty()
  postCode: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  country: string;
}
export class AthleteRequest {
  @ApiProperty()
  title: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  age: string;
  @ApiProperty()
  gender: string;
  @ApiProperty({ type: Address })
  address: Address;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
}

export function mapToAthleteDbModel(athleteRequest: AthleteRequest): Athlete {
  return {
    combinedName: `${athleteRequest.title} ${athleteRequest.firstName} ${athleteRequest.lastName}`,
    age: athleteRequest.age,
    gender: athleteRequest.gender,
    combinedAddress: createAddress(athleteRequest.address),
    email: athleteRequest.email,
    phoneNumber: athleteRequest.phoneNumber,
  };
}

function createAddress(address: Address): string {
  let street = address.street;
  const addressAppendix = address.addressAppendix;
  const postCode = address.postCode;
  const city = address.city;
  const state = address.state;
  const country = address.country;

  if (addressAppendix) {
    street = `${street}, ${addressAppendix}`;
  }

  if (state) {
    return `${street}, ${postCode} ${city}, ${state}, ${country}`;
  }

  return `${street}, ${postCode} ${city}, ${country}`;
}
