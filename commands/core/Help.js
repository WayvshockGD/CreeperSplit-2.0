const CommandStructure = require("../../structures/CommandStructure");
const { prefix } = require('../../json/config.json');
const Commands = require('../../json/command.json');

class Help extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name     = 'help';
        this.aliases  = [ 'commands' ];
        //this.category = 'Core';
    }

    async execute({ message }) {
        return await message.channel.send({
            embed: {
                title: 'Command Menu',
                fields: [
                    { name: 'Core', value: `\`\`\`${prefix}${Commands.main.Core.join(`, ${prefix}`)}\`\`\``, inline: false },
                    { name: 'Economy', value: `\`\`\`${prefix}${Commands.main.economy.join(`, ${prefix}`)}\`\`\``, inline: false},
                    { name: 'Games', value: `\`\`\`${prefix}${Commands.main.games.join(`, ${prefix}`)}\`\`\``, inline: false}
                ],
                color: "GREEN"
            }
        })
    }
}

module.exports = Help;