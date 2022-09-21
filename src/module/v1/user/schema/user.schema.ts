import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
    enum: ['CUSTOMER', 'ADMIN', 'SUPER_ADMIN', 'SUPPORT', 'ACCOUNT'],
    default: 'CUSTOMER',
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
