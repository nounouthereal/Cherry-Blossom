const { MessageEmbed } = require('discord.js')
const { ContextMenuInteraction } = require('discord.js')


module.exports = {
    name: "Message Info",
    type: "MESSAGE",

    /**
     * @param {ContextMenuInteraction} interaction
    */

    run: async (bot, interaction, args) => {

        const message = await interaction.channel.messages.fetch(interaction.targetId)

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
        .addField(`🔗 Messsage Link`,`https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`)
        .addField(`👑 Author`,`**${message.author.tag}**`)
        .addField(`❔ Is an Embed:`, is_an_embed)
        .addField(`❓ Has components:`, is_an_embed)
        .addField(`🆎 Type`, message.type)
        .addField(`📅 Sended at:`, date)
        .addField(`🆔 Message ID:`, `\`${message.id}\``)
        .addField(`🆔 Channel ID:`, `\`${message.channelId}\``)
        .addField(`🆔 Guild ID:`, `\`${message.guildId}\``)
        .setFooter({text: `Asked by: ${interaction.member.nickname} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
        .setColor("RANDOM")

        if (message.type == "APPLICATION_COMMAND" || message.type == "CONTEXT_MENU_COMMAND") {
            embed_info.addField(`🖲 Message command name:`,`\`${message.interaction.commandName}\`` || `:warning: Error message origin command is undefined`)
        }


        interaction.followUp({embeds: [embed_info]})

    }
}