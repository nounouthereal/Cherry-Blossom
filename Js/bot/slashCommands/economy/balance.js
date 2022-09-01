const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "balance",
    description: "💳 Show your or a user balance",
    cooldown: 5,
    bankSpace: 2,
    options: [

        {
            name: "user",
            description: '💳 The user balance',
            type: "USER",
            required: false,
        }

    ],


    run: async (bot, interaction, args) => {

        if (!args[0]) {
            args[0] = interaction.user
        }
        const member = interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || interaction.user.username === args[0]) || interaction.member;
        const user = await bot.fetchUser(member.id);
        var avatar = member.user.displayAvatarURL({ size: 1024, dynamic: true });
        let guildname = interaction.guild.name;
        let bankspace_still = user.bankSpace  - user.coinsInBank;

        if (!user) {
            let moneyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`❌ Error!`)
            .setDescription(`**${member.user.username}** : Your id is bugged in my database, sorry about this we will restore your account.`);
            return interaction.followUp({interaction, embeds: [moneyerrorembed]}).catch();
        }


        const embed = new MessageEmbed()
            .setAuthor(`${member.user.username}`,avatar)
            .setTitle(`💰 Wallet of ${member.user.username}`)
            .addField(`💳 Money:`,`\`${user.coinsInWallet.toLocaleString()}\` :coin:`)
            .addField(`🏦 In Bank:`,`\`${user.coinsInBank.toLocaleString()}\` :coin: (**Remaining bank space:** \`${bankspace_still}\` || **Total bank space:** \`${user.bankSpace}\`)`)
            .addField(`🌐 Total profit:`,`\`${(user.coinsInWallet + user.coinsInBank).toLocaleString()}\` :coin:`)
            .setFooter(`Asked by: ${interaction.member.displayName} • ${guildname}`,interaction.guild.iconURL())
            .setTimestamp()
            .setColor("#57c478")
        interaction.followUp({embeds: [embed]})
    }
}