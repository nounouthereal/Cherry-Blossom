const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "rob",
    description: "",
    timeout: 5000,
    options: [

        {
            name: "user",
            description: '💳 The user balance',
            type: "USER",
            required: true,
        }

    ],


    run: async (bot, interaction, args) => {

        

    }
}