export default {
    name: 'hello',
    description: 'Replies with hi "Your Name"',
    execute: async (interaction) => {
        await interaction.reply(`hi ${interaction.user.username}`);
    }
};