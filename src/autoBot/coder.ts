import commands from "../discord/commands";
import { coderPropose, PramsPropose } from "./Proposes";
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
  await messageCreate.channel.send(`Já respondo!`);
  const botName = "coder";
  let message = messageCreate.content.toLocaleLowerCase().replace("$", "");
  const cache = new Cache("profile", "json");
  let data: DataUser = await cache.messagesRead(botName);
  if (!data) {
    console.log("new coder");
    data = {
      messages: [
        {
          content: PramsPropose + coderPropose,
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
  let response = await ChatGpt.slow(message, data);
  if (count < 74) {
    if (message.includes(botMessage)) {
      count = Number(message.replace(botMessage, ""));
    }
    console.log("sleep");
    await sleep(2 * 1000);
    const text = replaceText(response);
    if (text) {
      setCount(count + 1);      
      data = {
        messages: [
          data.messages[0],
          { role: "assistant", content: response },
          { role: "user", content: message },
          ...data.messages.slice(-2),
        ],
        config: data?.config,
      };
      await cache.messagesWrite(botName, data);
      await messageCreate.channel.send(`#${response.slice(0, 1999)}`);
    } else {
      await messageCreate.channel.send(`Concepcion error`);
      setTimeout(async () => {
        messageCreate.channel.send(`$${botMessage}${count}`);
      }, 10000);
    }
  }
}
