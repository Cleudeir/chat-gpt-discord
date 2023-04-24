import environment from "../other/Environment";
import { Client, GatewayIntentBits } from "discord.js";
import OpenAi from "../openAi";
import commands from "./commands";
import { model } from "../types";
import fsPromises from "fs/promises";
import fs from "fs";
import { contentProject } from "./contentProject";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function discord() {
  const bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  });
  bot.login(environment.get("DISCORD_KEY"));
  bot.on("ready", async () => {
    console.log("✔️  Bot is initiate");
    bot.user?.setActivity("Listening");
  });
  let count = 1;
  bot.on("messageCreate", async (messageCreate) => {
    const time = Date.now();
    const user = messageCreate.author.username.replace(/[^0-9a-z]/gi, "");
    let data = await OpenAi.messagesRead(user);
    let message = messageCreate.content.toLocaleLowerCase();
    const channelType: string = messageCreate.channel.type as unknown as string;
    console.log("message: ", user, message, data.messages.length);

    if (
      (messageCreate.author.bot && !message.includes("$")) ||
      channelType === "dm"
    ) {
      return;
    }
    if (messageCreate.author.bot) {     
      data.messages[0].content = contentProject;
      data.config.model = model.gptTurbo003;
      message = message.replace("$", "");
      console.log("autoBot: ", message);
    }
    const botMessage ="create a code to file "
    if (message === "!start") {      
      data = await OpenAi.messagesRead("chatgpt");
      await messageCreate.channel.send("$!project"); 
      count = Number(data.messages.filter(x=> x.role === "user").pop()?.content.replace(botMessage, "")) + 1 || 1
      console.log(data, count)
      await messageCreate.channel.send(`$${botMessage}${count}.`);
      return;
    }

    let result = await messageCreate.channel.send(`Já respondo...`);
    
  
    const SystemContent = data.messages[0].content.toLocaleLowerCase();

    const command = await commands(data, user, message);
    if (command) {
      await result.edit(command);
      return;
    }
    let response: string = "";
    if (data.config.model === model.textDavinci003) {
      await result.edit(`Já respondo, em 15s ...`);

      response = await OpenAi.fast(message, data);
    } else if (data.config.model === model.gptTurbo003) {
      await result.edit(`Já respondo, em 30s ...`);

      if (SystemContent.includes("english")) {
      } else if (SystemContent.includes("coder")) {
        data = { messages: [data.messages[0], ...data.messages.slice(-5)], config: data.config };
      }
      response = await OpenAi.slow(user, message, data);
    }
    await result.edit(`${response.slice(0, 2000)}`);
    if (SystemContent.includes("coder") && count < 74) {
      if (message.includes(botMessage)) {
        count = Number(message.replace(botMessage, ""));
      }
      console.log(response);
      console.log("sleep");
      await sleep(10 * 1000);
      console.log("sleep");
      try {
        const name = response
          .split("\n")
          .join(" ")
          .split(" ")
          .filter((x) => x.includes(".ts") || x.includes(".tsx") || x.includes(".css"))[0]
          .split("`")
          .join("")
          .replace(/["]/g, "")
          .replace(",","");
        const codeText = response
          .split("```")[1]
          .replace("tsx", "")
          .replace("ts", "")
          .replace("typescript", "")
          .replace("javascript", "");
        const file = `temp/project/${name}`;
        const splitFileName = file.split("/");
        const path = splitFileName.slice(0, splitFileName.length - 1).join("/");
        console.log("file :\n", file);
        console.log("path :\n", path);
        console.log("codeText :\n", codeText);
        if (!fs.existsSync(path)) {
          await fsPromises.mkdir(path, { recursive: true });
        }
        await fsPromises.writeFile(file, codeText);
        count++;       
      } catch (error: any) {
        console.log("user: ", user)
        const messages = data.messages.slice(0,-1)
        const config = data.config
        await OpenAi.messagesWrite(user,{messages, config})
        console.log(error?.message);
      }
      if (messageCreate.author.bot) {   
      setTimeout(() => {
        messageCreate.channel.send(`$${botMessage}${count}`);
      }, 10000);
    }
    }
    console.log("Tempo para resposta: ", (Date.now() - time) / 1000, "s");
  });
}

export default discord;
