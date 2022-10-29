const Discord = require("discord.js")
const ms = require("ms");

module.exports = {

    name: "unmute",
    description: "Commande de unmute",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type:  "user",
            name:  "membre",
            description: "Le membre à mute",
            required: true,
            autocomplete: false
        }, {
            type:  "string",
            name:  "raison",
            description: "Le raison du mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if (!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply("Pas de membre !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison  fournie."

        if(!member.moderatable) return message.reply("Je ne peux pas unmute ce membre !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas mute ce membre !")
        if(!member.isCommunicationDisabled()) return message.reply("Ce membre n'est pas mute !")

        try {await user.send(`Vous avez été unmute du serveur ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} à unmute ${user.tag} pour la raison : \`${reason}\``)

        await member.timeout(null, reason)
    }
}