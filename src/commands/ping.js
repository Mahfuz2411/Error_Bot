export default {
    name: 'ping',
    description: 'Replies with ping pong!!',
    execute: async (interaction) => {
        await interaction.reply('ping pong!!');
    }
};