const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒", "🍋"];
const { MessageEmbed } = require('discord.js');  
const i = '<:infomation:779736273639440394>'
const x = ':x:'
const tick = '<:bigtick:779736050892931082>'

module.exports.run = async (bot, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const userData = await bot.fetchUser(message.author.id);
  
    let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
  
        if (userData.passive == true) return message.channel.send({embeds: [passivewarn]});
           let betAmount = args[0];

    let coinswarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Enter the amount of money you want to bet.`);

           if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send({embeds: [coinswarn]});

    let coinmin = new MessageEmbed()
    .setColor("RED")
    .setDescription(`${x} **${member.user.username}** : **${member.user.username}** : The minimum you can bet is \`50\` :coin:.`);

    if (betAmount < 50) return message.channel.send({embeds: [coinmin]});
  
    if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
    else betAmount=parseInt(args[0]);

    let moneywarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : You can't afford \`${args[0]}\` :coin:.`);

           if (betAmount > userData.coinsInWallet) {
           return message.channel.send({embeds: [moneywarn]});
           }
  
    let user = message.author;
    let coinsInWallet = await bot.fetchUser(message.author.id);
    let win = false;

  //let coinsInWallet = await bot.fetchUser(message.author.id);
  

    let moneyhelp = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Merci de spécifiez un montant à parier`); 


    if (betAmount > coinsInWallet) return message.channel.send({embeds: [moneywarn]});

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2])  {
        betAmount = parseInt(betAmount * 1.5)
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
       betAmount = parseInt(betAmount * 2)
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setTimestamp()
        .setDescription(`**Slots Bêta v1** | Player : **${member.user.username}** \n\n 🎰 Result : ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} \n\n 💰 Total gain : **${betAmount.toLocaleString()}** :coin:`)
        message.channel.send({embeds: [slotsEmbed1]})
        bot.giveCoins(message.author.id, betAmount)
    } else {
      const lostCoins = (betAmount);
        userData.coinsInWallet -= parseInt(betAmount);
        await userData.save();
        let slotsEmbed = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setTimestamp()
        .setDescription(`**Slots Bêta v1** | Player : **${member.user.username}** \n\nYou lost: **${betAmount.toLocaleString()}** :coin: \n\nGood luck next time`);
        message.channel.send({embeds: [slotsEmbed]})
    }

}

module.exports.config = {
    name: 'slots', // Command Name
    description: '🎰 Bet your money in slots machine', // Description
    usage: '+slots', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['slot','777','slotmachine'], // Aliases 
    bankSpace: 10, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}