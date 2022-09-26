

const { MessageEmbed } = require("discord.js");

module.exports = async (bot, interaction, args) => {
    const embed = new MessageEmbed()
        .setTitle(`🛠 ${bot.user.username} Debug`)
        .setDescription(`These are the bot premissions on this server. If <@${bot.user.id}> misses them some commands & functions will be disabled!`)
        .addField("Not required", `> \`ADMINISTRATOR\`: ${interaction.guild.me.permissions.has("ADMINISTRATOR") ? "✅" : "❌"}`)
        .addField(
            "Required",
            `
                > \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? "✅" : "❌"}
                > \`MANAGE_CHANNELS\`: ${interaction.guild.me.permissions.has("MANAGE_CHANNELS") ? "✅" : "❌"}
                > \`MANAGE_ROLES\`: ${interaction.guild.me.permissions.has("MANAGE_ROLES") ? "✅" : "❌"}
                > \`KICK_MEMBERS\`: ${interaction.guild.me.permissions.has("KICK_MEMBERS") ? "✅" : "❌"}
                > \`BAN_MEMBERS\`: ${interaction.guild.me.permissions.has("BAN_MEMBERS") ? "✅" : "❌"}
                > \`ADD_REACTIONS\`: ${interaction.guild.me.permissions.has("ADD_REACTIONS") ? "✅" : "❌"}
                > \`MANAGE_EMOJIS_AND_STICKERS\`: ${interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ? "✅" : "❌"}
                > \`VIEW_AUDIT_LOG\`: ${interaction.guild.me.permissions.has("VIEW_AUDIT_LOG") ? "✅" : "❌"}
                > \`SEND_MESSAGES\`: ${interaction.guild.me.permissions.has("SEND_MESSAGES") ? "✅" : "❌"}
                > \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? "✅" : "❌"}
                > \`EMBED_LINKS\`: ${interaction.guild.me.permissions.has("EMBED_LINKS") ? "✅" : "❌"}
                > \`ATTACH_FILES\`: ${interaction.guild.me.permissions.has("ATTACH_FILES") ? "✅" : "❌"}
                > \`USE_EXTERNAL_EMOJIS\`: ${interaction.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? "✅" : "❌"}
            `
        )
        .setTimestamp()
        .setColor("#57c478")
        .setThumbnail(
            bot.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 2048,
            })
        )
        .setFooter({
            text: `Asked by ${interaction.member.nickname}`,
            iconURL: interaction.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 2048,
            }),
        });
    interaction.followUp({ embeds: [embed] });
};