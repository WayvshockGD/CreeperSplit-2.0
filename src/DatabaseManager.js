let mongoose = require('mongoose');

//loading the models.
let economic = require('./core/models/economy');

let connection = require('../json/config.json');
let options = require('../json/options.json');
let economyAssets = require('../json/assets/economy.json');

mongoose.connect(connection.mongooseURI, options.mongooseOptions);

console.log(`Connected to ${connection.database.name}`)

let currentCount = economyAssets.count
let randomizeCount = currentCount[Math.floor(Math.random() * currentCount.length)];

let currentPlace = economyAssets.places
let randomizePlace = currentPlace[Math.floor(Math.random() * currentPlace.length)];

async function economyCount(member) {
    let userData = await economic.findOne({
        userID: member.id
    });

    if (!userData) {
        let newData = new economic({
            Count: 100,
            Bank: 0,
            userID: member.id
        })

        await newData.save();

        return `$100\n$` + 0
    } else if (userData) {
        return `$${userData.Count}\n$` + userData.Bank;
    }
}

async function workManager(message) {
    await economic.findOne({
        userID: message.author.id
    }, async (err, data) =>{

        if (err) console.error(err)

    if (!data) {
        let newData = new economic({
            Count: randomizeCount,
            userID: message.author.id
        })

        await message.channel.send({
            embed: {
                description: `**${message.author.username}** worked **${randomizePlace}** and earned: **$${randomizeCount}**`,
                color: "GREEN"
            }
        })

        await newData.save()
    } else if (data) {
        data.Count += randomizeCount

        await data.save()

        await message.channel.send({
            embed: {
                description: `**${message.author.username}** worked **${randomizePlace}** and earned: **$${randomizeCount}**`,
                color: "GREEN"
            }
        })
    }})
}

module.exports = { economyCount, workManager }