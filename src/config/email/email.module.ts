import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfigService } from './email-config.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useClass: EmailConfigService
        })
    ],
    exports: [EmailConfigService],
    providers: [EmailConfigService]
})
export class EmailModule { }