const CommandStructure = require("../../structures/CommandStructure");
const { inspect } = require("util");

class Eval extends CommandStructure {
    constructor() {
        super();

        this.name      = 'eval';
        this.aliases   = ['e'];
        this.category  = 'Developer';
        this.ownerOnly = true;
        this.hidden    = true;
    }

    async execute({ message, args }) {
        try {
            let toEval = args.join(" ")

            if (!toEval) {
                return this.sendError(message, `**Cannot eval nothing.**`)
            } else {

                let hrStart = process.hrtime()
                let hrDiff;
                let evaluated = inspect(eval(toEval));
                hrDiff = process.hrtime(hrStart);
                return this.sendMessage(message, `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``)
            }

        } catch (e) {
            return this.sendError(message, `**There was a error while running the eval command**\n\n${'```'}\n${e}\n${'```'}`)
        }
    }
}

module.exports = Eval;