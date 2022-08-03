const i = '<:infomation:779736273639440394>'
const x = '❌'
const tick = '✅'
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let user = await bot.fetchUser(message.author.id);
    if (!args.join(' ')) {
      
              let sell1embed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`❌ **${member.user.username}** : Tu as oublié l'id de l'item \`+sell <itemId>\`.`);
              return message.channel.send({embeds: [sell1embed]});
        //////return message.channel.send("you can't sell nothing lmao");
      
    }
    if (!args[1]) args[1] = '';
    const item = itemss.find(x => x.itemId === args.join(' ').toString() || x.itemId === args[0].toString().toLowerCase() || x.itemId === `${args[0].toString().toLowerCase()} ${args[1].toString().toLowerCase()}`);
    let sellAmount = args.join(' ').toString().match(/([1-9][0-9]*)/);
    if (!sellAmount) sellAmount = 1;
    else sellAmount = sellAmount[0]
    if (!item) {
              let sell2embed = new MessageEmbed()
              .setColor("YELLOW")
              .setDescription(`:warning: **${member.user.username}** : Vous ne pouvez pas vendre cet item.`);
              return message.channel.send({embeds: [sell2embed]});
        //////return message.channel.send("can't sell this item");
    }
    let founditem = user.items.find(x => x.itemId.toLowerCase() === item.itemId.toLowerCase());
    let array = [];
    array = user.items.filter(x => x.itemId !== item.itemId);
    if (!founditem) {
              let sell3embed = new MessageEmbed()
              .setColor("YELLOW")
              .setDescription(`:warning: **${member.user.username}** : Vous n'avez pas cet item.`);
              return message.channel.send({embeds: [sell3embed]});
        //////return message.channel.send("you don't have this item");
    }
    if (args[1] == 'all' || args[2] == 'all') {
        sellAmount = Math.floor(founditem.amount * item.sellAmount);
        user.items = array
        user.coinsInWallet += (sellAmount);
        user.save();
        const embed = new MessageEmbed()
            .setColor("#57c478")
            .setThumbnail()
            .setTitle(`🛍 Vente réalisé avec succès`)
            .setFooter(message.guild.name)
            .addField(`📦 Item vendu:`,`${item.name}`)
            .addField(`🧮 Quantité:`,`**${parseInt(sellAmount/item.sellAmount).toLocaleString()}**`)
            .addField(`💸 Prix de vente untaire:`,`\`${item.sellAmount}\` :coin:`)
            .addField(`💰 Prix de vente total:`,`\`${parseInt(sellAmount).toLocaleString()}\`:coins:`)
            .addField(`💳 Nouvelle balance:`,`**${user.coinsInWallet}** :coins:`)
            .setDescription(`${tick} **${member.user.username}** : Vous avez vendu ${parseInt(sellAmount/item.sellAmount).toLocaleString()} **${item.name}** pour \`${(sellAmount).toLocaleString()}\` :dollar:.`)
            .setColor('GREEN');
        return message.channel.send({embeds: [embed]});
    }
    if (founditem.amount < parseInt(sellAmount)) {
              let sell4embed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`${x} **${member.user.username}** : Vous n'avez que **x${founditem.amount}** de cet item`);
              return message.channel.send({embeds: [sell4embed]});
     /////////return message.channel.send(`You only have ${founditem.amount} of this item`);
    }
    if (founditem.amount === 1) {
        user.items = array;
        await user.save();
    }
    else {
        if (founditem.amount - parseInt(sellAmount) == 0) {
            user.items = array;
            await user.save();
        } else {
            array.push({
                name: item.name,
                description: item.description,
                canUse: item.canUse,
                canBuy: item.canBuy,
                itemId: item.itemId,
                amount: (founditem.amount - parseInt(sellAmount)),
                displayOnShop: item.displayOnShop,
                sellAmount: item.sellAmount,
                price: item.price,
                rarety: item.rarety,
                resistance: item.resistance,
                keep: item.keep,
            });
            user.items = array;
            await user.save();
        }
    }
    user.coinsInWallet += (item.sellAmount * parseInt(sellAmount));
    await user.save();
    const embed = new MessageEmbed()
        .setColor("#57c478")
        .setThumbnail()
        .setTitle(`🛍 Vente réalisé avec succès`)
        .setFooter(message.guild.name)
        .addField(`📦 Item vendu:`,`${item.name}`)
        .addField(`🧮 Quantité:`,`**${parseInt(sellAmount).toLocaleString()}**`)
        .addField(`💸 Prix de vente untaire:`,`\`${item.sellAmount}\` :coin:`)
        .addField(`💰 Prix de vente total:`,`\`${parseInt(item.sellAmount * sellAmount).toLocaleString()}\` :coin:`)
        .addField(`💳 Nouvelle balance:`,`**${user.coinsInWallet.toLocaleString()}** :coin:`)
    message.channel.send({embeds: [embed]});
}

module.exports.config = {
    name: 'sell', // Command Name
    description: 'Vendre un item grace a son id', // Description
    usage: '+sell <item id>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['vente','selling','vendre'], // Aliases 
    bankSpace: 3, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}