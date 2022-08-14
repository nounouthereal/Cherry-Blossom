const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed, Message } = require('discord.js');


module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      let user = await bot.fetchUser(message.author.id);
      if (!args.join(' ')) {
        
                let use1embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ **${member.user.username}** : Tu a oublié la valeur de l'item \`id\`.`);
                return message.channel.send({embeds: [use1embed]});
          //////return message.channel.send("you can't use nothing lmao");
        
      }
      const item = itemss.find(x => x.itemId.toLowerCase() === args.join(' ').toString().toLowerCase());
      if (!item) {
        
                let use2embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ **${member.user.username}** : Tu n'as pas cette item, sois sur de l'avoir entré \`l'id\` correctement.`);
                return message.channel.send({embeds: [use2embed]});
          //////return message.channel.send("can't use this item");
        
      }
      if (!item.canUse) {
  
                let use3embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ **${member.user.username}** : Tu peux pas utiliser ces items.`);
                return message.channel.send({embeds: [use3embed]});
          //////return message.channel.send(":thinking: You can't use this item");
  
      }
      let founditem = user.items.find(x => x.itemId === item.itemId);
      let array = [];
      array = user.items.filter(x => x.itemId !== item.itemId);
      if (!founditem) {
                let use3embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ **${member.user.username}** : Tu n'as pas cette item, sois sur de l'avoir entré correctement \`id\`.`);
                return message.channel.send({embeds: [use3embed]});
          //////return message.channel.send("you don't have this item");
      }
      
      if (item.keep == false) {
          if (founditem.amount === 1) {
              user.items = user.items.filter(x => x.itemId != item.itemId);
              await user.save();
          }
          else {
              array.push({
                name: item.name,
                description: item.description,
                canUse: item.canUse,
                canBuy: item.canBuy,
                itemId: item.itemId,
                amount: founditem.amount - 1,
                displayOnShop: item.displayOnShop,
                sellAmount: item.sellAmount,
                price: item.price,
                rarety: item.rarety,
                resistance: item.resistance,
                keep: item.keep,
              });
              user.items = array;
              await user.save();
          }
      }
      await item.run(bot, message, args);
  }
  
  module.exports.config = {
      name: 'use', // Command Name
      description: 'Utiliser un item.', // Description
      usage: '+use <item id>', // Usage
      botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
      userPerms: [], // User permissions needed to run command. Leave empty if nothing.
      aliases: ['utiliser','used'], // Aliases 
      bankSpace: 3, // Amount of bank space to give when command is used.
      cooldown: 5 // Command Cooldown
  }