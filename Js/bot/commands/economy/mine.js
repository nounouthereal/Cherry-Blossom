const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require("discord.js");
const hd = '<:diamond:996751128391852052>'
const hr = '<:rubis:996751140874113105>'
const hg = '<:gade:996751131957018705>'
const ha = '<:saphir:996751134704279582>'
const hp = '<:precious:996751142639915008>'

module.exports.run = async (bot, message, args) => {
  let user = await bot.fetchUser(message.author.id);
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


const item = itemss.find(x => x.itemId.toLowerCase() === 'pickaxe');  
let founditem = user.items.find(x => x.itemId.toLowerCase() === 'pickaxe');
    let array = [];
    array = user.items.filter(x => x.itemId !== 'pickaxe');
    if (!founditem) {
              let use3embed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`❌ <@${member.user.id}> : You don't have a \`PICKAXE\`, you must buy one to use this command.  (\`+buy pickaxe\`)`);
              return message.channel.send({embeds: [use3embed]});
        //////return message.channel.send("you don't have this item");
    }
  
  

const randomMessage = [
  'd','d','d','d','d',
  'g','g','g','g',
  'a','a','a',
  'r','r',
  'p',
  'missed','missed','missed','missed'
    ];
  
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
  
    const userData = await bot.fetchUser(message.author.id);
    
    if (response == 'd') {
        
        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embeddiamond = new MessageEmbed()
        .setDescription(`⛏ <@${member.user.id}> : You went mining and came back with **x${Amount}** Rough Diamonds ${hd}.`)
        .setColor("WHITE")
        message.channel.send({embeds: [Embeddiamond]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'diamond');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'diamond');
        const findInItems = itemss.find(i => i.itemId == 'diamond');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
    
    } 
    else if (response == 'a') {

        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedveryrare = new MessageEmbed()
        .setDescription(`⛏ <@${member.user.id}> : You went mining and came back with **x${Amount}** Uncommon Sapphire ${ha}.`)
        .setColor("GREEN")
        message.channel.send({embeds: [Embedveryrare]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'saphir');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'saphir');
        const findInItems = itemss.find(i => i.itemId == 'saphir');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
    }
     else if (response == 'g') {

        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedgade = new MessageEmbed()
        .setDescription(`⛏ <@${member.user.id}> : You went mining and came back with **x${Amount}** Uncommon Jade ${hg}.`)
        .setColor("GREEN")
        message.channel.send({embeds: [Embedgade]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'gade');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'gade');
        const findInItems = itemss.find(i => i.itemId == 'gade');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }

        }

        else if (response == 'a') {

            const Amount = Math.round(Math.random() * 1) + 1;
            const data = await bot.fetchUser(message.author.id);
            const Embedveryrare = new MessageEmbed()
            .setDescription(`⛏ <@${member.user.id}> : You went mining and came back with **x${Amount}** Rare Sapphire ${ha}.`)
            .setColor("BLUE")
            message.channel.send({embeds: [Embedveryrare]});
            const findItem = data.items.find(i => i.itemId.toLowerCase() == 'saphir');
            let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'saphir');
            const findInItems = itemss.find(i => i.itemId == 'saphir');
    
            console.log(findInItems)
    
            if (findItem) {
                findInItems.amount = findInItems.amount + Amount
                userInv.push(findInItems);
                data.items = userInv;
                await data.save();
            } else {
                findInItems.amount = Amount
                userInv.push(findInItems);
                data.items = userInv;
                await data.save();
            }
        }

        else if (response == 'r') {        
            const Amount = Math.round(Math.random() * 1) + 1;
            const data = await bot.fetchUser(message.author.id);
            const Embedruby = new MessageEmbed()
            .setDescription(`⛏ <@${member.user.id}> : You went mining and came back with **x${Amount}** Epic Ruby ${hr}.`)
            .setColor("PURPLE")
            message.channel.send({embeds: [Embedruby]});
            const findItem = data.items.find(i => i.itemId.toLowerCase() == 'ruby');
            let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'ruby');
            const findInItems = itemss.find(i => i.itemId == 'ruby');
    
            console.log(findInItems)
    
            if (findItem) {
                findInItems.amount = findInItems.amount + Amount
                userInv.push(findInItems);
                data.items = userInv;
                await data.save();
            } else {
                findInItems.amount = Amount
                userInv.push(findInItems);
                data.items = userInv;
                await data.save();
            }
        }
        else if (response == 'p') {

        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedled = new MessageEmbed()
        .setDescription(`⛏ <@${member.user.id}> : You went mining and came back with **x${Amount}** Legendary Extra Gemstone(s) ${hp}.`)
        .setColor("ORANGE")
        message.channel.send({embeds: [Embedled]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'precious');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'precious');
        const findInItems = itemss.find(i => i.itemId == 'precious');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'missed') {
        const Embedmissed = new MessageEmbed()
        .setDescription(`⛏ <@${member.user.id}> : You went mining and found no gems.`)
        .setColor("BLACK")
        message.channel.send({embeds: [Embedmissed]});
        }
}
module.exports.config = {
    name: 'mine', // Command Name
    description: 'Use your pickaxe and try to find the best one', // Description
    usage: '+mine', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['mi','dig'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 2// Command Cooldown
}
