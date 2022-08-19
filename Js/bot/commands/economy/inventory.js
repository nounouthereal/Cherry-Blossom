/*
const { MessageEmbed } = require("discord.js")

module.exports.execute = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let userBalance = client.eco.fetchMoney(user.id);
    let avatar = user.displayAvatarURL({ size: 1024, dynamic: true });
    let guildname = message.guild.name
  const embed = new MessageEmbed()
    .setAuthor(`Inventaire de ${user.tag}`,avatar)
    .setDescription(`Monnaie de ${user} : ${userBalance.amount} :dollar:\n━━━━━━━━━━━━━━━━━━`,false)
    .setColor("#57c478")
    .setTimestamp()
    .setFooter(`${guildname}`,message.guild.iconURL())
  const x = client.db.get(`items_${message.author.id}`);
if(!x) { return message.channel.send(`:warning: Pas d'item à montrer`); }
const arrayToObject = x.reduce((itemsobj, x) => {
    itemsobj[x.name] = (itemsobj[x.name] || 0) +1;
    return itemsobj;
}, {});
const result = Object.keys(arrayToObject).map(k => embed.addField(`**${k}**`,`ㅤx${arrayToObject[k]}`, true));
  
 
  return message.channel.send(embed);
}

module.exports.help = {
  name: "inventory",
  aliases: ["inv","inventaire"],
  usage: `inv`
}
*/

const { MessageEmbed } = require('discord.js');
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');

module.exports.run = async (bot, message, args) => {

  if (!args[0]) { 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const user = await bot.fetchUser(message.author.id);
    let avatar = message.author.displayAvatarURL({ size: 1024, dynamic: true });
    let guildname = message.guild.name
    const userData = await bot.fetchUser(message.author.id);
    let number = 5 * parseInt(args[0]);
    let page;
    if (user.items.length <= 5) page = 1;
    else if (user.items.length <= 10) page = 2;
    else if (user.items.length <= 15) page = 3;
    else if (user.items.length <= 20) page = 5;
    else if (user.items.length <= 25) page = 6;
    else if (user.items.length <= 30) page = 7;
    else if (user.items.length <= 35) page = 8;
    else if (user.items.length <= 40) page = 9;
    else if (user.items.length <= 45) page = 10;
    else if (user.items.length <= 50) page = 11;
    else if (user.items.length <= 55) page = 12;
    else if (user.items.length <= 60) page = 13;
    else if (user.items.length <= 65) page = 14;
    else if (user.items.length <= 70) page = 15;
    else if (user.items.length <= 75) page = 16;
    else if (user.items.length <= 80) page = 17;
    else if (user.items.length <= 85) page = 18;
    else if (user.items.length <= 90) page = 19;
    else if (user.items.length <= 95) page = 20;

    if (!args[0]) {
        number = 5;
    }
    let items = user.items.slice(number - 5, number);
    if (items.length < 1) {
        let noItemsEmb = new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`:warning: No items to display.`)
        return message.channel.send({embeds: [noItemsEmb]});
    }

    let itemValues = Object.values(items);
    console.log('itemValues of user ' + member.user.name + ' : ');
    console.log(itemValues);


    const embed = new MessageEmbed()
    itemValues.forEach((itemValue) => {
      console.log(typeof itemValue.name)
      if (itemValue.rarety === "🔴 Mythique") {
        itemValue.rarety = "```diff\n-🔴 Mythiqual\n```"
      }
      if (itemValue.rarety === "🟠 Légendaire") {
        itemValue.rarety = "```fix\n🟠 Legendary\n```"
      }
      if (itemValue.rarety === "🟣 Épique") {
        itemValue.rarety = "```yaml\n🟣 Epic\n```"
      }
      if (itemValue.rarety === "🔵 Rare") {
        console.log("rarety === Rare")
        itemValue.rarety = "```md\n# 🔵 Rare\n```"
      }
      if (itemValue.rarety === "🟢 Atypique") {
        itemValue.rarety = "```diff\n+🟢 Uncommon\n```"
      }
      if (itemValue.rarety === "⚪️ Commun") {
        itemValue.rarety = "```\n⚪️ Common\n```"
      }

      embed.addField(`━━━━━━━━━━━━━━━━━━━━━━━━`,`You have x${itemValue.amount} ${itemValue.name}`)
      embed.addField(`📛 Name: `, `${itemValue.name}\n\n**🧮 Amount:**\n***${itemValue.amount}***\n\n**📑 Description:** \n*${itemValue.description}*\n**🆔 ID:** \n\`${itemValue.itemId}\`\n**🎨 Rarety:**\n${itemValue.rarety}`)
//      embed.addField(`Description: `, `*${itemValue.description}*`)
//      embed.addField(`ID: `, `\`${itemValue.itemId}\``)
//      embed.addField(`Rareté: `, `${itemValue.rarety}`)
   });

   embed.setAuthor(`Inventory of ${message.author.username}`, avatar)
   embed.setDescription(`Money of ${member} : ${userData.coinsInWallet} :coin:`,false)
   .setTimestamp()
   embed.setFooter(`Page ${args[0] || 1} of ${page}`,message.guild.iconURL())
   embed.setColor("#57c478");
   message.channel.send({embeds: [embed]});
  }

  else {

    args[0] = args[0].slice(2, 20)
    
    const member = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
    

    let avatar = member.user.displayAvatarURL({ size: 1024, dynamic: true });
    let guildname = message.guild.name
    const userData = await bot.fetchUser(member.user.id);
    let number = 5 * parseInt(args[1]);
    let page;
    if (userData.items.length <= 5) page = 1;
    else if (userData.items.length <= 10) page = 2;
    else if (userData.items.length <= 15) page = 3;
    else if (userData.items.length <= 20) page = 5;
    else if (userData.items.length <= 25) page = 6;
    else if (userData.items.length <= 30) page = 7;
    else if (userData.items.length <= 35) page = 8;
    else if (userData.items.length <= 40) page = 9;
    else if (userData.items.length <= 45) page = 10;
    else if (userData.items.length <= 50) page = 11;
    else if (userData.items.length <= 55) page = 12;
    else if (userData.items.length <= 60) page = 13;
    else if (userData.items.length <= 65) page = 14;
    else if (userData.items.length <= 70) page = 15;
    else if (userData.items.length <= 75) page = 16;
    else if (userData.items.length <= 80) page = 17;
    else if (userData.items.length <= 85) page = 18;
    else if (userData.items.length <= 90) page = 19;
    else if (userData.items.length <= 95) page = 20;

    if (!args[1]) {
        number = 5;
    }
    let items = userData.items.slice(number - 5, number);
    if (items.length < 1) {
        let noItemsEmb = new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`:warning: ${member.tag} has no items to display.`)
        return message.channel.send({embeds: [noItemsEmb]});
    }

    let itemValues = Object.values(items);



    const embed = new MessageEmbed()
    itemValues.forEach((itemValue) => {
      console.log(typeof itemValue.name)
      if (itemValue.rarety === "🔴 Mythique") {
        itemValue.rarety = "```diff\n-🔴 Mythiqual\n```"
      }
      if (itemValue.rarety === "🟠 Légendaire") {
        itemValue.rarety = "```fix\n🟠 Legendary\n```"
      }
      if (itemValue.rarety === "🟣 Épique") {
        itemValue.rarety = "```yaml\n🟣 Epic\n```"
      }
      if (itemValue.rarety === "🔵 Rare") {
        console.log("rarety === Rare")
        itemValue.rarety = "```md\n# 🔵 Rare\n```"
      }
      if (itemValue.rarety === "🟢 Atypique") {
        itemValue.rarety = "```diff\n+🟢 Uncommon\n```"
      }
      if (itemValue.rarety === "⚪️ Commun") {
        itemValue.rarety = "```\n⚪️ Common\n```"
      }

      embed.addField(`━━━━━━━━━━━━━━━━━━━━━━━━`,`You have x${itemValue.amount} ${itemValue.name}`)
      embed.addField(`📛 Name: `, `${itemValue.name}\n\n**🧮 Amount:**\n***${itemValue.amount}***\n\n**📑 Description:** \n*${itemValue.description}*\n\n**🆔 ID:** \n\`${itemValue.itemId}\`\n**🎨 Rarety:**\n${itemValue.rarety}`)
//      embed.addField(`Description: `, `*${itemValue.description}*`)
//      embed.addField(`ID: `, `\`${itemValue.itemId}\``)
//      embed.addField(`Rareté: `, `${itemValue.rarety}`)
   });

   embed.setAuthor(`Inventory of <@${member.user.id}>`, avatar)
   embed.setDescription(`Money of <@${member.user.id}> : ${userData.coinsInWallet} :coin:`,false)
   .setTimestamp()
   embed.setFooter(`Page ${args[1] || 1} of ${page}`,message.guild.iconURL())
   embed.setColor("#57c478");
   message.channel.send({embeds: [embed]});
  }

}

module.exports.config = {
    name: 'inventory', // Command Name
    description: "Show your inventory", // Description
    usage: '+inventory Optionnel: @member <page>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['inv','inventaire'], // Aliases 
    bankSpace: 1, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown

}