const { Client, Collection } = require("discord.js");
const { ClientOptions } = require('../../json/options.json');
const { token, prefix } = require('../../json/config.json');
const CommandHandler = require('../handlers/commandhandler');
const Loader = require('./Loader');

class Creeper extends Client {
    constructor() {
        super(ClientOptions);

        this.Start();
        this.onMessage();

        this.once('ready', this.onStartup.bind(this));
        
        Loader(this);
    }

    intStatus() {
        this.user.setPresence({
            activity: {
                name: `with TNT | ${this.guilds.cache.size} Guilds | ${prefix}help`,
                type: 'PLAYING'
            },
            status: 'idle'
        }).catch(error => console.error(error));
    }

    onStartup() {
        console.log(`Ready at ${this.user.username}\n${this.guilds.cache.size} Guild(s)\n${this.users.cache.size} User(s)`)
        this.intStatus();
        require('../DatabaseManager');
    }

    onMessage() {
        let CoolDowns = new Collection();
        this.on('message', (message) => {
            CommandHandler(message, this, CoolDowns);
        });
    }

    Start() {
        this.login(token)
            .catch(error => console.error(error));
    }
}

module.exports = new Creeper()