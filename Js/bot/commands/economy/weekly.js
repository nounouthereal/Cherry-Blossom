const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const tick = '<:bigtick:779736050892931082>'
const cd = ':warning:'

module.exports.run = async (bot, message, args) => {
  const member = message.member;
    let user = await bot.fetchUser(message.author.id);
    if ((Date.parse(user.dailyStreak) + 60480000) > Date.now()) {
        const embed = new MessageEmbed()
            .setDescription(`${cd} **${member.user.username}** : Cette commande est en cooldown\n Vous devez encore attendre \`${ms((Date.parse(user.dailyStreak) + 60480000) - Date.now())}\` avant d'utiliser cette commande.\nLe cooldown par défaut est de \`1 semaine (1d)\`.`)
            .setColor('#FFA500');
        return message.channel.send(embed);
    } else {
        let amount = Math.floor(Math.random() * 4000) + 100;
        user.coinsInWallet += amount;
        const claimed = new MessageEmbed()
            .setTitle(`✅ Récompense réclamé`)
            .setDescription(`Vous avez réclamé ${amount} :coin: (Utilisez cette commande dans \`7 jours\` pour réclamer à nouveau votre récompense hebdomadaire !)`)
            .addField(`💸 Récompense:`,`${amount} :coin:`)
            .addField(`💳 Balance:`,`${user.coinsInWallet.toLocaleString()} :coin:`)
            .setColor('RANDOM');
        message.channel.send({embeds: [claimed]});
       user.save().then(user.dailyStreak = new Date(Date.now()))
      
    }
}

module.exports.config = {
    name: 'weekly', // Command Name
    description: 'Récompense hebdomadaire.', // Description
    usage: '+weekly', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['hebdomadaire','hebdo'], // Aliases 
    bankSpace: 100, // Amount of bank space to give when command is used.
    cooldown: 0.1 // Command Cooldown
}