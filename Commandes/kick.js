const Discord = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    name: "kick",
    description: "Commande de kick",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, interaction) {
            
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre a kick !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre a kick !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie !"

        if(message.user.id === user.id) return message.reply("Essaie pas de te kick !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne kick pas le propriétaire du serveur !")
        if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas kick ce membre !")

        try {await user.send(`Vous avez été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

        await member.kick(reason)
    }
}