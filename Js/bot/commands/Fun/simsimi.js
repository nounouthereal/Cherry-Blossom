const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {
    const text = args.join(' ')
            if(!text) return message.channel.send('Usage: `+simsimi <text>`')
            const url = `https://tuanxuong.com/api/simsimi/index.php?text=${encodeURIComponent(text)}` //tks lanh han seola
            let response
            try{
                response = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply(':x: An undefined error join the battle (Terminal crashed in the battle). Please try later')
            }
            message.reply(`<:simsimi:1007678657407504548> : ${response.response}`)
    }


module.exports.config = {
    name: 'simsimi', // Command Name
    description: 'Send the simsimi response of what you asked', // Description
    usage: '+simsimi <text>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['sim','simi'], // Aliases 
    cooldown: 5 // Command Cooldown
}