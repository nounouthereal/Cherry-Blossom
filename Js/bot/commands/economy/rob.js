const { MessageEmbed, Message } = require('discord.js');
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const s = '<:hydrashild:780113155744595978>'
module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    const user = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' ')) || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(' ').toString().toLowerCase());
  
  
    let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : Vous avez \`PASSIVE\` activé, vous devez le désactiver pour utiliser cette commande.`);
  
    if (user.passive == true) return message.channel.send({embeds: [passivewarn]});
  
    if (!member) {
      
    let rob1embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : Vous avez oublié la personne que vous voulez voler .`);
    return message.channel.send({embeds: [rob1embed]});
    //return message.channel.send("You think you can rob nobody?");
    {embeds: [embed]}
    }
    const devs = ['404205935251292160'];

    if (devs.includes(member.user.id)) {
      
    let rob2embed = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription(`🛡 **${usertag.user.username}** : L'utilisateur que vous avez essayé de voler a des protections`);
    return message.channel.send(rob2embed);
      //return message.channel.send(`You can't rob the bot devs lol.`);
    }
    
    const robbedUser = await bot.fetchUser(member.id);
    if (robbedUser.passive == true) {
      
    let rob3embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${usertag.user.username}** : L'utilisateur que vous avez essayé de voler a passif \`ENABLED\`.`);
    return message.channel.send(rob3embed);
      //return message.channel.send(`Leave them alone... they are in passive mode`);
    }
    if (robbedUser.coinsInWallet < 1000) {
    let rob4embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`🛡 **${usertag.user.username}** : L'utilisateur que vous avez essayé de voler a des protections sur son solde pour le moment car il a un solde inférieur à \`1 000\` :dollar:.`);
    return message.channel.send(rob4embed);
        //return message.channel.send("This user doesn't have much coins, I wouldn't rob them");
    }
    if (user.items.find(x => x.name == 'luckyclover')) {
        const newInv = user.items.filter(i => i.itemId != 'luckyclover');
        const bypass = user.items.find(i => i.itemId == 'luckyclover');
        if (bypass.amount == 1) {
            user.items = newInv;
        } else {
            newInv.push({ itemId: 'luckyclover', amount: bypass.amount - 1, description: bypass.description });
            user.items = newInv
        }
    } else {
        const random2 = Math.floor(Math.random() * 2);
        if (random2 === 2) {
            const randomAmount = Math.round(Math.random() * robbedUser.coinsInWallet);
            var caution = user.coinsInWallet -= randomAmount 
            var cautionrecived = robbedUser.coinsInWallet += randomAmount;
              let rob5embed = new MessageEmbed()
              .setColor("BLUE")
              .setTitle(`💸 Résultat du vol:`)
              .setDescription(`🛡 **${usertag.user.username}** : Vous avez essayé de voler **${member.user.tag}** est vous avez été arrêter 👮 ! Vous payez une caution de ${caution} :dollar:.`);
              let robb7emb = new MessageEmbed()
              .setColor("WHITE")
              .setDescription(`🛡 **${usertag.user.username}** : A essayé de vous voler **${member.user.tag}** et il a été arrêter 👮 ! Il vous a payé une caution de ${cautionrecived} :dollar:.`)
              message.robbedUser.send(robb7emb)
              return message.channel.send(rob5embed);
            //return message.channel.send(`You tried to rob **${member.user.tag}** but got caught👮! Better luck next time.`);
        }
    }
    let array = robbedUser.items.filter(x => x.itemId !== 'padlock');
    const padlock = robbedUser.items.find(x => x.itemId === 'padlock');
    if (padlock) {
        const random = Math.floor(Math.random() * 5);

      
              let rob6embed = new MessageEmbed()
              .setColor("BLUE")
              .setTitle(`💸 Résultat du vol:`)
              .setDescription(`🛡 **${usertag.user.username}** : Vous avez essayée de voler **${member.user.tag}**, mais il a un **Cadenas**🔒. Essayez la prochaine fois.`);
              message.channel.send(rob6embed);
        //message.channel.send(`You tried to rob **${member.user.tag}**, but they had a **Padlock**🔒. Try again next time.`);
      
        if (padlock.amount === 1) {
            robbedUser.items = array;
            await robbedUser.save();
            return;
        }
        else {
            array.push({
                itemId: 'padlock',
                amount: padlock.amount - 1,
                description: padlock.description
            });
            robbedUser.items = array;
            await robbedUser.save();
            return;
        }
    }
    const randomAmount = Math.round(Math.random() * robbedUser.coinsInWallet);
    user.coinsInWallet += randomAmount;
    robbedUser.coinsInWallet -= randomAmount;
    await user.save();
    await robbedUser.save();
  
              let rob6embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`:moneybag:  **${usertag.user.username}** : Vous avez volée **${randomAmount.toLocaleString()}** :coin: à ${member}!`);
              message.channel.send({embeds: [rob6embed]});
  
    //message.channel.send(`:moneybag: You stole **${randomAmount.toLocaleString()}** coins from ${member}!`);

}

module.exports.config = {
    name: 'rob', // Command Name
    description: 'steal someones money and possibly get rich.', // Description
    usage: '+rob <user>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 600 // Command Cooldown
}