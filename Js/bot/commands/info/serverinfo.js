   
const Discord = require ("discord.js")
const { MessageEmbed } = require("discord.js")
const { version: discordjsVersion } = require('discord.js');

module.exports.run = async (bot, message, args) =>  {

    const regions = {
        brazil: 'Brazil',
        europe: 'Europe',
        hongkong: 'Hong Kong',
        india: 'India',
        japan: 'Japan',
        russia: 'Russia',
        singapore: 'Singapore',
        southafrica: 'South Africa',
        sydeny: 'Sydeny',
        africa: 'Afrique',
        'us-central': 'US Central',
        'us-east': 'US East',
        'us-west': 'US West',
        'us-south': 'US South'}
    
    let server_name = message.guild.name
    let owner = ctx.guild.owner
    let description = message.guild.description
    let ownername = message.guild.owner
    let id = message.guild.id
    let region = regions[message.guild.region]
    let memberCount = message.guild.memberCount
    let icon = message.guild.iconURL({dynamic: true})
    let total_roles = message.guild.roles.cache.size
    let total_boosts = message.guild.premiumSubscriptionCount
    let boost_level = message.guild.premiumTier
    const voiceChannelCount = message.guild.channels.cache.filter(c => c.type === 'voice').size;
    const ChannelCount = message.guild.channels.cache.size;
    const total_categories =message.guild.channels.cache.filter(ch => ch.type === 'GUILD_CATEGORY').size
    const textChannelCount = message.guild.channels.cache.filter(c => c.type === 'text').size;
    let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position) 
            .map(r => r)
            .join(",");
            console.log(rolemap)
            //if (rolemap.length > 1024) rolemap = ":warning: Il y a trop de roles à afficher";
            if (!rolemap) rolemap = ":warning: Aucun role";
    const emojis =  message.guild.emojis.cache.size 

    let role_var = 0

    let embed = new MessageEmbed()


    const emojismap = message.guild.emojis.cache
        .map((e) => `${e} **-** \`:${e.name}:\``)
        .join(', ');
    if (!message.guild.banner){
        banniere = ':warning: Ce serveur ne dispose pas de bannière'}
    else {
        banniere = discord.Guild.banner}
    
    if (!message.guild.description){
        description = ':warning: Ce serveur ne dispose pas de description'}

    if (region == 'deprecated' ||region == undefined){
        region = ':warning: La région du serveur est inconnue'}

        serv = message.guild


        if (serv.explicitContentFilter == `DISABLED`) {
            var eFC = "🟢 Faible (Ne vérifie aucun message)";
        } else {
            var eFC = serv.explicitContentFilter;
        }
        if (serv.explicitContentFilter == `MEMBERS_WITHOUT_ROLES`) {
            var eFC = "🟡 Moyen (Vérifie les messages de membres sans roles)";
        } else {
            var eFC = serv.explicitContentFilter;
        }
        if (serv.explicitContentFilter == `ALL_MEMBERS`) {
            var eFC = "🔴 Forte (Vérifie tous les messages de tous les membres)";
        } else {
            var eFC = serv.explicitContentFilter;
        }



        if (serv.nsfwLevel == `SAFE`) {
            var nFC = "🔞 Sécurisé (Le serveur ne dispose d'aucun contenu NSWF)";
        } else {
            var nFC = serv.nsfwLevel;
        }
        if (serv.nsfwLevel == `EXPLICIT`) {
            var nFC = "🔞 Explicite (Le serveur dispose d'au moins un salon NSWF)";
        } else {
            var nFC = serv.nsfwLevel;
        }
        if (serv.nsfwLevel == `AGE_RESTRICTED`) {
            var nFC = "🔞 Serveur NSWF (Le serveur est basé sur le contenu NSWF)";
        } else {
            var nFC = serv.nsfwLevel;
        }
        if (serv.nsfwLevel == `DEFAULT`) {
            var nFC = "⚪️ Aucune (Aucun contenu NSWF)";
        } else {
            var nFC = serv.nsfwLevel;
        }
        console.log(nFC)
        console.log(serv.nsfwLevel)
    ///////////////////////////////////////////////////////////////////////////////////////////////////
        if (serv.verificationLevel == `VERY HIGH`) {
            var verL = "🔴 Très forte (Compte vérifié demandé et numéro de téléphone associé au compte)";
        } 
    
        else if (serv.verificationLevel == `HIGH`) {
            var verL = "🟠 Forte (Compte vérifié demandé et membre du serveur depuis +10 minutes)";
        } 
    
        if (serv.verificationLevel == `MEDIUM`) {
            var verL = "🟡 Moyen (Compte vérifié demandé depuis +5 minutes)";
        } 

        else if (serv.verificationLevel == "LOW") {
            verL = "🟢 Faible (Compte vérifié demandé)";
        }
    
        else if (serv.verificationLevel == "NONE") {
            var verL = "⚪️ Aucune (Aucune Restriction)";
        }
        console.log(serv.verificationLevel)
        
        if (message.guild.mfaLevel == "NONE") {
            message.guild.mfaLevel = "Désactivé"
        }
        else {
            message.guild.MFALevel = "Activé"}
    
    features = []
    if (message.guild.features == "COMMUNITY"){
            features = "👥 Communauté"}
    else if (message.guild.features == "VERIFIED"){
            features = "✅ Vérifié"}
    else if (message.guild.features == "PARTNERED"){
            features = "🤝 Partenaire"}
    else if (message.guild.features == "DISCOVERABLE"){
            features = "🌍 Découverte"}
    else {
        features = ("🚫 Aucune caractéristiques spéciales")}

    embed.setTitle(`${server_name}` + " Server Information")
    embed.setDescription(description)
    embed.setColor(message.guild.me.displayHexColor)
    embed.setThumbnail(url = icon)
    embed.addField("👑 Owner :", `${owner}(\`${ownername}\`)`, true)
    embed.addField("🆔 ID :", `**${id}**`, true)
    embed.addField("🌍 Région :",`**${region}**`, false)
    embed.addField("👥 Nombre de membres :", `**${memberCount}**`, false) 
    embed.addField("🟢 Nombre de membres en ligne :", `**${message.guild.members.cache.filter(member => member.presence?.status !== undefined).size}**`, false) 
       
    embed.addField(`🎭 Roles[${total_roles}] :`, `${rolemap}`, false)
    
    embed.addField(`😀 Emojis[${emojis}] :`, `${emojismap}`, false)
    embed.addField("💠 Nombre de boosts ( niveau de boost ) :", `**${total_boosts}** Boosts ( Niveau **${boost_level}** )`, false)
    embed.addField("🗺 Nombre de salons :", `**${ChannelCount}**`, false)
    embed.addField("🏢 Nombre de catégories :", `**${total_categories}**`, false)
    embed.addField("💬 Nombre de salons textuels :", `**${voiceChannelCount}**`, false)
    embed.addField("🎧 Nombre de salons vocaux :", `**${textChannelCount}**`, false)
    embed.addField("🪧 Bannière :", banniere, false)
    embed.addField("🏷 Caractéristiques Spéciales :", features)
    embed.addField(`🔨 A2F demandé:`,message.guild.mfaLevel)
    embed.addField("🔒 Niveau de vérification:",verL,false)
    embed.addField("🛡 Filtre de contenu explicite:",eFC,false)
    embed.addField(`🔞 Filtre NSWF`,nFC,false)
    embed.setTimestamp()
    message.channel.send({embeds: [embed]})
};

module.exports.config = {
    name: 'serverinfo', // Command Name
    description: 'Donnes des informations sur le serveur.', // Description
    usage: '+serverinfo', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['si','infoserver'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}
