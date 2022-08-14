const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    const authorData = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);
    const reason = args[2]


    let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : Vous avez  \`PASSIVE\` d'activé, vous devez le désactiver pour utiliser cette commande.`);
  
        if (authorData.passive == true) return message.channel.send(passivewarn);

    if (!member || !args[0]) {
      
    let sendcoinsembed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : Á qui donnez vous de l'argent ?`);
    return message.channel.send({embeds: [sendcoinsembed]}).catch();
        //return message.channel.send(`Who are you giving the coins to?`);
    }
    if (member.user.id == message.author.id) {
    let sendcoinsembed1 = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : Vous ne pouvez pas vous donner de l'argent.`);
    return message.channel.send({embeds: [sendcoinsembed1]}).catch();
   //return message.channel.send(`Lol you can't give yourself coins u crazy.`);
    }
    if (!args[1]) {
    let sendcoinsembed2 = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : Combien d'argent leur donnez-vous.`);
    return message.channel.send({embeds: [sendcoinsembed2]}).catch();
    //return message.channel.send(`How much coins are you giving them?`);
    }

    if (isNaN(args[1]) && args[1] != 'all' || isNaN(args[1]) && args[1] != 'max') {
        return message.channel.send(`:warning: Ce n'est pas une option valide`)
    }
    const userData = await bot.fetchUser(member.user.id);
    if (userData.passive == true) {
    let sendcoinsembed3 = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : L'utilisateur à qui vous essayez de donner de l'argent a \`PASSIVE\` activé, il devra le désactiver pour pouvoir recevoir sa somme d'argent.`);
    return message.channel.send({embeds: [sendcoinsembed3]}).catch();
      //return message.channel.send(`That user is in passive mode, they can't recive any coins`);
    }
                                  
    if (args[1] == 'all' || args[1] == 'max') {
        const toGive = authorData.coinsInWallet;

        authorData.coinsInWallet = 0;

        await authorData.save();

        userData.coinsInWallet = (userData.coinsInWallet + toGive);

        userData.save();

    let sendcoinsembed3 = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`🏧 Payement réalisé`)
    .addField(`👤 Bénéficiaire:`,`<@${member.id}>`)
    .setAuthor(message.author,message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    .addField(`💰 Montant du payement:`,`**${parseInt(toGive).toLocaleString()}** :coin:`)
    .addField(`🧾 Raison:`,`\`${reason}\``)
    .addField(`🎫 Auteur`,`<@${message.author.id}> `)
    .setDescription(`💳 <@${message.author.id}> a donnée à ${member} **${parseInt(toGive).toLocaleString()}** :coin:`);
    message.channel.send({embeds: [sendcoinsembed3]}).catch();
        //message.channel.send(`You gave ${member} **${parseInt(toGive).toLocaleString()}** coins`); //Change the message how u like
    } else {
        const toGive = args[1];

        if (toGive > authorData.coinsInWallet) {
          
    let sendcoinsembed222 = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ Vous ne disposez pas de \`${parseInt(toGive).toLocaleString()}\` :coin:.`);
    return message.channel.send({embeds: [sendcoinsembed222]}).catch();
          
          //return message.reply(`You don't have that many coins.`);
        }

        authorData.coinsInWallet = (authorData.coinsInWallet - parseInt(toGive));

        await authorData.save();

        userData.coinsInWallet = (userData.coinsInWallet + parseInt(toGive));

        await userData.save();
    const usertag = message.member;
    let sendcoinsembed3 = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`🏧 Payment realisé`)
    .addField(`👤 Bénéficiaire:`,`<@${member.id}>`)
    .setAuthor(message.author,message.author.displayAvatarURL({ size: 1024, dynamic: true }))
    .addField(`💰 Montant du payement:`,`**${parseInt(toGive).toLocaleString()}** :coin:`)
    .addField(`🧾 Raison:`,`\`${reason}\``)
    .addField(`🎫 Auteur`,`<@${message.author.id}> `)
    .setDescription(`💳 <@${message.author.id}> payed ${member} **${parseInt(toGive).toLocaleString()}** :coin:, for: \`${reason}\``);
    message.channel.send({embeds: [sendcoinsembed3]}).catch();

    let sendcoinsembed4 = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`🏧 You have been payed`)
    .addField(`🎫 Author`,`<@${message.author.id}> `)
    .setAuthor(member.usertag,member.displayAvatarURL({ size: 1024, dynamic: true }))
    .addField(`💰 Payment amount:`,`**${parseInt(toGive).toLocaleString()}** :coin:`)
    .addField(`🧾 Reason:`,`\`${reason}\``)
    .setDescription(`💳 ${message.author.usertag} payed ${member} **${parseInt(toGive).toLocaleString()}** :coin:, for: \`${reason}\``);
    member.send({embeds: [sendcoinsembed4]}).catch();
    }
}
module.exports.config = {
    name: 'give', // Command Name
    description: 'Offre de l\'argent à un membre du serveur', // Description
    usage: '+give @membre <amount> Optionnel: <raison>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['donner','pay','transfer'], // Aliases 
    bankSpace: 3, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}