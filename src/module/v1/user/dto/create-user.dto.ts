import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 30)
  @IsString()
  firstName: string;

  @Length(2, 30)
  @IsString()
  lastName: string;

  @IsString()
  dailCode: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  password: string;

  @IsString()
  country: string;
}
