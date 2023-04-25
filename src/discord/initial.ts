import coder from "../autoBot/coder";
import environment from "../util/Environment";
import { Client, GatewayIntentBits } from "discord.js";

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
    const authorType = messageCreate.author.bot
    const user = messageCreate.author.username.replace(/[^0-9a-z]/gi, "");
    const message = messageCreate.content.toLocaleLowerCase();
    const channelType: string = messageCreate.channel.type as unknown as string;
    const time = Date.now();
    if (
      (authorType && !message.includes("$")) ||
      channelType === "dm"
    ) {
      return;
    }
    if(message === "!creator" || message.includes("$")){
     const BotCoder = await coder(count, messageCreate)
    }
   
    console.log("Tempo para resposta: ", (Date.now() - time) / 1000, "s");
  });
}

export default discord;
