import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Athlete, AthleteDocument } from './athlete.schema';
import { Model } from 'mongoose';

@Injectable()
export class AthleteDbServiceService {
  constructor(
    @InjectModel(Athlete.name) private athleteModel: Model<AthleteDocument>,
  ) {}

  async create(athleteDto: Athlete): Promise<Athlete> {
    const createdAthlete = new this.athleteModel(athleteDto);
    return createdAthlete.save();
  }

  async findAll(): Promise<Athlete[]> {
    return this.athleteModel.find().exec();
  }
}
