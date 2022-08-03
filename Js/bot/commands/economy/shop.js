
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

    if (items.rarety === "🔴 Mythique") {
        items.rarety = "```diff\n-🔴 Mythique\n```"
      }
      if (items.rarety === "🟠 Légendaire") {
        items.rarety = "```fix\n🟠 Légendaire\n```"
      }
      if (items.rarety === "🟣 Épique") {
        items.rarety = "```yaml\n🟣 Épique\n```"
      }
      if (items.rarety === "🔵 Rare") {
        console.log("rarety === Rare")
        items.rarety = "```md\n# 🔵 Rare\n```"
      }
      if (items.rarety === "🟢 Atypique") {
        items.rarety = "```diff\n+🟢 Atypique\n```"
      }
      if (items.rarety === "⚪️ Commun") {
        items.rarety = "```\n⚪️ Commun\n```"
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
    aliases: ['store','market','magasin','boutique'], // Aliases 
    bankSpace: 1, // Amount of bank space to give when command is used.
    cooldown: 10 // Command Cooldown
}