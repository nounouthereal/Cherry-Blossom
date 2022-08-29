const { MessageEmbed } = require('discord.js');
const economy = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/models/EconomyModel.js');

module.exports = {
    name: "leaderboard",
    description: "🌐 Shows economy leader",
    timeout: 5000,
    options: [

        {
            name: "sort",
            description: '🌐 The leaderboard info slection',
            type: "STRING",
            required: false,
            choices: [
                {
                    name: 'balance',
                    description: '💳 Sort by balance',
                    value: 'balance',
                },
                {
                    name: 'items',
                    description: '📦 Sort by items',
                    value: 'items',
                }
            ],
        }

    ],


    run: async (bot, interaction, args) => {

        if (!args[0] || args[0] == 'balance') {    

            let data = await economy.find().sort([['coinsInWallet', 'descending']])
            data = data.filter(x => interaction.guild.members.cache.get(x.userId) && interaction.guild.members.cache.get(x.userId).bot != true).slice(0, 10);
            if (data.length == 0) return interaction.followUp(':confused: No one is rich here.'); 
            
            const emojis = [':first_place:', ':second_place:', ':third_place:'];
            data = data.map((x, i) => `${emojis[i] || ` **${i + 1}.** `} \`${x.coinsInWallet.toLocaleString()}\` :coin: - <@${bot.users.cache.get(x.userId).id || 'Unkown#0000'}>`);

            let basic_data2 = await economy.find().sort([['coinsInWallet', 'descending']])

            let data2 = basic_data2.filter(x => bot.users.cache.get(x.userId) && bot.users.cache.get(x.userId).bot != true).slice(0, 10);
            data2 = data2.map((x, i) => `${emojis[i] || ` **${i + 1}.** `} \`${x.coinsInWallet.toLocaleString()}\` :coin: - <@${bot.users.cache.get(x.userId).id || 'Unkown#0000'}>`);

            if (data2.length == 0) return interaction.followUp(':warning: A database error occured please retry later'); 



            const embed = new MessageEmbed()
                .setAuthor(`🤑 Most richest users in ${interaction.guild.name} (Balance)`)
                .setDescription(`${data.join('\n')}`)
                .setColor('RANDOM')
                .setFooter(interaction.guild.name, interaction.guild.iconURL());
            var sent = await interaction.followUp({embeds: [embed]});

            const embed2 = new MessageEmbed()
                .setAuthor(`🌐 Global Economy Leaderboard (Balance)`)
                .setDescription(`${data2.join('\n')}`)
                .setColor('RANDOM')
                .setFooter(interaction.guild.name, interaction.guild.iconURL());
            var sent2 = await interaction.followUp({embeds: [embed2]})
        }

        else if (args[0] == 'items') {
            
        }

    }


}