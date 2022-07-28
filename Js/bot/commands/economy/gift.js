const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);
    if (!member) {let gifttooembed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ **${usertag.user.username}** : À qui donnez-vous des articles ?`);
        return message.channel.send({embeds: [gifttooembed]}).catch();
    }
    
    if (member.user.id == message.author.id){
        let giftselfembed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ **${usertag.user.username}** : Vous ne pouvez pas vous donner des objets a vous même.`);
        return message.channel.send({embeds: [giftselfembed]}).catch();
    } 
    //if (member.user.id == message.author.id) return message.channel.send(`Lol you can't gift your self.`);

    let nogiftembed = new MessageEmbed() 
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : Vous avez oublié de saisir l'élément \`id\`.`);
    if (!args[1]){
        let nogiftembed = new MessageEmbed() 
        .setColor("RED")
        .setDescription(`❌ **${usertag.user.username}** : Vous avez oublié de saisir l'élément \`id\`.`);
        return message.channel.send({embeds: [nogiftembed]}).catch();
    } 
    //if (!args[1]) return message.channel.send(`So you are giving nothing to them???`);

    const userData = await bot.fetchUser(member.user.id);
    const authoData = await bot.fetchUser(message.author.id);
    if (!args[1]) args[1] = '';
    if (!args[2]) args[2] = '';
    
    let itemToGive = itemss.find(x => x.itemId.toLowerCase() === args.join(' ').toString().toLowerCase() || x.itemId.toLowerCase() === args[1].toString().toLowerCase() || x.itemId.toLowerCase() === `${args[1].toString().toLowerCase()} ${args[2].toString().toLowerCase()}`);
    if (!itemToGive) { 
        let giftnothingembed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ **${usertag.user.username}** : L'item que vous essayez d'offrir n'existe pas, ou vous avez tapé le mauvais article \`id\`.`);
        return message.channel.send({embeds: [giftnothingembed]}).catch();
    }

    let authorItem = authoData.items.find(i => i.itemId == itemToGive.itemId);
    if (!authorItem) { 
        let noitemgidtembed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ **${usertag.user.username}** : Vous ne possédez pas cet item.`);
        return message.channel.send({embeds: [noitemgidtembed]}).catch();
    }
    
    let userItem = userData.items.find(i => i.itemId == itemToGive.itemId);

    let giveAmount = args.slice(1).join(' ').toString().match(/([1-9][0-9]*)/);
    if (!giveAmount) 
        giveAmount = 1;
    else 
        giveAmount = giveAmount[0];
    
    itemToGive.amount = parseInt(giveAmount)
   
    if (parseInt(giveAmount) > parseInt(authorItem.amount)){
        let itemamountembed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ **${usertag.user.username}** : Vous n'avez que **${parseInt(authorItem.amount).toLocaleString()}** de cet item.`);
        return message.channel.send({embeds: [itemamountembed]}).catch();
    } 
    //if (parseInt(giveAmount) > parseInt(authoItem.amount)) return message.channel.send(`You only have **${parseInt(authoItem.amount).toLocaleString()}** of that item`);

    // Get a new array of author inventory without the item to give
    let authorArray = authoData.items.filter(i => i.itemId !== itemToGive.itemId);

    // Get a new array of user inventory without the item to give
    let userArray = userData.items.filter(i => i.itemId !== itemToGive.itemId);

    await userData.save();

    if (!userItem) {
        //itemToGive does not exist in the user inventory
//        console.log('itemToGive does not exist in the user inventory:')
//        console.log(itemToGive);
        userArray.push(itemToGive);
    } else {
        //itemToGive already exists in the user inventory
        itemToGive.amount += parseInt(userItem.amount);
///        console.log('itemToGive already exists in the user inventory (so only the amount will be changed):')
//        console.log(itemToGive);
        userArray.push(itemToGive); 
    }

    userData.items = userArray;
///    console.log(userData.items.length + ' item(s) in the new user inventory:');
///    console.log(userData.items);
    await userData.save();

    if ((authorItem.amount - parseInt(giveAmount)) > 0) {
        authorItem.amount -= parseInt(giveAmount);
        authorArray.push(authorItem);
    }
    authoData.items = authorArray;
    await authoData.save();

    let messageembeditem = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`🎁 **${usertag.user.username}** : Vous avez offert **${parseInt(giveAmount).toLocaleString()}** x \`${itemToGive.itemId}\` à ${member.user}.`);
    message.channel.send({embeds: [messageembeditem]}).catch();
    //message.channel.send(`${tick} You gave **${parseInt(giveAmount).toLocaleString()}** \`${itemToGive.name}\` to ${member.user}`);

}
module.exports.config = {
    name: 'gift', // Command Name
    description: 'Offre un item a un membre du serveur', // Description
    usage: '+gift @membre <item id> Optionnel: <quantité>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['offrir','cadeau','present'], // Aliases 
    bankSpace: 7, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}