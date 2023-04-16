const { ContextMenuInteraction } = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "Avatar",
    type: "USER",

    /**
     * @param {ContextMenuInteraction} interaction
    */

    run: async (bot, interaction, args) => {
        const user = await bot.users.fetch(interaction.targetId)


        let avatar_embed = new MessageEmbed()
        .setImage(user.displayAvatarURL({size:1024,dynamic:true}))
        .setTimestamp()
        .setFooter({text: `Asked by: ${interaction.member.nickname  || interaction.user.username} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
        .setColor("RANDOM")

        interaction.followUp({content: `<@${user.id}>'s [avatar](${user.displayAvatarURL()})` ,embeds: [avatar_embed]})

    }
}