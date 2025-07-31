import fetch from 'node-fetch';
import { fetchCfUserData } from '../utils/fetchCfData.js';

export default {
    name: 'cf',
    description: 'Fetch CF data for a user',
    options: [
        {
            name: 'handle',
            type: 3,
            description: 'The CF handle to fetch data for',
            required: true
        }
    ],
    execute: async (interaction) => {
        const cfHandle = interaction.options.getString('handle');
        if (!cfHandle) {
            await interaction.reply('Please provide a Codeforces handle.');
            return;
        }
        try {
            await interaction.deferReply();

            const result = await fetchCfUserData(cfHandle);
            if (!result) {
                await interaction.editReply('CF user not found or error fetching data.');
                return;
            }
            const { info, solvedCount } = result;


            await interaction.editReply(
                `CF Handle: ${info?.handle}\nRating: ${info?.rating || "Unrated"}\nRank: ${info?.rank || "N/A"}\nProfile: https://codeforces.com/profile/${info?.handle}\nContribution: ${info?.contribution || "N/A"}\nFriend of: ${info?.friendOfCount || 0} users\nOrganization: ${info?.organization || "None"}\nLast Online: ${new Date(info?.lastOnlineTimeSeconds * 1000).toLocaleString()}\nSolved problems: ${solvedCount || 0}`
            );
        } catch (err) {
            await interaction.editReply('Error fetching CF user info.');
        }
    }
};