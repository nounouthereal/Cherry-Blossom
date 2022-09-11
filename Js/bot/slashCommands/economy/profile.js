const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const moment = require('moment');
const pm = require('ms');


module.exports = {
    name: "profile",
    description: "🖨 Show your or a user profile",
    timeout: 5000,
    options: [

        {
            name: "user",
            description: '👤 The user profile',
            type: "USER",
            required: false,
        }

    ],


    run: async (bot, interaction, args) => {

        const member = interaction.options.getUser('user') || interaction.member || interaction.user|| interaction.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || interaction.user.username === args[0]) || interaction.member;
        const user = await bot.fetchUser(member.id);
        

        if (member.presence?.status === 'dnd') member.presence.status = '<:dnd:1013512333118672916> Do not disturb';
        if (member.presence?.status === 'online') member.presence.status = '<:online:1013511963663421563> Online';
        if (member.presence?.status === 'idle') member.presence.status = '<:idle:1013511731722596364> Idle';
        if (member.presence?.status === 'offline') member.presence.status = '<:offline:1013512151522091018> Offline';

        const createDays = Math.floor((Date.now() - member.user.createdAt) / 86400000);
        const joinDays = Math.floor((Date.now() - member.joinedAt) / 86400000);
        const profileEmbed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL())
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .addFields(
            { name: 'Joined', value: `\`` + moment.utc(member.user.createdAt).format("ddd, MMM Do YYYY, HH : mm A") + `\`` + ` \`${createDays}\` Day(s) ago`, inline: true },
            { name: 'Joined server at', value: `\`` + moment.utc(member.joinedAt).format("ddd, MMM Do YYYY, HH : mm A") + `\`` + ` \`${joinDays}\` Day(s) ago`, inline: true },
            { name: 'Status', value: `${member.presence.status}`, inline: true },
            { name: `Economy`, value: 
            `• Total Money: \`${(user.coinsInBank + user.coinsInWallet).toLocaleString()}\` :coin:\n• Bank Coins: \`${user.coinsInBank.toLocaleString()}\` :coin:\n• Bank Space: \`${user.bankSpace.toLocaleString()}\` :coin:
            `, inline: true },
          { name: `Other Infos`, value: `• Total Items: \`${user.items.length.toLocaleString()}\`\n• Passive mode: \`${user.passive}\`\n• Next daily reward in: \`${pm((Date.parse(user.dailyStreak) + 86400000) - Date.now())}\`
            `, inline: true },
        )
        .setColor('RANDOM')
        .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
        .setTimestamp();

        interaction.followUp({embeds: [profileEmbed]});
}
}