import environment from "../other/Environment";
import { Client, GatewayIntentBits } from "discord.js";
import OpenAi from "../openAi";
import commands from "./commands";
import { model } from "../types";

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

  bot.on("messageCreate", async (messageCreate) => {
    const time = Date.now();
    const user = messageCreate.author.username;
    const message = messageCreate.content.toLocaleLowerCase();
    const channelType: string = messageCreate.channel.type as unknown as string;
    console.log("message: ", user, message);

    if (messageCreate.author.bot || channelType === "dm") {
      return;
    }
    let result = await messageCreate.channel.send(`Já respondo...`);
    let data = await OpenAi.messagesRead(user);
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
        data = { messages: [data.messages[0]], config: data.config };
      }
      response = await OpenAi.slow(user, message, data);
    }
    await result.edit(`${response.slice(0, 2000)}`);
    console.log("Tempo para resposta: ", (Date.now() - time) / 1000, "s");
  });
}

export default discord;
