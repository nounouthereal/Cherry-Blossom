const { MessageEmbed } = require('discord.js');
const economy = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/models/EconomyModel.js');

module.exports.run = async (bot, message, args) => {

    let balArray = [`balance`,`bal`,`money`,`credits`,`wallet`,`b`]
    let itemsArray = [`items`,`item`,`objects`,`i`,`object`]

    if (!args[0] || balArray.includes(args[0].toLowerCase())) {    

        let data = await economy.find().sort([['coinsInWallet', 'descending']])
        data = data.filter(x => message.guild.members.cache.get(x.userId) && message.guild.members.cache.get(x.userId).bot != true).slice(0, 10);
        if (data.length == 0) return message.channel.send(':confused: No one is rich here.'); 
        
        const emojis = [':first_place:', ':second_place:', ':third_place:'];
        data = data.map((x, i) => `${emojis[i] || ` **${i + 1}.** `} \`${x.coinsInWallet.toLocaleString()}\` :coin: - <@${bot.users.cache.get(x.userId).id || 'Unkown#0000'}>`);

        let basic_data2 = await economy.find().sort([['coinsInWallet', 'descending']])

        let data2 = basic_data2.filter(x => bot.users.cache.get(x.userId) && bot.users.cache.get(x.userId).bot != true).slice(0, 10);
        data2 = data2.map((x, i) => `${emojis[i] || ` **${i + 1}.** `} \`${x.coinsInWallet.toLocaleString()}\` :coin: - <@${bot.users.cache.get(x.userId).id || 'Unkown#0000'}>`);

        if (data2.length == 0) return message.channel.send(':warning: A database error occured please retry later'); 



        const embed = new MessageEmbed()
            .setAuthor(`🤑 Most richest users in ${message.guild.name} (Balance)`)
            .setDescription(`${data.join('\n')}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`, message.guild.iconURL());
        var sent = await message.channel.send({embeds: [embed]});

        const embed2 = new MessageEmbed()
            .setAuthor(`🌐 Global Economy Leaderboard (Balance)`)
            .setDescription(`${data2.join('\n')}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Asked by ${message.member.displayName} • Global`, message.guild.iconURL());
        var sent2 = await message.channel.send({embeds: [embed2]})
    }

    else if (itemsArray.includes(args[0].toLowerCase())) {
        let itemsData = await economy.find().sort([['items', 'descending']])

        itemsData = itemsData.filter(x => message.guild.members.cache.get(x.userId) && message.guild.members.cache.get(x.userId).bot != true).slice(0, 10);
        if (itemsData.length == 0) return message.channel.send(':confused: No one is rich here.'); 
        
        const emojis = [':first_place:', ':second_place:', ':third_place:'];
        itemsData = itemsData.map((x, i) => `${emojis[i] || ` **${i + 1}.** `} \`${x.items.length.toLocaleString()}\` items - <@${bot.users.cache.get(x.userId).id || 'Unkown#0000'}>`);

        let basic_itemsData2 = await economy.find().sort([['items', 'descending']])

        let itemsData2 = basic_itemsData2.filter(x => bot.users.cache.get(x.userId) && bot.users.cache.get(x.userId).bot != true).slice(0, 10);
        itemsData2 = itemsData2.map((x, i) => `${emojis[i] || ` **${i + 1}.** `} \`${x.items.length.toLocaleString()}\` items - <@${bot.users.cache.get(x.userId).id || 'Unkown#0000'}>`);

        if (itemsData2.length == 0) return message.channel.send(':warning: A database error occured please retry later'); 



        const embed = new MessageEmbed()
            .setAuthor(`🤑 Most possessive users in ${message.guild.name} (Items)`)
            .setDescription(`${itemsData.join('\n')}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`, message.guild.iconURL());
        var sent = await message.channel.send({embeds: [embed]});

        const embed2 = new MessageEmbed()
            .setAuthor(`🌐 Global Economy Leaderboard (Items)`)
            .setDescription(`${itemsData2.join('\n')}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Asked by ${message.member.displayName} • Global`, message.guild.iconURL());
        var sent2 = await message.channel.send({embeds: [embed2]})
    }

    /* setInterval(function() {
        sent.edit({embeds: [embed]})
        sent2.edit({embeds: [embed2]})

    }, 2000) */
    

    /*let array = [];
    const members = message.guild.members.cache.filter(member => !member.user.bot);
    for(const member of members.array()) {
        const user = await bot.fetchUser(member.user.id);
        array.push({
            tag: bot.users.cache.get(member.user.id).tag ? bot.users.cache.get(member.user.id).tag : 'Unknown#0000',
            coins: user.coinsInWallet ? user.coinsInWallet : 0
        });
    }
    const emojis = [':first_place:', ':second_place:', ':third_place:'];
    array = array.filter(user => user.coins > 0);
    if (array.length < 1) {
        return message.channel.send('No rich people in this server lmao');
    }
    array = array.sort((a, b) => {
        return b.coins - a.coins
    });
    array = array.slice(0, 6);
    array = array.map((x, i) => `${emojis[i] || '🔹'} **${x.coins.toLocaleString()}** - ${x.tag}`);
    const embed = new MessageEmbed()
        .setAuthor(`Richest people in ${message.guild.name}`)
        .setDescription(`${array.join('\n')}`)
        .setColor('RANDOM')
        .setFooter('wish I had that much money');
    message.channel.send(embed);*/
}
module.exports.config = {
    name: 'leaderboard', // Command Name
    description: 'Shows the richest people in your server.', // Description
    usage: '+leaderboard Optionnal: "balance" || "items"', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['leader','lb','rich','topmoney'], // Aliases 
    bankSpace: 2, // Amount of bank space to give when command is used.
    cooldown: 10 // Command Cooldown
}