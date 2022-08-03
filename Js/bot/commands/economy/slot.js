const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒", "🍋"];
const { MessageEmbed } = require('discord.js');  
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'

module.exports.run = async (bot, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const userData = await bot.fetchUser(message.author.id);
  
    let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Vous avez \`PASSIVE\` activé, vous devez le désactiver pour utiliser cette commande.`);
  
        if (userData.passive == true) return message.channel.send({embeds: [passivewarn]});
           let betAmount = args[0];

    let coinswarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Entrez le montant que vous voulez miser.`);

           if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send({embeds: [coinswarn]});

    let coinmin = new MessageEmbed()
    .setColor("RED")
    .setDescription(`${x} **${member.user.username}** : ❌ **${member.user.username}** : Le minimum que vous pouvez jouer est de \`50\` :coin:.`);

    if (betAmount < 50) return message.channel.send({embeds: [coinmin]});
  
    if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
    else betAmount=parseInt(args[0]);

    let moneywarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Tu ne dispose pas de \`${args[0]}\`.`);

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
        .setDescription(`**Slots Bêta v1** | Joueur : **${member.user.username}** \n\n 🎰 Résultat : ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} \n\n 💰 Argent remporté : **${betAmount.toLocaleString()}** :coin:`)
        message.channel.send(slotsEmbed1)
        bot.giveCoins(message.author.id, betAmount)
    } else {
      const lostCoins = (betAmount);
        userData.coinsInWallet -= parseInt(betAmount);
        await userData.save();
        let slotsEmbed = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setTimestamp()
        .setDescription(`**Slots Bêta v1** | Joueur : **${member.user.username}** \n\nVous avez perdu **${betAmount.toLocaleString()}** :coin: \n\nBonne chance pour la prochaine fois`);
        message.channel.send({embeds: [slotsEmbed]})
    }

}

module.exports.config = {
    name: 'slots', // Command Name
    description: 'Parier votre argent sur une machine a sous', // Description
    usage: '+slots', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['slot','777','slotmachine'], // Aliases 
    bankSpace: 13, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}