const CommandStructure = require("../../structures/CommandStructure");
const {workManager} = require("../../src/DatabaseManager");

class Work extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name    = 'work';
        this.aliases = [ 'w' ];
    }

    async execute({ message }) {
        await workManager(message);
    }
}

module.exports = Work;