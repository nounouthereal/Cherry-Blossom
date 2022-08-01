
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ItemManager = require("../../utils/ItemManager");
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const array = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');

module.exports.run = async (bot, message, args) => {
 
let items = Object.keys(itemss);
let itemShop = itemss.filter(x => x.displayOnShop == true)
let itemShops = Object.keys(itemShop);


let embed = new MessageEmbed()
.setTitle("🏪 Shop")
.setColor("#57c478")
.setFooter("For buying an item do +buy <itemId>")
console.log(itemShops)

for (let i in itemShops) {
    embed.addField(`f`,`**${itemss[items[i]].name} (${itemss[items[i]].price} :coin:)**`)
}

message.channel.send({embeds: [embed]})

}





module.exports.config = {
    name: 'shop', // Command Name
    description: 'The command to acced to the bot store', // Description
    usage: '+shop', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['store','market','magasin','boutique'], // Aliases 
    bankSpace: 1, // Amount of bank space to give when command is used.
    cooldown: 10 // Command Cooldown
}