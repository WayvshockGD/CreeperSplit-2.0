const CommandStructure = require("../../structures/CommandStructure");
let Canvas = require('canvas');
const {economyCount} = require("../../src/DatabaseManager");
let { MessageAttachment } = require('discord.js');

class Balance extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name    = 'balance';
        this.aliases = [ 'bal' ];
    }

    async execute({ message }) {
        let member = message.author;

        let canvas = Canvas.createCanvas(400, 200);
        let ctx = canvas.getContext('2d');

        let background = await Canvas.loadImage('./src/images/background2.png');
        let transparent = await Canvas.loadImage('./src/images/transparent.png');
        let white = await Canvas.loadImage('./src/images/white.png');
        let circle = await Canvas.loadImage('./src/images/black_circle.png');
        //let dollar = await Canvas.loadImage('./src/images/slots/0.png');
        ctx.drawImage(background, 0, 0, canvas.width + 50, canvas.height + 50);

        ctx.font = '30px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(member.username, 130, 70);

        ctx.drawImage(transparent, 130, 70 + 30, 190 + 10, 70 + 15);

        ctx.font = "18px sans-serif";
        ctx.fillStyle = '#ffffff';
        ctx.fillText(await economyCount(member), 250 - 20, 135);

        ctx.font = "18px sans-serif";
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Balance:\nBank:', 170 - 10, 135);

        //ctx.drawImage(dollar, 265, 105, 30, 30);

        ctx.drawImage(white, 20 + 10, -50, 10, 100 + 150);
        ctx.drawImage(circle, 20 - 10, 10 - 5, 100 + 10, 100 + 10);

        ctx.beginPath();
        ctx.arc(70 - 5, 60, 45 - 5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        let avatar = await Canvas.loadImage(member.avatarURL({ format: "png" }));
        ctx.drawImage(avatar, 20, 10, 100 - 10, 100 - 10)

        let attachment = new MessageAttachment(canvas.toBuffer(), 'card.png');

        await message.channel.send(attachment);
    }
}

module.exports = Balance;