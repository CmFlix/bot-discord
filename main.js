const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = new require("./Loaders/LoadCommands")
const loadEvents = new require("./Loaders/loadEvents")
const config = require("./config")

bot.commands = new Discord.Collection()

bot.on("ready", async() => {
    bot.user.setActivity("/help")
})

bot.login(process.env.TOKEN)
loadCommands(bot)
loadEvents(bot)