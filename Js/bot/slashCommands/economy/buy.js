const { MessageEmbed } = require('discord.js');
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const i = '<:infomation:779736273639440394>'
const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'
const skillss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/skills.js');


module.exports = {
    name: "buy",
    description: "🛒 Buy an item",
    timeout: 5000,
    options: [

        {
            name: "itemid",
            description: '📦 The id of the item you want to buy',
            type: "STRING",
            required: true,
        },
        {
            name: "quantity",
            description: '🧮 The quantity of the item you want to buy',
            type: "NUMBER",
            required: false,
        },

    ],

    run: async (bot, interaction, args) => {    

    const member = interaction.member || interaction.user;
    let user = await bot.fetchUser(interaction.user.id);

    // And the items are here:
    if (!args.join(' ')) {
            let buynothingerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ **${member.username}** : You cannot buy nothing, please use the correct itemId \`/shop\`.`);

            return interaction.followUp({embeds: [buynothingerrorembed]}).catch();
        //return message.channel.send("you can't buy nothing, please enter the correct item id");
    }

    if (!args[1]) args[1] = '';
    const item = itemss.find(x => x.itemId === args.join(' ').toString() || x.itemId === args[0].toString() || x.itemId === `${args[0].toString()} ${args[1].toString()}`);
    if (!item) {
            let wrongiderrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(` ❌ <@${member.id}> : You cannot buy an item that doesn't exists, please enter the correct itemId. \`(To show items: /shop)\``);

            return interaction.followUp({embeds: [wrongiderrorembed]}).catch();
        //return message.channel.send("You can't buy an item that doesn't exist please use the correct item id");
    }
    if (item.canBuy == false) {
            let cantbuyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${member.id}> : You cannot buy this item.`);

            return interaction.followUp({embeds: [cantbuyerrorembed]}).catch();
        //return message.channel.send(":thinking: You can't buy this item");
    }
    let buyAmount = args[1].toString().match(/([1-9][0-9]*)/)
    console.log(buyAmount)
    if (!buyAmount) buyAmount=1;
    else buyAmount = buyAmount[0]
    if (item.price > user.coinsInWallet || (buyAmount*item.price) > user.coinsInWallet) {
            let nomoneyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`:warning: **${member.username}** : You don't have enough money to buy x${buyAmount} of this item. You need to have : ${parseInt(item.price)*parseInt(buyAmount).toLocaleString()} :coin:.`);

            return interaction.followUp({embeds: [nomoneyerrorembed]}).catch();
        //return message.channel.send("You dont have the funds to buy this item.");
    }
    let founditem = user.items.find(x => x.itemId === item.itemId);
    let array = [];
    array = user.items.filter(x => x.itemId !== item.itemId);
    if (founditem) {
        item.amount = parseInt(founditem.amount) + parseInt(buyAmount); 

        array.push(item);
        user.items = array;

        await user.save();
    }
    else {
        item.amount = parseInt(buyAmount)
        user.items.push(item);
        await user.save();
    }
    user.coinsInWallet -= (parseInt(item.price)*parseInt(buyAmount));
    await user.save();
            let itempayedembed = new MessageEmbed()
            if (item.rarety === "🔴 Mythique") {
                item.rarety = "```diff\n-🔴 Mythique\n```"
            }
            if (item.rarety === "🟠 Légendaire") {
                item.rarety = "```fix\n🟠 Légendaire\n```"
            }
            if (item.rarety === "🟣 Épique") {
                item.rarety = "```yaml\n🟣 Épique\n```"
            }
            if (item.rarety === "🔵 Rare") {
                console.log("rarety === Rare")
                item.rarety = "```md\n# 🔵 Rare\n```"
            }
            if (item.rarety === "🟢 Atypique") {
                item.rarety = "```diff\n+🟢 Atypique\n```"
            }
            if (item.rarety === "⚪️ Commun") {
                item.rarety = "```\n⚪️ Commun\n```"
            }
            itempayedembed.setColor("GREEN")
            itempayedembed.setTitle('🛒 Successful purchase')
            itempayedembed.addField(`🪑 Item:`,`${item.name}`)
            itempayedembed.addField(`🧮 Amount:`,`${buyAmount}`)
            itempayedembed.addField(`💸 Unit price:`,`${parseInt(item.price).toLocaleString()} :coin:`)
            itempayedembed.addField(`💰 Total price:`,`${parseInt(item.price)*parseInt(buyAmount).toLocaleString()} :coin:`)
            itempayedembed.addField(`🧾 Description`,`${item.description}`)
            itempayedembed.addField(`🎨 Rarety:`,`${item.rarety}`)
            itempayedembed.setDescription(`<@${member.id}> : You bought: \`x${buyAmount} ${item.name}\` for **${parseInt(parseInt(item.price)*parseInt(buyAmount)).toLocaleString()}** :coin:.`);

            interaction.followUp({embeds: [itempayedembed]}).catch();

    //message.channel.send(`You bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\``);
    }
}
