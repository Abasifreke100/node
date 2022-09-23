import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleEnum } from 'src/common/constants/user.constants';
import { Kyc } from './kyc.schema';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, trim: true })
  phone: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ trim: true, select: false })
  pin: string;

  @Prop({
    enum: [
      RoleEnum.CUSTOMER,
      RoleEnum.ADMIN,
      RoleEnum.SUPER_ADMIN,
      RoleEnum.SUPPORT,
      RoleEnum.ACCOUNT,
    ],
    default: RoleEnum.CUSTOMER,
  })
  role: string;

  @Prop({
    select: false,
    minlength: [8, 'Password must be a least 8 characters'],
  })
  password: string;

  @Prop({ default: false })
  suspend: boolean;

  @Prop({ default: false })
  hasPin: boolean;

  @Prop()
  country: string;

  @Prop()
  dailCode: string;

  @Prop()
  userIP: string;

  @Prop()
  lastActive: Date;

  @Prop({ default: {} })
  verification: Kyc;
}

export const UserSchema = SchemaFactory.createForClass(User);
