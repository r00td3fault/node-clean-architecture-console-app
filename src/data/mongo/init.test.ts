import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('Init MongoDb', () => {

    afterAll(() => {
        mongoose.connection.close();
    })
    test('should connect to Mongo', async () => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        });

        expect(connected).toBeTruthy();
    });

    test('should throw an error', async () => {

        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://oto:123456789@localhsddsddost:27017',
            });
            expect(true).toBe(false);
        } catch (error) {

        }
    });
});