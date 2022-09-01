const { MessageEmbed } = require("discord.js");
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'

module.exports.run = async (bot, message, args) => {
    const botRoll = Math.floor(Math.random() * 7)+1;
    const userChoice = Math.floor(Math.random() * 7)+1;
    const userData = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${member.user.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
  
    if (userData.passive == true) return message.channel.send({embeds: [passivewarn]});
  
    let betAmount = args[0];
    const result = userChoice-botRoll;
  
    let coinswarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${member.user.id}> : You need to enter the amount of money you want to bet.`);

    if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send({embeds: [coinswarn]});

    let coinmin = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${member.user.id}> : The minimum you can bet is \`200\` :coin:.`);

    if (betAmount < 200) return message.channel.send({embeds: [coinmin]});

    if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
    else betAmount=parseInt(args[0]);
  
    let moneywarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`:warning: <@${member.user.id}> : You don't have enough money. You need \`${betAmount - userData.coinsInWallet}\` :coin:`);

           if (betAmount > userData.coinsInWallet) {
           return message.channel.send({embeds: [moneywarn]});
           }
  
    if (botRoll < userChoice) {
        const wonCoins = (betAmount + (betAmount * 0.20));
        userData.coinsInWallet += parseInt(wonCoins);
        await userData.save();
        const wonEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setDescription(`Dice Beta V1 | Player **${member.user.username}** \n\n${bot.user.username} rolled: \`${botRoll}\` \n${member.user.username} rolled: \`${userChoice}\`\n\nMoney gained: **${wonCoins.toLocaleString()}** :coin:`)
        message.channel.send({embeds: [wonEmbed]});
    } else if (botRoll == userChoice) {
        const tieCoins = parseInt(betAmount/2);
        userData.coinsInWallet -= parseInt(tieCoins);
        userData.save();
        const tieEmbed = new MessageEmbed()
        .setColor('YELLOW')
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setDescription(`Dice Beta V1 | Player **${member.user.username}** \n\n${bot.user.username} rolled: \`${botRoll}\` \n${member.user.username} rolled: \`${userChoice}\`\n\n**${member.user.username}** & **${bot.member.nickname}**: Draw\n\nLost: **${tieCoins.toLocaleString()}** :coin:`)
        message.channel.send({embeds: [tieEmbed]});
    } else if (botRoll > userChoice) {
        const lostCoins = (betAmount);
        userData.coinsInWallet -= parseInt(betAmount);
        await userData.save();
        const lostEmbed = new MessageEmbed()
        .setColor('RED')
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setDescription(`Dice Beta V1 | Player **${member.user.username}** \n\n${bot.user.username} rolled: \`${botRoll}\` \n${member.user.username} rolled: \`${userChoice}\`\n\nLost: **${lostCoins.toLocaleString()}** :coin:`)
        message.channel.send({embeds: [lostEmbed]});
    }
}   
module.exports.config = {
    name: 'dice', // Command Name
    description: 'Bet your money in a dice game', // Description
    usage: '+dice <amount>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['dices'], // Aliases 
    bankSpace: 10, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}