const { MessageEmbed, MessageActionRow, MessageButton, UserFlags } = require("discord.js");
const { version: discordjsVersion } = require('discord.js')
const nodeVersion = process.version.match(/^v(\d+\.\d+)/)[1];
const osu = require("node-os-utils");
const moment = require("moment");
const { Permissions } = require('discord.js');
const emojiAPI = require("emoji-api");
const converter = require('discord-emoji-converter')

const cpu = osu.cpu;
const os = osu.os;
const drive = osu.drive;
const memory = osu.mem;

module.exports = {
    name: "info",
    description: "ℹ️ Informations Category",
    cooldown: 5,
    options: [
        {
            name: "ban",
            description: "🔨 Give you informations about an user ban",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "👤 The user id or username",
                    type: "STRING",
                    required: true,
                }
            ],
        },
        {
            name: "bot",
            description: "🌸 Give you informations about me",
            type: "SUB_COMMAND",
        },
        {
            name: "channel",
            description: "🏠 Give you informations about a server channel",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "🏠 The channel you want informations from",
                    type: "CHANNEL",
                    required: false,
                },
            ]
        },
        {
            name: "emoji",
            description: "😃 Give you informations about an emoji",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "emoji",
                    description: "😆 The emoji you want informations from",
                    type: "STRING",
                    required: true,
                },
            ]
        },
        {
            name: "invite",
            description: "📬 Give you informations about an user",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "invite",
                    description: "📧 The invite (URL or Code) you want informations from",
                    type: "STRING",
                    required: true,
                }
            ],
        },
        {
            name: "message",
            description: "📩 Give you informations about a message",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "link",
                    description: "🔗 The message link you want informations from",
                    type: "STRING",
                    required: true,
                }
            ],
        },
        {
            name: "role",
            description: "🎭 Give you informations about a role",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "role",
                    description: "🎭 The role you want informations from",
                    type: "ROLE",
                    required: true,
                },
            ]
        },
        {
            name: "server",
            description: "🎖 Give you informations about the server",
            type: "SUB_COMMAND",
        },
        {
            name: "user",
            description: "🗣 Give you informations about an user",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "👤 The user you want informations from",
                    type: "USER",
                    required: true,
                },
            ]
        },
    ],

    run: async (bot, interaction, args) => {


        try {

            const subCom = interaction.options.getSubcommand();
            const user = interaction.options.getUser("user");
            let channel = interaction.options.getChannel("channel");
            const role = interaction.options.getRole("role");
            let moji = interaction.options.getString("emoji");
            const notFetchedInvite = interaction.options.getString("invite");
            let messageBrut = interaction.options.getString("link");

            if (subCom == "ban") {

                interaction.followUp({ content: "🚧 Under work" })
                return

                const bannedMembers = await interaction.guild.bans.fetch({ cache: false });
                console.log(bannedMembers)
                const bannedUsers = await Promise.all(bannedMembers
                    .map((member) => bot.users.fetch(member.user))
                );

                let bannedUser = bannedUsers.find((lookedUser) => {
                    if (lookedUser.tag.toLowerCase() == user.toLowerCase() || lookedUser.id.toLowerCase() == user.toLowerCase() || lookedUser.username.toLowerCase() == user.toLowerCase()) {
                        return true;
                    }
                })

                console.log(bannedUser)
                const em = new MessageEmbed()
                    .setColor(interaction.guild.me.displayHexColor)
                //em.setAuthor()

            }

            if (subCom == "bot") {


                const botUptime = new Date().getTime() - Math.floor(bot.uptime);


                Promise.all([
                    // Prettier
                    cpu.usage(),
                    drive.info(),
                    os.oos(),
                    memory.info(),
                ])
                    .then(([cpu_info, drive_info, os_info, memory_info]) => {
                        return Promise.all(
                            // Prettier
                            [cpu_info, JSON.parse(JSON.stringify(drive_info)), os_info, memory_info]
                        );
                    })
                    .then(([cpu_info, drive_info, os_info, memory_info]) => {

                        const serversembed = new MessageEmbed()
                            .setTitle(`📝 Informations on ${bot.user.username}`)
                            .setThumbnail(bot.user.displayAvatarURL())
                            .addField(`<:Bot:932601118184325180> | Certified:`, `❎ No`, true)
                            .addField(`📡 | I am active on:`, `\`${bot.guilds.cache.size} servers\``, true)
                            .addField("🏓 | I have a ping of:", "`" + Math.round(bot.ws.ping) + "ms\`", true)
                            .addField("📋 | My Name is:", `**${bot.user.username}**`, true)
                            .addField("🔗 | My Tag is:", "**#" + `${bot.user.discriminator}**`, true)
                            .addField("📊 | Number of Users :", `\`${bot.users.cache.size} users\``, true)
                            .addField("🛠 | My version :", `__${bot.version}__`, true)
                            .addField("🔧 | My version of discord.js :", `__${discordjsVersion}__`, true)
                            .addField("🔨 | My version of node.js :", "__" + nodeVersion + "__", true)
                            .addField(`🕰 | Date launched:`, `>>> <t:${moment(botUptime).unix()}> (<t:${moment(botUptime).unix()}:R>)\n`)
                            .addField(`<:CPU:1013512292954026065> | CPU:`, `\`\`\`${cpu.model()} (${cpu.count()} cores) [${cpu_info}% used]\`\`\``)
                            .addField(`<:drive:1013512253393358949> | Drive:`, `\`\`\`${drive_info.usedGb}GB/${drive_info.totalGb}GB (${drive_info.freePercentage}% free)\`\`\``)
                            .addField(`<:RAM:1013512014469021817> | RAM Usage:`, `\`\`\`Server: ${memory_info.usedMemMb.toFixed()}MB/${memory_info.totalMemMb.toFixed()}MB (${(100 - memory_info.freeMemPercentage).toFixed(2)}% used)\nClient: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${memory_info.totalMemMb.toFixed()}MB (${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / memory_info.totalMemMb.toFixed()).toFixed(2)}% used)\`\`\``)
                            .addField("💾 | Memory:", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + " MB Used\`", true)
                            .addField("<:DEV:1058731359817973841> | Devs:", "**nounou#4483**", true)
                            .setFooter(`Bot Info • Asked by ${interaction.member.nickname || interaction.user.username}`, bot.user.displayAvatarURL())

                            .setColor("RANDOM")
                            .setThumbnail(bot.user.avatarURL)
                            .setTimestamp()
                        interaction.followUp({ embeds: [serversembed] });

                    })

            }

            if (subCom == "channel") {

                if(!channel) channel = interaction.channel

                let channelType = channel.type;

                const regions = {
                    brazil: '🇧🇷 Brazil',
                    europe: '🇪🇺 Europe',
                    hongkong: '🇭🇰 Hong Kong',
                    india: '🇮🇳 India',
                    japan: '🇯🇵 Japan',
                    russia: '🇷🇺 Russia',
                    singapore: '🇸🇬 Singapore',
                    southafrica: '🇿🇦 South Africa',
                    africa: '🌍 Africa',
                    'us-central': 'US Central',
                    'us-east': 'US East',
                    'us-west': 'US West',
                    'us-south': 'US South'
                }

                const status = {
                    false: "\`No\`",
                    true: "\`Yes\`"
                }

                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`📝 Informations for ${channel.name}`)
                embed.setThumbnail(interaction.guild.iconURL())

                let channelMention = `<#${channel.id}>`

                if (channel.type == "GUILD_CATEGORY") channelMention = `(\`${channel.id}\`)`

                embed.addField("🏠 Channel:", `${channelMention} [**${channel.name}**]`, true)

                if (channel.type != "GUILD_CATEGORY" && channel.type != "GUILD_PUBLIC_THREAD") {
                    const category = interaction.guild.channels.cache.find(c => c == channel.parentId)
                    if (category != undefined || category != null) embed.addField("🗄 Channel Category:", "```" + category.name + ` (ID: ${category.id})\`\`\``);
                }

                if (channel.type == "GUILD_PUBLIC_THREAD" || channel.type == "GUILD_PRIVATE_THREAD") {
                    const parent = interaction.guild.channels.cache.find(c => c == channel.parentId)
                    embed.addField("🗃 Parent Channel:", "```" + parent.name + "```" + ` (\`${parent.id}\`)`)
                    const category = interaction.guild.channels.cache.find(c => c == parent.id)
                    embed.addField("🗄 Channel Category:", "```" + category.name + "```" + ` (\`${category.id}\`)`)
                }

                embed.addField("🆔 Channel ID:", `\`${channel.id}\``, false)

                if (channel.type == "GUILD_TEXT") {

                    let slowmode = "`" + channel.rateLimitPerUser + "s`"

                    if (slowmode == 0) {
                        slowmode = ":warning: No slowmode (0 seconds)"
                    }

                    const threads = interaction.guild.channels.cache.filter(x => x.isThread() && x.parentId == channel.id).size;
                    embed.addField("🐢 Slowmode:", slowmode)
                    embed.addField("🔞 NSFW:", `${status[channel.nsfw]}`)
                    embed.addField("📋 Topic:", `*${channel.topic || ":warning: No topic"}*`)
                    embed.addField("🏘 Threads:", `\`${threads} threads\``)

                    channelType = "Text Channel [GUILD_TEXT]"
                }



                if (channel.type == "GUILD_VOICE") {

                    let membersConnected = channel.members?.map(m => "<@" + m.user.id + ">")?.join("|");

                    if (!membersConnected || membersConnected.length < 1) {

                        membersConnected = ":warning: No user is connected in this channel"
                    }


                    if (membersConnected.length > 983) {

                        membersConnected = membersConnected.substring(0, 983) + `and more...`
                    }

                    let userLimit = "`" + channel.userLimit + " users`"

                    if (channel.userLimit == 0) {
                        userLimit = ":warning: No user Limit"
                    }

                    embed.addField("📟 Bitrate:", `\`${Math.round(channel.bitrate / 1000)} kbps\``, true)
                    embed.addField("🚷 User Limit:", userLimit, true)
                    embed.addField(`🟢 Users Connected[${channel.members?.size}]:`, membersConnected, true)
                    embed.addField("🌍 Region:", `**${regions[channel.rtcRegion] || ":warning: No region"}**`, true)

                    channelType = "Voice Channel [GUILD_VOICE]"
                }


                if (channel.type == "GUILD_STAGE_VOICE") {
                    let membersConnected = channel.members?.map(m => "<@" + m.user.id + ">")?.join("|");

                    if (!membersConnected || membersConnected.length < 1) {

                        membersConnected = ":warning: No user is connected in this channel"
                    }


                    if (membersConnected.length > 983) {

                        membersConnected = membersConnected.substring(0, 983) + `and more...`
                    }

                    embed.addField(`🟢 Users Connected[${channel.members?.size}]:`, membersConnected)
                    embed.addField("🌍 Region:", `**${regions[channel.rtcRegion] || ":warning: No region"}**`)

                    channelType = "Stage Channel [GUILD_STAGE_VOICE]"
                }

                if (channel.type == "GUILD_PUBLIC_THREAD") {

                    let membersConnected = channel.members?.map(m => "<@" + m.user.id + ">")?.join("|");

                    if (!membersConnected || membersConnected.length < 1) {

                        membersConnected = ":warning: No user is connected in this channel"
                    }


                    if (membersConnected.length > 983) {

                        membersConnected = membersConnected.substring(0, 983) + `and more...`
                    }

                    let slowmode = "`" + channel.rateLimitPerUser + "s`"

                    if (slowmode == 0) {
                        slowmode = ":warning: No slowmode (0 seconds)"
                    }

                    let private = status[true]

                    if (channel.type == "GUILD_PRIVATE_THREAD") private = status[true]

                    const owner = bot.users.cache.get(channel.ownerId)

                    embed.addField("👑 Owner:", `<@${channel.ownerId}> (\`${channel.ownerId}\`) [**${owner.tag}**]`, true)
                    embed.addField("🐢 Slowmode:", slowmode, true)
                    embed.addField("🔖 Messages:", `\`${channel.messageCount}\``, true)
                    embed.addField(`👥 Thread Members[${channel.members?.size}]:`, membersConnected, true)
                    embed.addField(`🔒 Locked:`, status[channel.locked], true)
                    embed.addField(`📇 Archived:`, status[channel.archived], true)
                    embed.addField(`🕰 Archive Duration:`, `\`${channel.autoArchiveDuration}\``, true)
                    embed.addField(`🔑 Private:`, private, true)


                    channelType = "Public Thread [GUILD_PUBLIC_THREAD]"
                }

                if (channel.type == "GUILD_CATEGORY") {

                    embed.addField(`🏘 Channels:`, `\`${channel.children.size} channels\``, true)


                    channelType = "Category [GUILD_CATEGORY]"
                }

                if (channel.type == "GUILD_NEWS") {

                    const threads = interaction.guild.channels.cache.filter(x => x.isThread() && x.parentId == channel.id).size;
                    embed.addField("🔞 NSFW:", `${status[channel.nsfw]}`)
                    embed.addField("📋 Topic:", `*${channel.topic || ":warning: No topic"}*`)
                    embed.addField("🏘 Threads:", `\`${threads} threads\``)


                    channelType = "News/Announcment Channel [GUILD_NEWS]"
                }

                embed.addField("💾 Channel Type:", `\`${channelType}\``, true)
                embed.addField("📅 Creation date:", `<t:${Math.round(channel.createdTimestamp / 1000 || channel._createdTimestamp / 1000)}>`, true)
                embed.setFooter({
                    text: `Channel Info • Asked by ${interaction.member.nickname || interaction.user.username}`,
                });


                interaction.followUp({ embeds: [embed] })

            }

            if (subCom == "emoji") {

                const status = {
                    false: "\`No\`",
                    true: "\`Yes\`"
                }

                const regex = /\p{Extended_Pictographic}/ug


                const emoji = interaction.guild.emojis.cache.find((emoji) => (emoji.name).toLowerCase() == moji.toLowerCase() || emoji.id == moji || moji.includes(emoji.name) || moji.includes(emoji.id))


                if (!emoji) {

                    try {

                        let emojiValue

                        if (moji.match(regex)) {
                            emojiValue = converter.getShortcode(moji)
                        }

                        else {
                            emojiValue = moji
                            moji = converter.getEmoji(moji)
                        }


                        const emo = emojiAPI.get(moji);
                        const data = emo._data

                        let link = emo.twemoji()

                        const embed = new MessageEmbed()
                        embed.setAuthor(`Emoji Info for ${emo.formattedName}`, link)
                        embed.setColor("RANDOM")
                        embed.setDescription(":warning: This emoji is a basic discord emoji.")
                        embed.setThumbnail(link)
                        embed.addField("😀 Emoji:", `${moji} (**${emo.formattedName}**)`)
                        embed.addField(`🏷 Discord Name:`, `\`${emojiValue}\``)
                        embed.addField(`Ⓜ️ Emoji URL:`, `__${link}__`)
                        embed.addField("*️⃣ Unicode:", `\`${data.codepoints}\``)
                        embed.addField("🗄 Group:", `${data.group}`, true)
                        embed.addField("❔ Require Colons:", status[true], true)
                        embed.setImage(link)
                        embed.setFooter({
                            text: `Emoji Info • Asked by ${interaction.member.nickname || interaction.user.username}`,
                            iconURL: link
                        });

                        interaction.followUp({ embeds: [embed] })

                        return

                    }
                    catch (e) {
                        let errEmb = new MessageEmbed()
                            .setDescription(`❌ <@${interaction.user.id}> : Cannot find an emoji named: \`${moji}\`.`)
                            .setColor("RED")
                        return interaction.followUp({ embeds: [errEmb] })
                    }
                }

                let linkPre = `https://cdn.discordapp.com/emojis/${emoji.id}`

                let link;

                let animatedAdd = ""

                if (emoji.animated) {
                    animatedAdd = "a"

                    link = linkPre + ".gif"
                }

                else link = linkPre + ".png"

                const embed = new MessageEmbed()
                embed.setAuthor(`Emoji Info for ${emoji.name}`, link)
                embed.setColor("RANDOM")
                embed.setThumbnail(link)
                embed.addField("😀 Emoji:", `<${animatedAdd}:${emoji.name}:${emoji.id}> \`<${animatedAdd}:${emoji.name}:${emoji.id}>\``)
                embed.addField(`🏷 Name:`, `${emoji.name}`)
                embed.addField(`Ⓜ️ Emoji URL:`, `__${link}__`)
                embed.addField("🆔 ID :", `\`${emoji.id}\``)
                embed.addField("👮 Creator:", `\`${emoji.author || "❌ Ooops, cannot find author"}\``)
                embed.addField("📺 Animated:", status[emoji.animated], true)
                embed.addField("❔ Require Colons:", status[emoji.requiresColons], true)
                embed.addField("💻 Twitch Managed:", status[emoji.managed], true)
                embed.addField("🗓 Created At:", `<t:${Math.round(emoji.createdTimestamp / 1000)}>`, true)
                embed.setImage(link)
                embed.setFooter({
                    text: `Emoji Info • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });

                interaction.followUp({ embeds: [embed] })

            }

            if (subCom == "invite") {

                const status = {
                    false: "\`No\`",
                    true: "\`Yes\`"
                }

                const invite = await interaction.guild.invites.fetch().then(invites => invites.find((invite) => (invite.url).toLowerCase() == notFetchedInvite.toLowerCase() || invite.code == notFetchedInvite || notFetchedInvite.includes(invite.url) || notFetchedInvite.includes(invite.code)));

                if (!invite) {
                    let errEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Cannot track/find an invite named: \`${notFetchedInvite}\``)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb] })
                }

                const embed = new MessageEmbed()
                embed.setAuthor(`Invite Informations for ${invite.url}`, interaction.guild.iconURL())
                embed.setColor("RANDOM")
                embed.addField("📨 Invite URL:", `__${invite.url}__`)
                embed.addField(`🔐 Invite Code:`, `\`${invite.code}\``, true)
                embed.addField(`📩 Uses:`, `\`${invite.uses} uses\``, true)
                embed.addField(`🔐 Max Uses:`, `\`${invite.maxUses} max uses\``, true)
                embed.addField("🏘 Invite Server:", `**${invite.guild.name}** (\`${invite.guild.id}\`)`, false)
                embed.addField("🏠 Invite Channel:", `**${invite.channel.name}** (\`${invite.channelId}\`)`, false)
                embed.addField("👤 Inviter (Author):", `**${invite.inviter.tag}** (\`${invite.inviter.id}\`) [__Is Bot:__ ${status[invite.inviter.bot]}]`, false)
                embed.addField("⏳ Temporary:", status[invite.temporary], true)
                embed.addField("👴 Max Age:", `\`${invite.maxAge}s\` \`[${invite.maxAge / 60 / 60}h]\``, true)
                embed.addField("🎬 Expires The:", `<t:${Math.round(invite._expiresTimestamp / 1000)}>`, true)
                embed.addField("🗓 Created At:", `<t:${Math.round(invite.createdTimestamp / 1000)}>`, true)
                embed.setFooter({
                    text: `Invite Info • Asked by ${interaction.member.nickname || interaction.user.username}`,
                });

                interaction.followUp({ embeds: [embed] })

            }

            if (subCom == "message") {

                if (!messageBrut.startsWith(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)) {
                    let emb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.member.id}> : The link needs to be a discord message link`)
                        .setColor("RED")

                    return interaction.followUp({ embeds: [emb] })
                }

                else if (messageBrut.startsWith(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)) {
                    messageBrut = messageBrut.split('/')
                    messageBrut = messageBrut[6]
                }

                const message = await interaction.channel.messages.fetch(messageBrut)

                if (!message) {

                    let emb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.member.id}> : Seems like \`${messageBrut}\` is not a correct link`)
                        .setColor("RED")

                    return interaction.followUp({ embeds: [emb] })
                }

                let is_an_embed
                let has_component

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

                let embed_info = new MessageEmbed()
                    .setAuthor(`Message Informations for ${messageBrut}`, interaction.guild.iconURL())
                    .addField(`🔗 Message link:`, `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`)
                    .addField(`👑 Author:`, `<@${message.author.id}> [**${message.author.tag}**]`)
                    .addField(`❔ Is an Embed:`, is_an_embed, true)
                    .addField(`❓ Has components:`, has_component, true)
                    .addField(`🆎 Type:`, message.type, true)
                    .addField(`📅 Sended the:`, `<t:${Math.round(message.createdTimestamp / 1000)}>`, true)
                    .addField(`🆔 Message ID:`, `\`${message.id}\``, false)
                    .addField(`🆔 Channel ID:`, `\`${message.channelId}\``)
                    .addField(`🆔 Guild ID:`, `\`${message.guildId}\``)
                    .setFooter({ text: `Asked by: ${interaction.member.nickname} • ${interaction.guild.name}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setColor("RANDOM")

                if (message.type == "APPLICATION_COMMAND" || message.type == "CONTEXT_MENU_COMMAND") {
                    embed_info.addField(`🖲 Message command name:`, `\`${message.interaction.commandName}\`` || `:warning: Error message origin command is undefined`)
                }


                interaction.followUp({ embeds: [embed_info] })

            }

            if (subCom == "role") {



                let membersWithRole = interaction.guild.roles.cache.get(role.id).members.map(m => "<@" + m.user.id + ">").join("|");

                if (!membersWithRole || membersWithRole.length < 1) {

                    membersWithRole = ":warning: No member have this role"
                }


                if (membersWithRole.length > 983) {

                    membersWithRole = membersWithRole.substring(0, 983) + `and more...`
                }

                const status = {
                    false: "\`No\`",
                    true: "\`Yes\`"
                }

                const rolePermissions = role.permissions;

                let permissions = new Permissions(rolePermissions.bitfield).toArray()


                const em = new MessageEmbed()
                em.setAuthor(`Role Informations for: ${role.name}`)
                em.setColor(role.color)
                em.setThumbnail(role.iconURL() || "https://media.tenor.com/OyUVgQi-l-QAAAAC/404.gi")
                em.addField(`👤 Members[${role.members.size}]:`, membersWithRole, false)
                em.addField(`📋 Name:`, "**" + role.name + "**", true)
                em.addField('🆔 ID:', `\`${role.id}\``, true)
                em.addField("＠ Mentionnable:", status[role.mentionable], true)
                em.addField("🎖 Hoist", status[role.hoist], true)
                em.addField("📊 Position:", `\`${role.position} of ${interaction.guild.roles.cache.size}\``, true)
                em.addField("📌 Managed:", status[role.managed], true)
                em.addField("Ⓜ️ Icon:", `__${role.iconURL() || ":warning: No icon"}__`, true)
                em.addField("🛂 Permissions:", `\`${permissions.join(" || ")}\``, false)
                em.addField("🎨 Color:", `__${role.hexColor == "#000000" ? role.hexColor = "Default (#000000)" : role.hexColor = role.hexColor}__ \`(More info by /color color:${role.hexColor})\``, true)
                em.addField('📅 Created on:', `<t:${Math.round(role.createdTimestamp / 1000)}>`, true)
                em.setTimestamp()
                em.setFooter({
                    text: `Role Info • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: role.iconURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });

                interaction.followUp({ embeds: [em] })

            }

            if (subCom == "server") {

                const regions = {
                    brazil: '🇧🇷 Brazil',
                    europe: '🇪🇺 Europe',
                    hongkong: '🇭🇰 Hong Kong',
                    india: '🇮🇳 India',
                    japan: '🇯🇵 Japan',
                    russia: '🇷🇺 Russia',
                    singapore: '🇸🇬 Singapore',
                    southafrica: '🇿🇦 South Africa',
                    africa: '🌍 Africa',
                    'us-central': 'US Central',
                    'us-east': 'US East',
                    'us-west': 'US West',
                    'us-south': 'US South'
                }

                let server_name = interaction.guild.name
                let owner = await interaction.guild.fetchOwner()
                let description = `\`` + interaction.guild.description + `\``
                let id = interaction.guild.id
                let region = regions[interaction.guild.region]
                let botCount = interaction.guild.members.cache.filter(member => member.user.bot).size
                let memberCount = interaction.guild.members.cache.filter(member => !member.user.bot).size
                let icon = interaction.guild.iconURL({ dynamic: true })
                let total_roles = interaction.guild.roles.cache.size
                let total_boosts = interaction.guild.premiumSubscriptionCount
                let boost_level = interaction.guild.premiumTier
                const voiceChannelCount = interaction.guild.channels.cache.filter(c => c.type == 'GUILD_VOICE').size;
                const ChannelCount = interaction.guild.channels.cache.size;
                const total_categories = interaction.guild.channels.cache.filter(ch => ch.type == 'GUILD_CATEGORY').size
                const textChannelCount = interaction.guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').size;
                let rolemap = interaction.guild.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(r => r)
                    .join("|");

                if (rolemap.length > 983) {

                    rolemap = rolemap.substring(0, 983) + ` and more...`
                }
                //if (rolemap.length > 1024) rolemap = ":warning: Il y a trop de roles à afficher";
                if (total_roles < 1) rolemap = ":warning:" + "\`No role\`";
                const emojis = interaction.guild.emojis.cache.size

                const embed = new MessageEmbed()


                let membersWithRole = interaction.guild.emojis.cache
                    .map((e) => `${e}`)
                    .join('|');

                if (membersWithRole.length > 983) {

                    membersWithRole = membersWithRole.substring(0, 983) + `and more...`
                }

                if (!interaction.guild.banner) {
                    banner = ":warning: The server doesn't have any banner"
                }
                else {
                    banner = interaction.guild.banner
                }

                if (!interaction.guild.description) {
                    description = ':warning: Server has no description'
                }

                if (region == 'deprecated' || region == undefined) {
                    region = ":warning:" + 'Server region is unknown'
                }

                serv = interaction.guild


                if (serv.explicitContentFilter == `DISABLED`) {
                    var eFC = "🟢 Disabled (Does not verify any interaction)";
                } else {
                    var eFC = serv.explicitContentFilter;
                }
                if (serv.explicitContentFilter == `MEMBERS_WITHOUT_ROLES`) {
                    var eFC = "🟡 Medium (Checks interactions of members without roles)";
                } else {
                    var eFC = serv.explicitContentFilter;
                }
                if (serv.explicitContentFilter == `ALL_MEMBERS`) {
                    var eFC = "🔴 High (Checks all interactions of all members)";
                } else {
                    var eFC = serv.explicitContentFilter;
                }



                if (serv.nsfwLevel == `SAFE`) {
                    var nFC = "🔞 Safe (The server possibly have some NSWF content somewhere)";
                } else {
                    var nFC = serv.nsfwLevel;
                }
                if (serv.nsfwLevel == `EXPLICIT`) {
                    var nFC = "🔞 Explicit (The server have at least an NSWF channel)";
                } else {
                    var nFC = serv.nsfwLevel;
                }
                if (serv.nsfwLevel == `AGE_RESTRICTED`) {
                    var nFC = "🔞 Age Restricted (You need to have more than 18 years old. The server is entirely NSWF)";
                } else {
                    var nFC = serv.nsfwLevel;
                }
                if (serv.nsfwLevel == `DEFAULT`) {
                    var nFC = "⚪️ Default (No NSWF content)";
                } else {
                    var nFC = serv.nsfwLevel;
                }

                ///////////////////////////////////////////////////////////////////////////////////////////////////
                if (serv.verificationLevel == `VERY HIGH`) {
                    var verL = "🔴 Very High (Verified account with phone number required)";
                }

                else if (serv.verificationLevel == `HIGH`) {
                    var verL = "🟠 High (Verified account and server member for more than ten minutes required)";
                }

                if (serv.verificationLevel == `MEDIUM`) {
                    var verL = "🟡 Medium (Verified account for more than 5 minutes required)";
                }

                else if (serv.verificationLevel == "LOW") {
                    verL = "🟢 Low (Verified account required)";
                }

                else if (serv.verificationLevel == "\`No\`E") {
                    var verL = "⚪️ \`No\`e (No Restriction)";
                }
                if (interaction.guild.mfaLevel == "\`No\`E") {
                    interaction.guild.mfaLevel = "❎ __Disabled__"
                }
                else {
                    interaction.guild.MFALevel = "✅ __Enabled__"
                }

                features = []
                if (interaction.guild.features == "COMMUNITY") {
                    features = "👥 Community"
                }
                else if (interaction.guild.features == "VERIFIED") {
                    features = "✅ Verified"
                }
                else if (interaction.guild.features == "PARTNERED") {
                    features = "🤝 Partner"
                }
                else if (interaction.guild.features == "DISCOVERABLE") {
                    features = "🌍 Discovery"
                }
                else {
                    features = ("🚫 No Features")
                }

                const ownerFetched = interaction.guild.members.cache.find(x => x.id == owner.id) || "---";

                embed.setAuthor(`${server_name}` + " Server Information", interaction.guild.iconURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }));
                embed.setDescription(`${description}`)
                embed.setColor(interaction.guild.me.displayHexColor)
                embed.setThumbnail(icon)
                embed.addField("👑 Owner:", `${owner} (\`${owner.id}\`) [**${ownerFetched.user.tag}**]`, false)
                embed.addField("🆔 ID:", `\`${id}\``, true)
                embed.addField("🌍 Region:", `*${region}*`, false)
                embed.addField("👥 Members:", `\`${memberCount}\``, true)
                embed.addField("🟢 Members Online:", `\`${interaction.guild.members.cache.filter(member => member.presence?.status !== undefined && !member.user.bot).size}\``, true)

                embed.addField(`🎭 Roles[${total_roles}] :`, `${rolemap}`, false)

                embed.addField(`😀 Emojis[${emojis}] :`, `${membersWithRole}`, false)
                embed.addField(`👅 Language:`, `\`${interaction.guild.preferredLocale}\``, true)
                embed.addField("🔮 Boosts:", `\`${total_boosts}\` Boosts *( Level: \`${boost_level}\` )*`, true)
                embed.addField("<:Bot:932601118184325180> Bots:", `\`${botCount}\``, true)
                embed.addField("🗺 Channels:", `\`${ChannelCount}\``, true)
                embed.addField("🏢 Categories:", `\`${total_categories}\``, true)
                embed.addField("💬 Text channels:", `\`${textChannelCount}\``, true)
                embed.addField("🎧 Voice channels:", `\`${voiceChannelCount}\``, true)
                embed.addField("🪧 Banner:", banner, true)
                embed.addField("Ⓜ️ Icon:", "__" + interaction.guild.iconURL() + "__", false)
                embed.addField("🏷 Features:", features, true)
                embed.addField(`🔨 A2F:`, interaction.guild.mfaLevel, true)
                embed.addField("🔒 Verification Level:", `\`${verL}\``, true)
                embed.addField("🛡 Explicit content filter:", `\`${eFC}\``, true)
                embed.addField(`🔞 NSWF Filter:`, `\`${nFC}\``, true)
                embed.addField(`📅 Created the:`, `<t:${Math.round(interaction.guild.createdTimestamp / 1000)}>`, true)
                embed.setTimestamp()
                embed.setFooter({
                    text: `Server Info • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.guild.iconURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });

                interaction.followUp({ embeds: [embed] })

            }

            if (subCom == "user") {

                const member = interaction.guild.members.cache.get(user.id);

                const status = {
                    false: "\`No\`",
                    true: "\`Yes\`"
                }

                let color = member.displayHexColor;
                if (color == '#000000') color = member.hoistRole?.hexColor || member.displayColor || "ffffff";

                let emojiArray = []

                let flags = user.flags.toArray();

                if (flags.includes("STAFF")) emojiArray.push("<:discordEmployee:1071401506529611896>")
                if (flags.includes("PARTNER")) emojiArray.push("<:discordPartner:1071401157496426526>")
                if (flags.includes("HYPESQUAD")) emojiArray.push("<:discordHypesquad:1071401448316874792>")
                if (flags.includes("BUG_HUNTER_LEVEL_1")) emojiArray.push("<:bugHunter:1071400301120196669>")
                if (flags.includes("HOUSE_BRAVERY")) emojiArray.push("<:bravery:1071400299031433259>")
                if (flags.includes("HOUSE_BRILLANCE")) emojiArray.push("<:brillance:1071401816455131136>")
                if (flags.includes("HOUSE_BALANCE")) emojiArray.push("<:balance:1071400292400246924>")
                if (flags.includes("PREMIUM_EARLY_SUPPORTER")) emojiArray.push("<:earlySupporter:1071400633858539621>")
                if (flags.includes("BUG_HUNTER_LEVEL_2")) emojiArray.push("<:goldenBugHunter:1071400286255579156>")
                if (flags.includes("VERIFIED_DEVELOPER")) emojiArray.push("<:DEV:1058731359817973841>")
                if (flags.includes("ACTIVE_DEVELOPER")) emojiArray.push("<:badge_active_developer:1071400284795969627>")

                let total_roles = member.roles.cache.size;

                let rolemap = member.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(r => r)
                    .join("|");

                if (rolemap.length > 983) {

                    rolemap = rolemap.substring(0, 983) + ` and more...`
                }

                let total_perms = member.permissions.toArray().length

                let perms = member.permissions.toArray()
                    .join(`\`, \``)

                if (total_perms < 1) perms = ":warning:" + "\`User has no permissions\`";

                if (perms.length > 1005) perms.substring(0, 1005) + " and more..."

                if (total_roles < 1) rolemap = ":warning:" + "\`User has no role\`";

                emojiArray = emojiArray.join(", ");

                if (emojiArray.length < 1) emojiArray = ":warning:" + "\`User has no badges\`";

                const embed = new MessageEmbed()
                    .setColor(color)
                    .setAuthor(`Informations for ${user.username}`, user.displayAvatarURL({ dynamic: true }))
                    .addField(`<:username:1071397091588456508> Username:`, `**${user.username}**`, true)
                    .addField(`🆔 ID:`, `\`${user.id}\``, true)
                    .addField(`🧾 Tag:`, `${user.tag}`, false)
                    .addField(`<:member:1023155815785435227> Nickname:`, `${user.tag}`, false)
                    .addField(`<:Bot:932601118184325180> Bot:`, `${status[user.bot]}`, true)
                    .addField(`📅 Account Created At:`, `<t:${Math.round(user.createdTimestamp / 1000)}>`, false)
                    .addField(`📆 Joined The:`, `<t:${Math.round(member.joinedTimestamp / 1000)}>`, true)
                    .addField(`<a:allBadges:1071400157389799464> Badges:`, `${emojiArray}`, false)
                    .addField(`🎭 Roles:`, `${rolemap}`, false)
                    .addField(`🛃 Permissions:`, `\`${perms}\``, false)
                    .addField(`🌠 Avatar:`, `__${user.displayAvatarURL({ dynamic: true })}__`)
                    .addField(`🌄 Banner:`, `__${user.banner || `:warning: User has no banner`}__`)

                if (member.premiumSinceTimestamp) embed.addField(`\n<a:nitroAnimated:1013512088615911456> Boosted Server The:`, `<t:${Math.round(member.premiumSinceTimestamp / 1000)}>`)

                if (member.presence) {
                    embed.addField(`-------------------------------------------------------------`, `**👁 Activity:**`, false)

                    let statusEmoji = `<:dnd:1013512333118672916>`
                    let presenceStatus = "Do not Derange (DND)"
                    let platform = "Desktop"
                    let platformEmoji = "<:onlineDesktop:1071474813123698808>"

                    if (member.presence?.status == "offline") {
                        statusEmoji = "<:offline:1013512151522091018>"
                        presenceStatus = "Offline"
                    }
                    if (member.presence?.status == "idle") {
                        statusEmoji = "<:idle:1013511731722596364>"
                        presenceStatus = "Idle"
                    }
                    if (member.presence?.status == "online") {
                        statusEmoji = "<:online:1071474815564775527>"
                        presenceStatus = "Online"
                    }

                    if (member.presence?.clientStatus.web) {
                        platform = "Web"
                        platformEmoji = "<:onlineWeb:1071474811521478790>"
                    }
                    if (member.presence?.clientStatus.mobile) {
                        platform = "Mobile"
                        platformEmoji = "<:onlineMobile:1071474808564490330>"
                    }

                    embed.addField(`<:status:1013511963663421563> Presence:`, `${statusEmoji} ${presenceStatus}`, true)
                    embed.addField(`📱 Platform:`, `${platformEmoji} ${platform}`, true)
                    let activityArray = []

                    member.presence?.activities.forEach((activity, i) => {
                        if (i > 6) return
                        console.log(activity)
                        activityArray.push(`*${activity.name}* [${activity.details || activity.state || "No details"}]`)
                    })

                    embed.addField(`🎟 Activity:`, `${activityArray.join(" || ")}`, false)
                }

                embed.setThumbnail(user.displayAvatarURL({ dynamic: true }))
                embed.setTimestamp()
                embed.setFooter({
                    text: `User Info • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });


                interaction.followUp({ embeds: [embed] })

            }


        } catch (err) {
            console.log(err);
            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An undefined error occured\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
};