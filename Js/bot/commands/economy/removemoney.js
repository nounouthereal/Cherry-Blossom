const { MessageEmbed } = require("discord.js");

module.exports.run =  async (bot, message, args) =>{
    if (!args[0]) return message.channel.send("**❌ Merci de spécifier un utilisateur**")

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
    const userData = await bot.fetchUser(user.id);
    if (!user) return message.channel.send(`**${x} Membre ${user} introuvable !**`)
    if (!args[1]) return message.channel.send(`**${x} Merci de donner un montant !**`)
    if (isNaN(args[1])) return message.channel.send(`**${x} Votre montant est pas un nombre!**`);
    if (args[1] > 100000) return message.channel.send(`**${x} Un rejetement au dessus de 100000 pourrait nuire l'économie du  serveur!**`);

    bot.giveCoins(user.id,  -parseInt(args[1]));

    var somme = args[1]


    const embed = new MessageEmbed()
    .setTitle(`✅ Argent diminué !`)
    .addField(`👤 Membre:`, `<@${user.id}>`)
    .addField(`👮 Administrateur:`,`<@${message.author.id}>`,false)
    .addField(`💸 Balance diminuée:`, `${somme} :coin:`)
    .addField(`🌐 Argent total:`, `${parseInt(args[1]) - parseInt(userData.coinsInWallet)} :coin:`)
    .setColor("GREEN")
    .setThumbnail(user.displayAvatarURL)
    .setFooter(message.guild.name)
    .setTimestamp();
    console.log(parseInt(args[1]) - parseInt(userData.coinsInWallet))
    return message.channel.send({embeds: [embed]});
}


module.exports.config = {
    name: 'removemoney', // Command Name
    description: 'Retirer de l\'argent', // Description
    usage: '+removemoney <amount> @membre', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['removecredits','removebal','rm','rmvm','rmv'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 200 // Command Cooldown
  }