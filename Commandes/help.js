const Discord = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    name: "help",
    description: "Commande d'aide",
    permission: "Aucune",
    dm: true,
    category: "Information",
    options: [
        {
            name: "commande",
            type: "string",
            description: "La commande à afficher",
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args, interaction) {
            
        let  command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"))
            if(!command) return message.reply("Pas de commande trouvé !")
        }

        if(!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Commandes du bot`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Commandes disponnibles : \`${bot.commands.size}\`\nCattégories dsponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "© Tous Droits Resérvé - Wash Evolution"})

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})
        } else {

            let Embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle(`Commande ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nPermission requise: \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommande en DM : \`${command.dm ? "Oui" : "Non"}\`\nCatégorie : \`${command.category}\``)
            .setTimestamp()
            .setFooter({text: "© Tous Droits Resérvé - Wash Evolution"})

            await message.reply({embeds: [Embed]})
        }
    }
}