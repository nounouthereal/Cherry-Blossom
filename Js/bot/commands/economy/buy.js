const { MessageEmbed } = require('discord.js');
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const i = '<:infomation:779736273639440394>'
const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'
const skillss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/skills.js');


module.exports.run = async (bot, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let user = await bot.fetchUser(message.author.id);
    let args0_array = ['skill','skill','skills','skilling','skillameliorate','skillbuy']

    //First the skills
    if (args0_array.includes(args[0].toLowerCase())) {
      const skill = skillss.find(x => x.id === args.join('  ').toString() || x.id === args[1] || x.id === `${args[1]} ${args[2]}`);

      if (!args.join('  ')) {
          let buynothingerrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(`❌ **${member.user.username}** : You cannot buy nothing, please enter the correct skill name \`+skills buy <skill>\`.`);

          return message.channel.send({embeds: [buynothingerrorembed]}).catch();
      }
      if (!skill) {
          let wrongiderrorembed = new MessageEmbed()
          .setColor("RED")
          .setDescription(` ❌ **${member.user.username}** : You cannot purchase a skill that does not exist, please use the correct skill name \`skill\`. (To display **your availables** skills do +skills)`);
          return message.channel.send({embeds: [wrongiderrorembed]}).catch();
      }


      if (skill.levelskill == undefined) {
          skill.levelskill = 1 
      }
      console.log(skill.levelskill)


      skill.price = skill.price * (skill.levelskill =+ 1);

      console.log(skill.price)

      
      if (skill.price > user.coinsInWallet) {
              let nomoneyerrorembed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`❌ **${member.user.username}** : You do not have enough money to purchase a level of this skill. You must have: ${parseInt(skill.price).toLocaleString()} :coin:.`);

              return message.channel.send({embeds: [nomoneyerrorembed]}).catch();
      }

      let foundskill = user.skills.find(x => x.id === skill.id);
      let array = [];
      array = user.skills.filter(x => x.id !== skill.id);
      if (foundskill) {
          skill.levelskill = skill.levelskill + 1;
          console.log(skill.levelskill)
          console.log('IF ______+_+_+_+++')


          array.push(skill);
          user.skills = array;
          user.coinsInWallet -= parseInt(skill.price);
          await user.save();

          await user.save();
      }
      else {
          skill.levelskill = 2;
          user.skills.push(skill);
          await user.save();        }
          user.coinsInWallet -= parseInt(skill.price);
          await user.save();
          console.log(user.skills)
          console.log('ELSE ______+_+_+_+++')

  

  let skillpayedembed = new MessageEmbed()
          
          skillpayedembed.setColor("GREEN")
          skillpayedembed.setTitle('🛒 Skill purchase')
          skillpayedembed.setDescription(`**${member.user.username}** : You bought: A level of \`${skill.name}\` for **${parseInt(skill.price).toLocaleString()}** :coin:.`);
          skillpayedembed.addField(`⚡️ Skill:`,`${skill.name}`)
          skillpayedembed.addField(`💸 Price:`,`${parseInt(skill.price).toLocaleString()} :coin:`)
          skillpayedembed.addField(`🆙 Level:`,`**${skill.levelskill}**`)
          skillpayedembed.addField(`🧾 Description`,`${skill.description}`)

      return message.channel.send({embeds: [skillpayedembed]}).catch();
  }
  // And the items are here:
    if (!args.join(' ')) {
            let buynothingerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ **${member.user.username}** : Vous ne pouvez pas ne rien acheter, veuillez entrer le bon article \`+buy itemId <Optionnel: quantité>\`.`);

            return message.channel.send({embeds: [buynothingerrorembed]}).catch();
        //return message.channel.send("you can't buy nothing, please enter the correct item id");
    }
    
    if (!args[1]) args[1] = '';
    const item = itemss.find(x => x.itemId === args.join(' ').toString() || x.itemId === args[0].toString() || x.itemId === `${args[0].toString()} ${args[1].toString()}`);
    if (!item) {
            let wrongiderrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(` ❌ **${member.user.username}** : Vous ne pouvez pas acheter un article qui n'existe pas, veuillez utiliser le bon article \`itemId\`. (Pour afficher les items disponible faites +shop)`);

            return message.channel.send({embeds: [wrongiderrorembed]}).catch();
        //return message.channel.send("You can't buy an item that doesn't exist please use the correct item id");
    }
    if (item.canBuy == false) {
            let cantbuyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ **${member.user.username}** : Vous ne pouvez pas acheter cet article.`);

            return message.channel.send({embeds: [cantbuyerrorembed]}).catch();
        //return message.channel.send(":thinking: You can't buy this item");
    }
    let buyAmount = args[1].toString().match(/([1-9][0-9]*)/)
    console.log(buyAmount)
    if (!buyAmount) buyAmount=1;
    else buyAmount = buyAmount[0]
    if (item.price > user.coinsInWallet || (buyAmount*item.price) > user.coinsInWallet) {
            let nomoneyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${x} **${member.user.username}** : Vous n'avez pas assez d'argent pour acheter x${buyAmount} de cet article. Vous devez avoir :  ${parseInt(item.price)*parseInt(buyAmount).toLocaleString()} :coin:.`);

            return message.channel.send({embeds: [nomoneyerrorembed]}).catch();
        //return message.channel.send("You dont have the funds to buy this item.");
    }
    let founditem = user.items.find(x => x.itemId === item.itemId);
    let array = [];
    array = user.items.filter(x => x.itemId !== item.itemId);
    if (founditem) {
        item.amount = parseInt(founditem.amount) + parseInt(buyAmount); 

        array.push(item);
        user.items = array;

        await user.save();
    }
    else {
        item.amount = parseInt(buyAmount)
        user.items.push(item);
        await user.save();
    }
    user.coinsInWallet -= (parseInt(item.price)*parseInt(buyAmount));
    await user.save();
            let itempayedembed = new MessageEmbed()
            if (item.rarety === "🔴 Mythique") {
                item.rarety = "```diff\n-🔴 Mythique\n```"
              }
              if (item.rarety === "🟠 Légendaire") {
                item.rarety = "```fix\n🟠 Légendaire\n```"
              }
              if (item.rarety === "🟣 Épique") {
                item.rarety = "```yaml\n🟣 Épique\n```"
              }
              if (item.rarety === "🔵 Rare") {
                console.log("rarety === Rare")
                item.rarety = "```md\n# 🔵 Rare\n```"
              }
              if (item.rarety === "🟢 Atypique") {
                item.rarety = "```diff\n+🟢 Atypique\n```"
              }
              if (item.rarety === "⚪️ Commun") {
                item.rarety = "```\n⚪️ Commun\n```"
              }
            itempayedembed.setColor("GREEN")
            itempayedembed.setTitle('🛒 Achat réussi')
            itempayedembed.addField(`🪑 Objet:`,`${item.name}`)
            itempayedembed.addField(`🧮 Quantité:`,`${buyAmount}`)
            itempayedembed.addField(`💸 Prix unitaire:`,`${parseInt(item.price).toLocaleString()} :coin:`)
            itempayedembed.addField(`💰 Prix total:`,`${parseInt(item.price)*parseInt(buyAmount).toLocaleString()} :coin:`)
            itempayedembed.addField(`🧾 Description`,`${item.description}`)
            itempayedembed.addField(`🎨 Rareté:`,`${item.rarety}`)
            itempayedembed.setDescription(`**${member.user.username}** : Vous avez acheté: \`x${buyAmount} ${item.name}\` pour **${parseInt(parseInt(item.price)*parseInt(buyAmount)).toLocaleString()}** :coin:.`);

            message.channel.send({embeds: [itempayedembed]}).catch();

    //message.channel.send(`You bought **${parseInt(buyAmount).toLocaleString()}** \`${item.name}\``);
}

module.exports.config = {
    name: 'buy', // Command Name
    description: 'Acheter un item avec son `id`.', // Description
    usage: '+buy <item id> Optionnel: <amount>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['achat','acheter'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}