const Discord = require("discord.js")
const Levels = require("/Users/nouhame/Bot_des_cerisiers/Js/bot/models/LevelsModel.js");
const { MessageEmbed } = require("discord.js");
const xp_emoji = '<:XP:1000514954673258533>';
const leaderboard_emoji = '<:leaderboard:1000712612511756379>'
const canvacord = require("canvacord")



module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
    let user_sliced = user.id

    if (args[0] != null || undefined) {

        user_sliced = args[0].slice(2, 20)
        
        user = bot.users.cache.get(user_sliced);
    }
    let levelData = await Levels.findOne({ guildId: message.guild.id, userId: user_sliced });
    let activeData = await Levels.findOne({ guildId: message.guild.id });


    if (activeData.activated = false){
        let embedInactive = new MessageEmbed()
        .setColor('YELLOW')
        .setDescription(':warning: Le systéme de niveaux est désactivé sur le serveur')
        message.channel.send({embeds: [embedInactive]})
    }
  
    let rank = await Levels.find({ guildId: message.guild.id }).sort({ totalXp: -1 }).exec();
    rank = rank.filter(x => message.guild.members.cache.has(x.userId)).findIndex(x => x.userId == user.id) + 1;
    let level_emoji = ":warning: Erreur avec l'emoji"

    let embed = new MessageEmbed()

    if (levelData.level <= 10) {
        level_emoji = "<:Level_0_10:1000485719942377574>"
        embed.setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F907659192612048906.png%3Fv%3D1&w=64&q=75")
    }
    else if (levelData <= 20) {
        level_emoji = "<:Level_11_20:1000485722849017936>"
        embed.setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F907663793625116712.png%3Fv%3D1&w=64&q=75")
    }
    else if (levelData <= 30) {
        level_emoji = "<:Level_21_30:1000485725420130405>"
        embed.setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F907659192670769254.png%3Fv%3D1&w=64&q=75")
    }
    else if (levelData <= 40) {
        level_emoji = "<:Level_31_40:1000485727529869333>"
        embed.setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F907659192863715378.png%3Fv%3D1&w=64&q=75")
    }
    else if (levelData <= 50) {
        level_emoji = "<:Level_41_50:1000485729908043876>"
        embed.setThumbnail("")
    }
    else if (levelData <= 60) {
        level_emoji = "<:Level_51_60:1000485732126834748>"
        embed.setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F907659193027297321.png%3Fv%3D1&w=64&q=75")
    }
    else if (levelData <= 70) {
        level_emoji = "<:Level_61_70:1000485734366597150>"
        embed.setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F907659193006305280.png%3Fv%3D1&w=64&q=75")
    }
    else if (levelData <= 80) {
        level_emoji = "<:Level_71_80:1000485736052686849>"
        embed.setThumbnail("https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F907659192356184155.png%3Fv%3D1&w=64&q=75")
    }
    else if (levelData <= 90) {
        level_emoji = "<:Level_81_90:1000486109509329007>"
        embed.setThumbnail("")
    }
    else if (levelData <= 100) {
        level_emoji = "<:Level_91_100:1000486113976254484>"
        embed.setThumbnail("")
    }
    else {
        level_emoji = "<:Level_101Max:1000486118363512932>"
        embed.setThumbnail("")
    }

    let rankmessage = `${leaderboard_emoji} ` + rank + '/' +  message.guild.memberCount

    if (rank == '0') {
        rankmessage = ":warning: Aucun donnée sur le classement <a:cry:994268928127795281>"
        }

    
    //let embedf = new Discord.MessageEmbed().setAuthor(user.username, user.avatarURL({ dynamic: true })).setDescription(`Seviye: \`${levelData ? levelData.level : 1}\` \nToplam Tecrübe Puanı: \`${numberFormat(levelData ? levelData.totalXp : 0)}\` \nTecrübe Puanı: \`${levelData ? levelData.xp : 0}/${levelData ? levelData.xpToLevel : 123}\` \nRütbe: \`${rank}/${message.guild.memberCount}\``)
    embed.setAuthor({name: user.username, iconURL: user.displayAvatarURL({ dynamic: false, size: 1024 })})
    embed.setTitle(`💾 Levels de ${user.username}`)
    embed.addField(`Niveau :`,`Niveau **${levelData ? levelData.level : 1}** ${level_emoji}`)
    embed.addField(`XP Total :`,`${numberFormat(levelData ? levelData.totalXp : 0)} ${xp_emoji}`)
    embed.addField(`XP :`,`${levelData ? levelData.xp : 0} ${xp_emoji} (**XP restant:** **${levelData ? levelData.xpToLevel : 123  - levelData ? levelData.xp : 0}** ${xp_emoji})`)
    embed.addField(`Classement :`, rankmessage)
    embed.setColor('#57c478')
    message.channel.send({embeds: [embed]});

    let color = "#FFFFFF"



    let status = message.member.presence?.status;
    console.log(status)
      //do some coloring for user status cause cool
      if (status === "dnd") { color = "#ff0048", console.log(color)}
      else if (status === "online") { color = "#00fa81", console.log(`online`) }
      else if (status === "idle") { color = "#ffbe00", console.log(`idle`)}
      else if (status === "offline" || undefined) { color = "#757373", console.log(`offline`)}
      else if (status === "streaming") { color = "#757373";}

      
    const rankCard = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setCurrentXP(levelData ? levelData.xp : 0, color)
        .setRequiredXP(levelData ? levelData.xpToLevel : 123, color)
        .setStatus(status, false, 7)
        .renderEmojis(true)
        .setProgressBar(color, "COLOR")
        .setRankColor(color, "COLOR")
        .setLevelColor(color, "COLOR")
        .setUsername(user.username, "#FFFFFF")
        .setRank(rank, `Place`, true)
        .setLevel(levelData ? levelData.level : 1 , `Niveau `, true)
        .setDiscriminator(user.discriminator, "#FFFFFF");
      rankCard.build()
        .then(async data => {
          //add rankcard to attachment
          const attachment = new Discord.MessageAttachment(data, "RankCard.png");
          //define embed
          const embed = new Discord.MessageEmbed()
            //.setTitle(`Ranking of:  ${user.username}`)
            .setColor(color)
            .setImage("attachment://RankCard.png")
          //send that embed
          await message.channel.send({embeds: [embed],files: [attachment]});
          return;
        });
};

module.exports.config = {
    name: 'rank', // Command Name
    description: 'Affiche votre niveau', // Description
    usage: '+rank', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['level','xp','Xp','XP'], // Aliases 
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