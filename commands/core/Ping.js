const CommandStructure = require("../../structures/CommandStructure");

class Ping extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name     = 'ping';
        this.aliases  = [ 'pong' ];
        this.cooldown = 5;
        //this.category = 'Core';
    }

    async execute({ message, client }) {
        let now = Date.now()
        let messageNow = message.createdTimestamp;
        
        await message.channel.send('```results:```')
        await message.channel.send('Pinging...').then(msg => {
             msg.edit(`**Pong!** [Latency:  ${now - messageNow}ms` + '] [Api: ' + Math.round(client.ws.ping) + 'ms]')
        })
    }
}

module.exports = Ping;