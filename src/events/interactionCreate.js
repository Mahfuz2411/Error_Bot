import commands from '../commands/commandsArray.js';

const commandMap = new Map(commands.map(cmd => [cmd.name, cmd]));
// commandMap.set('list', {
//   name: 'list',
//   description: 'List all commands',
//   execute: async (interaction) => {
//     const commandList = commands
//       .map(cmd => `/${cmd.name} - ${cmd.description}`)
//       .join('\n');
//     await interaction.reply(`Available commands:\n${commandList}`);
//   }
// });

export default async function (interaction) {
  // console.log(interaction);
  console.log(commandMap);


  if (!interaction.isCommand()) return;
  // console.log(interaction.commandName);
  if (interaction.commandName === 'list') {
    console.log(`Executing command: ${interaction.commandName}`);
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
  console.log(command);

  if (command) {
    // console.log(command);
    await command.execute(interaction);

  }
}