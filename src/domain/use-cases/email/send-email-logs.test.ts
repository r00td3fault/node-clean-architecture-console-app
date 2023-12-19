import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";




describe('SendEmail  UseCase', () => {

    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
    } as unknown as EmailService;

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should call sendEmail and saveLog', async () => {

        const sendEmailLogs = new SendEmailLogs(mockEmailService, mockLogRepository);

        const result = await sendEmailLogs.execute('prueba@prueba.com');

        expect(result).toBeTruthy();

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled();
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(expect.any(String));
        expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });


    test('Should log in case of error', async () => {

        const mockEmailService = {
            sendEmail: jest.fn(),
            sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(false),
        } as unknown as EmailService;

        const sendEmailLogs = new SendEmailLogs(mockEmailService, mockLogRepository);

        const result = await sendEmailLogs.execute('prueba@prueba.com');

        expect(result).toBeFalsy();

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(expect.any(String));
        expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({
            level: 'high',
            origin: 'send-email-logs.ts'
        }));

    });
});