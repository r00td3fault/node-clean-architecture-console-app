import { envs } from "../../config/plugins/envs.plugin";
import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';




describe('Email service', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);

    test('should send email', async () => {
        const options: SendMailOptions = {
            to: 'prueba@prueba.com',
            subject: 'Test mailer',
            htmlBody: '<h1>Prueba de correo</h1>',
        }

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
            to: 'prueba@prueba.com',
            subject: 'Test mailer',
            html: '<h1>Prueba de correo</h1>',
        }));
    });

    // test('should sent email with correct config', async () => {
    //     const options: SendMailOptions = {
    //         to: 'prueba@prueba.com',
    //         subject: 'Test mailer',
    //         htmlBody: '<h1>Prueba de correo</h1>',
    //     }

    //     const emailSent = await emailService.sendEmail(options);

    //     expect(emailSent).toBeTruthy();
    // });

    test('should send email with attachments', async () => {
        const emailTest = 'prueba@prueba.com';
        await emailService.sendEmailWithFileSystemLogs(emailTest);

        expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
            to: emailTest,
            subject: 'Logs del servidor',
            html: expect.any(String),
        }));
    });

});