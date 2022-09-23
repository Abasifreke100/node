import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'rxjs';
import { environment } from 'src/common/config/environment';
import { OtpEnum } from 'src/common/constants/otp.enum';
import { generateIdentifier } from 'src/common/utils/uniqueId';
import { MailService } from '../mail/mail.service';
import { User, UserDocument } from '../user/schema/user.schema';
import { Otp, OtpDocument } from './schema/otp.schema';

@Injectable()
export class OtpService {
  constructor(
    private mailService: MailService,
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  async create(email: string, reason: OtpEnum): Promise<OtpDocument> {
    const otp = this.generateOTP();
    console.log(otp);
    try {
      const subject = `${environment.APP.NAME} - One time password`;
      const user = await this.userModel.findOne({ email });
      console.log(user);
      if (user) {
        throw new NotFoundException('This email does not exist');
      }
      await this.otpModel.updateMany({
        email,
        deactivated: true,
      });
      const createdOtp = this.otpModel.create({ otp, reason, email });
      if (!createdOtp) {
        throw new BadRequestException('Could not create otp');
      }
      // await this.mailService.sendMail({
      //   to: email,
      //   subject,
      //   template: './otp',
      //   context: { otp },
      // });
      return createdOtp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
