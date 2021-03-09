const Message = require("../src/utils/Message");

class CommandStructure extends Message {
    
    constructor(command) {
        super();
        this.name = command || '';

        this.aliases = command || [];

        this.category = command || '';

        this.subCommands = command || [];

        this.cooldown = command || 0;

        this.enabled = command || true;

        this.hidden = command || false;

        this.ownerOnly = command || false;

        this.guildOnly = command || true;

        this.usage = command || '';

        this.examples = command || [];
    }
}

module.exports = CommandStructure;