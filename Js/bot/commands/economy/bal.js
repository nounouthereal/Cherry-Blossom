
 
/*
module.exports.execute = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let userBalance = client.eco.fetchMoney(user.id);
    const embed = new MessageEmbed()
        .setTitle(`Balance (Portefeuille)`)
        .addField(`User`, `<@${userBalance.user}>`)
        .addField(`Argent`, `${userBalance.amount} :dollar: `)
        .addField(`Position`, userBalance.position)
        .setColor("RANDOM")
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp();
    message.channel.send(embed);
    const card = new canvacord.Rank()          
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setRank(userBalance.position)
    .setCurrentXP(userBalance.amount)
    .setRequiredXP(1000)
    .setStatus(user.presence.status)
    .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

const attachment = new Discord.MessageAttachment(card.toBuffer(), "rank-card.png");
 
message.channel.send(attachment);
module.exports.help = {
    name: "bal",
    aliases: ["money", "credits", "balance","Argent"],
    usage: `bal`
}
    
}
*/

const { MessageEmbed } = require('discord.js');
const canvacord = require('canvacord')
const Discord = require('discord.js')


module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]) || message.member;
    const user = await bot.fetchUser(member.id);
    var avatar = member.user.displayAvatarURL({ size: 1024, dynamic: true });
    let guildname = message.guild.name;
    let bankspace_still = user.bankSpace  - user.coinsInBank;

    if (!user) {
        let moneyerrorembed = new MessageEmbed()
          .setColor("RED")
          .setTitle(`❌ Erreur!`)
          .setDescription(`**${member.user.username}** : Your id is bugged in my database, sorry about this we will restore your account.`);
        return message.channel.send({embeds: [moneyerrorembed]}).catch();
      }

    const embed = new MessageEmbed()
        .setAuthor(`${member.user.username}`,avatar)
        .setTitle(`💰 Wallet of ${member.user.username}`)
        .addField(`💳 Money:`,`${user.coinsInWallet.toLocaleString()} :coin:`)
        .addField(`🏦 In Bank:`,`${user.coinsInBank.toLocaleString()} :coin: (**Remaining bank space:** ${bankspace_still} || **Total bank space:** ${user.bankSpace})`)
        .addField(`🌐 Total profit:`,`${(user.coinsInWallet + user.coinsInBank).toLocaleString()} :coin:`)
        .setFooter(guildname,message.guild.iconURL())
        .setTimestamp()
        .setColor("#57c478")
    message.channel.send({embeds: [embed]})


    var background = message.guild.iconURL().split('.webp')
    console.log(background)
    var background = background[0]
    console.log(background)
    var background = background + '.jpeg'
    console.log(background)


/**     const rank = new canvacord.Rank()
        .setAvatar(member.user.displayAvatarURL({format: "jpg"}))
        .setUsername(member.user.username)
        .setCurrentXP(user.coinsInWallet)
        .setRequiredXP(user.coinsInWallet + user.coinsInBank)
        .setProgressBar("#FFFFFF", "COLOR")
        .setBackground("IMAGE", background)
        .setDiscriminator(member.user.discriminator)

    rank
        .build()
        .then((data) => message.channel.send({ files: [{ attachment: data }] }));
*/
}

module.exports.config = {
    name: 'balance',
    description: 'Donne des données sur l\'argent du membre',
    usage: '+balance Optionnel: @membre',
    botPerms: [],
    userPerms: [],
    aliases: ['bal', 'bank','money','credits','portefeuille','argent'],
    bankSpace: 0,
    cooldown: 10
}