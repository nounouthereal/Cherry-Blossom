const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "minecraft",
    description: "🌳 Display minecraft server info",
    cooldown: 5,
    container: true,
    options: [
        {
            name: "server_ip",
            description: "🆔 The IP of the server to get info about",
            required: true,
            type: "STRING",
        },
        {
            name: "bedrock",
            description: "🪨 Display bedrock info",
            required: false,
            type: "BOOLEAN",
            default: false,
        },
    ],
    run: async (bot, interaction, args) => {
        try {
            if (!args[0]) {
                let errEmb1 = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Please enter a minecraft server IP.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [errEmb1] })
            }
            if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:?[0-9]*)$/gim.test(args[0])) {
                let errEmb2 = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : I need a valid minecraft server IP.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [errEmb2] })
            }
            if (args[1] == true) {
                fetch(`https://api.mcsrvstat.us/bedrock/2/${args[0]}`)
                    .then((res) => res.json())
                    .then((body) => {
                        if (body.ip == "127.0.0.1" || !body.ip) {
                            let errEmb3 = new MessageEmbed()
                                .setDescription(`❌ <@${interaction.user.id}> : I can't found \`${args[0]}\` bedrock server\nTry \`(/minecraft <server_id> [bedrock=False])\``)
                                .setColor("RED")
                            return interaction.followUp({ embeds: [errEmb3] })
                        }
                        const embed = new MessageEmbed()
                            .setAuthor({ name: `${args[0]} (Bedrock)`, iconURL: `https://api.mcsrvstat.us/icon/${args[0]}` })
                            .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0]}`)
                            .setFooter({
                                text: `${args[0]} • Asked by ${interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true,
                                    format: "png",
                                    size: 2048,
                                }),
                            })
                            .setColor("#5865F2");
                        if (body.online.toString().length > 1) embed.addField(`${body.online ? "<:online:1013511963663421563>" : "<:dnd:1013512333118672916>"} ${body.online ? "Online" : "Offline"}`, `> \`${body.online ? "Online" : "Offline"}\``, true);
                        if (body.motd && body.motd.raw[0]) embed.setDescription(">>> " + body.motd.raw[0].replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", ""));
                        if (body.players && body.players.max && body.players.online) embed.addField(`<:member:1023155815785435227> Players`, `> \`${body.players.online}/${body.players.max}\``, true);
                        if (body.serverid) embed.addField(`🆔 Server ID`, `> \`${body.serverid}\``, true);
                        if (body.version) embed.addField(`🧿 Version(s)`, `> \`${body.version}\``, true);
                        interaction.followUp({ embeds: [embed] });
                    });
            } else {
                fetch(`https://api.minetools.eu/ping/${args[0].replace(":", "/")}`)
                    .then((res) => res.json())
                    .then((body) => {
                        if (body.error) {
                            let errEmb3 = new MessageEmbed()
                                .setDescription(`❌ <@${interaction.user.id}> : I can't found \`${args[0]}\` bedrock server\nTry \`(/minecraft <server_id> [bedrock=True])\``)
                                .setColor("RED")
                            return interaction.followUp({ embeds: [errEmb3] })
                        }

                        const embed = new MessageEmbed()
                            .setAuthor({ name: args[0], iconURL: `https://api.mcsrvstat.us/icon/${args[0].replace(":", "/")}` })
                            .setThumbnail(`https://api.mcsrvstat.us/icon/${args[0].replace(":", "/")}`)
                            .setColor("#5865F2")
                            .setTimestamp()
                            .setFooter({
                                text: `${args[0]} • Asked by ${interaction.user.nickname || interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true,
                                    format: "png",
                                    size: 2048,
                                }),
                            });
                        if (body.description) embed.setDescription(`>>> ${body.description && body.description.length > 1 ? body.description.replace(/§[0-9A-FK-OR]/gi, "").replaceAll("`", "") : "No description"}`);
                        if (body.players && body.players.max && body.players.online) embed.addField(`<:member:1023155815785435227> Players`, `> \`${body.players.online}/${body.players.max}\``, true);
                        if (body.latency) embed.addField(`<:online:1013511963663421563> Latency`, `> \`${body.latency}\``, true);
                        if (body.version && body.version.name) embed.addField(`🧿 Version(s)`, `> \`${body.version.name}\``, true);
                        interaction.followUp({ embeds: [embed] });
                    });
            }
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
    },
};