const { MessageEmbed } = require("discord.js");

const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'

module.exports.run =  async (bot, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR","BAN_MEMBERS")) return message.channel.send(`${x} Tu n'as pas les permissions pour ajouter de l'argent! - [ADMINISTRATOR] , [BAN_MEMBERS]`);
        if (!args[0]) return message.channel.send("**❌ Merci de spécifier un utilisateur**")

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        const userData = await bot.fetchUser(user.id);
        if (!user) return message.channel.send(`**${x} Membre ${user} introuvable !**`)
        if (!args[1]) return message.channel.send(`**${x} Merci de donner un montant !**`)
        if (isNaN(args[1])) return message.channel.send(`**${x} Votre montant est pas un nombre!**`);
        if (args[1] > 100000) return message.channel.send(`**${x} Un virement au dessus de 100000 pourrait nuire l'économie du  serveur!**`);

        bot.giveCoins(user.id, parseInt(args[1]));

        if (!userData) {
                let moneyerrorembed = new MessageEmbed()
                  .setColor("RED")
                  .setTitle(`❌ Erreur!`)
                  .setDescription(`**${member.user.username}** : Your id is bugged in my database, sorry about this we will restore your account.`);
                return message.channel.send({embeds: [moneyerrorembed]}).catch();
        }

        var somme = args[1]


        const embed = new MessageEmbed()
        .setTitle(`✅ Money added !`)
        .addField(`👤 Member:`, `<@${user.id}>`)
        .addField(`👮 Adminstrator:`,`<@${message.author.id}>`,false)
        .addField(`💰 Balance added:`, `${somme} :coin:`)
        .addField(`🌐 Total money:`, `${parseInt(args[1]) + parseInt(userData.coinsInWallet)} :coin:`)
        .setColor("GREEN")
        .setThumbnail(user.displayAvatarURL)
        .setFooter(message.guild.name)
        .setTimestamp();
        return message.channel.send({embeds: [embed]});


}

module.exports.config = {
    name: 'addmoney', // Command Name
    description: 'Add money to a member', // Description
    usage: '+addmoney <money> @membre', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: ['ADMINISTRATOR'], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['moneyadd'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 150 // Command Cooldown
  }