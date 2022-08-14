const { Calculator } = require('weky');


module.exports.run = async (bot, message, args) => {

    await Calculator({
        message: message,
        embed: {
            title: '♾ Calculator',
            color: '#5865F2',
            footer: `${message.guild} • Asked by : ${message.member.displayName} || Original project: Weky Devlopment`,
            timestamp: true,
        },
        disabledQuery: '❌ Sorry, but calculator has been disabled',
        invalidQuery: '⚠️ The provided equation is invalid!',
        othersMessage: '❌ Only <@{{author}}> can use the buttons!',
    });
}


module.exports.config = {
    name: 'calculator', // Command Name
    description: '♾ We all love mathematics, no ?', // Description
    usage: '+calculator', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['calc','pda'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}