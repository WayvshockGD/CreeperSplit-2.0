const Embedder = require("../../src/utility/Embedder");
const CommandStructure = require("../../structures/CommandStructure");

class Ping extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name = 'ping';
        this.aliases = [ 'pong' ];
        this.category = 'Core';
    }

    async execute({ message, client }) {
        let now = Date.now()
        let messageNow = message.createdTimestamp;
        
        await message.channel.send('```results:```')
        let m = await message.channel.send('Pinging...');

        await m.edit(`latency:  ${now - messageNow}ms` + '\napi: ' + Math.round(client.ws.ping) + 'ms')
    }
}

module.exports = Ping;