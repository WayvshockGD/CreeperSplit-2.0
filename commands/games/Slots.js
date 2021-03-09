const CommandStructure = require("../../structures/CommandStructure");
let { MessageAttachment } = require('discord.js');
const Canvas = require("canvas");

class Slots extends CommandStructure {
    constructor(...args) {
        super(...args);

        this.name     = 'slots';
        this.cooldown = 15;
    }

    async execute({ message }) {
        let text1;
        let text2;
        let text3;

        let canvas = Canvas.createCanvas(400 + 100, 200);
        let ctx = canvas.getContext('2d');

        let Images = Math.floor(Math.random() * Math.floor(5));
        let Images2 = Math.floor(Math.random() * Math.floor(5));
        let Images3 = Math.floor(Math.random() * Math.floor(5));

        if (Images === 0) text1 = "Cash";
        if (Images2 === 0) text2 = "Cash";
        if (Images3 === 0) text3 = "Cash";

        if (Images === 1) text1 = "Diamond";
        if (Images2 === 1) text2 = "Diamond";
        if (Images3 === 1) text3 = "Diamond";

        if (Images === 2) text1 = "Popper";
        if (Images2 === 2) text2 = "Popper";
        if (Images3 === 2) text3 = "Popper";

        if (Images === 3) text1 = "Coin";
        if (Images2 === 3) text2 = "Coin";
        if (Images3 === 3) text3 = "Coin";

        if (Images === 4) text1 = "Heart";
        if (Images2 === 4) text2 = "Heart";
        if (Images3 === 4) text3 = "Heart";


        let background = await Canvas.loadImage('./src/images/background.png');
        let slot1 = await Canvas.loadImage(`./src/images/slots/${Images}.png`);
        let slot2 = await Canvas.loadImage(`./src/images/slots/${Images2}.png`);
        let slot3 = await Canvas.loadImage(`./src/images/slots/${Images3}.png`)
        
        let whiteSquare = await Canvas.loadImage('./src/images/white.png');
        let transparent = await Canvas.loadImage('./src/images/transparent.png');

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height + 250);
        ctx.drawImage(transparent, 8, 15, canvas.width - 15, canvas.height - 20)

        ctx.font = "18px sans-serif";
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text1, 20, 20);
        ctx.fillText(text2, 175, 20);
        ctx.fillText(text3, 330, 20);

        ctx.drawImage(whiteSquare, 20, 30, 150, 150);
        ctx.drawImage(whiteSquare, 175, 30, 150, 150);
        ctx.drawImage(whiteSquare, 330, 30, 150, 150);

        ctx.drawImage(slot1, 20, 30, 150, 150);
        ctx.drawImage(slot2, 175, 30, 150, 150);
        ctx.drawImage(slot3, 330, 30, 150, 150);

        ctx.strokeStyle = '#000000';
        ctx.strokeRect(20, 30, 150, 150);
        ctx.strokeRect(175, 30, 150, 150);
        ctx.strokeRect(330, 30, 150, 150);

        ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, canvas.width, canvas.height)

        let attachment = new MessageAttachment(canvas.toBuffer(), 'slots.png')

        await message.channel.send(attachment)
        //setTimeout({
            await message.channel.send({
                embed: {
                    description: `You have won with **${text1}**, **${text2}**, and **${text3}**.`,
                    color: "GOLD"
                }
            })
        //}, 6000)
    }
}

module.exports = Slots;