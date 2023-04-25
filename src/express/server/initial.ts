import express from "express";
import cors from "cors";
import environment from "../../util/Environment";
class Server {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middleware();
  }
  private middleware() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.listen(environment.get("PORT") || 4000, () => {
      console.log(`☼ initial server ☼`);
    });
  }
}
export default new Server().express;
