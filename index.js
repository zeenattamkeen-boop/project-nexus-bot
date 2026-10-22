
const {
  Client,
  GatewayIntentBits,
  Events,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if Project Nexus is online!")
].map(command => command.toJSON());

client.once(Events.ClientReady, async readyClient => {
  console.log(`Project Nexus is online as ${readyClient.user.tag}!`);

  const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(readyClient.application.id),
      { body: commands }
    );
    console.log("Slash commands registered!");
  } catch (error) {
    console.error("Command registration failed:", error);
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong! Project Nexus is online!");
  }
});

client.login(process.env.DISCORD_TOKEN);
