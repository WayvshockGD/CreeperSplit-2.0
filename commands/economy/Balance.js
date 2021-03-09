const CommandStructure = require("../../structures/CommandStructure");
let Canvas = require('canvas');
const {economyCount} = require("../../src/DatabaseManager");
let { MessageAttachment } = require('discord.js');

class Balance extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name     = 'balance';
        this.aliases  = [ 'bal' ];
        this.cooldown = 15;
    }

    async execute({ message }) {
        let member = message.author;

        let [coin, money] = await Promise.all([
            await Canvas.loadImage('src/images/icons/coin.png'),
            await Canvas.loadImage('src/images/icons/money.png')
        ]);

        let canvas = Canvas.createCanvas(400, 100);
        let ctx = canvas.getContext('2d');

        let getWhiteImage = await Canvas.loadImage('./src/images/white.png');
        let getAvatar = await Canvas.loadImage(member.avatarURL({ format: "png" }));
        //let getGuildLogo = await Canvas.loadImage(message.guild.iconURL({ format: "png" }));
        //let getGrey = await Canvas.loadImage('./src/images/grey.png');
        let getTransparent = await Canvas.loadImage('./src/images/transparent.png');
        let getBackground = await Canvas.loadImage('./src/images/blue.jpg');

        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = '#241f1f';
        ctx.shadowBlur = 10;

        ctx.drawImage(getBackground, 0, 0, canvas.width, canvas.height);
        //ctx.drawImage(getGrey, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(getWhiteImage, 0, 0, canvas.width - 310, canvas.height);
        ctx.drawImage(coin, 190, 40, 30, 30);
        ctx.drawImage(money, 260, 40, 30, 30);

        ctx.drawImage(getAvatar, 12, 20, 60, 60);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${message.author.username}`, 100, 30);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${await economyCount(member)}`, 140, 64);

        ctx.drawImage(getTransparent, 100 - 10, 140, canvas.width - 125, canvas.height - 170);

        //ctx.drawImage(getGuildLogo, 18, 140, 52, 50);

        let attachment = new MessageAttachment(canvas.toBuffer(), 'card.png');

        await message.reply(attachment);
    }
}

module.exports = Balance;