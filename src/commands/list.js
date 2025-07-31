export default {
    name: 'list',
    description: 'List all commands',
    execute: async (interaction, commands) => {
        const commandList = commands
            .map(cmd => `/${cmd.name} - ${cmd.description}`)
            .join('\n');
        await interaction.reply(`Available commands:\n${commandList}`);
    }
};