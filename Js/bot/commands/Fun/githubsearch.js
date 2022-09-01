const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {
      const user = args.join(' ')
      if(!user) return message.channel.send(':warning: Invalid github user')
      const url = `https://api.github.com/users/${user}`
      let response
        try{
            response = await fetch(url).then(res => res.json())
        }
        catch(e) {
            return message.reply(':x: An undefined error join the battle (Terminal crashed in the battle). Please try later')
        }
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${response.login}`)
        .setURL(response.html_url)
        .setThumbnail(response.avatar_url)
        .setDescription(response.bio ? response.bio : ':warning: The user have any bio')
        .addField('📂 Public Repositories:', response.public_repos.toLocaleString())
        .addField('👥 Followers:', response.followers.toLocaleString())
        .addField('👤 Following:', response.following.toLocaleString()) 
        .addField('🏭 Company:', response.company ? response.company : 'No Company')
        .addField('🏠 Location:', response.location ? response.location : 'No Location')
        message.channel.send({embeds: [embed]})
    }


module.exports.config = {
    name: 'githubsearch', // Command Name
    description: 'Send github user inforamtions embed', // Description
    usage: '+githubsearch <github username>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['gitsearch','gs','gituser','gu'], // Aliases 
    cooldown: 5 // Command Cooldown
}