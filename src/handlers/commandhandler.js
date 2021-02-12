const { prefix } = require('../../json/config.json');

module.exports = (m, bot) => {
    if(!m.content.startsWith(prefix)) return false;

    const args = m.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const message = m;

    const command = bot.commands.get(cmd)
        || bot.commands.find(c => c.aliases && c.aliases.includes(cmd));
        
        if (!command) return false;
        
        try {
            command.run(message, args, bot)
        } catch (error) {
            console.error(error)
            m.channel.send(`There was an error executing \`${command.name}\`.`)
        }
}