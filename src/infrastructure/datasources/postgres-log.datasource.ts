import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prismaClient = new PrismaClient();

const securityLevel = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};


export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = securityLevel[log.level];

        await prismaClient.logModel.create({
            data: {
                ...log,
                level
            }
        });

        console.log('Posgres log created');

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: securityLevel[severityLevel]
            }
        });

        return logs.map(prismaLog => LogEntity.fromObject(prismaLog));
    }

}