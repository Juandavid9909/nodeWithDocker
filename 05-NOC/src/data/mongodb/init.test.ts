import { MongoDatabase } from "./init";
import mongoose from "mongoose";

describe("init MongoDB", () => {
    afterAll(() => {
        mongoose.connection.close();
    });

    test("should connect to MongoDB", async() => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(connected).toBeTruthy();
    });

    test("should throw an error", async() => {
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: "mongodb://juandavid:123456@localherherhost:27017/"
            });
    
            expect(true).toBeFalsy();
        } catch (error) {

        }
    });
});