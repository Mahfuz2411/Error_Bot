import { Client, GatewayIntentBits } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';
import express from 'express';
import interactionCreate from './src/events/interactionCreate.js';
import commands from './src/commands/commandsArray.js';

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

app.get('/', (req, res) => {
    res.send('Bot is alive!');
});
app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Register commands (guild for instant update, or global for production)
const rest = new REST({ version: '9' }).setToken(TOKEN);
(async () => {
    try {
        console.log('Started refreshing application (/) commands globally.');
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands globally.');
    } catch (error) {
        console.error('Error when reloading commands:', error);
    }
})();

// Handle interactions
client.on('interactionCreate', interactionCreate);

client.login(TOKEN);