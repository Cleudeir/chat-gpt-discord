import dotenv from "dotenv";
dotenv.config();

class Environment {
  public get(EnvName: string) {
    return process.env[EnvName];
  }
}
export default new Environment();
