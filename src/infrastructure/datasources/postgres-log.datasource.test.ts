import { Prisma, PrismaClient } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDatasource } from "./postgres-log.datasource";
import { DefaultArgs } from "@prisma/client/runtime/library";



describe('PostgresLogDatasource', () => {

    const postgresDatasource = new PostgresLogDatasource();

    let prismaClient: PrismaClient;

    beforeAll(() => {
        prismaClient = new PrismaClient();
    });

    afterEach(async () => {
        await prismaClient.logModel.deleteMany();
    });

    afterAll(() => {
        prismaClient.$disconnect();
    });

    const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Testst',
        origin: 'postgres-log.datasource.test.ts'
    });

    test('should create source', async () => {
        const logSpy = jest.spyOn(console, 'log');
        await postgresDatasource.saveLog(log);

        await prismaClient.logModel.findMany({
            where: {
                level: 'HIGH'
            }
        });

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Posgres log created');
    });

    test('should get logs ', async () => {
        await postgresDatasource.saveLog(log);
        await postgresDatasource.saveLog(log);

        const logs = await prismaClient.logModel.findMany({
            where: {
                level: 'HIGH'
            }
        });

        expect(logs).toHaveLength(2);
        expect(logs[0]).toMatchObject({
            message: 'Testst',
            origin: 'postgres-log.datasource.test.ts',
            level: 'HIGH'
        });
    });
});