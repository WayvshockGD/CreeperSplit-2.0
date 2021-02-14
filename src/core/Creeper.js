const { Client } = require("discord.js");
const { ClientOptions } = require('../../json/options.json');
const { token } = require('../../json/config.json');
const CommandHandler = require('../handlers/commandhandler');
const Database = require('../DatabaseManager');
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
                name: 'with TNT',
                type: 'PLAYING'
            },
            status: 'idle'
        }).catch(error => console.error(error));
    }

    onStartup() {
        console.log(`Ready at ${this.user.username}\n${this.guilds.cache.size} Guild(s)\n${this.users.cache.size} User(s)`)
        Database(this);
        this.intStatus();
    }

    onMessage() {
        this.on('message', (message) => {
            CommandHandler(message, this);
        });
    }

    Start() {
        this.login(token)
            .catch(error => console.error(error));
    }
}

module.exports = new Creeper()