const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "inventory",
    description: "💼 Display your or a user inventory",
    timeout: 5000,
    options: [
        {
            name: "user",
            description: '👤 The user inventory',
            type: 'USER',
            required: false,
        },
        {
            name: "page",
            description: '📖 Display a specific inventory page',
            type: 'NUMBER',
            required: false,
        },
    ],

    run: async (bot, interaction, args) => {   
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member || interaction.user || interaction.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || interaction.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        let avatar = member.displayAvatarURL({ size: 1024, dynamic: true });

        const user = await bot.fetchUser(member.id);

        const userData = await bot.fetchUser(member.id);
        let pageInv;

        console.log(args[0] + ' inv ' +args[1])


        if (isNaN(args[0]) || args[0] == member.id) {
          pageInv = args[1]
          console.log(args[1] + '    ---    ' + pageInv)
          
        }
        else {

          pageInv = args[0]

          console.log(args[0] + '    ----    ' + pageInv)
          
        }



        let number = 5 * parseInt(pageInv);
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
    
        if (!args[1] && !args[0] || args[0] == member.id && args[1] == undefined || args[1] == member.id && !args[0] || pageInv == undefined) {
            number = 5;
        }

        console.log(number)

        if (pageInv != undefined && pageInv <= 0 || pageInv != undefined && pageInv > page) {
          let pageError = new MessageEmbed()
          .setColor(`RED`)
          .setDescription(`:x: <@${interaction.user.id}> : The page is incorrect.`)
          return interaction.followUp({embeds: [pageError]});
      }

        if (!member) {
          let noItemsEmb = new MessageEmbed()
          .setColor(`RED`)
          .setDescription(`❌ <@${interaction.user.id}> : Please enter a correct member.`)
          return interaction.followUp({embeds: [noItemsEmb]});
        }
      
        let items = user.items.slice(number - 5, number);
        if (items.length < 1) {
            let noItemsEmb = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`:warning: <@${interaction.user.id}> : No items to display.`)
            return interaction.followUp({embeds: [noItemsEmb]});
        }
        
    
        let itemValues = Object.values(items);
    
        const embed = new MessageEmbed()
        itemValues.forEach((itemValue) => {
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
            itemValue.rarety = "```md\n# 🔵 Rare\n```"
          }
          if (itemValue.rarety === "🟢 Atypique") {
            itemValue.rarety = "```diff\n+🟢 Uncommon\n```"
          }
          if (itemValue.rarety === "⚪️ Commun") {
            itemValue.rarety = "```\n⚪️ Common\n```"
          }
    
          embed.addField(`━━━━━━━━━━━━━━━━━━━━━━━━`,`\`x${itemValue.amount}\` ${itemValue.name} [id: \`${itemValue.itemId}\`]\n*${itemValue.description}*\n${itemValue.rarety}`)
    //      embed.addField(`Description: `, `*${itemValue.description}*`)
    //      embed.addField(`ID: `, `\`${itemValue.itemId}\``)
    //      embed.addField(`Rareté: `, `${itemValue.rarety}`)
       });
    
       embed.setAuthor(`Inventory of ${member.user.tag}`, avatar)
       embed.setDescription(`Money of <@${member.user.id}> : \`${userData.coinsInWallet.toLocaleString()}\` :coin:`,false)
       .setTimestamp()
       embed.setFooter(`Page ${pageInv || 1} of ${page} • Asked by ${interaction.member.nickname}`,interaction.guild.iconURL())
       embed.setColor("#57c478");
       interaction.followUp({embeds: [embed]}); 

    }
}   