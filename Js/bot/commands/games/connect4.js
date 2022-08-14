const { MessageEmbed } = require('discord.js')

const { ConnectFour } = require('djs-games');





module.exports.run = async (bot, message, args) => {

    const game = new ConnectFour({
        message: message,
        player1: '🔴',
        player2: '🔵',
      })
      game.start()
}


module.exports.config = {
    name: 'connect4', // Command Name
    description: 'Create, play, fisnish a connect4 game', // Description
    usage: '+connect4', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['connectfour','4connect'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}