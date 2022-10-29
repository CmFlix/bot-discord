const Discord = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    name: "unban",
    description: "Commande de Unban",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "Le membre à débannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du débannissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        try {
            
            let user = args.getUser("utilisateur");
            if(!user) return message.reply("Pas de membre a bannir !")

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie !"

            if(!(await  message.guild.bans.fetch()).get(user.id)) return message.reply("Cette utilisateur n'est pas banni !")

            try {await user.send(`Vous avez été débanni du serveur ${message.guild.name} par ${message.user.tag} pour la raison: \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} à débanni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.members.unban(user, reason)

        } catch (err) {

            return message.reply("Pas d'utilisateur a bannir !")
        }
    }
}