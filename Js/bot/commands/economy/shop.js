
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ItemManager = require("../../utils/ItemManager");
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const array = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');

module.exports.run = async (bot, message, args) => {
 
let items = Object.values(itemss);
let itemShops = items.displayOnShop


let embed = new MessageEmbed()
.setTitle("🏪 Shop")
.setColor("#57c478")
.setFooter("For buying an item do +buy <itemId>")
console.log(itemShops)


for (let i in items) {

    if (items.rarety === "🔴 Mythiqual") {
        items.rarety = "```diff\n-🔴 Mythiqual\n```"
      }
      if (items.rarety === "🟠 Legendary") {
        items.rarety = "```fix\n🟠 Legendary\n```"
      }
      if (items.rarety === "🟣 Epic") {
        items.rarety = "```yaml\n🟣 Epic\n```"
      }
      if (items.rarety === "🔵 Rare") {
        console.log("rarety === Rare")
        items.rarety = "```md\n# 🔵 Rare\n```"
      }
      if (items.rarety === "🟢 Uncommon") {
        items.rarety = "```diff\n+🟢 Uncommon\n```"
      }
      if (items.rarety === "⚪️ Common") {
        items.rarety = "```\n⚪️ Common\n```"
      }
    embed.addField(`━━━━━━━━━━━━━━━━━━━━━━━━`,`**📛 Nom:** ${items.name}\n\n**💰 Prix:** ${items.price} :coin:\n\n**🧾 Description:** ${items.description}\n\n**🆔 ID:** \`${items.itemId}\`\n\n**🎨 Rareté:** ${items.rarety}`)
}

message.channel.send({embeds: [embed]})

}





module.exports.config = {
    name: 'shop', // Command Name
    description: 'The command to acced to the bot store', // Description
    usage: '+shop', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['store','market'], // Aliases 
    bankSpace: 2, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}