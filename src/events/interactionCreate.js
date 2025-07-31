import commands from '../commands/commandsArray.js';

const commandMap = new Map(commands.map(cmd => [cmd.name, cmd]));

export default async function (interaction) {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'list') {
    const command = {
      name: 'list',
      description: 'Replies with ping pong!!',
      execute: async (interaction) => {
        const commandList = commands
          .map(cmd => {
            if (cmd.name !== 'list') return `/${cmd.name} - ${cmd.description}`
          })
          .join('\n');
        await interaction.reply(`Available commands:\n${commandList}`);
      }
    }
    await command.execute(interaction);  // Pass commands array
    return;
  }

  const command = commandMap.get(interaction.commandName);
  if (command) {
    await command.execute(interaction);
  }
}