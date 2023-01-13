import { ApiProperty } from '@nestjs/swagger';

export class AthleteResponse {
  @ApiProperty()
  combinedName: string;
  @ApiProperty()
  age: string;
  @ApiProperty()
  combinedAddress: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
}
