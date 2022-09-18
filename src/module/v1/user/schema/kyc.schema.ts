import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KycDocument = Kyc & Document;

@Schema()
export class Kyc {
  @Prop({ default: false })
  email: boolean;

  @Prop({ default: false })
  bvn: boolean;

  @Prop({ default: false })
  nin: boolean;

  @Prop({ default: false })
  business: boolean;
}

export const KycSchema = SchemaFactory.createForClass(Kyc);
