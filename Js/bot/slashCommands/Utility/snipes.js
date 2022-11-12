const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Formatters } = require('discord.js')


module.exports = {
    name: "snipe",
    description: "📵 Snipe a deleted message",
    cooldown: 2,
    options: [
        {
            name: "channel",
            description: "🗂 The guild channel to snipe",
            type: "CHANNEL",
            channelTypes: ['GUILD_TEXT'],
            required: false,
        }
    ],

    run: async (bot, interaction, args) => {


        try {

            let channel = interaction.options.getChannel("channel")

            if(!channel) {
                channel = interaction.channel
            }

            const msg = bot.snipes.get(channel.id)


            if (msg == undefined) {
                let errEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : There was no message deleted recently in: <#${channel.id}>`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [errEmb] })
            }

            const embed = new MessageEmbed()
                .setAuthor(msg.author, msg.member.user.displayAvatarURL())
                .setDescription(Formatters.spoiler(msg.content) || "❌ Ooops cannot snipe someone")
                .setFooter({
                    text: `Get Snipe • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setColor("RANDOM")
                .setTimestamp();

            interaction.followUp({ embeds: [embed] })



        } catch (err) {
            console.log(err);
            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An undefined error occured\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
};