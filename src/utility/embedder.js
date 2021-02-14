const { MessageEmbed } = require("discord.js")

/**
 * @param {String} title
 * @param {String} description
 * @param {String} color
 * @param {String} message
 * @returns {module:"discord.js".MessageEmbed}
 * @constructor
 */
   function NormalEmbed(title, description, color, message) {
    return new MessageEmbed()
        .setAuthor(title, message.author.avatarURL())
        .setDescription(description)
        .setColor(color)
        .setTimestamp();
   }

/**
 * @param {String} description
 * @param {String} message
 * @returns {module:"discord.js".MessageEmbed}
 * @constructor
 */
   function ErrorEmbed(description, message) {
    return new MessageEmbed()
        .setAuthor('Error', message.author.avatarURL())
        .setDescription(description)
        .setColor('RED')
        .setTimestamp();
   }

   module.exports = { ErrorEmbed, NormalEmbed }