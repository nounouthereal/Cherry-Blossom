const { ContextMenuInteraction } = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "User Info",
    type: "USER",

    /**
     * @param {ContextMenuInteraction} interaction
    */

    run: async (bot, interaction, args) => {
        const user = await bot.users.fetch(interaction.targetId)


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
}