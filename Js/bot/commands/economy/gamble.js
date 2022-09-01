const { MessageEmbed } = require("discord.js");
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const pa = "Hors banque"

module.exports.run = async (bot, message, args) => {
    const botRoll = Math.floor(Math.random() * 13)+1;
    const userChoice = Math.floor(Math.random() * 13)+1;
    const userData = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  

    let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${member.user.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
  
        if (userData.passive == true) return message.channel.send({embeds: [passivewarn]});
  
  
    let betAmount = args[0];
    const result = userChoice-botRoll;
  
    let coinswarn = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`:warning: <@${member.user.id}> : Enter your bet (+gamble <bet>).`);

    if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send({embeds: [coinswarn]});
  
    let coinmin = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${member.user.id}> : The minimum you can gamble is \`200\` :coin:.`);

           
    if (betAmount < 200) return message.channel.send({embeds: [coinmin]});
    if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
    else betAmount=parseInt(args[0]);
  
    let moneywarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${member.user.id}> : You can't afford \`${args[0]}\` :coin: || You need : ${args[0] - userData.coinsInWallet} :coin:.`);

           if (betAmount > userData.coinsInWallet) {
           return message.channel.send({embeds: [moneywarn]});
           }
  
    if (botRoll < userChoice) {
        let wonCoins = parseInt(betAmount + (betAmount * 0.50));

        wonCoins = Math.round(wonCoins)

        userData.coinsInWallet += parseInt(wonCoins);
        await userData.save();
        const wonEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setDescription(`Gamble Bêta 1.0 | Player : <@${member.user.id}> \n\n<@${bot.user.id}> played: \`${botRoll}\` \n<@${member.user.id}> played: \`${userChoice}\`\n\nWin Rate: \`${Math.floor(userChoice-botRoll)*10}%\`\n\nWinnings: **${wonCoins.toLocaleString()}** :coin:`)
        message.channel.send({embeds: [wonEmbed]});
    } else if (botRoll == userChoice) {
      let tieCoins = parseInt(betAmount/2);
      tieCoins = Math.round(tieCoins)
        userData.coinsInWallet -= parseInt(tieCoins);
        await userData.save();
        const tieEmbed = new MessageEmbed()
        .setColor('YELLOW')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setDescription(`Gamble Bêta 1.0 | Player : <@${member.user.id}> \n\n<@${bot.user.id}> played: \`${botRoll}\` \n<@${member.user.id}> played: \`${userChoice}\`\n\n<@${member.user.id}> & <@${bot.user.id}> Tied\n\nLost: **${tieCoins.toLocaleString()}** :coin:`)
        message.channel.send({embeds: [tieEmbed]});
    } else if (botRoll > userChoice) {
        const lostCoins = (betAmount);
        userData.coinsInWallet -= parseInt(betAmount);
        await userData.save();
        const lostEmbed = new MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setDescription(`Gamble Bêta 1.0 | Player : <@${member.user.id}> \n\n<@${bot.user.id}> played: \`${botRoll}\` \n<@${member.user.id}> played: \`${userChoice}\`\n\nLost Rate: \`${Math.floor(botRoll-userChoice)*10}%\`\n\nLost: **${lostCoins.toLocaleString()}** :coin:`)
        message.channel.send({embeds: [lostEmbed]});
    }
}   
module.exports.config = {
    name: 'gamble', // Command Name
    description: '💰 Gamble your coins away or gain big.', // Description
    usage: '+gamble <bet>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 10, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}