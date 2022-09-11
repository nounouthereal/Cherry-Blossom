const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "sell",
    description: `🛍  Sell items for money`,
    timeout: 5000,
    options: [
        {
            name: "itemid",
            description: "🆔  The item id",
            required: true,
            type: "STRING",
        },
        {
            name: "amount",
            description: "🧮  The amount of item you want to sell",
            required: false,
            type: "NUMBER",
        },
    ],
    run: async (bot, interaction, args) => {

        try {

            const member = interaction.member || interaction.user;

            let user = await bot.fetchUser(interaction.user.id);
            if (!args.join(' ')) {

                let sell1embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ <@${member.id}> : You need to enter the itemId \`/sell <itemId>\`.`);
                return interaction.followUp({ embeds: [sell1embed] });

            }

            if (!args[1]) args[1] = '';



            let amount = interaction.options.getNumber("amount")
            let optItem = interaction.options.getString("itemid") || args[0]


            const item = itemss.find(x => x.itemId === args.join(' ').toString() || x.itemId === optItem.toLowerCase);
            let sellAmount = amount.toString().match(/([1-9][0-9]*)/);

            if (!sellAmount) sellAmount = 1;

            else sellAmount = sellAmount[0]

            if (!item) {
                let sell2embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`:x: <@${member.id}> : This item doesn't exists. (\`/shop to show items\`).`);
                return interaction.followUp({ embeds: [sell2embed] });
            }

            let founditem = user.items.find(x => x.itemId.toLowerCase() === item.itemId.toLowerCase());
            let array = [];
            array = user.items.filter(x => x.itemId !== item.itemId);
            if (!founditem) {
                let sell3embed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`:x: <@${member.id}> : You don't own this item (\`+buy ${item.itemId}\`).`);
                return interaction.followUp({ embeds: [sell3embed] });
            }

            if (founditem.sellAmount == 0) {
                let sell5embed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`:warning: <@${member.id}> : You cannot sell this item.`);
                return interaction.followUp({ embeds: [sell5embed] });
            }

            if (isNaN(founditem.amount)) {
                let sell4embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`:x: <@${member.id}> : This item is glitched, please contact support. (\`/support || /bug\`)`);
                return interaction.followUp({ embeds: [sell4embed] });
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
                return interaction.followUp({ embeds: [embed] });
            }
            if (founditem.amount < parseInt(sellAmount)) {
                let sell4embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ <@${member.id}> : You only have \`x${founditem.amount}\` of this item.`);
                return interaction.followUp({ embeds: [sell4embed] });
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
            interaction.followUp({ embeds: [embed] });

        } catch (err) {

            console.log(err);
            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })

        }
    }
}
