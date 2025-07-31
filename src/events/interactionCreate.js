import commands from '../commands/commandsArray.js';

const commandMap = new Map(commands.map(cmd => [cmd.name, cmd]));

export default async function(interaction) {
    if (!interaction.isCommand()) return;
    const command = commandMap.get(interaction.commandName);
    if (command) {
        await command.execute(interaction); 
    }
}