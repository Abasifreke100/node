import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/v1/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './module/v1/auth/auth.module';
import { environment } from './common/config/environment';
import { OtpModule } from './module/v1/otp/otp.module';
import { MailModule } from './module/v1/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: environment.DB.URL,
        keepAlive: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    OtpModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
