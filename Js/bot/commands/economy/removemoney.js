const { MessageEmbed } = require("discord.js");

module.exports.run =  async (bot, message, args) =>{
        if (!message.member.hasPermission("ADMINISTRATOR","BAN_MEMBERS")) return message.channel.send("❌ Tu n'as pas les permissions pour diminuer de l'argent! - [ADMINISTRATOR] , [SUPER ADMIN]");
        if (!args[0]) return message.channel.send("**❌ Merci de spécifier un utilisateur**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        const userData = await bot.fetchUser(user.id);
        if (!user) return message.channel.send("**❌ Utilisateur indéfini!**")
        if (!args[1]) return message.channel.send("**❌ Merci de spécifier un montant!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Votre montant est pas un nombre!**`);
        if (args[0] > 100000) return message.channel.send("**❌ Pardonnez moi ce virement parais excessif!**")
        userData.coinsInWallet -= parseInt(args[1])

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Somme de **${args[1]}** :dollar: diminuée\n**Membre**: ${user}\n**Administrateur**: ${message.author.mention}\n**Nouvelle Balance**: **${userData.coinsInWallet}** :dollar:`)
        message.channel.send(moneyEmbed)

}

module.exports.config = {
    name: 'removemoney', // Command Name
    description: 'ajouter de l\'argent', // Description
    usage: '+removemoney amount @user', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['removecredits','removebal','rm','rmvm','rmv'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 200 // Command Cooldown
  }