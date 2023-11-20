import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './config/storage/storage.module';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './models/user/user.module';
import { RoleModule } from './models/role/role.module';
import { UserRoleModule } from './models/user-role/user-role.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'authentication/auth/auth.module';
import { DoctorRegisterModule } from './models/doctor_register/doctor_register.module';
import { SpecializedModule } from './models/specialized/specialized.module';
import { DoctorSpecializedModule } from './models/doctor_specialized/doctor_specialized.module';
import { EmailModule } from 'config/email/email.module';
import { ConversationModule } from './models/conversation/conversation.module';
import { MessageModule } from './models/message/message.module';
import { PatientRegisterModule } from './models/patient_register/patient_register.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StorageModule,
    DatabaseModule,
    UserModule,
    RoleModule,
    UserRoleModule,
    AuthModule,
    HttpModule,
    EmailModule,
    DoctorRegisterModule,
    SpecializedModule,
    DoctorSpecializedModule,
    ConversationModule,
    MessageModule,
    PatientRegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
