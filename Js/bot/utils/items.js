const rifle = '<:New_AR_icon:962344070016020570>'
const pick = '⛏'
const hd = '<:diamond:996751128391852052>'
const hr = '<:rubis:996751140874113105>'
const hg = '<:gade:996751131957018705>'
const ha = '<:saphir:996751134704279582>'
const hp = '<:precious:996751142639915008>'

const array = [{
    name: '🍪 Cookie',
    description: 'Mmmh Yummy. \`(+use cookie)\`',
    canUse: true,
    canBuy: true,
    itemId:'cookie',
    displayOnShop: true,
    sellAmount: 10,
    price: 50,
    rarety: '⚪️ Common',
    keep: false,
    run: async (bot, message, args) => {
        const cookieRandom = [
            '🙂 You ate a cookie because you were starving.',
            '🥵 You choked on a cookie and almost died.',
            '👍 The cookie tasted good.'
        ];
        const yes = cookieRandom[Math.floor(Math.random() * cookieRandom.length)];
        message.channel.send(`${yes}`);
    }
},
{
    name: '🔒 Padlock',
    description: `Protects you from theft once (Automatic use)`,
    canUse: false,
    canBuy: true,
    itemId: 'padlock',
    displayOnShop: true,
    sellAmount: 4000,
    price: 10000,
    rarety: '🟢 Uncommon',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🎣 Canne a pêche',
    description: 'Use your fishingrod to fish \`(+fish)\`',
    canUse: false,
    canBuy: true,
    itemId: 'fishingrod',
    displayOnShop: true,
    sellAmount: 10000,
    price: 20000,
    rarety: '🔵 Rare',
    resistance: 50,
    keep: true,
    run: async (bot, message, args) => {
      
    }
},
{
    name: '🐟 Basic Fish',
    description: 'Sell it to make money. \`(+sell commonfish)\`',
    canUse: false,
    canBuy: false,
    itemId: 'commonfish',
    displayOnShop: false,
    sellAmount: 25,
    price: 0,
    rarety: '⚪️ Common',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐠 Tropical fish',
    description: 'Vend le pour faire de l\'argent. \`(+sell tropicalfish)\`',
    canUse: false,
    canBuy: false,
    itemId: 'tropicalfish',
    displayOnShop: false,
    sellAmount: 50,
    price: 0,
    rarety: '🟢 Uncommon',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🦑 Octopus',
    description: 'Vend le pour faire de l\'argent. \`(+sell octupus)\`',
    canUse: false,
    canBuy: false,
    itemId: 'octopus',
    displayOnShop: false,
    sellAmount: 125,
    price: 0,
    rarety: '🔵 Rare',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐡 Pupper fish',
    description: 'Sell it to make money. \`(+sell epicfish)\`',
    canUse: false,
    canBuy: false,
    itemId: 'veryrarefish' || 'epicfish'||'poissonEpic'||'poissonepique',
    displayOnShop: false,
    sellAmount: 250,
    price: 0,
    rarety: '🟣 Epic',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐋 Whale',
    description: `Sell it to makje money. \`(+sell whale)\``,
    canUse: false,
    canBuy: false,
    itemId: 'legendaryfish' ||'poissonlegendaire'||'poissonLegendary',
    displayOnShop: false,
    sellAmount: 650,
    price: 0,
    rarety: '🟠 Legendary',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '👞 Déchets',
    description: `Vend le pour faire de l\'argent. (+sell junk || +sell dechets)`,
    canUse: false,
    canBuy: false,
    itemId: 'dechets'||'déchets'||'junk',
    displayOnShop: false,
    sellAmount: 10,
    price: 0,
    rarety: '⚫️ Extra Common',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '📜 Bank Note',
    description: `Plus d'espace banquaire. (+use banknote || +buy banknote)`,
    canUse: true,
    canBuy: true,
    itemId: 'banknote',
    displayOnShop: true,
    sellAmount: 6667,
    price: 20000,
    rarety: '🟢 Uncommon',
    keep: false,
    run: async (bot, message, args) => {
        const random = Math.ceil((Math.random() * 5000) + 5000);
        const e = await bot.giveBankSpace(message.author.id, random);
        message.channel.send(` Vous avez utilisé votre note bancaire qui vous donné ${random.toLocaleString()} d'espace banquaire. Vous avez maintenant ${e.bankSpace.toLocaleString()} fd'espace banquaire.`);
    }
},

{
    name: '🧭 Compass',
    description: `Use it to explore places. \`(+explore)\``,
    canUse: true,
    canBuy: true,
    itemId: 'compass',
    displayOnShop: true,
    sellAmount: 6667,
    price: 20000,
    rarety: '🟢 Uncommon',
    keep: false,
    run: async (bot, message, args) => {
        const random = Math.ceil((Math.random() * 5000) + 5000);
        const e = await bot.giveBankSpace(message.author.id, random);
        message.channel.send(` Vous avez utilisé votre note bancaire qui vous donné ${random.toLocaleString()} d'espace banquaire. Vous avez maintenant ${e.bankSpace.toLocaleString()} fd'espace banquaire.`);
    }
},

{
    name: `${rifle} Rifle`,
    description: `Utilise le fusil pour chasser des animaux. (+hunt)`,
    canUse: false,
    canBuy: true,
    itemId: 'rifle',
    displayOnShop: true,
    sellAmount: 3000,
    price: 45000,
    rarety: '🔵 Rare',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🦌 Deer',
    description: 'Sell the deer to make money. \`(+sell deer)\`',
    canUse: false,
    canBuy: false,
    itemId: 'deer',
    displayOnShop: false,
    sellAmount: 3500,
    price: 0,
    rarety: '🟣 Epic',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐻 Ours',
    description: 'Vend l\'ours pour faire de l\'argent. (+sell bear || +sell ours)',
    canUse: false,
    canBuy: false,
    itemId: 'ours' || 'bear',
    displayOnShop: false,
    sellAmount: 7500,
    price: 0,
    rarety: '🟠 Legendary',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🦆 Canard',
    description: 'Vend le canard pour faire de l\'argent. (+sell duck || +sell canard)',
    canUse: false,
    canBuy: false,
    itemId: 'canard' || 'duck',
    displayOnShop: false,
    sellAmount: 50,
    price: 0,
    rarety: '⚪️ Common',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐷 Cochon',
    description: 'Vend le cochon pour faire de l\'argent. (+sell pig || +sewll cochon)',
    canUse: false,
    canBuy: false,
    itemId: 'pig' || 'cochon',
    displayOnShop: false,
    sellAmount: 50,
    price: 0,
    rarety: '⚪️ Common',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐮 Vache',
    description: 'Vend la vache pour faire de l\'argent. (+sell cow || +sell vache)',
    canUse: false,
    canBuy: false,
    itemId: 'vache'||'cow',
    displayOnShop: false,
    sellAmount: 70,
    price: 0,
    rarety: '🟢 Uncommon',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🦊 Renard',
    description: 'Vend le renard pour faire de l\'argent. (+sell renard || +sell fox',
    canUse: false,
    canBuy: false,
    itemId: 'fox' || 'renard',
    displayOnShop: false,
    sellAmount: 120,
    price: 0,
    rarety: '🔵 Rare',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐰 Lapin',
    description: 'Vend le lapin pour faire de l\'argent. (+sell rabbit || +sell lapin)',
    canUse: false,
    canBuy: false,
    itemId: 'lapin' || 'rabbit',
    displayOnShop: false,
    sellAmount: 70,
    price: 0,
    rarety: '🟢 Uncommon',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐔 Poulet',
    description: 'Vend le poulet pour faire de l\'argent. (+sell chicken || +sell poulet)',
    canUse: false,
    canBuy: false,
    itemId: 'poulet' || 'chicken',
    displayOnShop: false,
    sellAmount: 30,
    price: 0,
    rarety: '⚪️ Common',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🐗 Sanglier',
    description: 'Vend le sanglier pour faire de l\'argent.(+sell boar || +sell sanglier)',
    canUse: false,
    canBuy: false,
    itemId: 'sanglier' || 'boar',
    displayOnShop: false,
    sellAmount: 120,
    price: 0,
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: `${pick} Pioche`,
    description: `Utilise la pour miner des gemmes (+mine)`,
    canUse: false,
    canBuy: true,
    itemId: 'pickaxe' || 'pioche',
    displayOnShop: true,
    sellAmount: 3000,
    price: 30000,
    rarety: '🔵 Rare',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🪨 Minerais',
    description: 'Vend les minerais pour faire de l\'argent. (+sell minerals || +sell minerais)',
    canUse: false,
    canBuy: false,
    itemId: 'minerais' || 'minerals',
    displayOnShop: false,
    sellAmount: 95,
    price: 0,
    rarety: '',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: `${hd} Gemmme de diamant`,
    description: `Vend le daimant pour faire de l'argent. (+sell diamant || +sell diamond)`,
    canUse: false,
    canBuy: false,
    itemId: 'diamond' || 'diamondgem' || 'diamant',
    displayOnShop: false,
    sellAmount: 200,
    price: 0,
    rarety: '',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: `${hr} Rubis`,
    description: `Vend le rubis pour faire de l'argent. (+sell rubis || +sell ruby)`,
    canUse: false,
    canBuy: false,
    itemId: 'ruby' || 'rubis' || 'rubygem',
    displayOnShop: false,
    sellAmount: 250,
    price: 0,
    rarety: '',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: `${hg} Jade`,
    description: `Vend le jade pour faire de l'argent. (+sell jade || +sell gade)`,
    canUse: false,
    canBuy: false,
    itemId: 'gade' || 'gadegem' || 'jade',
    displayOnShop: false,
    sellAmount: 300,
    price: 0,
    rarety: '',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: `${ha} Saphir`,
    description: `Vend le saphir pour faire de l'argent. (+sell saphir || +sell saphirgem)`,
    canUse: false,
    canBuy: false,
    itemId: 'saphir' || 'saphirgem',
    displayOnShop: false,
    sellAmount: 475,
    price: 0,
    rarety: '',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: `${hp} Extra Précieuse`,
    description: `Vend la pierre extra précieuse pour faire de l'argent. (+sell precious || +sell précieuse)`,
    canUse: false,
    canBuy: false,
    itemId: 'precious' || 'extraprecious' || 'extraprecieuse' || 'extraprécieuse',
    displayOnShop: false,
    sellAmount: 800,
    price: 0,
    rarety: '',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🪓 Hache',
    description: `Use this to chops trees down`,
    canUse: true,
    canBuy: true,
    itemId: 'hache' || 'axe',
    displayOnShop: true,
    sellAmount: 3000,
    price: 20000,
    keep: true,
    run: async (bot, message, args) => {
        const treeAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        message.channel.send(`Vous avez coupé ${treeAmount} x Arbres 🌲`);
        const findItem = data.items.find(i => i.name.toLowerCase() == 'tree');
        let userInv = data.items.filter(i => i.name.toLowerCase() !== 'tree');
        if (findItem) {
            userInv.push({ name: 'tree', amount: (findItem.amount + treeAmount), description: findItem.description });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ name: 'tree', amount: treeAmount,description: findItem.description });
            data.items = userInv;
            await data.save();
        }
    }
},
{
    name: 'tree',
    description: '🌲 Arbre\nVend les pour faire de l\'argent.',
    canUse: false,
    canBuy: false,
    displayOnShop: false,
    sellAmount: 750,
    price: 0,
    rarety: '🟢 Uncommon',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🍀 Trêfle a quatre feuille',
    description: `Augmente les chances d'un vol réussi (+rob <membre>)`,
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 4000,
    price: 10000,
    rarety: '🟢 Uncommon',
    keep: false,
    run: async (bot, message, args) => {

    }
},
{
    name: '👮 Diplôme de policier',
    description: 'Fait partie des items permettant de débloque le métier de policier. (+buy police || +buy p_diplome)',
    canUse: false,
    canBuy: true,
    itemId: 'police_d' || 'p_diplôme'||'p_diplome'||'police_diplome'||'pdiplome'||'diplome_police'||'diplôme_police',
    displayOnShop: true,
    sellAmount: 0,
    price: 7500,
    rarety: '🟢 Uncommon',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🚓 Voiture de police',
    description: 'Fait partie des items permettant de débloque le métier de policier. (+buy police_car || +buy p_car)',
    canUse: false,
    canBuy: true,
    itemId: 'police_car' || 'p_car'||'pcar'||'carp'||'carpolice'||'police_car',
    displayOnShop: false,
    sellAmount: 0,
    price: 10000,
    rarety: '🔵 Rare',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '<:Pistol:962344070506741790> Pistolet de police',
    description: 'Fait partie des items permettant de débloque le métier de policier. (+buy police_pistol || +buy p_pistol)',
    canUse: false,
    canBuy: true,
    itemId: 'p_pistol' || 'police_pistol'||'pistolp'||'pistol_p'||'pistol_police',
    displayOnShop: true,
    sellAmount: 0,
    price: 2500,
    rarety: '🟢 Uncommon',
    keep: true,
    run: async (bot, message, args) => {

    }
},
{
    name: '🏆 Trophée',
    description: `🏆 Le trophée ultime`,
    canUse: false,
    canBuy: true,
    itemId: 'trophy' || 'trophé' || 'trophée'|| 'trophee'||'trophe',
    displayOnShop: true,
    sellAmount: 50000000,
    price: 100000000,
    rarety: '🟤 Ultime',
    keep: false,
    run: async (bot, message, args) => {

    }
}

    

];

module.exports = array;