import { envs } from './envs.plugin';
import * as env from "env-var";

describe("envs.plugin.ts", () => {
    test("should return env options", () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: "gmail",
            MAILER_EMAIL: "juandavid918@gmail.com",
            MAILER_SECRET_KEY: "123456",
            PROD: false,
            MONGO_URL: "mongodb://juandavid:123456789@localhost:27017/",
            MONGO_DB_NAME: "NOC-TEST",
            MONGO_USER: "juandavid",
            MONGO_PASS: 123456789,
            POSTGRES_URL: "postgresql://postgres:123456789@localhost:5432/NOC",
            POSTGRES_USER: "postgres",
            POSTGRES_PASSWORD: "123456789",
            POSTGRES_DB: "NOC-TEST"
        });
    });

    test("should return error if not found env", async() => {
        jest.resetModules();
        process.env.PORT = "ABC";

        try {
            await import("./envs.plugin");

            expect(true).toBeFalsy();
        } catch (error) {
            expect(`${ error }`).toContain('"PORT" should be a valid integer');
        }
    });
});