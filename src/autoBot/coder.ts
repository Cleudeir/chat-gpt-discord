import commands from "../discord/commands";
import { contentProject } from "./contentProject";
import { DataUser, model } from "../types";

import sleep from "../util/sleep";
import { Message } from "discord.js";
import Cache from "../Cache";
import replaceText from "../util/replaceText";
import ChatGpt from "../OpenAi";


export default async function coder(count: number, messageCreate: Message<boolean>) {
  const botName = "coder";
  let message = messageCreate.content.toLocaleLowerCase().replace("$", "");
  const cache = new Cache(botName, "json");
  let data: DataUser | null = await cache.messagesRead(botName);
  if (!data) {
    data = {
      messages: [
        {
          content: contentProject,
          role: "system",
        },
      ],
      config: { model: model.gptTurbo003 },
    };
    await cache.messagesWrite(botName, data);
  }
  const botMessage = "create a code to file ";
  count =
    Number(
      data.messages
        .filter((x: any) => x.role === "user")
        .pop()
        ?.content.replace(botMessage, "")
    ) +1 || 1;

  let result = await messageCreate.channel.send(`Já respondo...`);
  await result.edit(`Já respondo, em 30s ...`);

  data = {
    messages: [data.messages[0], ...data.messages.slice(-5)],
    config: data.config,
  };
  let response = await ChatGpt.slow(message, data);
  await result.edit(`${response.slice(0, 2000)}`);
  if (count < 74) {
    if (message.includes(botMessage)) {
      count = Number(message.replace(botMessage, ""));
    }
    console.log("sleep");
    await sleep(10 * 1000);
      const text = replaceText(response);
      if(text){
        const { fileName, path, extension, code } = text
        console.log("path : ", `project/${path}/${fileName}.${extension}`);
        const createProject = new Cache(`project/${path}`, extension);
        await createProject.messagesWrite(fileName, code);
        count++;
        await result.edit(`${response.slice(0, 2000)}`);
      }else{        
        await result.edit(`Concepcion error`);
      }
      setTimeout(() => {
        messageCreate.channel.send(`$${botMessage}${count}`);
      }, 10000);
  }
}
