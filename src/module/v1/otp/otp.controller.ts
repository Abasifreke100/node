import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Public()
  @Post('users')
  async creates(@Body() createOtpDto: CreateOtpDto) {
    const { email, reason } = createOtpDto;
    const createOtp = this.otpService.creates(email, reason);
    return { data: createOtp, message: 'An email has been sent to you' };
  }

  @Public()
  @Post()
  async create(@Body() createOtpDto: CreateOtpDto) {
    const { email, reason } = createOtpDto;
    const createOtp = await this.otpService.create(email, reason);
    console.log(createOtp);

    return {
      data: createOtp,
      message: 'An email has been sent to you',
    };
  }
}
