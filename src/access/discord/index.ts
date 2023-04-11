import environment from "../../class/Environment";
import { Client, GatewayIntentBits } from "discord.js";
import OpenAi from "../../class/OpenAi";
import commands from "./commands";
import { modelType } from "../../type";

async function discordChatGpt() {
  const bot = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
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
    let result = await messageCreate.channel.send(`Já respondo...`)
    const data = await OpenAi.messagesRead(user);

    const command = await commands(data, user, message);
    if (command) {
      await result.edit(command);
      return;
    }

    console.log(data.config.modelType , modelType.gptTurbo003)
    if (data.config.modelType === modelType.gptTurbo003) {

      await result.edit(`Já respondo, em 30s ...`);
      const response: string = await OpenAi.context(user, message, data, modelType.gptTurbo003);
      await result.edit(`${response}`);
      return console.log("Tempo para resposta: ", (Date.now() - time) / 1000, "s");

    } else if (data.config.modelType === modelType.textDavinci003) {

      await result.edit(`Já respondo, em 5s ...`);
      const response: string = await OpenAi.withOutContext(message, data, modelType.textDavinci003);
      await result.edit(`${response}`);
      return console.log("Tempo para resposta: ", (Date.now() - time) / 1000, "s");
      
    }

  });
}

export default discordChatGpt;
