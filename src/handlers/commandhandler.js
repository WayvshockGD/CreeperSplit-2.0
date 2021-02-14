const { prefix } = require('../../json/config.json');

module.exports = (message, client) => {
    if(!message.content.startsWith(prefix)) return false;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd)
        || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
        
        if (!command) return false;

        try {
            command.execute({message, args, client})
        } catch (error) {
            console.error(error)
            message.channel.send(`There was an error executing \`${command.name}\`.`)
        }
}