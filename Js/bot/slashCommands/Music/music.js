const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')





module.exports = {
    name: "music",
    description: "🎶 Music is better",
    cooldown: 5,
    options: [
        {
            name: "play",
            description: "🎶 Play a song",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "song",
                    type: "STRING",
                    description: "🎶 The song you want to play | Supported url or research: youtube, soundcloud, spotify, facebook",
                    required: true
                }
            ],
        },
        {
            name: "playnext",
            description: "🎼 Add a song to be played next",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "song",
                    type: "STRING",
                    description: "🎶 The song you want to add to your queue | Supported url or research: youtube, soundcloud etc...",
                    required: true
                }
            ],
        },
        {
            name: "pause",
            description: "⏸ Pause the track played right now",
            type: "SUB_COMMAND",
        },
        {
            name: "resume",
            description: "⏯ Resume the track paused right now",
            type: "SUB_COMMAND",
        },
        {
            name: "stop",
            description: "🛑 Stop the current queue",
            type: "SUB_COMMAND",
        },
        {
            name: "back",
            description: "⏮ Return to the previous played track",
            type: "SUB_COMMAND",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            if (args[0] == "play") {

                const song = await interaction.options.getString("song");

                const res = await bot.player.search(song, {
                    requestedBy: interaction.member,
                    searchEngine: QueryType.AUTO
                });


                if (!res || !res.tracks.length) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but no research can be found for \`${song}\``)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
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

                const queue = await bot.player.createQueue(interaction.guild, {
                    metadata: channel,
                    spotifyBridge: true,
                    initialVolume: 75,
                    leaveOnEnd: true
                })

                if (queue.playing) {
                    let playing = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Seems like we are already playing [${queue.current.title}](${queue.current.url}) in <#${queue.metadata.id}>. **Try** \`/playnext\` **command to add a song in your queue**.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [playing] })
                }

                const wait_embed = new MessageEmbed()
                    .setDescription(`<a:loading_please_wait:1014982234492633088> | Loading and searching for \`${song}\` song... 🎧. Please wait...`)
                    .setColor("5865f2");

                interaction.followUp({ embeds: [wait_embed] })



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

                const embed = new MessageEmbed()
                    .setTitle(
                        `🎶 Currently playing`,
                        interaction.guild.iconURL({
                            dynamic: true,
                            format: "png",
                        })
                    )
                    .setDescription(`🎶 Currently playing [${res.tracks[0].title}](${res.tracks[0].url}) in <#${channel.id}>`)
                    .addField(`🎼 Music name:`, `**${res.tracks[0].title}**`, true)
                    .addField(`🎤 Author:`, `*${res.tracks[0].author}*`, true)
                    .addField(`🕰 Duration:`, `\`${res.tracks[0].duration}\``, true)
                    .addField(`👁‍🗨 Views:`, `\`${res.tracks[0].views.toLocaleString()}\``, true)
                    .addField(`🔗 Music Link:`, `${res.tracks[0].url}`, true)
                    .addField(`🔰 Type:`, `${res.tracks[0].playlist ? 'playlist' : 'track'.toUpperCase()}`, true)
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
                interaction.editReply({ embeds: [embed] })




            }


            if (args[0] == "pause") {

                const queue = bot.player.getQueue(interaction.guild.id);

                if (!queue) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but there is no song played right now in *${interaction.guild.name}*.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }

                if (queue.connection.paused) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but ${queue.current.title} is already paused`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }

                const success = queue.setPaused(true);



                const embed = new MessageEmbed()
                    .setTitle(
                        `⏸ Song has been paused`,
                        interaction.guild.iconURL({
                            dynamic: true,
                            format: "png",
                        })
                    )
                    .setDescription(`Currently paused : [${queue.current.title}](${queue.current.url}) in <#${queue.metadata?.id}> ✅`)
                    .setFooter({
                        text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.member.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setColor("#57c478")
                    .setTimestamp();
                interaction.followUp({ embeds: [embed] })


            }

            if (args[0] == "resume") {

                const queue = bot.player.getQueue(interaction.guild.id);

                if (!queue) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but there is no song played right now in *${interaction.guild.name}*.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }

                if (!queue.connection.paused) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but ${queue.current.title} is already running`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }

                queue.setPaused(false);



                const embed = new MessageEmbed()
                    .setTitle(
                        `⏯ Song has been resumed`,
                        interaction.guild.iconURL({
                            dynamic: true,
                            format: "png",
                        })
                    )
                    .setDescription(`Currently resumed : [${queue.current.title}](${queue.current.url}) in <#${queue.metadata?.id}> ✅`)
                    .setFooter({
                        text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.member.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setColor("#57c478")
                    .setTimestamp();
                interaction.followUp({ embeds: [embed] })

            }

            if (args[0] == "stop") {

                const queue = bot.player.getQueue(interaction.guild.id);

                if (!queue) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but there is no song played right now in *${interaction.guild.name}*.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }


                const embed = new MessageEmbed()
                    .setTitle(
                        `🛑 Song has been stopped`,
                        interaction.guild.iconURL({
                            dynamic: true,
                            format: "png",
                        })
                    )
                    .setDescription(`Currently stopped : [${queue.current.title}](${queue.current.url}) in <#${queue.metadata?.id}> ✅`)
                    .setFooter({
                        text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.member.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setColor("#57c478")
                    .setTimestamp();
                interaction.followUp({ embeds: [embed] })

                queue.destroy();


            }

            if (args[0] == "back") {

                const queue = bot.player.getQueue(interaction.guild.id);

                if (!queue || !queue.playing) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but there is no song played right now in *${interaction.guild.name}*.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }




                if (!queue?.previousTracks[1]) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but there was no music played before [${queue.tracks[0].title}](${queue.tracks[0].url}).`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }



                const wait_embed = new MessageEmbed()
                    .setDescription(`<a:loading_please_wait:1014982234492633088> | Loading the previous song... 🎧. Please wait...`)
                    .setColor("5865f2");

                interaction.followUp({ embeds: [wait_embed] })

                const embed = new MessageEmbed()
                    .setTitle(
                        `🎶 Replaying the previous song`,
                        interaction.guild.iconURL({
                            dynamic: true,
                            format: "png",
                        })
                    )
                    .setDescription(`🎶 Currently **re**playing [${queue.previousTracks[1].title}](${queue.previousTracks[1].url}) in <#${queue.metadata.id}>`)
                    .addField(`🎼 Music name:`, `**${queue.previousTracks[1].title}**`, true)
                    .addField(`🎤 Author:`, `*${queue.previousTracks[1].author}*`, true)
                    .addField(`🕰 Duration:`, `\`${queue.previousTracks[1].duration}\``, true)
                    .addField(`👁‍🗨 Views:`, `\`${queue.previousTracks[1].views.toLocaleString()}\``, true)
                    .addField(`🔗 Music Link:`, `${queue.previousTracks[1].url}`, true)
                    .addField(`🔰 Type:`, `${queue.previousTracks[1].playlist ? 'playlist' : 'track'.toUpperCase()}`, true)
                    .setTimestamp()
                    .setImage(queue.previousTracks[1].thumbnail)
                    .setFooter({
                        text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.member.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setColor("#57c478");
                interaction.editReply({ embeds: [embed] })

                queue.back()

            }

            if (args[0] == "playnext") {

                const song = await interaction.options.getString("song");

                const res = await bot.player.search(song, {
                    requestedBy: interaction.member,
                    searchEngine: QueryType.AUTO
                });


                if (!res || !res.tracks.length) {
                    let errEmbed = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Sorry, but no research can be found for \`${song}\``)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmbed] })
                }


                const queue = bot.player.getQueue(interaction.guild.id);


                if (!queue.playing) {
                    let playing = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Seems like no song is played. *Try* \`/play\` *command to play a song.*.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [playing] })
                }

                if (queue.playlist) {
                    let playing = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : This command does not support playlist. *Try* \`/play\` *command to play a playlis.*.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [playing] })
                }

                const wait_embed = new MessageEmbed()
                    .setDescription(`<a:loading_please_wait:1014982234492633088> | Loading and searching for \`${song}\` song... 🎧. Please wait...`)
                    .setColor("5865f2");

                interaction.followUp({ embeds: [wait_embed] })

                res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

                if (!queue.playing) await queue.play();

                const embed = new MessageEmbed()
                    .setTitle(
                        `🎶 Added to queue`,
                        interaction.guild.iconURL({
                            dynamic: true,
                            format: "png",
                        })
                    )
                    .setDescription(`🎶 Added to queue [${res.tracks[0].title}](${res.tracks[0].url}) in <#${queue.metadata?.id}>`)
                    .addField(`🎼 Music name:`, `**${res.tracks[0].title}**`, true)
                    .addField(`🎤 Author:`, `*${res.tracks[0].author}*`, true)
                    .addField(`🕰 Duration:`, `\`${res.tracks[0].duration}\``, true)
                    .addField(`👁‍🗨 Views:`, `\`${res.tracks[0].views.toLocaleString()}\``, true)
                    .addField(`🔗 Music Link:`, `${res.tracks[0].url}`, true)
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
                interaction.editReply({ embeds: [embed] })


                queue.insert(res.tracks[0], 0)

            }




        } catch (err) {
            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error while playing music occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
}