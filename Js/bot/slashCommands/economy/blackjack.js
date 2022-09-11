
const { MessageEmbed } = require('discord.js')

const x = `❌`
    
    
module.exports = {
    name: "blackjack",
    description: "🃏 Bet your money in a blackjack party",
    bankSpace: 10,
    cooldown: 5,
    options: [

        {
            name: "bet",
            description: '💸 The amount of money you want to bet',
            type: "NUMBER",
            required: true,
        }

    ],

    run: async (bot, interaction, args) => {    
    
    const userData = await bot.fetchUser(interaction.user.id);
    const member = interaction.member || interaction.user;
    let betAmount = 0;

    
    betAmount = parseInt(args[0]);

    let passivewarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${member.user.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
    
    if (userData.passive == true) return interaction.followUp({embeds: [passivewarn]});


    if (!betAmount || betAmount < 1 || betAmount > userData) {
    let numbererrorembed = new MessageEmbed()
    .setColor("RED")
    .setTitle(`❌ Error!`)
    .setDescription(`<@${member.id}> : The sum of the bet should be a number or superior at 0`);
        return interaction.followUp({embeds: [numbererrorembed]}).catch();
        //return message.channel.send('That\'s not a number.');
    return
    }

    if (!userData) {
    let moneyerrorembed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`❌ Error!`)
        .setDescription(`<@${member.id}> : Your id is bugged in my database, sorry about this we will restore your account very soon.`);
    return interaction.followUp({embeds: [moneyerrorembed]}).catch();
    }
    if (betAmount > userData.coinsInWallet) {
    let moneywarn = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`:warning: <@${member.id}> : You can't afford that : https://www.youtube.com/watch?v=aIVsz5Pj0eE || You currently have ${userData.coinsInWallet} :coin: (You need).`);

    return interaction.followUp({embeds: [moneywarn]});
    }
    if (betAmount < 200) {
    let coinmin = new MessageEmbed()
    .setColor("RED")
    .setDescription(`${x} <@${member.id}> : The minimum you can bet is \`200\` :coin:.`);

    return interaction.followUp({embeds: [coinmin]});
    }

    if (betAmount > 20000) {
        let coinmin = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${x} <@${member.id}> : Sorry but I can't handle \`${args[0]}\` :coin:.`);
    
        return interaction.followUp({embeds: [coinmin]});
    }    

    var numCardsPulled = 0;
    var gameOver = false;

    var player = {
        cards: [],
        score: 0
    };
    var dealer = {
        cards: [],
        score: 0
    };

    function getCardsValue(a) {
        var cardArray = [],
            sum = 0,
            i = 0,
            dk = 10.5,
            doubleking = "QQ",
            aceCount = 0;
        cardArray = a;
        for (i; i < cardArray.length; i += 1) {
            if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
                sum += 10;
            } else if (cardArray[i].rank === "A") {
                sum += 11;
                aceCount += 1;
            } else if (cardArray[i].rank === doubleking) {
                sum += dk
            } else {
                sum += cardArray[i].rank;
            }
        }
        while (aceCount > 0 && sum > 21) {
            sum -= 10;
            aceCount -= 1;
        }
        return sum;
    }

    var deck = {
        deckArray: [],
        initialize: function() {
            var suitArray, rankArray, s, r, n;
            suitArray = ["clubs", "diamonds", "hearts", "spades"];
            rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
            n = 13;
            for (s = 0; s < suitArray.length; s += 1) {
                for (r = 0; r < rankArray.length; r += 1) {
                    this.deckArray[s * n + r] = {
                        rank: rankArray[r],
                        suit: suitArray[s]
                    };
                }
            }
        },
        shuffle: function() {
            var temp, i, rnd;
            for (i = 0; i < this.deckArray.length; i += 1) {
                rnd = Math.floor(Math.random() * this.deckArray.length);
                temp = this.deckArray[i];
                this.deckArray[i] = this.deckArray[rnd];
                this.deckArray[rnd] = temp;
            }
        }
    };

    deck.initialize();
    deck.shuffle();

    async function bet(outcome) {
        if (outcome === "win") {
        const wonCoins = parseInt(betAmount + (betAmount * 0.15));
        userData.coinsInWallet += parseInt(wonCoins);
        await userData.save();
        }
        if (outcome === "lose") {
        const lostCoins = (betAmount);
        userData.coinsInWallet -= parseInt(betAmount);
        await userData.save();
        }
    }

    function resetGame() {
        numCardsPulled = 0;
        player.cards = [];
        dealer.cards = [];
        player.score = 0;
        dealer.score = 0;
        deck.initialize();
    }

    function endMsg(title, msg, dealerC) {
        let cardsMsg = "";
        player.cards.forEach(function(card) {
            cardsMsg += "[" + card.rank.toString();
            if (card.suit == "hearts") cardsMsg += "♥"
            if (card.suit == "diamonds") cardsMsg += "♦"
            if (card.suit == "spades") cardsMsg += "♠"
            if (card.suit == "clubs") cardsMsg += "♣"
            cardsMsg += "]"
        });
        cardsMsg += "\n**Total** : " + player.score.toString()

        let dealerMsg = "";
        if (!dealerC) {
            dealerMsg = "[" + dealer.cards[0].rank.toString();
            if (dealer.cards[0].suit == "hearts") dealerMsg += "♥"
            if (dealer.cards[0].suit == "diamonds") dealerMsg += "♦"
            if (dealer.cards[0].suit == "spades") dealerMsg += "♠"
            if (dealer.cards[0].suit == "clubs") dealerMsg += "♣"
            dealerMsg += " ? ?]"
        } else {
            dealerMsg = "";
            dealer.cards.forEach(function(card) {
                dealerMsg += "[" + card.rank.toString();
                if (card.suit == "hearts") dealerMsg += "♥️"
                if (card.suit == "diamonds") dealerMsg += ":diamonds:"
                if (card.suit == "spades") dealerMsg += ":spades:"
                if (card.suit == "clubs") dealerMsg += ":clubs:"
                dealerMsg += "]"
            });
            dealerMsg += "\n**Total** : " + dealer.score.toString()
        }

        const gambleEmbed = new MessageEmbed()
            .setColor('#dd2de0')
            .setTitle(interaction.user.username + ` Blackjack` )
            .addField('🃏 Your cards', cardsMsg)
            .addField('🂠 Dealer cards', dealerMsg)
            .addField(title, msg)
            .setThumbnail(member.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
            .setFooter(interaction.guild.name,interaction.guild.iconURL());

            interaction.followUp({embeds: [gambleEmbed]});
    }

    async function endGame() {
        if (player.score === 21) {
            bet('win');
            gameOver = true;
            await endMsg("You win", `👑 You have 21! Winner! (You won \`${parseInt(betAmount + (betAmount * 0.15))}\` :coin:)`, true)
        }
        if (player.score > 21) {
            bet('lose');
            gameOver = true;
            await endMsg("You lost", `😭 You have more than 21 off-side (You lost \`${betAmount}\` :coin:)`, true)
        }
        if (dealer.score === 21) {
            bet('lose');
            gameOver = true;
            await endMsg("You lost", `😭 The dealer had 21 (You lost \`${betAmount}\` :coin:)`, true)
        }
        if (dealer.score > 21) {
            bet('win');
            gameOver = true;
            await endMsg("You win", `👑 Dealer off-side! Winner! (You won \`${parseInt(betAmount + (betAmount * 0.15))}\` :coin:)`, true)
        }
        if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
            bet('win');
            gameOver = true;
            await endMsg("You win", `👑 The dealer stands on 17 or more and still hasn't gotten a score higher than you. Winner! (You won \`${parseInt(betAmount + (betAmount * 0.15))}\` :coin:)`, true)
        }
        if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
            bet('lose');
            gameOver = true;
            await endMsg("You lost", `😭 The dealer won (You lost \`${betAmount}\` :coin:)`, true)
        }
        if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
            gameOver = true;
            await endMsg("The dealer score is equal to your score", "😓 Draw!", true)
        }
    }

    function dealerDraw() {

        dealer.cards.push(deck.deckArray[numCardsPulled]);
        dealer.score = getCardsValue(dealer.cards);
        numCardsPulled += 1;
    }

    function newGame() {
        hit();
        hit();
        dealerDraw();
        endGame();
    }

    function hit() {
        player.cards.push(deck.deckArray[numCardsPulled]);  // END Javascript blackjack game from echohatch1. Modified by Brandon-The-Dev for Hydra+
        player.score = getCardsValue(player.cards);

        numCardsPulled += 1;
        if (numCardsPulled > 2) {
            endGame();
        }
    }

    function stand() {
        while (dealer.score < 17) {
            dealerDraw();
        }
        endGame();
    }


    newGame();
    async function loop() {
        if (gameOver) return;

        endMsg("Choices", "Hit = [\`h\`](https://bicyclecards.com/how-to-play/blackjack/#:~:text=When%20the%20dealer%20has%20served,point%20the%20dealer%20must%20stand.)  |  Stand = [\`s\`](https://bicyclecards.com/how-to-play/blackjack/#:~:text=When%20the%20dealer%20has%20served,point%20the%20dealer%20must%20stand.) but will you lose your bet ? ", false)

        let filter = m => m.member.id === interaction.member.id;
        let fcollected
        interaction.channel.awaitMessages({filter: filter ,max: 1,time: 25000,errors: ['time']}).then((collected) => {
            fcollected = collected.first()
            if (fcollected.content === "h" || fcollected.content.includes("H") ||fcollected.content.includes("Hit") || fcollected.content.includes("hit")) { // if (colour == "b" || colour.includes("black")) colour = 0;
                hit();
                loop();
                return
            } else if (fcollected.content === "s"  || fcollected.content.includes("S") ||fcollected.content.includes("Stand") || fcollected.content.includes("stand")) {
                stand();
                loop();
                return
            } else if (fcollected.content === "stop"  || fcollected.content.includes("cancel") ||fcollected.content.includes("Stop") || fcollected.content.includes("Cancel"))  {
                    let cancel = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} <@${member.id}> : You canceled the game. So you lost: **${betAmount.toLocaleString()}** :coin:`);
                    return interaction.followUp({embeds: [cancel]}).catch();
                bet("lose");
                return
            }
        }).catch(_ => {
            let timeout = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${x} <@${member.id}> : You took too long to choose so I dropped the time. You lost: **${betAmount.toLocaleString()}** :coin:`);
            return interaction.followUp({embeds: [timeout]}).catch();
            bet("lose");
            return
        })
    }

    await loop()
    }
}