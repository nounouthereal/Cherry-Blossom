const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require("discord.js");
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
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
              .setDescription(`❌ **${member.user.username}** : Vous ne possédez pas de \`PICKAXE\`, vous devez en acheter un pour utiliser cette commande.`);
              return message.channel.send({embeds: [use3embed]});
        //////return message.channel.send("you don't have this item");
    }
  
  

const randomMessage = [
  'd','d','d','d','d',
  'r','r','r','r',
  'g','g','g',
  'a','a',
  'p',
  'missed','missed','missed','missed'
    ];
  
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
  
    const userData = await bot.fetchUser(message.author.id);
    
    if (response == 'd') {
        
        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embeddiamond = new MessageEmbed()
        .setDescription(`⛏ **${member.user.username}** : Vous êtes allé miner et êtes revenu avec **${Amount}** x Diamants brute ${hd}.`)
        .setColor("GREEN")
        message.channel.send({embeds: [Embeddiamond]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'diamond');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'diamond');
        if (findItem) {
            userInv.push({ itemId: 'diamond', amount: (findItem.amount + Amount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'diamond', amount: Amount});
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'r') {        
        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedruby = new MessageEmbed()
        .setDescription(`⛏ **${member.user.username}** : Vous êtes allé miner et êtes revenu avec **${Amount}** x Rubis ${hr}.`)
        .setColor("GREEN")
        message.channel.send({embeds: [Embedruby]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'ruby');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'ruby');
        if (findItem) {
            userInv.push({ itemId: 'ruby', amount: (findItem.amount + Amount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'ruby', amount: Amount});
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'g') {

        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedgade = new MessageEmbed()
        .setDescription(`⛏ **${member.user.username}** : Vous êtes allé miner et êtes revenu avec **${Amount}** x Pierre de jade(s) ${hg}.`)
        .setColor("GREEN")
        message.channel.send({embeds: [Embedgade]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'gade');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'gade');
        if (findItem) {
            userInv.push({ itemId: 'gade', amount: (findItem.amount + Amount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'gade', amount: Amount});
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'a') {

        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedveryrare = new MessageEmbed()
        .setDescription(`⛏ **${member.user.username}** : Vous êtes allé miner et êtes revenu avec x**${Amount}** Saphir ${ha}.`)
        .setColor("GREEN")
        message.channel.send({embeds: [Embedveryrare]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'saphir');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'saphir');
        if (findItem) {
            userInv.push({ itemId: 'saphir', amount: (findItem.amount + Amount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'saphir', amount: Amount});
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'p') {

        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedled = new MessageEmbed()
        .setDescription(`⛏ **${member.user.username}** : Vous êtes allé miner et êtes revenu avec **${Amount}** x Pierre précieuses ${hp}.`)
        .setColor("GREEN")
        message.channel.send({embeds: [Embedled]});
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'precious');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'precious');
        if (findItem) {
            userInv.push({ itemId: 'precious', amount: (findItem.amount + Amount)});
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'precious', amount: Amount});
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'missed') {
        const Embedmissed = new MessageEmbed()
        .setDescription(`⛏ **${member.user.username}** : Vous êtes allé miner et vous avez trouvé aucune pierre précieuse.`)
        .setColor("RED")
        message.channel.send({embeds: [Embedmissed]});
        }
}
module.exports.config = {
    name: 'mine', // Command Name
    description: 'use your pickaxe to find gems.', // Description
    usage: '+mine', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['minage'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 360// Command Cooldown
}
