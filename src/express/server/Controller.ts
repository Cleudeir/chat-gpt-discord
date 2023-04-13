import { PathParams } from "express-serve-static-core";
import Server from "./initial";

class Controller {
  async get(path: String, _function: Function) {
    if (path !== "") {
      console.log(`create GET controller path http://localhost:4000${path}`);
    }
    const _path = path as PathParams;

    Server.get(_path, async (req, res) => {
      const query = req.query;
      console.log(query);
      const result = await _function(query);
      res.send(result);
    });
  }
  async post(path: String, _function: Function) {
    if (path !== "") {
      console.log(`create POST controller path http://localhost:4000${path}`);
    }

    const _path = path as PathParams;
    Server.post(_path, async (req, res) => {
      const body = req.body;
      console.log(body);
      const result = await _function(body);
      res.send(result);
    });
  }
  async put(path: String, _function: Function) {
    if (path !== "") {
      console.log(`create PUT controller path http://localhost:4000${path}`);
    }
    const _path = path as PathParams;
    Server.put(_path, async (req, res) => {
      const query = req.query;
      const body = req.body;
      console.log(body, query);
      const result = await _function(query, body);
      res.send(result);
    });
  }
  async remove(path: String, _function: Function) {
    if (path !== "") {
      console.log(`create DELETE controller path http://localhost:4000${path}`);
    }
    const _path = path as PathParams;
    Server.delete(_path, async (req, res) => {
      const query = req.query;
      console.log(query);
      const result = await _function(query);
      res.send(result);
    });
  }
}
export default new Controller();
