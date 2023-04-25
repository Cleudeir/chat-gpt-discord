import commands from "../discord/commands";
import { contentProject } from "./contentProject";
import { DataUser, model } from "../types";

import sleep from "../util/sleep";
import { Message } from "discord.js";
import Cache from "../Cache";
import replaceText from "../util/replaceText";
import ChatGpt from "../OpenAi";

export default async function coder(
  botMessage: string,
  count: number,
  messageCreate: Message<boolean>,
  setCount: (number: number) => void
) {
  const botName = "coder";
  let message = messageCreate.content.toLocaleLowerCase().replace("$", "");
  const cache = new Cache("profile", "json");
  let data: DataUser = await cache.messagesRead(botName);
  if (!data) {
    console.log("new coder");
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

  count =
    Number(
      data.messages
        .filter((x: any) => x.role === "user")
        .pop()
        ?.content.replace(botMessage, "")
    ) + 1 || 1;
  setCount(count);
  message = `${botMessage}${count}`;
  console.log(message);
  let result = await messageCreate.channel.send(`Já respondo...`);
  await result.edit(`Já respondo, em 30s ...`);
  let response = await ChatGpt.slow(message, data);
  if (count < 74) {
    if (message.includes(botMessage)) {
      count = Number(message.replace(botMessage, ""));
    }
    console.log("sleep");
    await sleep(2 * 1000);
    const text = replaceText(response);
    if (text) {
      const { fileName, path, extension, code } = text;
      console.log("path : ", count, `project/${path}/${fileName}.${extension}`);
      const createProject = new Cache(`project/${path}`, extension);
      await createProject.messagesWrite(fileName, code);
      setCount(count + 1);
      await result.edit(`#${response.slice(0, 1999)}`);
      data = {
        messages: [
          data.messages[0],
          { role: "assistant", content: response },
          { role: "user", content: message },
          ...data.messages.slice(-4),
        ],
        config: data?.config,
      };
      await cache.messagesWrite(botName, data);
      setTimeout(async () => {
        messageCreate.channel.send(`$${botMessage}${count + 1}`);
      }, 10000);
    } else {
      await result.edit(`Concepcion error`);
      setTimeout(async () => {
        messageCreate.channel.send(`$${botMessage}${count}`);
      }, 10000);
    }
  }
}
