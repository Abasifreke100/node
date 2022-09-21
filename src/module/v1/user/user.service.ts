import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `${Object.keys(error.keyValue)} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findById(_id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(_id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(query: object): Promise<UserDocument> {
    return await this.userModel.findOne(query);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ email }).select('+password');
      if (!user) {
        throw new NotFoundException('User with this email not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      if (!user) {
        throw new NotFoundException('User with this email not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
