const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "roulette",
    description: "🎯 Bet your money in a roulette game",
    timeout: 30000,
    options: [
        {
            name: "color",
            description: '🎨 The roulette color to bet on it.',
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "🔴 Red [x1.5 || 1/2]",
                    value: "red",
                },
                {
                    name: "⚫️ Black [x2 || 1/3]",
                    value: "black",
                },
                {
                    name: "🟡 Yellow [x2.5 || 1/4]",
                    value: "yellow",
                },
                {
                    name: "🟢 Green [x5 || 1/10]",
                    value: "green",
                },
                {
                    name: "❔ Help [Needs Help ?]",
                    value: "help",
                }
            ]
        },
        {
            name: "bet",
            description: '💸 The amount of money you want to bet in the roulette party',
            type: "NUMBER",
            required: true,
        }

    ],

    run: async (bot, interaction, args) => {   
        
        const member = interaction.member || interaction.user;

        const userData = await bot.fetchUser(member.id);
  
        let passivewarn = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${member.user.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
    
        if (userData.passive == true) return interaction.followUp({embeds:[passivewarn]});
      
  
        let colour = args[0];
    
        let colorbad = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${member.user.id}> : Invalid color please chose a following one.`);
        let colorbadinfo = new MessageEmbed()
            .setColor("BLUE")
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,member.user.displayAvatarURL())
            .setDescription(`💁 <@${member.user.id}> : Command Information 
    🔴 Red | Multipliar: x1.5
    \`+roulette red <bet>\`
    ⚫ Black | Multipliar: x2
    \`+roulette black <bet>\`
    🟡 Yellow | Multipliar: x2.5
    \`+roulette yellow <bet>\`
    🟢 Green | Multiplier: x5
    \`+roulette green <bet>\`
  `);
  /*
  🔴Red | Multiplier: x1.5
  \`h roulette red (amount)\`
  ⚫Black | Multiplier: x2
  \`h roulette black (amount)\`
  🟡 Yellow | Multiplier: x2.5
  \`h roulette yellow (amount)\`
  🟢Green | Multiplier: x5
  \`h roulette green (amount)\`
  */
        if (!colour) return interaction.followUp({embeds:[colorbad]}).then(interaction.followUp({embeds:[colorbadinfo]}));
          colour = colour.toLowerCase()
    
          if (colour == "b" || colour.includes("black")) colour = 0;
          else if (colour == "r" || colour.includes("red")) colour = 1;
          else if (colour == "g" || colour.includes("green")) colour = 2;
          else if (colour == "y" || colour.includes("yellow")) colour = 3;
          else return interaction.followUp({embeds:[colorbad]}).then(interaction.followUp({embeds:[colorbadinfo]}));
    
          let betAmount = args[1];
    
        let coinswarn = new MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ <@${member.user.id}> : Enter your bet`);
    
      if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return interaction.followUp({embeds:[coinswarn]});
    
      let coinmin = new MessageEmbed()
      .setColor("RED")
      .setDescription(`❌ <@${member.user.id}> : The minimum you can bet is \`200\` :coin:.`);
  
             if (betAmount < 200) return interaction.followUp({embeds:[coinmin]});
      else betAmount=parseInt(args[1]);
    
             if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
             if (betAmount > userData.coinsInWallet) {
             return interaction.followUp(`❌ <@${member.user.id}> : You don\'t have enough money. You need ${betAmount - userData.coinsInWallet}`);
             }
    
          //let betAmount = args[1];
          let random = Math.floor((Math.random() * 10));
  
          let moneyhelp = new MessageEmbed()
              .setColor("RED")
              .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
              .setTimestamp()
              .setDescription(`❌ <@${member.user.id}> :  Please enter a correct bet \n\n \`+roulette green 200\``);
  
          let moneymore = new MessageEmbed()
              .setColor("RED")
              .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
              .setTimestamp()
              .setDescription(`❌ <@${member.user.id}> :  You bet more than you have.`);
  
          
          if (!betAmount) return interaction.followUp({embeds:[moneyhelp]});
  
          if (random == 10 && colour == 2) { 
              betAmount *= 5
              bot.giveCoins(member.user.id, betAmount)
              let moneyEmbed1 = new MessageEmbed()
                  .setColor("GREEN")
                  .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                  .setTimestamp()
                  .setDescription(`Roulette V2 | Joueur : <@${member.user.id}> \n\n **👑 You win !** \n\n 🎨 Color : 🟢  \n\n 🧮 Multipliar : **x5**  \n\n 💰 Gains:\`${betAmount.toLocaleString()}\` :coin:`);
              interaction.followUp({embeds:[moneyEmbed1]})
            
          } else if (random == 2 || random == 4 || random == 6 || random == 8 && colour == 1) { 
              betAmount = parseInt(betAmount * 1.5)
              bot.giveCoins(member.user.id, betAmount)
              let moneyEmbed2 = new MessageEmbed()
                  .setColor("RED")
                  .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                  .setTimestamp()
                  .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,member.user.displayAvatarURL())
                  .setDescription(`Roulette V2 | Player : <@${member.user.id}> \n\n **👑 You win !** \n\n 🎨 Color : 🔴 \n\n 🧮 Multipliar : **x1.5**  \n\n 💰 Gains: \`${betAmount.toLocaleString()}\` :coin:`);
              interaction.followUp({embeds:[moneyEmbed2]})
            
            } else if (random == 3 || random == 1 && colour == 3) { 
              betAmount = parseInt(betAmount * 2.5)
              bot.giveCoins(member.user.id, betAmount)
              let moneyEmbed4 = new MessageEmbed()
                  .setColor("YELLOW")
                  .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                  .setTimestamp()
                  .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,member.user.displayAvatarURL())
                  .setDescription(`Roulette V2 | Player : <@${member.user.id}> \n\n **👑 You win !** \n\n 🎨 Color : 🟡 \n\n 🧮 Multipliar : **x2.5**  \n\n 💰 Gains: \`${betAmount.toLocaleString()}\` :coin:`);
              interaction.followUp({embeds:[moneyEmbed4]})
              
          } else if (random == 5 || random == 9 || random == 7 && colour == 0) { 
              betAmount = parseInt(betAmount * 2)
              bot.giveCoins(member.user.id, betAmount)
              let moneyEmbed3 = new MessageEmbed()
                  .setColor("BLACK")
                  .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                  .setTimestamp()
                  .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,member.user.displayAvatarURL())
                  .setDescription(`Roulette Bêta | Player : <@${member.user.id}> \n\n **👑 You win !** \n\n 🎨 Color : ⚫ \n\n 🧮 Multipliar : **x2**  \n\n 💰 Gains: \`${betAmount.toLocaleString()}\` :coin:`);
              interaction.followUp({embeds:[moneyEmbed3]})
            
          } else { 
          const lostCoins = (betAmount);
          userData.coinsInWallet -= parseInt(betAmount);
          await userData.save();
              let moneyEmbed4 = new MessageEmbed()
                  .setColor("RED")
                  .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                  .setTimestamp()
                  .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,member.user.displayAvatarURL())
                  .setDescription(`Roulette Bêta | Player : <@${member.user.id}> \n\n😭 You lost:\`${betAmount.toLocaleString()}\` :coin: \n\nGood luck next time`);
              interaction.followUp({embeds:[moneyEmbed4]})
          }

    }
}