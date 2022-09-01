const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const tick = '<:bigtick:779736050892931082>'
const cd = ':warning:'

module.exports.run = async (bot, message, args) => {
    const member = message.member;
    let user = await bot.fetchUser(message.author.id);
    if ((Date.parse(user.dailyStreak) + 50400000) > Date.now()) {
        const embed = new MessageEmbed()
            .setDescription(`${cd} <@${member.user.id}> : You already claimed your weekly reward.\n\nYou have to wait \`${ms((Date.parse(user.dailyStreak) + 50400000) - Date.now())}\` before to reclaim your weekly reward.\n\nThe default cooldown is \`14 hours (14h)\`.`)
            .setColor('#FFA500');
        return message.channel.send({embeds: [embed]});
    } else {
        let amount = Math.floor(Math.random() * 500) + 100;
        user.coinsInWallet += amount;
        const claimed = new MessageEmbed()
            .setTitle(`✅ Daily reward claimed`)
            .setDescription(`<@${member.user.id}> : You have claimed \`${amount}\` :coin: (Reclaim your weekly reward in \`14 hours\` !)`)
            .addField(`💸 Reward:`,`\`${amount}\` :coin:`)
            .addField(`💳 Balance:`,`\`${user.coinsInWallet.toLocaleString()}\` :coin:`)
            .setColor('RANDOM');
        message.channel.send({embeds: [claimed]});
       user.save().then(user.dailyStreak = new Date(Date.now()))

      
    }
}

module.exports.config = {
    name: 'daily', // Command Name
    description: 'Daily Reward.', // Description
    usage: '+daily', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['dailyreward'], // Aliases 
    bankSpace: 100, // Amount of bank space to give when command is used.
    cooldown: 0.1 // Command Cooldown
}