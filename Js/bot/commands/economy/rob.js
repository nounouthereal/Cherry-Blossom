const { MessageEmbed, Message } = require('discord.js');

const ms = require('ms')

module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    const user = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' ')) || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(' ').toString().toLowerCase());

    if ((Date.parse(user.dailyStreak) + 10800000) > Date.now()) { // Change time after tests
        const embed = new MessageEmbed()
            .setDescription(`:warning: <@${message.author.id}> : You already robbed someone recently.\nYou have to wait \`${ms((Date.parse(user.dailyStreak) + 10800000) - Date.now())}\` before to rob again someone.\nThe default cooldown is \`3 hours (3h)\`.`)
            .setColor('#FFA500');
        return message.channel.send({embeds: [embed]});
    } else {
        
      
    
  
  
    let passivewarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${usertag.user.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
  
    if (user.passive == true) return message.channel.send({embeds: [passivewarn]});

    let authorwarn = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${usertag.user.id}> : You cannot rob yourself.`);
  
    if (member.id == message.author.id) return message.channel.send({embeds: [authorwarn]});
  
    if (!member) {
      
    let rob1embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${usertag.user.id}> : Please enter a correct member to rob.`);
    return message.channel.send({embeds: [rob1embed]});
    }

    
    const devs = ['901071562386583596'];

    if (devs.includes(member.user.id)) {
      
    let rob2embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`🛡 <@${usertag.user.id}> : You can't rob the bot devs`);
    return message.channel.send({embeds: [rob2embed]});
    }
    
    const robbedUser = await bot.fetchUser(member.id);
    if (robbedUser.passive == true) {
      
    let rob3embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ <@${usertag.user.id}> : The member you are trying to rob have passive: \`ENABLED\`.`);
    return message.channel.send({embeds: [rob3embed]});
      //return message.channel.send(`Leave them alone... they are in passive mode`);
    }

    if (robbedUser.coinsInWallet < 10000) {
    let rob4embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`🛡 <@${usertag.user.id}> : The user you tried to steal has protections on their balance at the moment because they have a balance of less than \`10 000\` :coin:.`);
    return message.channel.send({embeds: [rob4embed]});
        //return message.channel.send("This user doesn't have much coins, I wouldn't rob them");
    }

    if (user.coinsInWallet < 1000) {
        let rob4embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`🛡 <@${usertag.user.id}> : You must have at least balance of \`1000\` :coin:.`);
        return message.channel.send({embeds: [rob4embed]});
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
        const random2 = Math.round(Math.random() * 1);

        let random_percent =  Math.floor(Math.random() * 7) //To 15 or 10 percent if he is in a criminal society

        if (random_percent == 0) {
            random_percent = 1
        }

        const randomAmount = Math.round(random_percent / 100 * robbedUser.coinsInWallet);

        console.log(random2 + '  ' + randomAmount)
    

        if (random2 === 1) {


            user.coinsInWallet -= randomAmount 
            robbedUser.coinsInWallet += randomAmount;

            await user.save();
            await robbedUser.save();

            user.save().then(user.dailyStreak = new Date(Date.now()))


            let rob5embed = new MessageEmbed()
              .setColor("BLUE")
              .setTitle(`💸 Robbery result:`)
              .setDescription(`🛡 <@${usertag.user.id}> : You tried to steal <@${member.user.id}> and you got arrested 👮! You paid a bail of \`${randomAmount.toLocaleString()}\` :coin:.`)
              .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
              .setTimestamp()

            let robb7emb = new MessageEmbed()
              .setColor("WHITE")
              .setDescription(`🛡 <@${usertag.user.id}> : **${message.author.tag}** tried to rob you and was arrested 👮! He paid you a bail of \`${randomAmount.toLocaleString()}\` :coin:.`)
              .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
              .setTimestamp()
              member.send({embeds: [robb7emb]})
            return message.channel.send({embeds: [rob5embed]});

            //return message.channel.send(`You tried to rob **${member.user.tag}** but got caught👮! Better luck next time.`);
        }

        else if (random2 === 0) {

            user.coinsInWallet += randomAmount;
            robbedUser.coinsInWallet -= randomAmount;

            await user.save();
            await robbedUser.save();

            let rob6embed = new MessageEmbed()
              .setColor("GREEN")
              .setTitle(`💸 Robbery result:`)
              .setDescription(`🥷 <@${usertag.user.id}> : You robbed \`${randomAmount.toLocaleString()}\` :coin: to <@${member.id}>!`)
              .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
              .setTimestamp()
              message.channel.send({embeds: [rob6embed]});

              let rob7embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`🥷 <@${usertag.user.id}> : You had been robbed \`${randomAmount.toLocaleString()}\` :coin: by ${member.tag} !`)
              .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
              .setTimestamp()
              member.send({embeds: [rob7embed]});

            user.save().then(user.dailyStreak = new Date(Date.now()))



        }
    }


    let array = robbedUser.items.filter(x => x.itemId !== 'padlock');
    const padlock = robbedUser.items.find(x => x.itemId === 'padlock');


    if (padlock) { 
        let rob6embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`💸 Robbery result:`)
            .setDescription(`🛡 <@${usertag.user.id}> : You tried to steal **${member.user.tag}**, but he had a 🔒 **Padlock**. Try again next time.`)
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            message.channel.send({embeds:[rob6embed]});

        user.save().then(user.dailyStreak = new Date(Date.now()))
      
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
  }


}

module.exports.config = {
    name: 'rob', // Command Name
    description: '🥷 Steal someones money and get the possibility possibly get rich.', // Description
    usage: '+rob @member', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 3 // Command Cooldown
}