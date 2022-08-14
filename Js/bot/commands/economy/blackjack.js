const { MessageEmbed } = require('discord.js');
const i = '<:infomation:779736273639440394>'
const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'
const pa = "Hors banque"

module.exports.run = async (bot, message, args, ) => {
        const userData = await bot.fetchUser(message.author.id);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let betAmount = 0;
  
        if (args[0] === 'all' || args[0] === 'max') {
            betAmount = userData.coinsInWallet;
        } else {
            betAmount = parseInt(args[0]);
        }

        if (!betAmount || betAmount < 1 || betAmount > userData) {
          let numbererrorembed = new MessageEmbed()
          .setColor("RED")
          .setTitle(`❌ Erreur!`)
          .setDescription(`**${member.user.username}** : La somme du pari est indéfini ou n'est pas un nombre.`);
            return message.channel.send({embeds: [numbererrorembed]}).catch();
            //return message.channel.send('That\'s not a number.');
          return
        }

        if (!userData) {
          let moneyerrorembed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`❌ Erreur!`)
            .setDescription(`**${member.user.username}** : Your id is bugged in my database, sorry about this we will restore your account.`);
          return message.channel.send({embeds: [moneyerrorembed]}).catch();
        }
      if (betAmount > userData.coinsInWallet) {
      let moneywarn = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`:warning: **${member.user.username}** : Vous n'avez pas assez de thunes : https://www.youtube.com/watch?v=aIVsz5Pj0eE || Votre montant ${userData.coinsInWallet} :dollar: (${pa}).`);

           return message.channel.send({embeds: [moneywarn]});
           }
  if (betAmount < 200) {
  let coinmin = new MessageEmbed()
    .setColor("RED")
    .setDescription(`${x} **${member.user.username}** : Le minimum que vous pouvez jouer est de \`200\` :coin:.`);

  return message.channel.send({embeds: [coinmin]});
  }

        // ** BEGIN Javascript blackjack game from echohatch1. Modified for Grape.

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
                .setTitle(message.author.username + ` Blackjack` )
                .addField('🃏 Vos cartes', cardsMsg)
                .addField('🂠 Cartes du dealer', dealerMsg)
                .addField(title, msg)
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', size: 256, dynamic: true }))
                .setFooter(message.guild.name,message.guild.iconURL());

            message.channel.send({embeds: [gambleEmbed]});
        }

        async function endGame() {
            if (player.score === 21) {
                bet('win');
                gameOver = true;
                await endMsg("Vous gagnez", "Vous avez 21! Vous gagnez!", true)
            }
            if (player.score > 21) {
                bet('lose');
                gameOver = true;
                await endMsg("Tu as perdu", `Vous avez plus de 21 hors jeu`, true)
            }
            if (dealer.score === 21) {
                bet('lose');
                gameOver = true;
                await endMsg("Tu as perdu", "le croupier a eu 21", true)
            }
            if (dealer.score > 21) {
                bet('win');
                gameOver = true;
                await endMsg("Vous gagnez !", "Croupier hors jeu. Vous gagnez", true)
            }
            if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
                bet('win');
                gameOver = true;
                await endMsg("Vous gagnez !", "Le croupier s'arrête sur 17 ou plus et n'a toujours pas obtenu un titre supérieur à vous. Vous gagnez", true)
            }
            if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
                bet('lose');
                gameOver = true;
                await endMsg("Tu as perdu", "Le croupier a gagné", true)
            }
            if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
                gameOver = true;
                await endMsg("Les cartes du croupier et du joueur totalisent la même chose", "nulle", true)
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

            endMsg("Info", "Hit = [\`h\`](https://www.casinosbarriere.com/fr/nos-jeux/jeux-de-table/blackjack.html)  |  Stand = [\`s\`](https://www.casinosbarriere.com/fr/nos-jeux/jeux-de-table/blackjack.html)  \nOu [\`stop\`](https://www.casinosbarriere.com/fr/nos-jeux/jeux-de-table/blackjack.html) mais vous allez perdre votre mise ? ", false)

            let filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages({filter: filter ,max: 1,time: 25000,errors: ['time']}).then((collected) => {
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
                          .setDescription(`${x} **${member.user.username}** : Vous avez annulé le jeu, maintenant vous avez perdu votre pari de **${betAmount.toLocaleString()}** :coin:`);
                          return message.channel.send({embeds: [cancel]}).catch();
                    bet("lose");
                    return
                }
            }).catch(_ => {
                let timeout = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${x} **${member.user.username}** : Tu as mis trop de temps à choisir, maintenant tu as perdu ton pari de **${betAmount.toLocaleString()}** :coin:`);
                return message.channel.send({embeds: [timeout]}).catch();
                bet("lose");
                return
            })
        }

        await loop()
    };
module.exports.config = {
    name: 'blackjack', // Command Name
    description: 'Parti de blackjack dans les régles 🚬 .', // Description
    usage: '+bj', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['bj', 'blackjack'], // Aliases 
    bankSpace: 15, // Amount of bank space to give when command is used.
    cooldown: 1 // Command Cooldown
}