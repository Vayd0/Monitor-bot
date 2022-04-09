const { Intents } = require("discord.js");

const settings = {
    token: "", /* Bot Token */
    mongo: "", /* Mongo URL */
    specific_guild: "", /* In this server the slash commands are instantly loaded (guild id) */
    color:"",
    intents: [
        Intents.FLAGS.GUILDS
    ] /* The Intents you want */
}

module.exports = settings;