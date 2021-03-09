class Message {
    /**
     * @param {Object} message the message object|string
     * @param {String|Object} text - the text object to send
     */
    sendMessage(message, text) {
        return message.channel.send({
            embed: {
                description: `${text}`,
                color: 'GREEN'
            }
        })
    }

    /**
     * @param {Object} message the message object|string
     * @param {String|Object} text - the text object to send
     */
    async messageReply(message, text) {
        await message.reply({
            embed: {
                description: `${text}`,
                color: 'GREEN'
            }
        })
    }

    /**
     * @param {Object} message the message object|string
     * @param {String|Object} text - the text object to send
     */
    sendMentionMessage(message, text) {
        return message.channel.send(`<@${message.author.id}>`,{
            embed: {
                description: `${text}`,
                color: 'ORANGE'
            }
        })
    }

    /**
     * @param {Object} message the message object|string
     * @param {String|Object} text - the text object to send
     */
    sendError(message, text) {
        return message.channel.send({
            embed: {
                description: `${text}`,
                color: 'RED'
            }
        })
    }

    /**
     * @param {Object} message the message object|string
     * @param {String|Object} text - the text object to send
     */
    sends(message, text) {
        return message.channel.send(`${text}`, { split: true })
    }

    /**
     * @param {Object} message the message object|string
     * @param {String} emoji the emoji used for reacting
     */
    async react(message, emoji) {
        try {
            await message.react(emoji);
        } catch (e) {
            return console.log(e);
        }
    }

    /**
     * @param {Object} message the message object that send the dm
     * @param {Object} text - the text object to send
     * @return {Promise<boolean>}
     */
    sendToAuthor(message, text) {
        return message.author.send({
            embed: {
                description: `${text}`,
                color: 'GREEN'
            }
        }).then(() => {
            if (message.author.type === 'dm') return false;
            this.react(message, '✅').catch(err => console.error(err));
        })
            .catch(() => {
                return this.sendError(message, '**I could not send a dm to you as they were closed.**')
            })
    }
}

module.exports = Message;