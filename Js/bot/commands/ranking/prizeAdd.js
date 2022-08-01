const Discord = require("discord.js")
const Prizes = require('../../models/PrizesModel');

module.exports.run = async (bot, message, args) => {
    let level = args[0]
    let prizeData = await Prizes.findOne({ guildId: message.guild.id});
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    let embed = new Discord.MessageEmbed().setAuthor({ name: message.author.username, url: message.author.avatarURL({ dynamic: true })});
  
    if(!level || isNaN(level) || level < 0) return message.channel.send({embeds: [embed.setDescription(`❌ Vous devez spécifier un **niveau** valide auquel la récompense sera ajoutée!`),embed.setColor("RED")]});
    if(!role) return message.channel.send({embeds: [embed.setDescription(`❌ **${level}** Vous devez spécifier un **rôle et un identifiant de rôle** valides qui seront ajoutés à votre niveau en récompense!`),embed.setColor("RED")]});
    
    if(!prizeData) {
        let newPrize = new Prizes({
            guildId: message.guild.id,
            levelPrizes: [{ level: level, role: role.id}]
        }).save();
    } else {
        if(prizeData.levelPrizes.find(x => x.level == level && x.role == role.id)) {
            message.channel.send({embeds: [embed.setDescription(`❌ **${level}** Les récompenses de votre niveau incluent déjà ${role}!`),embed.setColor("RED")]});
        } else {
            prizeData.levelPrizes.push({ level: level, role: role.id});
            prizeData.save();
            message.channel.send({embeds: [embed.setDescription(`✅ ${role} a été ajouté avec succès aux récompenses du niveau **${level}**.`),embed.setColor("GREEN")]});
        };
    };  
};

module.exports.config = {
    name: 'prizeAdd', // Command Name
    description: 'Affiche votre niveau', // Description
    usage: '+prizeAdd <level> <role mention ou id>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['prizeadd','AddPrize','add_prize','prize_add','addPrize'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}
