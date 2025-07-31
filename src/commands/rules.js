const choices = [
  { name: 'Server', value: 'server' },
  { name: 'Bot', value: 'bot' },
  { name: 'Commands', value: 'commands' },
  { name: 'Report', value: 'report' }
];

const execute = async (interaction) => {
  const type = interaction.options.getString('type');
  let message = '';
  if (type === 'server') {
    message = `**Server Rules**
1. Be respectful to everyone.
2. No spamming or flooding the chat.
3. No hate speech, racism, or discrimination.
4. No NSFW or inappropriate content.
5. Use channels for their intended purpose.
6. No advertising or self-promotion without permission.
7. Follow Discord's Terms of Service.`;
  } else if (type === 'bot') {
    message = `**Bot Rules**
1. Do not spam bot commands.
2. Do not abuse or exploit bot features.
3. Report any bugs or issues to the moderators.`;
  } else if (type === 'commands') {
    message = `**Command Rules**
1. Use commands as intended.
2. Do not attempt to break or misuse commands.
3. If you need help, use /help or ask a moderator.`;
  } else if (type === 'report') {
    message = `**Report Rules**
1. Report rule breakers to moderators with evidence.
2. Do not make false reports.
3. Use the appropriate channel or command to report issues.`;
  } else {
    message = 'Invalid rule type selected.';
  }
  await interaction.reply(message);
}

export default {
  name: 'rules',
  description: 'You can view the rules of the bot and with this command.',
  choices,
  execute,
};