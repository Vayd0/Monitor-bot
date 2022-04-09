/* Require */
const color = require("chalk");
const config = require("./config.js");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./src/handler/eventHandler.js");


/* Check Config */
let Intents = []
if (!Array.isArray(config.intents)) {
    console.log(color.bold.red("An error occurred while loading the Intents (No intents specified in config.js) !"));
    process.exit();
} else {
    Intents = config.intents
}


/* Client */
const client = new Discord.Client({
    intents: Intents
});
client.commands = new Discord.Collection();
client.data = require("./src/database/db.js");
client.logger = require("./src/helpers/logger.js");
client.base_up = require("./src/helpers/monitoring.js");
client.get_status = require("./src/helpers/get_status.js");


/* Event Handler */
eventHandler(client)


/* Connections */
mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    client.logger("MongoDB is connected.", "sucess")
}).catch(err => {
    console.log(color.bold.red(`MongoDB could not connect.\nError:${err}`));
})

client.login(config.token).catch(err => {
    console.log(color.bold.red(`An error occurred while connecting the bot, please check the token.\nError:${err}`));
})