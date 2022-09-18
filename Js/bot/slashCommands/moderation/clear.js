module.exports = {
    name: "clear",
    description: "Description will be in sub_commands",
    cooldown: 5,
    options: [
        {
            type: "SUB_COMMAND",
            name: "messages",
            description: "⭕️ Clear a specific amount of messages",
            options: [
                {
                    name: "amount",
                    description: "🚫 The amount of messages to delete",
                    type: "NUMBER",
                    required: false,
                }
            ],
        },

        {
            type: "SUB_COMMAND",
            name: "invites",
            description: "⭕️ Clear messages which contain an invite",
            options: [
                {
                    name: "amount",
                    description: "🚫 The amount of invites to delete",
                    type: "NUMBER",
                    required: false,
                }
            ],
        },

        {
            type: "SUB_COMMAND",
            name: "user",
            description: "⭕️ Clear a specific amount of messages from a certain user",
            options: [
                {
                    name: "user",
                    description: "👤 The user which messages will be deleted",
                    type: "USER",
                    required: true,
                },

                {
                    name: "amount",
                    description: "🚫 The amount of messages to delete",
                    type: "NUMBER",
                    required: false,
                }
            ],
        },
    ],

    run: async (bot, interaction, args) => {

        if (args[0] == 'messages') {
            if (!args[1]) {
                let amount = 50
            }
        }

    }
};