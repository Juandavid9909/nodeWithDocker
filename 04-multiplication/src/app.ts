import { ServerApp } from "./presentation/server-app";
import { yarg } from "./config/args.plugins";

(async () => {
    await main();
})();

async function main() {
    const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarg;
    console.log(yarg);

    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}