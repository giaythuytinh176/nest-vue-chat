import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async saveMessageUser(name: string, text: string) {
    const userText = {
      name,
      text,
    };

    try {
      const user = new this.userModel(userText);
      return await user.save();
    } catch (e) {
      console.log('e', e);
    }
  }
}
