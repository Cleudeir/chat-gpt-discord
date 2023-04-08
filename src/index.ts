import chatbot from "./bots/chatbot";
import Controller from "./class/Controller";
import htmlpage from "./pages/htmlpage";
import nextjspage from "./pages/nextjspage";

Controller.get("/", () => {
  return { status: "online" };
});

Controller.get("/nextjspage", nextjspage);

Controller.get("/htmlpage", htmlpage);

chatbot()