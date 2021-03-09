const CommandStructure = require("../../structures/CommandStructure");
const { readdirSync } = require("fs");
const { join } = require("path");

class Reload extends CommandStructure {
    constructor() {
        super();

        this.name      = 'reload';
        this.aliases   = ['r'];
        this.ownerOnly = true
        this.hidden    = true;
        this.category  = 'Developer';
        this.enabled   = false;
    }

    async execute({message, args,}) {
        if (!args[0]) return this.sendError(message, "**Please provide a command to reload!**")
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        if (!command) return this.sendError(message, "**That command doesn't exist. Try again.**")
        readdirSync(join(__dirname, "..")).forEach(f => {
            const files = readdirSync(join(__dirname, "..", f));
            if (files.includes(`${commandName}.js`)) {
                const file = `../${f}/${commandName}.js`;
                try {
                    delete require.cache[require.resolve(file)];
                    message.client.commands.delete(commandName);
                    const pull = require(file);
                    message.client.commands.set(commandName, pull);
                    return this.sendMessage(message, `Successfully reloaded ${commandName}.js!`);
                } catch (err) {
                    message.channel.send(`Could not reload: ${args[0].toUpperCase()}\``);
                    return console.log(err.stack || err);
                }
            }
        })
    }
}

module.exports = Reload;