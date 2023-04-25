import coder from "../autoBot/coder";
import environment from "../util/Environment";
import { Client, GatewayIntentBits } from "discord.js";

async function discord() {
  let count = 1;
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

  function setCount(number: number) {
    count = number;
  }

  bot.on("messageCreate", async (messageCreate) => {
    const authorType = messageCreate.author.bot;
    const user = messageCreate.author.username.replace(/[^0-9a-z]/gi, "");
    const message = messageCreate.content.toLocaleLowerCase();
    const channelType: string = messageCreate.channel.type as unknown as string;
    const time = Date.now();
    if ((authorType && !message.includes("$")) || channelType === "dm") {
      return;
    }
    const botMessage = "using structure project list to create a code to item ";
    if (message === "!creator") {
      messageCreate.channel.send(`$Starting a create a code`);
    }
    if (message.startsWith("$")) {
      const BotCoder = await coder(botMessage, count, messageCreate, setCount);
    }
    console.log("Tempo para resposta: ", (Date.now() - time) / 1000, "s");
  });
}

export default discord;
