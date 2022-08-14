const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const tick = '<:bigtick:779736050892931082>'
const cd = ':warning:'
const skillss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/skills.js');


module.exports.run = async (bot, message, args) => {

    let user = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


    let args0_array = ['buy','achat','buying','acheter','ameliorate','levelup']



    if (args0_array.includes(args[0])) {
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

        }
        else {
            skill.levelskill = 2;
            user.skills.push(skill);
            user.coinsInWallet -= parseInt(skill.price);
            await user.save();
            console.log(user.skills)
            console.log('ELSE ______+_+_+_+++')
        }

    

    let skillpayedembed = new MessageEmbed()
            
            skillpayedembed.setColor("GREEN")
            skillpayedembed.setTitle('🛒 Skill purchase')
            skillpayedembed.setDescription(`**${member.user.username}** : You bought: A level of \`${skill.name}\` for **${parseInt(skill.price).toLocaleString()}** :coin:.`);
            skillpayedembed.addField(`⚡️ Skill:`,`${skill.name}`)
            skillpayedembed.addField(`💸 Price:`,`${parseInt(skill.price, 10).toLocaleString()} :coin:`)
            skillpayedembed.addField(`🆙 Level:`,`**${skill.levelskill}**`)
            skillpayedembed.addField(`🧾 Description`,`${skill.description}`) 
  
        message.channel.send({embeds: [skillpayedembed]}).catch();
    }

    else {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const user = await bot.fetchUser(message.author.id);
        let avatar = message.author.displayAvatarURL({ size: 1024, dynamic: true });
        let guildname = message.guild.name
        const userData = await bot.fetchUser(message.author.id);

        console.log(user.skills)
        

        let skillValues = Object.values(user.skills);
        console.log('skillValues of user ' + user.name + ' : ');
        console.log(skillValues);

        const speedskill = skillss.find(x => x.id === `speed`);
        const smartskill = skillss.find(x => x.id === `intelligence`);
        const stregthskill = skillss.find(x => x.id === `strength`);




        if (user.skills.length <= 0) {
            const NoskillEmbed = new MessageEmbed()
            .setAuthor(`⚡️ Skills of ${message.author.username}`, avatar)
            .addField(`💪 Strength skill: **1**`,`*This skill provides access to works or actions that require strength*`)
            .addField(`:man_running: Speed skill: **1**`,`*This skill provides access to works or actions that require speed*`)
            .addField(`🧠 Intelligence skill: **1**`,`*This skill provides access to works or actions that require intelligence*`)
            .setFooter(`${guildname} (Fleur de cerisier version Bêta)`,message.guild.iconURL())
            .setTimestamp()
            .setColor("#57c478");
            return message.channel.send({embeds: [NoskillEmbed]});
        }
            


        const embed = new MessageEmbed()
        skillValues.forEach((skillValue) => {
        
        embed.addField(`${skillValue.name} skill: **${skillValue.levelskill}**`,`*${skillValue.description}*`)
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