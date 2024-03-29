const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "daily",
    description: "💰 Claim your daily reward",
    timeout: 5000,

    run: async (bot, interaction, args) => {

        const member = interaction.member;
        let user = await bot.fetchUser(interaction.user.id);
        if ((Date.parse(user.dailyStreak) + 50400000) > Date.now()) {
            const embed = new MessageEmbed()
                .setDescription(`:warning: <@${member.id}> : You already claimed your weekly reward.\n\nYou have to wait \`${ms((Date.parse(user.dailyStreak) + 50400000) - Date.now())}\` before to reclaim your weekly reward.\n\nThe default cooldown is \`14 hours (14h)\`.`)
                .setColor('#FFA500');
            return interaction.followUp({embeds: [embed]});
        } else {
            let amount = Math.floor(Math.random() * 500) + 100;
            user.coinsInWallet += amount;
            const claimed = new MessageEmbed()
                .setTitle(`✅ Daily reward claimed`)
                .setDescription(`<@${member.id}> : You have claimed \`${amount}\` :coin: (Reclaim your weekly reward in \`14 hours\` !)`)
                .addField(`💸 Reward:`,`\`${amount}\` :coin:`)
                .addField(`💳 Balance:`,`\`${user.coinsInWallet.toLocaleString()}\` :coin:`)
                .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
                .setTimestamp()
                .setColor('RANDOM');
            interaction.followUp({embeds: [claimed]});
           user.save().then(user.dailyStreak = new Date(Date.now()))
    
          
        }
    }
}