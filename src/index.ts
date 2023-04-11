import gpt from "./access/discord";
import Controller from "./class/Controller";
import nextJsCoder from "./access/nextJsCoder";
import htmlPage from './access/htmlPage';

Controller.get("/", () => {
  return { status: "online" };
});

Controller.get("/nextjscoder", nextJsCoder);

Controller.get("/htmlpage", htmlPage);

gpt()