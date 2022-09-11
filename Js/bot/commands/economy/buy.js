const { MessageEmbed } = require('discord.js');
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const i = '<:infomation:779736273639440394>'
const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'
const skillss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/skills.js');


module.exports.run = async (bot, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let user = await bot.fetchUser(message.author.id);

    // And the items are here:
    if (!args.join(' ')) {
            let buynothingerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${member.user.id}> : You cannot buy nothing, please use the correct itemId (\`/shop\`).`);

            return message.channel.send({embeds: [buynothingerrorembed]}).catch();
        //return message.channel.send("you can't buy nothing, please enter the correct item id");
    }

    if (!args[1]) args[1] = '';
    const item = itemss.find(x => x.itemId === args.join(' ').toString() || x.itemId === args[0].toString() || x.itemId === `${args[0].toString()} ${args[1].toString()}`);
    if (!item) {
            let wrongiderrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(` ❌ <@${member.user.id}> : You cannot buy an item that doesn't exists, please enter the correct itemId. (\`To show items: /shop\`)`);

            return message.channel.send({embeds: [wrongiderrorembed]}).catch();
        //return message.channel.send("You can't buy an item that doesn't exist please use the correct item id");
    }
    if (item.canBuy == false) {
            let cantbuyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${member.user.id}> : You cannot buy this item.`);

            return message.channel.send({embeds: [cantbuyerrorembed]}).catch();
        //return message.channel.send(":thinking: You can't buy this item");
    }
    let buyAmount = args[1].toString().match(/([1-9][0-9]*)/)
    console.log(buyAmount)
    if (!buyAmount) buyAmount=1;
    else buyAmount = buyAmount[0]
    if (item.price > user.coinsInWallet || (buyAmount*item.price) > user.coinsInWallet) {
            let nomoneyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} <@${member.user.id}> : You don't have enough money to buy x${buyAmount} of this item. You need to have : ${parseInt(item.price)*parseInt(buyAmount).toLocaleString()} :coin:.`);

            return message.channel.send({embeds: [nomoneyerrorembed]}).catch();
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
            if (item.rarety === "🔴 Mythiqual") {
                item.rarety = "```diff\n-🔴 Mythiqual\n```"
            }
            if (item.rarety === "🟠 Legendary") {
                item.rarety = "```fix\n🟠 Legendary\n```"
            }
            if (item.rarety === "🟣 Epic") {
                item.rarety = "```yaml\n🟣 Epic\n```"
            }
            if (item.rarety === "🔵 Rare") {
                console.log("rarety === Rare")
                item.rarety = "```md\n# 🔵 Rare\n```"
            }
            if (item.rarety === "🟢 Uncommon") {
                item.rarety = "```diff\n+🟢 Uncommon\n```"
            }
            if (item.rarety === "⚪️ Common") {
                item.rarety = "```\n⚪️ Common\n```"
            }
            itempayedembed.setColor("GREEN")
            itempayedembed.setTitle('🛒 Successful purchase')
            itempayedembed.addField(`🪑 Item:`,`${item.name}`)
            itempayedembed.addField(`🧮 Amount:`,`*${buyAmount}*`)
            itempayedembed.addField(`💸 Unit price:`,`\`${parseInt(item.price).toLocaleString()}\` :coin:`)
            itempayedembed.addField(`💰 Total price:`,`\`${parseInt(item.price)*parseInt(buyAmount).toLocaleString()}\` :coin:`)
            itempayedembed.addField(`🧾 Description`,`${item.description}`)
            itempayedembed.addField(`🎨 Rarety:`,`${item.rarety}`)
            itempayedembed.setDescription(`<@${member.user.id}> : You bought: \`x${buyAmount} ${item.name}\` for **${parseInt(parseInt(item.price)*parseInt(buyAmount)).toLocaleString()}** :coin:.`);

            message.channel.send({embeds: [itempayedembed]}).catch();

    //message.channel.send(`You bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\``);
}

module.exports.config = {
    name: 'buy', // Command Name
    description: 'Acheter un item avec son `id`.', // Description
    usage: '+buy <item id> Optionnel: <amount>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['purchase','acquire'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 15 // Command Cooldown
}