import { ApiProperty } from '@nestjs/swagger';

export class AthleteRequest {
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
