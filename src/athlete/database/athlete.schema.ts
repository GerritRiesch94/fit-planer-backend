import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AthleteDocument = HydratedDocument<Athlete>;
@Schema()
export class Athlete {
  @Prop()
  combinedName: string;
  @Prop()
  age: string;
  @Prop()
  gender: string;
  @Prop()
  combinedAddress: string;
  @Prop()
  email: string;
  @Prop()
  phoneNumber: string;
}

export const AthleteSchema = SchemaFactory.createForClass(Athlete);
