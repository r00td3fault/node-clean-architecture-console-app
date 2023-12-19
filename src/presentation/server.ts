import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { PrismaClient } from "@prisma/client";
import { envs } from "../config/plugins/envs.plugin";



const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresRepository = new LogRepositoryImpl(new PostgresLogDatasource());


const logRepositorys = [fileSystemRepository, mongoRepository, postgresRepository];


const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);

const prisma = new PrismaClient();

export class Server {

    public static async start() {

        console.log('Server started....');

        // Use case  send email with injected dependencies
        new SendEmailLogs(
            emailService,
            fileSystemRepository
        ).execute(['prueba@gmail.com, otraprueba@gmail.com']);


        //Use case check service and implement repository patterm

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckServiceMultiple(
                    logRepositorys,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error),
                ).execute(url);
            }
        );


        // get logs from each repository

        const logs = await fileSystemRepository.getLogs(LogSeverityLevel.high);
        console.log('Filesystem', logs);
        const mongoLogs = await mongoRepository.getLogs(LogSeverityLevel.high);
        console.log('Mongo', mongoLogs);
        const postgresLogs = await fileSystemRepository.getLogs(LogSeverityLevel.high);
        console.log('Postgres', postgresLogs);

    }

}