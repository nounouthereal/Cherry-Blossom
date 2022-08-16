const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "daily",
    description: "💰 Claim your daily reward",
    timeout: 5000,

    run: async (bot, interaction, args) => {

        const member = interaction.member;
        let user = await bot.fetchUser(interaction.user.id);
        if ((Date.parse(user.dailyStreak) + 86400000) > Date.now()) {
            const embed = new MessageEmbed()
                .setDescription(`${cd} <@${member.id}> : You already claimed your weekly reward.\nYou have to wait \`${ms((Date.parse(user.dailyStreak) + 86400000) - Date.now())}\` before to reclaim your weekly reward.\nThe default cooldown is \`1 day (24h)\`.`)
                .setColor('#FFA500');
            return interaction.followUp({embeds: [embed]});
        } else {
            let amount = Math.floor(Math.random() * 500) + 100;
            user.coinsInWallet += amount;
            const claimed = new MessageEmbed()
                .setTitle(`✅ Daily reward claimed`)
                .setDescription(`<@${member.id}> : You have claimed ${amount} :coin: (Reclaim your weekly reward in \`24 hours\` !)`)
                .addField(`💸 Reward:`,`${amount} :coin:`)
                .addField(`💳 Balance:`,`${user.coinsInWallet.toLocaleString()} :coin:`)
                .setColor('RANDOM');
            interaction.followUp({embeds: [claimed]});
           user.save().then(user.dailyStreak = new Date(Date.now()))
    
          
        }
    }
}