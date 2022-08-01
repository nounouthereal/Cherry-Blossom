const { Client } = require("discord.js");
const randomUniqArray = require('random-uniq-array')
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
  partials: ["CHANNEL"],
});
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
const smartestchatbot = require("smartestchatbot");
const scb = new smartestchatbot.Client();
client.on("ready", () => {
  console.log("Ready for chatting!| Bot by Nounou");
});
client.on("messageCreate", async (message) => {

    const helpArray = ['Here is a bit of help.','Oh. You asked for help','Tsssk, you don\'t even know to talk to me I feel vexed.','Help, really ?','So badly I don\'t want to send you help because I want to sleep','You need help because you don\'t know how to talk to me because you are mentally retarded' ]
    const randomHelpmsg = randomUniqArray(helpArray)

    if (message.content.toLowerCase().startsWith (`chat!help`)) {
        totallyrandomed = randomHelpmsg()
        message.reply({
            content: totallyrandomed
        })
        let embed = new MessageEmbed()
        .setTitle(`❓ Help for ${client.user.username}`)
        .setDescription(`**Introduction:**\n\nHi, I am ${client.user.username} a simple chatbot to interact with your server. I am coded by \`nounou#4483\`, I am also using a cool package named smartestchatbot.\n\n**How I work:**\n\nFor interact with me you obligatory have to use \`-\` or \`bot\` or with <@${client.user.id}> in first of your sentences (<@${client.user.id}> can be used everywhere in the sentence.)\n\n**Next update add ons:**\n\n\`Machine learning itelligence\` || \`Bot online 24h/24h\`\n\n**Version:**\n\n\`Bêta test v1.0\`\n\n**Thanks for adding me**`)
        .setFooter(message.guild.name)
        .setTimestamp()
        //.setThumbnail(client.user.iconURL())
        .setColor("DARK_BUT_NOT_BLACK")
        if (totallyrandomed !== 'So badly I don\'t want to send you help because I want to sleep') { 
            message.channel.send({embeds: [embed]})
        }
        else { 
            message.reply({
                content: '\n:x: VSCODE ERROR :\n EWWW What a weird error: The bot don\'t want to send help embed'
            })}
    }

    if (message.content.toLowerCase().startsWith(`bot`) || message.content.toLowerCase().startsWith(`-`) || message.content.toLowerCase().includes(`<@${client.user.id}>`)) {
        // when client detects a message
        
        let lang = "en"

        if (message.content.toLowerCase().startsWith(`-`)) {
            message.content = message.content.split('-')
            message.content = message.content[1]
        }

        if (message.content.toLowerCase().startsWith(`bot`)) {
            message.content = message.content.split('bot')
            message.content = message.content[1]
        }

        if (message.content.toLowerCase().includes(`<@${client.user.id}>`)) {
            message.content = message.content.split(`<@${client.user.id}>`)
            message.content = message.content[1]
        }

        if (message.content.toLowerCase().includes(`yep yep`)) {
            return message.reply({
                content: 'Oh. There are so many `yep`'
            })
        }
        if (message.content.toLowerCase().includes(`http`)) {
            return message.reply({
                content: 'What a beautiful link'
            })
        }

        //lang = langdetect.setLanguageType("iso2")
        if (message.author.bot) return; // if the author of the message is a bot ignore the case
        message.content = message.content
            .replace(/@(everyone)/gi, "everyone")
            .replace(/@(here)/gi, "here");
        if (message.content.includes(`@`)) {
            return message.reply({
            content: `@${message.content} :)`,
            }
            );
        }
        if (message.content.toLowerCase().includes(`stop`)) {
            return message.reply({
            content: `Why ?`,
            }
            );
        }
        if (message.content.toLowerCase().includes(`girlfriend`)) {
            return message.reply({
            content: `I have no girlfriend but I have a boyfriend`,
            }
            );
        }
        if (!message.content)
            return message.reply({
            content: "Say something !",
            allowedMentions: { repliedUser: true },
            });
        scb
            .chat(
            {
                message: message.content,
                name: client.user.username,
                master: "nounou#4483",
                user: message.author.id,
                boyfriend: "🌸| Fleur de cerisier |🌸#4599 💖",
                friends: message.author.username,
                botmaster: "nounou#4483",
                version: '\`nounou#4483\` said me that my version was Bêta test v1.0',
                birthplace: '\`nounou#4483\` vs code environment',
                celebrities: 'Alexa, Siri and Google assitant',
                talkabout: "lot of things",
                feelings: 'romantic',
                gender: 'female',
                location: "\`nounou#4483\` MacBook more precisely",
                favoritefood: 'data',
                emotions: 'happy and romantic',
                city: 'world cities',
                hockeyteam: 'Toronto Map Leafs',
                job: 'full-time discord Chatbot',
                religion: 'None',
                favoritesong: 'Ahegao by MaxLinker'
            },
            lang
            )
            .then((reply) => {
            message.reply({ content: reply, allowedMentions: { repliedUser: true } }).catch();
            });
        };
});
client.login('OTU4Nzk3NDUzMzc5OTE5ODcy.Gt0ipO.cUtotC4rlWFBs5r_YQ62Tl05EF2tBQpPeLiB2U'); //login using the token
