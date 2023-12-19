import { envs } from "./envs.plugin";


describe('envs.plugin.ts -> enviroment variables', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'n0m0r3inf0@gmail.com',
            MAILER_SECRET_KEY: 'atndqglbnvrjrmaj',
            PROD: false,
            MONGO_URL: 'mongodb://oto:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'oto',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5434/NOC_TEST',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'NOC_TEST',
            POSTGRES_PASSWORD: '123456789'
        });
    });

    test('should return error if not found correct env var', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {

            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain(' "PORT" should be a valid integer');
        }
    });
});
