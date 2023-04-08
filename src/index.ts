import discordChatGpt from "./access/discordChatGpt";
import Controller from "./class/Controller";
import htmlpage from "./access/htmlpage";
import nextjscoder from "./access/nextjscoder";

Controller.get("/", () => {
  return { status: "online" };
});

Controller.get("/nextjscoder", nextjscoder);

Controller.get("/htmlpage", htmlpage);

discordChatGpt()