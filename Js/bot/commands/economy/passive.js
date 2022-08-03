const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const { MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const userData = await bot.fetchUser(message.author.id);
    const enable = ['true','on','enable','activé','actif','active'];
    const disable = ['false','off','disable','désactivé','non-actif','desactive'];
    if (!args[0]) {
        let status = userData.passive
        if (status == false) status=`\`DISABLED\``
        else status=`\`ENABLED\``
        
        let passive1embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`💁 **${member.user.username}** : Votre mode passif est actuellement en : ${status}.`);

            return message.channel.send({embeds: [passive1embed]}).catch();
        //return message.channel.send(`Your passive mode is ${status}`);
    }
    if (enable.includes(args[0].toString().toLowerCase())) {
        let passive2embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`💁 **${member.user.username}** : Votre mode passif est déjà \`ENABLED\` (activé).`);

        if (userData.passive == true) return message.channel.send({embeds: [passive2embed]}).catch();
        //if (userData.passive == true) return message.reply(`You're already in passive mode`)

        userData.passive=true;
        await userData.save();

        let passive3embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ **${member.user.username}** : J'ai \`ENABLED\` (activé) votre mode passif`);

        message.channel.send({embeds: [passive3embed]}).catch();
        //message.reply(`I have enabled your passive mode`);
    } else if (disable.includes(args[0].toString().toLowerCase())) {
         let passive4embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`💁 **${member.user.username}** : Votre mode passif est actuellement : \`DISABLED\` (désactivé).`);

        if (userData.passive == false) return message.channel.send({embeds: [passive4embed]}).catch();
        //if (userData.passive == false) return message.reply(`You're not passive mode`);
        userData.passive=false;
        await userData.save();
        let passive5embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ **${member.user.username}** : J'ai \`DISABLED\` (désactivé) votre mode passif.`);

        message.channel.send({embeds: [passive5embed]}).catch();
        //message.reply(`I have disabled your passive mode`);
    } else {
        let passive6embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ **${member.user.username}** : Cette option n'est pas valide.`);

        message.channel.send({embeds: [passive6embed]}).catch();

        //message.reply(`Dude that's not a valid option`);
            
           }
}
module.exports.config = {
    name: 'passive', // Command Name
    description: 'Enable / Disable passive mode.', // Description
    usage: '+passive <on ou off>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['passif'], // Aliases 
    bankSpace: 2, // Amount of bank space to give when command is used.
    cooldown: 300 // Command Cooldown
}