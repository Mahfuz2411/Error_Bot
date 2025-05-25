import { Client, GatewayIntentBits } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';
import fetch from 'node-fetch';

import express from 'express';
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

const commands = [
    {
        name: 'ping',
        description: 'Replies with ping pong!!',
    },
    {
        name: 'hello',
        description: 'Replies with hi "Your Name"',
    },
    {
        name: 'list',
        description: 'List all commands',

    },
    {
        name: 'cf',
        description: 'Fetch CF data for a user',
        options: [
            {
                name: 'handle',
                type: 3, 
                description: 'The CF handle to fetch data for',
                required: true
            }
        ]
    }
];

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
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    // console.log('Interaction received:', interaction);

    const { commandName } = interaction;

    if (commandName === 'ping') {
        console.log("bot command received");
        await interaction.reply('ping pong!!');
    }
    if (commandName === 'hello') {
        console.log("bot command received");
        await interaction.reply(`hi ${interaction.user.username}`);
    }
    if (commandName === 'cf') {
        const cfHandle = interaction.options.getString('handle');
        console.log("bot command received");
        if (cfHandle) {
            try {
                await interaction.deferReply();
                const response = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`);
                const data = await response.json();
                if (data.status === "OK") {
                    const info = data.result[0];

                    // Get solved problems
                    const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${cfHandle}`);
                    const statusData = await statusRes.json();
                    let solvedSet = new Set();
                    if (statusData.status === "OK") {
                        for (const sub of statusData.result) {
                            if (sub.verdict === "OK" && sub.problem) {
                                solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
                            }
                        }
                    }
                    const solvedCount = solvedSet.size;

                    await interaction.reply(
                        `CF Handle: ${info?.handle}\nRating: ${info?.rating || "Unrated"}\nRank: ${info?.rank || "N/A"}\nProfile: https://codeforces.com/profile/${info?.handle}\nContribution: ${info?.contribution || "N/A"}\nFriend of: ${info?.friendOfCount || 0} users\nOrganization: ${info?.organization || "None"}\nLast Online: ${new Date(info?.lastOnlineTimeSeconds * 1000).toLocaleString()}\nsolved problems: ${solvedCount || 0}`
                    );
                } else {
                    await interaction.reply(`CF user not found for handle: ${cfHandle}`);
                }
            } catch (err) {
                await interaction.reply('Error fetching CF user info.');
            }
        } else {
            await interaction.reply('User not found.');
        }
    }
    if (commandName === 'list') {
        console.log("bot command received");
        const commandList = commands.map(cmd => `/${cmd.name} - ${cmd.description}`).join('\n');
        await interaction.reply(`Available commands:\n${commandList}`);
    }
});

// Login to Discord with your bot token
client.login(TOKEN);
