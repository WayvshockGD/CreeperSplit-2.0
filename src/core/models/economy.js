let { Schema, model } = require('mongoose');

let economicData = new Schema({
    Count: { type: Number },
    Bank: { type: Number },
    userID: { type: String }
})

module.exports = model("economy", economicData)