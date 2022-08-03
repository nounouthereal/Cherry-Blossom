const fs = require('fs');

module.exports = bot => {
    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/economy', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/economy/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/info', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/info/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });


    //Waiting for ranking system V1.0
    /* fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/ranking', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/ranking/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    }); */
}
