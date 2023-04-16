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

        let is_an_embed
        let has_component
    
        console.log(message.embeds[0].type)

        if (!message.embeds[0].type) {
            is_an_embed = '\`No\`'
        }

        else {
            is_an_embed = "\`Yes\`"
        }

        if (message.components == '[]' || message.components == '') {
            has_component = '\`No\`'
        }

        else {
            has_component = "\`Yes\`"
        }

        let date = `<t:${Math.round( message.createdTimestamp / 1000)}>`

        let embed_info = new MessageEmbed()
        .setTitle(`Message Information`)
        .addField(`🔗 Message Link`,`https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`)
        .addField(`👑 Author`,`<@${message.author.id}> [**${message.author.tag}**]`)
        .addField(`❔ Is an Embed:`, is_an_embed, true)
        .addField(`❓ Has components:`, is_an_embed, true)
        .addField(`🆎 Type`, "```" + message.type + "```")
        .addField(`📅 Sended at:`, date)
        .addField(`🆔 Message ID:`, `\`${message.id}\``)
        .addField(`🆔 Channel ID:`, `\`${message.channelId}\``, true)
        .addField(`🆔 Guild ID:`, `\`${message.guildId}\``, truea)
        .setFooter({text: `Asked by: ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
        .setColor("RANDOM")

        if (message.type == "APPLICATION_COMMAND" || message.type == "CONTEXT_MENU_COMMAND") {
            embed_info.addField(`🖲 Message command name:`,`\`${message.interaction.commandName}\`` || `:warning: Error message origin command is undefined`)
        }


        interaction.followUp({embeds: [embed_info]})

    }
}