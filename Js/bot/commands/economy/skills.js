const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const tick = '<:bigtick:779736050892931082>'
const cd = ':warning:'
const skillss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/skills.js');


module.exports.run = async (bot, message, args) => {

    let user = await bot.fetchUser(message.author.id);

    console.log(user.skills)
    let args0_array = ['buy','achat','buying','acheter']


    if (args[0] != null && args[0].includes(args0_array) || args[0] != undefined && args[0].includes(args0_array)) {
        const skill = skillss.find(x => x.id === args.join('  ').toString() || x.id === args[1].toString() || x.id === `${args[1].toString()} ${args[2].toString()}`);

        if (!args.join('  ')) {
            let buynothingerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ **${member.user.username}** : You cannot buy nothing, please enter the correct skill name \`+skills buy <skill>\`.`);

            return message.channel.send({embeds: [buynothingerrorembed]}).catch();
        }
        if (!skill) {
            let wrongiderrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(` ❌ **${wrongiderrorembed}** : You cannot purchase a skill that does not exist, please use the correct skill name \`skill\`. (To display available skills do +skills)`);
        }


        if (skill.levelskill == undefined) {
            skill.levelskill = 1 
        }
        console.log(skill.levelskill)

        skill.price = skill.price * skill.levelskill

        
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

            array.push(skill);
            user.skills = array;

            await user.save();
        }
        else {
            skill.levelskill = skill.levelskill;
            user.skills.push(skill);
            await user.save();
        }
        user.coinsInWallet -= parseInt(skill.price);
        await user.save();
        console.log(user.skills)
    

    let skillpayedembed = new MessageEmbed()
            
            skillpayedembed.setColor("GREEN")
            skillpayedembed.setTitle('🛒 Skill purchase')
            skillpayedembed.addField(`⚡️ Skill:`,`${skill.name}`)
            skillpayedembed.addField(`💸 Price:`,`${parseInt(skill.price).toLocaleString()} :coin:`)
            skillpayedembed.addField(`🧾 Description`,`${skill.description}`)
            skillpayedembed.setDescription(`**${member.user.username}** : You bought: A level of \`${skill.name}\` for **${parseInt(skill.price).toLocaleString()}** :coin:.`);
  
        message.channel.send({embeds: [skillpayedembed]}).catch();
    }

    else {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const user = await bot.fetchUser(message.author.id);
        let avatar = message.author.displayAvatarURL({ size: 1024, dynamic: true });
        let guildname = message.guild.name
        const userData = await bot.fetchUser(message.author.id);
        
        if (user.skills.length < 1) {
            return message.channel.send(':x: Fatal error skills cannot be recovered.');
        }

        let skillValues = Object.values(user.skills);
        console.log('skillValues of user ' + member.user.name + ' : ');
        console.log(skillValues);


        const embed = new MessageEmbed()
        skillValues.forEach((skillValue) => {
        if (skillValue.levelskill > 0 || skillValue.levelskill == null || skillValue.levelskill == undefined || skillValue.levelskill  == '') {
            skillValue.levelskill = 1
        }
        embed.addField(`${skillValue.name} skill:`,`**Level:**\n${skillValue.levelskill}\n\n**Description:**\n*${skillValue.description}*`)
    });


        embed.setAuthor(`⚡️ Skills of ${message.author.username}`, avatar)
        embed.setFooter(guildname,message.guild.iconURL())
        .setTimestamp()
        embed.setColor("#57c478");
        message.channel.send({embeds: [embed]});
    }
    
}

module.exports.config = {
    name: 'skills', // Command Name
    description: 'Show or buy skills.', // Description
    usage: '+skills Option: buy <skill>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['skill','skilling','capacité','capacite'], // Aliases 
    bankSpace: 10, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}