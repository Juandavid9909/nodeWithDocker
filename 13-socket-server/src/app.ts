import { createServer } from "http";

import { AppRoutes } from "./presentation/routes";
import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { WssService } from "./presentation/services/wss.service";

(async() => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT
  });

  const httpServer = createServer(server.app);
  WssService.initWss({ server: httpServer });

  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${ envs.PORT }`);
  });
}