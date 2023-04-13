import discord from "./discord/initial";
import Controller from "./express/server/Controller";
import nextJsCoder from "./express/access/nextJsCoder";
import htmlPage from "./express/access/htmlPage";

Controller.get("/", () => {
  return { status: "online" };
});

Controller.get("/nextjscoder", nextJsCoder);

Controller.get("/htmlpage", htmlPage);

discord();
