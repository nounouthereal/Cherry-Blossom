const { MessageEmbed } = require("discord.js");

const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'

module.exports.run =  async (bot, msg, args) => {
    try { 
        if (isNaN(args[0]) && !args[0].startWith(`https://`)) {
            let emb = new MessageEmbed()
            .setDescription(`❌ <@${msg.author.id}> : The id needs to be a number`)
            .setColor("RED")

            return msg.channel.send({embeds: [emb]})
        }

        if(args[0].startWith(`https://discord.com/channels/${msg.guild.id}/${msg.channel.id}`)) {
            args[0] = args[0].split('/')
            args[0] = args[0][6]

        }

        if (!args[1].startsWith(`https://discord.com/channels/${msg.guild.id}/${msg.channel.id}`)) {
            let emb = new MessageEmbed()
            .setDescription(`❌ <@${msg.author.id}> : The link needs to be a discord message link`)
            .setColor("RED")
            
            return msg.channel.send({embeds: [emb]})
        }

        const message = await msg.channel.messages.fetch(args[0])

        console.log(message)

        let is_an_embed
        let has_component
        console.log(message.embeds)
        console.log(message.components+'s')

        if (message.embeds[0] == '[]' ) {
            is_an_embed = 'No'
        }

        else {
            is_an_embed = "Yes"
        }

        if (message.components == '[]' || message.components == '') {
            has_component = 'No'
        }

        else {
            has_component = "Yes"
        }

        let date = new Date(message.createdTimestamp)
        date = "Date: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds();

        let embed_info = new MessageEmbed()
        .setTitle(`Message Information`)
        .addField(`🔗 Messsage Link`,`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
        .addField(`👑 Author`,`**${message.author.tag}**`)
        .addField(`❔ Is an Embed:`, is_an_embed)
        .addField(`❓ Has components:`, is_an_embed)
        .addField(`🆎 Type`, message.type)
        .addField(`📅 Sended at:`, date)
        .addField(`🆔 Message ID:`, `\`${message.id}\``)
        .addField(`🆔 Channel ID:`, `\`${message.channelId}\``)
        .addField(`🆔 Guild ID:`, `\`${message.guildId}\``)
        .setFooter({text: `Asked by: ${msg.member.displayName} • ${msg.guild.name}`, iconURL: msg.guild.iconURL()})
        .setColor("RANDOM")

        if (message.type == "APPLICATION_COMMAND" || message.type == "CONTEXT_MENU_COMMAND") {
            embed_info.addField(`🖲 Message command name:`,`\`${message.interaction.commandName}\`` || `:warning: Error message origin command is undefined`)
        }

        msg.channel.send({embeds: [embed_info]})
    }
    catch(e) {        
            let emb = new MessageEmbed()
            .setDescription(`❌ <@${interaction.member.id}> : The message id or link is incorrect`)
            .setColor("RED")
            
            message.channel.send({embeds: [emb]})
        }

};
    
module.exports.config = {
    name: 'messageinfo', // Command Name
    description: 'Send a detailed embed of the message information.', // Description
    usage: '+messageinfo <message link || message id>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['msginfo','infomessage'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}