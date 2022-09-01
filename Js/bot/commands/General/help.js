const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const i = '<:infomation:779736273639440394>'

module.exports.run = async (bot, message, args) => {

 const command = bot.commands.get(args.slice(0).join(' ').toString().toLowerCase()) || bot.commands.get(bot.aliases.get(args.join(' ').toString().toLowerCase()));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]) || message.member;
    const user = await bot.fetchUser(member.id);
  if (command) {
        const embed = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .addField('🧧 Name', command.config.name, false)
            .addField('📑 Description', command.config.description, false)
            .addField('🎗 Usage', `\`${command.config.usage}\``, false)
            .addField('🔂 Aliases', `${command.config.aliases.join(' , ') ? command.config.aliases : "No aliases"}`, true)
            .addField('🕰 Cooldown', `${ms(command.config.cooldown * 1000)}`, true)
            .setColor(message.guild.me.displayHexColor);
        return message.channel.send({embeds: [embed]});
    }
    let list = bot.commands.filter(x => x.config.name !== 'help' && x.config.name !== 'test');
    list = list.map(x => `\`${x.config.name}\``);
    const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
        .setDescription(` **${member.user.username}** : Commandes\n\n${list.join(', ')}`)
        .setFooter("Tu peux avoir plus d'info graçe a +help <commande>")
        .setColor('BLUE');
    message.channel.send({embeds: [embed]});
}
Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
});
module.exports.config = {
    name: 'help', // Command Name
    description: 'shows you more infomation about the command.', // Description
    usage: '+help <command name>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['h','?'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}