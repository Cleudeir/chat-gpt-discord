import discordChatGpt from "./access/discordChatGpt";
import Controller from "./class/Controller";
import nextjscoder from "./access/nextjscoder";
import htmlpage from './access/htmlpage';

Controller.get("/", () => {
  return { status: "online" };
});

Controller.get("/nextjscoder", nextjscoder);

Controller.get("/htmlpage", htmlpage);

discordChatGpt()