const Discord = require("discord.js")
const { SlashCommandBuilder, roleMention } = require("discord.js")

module.exports = {
    name: "session",
    description: "Commande de lancement de session",
    permission: Discord.PermissionFlagsBits.ManageEvents,
    dm: false,
    category: "Administration",

    async run(bot, message) {

            let Embed = new Discord.EmbedBuilder()
            .setColor("Orange")
            .setTitle(`Formation`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Salut tout le monde ! Une Session va commencer dans 15 minutes. Venez pour RolePlay ! Tu souhaite être Ping lors de session ? Rend toi dans <#1035841194535702598>`)
            .setTimestamp()
            .setFooter({text: "© Tous Droits Resérvé - Wash Evolution"})

            await message.channel.send({content: `<@&1035845899236163626>`, embeds: [Embed]})
    }
}