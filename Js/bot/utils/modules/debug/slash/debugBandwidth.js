const { MessageEmbed } = require("discord.js");
const osu = require("node-os-utils");
const netstat = osu.netstat;

module.exports = async (bot, interaction, args) => {
    netstat.stats().then((stats) => {
        
        const test = stats.pop();
        const input = Math.round(test.inputBytes / 1024 / 1024 / 1024);
        const output = Math.round(test.outputBytes / 1024 / 1024 / 1024);

        const embed = new MessageEmbed()
            .setTitle(`📶 Debug bandwith`)
            .setColor("#57c478")
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
            .setDescription(`⬇️ In: \`${input}MB/s\` | ⬆️ Out: \`${output}MB/s\`\n\n> Websocket ping: \`${bot.ws.ping}ms\``)
            .setFooter({ text: `Debug • Bandwith • Asked by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) });
        interaction.followUp({ embeds: [embed] });
    });
};