const Discord = require("discord.js")
const Levels = require("/Users/nouhame/Bot_des_cerisiers/Js/bot/models/LevelsModel.js");
const { MessageEmbed } = require("discord.js");
const leaderboard_emoji = '<:leaderboard:1000712612511756379>'
const canvacord = require("canvacord")
const xp_emoji = '<:XP:1000514954673258533>';



module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
    let levelData = await Levels.find({ guildId: message.guild.id }).sort({ totalXp: -1 }).exec();  
    levelData = levelData.filter(x => message.guild.members.cache.has(x.userId)).slice(0, 30).map((x, i) => `${leaderboard_emoji} \`${i+1}.\` <@${x.userId}> : Level  **${x.level}** - **${numberFormat(x.totalXp)}** ${xp_emoji} - (\`${numberFormat(x.xp)}/${numberFormat(x.xpToLevel)}\`)`).join("\n");

    if(!levelData.length) levelData = `:warning: ${message.guild.name} ne contient aucune statistiques sur les levels`;
    let embed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setThumbnail(message.guild.iconURL({ dynamic: true }));
    embed.setDescription(`${leaderboard_emoji} **${message.guild.name}** Classement du serveur. \n\n` + levelData)
    message.channel.send({embeds: [embed]});            
  
};

module.exports.config = {
    name: 'toplevel', // Command Name
    description: 'Affiche le classement du srveur sur le niveau', // Description
    usage: '+toplevel', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['toplevel','topxp','topXp','topXP','levellb','lblevel','leaderboardlevel','levelleaderbord'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}

function numberFormat(num) {
    let numberFormats = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "K" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "Md" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    let i;  
    for (i = numberFormats.length - 1; i > 0; i--) {
        if (num >= numberFormats[i].value) break;
    };
    return (num / numberFormats[i].value).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + numberFormats[i].symbol;
};