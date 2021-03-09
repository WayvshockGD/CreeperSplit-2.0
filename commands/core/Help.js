const CommandStructure = require("../../structures/CommandStructure");
const { prefix } = require('../../json/config.json');
const Commands = require('../../json/command.json');

class Help extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name     = 'help';
        this.aliases  = [ 'commands' ];
        this.cooldown = 10;
        //this.category = 'Core';
    }

    async execute({ message, args }) {
        if(!args.length) {
            return await message.channel.send({
                embed: {
                    author: {
                        name: "Help",
                        iconURL: message.guild.iconURL()
                    },
                    fields: [
                        { name: 'Help', value: 'Here is a link to my dashboard.\n[click]', inline: true },
                        { name: 'Server', value: message.guild.name, inline: true },
                    ],
                    color: "GREEN"
                }
            })
        }
    }
}

module.exports = Help;