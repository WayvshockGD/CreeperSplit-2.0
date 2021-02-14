const { MessageEmbed } = require("discord.js")

module.exports = (title, description, color, message) => {
    let Embed = new MessageEmbed()
              .setAuthor(title, message.author.avatarURL())
              .setDescription(description)
              .setColor(color)
              .setTimestamp()
        return Embed;
   }