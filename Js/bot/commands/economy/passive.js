
const { MessageEmbed } = require("discord.js");


module.exports.run = async (bot, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const userData = await bot.fetchUser(message.author.id);
    const enable = ['true','on','enable','active'];
    const disable = ['false','off','disable','inactive'];


    if (!args[0]) {
        let status = userData.passive
        if (status == false) status=`🔥 \`DISABLED\``
        else status=`💤 \`ENABLED\``
        
        let passive1embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`💁 <@${member.user.id}> : Your passive mod is actually : ${status}.`);
        return message.channel.send({embeds: [passive1embed]}).catch();
    }

    if (enable.includes(args[0].toString().toLowerCase())) {
        let passive2embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`💁 <@${member.user.id}> : Your passive mod is already 💤 \`ENABLED\`.`);

        if (userData.passive == true) return message.channel.send({embeds: [passive2embed]}).catch();

        userData.passive=true;
        await userData.save();

        let passive3embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ <@${member.user.id}> : Your passive mod is now set to : 💤 \`ENABLED\`.`);

        message.channel.send({embeds: [passive3embed]}).catch();
        //message.reply(`I have enabled your passive mode`);
    }
     else if (disable.includes(args[0].toString().toLowerCase())) {
         let passive4embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`💁 <@${member.user.id}> : Your passive mod is already 🔥 \`DISABLED\`.`);

        if (userData.passive == false) return message.channel.send({embeds: [passive4embed]}).catch();
        userData.passive=false;
        await userData.save();
        let passive5embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ <@${member.user.id}> : Your passive mod is now set to : 🔥 \`DISABLED\`.`);

        message.channel.send({embeds: [passive5embed]}).catch();
    } else {
        let passive6embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.user.id}> : This is not a valid option. (\`+passive enable || disable\`)`);

        message.channel.send({embeds: [passive6embed]}).catch();

            
           }
}
module.exports.config = {
    name: 'passive', // Command Name
    description: '💤 Enable / Disable passive mode.', // Description
    usage: '+passive <on or off>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['pa'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 300 // Command Cooldown
}