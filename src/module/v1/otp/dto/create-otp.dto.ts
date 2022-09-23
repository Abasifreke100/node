import { IsEmail, IsEnum, IsNumber } from 'class-validator';
import { OtpEnum } from 'src/common/constants/otp.enum';

export class CreateOtpDto {
  @IsEmail()
  email: string;

  @IsEnum(OtpEnum)
  reason: OtpEnum;
}
