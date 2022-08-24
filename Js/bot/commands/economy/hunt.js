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
              .setDescription(`❌ <@${member.user.id}> : You don't have a \`RIFLE\`, you must buy one to use this command.`);
              return message.channel.send({embeds: [use3embed]});
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
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Bear(s) 🐻`)
        .setColor("ORANGE")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedBear]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Bear 🐻`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'bear');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'bear');
        const findInItems = itemss.find(i => i.itemId == 'bear');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'deer') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedDeer = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Deer(s) 🦌`)
        .setColor("PURPLE")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedDeer]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Deer 🦌`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'deer');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'deer');
        const findInItems = itemss.find(i => i.itemId == 'deer');

        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'duck') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedDuck = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Duck(s) 🦆`)
        .setColor("WHITE")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedDuck]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Duck 🦆`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'duck');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'duck');
        const findInItems = itemss.find(i => i.itemId == 'duck');


        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'pig') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedPig = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Pig(s) 🐷`)
        .setColor("WHITE")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds:[EmbedPig]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Pig 🐷`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'pig');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'pig');
        const findInItems = itemss.find(i => i.itemId == 'pig');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'cow') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedCow = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Cow(s) 🐮`)
        .setColor("GREEN")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedCow]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Cow 🐮`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'cow');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'cow');
        const findInItems = itemss.find(i => i.itemId == 'cow');

        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'fox') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedFox = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Fox(es) 🦊`)
        .setColor("BLUE")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedFox]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Fox 🦊`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'fox');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'fox');
        const findInItems = itemss.find(i => i.itemId == 'fox');


        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'rabbit') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedRabbit = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Rabbit(s) 🐰`)
        .setColor("GREEN")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedRabbit]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Rabbit 🐰`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'rabbit');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'rabbit');
        const findInItems = itemss.find(i => i.itemId == 'rabbit');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'chicken') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedChicken = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Chiken(s) 🐔`)
        .setColor("WHITE")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedChicken]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Chicken 🐔`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'chicken');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'chicken');
        const findInItems = itemss.find(i => i.itemId == 'chicken');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'boar') {
        const deerAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const EmbedBoar = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 <@${member.user.id}> : You went hunting and came back with **x${deerAmount}** Boar(s) 🐗`)
        .setColor("BLUE")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [EmbedBoar]});
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Boar 🐗`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'boar');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'boar');
        const findInItems = itemss.find(i => i.itemId == 'boar');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = deerAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'missed') {
        const Embedmissed = new MessageEmbed()
        .setTitle(`🏹 Hunt results`)
        .setDescription(`🏹 **${member.user.username}** : You went hunting and saw no animals`)
        .setColor("BLACK")
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        message.channel.send({embeds: [Embedmissed]});
        }
}
module.exports.config = {
    name: 'hunt', // Command Name
    description: 'Use your rifle tou hunt', // Description
    usage: '+hunt', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['hu'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 1000// Command Cooldown
}