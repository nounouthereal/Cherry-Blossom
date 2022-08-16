const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const { MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      const userData = await bot.fetchUser(message.author.id);

      let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Vous avez \`PASSIVE\` activé, vous devez le désactiver pour utiliser cette commande.`);
  
        if (userData.passive == true) return message.channel.send({embeds:[passivewarn]});
  
             
        let user = message.author;

             
        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
  
  let colorbad = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ **${member.user.username}** : Couleur invalide. Merci de choisir une des couleurs qui suit.`);
    let colorbadinfo = new MessageEmbed()
            .setColor("BLUE")
            .setFooter(message.guild.name)
            .setDescription(`💁 **${member.user.username}** : Command Infomation 
  🔴 Red | Multiplier: x1.5
  \`+roulette red (mise)\`
  ⚫ Black | Multiplier: x2
  \`+roulette black (mise)\`
  🟡 Yellow | Multiplier: x2.5
  \`+roulette yellow (mise)\`
  🟢 Vert | Multiplier: x5
  \`+roulette green (mise)\`
`);
/*
🔴Red | Multiplier: x1.5
\`h roulette red (amount)\`
⚫Black | Multiplier: x2
\`h roulette black (amount)\`
🟡 Yellow | Multiplier: x2.5
\`h roulette yellow (amount)\`
🟢Green | Multiplier: x5
\`h roulette green (amount)\`
*/
        if (!colour) return message.channel.send({embeds:[colorbad]}).then(message.channel.send({embeds:[colorbadinfo]}));
        //////////////////////////////////////////////////////////////////////////////////if (!!colour) return message.channel.send(colorbadinfo);
        colour = colour.toLowerCase()
  
        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else if (colour == "y" || colour.includes("yellow")) colour = 3;
        else return message.channel.send({embeds:[colorbad]}).then(message.channel.send({embeds:[colorbadinfo]}));
  
        let betAmount = args[1];
  
      let coinswarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Entrez le montant que vous voulez miser. `);
  
    if (!betAmount || isNaN(betAmount) && betAmount !== 'all' && betAmount !== 'max') return message.channel.send({embeds:[coinswarn]});
  
    let coinmin = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **${member.user.username}** : Le minimum que vous pouvez jouer est de \`200\` :coin:.`);

           if (betAmount < 200) return message.channel.send({embeds:[coinmin]});
    if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
    else betAmount=parseInt(args[1]);
  
           if (betAmount == 'all' || betAmount == 'max') betAmount=userData.coinsInWallet;
           if (betAmount > userData.coinsInWallet) {
           return message.channel.send("Tu n'as pas assez d'argent.");
           }
  
        //let betAmount = args[1];
        let coinsInWallet = await bot.fetchUser(message.author.id);

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("RED")
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setTimestamp()
            .setDescription(`❌ **${member.user.username}** :  Spécifiez un montant à parier \n\n +roulette <couleur> <montant>`);

        let moneymore = new MessageEmbed()
            .setColor("RED")
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setTimestamp()
            .setDescription(`❌ **${member.user.username}** :  Vous pariez plus que vous avez`);

        
        if (!betAmount) return message.channel.send({embeds:[moneyhelp]});
        if (betAmount > coinsInWallet) return message.channel.send({embeds:[moneymore]});

        if (random == 1 && colour == 2) { 
            betAmount *= 5
            bot.giveCoins(message.author.id, betAmount)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setTimestamp()
                .setDescription(`Roulette V2 | Joueur : **${member.user.username}** \n\n 🎨 Couleur : 🟢  \n\n 🧮 Multiplicateur : **x5**  \n\n 💰 Argent remporté : **${betAmount.toLocaleString()}** :coin:`);
            message.channel.send({embeds:[moneyEmbed1]})
          
        } else if (isOdd(random) && colour == 1) { 
            betAmount = parseInt(betAmount * 1.5)
            bot.giveCoins(message.author.id, betAmount)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setTimestamp()
                .setDescription(`Roulette V2 | Player : **${member.user.username}** \n\n 🎨 Color : 🔴 \n\n 🧮 Multiplicateur : **x1.5**  \n\n 💰 Gains : **${betAmount.toLocaleString()}** :coin:`);
            message.channel.send({embeds:[moneyEmbed2]})
          
          } else if (random == 1 && colour == 3) { 
            betAmount = parseInt(betAmount * 2.5)
            bot.giveCoins(message.author.id, betAmount)
            let moneyEmbed4 = new MessageEmbed()
                .setColor("YELLOW")
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setTimestamp()
                .setDescription(`Roulette V2 | Player : **${member.user.username}** \n\n 🎨 Color : 🟡 \n\n 🧮 Multiplicateur : **x2.5**  \n\n 💰 Gains : **${betAmount.toLocaleString()}** :coin:`);
            message.channel.send({embeds:[moneyEmbed4]})
            
        } else if (!isOdd(random) && colour == 0) { 
            betAmount = parseInt(betAmount * 2)
            bot.giveCoins(message.author.id, betAmount)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("BLACK")
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setTimestamp()
                .setDescription(`Roulette Bêta | Player : **${member.user.username}** \n\n 🎨 Color : ⚫ \n\n 🧮 Multipliar : **x2**  \n\n 💰 Gains : **${betAmount.toLocaleString()}** :coin:`);
            message.channel.send({embeds:[moneyEmbed3]})
          
        } else { 
        const lostCoins = (betAmount);
        userData.coinsInWallet -= parseInt(betAmount);
        await userData.save();
            let moneyEmbed4 = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setTimestamp()
                .setDescription(`Roulette Bêta | Player : **${member.user.username}** \n\nVous avez perdu **${betAmount.toLocaleString()}** :coin: \n\nBonne chance pour la prochaine fois`);
            message.channel.send({embeds:[moneyEmbed4]})
        }

    }


module.exports.config = {
    name: 'roulette', // Command Name
    description: 'Parier votre argent pour gagner plus.', // Description
    usage: '+roulette <couleur> <montant>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['roul' , 'roulet'], // Aliases 
    bankSpace: 10, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}