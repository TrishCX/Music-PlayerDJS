import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputApplicationCommandData,
  Client,
  GatewayIntentBits,
  Guild,
  Partials,
} from "discord.js";
// module
import Error from "./errors/index";
import { initializeVoiceChannel } from "./helpers/voice/initVoiceChannel";
import { Player } from "./player";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.GuildMember, Partials.Channel],
});

const player = new Player(client);
player.initialize().then(() => console.log("Initialized"));
interface IConfig {
  BOT_TOKEN: string;
}
const config: IConfig = {
  BOT_TOKEN:
    "MTIxNTQ1NTgyOTg0NzcwNzY3OQ.GwDCS6.lbeMI6aL07G-BMwpj4cQ4iXSf4YYsqGq6GYiIQ",
};

// commands

const commands: ChatInputApplicationCommandData[] = [
  {
    name: "play",
    description: "Plays music",
    options: [
      {
        name: "query",
        description: "The song to play",
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "check-queue",
    description: "Check for the queue",
    type: ApplicationCommandType.ChatInput,
  },
  {
    name: "autoplay",
    description: "Toggles the autoplay",
    type: ApplicationCommandType.ChatInput,
  },
];

// events
client.on("ready", () => {
  const guildID: string = `1209736131789455360`;
  client.guilds.cache
    .get(guildID)
    ?.commands.set(commands)
    .then(() => console.log(`Registered commands for ${guildID}`));
  console.log("ready");
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    if (commandName === "play") {
      const query = interaction.options
        .get("query")
        ?.value?.toString() as string;

      player.play(query, interaction, {
        interaction: interaction,
      });
    } else if (commandName === "check-queue") {
      // const queue = await player.check(interaction.guildId!);
      // console.log(queue);
    } else if (commandName === "autoplay") {
      player.autoplay(interaction.guildId as string, true);
    }
  }
});

client.login(config.BOT_TOKEN);
