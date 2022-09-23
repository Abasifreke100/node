import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail({ to, subject, template, context }) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
