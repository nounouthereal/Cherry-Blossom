const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require("discord.js");
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
module.exports.run = async (bot, message, args) => {
  let user = await bot.fetchUser(message.author.id);
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


const item = itemss.find(x => x.itemId === 'rifle');  
let founditem = user.items.find(x => x.itemId === 'rifle');
    let array = [];
    array = user.items.filter(x => x.itemId !== 'rifle');
    if (!founditem) {
              let use3embed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`❌ **${member.user.username}** : Vous ne possédez pas de \`RIFLE\`, vous devez en acheter un pour utiliser cette commande.`);
              return message.channel.send(use3embed);
        //////return message.channel.send("you don't have this item");
    }
  /*
  const findItem = data.items.find(i => i.name.toLowerCase() == 'rifle');
        let userInv = data.items.filter(i => i.name.toLowerCase() !== 'rifle');
    if (!userInv < 1) {
      
              let use2embed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`${x} **${member.user.username}** : You dont have this item make sure you have typed the correct \`id\`.`);
              return message.channel.send(use2embed);
    }
*/
  
/*
bear = legendaire
deer = epic
boar = rare
fox = rare
rabbit = atypique
cow = atypique
chicken = common
duck = common
pig = common
*/
  

const randomMessage = [
  'chicken',
  'chicken',
  'chicken',
  'chicken',
  'chicken',
  'chicken',
  'duck',
  'duck',
  'duck',
  'duck',
  'duck',
  'duck',
  'pig',
  'pig',
  'pig',
  'pig',
  'pig',
  'pig',
  'cow',
  'cow',
  'cow',
  'cow',
  'rabbit',
  'rabbit',
  'rabbit',
  'rabbit',
  'boar',
  'boar',
  'boar',
  'fox',
  'fox',
  'fox',
  'deer',
  'deer',
  'bear',
    ];
  
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
  
    const userData = await bot.fetchUser(message.author.id);
    
    if (response == 'bear') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedBear = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Ours 🐻`)
        .setColor("GREEN")
        message.channel.send(EmbedBear);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Bear 🐻`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'bear');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'bear');
        if (findItem) {
            userInv.push({ itemId: 'bear', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'bear', amount: deerAmount });
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'deer') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedDeer = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Cerf 🦌`)
        .setColor("GREEN")
        message.channel.send(EmbedDeer);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Deer 🦌`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'deer');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'deer');
        if (findItem) {
            userInv.push({ itemId: 'deer', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'deer', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'duck') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedDuck = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Canard 🦆`)
        .setColor("GREEN")
        message.channel.send(EmbedDuck);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Duck 🦆`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'duck');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'duck');
        if (findItem) {
            userInv.push({ itemId: 'duck', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'duck', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'pig') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedPig = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Cochon(s) 🐷`)
        .setColor("GREEN")
        message.channel.send(EmbedPig);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Pig 🐷`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'pig');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'pig');
        if (findItem) {
            userInv.push({ itemId: 'pig', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'pig', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'cow') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedCow = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Vache(s) 🐮`)
        .setColor("GREEN")
        message.channel.send(EmbedCow);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Cow 🐮`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'cow');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'cow');
        if (findItem) {
            userInv.push({ itemId: 'cow', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'cow', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'fox') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedFox = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Renard(s) 🦊`)
        .setColor("GREEN")
        message.channel.send(EmbedFox);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Fox 🦊`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'fox');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'fox');
        if (findItem) {
            userInv.push({ itemId: 'fox', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'fox', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'rabbit') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedRabbit = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Lapin(s) 🐰`)
        .setColor("GREEN")
        message.channel.send(EmbedRabbit);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Rabbit 🐰`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'rabbit');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'rabbit');
        if (findItem) {
            userInv.push({ itemId: 'rabbit', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'rabbit', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'chicken') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedChicken = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Poulets 🐔`)
        .setColor("GREEN")
        message.channel.send(EmbedChicken);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Chicken 🐔`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'chicken');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'chicken');
        if (findItem) {
            userInv.push({ itemId: 'chicken', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'chicken', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'boar') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedBoar = new MessageEmbed()
        .setDescription(`🏹 **${member.user.username}** : Vous êtes allé à la chasse et êtes revenu avec **${deerAmount}**x Sanglier 🐗`)
        .setColor("GREEN")
        message.channel.send(EmbedBoar);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Boar 🐗`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'boar');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'boar');
        if (findItem) {
            userInv.push({ itemId: 'boar', amount: (findItem.amount + deerAmount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'boar', amount: deerAmount});
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'missed') {
        const Embedmissed = new MessageEmbed()
        .setDescription(` **${member.user.username}** : Vous êtes allé à la chasse, et n'avez vu aucun animal`)
        .setColor("RED")
        message.channel.send(Embedmissed);
        }
}
module.exports.config = {
    name: 'hunt', // Command Name
    description: 'Utilisez votre fusil pour chassez des animaux', // Description
    usage: '+hunt', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['chasse','chasser'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 1000// Command Cooldown
}