const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { dependencies } = require("../../../../package.json");
const moment = require("moment");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const os = osu.os;
const drive = osu.drive;
const memory = osu.mem;
const fetch = require("node-fetch")

module.exports = async (bot, interaction, args) => {
    const bot_uptime = new Date().getTime() - Math.floor(bot.uptime);
    const date = Math.floor(Date.now() / 10);
    const websocket_ping = Math.floor(bot.ws.ping);
    const wait_embed = new MessageEmbed()
        .setColor("#5865f2")
        .setDescription(`<a:loading:1032282688821940245> | I'm gathering informations about myself. Please wait...`);
    interaction.followUp({ embeds: [wait_embed] }).then(async (process_message) => {

        const bot_ping = Math.floor(Date.now() / 10 - date);

        const token = "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"



        Promise.all([
            cpu.usage(),
            drive.info(),
            os.oos(),
            memory.info(),
            fetch(`https://api.github.com/repos/nounouthereal/Cherry-Blossom/commits?per_page=1`, { headers: { Authorization: `Bearer ${token}` } }),
        ])
            .then(([cpu_info, drive_info, os_info, memory_info, git]) => {
                return Promise.all(

                    [cpu_info, JSON.parse(JSON.stringify(drive_info)), os_info, memory_info, git.json()]
                );
            })
            .then(([cpu_info, drive_info, os_info, memory_info, git]) => {
                const embed = new MessageEmbed()
                    .setTitle(`<:Bot:993821529123070013> Generic Information`)
                    .setColor("#57c478")
                    .setThumbnail(
                        bot.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        })
                    )
                    .setDescription(`>>> **Bot created with ❤️ by [nounou#4483](https://discord.com/users/901071562386583596) in Morocco 🇲🇦**`)
                    .addField(`<:discord:1013896589061926922> Guild Count`, `>>> \`${bot.guilds.cache.size} guilds\``, true)
                    .addField(`<:member:1023155815785435227> Users Count`, `>>> \`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
                    .addField(`<:chat:995075584147345439> Channels Count`, `>>> \`${bot.channels.cache.size} channels\``, true)
                    .addField(`💽 Operating System`, `\`\`\`${os_info} (${os.platform().toUpperCase()} ${os.arch()})\`\`\``)
                    .addField(`📦 Tools`, `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``)
                    .addField(`🏓 Ping`, `\`\`\`Bot: ${Math.floor(websocket_ping + bot_ping)}ms | API: ${Math.floor(websocket_ping)}ms\`\`\``)
                    .addField(`<:CPU:1013512292954026065> CPU`, `\`\`\`${cpu.model()} (${cpu.count()} cores) [${cpu_info}% used]\`\`\``)
                    .addField(`<:drive:1013512253393358949> Drive`, `\`\`\`${drive_info.usedGb}GB/${drive_info.totalGb}GB (${drive_info.freePercentage}% free)\`\`\``)
                    .addField(`<:RAM:1013512014469021817> RAM Usage`, `\`\`\`Server: ${memory_info.usedMemMb.toFixed()}MB/${memory_info.totalMemMb.toFixed()}MB (${(100 - memory_info.freeMemPercentage).toFixed(2)}% used)\nClient: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${memory_info.totalMemMb.toFixed()}MB (${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / memory_info.totalMemMb.toFixed()).toFixed(2)}% used)\`\`\``)
                    .addField(`🕰 Date launched`, `>>> <t:${moment(bot_uptime).unix()}> (<t:${moment(bot_uptime).unix()}:R>)\n`)
                    if (!git.message.startsWith(`Bad`)) {
                        embed.addField(`🐙 Latest commit`, `>>> **Git:** *[${git[0].sha}](${git[0].html_url})*\n**Time:** <t:${moment(git[0].commit.committer.date).unix()}:D> (<t:${moment(git[0].commit.committer.date).unix()}:R>)`)
                    }
                    embed.setFooter({
                    text: `Debug • Bot • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setURL(`https://discord.gg/kU6FW2vt6v`)
                            .setEmoji("🆘")
                            .setLabel("Support")
                            .setStyle("LINK")
                    )
                    .addComponents(
                        new MessageButton()
                            .setURL(`https://discord.com/api/oauth2/authorize?client_id=944572861874602054&permissions=1644971949559&scope=bot`)
                            .setEmoji("<:Bot:932601118184325180>")
                            .setLabel("Invite me")
                            .setStyle("LINK")
                    );
                process_message.edit({ embeds: [embed], components: [row] });
            });
    });
};