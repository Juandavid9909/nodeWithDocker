import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    const newLog = await LogModel.create({
        message: "Test message desde Mongo",
        origin: "App.ts",
        level: "low"
    });

    await newLog.save();

    Server.start();
}