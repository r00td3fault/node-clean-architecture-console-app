import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    path: string;
}



export class EmailService {


    constructor(private mail_service: string, private userEmail: string, private userPass: string) { }

    private transporter = nodemailer.createTransport({
        service: this.mail_service,
        auth: {
            user: this.userEmail,
            pass: this.userPass,
        }
    });







    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3> Logs del sistema - NOC </h3>
            <p> fdsjfds lfds fjds fljds f7r ewjkf ldjf adsfdlsjf ljd sljf lfj lsa ljdsdf </p>
            <p> Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        return this.sendEmail({
            to, subject, htmlBody, attachments
        })
    }
}