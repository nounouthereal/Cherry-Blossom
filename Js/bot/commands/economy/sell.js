const i = '<:infomation:779736273639440394>'
const x = '❌'
const tick = '✅'
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    try {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let user = await bot.fetchUser(message.author.id);



        if (!args.join(' ')) {

            let sell1embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ <@${member.user.id}> : You need to enter the itemId \`+sell <itemId> Optionnal: <amount>\`.`);
            return message.channel.send({ embeds: [sell1embed] });

        }


        if (!args[1]) args[1] = '';
        const item = itemss.find(x => x.itemId === args.join(' ').toString() || x.itemId === args[0].toString().toLowerCase() || x.itemId === `${args[0].toString().toLowerCase()} ${args[1].toString().toLowerCase()}`);
        let sellAmount = args.join(' ').toString().match(/([1-9][0-9]*)/);

        console.log(sellAmount)

        if (!sellAmount) sellAmount = 1;

        else sellAmount = sellAmount[0]

        console.log(sellAmount)

        if (!item) {
            let sell2embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`:x: <@${member.user.id}> : This item doesn't exists. (\`+shop to show items\`).`);
            return message.channel.send({ embeds: [sell2embed] });
        }

        let founditem = user.items.find(x => x.itemId.toLowerCase() === item.itemId.toLowerCase());
        let array = [];
        array = user.items.filter(x => x.itemId !== item.itemId);
        if (!founditem) {
            let sell3embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`:x: <@${member.user.id}> : You don't own this item.`);
            return message.channel.send({ embeds: [sell3embed] });
        }

        if (founditem.sellAmount == 0 || founditem.sellAmount == null || founditem.sellAmount == undefined) {
            let sell5embed = new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`:warning: <@${member.user.id}> : You cannot sell this item. (\`+item info ${args.join(' ')}\`)`);
            return message.channel.send({ embeds: [sell5embed] });
        }

        if (isNaN(founditem.amount)) {
            let sell4embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`:x: <@${member.user.id}> : This item is glitched, please contact support. (\`/support || /bug\`)`);
            return message.channel.send({ embeds: [sell4embed] });
        }

        if (args[1] == 'all' || args[2] == 'all') {
            sellAmount = Math.floor(founditem.amount * item.sellAmount);
            user.items = array
            user.coinsInWallet += (sellAmount);
            user.save();
            const embed = new MessageEmbed()
                .setColor("#57c478")
                .setThumbnail()
                .setTitle(`🛍 Succesful sale`)
                .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`, message.author.displayAvatarURL())
                .addField(`🪑 Item sold:`, `${item.name}`)
                .addField(`🧮 Quantity:`, `*${parseInt(sellAmount).toLocaleString()}*`)
                .addField(`💸 Unit selling price:`, `\`${item.sellAmount}\` :coin:`)
                .addField(`💰 Total:`, `\`${parseInt(item.sellAmount * parseInt(sellAmount)).toLocaleString()}\` :coin:`)
            return message.channel.send({ embeds: [embed] });
        }
        if (founditem.amount < parseInt(sellAmount)) {
            let sell4embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ <@${member.user.id}> : You only have \`x${founditem.amount}\` of this item.`);
            return message.channel.send({ embeds: [sell4embed] });
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
            .setTitle(`🛍 Succesful sale`)
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`, message.author.displayAvatarURL())
            .addField(`🪑 Item sold:`, `${item.name}`)
            .addField(`🧮 Quantity:`, `*${parseInt(sellAmount).toLocaleString()}*`)
            .addField(`💸 Unit selling price:`, `\`${item.sellAmount}\` :coin:`)
            .addField(`💰 Total:`, `\`${parseInt(item.sellAmount * parseInt(sellAmount)).toLocaleString()}\` :coin:`)
        message.channel.send({ embeds: [embed] });
    } catch (err) {
        console.log(err);

        if (err.length > 2010) {
            err.substring(0, 2010)
        }

        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor("RED")
            .setTimestamp()
        message.reply({ embeds: [basicError] })

    }
}

module.exports.config = {
    name: 'sell', // Command Name
    description: '🛍 Sell items for money', // Description
    usage: '+sell <item id>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['sold', 'vend'], // Aliases 
    bankSpace: 8, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}