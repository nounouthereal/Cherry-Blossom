const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "dice",
    description: "🎲 Bet your money in a dice game",
    timeout: 30000,
    options: [
        {
            name: "bet",
            description: '💸 The amount of money you want to bet in the game',
            type: "NUMBER",
            required: true,
        }

    ],

    run: async (bot, interaction, args) => {    
    
        const botRoll = Math.floor(Math.random() * 7)+1;
        const userChoice = Math.floor(Math.random() * 7)+1;
        const userData = await bot.fetchUser(interaction.user.id);
        const member = interaction.member || interaction.user;
        let passivewarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
      
        if (userData.passive == true) return interaction.followUp({embeds: [passivewarn]});
      
        let betAmount = args[0];
        const result = userChoice-botRoll;
      
        let coinswarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.id}> : You need to enter the amount of money you want to bet.`);
    
        if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return interaction.followUp({embeds: [coinswarn]});
    
        let coinmin = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.id}> : The minimum you can bet is \`200\` :coin:.`);
    
        if (betAmount < 200) return interaction.followUp({embeds: [coinmin]});
    
        if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
        else betAmount=parseInt(args[0]);
      
        let moneywarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`:warning: <@${member.id}> : You don't have enough money. You need \`${betAmount - userData.coinsInWallet}\` :coin:`);
    
        if (betAmount > userData.coinsInWallet) {
            return interaction.followUp({embeds: [moneywarn]});
        }
      
        if (botRoll < userChoice) {
            const wonCoins = (betAmount + (betAmount * 0.20));
            userData.coinsInWallet += parseInt(wonCoins);
            await userData.save();
            const wonEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setDescription(`Dice Beta V1 | Player <@${member.id}> \n\n${bot.user.username} rolled: \`${botRoll}\` \n${member.nickname} rolled: \`${userChoice}\`\n\nMoney gained: **${wonCoins.toLocaleString()}** :coin:`)
            interaction.followUp({embeds: [wonEmbed]});
        } else if (botRoll == userChoice) {
            const tieCoins = parseInt(betAmount/2);
            userData.coinsInWallet -= parseInt(tieCoins);
            userData.save();
            const tieEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setDescription(`Dice Beta V1 | Player <@${member.id}> \n\n${bot.user.username} rolled: \`${botRoll}\` \n${member.nickname} rolled: \`${userChoice}\`\n\n**${member.nickname}** & **${bot.user.username}**: Draw\n\nLost: **${tieCoins.toLocaleString()}** :coin:`)
            interaction.followUp({embeds: [tieEmbed]});
        } else if (botRoll > userChoice) {
            const lostCoins = (betAmount);
            userData.coinsInWallet -= parseInt(betAmount);
            await userData.save();
            const lostEmbed = new MessageEmbed()
            .setColor('RED')
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setDescription(`Dice Beta V1 | Player <@${member.id}> \n\n${bot.user.username} rolled: \`${botRoll}\` \n${member.user.username} rolled: \`${userChoice}\`\n\nLost: **${lostCoins.toLocaleString()}** :coin:`)
            interaction.followUp({embeds: [lostEmbed]});
        }
    }
}