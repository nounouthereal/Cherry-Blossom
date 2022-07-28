
import discord
import random


bot_prefix = '+'
api_key = 'OTQ0NTcyODYxODc0NjAyMDU0.YhDkBw.KRmLc21SzhOd8WqtJcAIjEsMl9k'
version = 'bêta'
prefix = '+'
bad_words = [
'anal',
'anus',
'arse',
'ass',
'ballsack',
'balls'
'bastard',
'bitch',
'biatch',
'bloody',
'blowjob', 
'blow job', 
'bollock',
'bollok',
'boner',
'boob',
'bugger',
'bum',
'butt',
'buttplug',
'clitoris',
'cock',
'coon',
'crap',
'cunt',
'damn',
'dick',
'dildo',
'dyke',
'fag',
'feck',
'fellate',
'fellation',
'felching',
'fuck',
'f u c k',
'fudgepacker', 
'fudge packer',
'flange',
'Goddamn',
'God damn',
'jizz',
'knobend',
'knob end',
'labia',
'muff',
'nigger', 
'nigga',
'omg',
'penis',
'piss',
'prick',
'pube',
'pussy',
'queer',
'scrotum',
'sex',
'shit',
's hit',
'sh1t',
'slut',
'smegma',
'spunk',
'tit',
'tosser',
'turd',
'twat',
'vagina',
'wank',
'whore',
'baiser',
'bander',
'bigornette',
'bite',
'bitte',
'bloblos',
'bordel',
'brackmard',
'branlage',
'branler',
'branlette',
'branleur',
'branleuse',
'brouter le cresson',
'chatte' ,
'clito',
'clitoris',
'con',
'connard',
'connasse',
'conne',
'couilles',
'cramouille',
'emmerdant',
'emmerder',
'emmerdeur',
'emmerdeuse',
'enculé',
'enculée',
'enculeur',
'enculeurs',
'enfoiré',
'enfoirée',
'étron',
'fille de pute',
'fils de pute',
'gouine',
'grogniasse',
'gueule',
'jouir',
'la putain de ta mère',
'MALPT',
'ménage à trois',
'merde',
'merdeuse',
'merdeux',
'meuf',
'nique ta mère',
'nique ta race',
'palucher',
'pédale',
'pédé',
'pd',
'pisser',
'pouffiasse',
'pousse-crotte',
'putain',
'pute',
'ramoner',
'sac à merde',
'salaud',
'salope',
'suce',
'tapette',
'tringler',
'trique',
'trou du cul',
'turlute',
'veuve',
]

color1 = [0xFD6C9E , 0xFFFFFF]
pink =0xFD6C9E


soft_color = random.choice(color1)

class MyClient(discord.Client):
    
    async def on_ready(self):
        print(f'Logged in as {self.user} (ID: {self.user.id})')
        print('---')
        bot_test_channel = self.get_channel(944602051671887902)
        await bot_test_channel.send('Premier fichier initialisée 0.1')

        
    async def on_member_join(self, member):
        guild = member.guild

        print(f'{member.mention} joined to {guild.name}')
        print('---')
        msg =  "↬ Hey ! Ce bot a été développé par nounou#4883 ! \n ↬ Si toi aussi tu souhaites un support rejoins notre discord \n ↬ Voici ton ticket d'entrée : https://discord.gg/5R5486z773 "

        if guild.system_channel is not None:
            #Welcome message 
            to_send = f'Bonjour,{member.mention} assied toi sous les cerisiers avec nous 🍒 {guild.name}!'
            await guild.system_channel.send(to_send)
            await member.send(msg)

         #Message reading

   

    async def on_message(self, message):
        if not message.content.startswith(bot_prefix):
            return
        if message.author == client.user:
            return

        print(f'Message: {message.content}')
        print('---')

        if message.content == f'{bot_prefix}version': 
            myEmbed = discord.Embed(title='Version en cours' , description= f'La version est **{version}**', color=0xFD6C9E)
            myEmbed.add_field(name = 'Code version' , value =f'{version} v0.0.1' , inline=False)
            myEmbed.add_field(name = 'Date prévue de prochaine version' , value ='6 mars 2022' , inline=False)
            myEmbed.set_footer(text=self.user)
            await message.channel.send(embed=myEmbed)

        if message.content == f'{bad_words}':
            myEmbed = discord.Embed(title="Fiche d'aide" , color=0xFD6C9E)
            myEmbed.add_field(name = 'Prefixe' , value ='Le prefixe est + ( Le prefixe ne peut etre changé)' , inline=False)
            myEmbed.add_field(name = 'Documentation' , value ='Documentation indisponibe' , inline=False)
            myEmbed.set_footer(text=self.user)
            await message.channel.send(embed=myEmbed)
        
    
    #async def on_ready(self):
        #bot_test_channel = self.get_channel(944602051671887902)
        #await bot_test_channel.send('Second fichier initialisée 0.2')




intents = discord.Intents.default()
intents.members = True

client = MyClient(intents=intents)
client.run(api_key)
#client.loop.create_task(client.countdown()x
