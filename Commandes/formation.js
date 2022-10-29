const Discord = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    name: "formation",
    description: "Commande de lancement de Formation",
    permission: Discord.PermissionFlagsBits.ManageEvents,
    dm: false,
    category: "Administration",

    async run(bot, message) {

            let Embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle(`Formation`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Salut tout le monde ! Une formation va commencer dans 15 minutes. Venez pour être formé ! Tu souhaite être Ping lors de formation ? Rend toi dans <#1035841194535702598>`)
            .setTimestamp()
            .setFooter({text: "© Tous Droits Resérvé - Wash Evolution"})

            await message.channel.send({content: `<@&1035846505208221716>`, embeds: [Embed]})
    }
}