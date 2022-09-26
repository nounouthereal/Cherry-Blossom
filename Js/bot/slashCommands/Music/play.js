const { MessageEmbed } = require('discord.js')
const {QueryType} = require('discord-player')




module.exports = {
    name: "play",
    description: "🎶 Music is the best",
    cooldown: 5,
    options: [
        {
            name: "song",
            type: "STRING",
            description: "🎶 The song you want to play | Supported url or research: youtube, soundcloud, spotify",
            required: true
        }
    ],
    run: async (bot, interaction, args) => {

        try {

            const song = await interaction.options.getString("song");

            const res = await bot.player.search(song, {
                requestedBy: interaction.member,
                searchEngine: QueryType.AUTO
            });


            if (!res || !res.tracks.length) {
                let wrongChannelEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Sorry, but no research can be found for \`${song}\``)
                    .setColor("RED")
                return interaction.followUp({ embeds: [wrongChannelEmb] })
            }


            const channel = interaction.member?.voice?.channel;

            if (!channel) {
                let noChannelEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You have to join a voice channel in *${interaction.guild.name}* first`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [noChannelEmb] })
            }
    
            else {
                if (!channel.viewable) {
                    let cannotSeeChannelEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : I need the \`VIEW_CHANNEL\` permission to play the song in <#${channel.id}>.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [cannotSeeChannelEmb] })
                }

                if (!channel.joinable) {
                    let perm1ChannelEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : I need the \`CONNECT_CHANNEL\` permission in <#${channel.id}>.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [perm1ChannelEmb] })
                }

                if (!channel.speakable) {
                    let perm2ChannelEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : I need the \`SPEAK\` permission in <#${channel.id}>.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [perm2ChannelEmb] })
                }

                if (channel.full) {
                    let fullChannelEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Ooops, cannot join seems like <#${channel.id}> is full`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [fullChannelEmb] })
                }
            }

            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading_please_wait:1014982234492633088> | Loading and searching for \`${song}\` song... 🎧. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            const queue = await bot.player.createQueue(interaction.guild, {
                metadata: channel,
                spotifyBridge: true,
                initialVolume: 75,
                leaveOnEnd: true
            })

            

            try {
                if (!queue.connection) {
                    await queue.connect(channel);
                }

            } catch (error) {
                bot.logger.error("JOIN", error);
                bot.player.deleteQueue(interaction.guild.id);
                let joinErr = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Sorry, I cannot join the channel <#${channel.id}> || (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [joinErr] })
            }

            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

            if (!queue.playing) await queue.play();

            console.log(res)

            
            const embed = new MessageEmbed()
                .setTitle(
                    `🎶 Currently playing`,
                    interaction.guild.iconURL({
                        dynamic: true,
                        format: "png",
                    })
                )
                .setDescription(`🎶 Currently playing [${res.tracks[0].title}](${res.tracks[0].url}) in <#${channel.id}>`)
                .addField(`🎼 Music name:`, `**${res.tracks[0].title}**`,true)
                .addField(`🎤 Author:`, `*${res.tracks[0].author}*`,true)
                .addField(`🕰 Duration:`, `\`${res.tracks[0].duration}\``,true)
                .addField(`👁‍🗨 Views:`, `\`${res.tracks[0].views.toLocaleString()}\``,true)
                .addField(`🔗 Music Link:`, `${res.tracks[0].url}`,true)
                .addField(`🔰 Type:`, `${res.tracks[0].playlist ? 'playlist' : 'track'.toUpperCase()}`,true)
                .setTimestamp()
                .setImage(res.tracks[0].thumbnail)
                .setFooter({
                    text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.member.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setColor("#57c478");
            interaction.editReply({embeds: [embed]})




        } catch (err) {
            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
}