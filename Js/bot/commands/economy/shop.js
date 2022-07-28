
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ItemManager = require("../../utils/ItemManager");
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const array = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');

module.exports.run = async (bot, message, args) => {

let items = Object.keys(itemss);
let content = "";

let embed = new MessageEmbed()
.setTitle("🏪 Boutique")
.setColor("#57c478")
.setFooter("Faites +buy <item>")

for (let i in items) {
    embed.addField(`**${itemss[items[i]].name} (${itemss[items[i]].price} :coin:)**`)
}

message.channel.send({embeds: [embed]})

}





module.exports.config = {
    name: 'shop', // Command Name
    description: 'La commande pour accéder a la boutique du serveur', // Description
    usage: '+shop', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['store','market','magasin','boutique'], // Aliases 
    bankSpace: 1, // Amount of bank space to give when command is used.
    cooldown: 10 // Command Cooldown
}