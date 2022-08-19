const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "gamble",
    description: "💰 Gamble your money and try to gain BIG",
    timeout: 5000,
    options: [
        {
            name: "bet",
            description: '💸 The amount of money you want to bet',
            type: "NUMBER",
            required: true,
        }
    ],

    run: async (bot, interaction, args) => {  
        const botRoll = Math.floor(Math.random() * 13)+1;
        const userChoice = Math.floor(Math.random() * 13)+1;
        const userData = await bot.fetchUser(interaction.user.id);
        const member = interaction.member || interaction.user;
    

        let passivewarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
    
            if (userData.passive == true) return interaction.followUp({embeds: [passivewarn]});
    
    
        let betAmount = args[0];
        const result = userChoice-botRoll;
    
        let coinswarn = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`:warning: <@${member.id}> : Enter your bet (+gamble <bet>).`);

        if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return interaction.followUp({embeds: [coinswarn]});
    
        let coinmin = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.id}> : The minimum you can gamble is \`200\` :coin:.`);

            if (betAmount < 200) return interaction.followUp({embeds: [coinmin]});
        if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
        else betAmount=parseInt(args[0]);
    
        let moneywarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.id}> : You can't afford \`${args[0]}\` :coin: || You need : ${args[0] - userData.coinsInWallet} :coin:.`);

            if (betAmount > userData.coinsInWallet) {
            return interaction.followUp({embeds: [moneywarn]});
            }
    
        if (botRoll < userChoice) {
            const wonCoins = parseInt(betAmount + (betAmount * 0.20));
            userData.coinsInWallet += parseInt(wonCoins);
            await userData.save();
            const wonEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setDescription(`Gamble Bêta 1.0 | Player : <@${member.id}> \n\n<@${bot.user.id}> played : \`${botRoll}\` \n<@${member.id}> played: \`${userChoice}\`\n\nWin Rate: \`${Math.floor(userChoice-botRoll)*10}%\`\n\nWinnings: **${wonCoins.toLocaleString()}** :coin:`)
            interaction.followUp({embeds: [wonEmbed]});
        } else if (botRoll == userChoice) {
        const tieCoins = parseInt(betAmount/2);
            userData.coinsInWallet -= parseInt(tieCoins);
            await userData.save();
            const tieEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setDescription(`Gamble Bêta 1.0 | Player : <@${member.id}> \n\n<@${bot.user.id}> played: \`${botRoll}\` \n<@${member.id}> played: \`${userChoice}\`\n\n**${member.nickname}** & <@${bot.user.id}> Tied\n\nLost: **${tieCoins.toLocaleString()}** :coin:`)
            interaction.followUp({embeds: [tieEmbed]});
        } else if (botRoll > userChoice) {
            const lostCoins = (betAmount);
            userData.coinsInWallet -= parseInt(betAmount);
            await userData.save();
            const lostEmbed = new MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setDescription(`Gamble Bêta 1.0 | Player : <@${member.id}> \n\n<@${bot.user.id}> played: \`${botRoll}\` \n<@${member.id}> played: \`${userChoice}\`\n\nLost Rate: \`${Math.floor(botRoll-userChoice)*10}%\`\n\nlost: **${lostCoins.toLocaleString()}** :coin:`)
            interaction.followUp({embeds: [lostEmbed]});
        }
    }
}