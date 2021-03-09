const config = require('../../json/config.json');
let Discord = require('discord.js');

module.exports = (message, client, CoolDowns) => {
    if(!message.content.startsWith(config.prefix)) return false;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd)
        || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

    if (!command) return false;

    if (!CoolDowns.has(command.name)) {
        CoolDowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = CoolDowns.get(command.name);
    const CoolDownAmount = (command.cooldown) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + CoolDownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`<@${message.author.id}>`, {
                embed: {
                    description: `**Please wait ${timeLeft.toFixed(1)}s Before using that command again.**`,
                    color: "RED"
                }
            });
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), CoolDownAmount);

    if(command.enabled === false) return false;

    if (command.ownerOnly === true && !config.owners.includes(message.author.id)) return message.channel.send({
        embed: {
            description: '**This is an owner only command.**',
            color: 'RED'
        }
    })

        try {
            command.execute({message, args, client})
        } catch (error) {
            console.error(error)
            message.channel.send(`There was an error executing \`${command.name}\`.`)
        }
}