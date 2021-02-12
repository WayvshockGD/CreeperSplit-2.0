const { Collection } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = (client) => {
    const folder = readdirSync('./commands');
    client.commands = new Collection()

    for (const category of folder) {
        const getFolder = readdirSync('./commands/' + category + '/')
                                .filter(file => file.endsWith('.js'));
        for (const file of getFolder) {
            const command = require(`../../commands/${category}/${file}`);
            client.commands.set(command.name, command)
        }
    }
}