class CommandStructure {
    
    constructor(command) {
        this.name = command || '';

        this.aliases = command || [];

        this.category = command || '';

        this.enabled = command || true;

        this.ownerOnly = command || false;

        this.guildOnly = command || true;

        this.usage = command || '';

        this.examples = command || [];
    }
}

module.exports = CommandStructure;