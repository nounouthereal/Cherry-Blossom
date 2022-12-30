const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { version: discordjsVersion } = require('discord.js')
const nodeVersion = process.version.match(/^v(\d+\.\d+)/)[1];

module.exports = {
    name: "info",
    description: "ℹ️ Informations Category",
    cooldown: 5,
    options: [
        {
            name: "ban",
            description: "🔨 Give you informations about bans",
            type: "SUB_COMMAND",
        },
        {
            name: "bot",
            description: "🌸 Give you informations about me",
            type: "SUB_COMMAND",
        },
        {
            name: "channel",
            description: "＃ Give you informations about a server channel",
            type: "SUB_COMMAND",
        },
        {
            name: "emoji",
            description: "😃 Give you informations about an emoji",
            type: "SUB_COMMAND",
        },
        {
            name: "invite",
            description: "🗣 Give you informations about an user",
            type: "SUB_COMMAND",
        },
        {
            name: "role",
            description: "🎭 Give you informations about a role",
            type: "SUB_COMMAND",
        },
        {
            name: "server",
            description: "⣶ Give you informations about the server",
            type: "SUB_COMMAND",
        },
        {
            name: "user",
            description: "🗣 Give you informations about an user",
            type: "SUB_COMMAND",
        },
    ],

    run: async (bot, interaction, args) => {


        try {

            const subCom = interaction.options.getSubcommand();

            if (subCom == "bans") {



            }

            if (subCom == "bot") {



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
                let owner = interaction.guild.owner
                let description = interaction.guild.description
                let ownername = interaction.guild.owner
                let id = interaction.guild.id
                let region = regions[interaction.guild.region]
                let memberCount = interaction.guild.memberCount
                let icon = interaction.guild.iconURL({ dynamic: true })
                let total_roles = interaction.guild.roles.cache.size
                let total_boosts = interaction.guild.premiumSubscriptionCount
                let boost_level = interaction.guild.premiumTier
                const voiceChannelCount = interaction.guild.channels.cache.filter(c => c.type === 'voice').size;
                const ChannelCount = interaction.guild.channels.cache.size;
                const total_categories = interaction.guild.channels.cache.filter(ch => ch.type === 'GUILD_CATEGORY').size
                const textChannelCount = interaction.guild.channels.cache.filter(c => c.type === 'text').size;
                let rolemap = interaction.guild.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(r => r)
                    .join(",");
                //if (rolemap.length > 1024) rolemap = ":warning: Il y a trop de roles à afficher";
                if (!rolemap) rolemap = ":warning: No role";
                const emojis = interaction.guild.emojis.cache.size

                const embed = new MessageEmbed()


                const emojismap = interaction.guild.emojis.cache
                    .map((e) => `${e} **-** \`:${e.name}:\``)
                    .join(', ');
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
                    region = ':warning: Server region is unknown'
                }

                serv = interaction.guild


                if (serv.explicitContentFilter == `DISABLED`) {
                    var eFC = "🟢 Disabled (Does not verify any interaction)";
                } else {
                    var eFC = serv.explicitContentFilter;
                }
                if (serv.explicitContentFilter == `MEMBERS_WITHOUT_ROLES`) {
                    var eFC = "🟡 Moyen (Checks interactions of members without roles)";
                } else {
                    var eFC = serv.explicitContentFilter;
                }
                if (serv.explicitContentFilter == `ALL_MEMBERS`) {
                    var eFC = "🔴 Forte (Checks all interactions of all members)";
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
                    var nFC = "⚪️ Default (No NSWF server)";
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

                else if (serv.verificationLevel == "NONE") {
                    var verL = "⚪️ None (No Restriction)";
                }
                console.log(serv.verificationLevel)

                if (interaction.guild.mfaLevel == "NONE") {
                    interaction.guild.mfaLevel = "❎ Disabled"
                }
                else {
                    interaction.guild.MFALevel = "✅ Enabled"
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

                embed.setTitle(`${server_name}` + " Server Information")
                embed.setDescription(description)
                embed.setColor(interaction.guild.me.displayHexColor)
                embed.setThumbnail(icon)
                embed.addField("👑 Owner:", `${owner}(\`${ownername}\`)`, true)
                embed.addField("🆔 ID:", `**${id}**`, true)
                embed.addField("🌍 Region:", `**${region}**`, false)
                embed.addField("👥 Number of Members:", `**${memberCount}**`, false)
                embed.addField("🟢 Number of Members Online:", `**${interaction.guild.members.cache.filter(member => member.presence?.status !== undefined).size}**`, false)

                embed.addField(`🎭 Roles[${total_roles}] :`, `${rolemap}`, false)

                embed.addField(`😀 Emojis[${emojis}] :`, `${emojismap}`, false)
                embed.addField(`👅 Language:`, `${interaction.guild.preferredLocale}`, false)
                embed.addField("💠 Number of boosts ( level of boost ):", `**${total_boosts}** Boosts ( Level: **${boost_level}** )`, false)
                embed.addField("🤖 Number of bots:", `**${total_boosts}**`, false)
                embed.addField("🗺 Number of channels:", `**${ChannelCount}**`, false)
                embed.addField("🏢 Number of categories:", `**${total_categories}**`, false)
                embed.addField("💬 Number of text channels:", `**${voiceChannelCount}**`, false)
                embed.addField("🎧 Number of voice channels:", `**${textChannelCount}**`, false)
                embed.addField("🪧 Banner :", banner, false)
                embed.addField("🏷 Caractéristiques Spéciales :", features)
                embed.addField(`🔨 A2F:`, interaction.guild.mfaLevel)
                embed.addField("🔒 Verification Level:", verL, true)
                embed.addField("🛡 Explicit content filter:", eFC, true)
                embed.addField(`🔞 NSWF Filter:`, nFC, true)
                embed.setTimestamp()
                
                interaction.followUp({embeds: [embed]})

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