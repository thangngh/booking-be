import { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Injectable()
export class EmailConfigService implements MailerOptionsFactory {

    constructor(private configService: ConfigService) { }

    createMailerOptions(): MailerOptions | Promise<MailerOptions> {
        return {
            transport: {
                host: this.configService.get('MAIL_HOST'),
                secure: true,
                port: this.configService.get('MAIL_PORT'),
                auth: {
                    user: this.configService.get('MAIL_USER'),
                    pass: this.configService.get('MAIL_PASSWORD')
                },
            },
            defaults: {
                from: `"booking doctor"`,
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }
    }

}