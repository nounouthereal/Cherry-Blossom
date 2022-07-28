
from importlib import reload
import json
from venv import create
from webbrowser import get
import discord
from discord.ext import commands
import random
import asyncio
import os
import time
import qrcode
from googletrans import Translator
from datetime import date , time
import datetime
from PIL import Image
import io
import requests
from googlesearch import search
import string 
import re
from bs4 import BeautifulSoup
import urllib.parse
import urllib.request
from urllib.request import urlopen, Request
import sqlite3
import aiohttp
import paginator
import pycountry
from PIL import Image, ImageFont, ImageDraw
import dateutil
from tabulate import tabulate

FORTNITE_API_BASE = 'https://fortnite-api.com'

prefix = '+'

color1 = [0xFD6C9E , 0xFFFFFF]
pink =0xFD6C9E
warned = 0xff9f40
fortnite_key = 'afd042f7-f4dc-4e0b-b4ed-0cb5bdfc0851'

profile_db='profile.sqlite'

maintenance = discord.Embed(title='🚧 Maintenance',description='🚧 Cette commande est en maintenance', color = warned)

def fortnite_api_request_stats(username):
    request_url = f'https://fortnite-api.com/v1/stats/br/v2?name={username}'

    return json.loads(requests.get(
        request_url,
        params={
            'displayName': username
        },
        headers={'Authorization': fortnite_key}
    ).content)

def covid_api_request(endpoint):
    covid_request_url = urllib.request.Request('https://api.covid19api.com/' + endpoint)
    covid_request_data = json.loads(urllib.request.urlopen(covid_request_url).read().decode('utf-8'))

    return covid_request_data

version = 'Bêta 1.0'

soft_color = random.choice(color1)

botowner = 901071562386583596


intents = discord.Intents.all()
bot = commands.Bot(command_prefix='+' , intents = intents )

red = 0xD9001D
green = 0xFF000
pink = 0xFD6C9E 


@bot.event
async def on_ready():
    print('Fun')

    con = sqlite3.connect(f'{profile_db}')
    cur = con.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS profile
                (idMember int,
                age text, 
                personnaldescrip text,
                name text,
                color text)''')
    con.commit
    con.close

def get_perms(permissions):
    perms = []
    if permissions.administrator:
        perms.append("`Administrateur`")
    if permissions.manage_guild:
        perms.append("`Gérer le serveur`")
    if permissions.ban_members:
        perms.append("`Bannir des membres`")
    if permissions.kick_members:
        perms.append("`Kick members`")
    if permissions.manage_channels:
        perms.append("`Gérer les channels`")
    if permissions.manage_emojis:
        perms.append("`Gérer les emojis`")
    if permissions.manage_messages:
        perms.append("`Gérer les messages`")
    if permissions.manage_permissions:
        perms.append("`Gérer les permissions`")
    if permissions.manage_roles:
        perms.append("`Gérer les roles`")
    if permissions.mention_everyone:
        perms.append("`Mentionner everyone`")
    if permissions.manage_webhooks:
        perms.append("`Gérer les webhooks`")
    if permissions.move_members:
        perms.append("`Move members`")
    if permissions.mute_members:
        perms.append("`Mute members`")
    if permissions.deafen_members:
        perms.append("`Deafen members`")
    if permissions.priority_speaker:
        perms.append("`Priority speaker`")
    if permissions.view_audit_log:
        perms.append("`See audit log`")
    if permissions.create_instant_invite:
        perms.append("`Create instant invites`")
    if len(perms) == 0:
        perms.append(":warning: Aucune permission de modération")
    return perms


@bot.command()
@commands.cooldown(1, 86400, commands.BucketType.user)
async def cool(ctx):
    embed = discord.Embed(title = 'Note de cool attitude' , description = f"Vous etes aujourd'hui {random.randrange(101)}% Cool {ctx.message.author}" , color = discord.Color.random())
    embed.add_field(name="Temps de cooldown" , value = "1 jour " )
    await ctx.send(embed = embed)

@bot.command()
@commands.cooldown(1, 86400, commands.BucketType.user)
async def gay(ctx):
    embed = discord.Embed(title = 'Note de gay probabilité' , description = f"Vous etes aujourd'hui {random.randrange(101)}% Gay {ctx.message.author}" , color = discord.Color.random())
    embed.add_field(name="Temps de cooldown" , value = "1 jour " )
    await ctx.send(embed = embed)

@bot.command()
@commands.cooldown(1, 86400, commands.BucketType.user)
async def ppnote(ctx):
    embed = discord.Embed(title = 'Note de pp' , description = f"Votre pp est notée aujourd'hui {random.randrange(11)}/10 {ctx.message.author}" , color = discord.Color.random())
    embed.add_field(name="Temps de cooldown" , value = "1 jour " )
    await ctx.send(embed = embed)


@bot.command(aliases=['youtube','yt'])
async def _youtube(ctx, *, search):
    author=ctx.message.author
    guild=ctx.guild
    query_string = urllib.parse.urlencode({'search_query': search})
    html_content = urllib.request.urlopen('http://www.youtube.com/results?' + query_string)
    search_content= html_content.read().decode()
    search_results = re.findall(r'\/watch\?v=\w+', search_content)
    #print(search_results)
    await ctx.send(f'{author.mention} Résultat:\n https://www.youtube.com' + search_results[0])

punch_gif = ['https://c.tenor.com/UH8Jnl1W3CYAAAAS/anime-punch-anime.gif','https://media.tenor.co/videos/dca6b80e43c0144f69962313446abbca/mp4','https://c.tenor.com/EdV_frZ4e_QAAAAC/anime-naruto.gif','https://c.tenor.com/BoYBoopIkBcAAAAS/anime-smash.gif']
punch_names = ['👊🏻 Vous met une tatane' , '🤜 Vous envoie bouler' , '🥊 Vous envoie un gros punch' ,'🤼 Vous écrase']

slap_gifs = ['https://c.tenor.com/PeJyQRCSHHkAAAAS/saki-saki-mukai-naoya.gif','https://c.tenor.com/BYu41fLSstAAAAAM/when-you-cant-accept-reality-slap.gif','https://c.tenor.com/VlSXTbFcvDQAAAAC/naruto-anime.gif','https://c.tenor.com/1lJTSPaUfKkAAAAM/chika-fujiwara-fwap.gif']
slap_names = ['🤚 Vous met une grosse baffe','🤚 Vous mangez une grosse main sur la joue']

kiss_gifs = ['https://c.tenor.com/F02Ep3b2jJgAAAAS/cute-kawai.gif', 'https://c.tenor.com/s1VvsszCbCAAAAAM/love-you.gif', 'https://c.tenor.com/SqpFZQfcyEgAAAAM/anime-kiss.gif', 'https://c.tenor.com/z-v3H0Di5LQAAAAC/anime-kissing-matching.gif', 'https://c.tenor.com/lYKyQXGYvBkAAAAC/oreshura-kiss.gif', 'https://c.tenor.com/-wQWOYZbtqQAAAAM/anime-kissing.gif' , 'https://images-ext-1.discordapp.net/external/HvqSRBKzOj9xqaA-YA0mZj6lJxQYDtK3v-njdGXAPFo/https/cdn.weeb.sh/images/r1cB3aOwW.gif']
kiss_names = ['😙 Vous roule une pelle','😍 Vous embrasse']

kill_gif = ['https://c.tenor.com/NbBCakbfZnkAAAAM/die-kill.gif' , 'https://c.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif' , 'https://c.tenor.com/FkxPkj7NOrQAAAAM/akame-akame-of-demon-sword-murasame.gif' , 'https://c.tenor.com/-UbmVOLixPcAAAAM/killing-anime-girl.gif' , "https://c.tenor.com/MRUi4mUxB6gAAAAC/akame-akame-ga-k-ill.gif"]
kill_names = ['🔪 Vous assasine' , '🥷 Vous élimine' , '🩸 Vous tue' , '🪦 Vous envoie au septième ciel' , '💀 Met fin a vos jours']

hug_names = ['Vous fait un grand calin' , 'Vous prend dans ses bras' , 'Vous caline' ]
hug_gifs = ['https://c.tenor.com/n0qIE_8B0JcAAAAM/gif-abrazo.gif' , 'https://c.tenor.com/KD__SewDxK0AAAAM/horimiya-izumi-miyamura.gif' , 'https://c.tenor.com/71Cux-aY4G4AAAAM/anime-hug.gif' , 'https://c.tenor.com/9VAhRQHql5MAAAAM/anime-hug.gif' , 'https://c.tenor.com/vH1LBxedJ9wAAAAC/hug-anime.gif'  ]

bang_gifs = ['https://cdn.weeb.sh/images/Sy_dXNts-.gif' , 'https://cdn.weeb.sh/images/HyZiWLmvb.gif' , 'https://tenor.com/view/anime-triela-gun-gunslinger-girl-gif-13064973' , 'https://cdn.weeb.sh/images/BkWIXNFo-.gif']
bang_names = ['🔫 Vous tue' , '🔫 Vous tire dessus']

wasted_gifs = ['https://cdn.weeb.sh/images/r11as1tvZ.gif' , 'https://cdn.weeb.sh/images/BJO2j1Fv-.gif' , 'https://cdn.weeb.sh/images/B1VnoJFDZ.gif' , 'https://cdn.weeb.sh/images/B1qosktwb.gif']
wasted_names = ["😵  a wasted"]

@bot.command()
async def punch(ctx, *, member: discord.Member = None ):
    if member == None:
        member = '🌸| Fleur de cerisier |🌸 Bot'
    myEmbed = discord.Embed(color=0xFD6C9E, description = f'**{ctx.author}** {random.choice(punch_names)}  **{member}**')
    myEmbed.set_image(url=(random.choice(punch_gif)))
    myEmbed.set_footer(text='Off this hurt')
    await ctx.send(embed=myEmbed)

@bot.command()
async def slap(ctx , member: discord.Member = None ):
    if member == None:
        member = '🌸| Fleur de cerisier |🌸 Bot'
    myEmbed = discord.Embed(color=0xFD6C9E, description = f'**{ctx.author}** {random.choice(slap_names)}   **{member}**')
    myEmbed.set_image(url=(random.choice(slap_gifs)))
    myEmbed.set_footer(text='aie')
    await ctx.send(embed=myEmbed)

@bot.command()
async def kiss(ctx , member: discord.Member = None ):
    if member == None:
        member = '🌸| Fleur de cerisier |🌸'
    myEmbed = discord.Embed(color=0xFD6C9E, description = f'**{ctx.author}** {random.choice(kiss_names)}  **{member}**')
    myEmbed.set_image(url=(random.choice(kiss_gifs)))
    myEmbed.set_footer(text='mmhhh')
    await ctx.send(embed=myEmbed)

@bot.command()
async def kill(ctx , member: discord.Member = None ):
    if member == None:
        member = '🌸| Fleur de cerisier |🌸'
    myEmbed = discord.Embed(color=0xFD6C9E, description = f'**{ctx.author}** {random.choice(kill_names)}  **{member}**')
    myEmbed.set_image(url=(random.choice(kill_gif)))
    myEmbed.set_footer(text='Murder')
    await ctx.send(embed=myEmbed)

@bot.command()
async def hug(ctx , member: discord.Member = None ):
    if member == None:
        member = '🌸| Fleur de cerisier |🌸'
    myEmbed = discord.Embed(color=0xFD6C9E, description = f'**{ctx.author}** {random.choice(hug_names)}  **{member}**')
    myEmbed.set_image(url=(random.choice(hug_gifs)))
    myEmbed.set_footer(text='Big hug')
    await ctx.send(embed=myEmbed)

@bot.command()
async def bang(ctx , member: discord.Member = None ):
    if member == None:
        member = '🌸| Fleur de cerisier |🌸'
    myEmbed = discord.Embed(color=0xFD6C9E, description = f'**{ctx.author}** {random.choice(bang_names)}  **{member}**')
    myEmbed.set_image(url=(random.choice(bang_gifs)))
    myEmbed.set_footer(text="They know me, they know me bang bang (K'Naan)")
    await ctx.send(embed=myEmbed)

@bot.command()
async def wasted(ctx , member: discord.Member = None ):
    if member == None:
        member ='🌸| Fleur de cerisier |🌸'
    myEmbed = discord.Embed(color=0xFD6C9E, description = f'**{ctx.author}** {random.choice(wasted_names)}  **{member}**')
    myEmbed.set_image(url=(random.choice(wasted_gifs)))
    myEmbed.set_footer(text='Wasted')
    await ctx.send(embed=myEmbed)



@bot.command()
async def f(ctx, *, text: commands.clean_content = None):
        """ Press F to pay respect """
        hearts = ["❤", "💛", "💚", "💙", "💜"]
        reason = f"for **{text}** " if text else ""
        await ctx.send(f"**{ctx.author.name}** has paid their respect {reason}{random.choice(hearts)}")

@bot.command(aliases=["slots", "bet"])
async def slot(ctx):
        """ Roll the slot machine """
        emojis = "🍎🍊🍐🍋🍉🍇🍓🍒"
        a, b, c = [random.choice(emojis) for g in range(3)]
        slotmachine = f"**[ {a} {b} {c} ]\n{ctx.author.name}**,"

        if (a == b == c):
            await ctx.send(f"{slotmachine} All matching, you won! 🎉")
        elif (a == b) or (a == c) or (b == c):
            await ctx.send(f"{slotmachine} 2 in a row, you won! 🎉")
        else:
            await ctx.send(f"{slotmachine} No match, you lost 😢")

	
@bot.command(pass_context=True)
@commands.has_permissions(administrator=True)
async def autopcpp(self, ctx, *, setting : str = None):
		"""Sets the bot's auto-pcpartpicker markdown if found in messages (admin-only). Setting can be normal, md, mdblock, bold, bolditalic, or nothing."""
		if setting == None:
			# Disabled
			self.settings.setServerStat(ctx.guild, "AutoPCPP", None)
			msg = 'Auto pcpartpicker *disabled*.'
		elif setting.lower() == "normal":
			self.settings.setServerStat(ctx.guild, "AutoPCPP", "normal")
			msg = 'Auto pcpartpicker set to *Normal*.'
		elif setting.lower() == "md":
			self.settings.setServerStat(ctx.guild, "AutoPCPP", "md")
			msg = 'Auto pcpartpicker set to *Markdown*.'
		elif setting.lower() == "mdblock":
			self.settings.setServerStat(ctx.guild, "AutoPCPP", "mdblock")
			msg = 'Auto pcpartpicker set to *Markdown Block*.'
		elif setting.lower() == "bold":
			self.settings.setServerStat(ctx.guild, "AutoPCPP", "bold")
			msg = 'Auto pcpartpicker set to *Bold*.'
		elif setting.lower() == "bolditalic":
			self.settings.setServerStat(ctx.guild, "AutoPCPP", "bolditalic")
			msg = 'Auto pcpartpicker set to *Bold Italics*.'
		else:
			msg = "That's not one of the options."
		await ctx.send(msg)

@bot.command(pass_context=True)
@commands.has_permissions(administrator=True)
async def dumpservers(ctx):
		"""Dumps a timpestamped list of servers into the same directory as the bot (owner only)."""
		timeStamp = datetime.today().strftime("%Y-%m-%d %H.%M")
		serverFile = 'ServerList-{}.txt'.format(timeStamp)
		message = await ctx.author.send('Saving server list to *{}*...'.format(serverFile))
		msg = ''
		for server in bot.guilds:
			msg += server.name + "\n"
			msg += str(server.id) + "\n"
			msg += server.owner.name + "#" + str(server.owner.discriminator) + "\n\n"
			msg += str(len(server.members)) + "\n\n"
		# Trim the last 2 newlines
		msg = msg[:-2].encode("utf-8")
		with open(serverFile, "wb") as myfile:
			myfile.write(msg)
		await message.edit(content='Uploading *{}*...'.format(serverFile))
		await ctx.author.send(file=discord.File(serverFile))
		await message.edit(content='Uploaded *{}!*'.format(serverFile))
		os.remove(serverFile)

@commands.has_permissions(manage_messages=True)
@bot.command(pass_context=True , aliases=['poll' , 'sondage'])
async def survey(ctx,*options: str ,question):

    if len(options) > 2:
        await ctx.send('```❌ Error! Syntax = [+survey "question" "option1" "option2"] ```')
        return

    if len(options) == 2 and options[0] == "oui" and options[1] == "non":
        reactions = ['✅', '❌']
    else:
        reactions = ['👍', '👎']

    description = []
    for x, option in enumerate(options):
        description += '\n {} {}'.format(reactions[x], option)

    poll_embed = discord.Embed(title=question, color=pink, description=''.join(description))

    react_message = await ctx.send(embed=poll_embed)

    for reaction in reactions[:len(options)]:
        await react_message.add_reaction(reaction)

@bot.command(pass_context=True)
@commands.has_permissions(administrator=True)
async def leaveserver(ctx, *, targetServer = None):
		"""Leaves a server - can take a name or id (owner only)."""
		if targetServer == None:
			# No server passed
			msg = 'Usage: `{}leaveserver [id/name]`'.format(ctx.prefix)
			return await ctx.send(msg)
		# Check id first, then name
		guild = next((x for x in bot.guilds if str(x.id) == str(targetServer)),None)
		if not guild:
			guild = next((x for x in bot.guilds if x.name.lower() == targetServer.lower()),None)
		if guild:
			await guild.leave()
			try:
				await ctx.send("Alright - I left that server.")
			except:
				pass
			return
		await ctx.send("I couldn't find that server.")

@bot.command(pass_context=True)
async def prefix(ctx):
        emb = discord.Embed(title='Préfixe (+)' , description='Mon préfixe est **+**', color=soft_color)
        await ctx.send(embed=emb)

@bot.command()
@commands.is_nsfw()
async def hentai(ctx):
    r = requests.get("https://nekos.life/api/v2/img/hentai")
    res = r.json()
    em = discord.Embed(color = discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)

@bot.command()
@commands.is_nsfw()
async def boobs(ctx):
    r = requests.get("https://nekos.life/api/v2/img/boobs")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)

@bot.command(aliases = ['blowjob'])
@commands.is_nsfw()
async def bj(ctx):
    r = requests.get("https://nekos.life/api/v2/img/bj")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)

@bot.command(brief="Makes👏spaces👏into👏clapping👏emojis👏because👏why👏not",aliases=['textclap'])
async def clap(ctx,*,text):
    table = text.split(' ') 
    em = discord.Embed(title="👏ify")
    em.add_field(name="Original Text",value=f"``{text}``")
    em.add_field(name="New Text", value=f"``👏{'👏'.join(table)}👏``")
    await ctx.send(embed=em)

@bot.command(aliases = ['avs'])
async def avatar(ctx, *,  avamember : discord.Member=None):
        userAvatarUrl = avamember.avatar
        emb = discord.Embed(title= f'Avatar de {avamember}' , description = f'**Lien :** {avamember.avatar.url}' , color=pink)
        emb.set_image(url=userAvatarUrl)
        await ctx.send(embed = emb)

@bot.command(brief="Gets an Emoji's Information (Must be a custom emoji)",aliases=['emojiinfo' , 'ei'],description="Gets information from a custom Discord emoji.")
async def emojinfo(ctx, emoji : discord.Emoji):
    embed=discord.Embed(title="", description="", color=0xb50db9)
    embed.set_author(name=f"{ctx.guild.name}",icon_url=bot.user.avatar)
    embed.set_thumbnail(url=emoji.url)
    embed.add_field(name="📛 Name:", value=emoji.name, inline=False)
    embed.add_field(name="🆔 ID :", value=f'{emoji.id}', inline=False)
    embed.add_field(name="🆔 Identifier :",value=f'`{emoji.name}:{emoji.id}`', inline=False)
    embed.add_field(name="❔ Require Colons ? :", value=str(emoji.require_colons), inline=False)
    embed.add_field(name="💻 Twitch Managed ? :", value=str(emoji.managed), inline=False)
    embed.add_field(name="🌍 Server :", value=str(emoji.guild.name), inline=False)
    embed.add_field(name="🗓 Created At :", value=str(emoji.created_at), inline=False)
    embed.add_field(name="😀 Emoji :", value='ㅤ', inline=False)
    embed.set_image(url=emoji.url)
    await ctx.send(embed=embed) 

@bot.command(brief="Gets information on a Roblox user's profile (ID Only)",alises=['rbl'])
async def roblox(ctx,*,user : int):
    try:
        res = await bot.session.get(f"https://api.roblox.com/users/{user}")
        x = await res.json()
        groups = await bot.session.get(f"https://api.roblox.com/users/{user}/groups")
        groups = await groups.json()

        fmt = ""
        for group in groups:
            fmt = fmt + f"\n{group['Name']} ({group['Id']})"
    except:
        return await ctx.send("Player not found")

    em = discord.Embed(title=f"{discord.utils.get(bot.emojis,id=608793165885079571)}Information for {x['Username']}{discord.utils.get(bot.emojis,id=608793165885079571)}",color=discord.Color.red())
    em.add_field(name="ID",value=x['Id'])
    em.add_field(name="Groups",value=(fmt if not fmt == "" else "No Groups Found (Either the endpoint is down, or the user is in no groups)"))
    em.set_thumbnail(url=f"https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&userId={x['Id']}")

    await ctx.send(embed=em)  

@bot.command(brief="Posts some text to Hastebin",aliases=['hb'])
async def hastebin(ctx,*,text : str = "http://www.script-o-rama.com/movie_scripts/a1/bee-movie-script-transcript-seinfeld.html"):
    x = await bot.session.post("https://hasteb.in/documents",data=str(text))
    buff = await x.json()
    await ctx.send(f"Sent the text to Hastebin!\nhttps://hasteb.in/{buff['key']}")

@bot.command(brief="Ships two users together")
async def ship(ctx, user : discord.Member, user2 : discord.Member):
    randomin = random.randint(0,100)
    fmt = ""
    if user == user2 or user2 == user:
        return await ctx.send("I cant ship the same person...")
    if (user.id == 478675118332051466 or user.id == 468785679036317699) and (user.id == 478675118332051466 or user.id == 468785679036317699):
        randomin = 100
    
    em = discord.Embed(title=f"{user.display_name} x {user2.display_name}",color=pink)
    
    if randomin >= 0:
        fmt = "Eeeeeeehhhhhhh..."
    if randomin >= 10:
        fmt = "Pas plus que des amis.."
    if randomin >= 20:
        fmt = "Peut être quelque chose.."
    if randomin >= 30:
        fmt = "Spécial... Coup de foudre possible?"
    if randomin >= 40:
        fmt = "Vous devez commencer a vous voir plus souvent..."
    if randomin >= 50:
        fmt = "Allez.. Je sais que vous vous aimez mutuellement"
    if randomin >= 60:
        fmt = "Waw encore quelques efforts ..."
    if randomin == 69:
        if ctx.channel.nsfw:
            fmt = "*moans* your cock is so erect... >.<"
        else:
            fmt = "Waw c'est un super score..."
    if randomin >= 70:
        fmt = "Un bon couple"
    if randomin >= 80:
        fmt = "Quasi parfait"
    if randomin >= 90:
        fmt = "Couple parfait .. Marriez vous!"
     
    em.add_field(name=f"{randomin}%",value=fmt)
    em.add_field(name="Ship Name",value=f"{(str(user.name))[:int(len((str(user.name))) / 2)] + (str(user2.name))[int(len((str(user2.name))) / 2):]}",inline=False)
    em.set_footer(text="Will make the image better once the bot has access to image manipulation")
    await ctx.send(embed=em)

@bot.command(brief="Googles a query for you",aliases=['g'])
async def google(ctx,*,text : str):
    async with ctx.message.channel.typing():
        re = search(query=text,tld='com',num=3,stop=3,safe=False,pause=2)
        st = []
        for s in re:
            st.append(f"<{s}>")
        fmt = '\n'.join(st)
        await ctx.send(f"Here are the top 3 results from a search:\n{fmt}")


@bot.command()
@commands.cooldown(1, 5, commands.BucketType.guild)
async def ping(ctx):
    await ctx.send(f'🏓 Pong! {round(bot.latency * 1000)} ms')
    await ctx.message.add_reaction(emoji='✅')

@bot.command()
async def virus(ctx, virus=None, *, user: discord.Member = None):
        '''
        Destroy someone's device with this virus command!
        '''
        if user == None:
            user = ctx.author
        else:
            virus = virus or 'discord'
            user = user 
        with open('/Users/nouhame/Bot_des_cerisiers/Python/data/virus.txt') as f:
            animation = f.read().splitlines()
        base = await ctx.send(animation[0])
        for line in animation[1:]:
            await base.edit(content=line.format(virus=virus, user=user))
            await asyncio.sleep(random.randint(1, 3))

@bot.group(invoke_without_command=True, aliases=['anim'])
async def animate(ctx, *, file):
        '''Animate a text file on discord!'''
        try:
            with open(f'Python/data/anime/{file}.txt') as a:
                animation = a.read().splitlines()
        except:
            await ctx.send('❌ File not found.')
            return await ctx.send(f"Available animations: `{', '.join([f[:-4] for f in os.listdir('Python/data/anime') if f.endswith('.txt')])}`") 
        base = await ctx.send(animation[0])
        for line in animation[1:]:
            await base.edit(content=line)
            await asyncio.sleep(float(random.randint(1, 2)))

@animate.command(aliases=['list','animatelist'])
async def alist(ctx):
        '''Lists all possible animations'''
        await ctx.send(f"Available animations: `{', '.join([f[:-4] for f in os.listdir('Python/data/anime') if f.endswith('.txt')])}`")


@bot.group(invoke_without_command=True)
async def lenny(ctx):
        """Lenny and tableflip group commands"""
        await ctx.send('Disponible : `+lenny face`, `+lenny shrug`, `+lenny tableflip`, `+lenny unflip`')

@lenny.command()
async def shrug(ctx):
        """Shrugs!"""
        await ctx.send(content='¯\\\_(ツ)\_/¯')

@lenny.command()
async def tableflip(ctx):
        """Tableflip!"""
        await ctx.send(content='(╯°□°）╯︵ ┻━┻')

@lenny.command()
async def unflip(ctx):
        """Unfips!"""
        await ctx.send(content='┬─┬﻿ ノ( ゜-゜ノ)')

@lenny.command()
async def face(ctx):
        """Lenny Face!"""
        await ctx.send(content='( ͡° ͜ʖ ͡°)')

@bot.command(aliases=['textemoji'])
async def textmojify(ctx, *, msg):
        """Convert text into emojis"""
        try:
            await ctx.message.delete()
        except discord.Forbidden:
            pass

        if msg != None:
            out = msg.lower()
            text = out.replace(' ', '    ').replace('10', '\u200B:keycap_ten:')\
                      .replace('ab', '\u200B🆎').replace('cl', '\u200B🆑')\
                      .replace('0', '\u200B:zero:').replace('1', '\u200B:one:')\
                      .replace('2', '\u200B:two:').replace('3', '\u200B:three:')\
                      .replace('4', '\u200B:four:').replace('5', '\u200B:five:')\
                      .replace('6', '\u200B:six:').replace('7', '\u200B:seven:')\
                      .replace('8', '\u200B:eight:').replace('9', '\u200B:nine:')\
                      .replace('!', '\u200B❗').replace('?', '\u200B❓')\
                      .replace('vs', '\u200B🆚').replace('.', '\u200B🔸')\
                      .replace(',', '🔻').replace('a', '\u200B🅰')\
                      .replace('b', '\u200B🅱').replace('c', '\u200B🇨')\
                      .replace('d', '\u200B🇩').replace('e', '\u200B🇪')\
                      .replace('f', '\u200B🇫').replace('g', '\u200B🇬')\
                      .replace('h', '\u200B🇭').replace('i', '\u200B🇮')\
                      .replace('j', '\u200B🇯').replace('k', '\u200B🇰')\
                      .replace('l', '\u200B🇱').replace('m', '\u200B🇲')\
                      .replace('n', '\u200B🇳').replace('ñ', '\u200B🇳')\
                      .replace('o', '\u200B🅾').replace('p', '\u200B🅿')\
                      .replace('q', '\u200B🇶').replace('r', '\u200B🇷')\
                      .replace('s', '\u200B🇸').replace('t', '\u200B🇹')\
                      .replace('u', '\u200B🇺').replace('v', '\u200B🇻')\
                      .replace('w', '\u200B🇼').replace('x', '\u200B🇽')\
                      .replace('y', '\u200B🇾').replace('z', '\u200B🇿')
            try:
                await ctx.send(text)
            except Exception as e:
                await ctx.send(f'```{e}```')
        else:
            await ctx.send('Write something, reee!', delete_after=3.0)


@bot.command(aliases=['8ball' , '8'])
async def eightball(ctx, *, question):
    responses = ["C'est certain.",
                 "C'est décidément ça.",
                 'Sans doute.',
                 'Oui décidément',
                 'Vous pouvez vous y fier',
                 'Comme je le vois oui.',
                 'Le plus probable',
                 'Bonnes perspectives.',
                 'Oui.',
                 'Les signes pointent vers Oui.',
                 'Réponse brumeuse, réessayer.',
                 'Demander à nouveau plus tard.',
                 'Mieux vaut ne pas te le dire maintenant.',
                 'Impossible de prédire maintenant',
                 'Concentrez-vous et demandez à nouveau.',
                 'Non',
                 "Ne comptez pas dessus.",
                 'Ma réponse est non.',
                 'Mes sources disent non.',
                 'Perspectives pas si bonnes.',
                 'Douteux.']
    await ctx.send(f'Question: {question}\nRéponse: {random.choice(responses)}')


@bot.command(
        brief='Brief Information of the Pokemon.'
    )
async def pokeInfo(ctx, name: str):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get(f"https://some-random-api.ml/pokedex?pokemon={name.lower()}") as r:
                    if r.status == 200:
                        data = await r.json(content_type=None)

                        if data is None:
                            await ctx.send(f"❌ Aucune information disponible pour `{name}`, merci de réessayer.")
                            return
                            
                        poke_name = data['name'].upper()
                        poke_type = data['type'][0]
                        poke_species = data['species'][0]
                        poke_description = data['description']
                        poke_url = data['sprites']['animated']

                        embed = discord.Embed(
                            title=poke_name,
                            colour=discord.Colour.dark_red()
                        )
                        embed.set_thumbnail(url=poke_url)
                        embed.add_field(name='👻 Type', value=poke_type, inline=False)
                        embed.add_field(name='👽 Espèces', value=poke_species, inline=False)
                        embed.add_field(name='🔖 Description', value=poke_description, inline=False)

                        await ctx.send(embed=embed)
                    else:
                        await ctx.send(f"❌ There is some problem, please try after some time.")

    
@bot.command(
        brief='Displays the Stats of Pokemon.'
    )
async def pokeStats(ctx, name: str=""):
        async with ctx.channel.typing():
            async with aiohttp.ClientSession() as cs:
                async with cs.get(f"https://some-random-api.ml/pokedex?pokemon={name.lower()}") as r:
                    if r.status == 200:
                        data = await r.json(content_type=None)

                        if data is None:
                            await ctx.send(f"❌ Aucune information disponible pour `{name}`, merci de réessayer.")
                            return

                        poke_name = data['name'].upper()
                        poke_hp = data['stats']['hp']
                        poke_attack = data['stats']['attack']
                        poke_defense = data['stats']['defense']
                        poke_spatk = data['stats']['sp_atk']
                        poke_spdef = data['stats']['sp_def']
                        poke_speed = data['stats']['speed']
                        poke_total = data['stats']['total']

                        embed = discord.Embed(
                            title=poke_name.upper(),
                            colour=discord.Colour.dark_red()
                        )
                        embed.set_thumbnail(url=data['sprites']['animated'])
                        embed.set_footer(text=(
                                f":hearts: PV: {poke_hp}\n"
                                f"🛡 Defense: {poke_defense}\n"
                                f":crossed_swords: Attaque: {poke_attack}\n"
                                f"🗡 Sp. Attack: {poke_spatk}\n"
                                f"🏰 Sp. Defense: {poke_spdef}\n"
                                f"👟 Vitesse: {poke_speed}\n"
                                f"💯 Total: {poke_total}\n"
                        ))

                        await ctx.send(embed=embed)
                    else:
                        await ctx.send(f"There is some problem, please try after some time.")

@bot.command(aliases = ['dé'])
async def rolldice(ctx):
    message = await ctx.send("Choissisez un nombre:\n**4**, **6**, **8**, **10**, **12**, **20** ")
    await ctx.send('Cette fonction est encore en bêta ...')
    
    def check(m):
        return m.author == ctx.author

    try:
        message = await bot.wait_for("message", check = check, timeout = 30.0)
        m = message.content

        if m != "4" and m != "6" and m != "8" and m != "10" and m != "12" and m != "20":
            await ctx.send("Sorry, invalid choice.")
            return
        
        coming = await ctx.send("Here it comes...")
        time.sleep(1)
        await coming.delete()
        await ctx.send(f"**{random.randint(1, int(m))}**")
    except asyncio.TimeoutError:
        await message.delete()
        await ctx.send("Procces has been canceled because you didn't respond in **30** seconds.")

    
@bot.command(aliases = ['bannière'])
async def banner(ctx, member:discord.Member):
    if member == None:
        member = ctx.author
        req = await bot.http.request(discord.http.Route("GET", "/users/{uid}", uid=member.id))
        banner_id = req["banner"]
        # If statement because the user may not have a banner
        if not ctx.guild.banner:
            return await ctx.send("❌ This user does not have a banner...")
        else:
            banner_url = f"https://cdn.discordapp.com/banners/{member.id}/{banner_id}?size=1024"
            embed = discord.Embed(color = pink , title = f'Banniére de {member}' ,  description= f' **Lien :** {banner_url}')
            embed.set_image(url=banner_url)
            await ctx.send(embed = embed)

@bot.command()
async def serverinfo(ctx):
    name = str(ctx.guild.name)
    description = str(ctx.guild.description)
    owner = str(ctx.guild.owner.mention)
    ownername = str(ctx.guild.owner)
    id = str(ctx.guild.id)
    region = str(ctx.guild.region)
    memberCount = str(ctx.guild.member_count)
    icon = str(ctx.guild.icon)
    total_roles = len(ctx.guild.roles)
    total_boosts = str(ctx.guild.premium_subscription_count)
    boost_level = str(ctx.guild.premium_tier)
    total_voice_channels = len(ctx.guild.voice_channels)
    total_channels = len(ctx.guild.channels)
    total_categories = len(ctx.guild.categories)
    total_text_channels = len(ctx.guild.text_channels)
    roles = "'".join([str(r.mention) for r in ctx.guild.roles])
    emojis = len([str(r) for r in ctx.guild.emojis])
    for i in bot.guilds:
        emoji = discord.utils.get(i.emojis)
    if not ctx.guild.banner:
        banniere = ':warning: Ce serveur ne dispose pas de bannière'
    else:
        banniere = discord.Guild.banner
    
    if not ctx.guild.description:
        description = ':warning: Ce serveur ne dispose pas de description'

    if region == 'deprecated':
        region = ':warning: La région du serveur est inconnue'

    features = []
    if "COMMUNITY" in ctx.guild.features:
            features.append("👥 Communauté")
    if "VERIFIED" in ctx.guild.features:
            features.append(f"✅ Vérifié")
    if "PARTNERED" in ctx.guild.features:
            features.append(f"🤝 En partenariat")
    if "DISCOVERABLE" in ctx.guild.features:
            features.append(f"🌍 Découvrable")
    if len(features) == 0:
            features.append("🚫 Aucune caractéristiques spéciales")

    embed = discord.Embed(title = name + "Server Information", description = description, color = ctx.guild.me.top_role.color)
    embed.set_thumbnail(url = icon)
    embed.add_field(name = "👑 Owner :", value = f'{owner}(`{ownername}`)', inline = True)
    embed.add_field(name = "🆔 ID :", value = f'**{id}**', inline = True)
    embed.add_field(name = "🌍 Région :", value = f'**{region}**', inline = False)
    embed.add_field(name = "👥 Nombre de membres :", value = f'**{memberCount}**', inline = False) 
    embed.add_field(name = "🟢 Nombre de membres en ligne :", value = f'**{memberCount}**', inline = False) 
    embed.add_field(name = f"🎭 Roles[{total_roles}] :", value = f"🚧 En maintenance", inline = False)
    embed.add_field(name = "😀 Emojis :", value = f'{emojis}', inline = False)
    embed.add_field(name = "💠 Nombre de boosts ( niveau de boost ) :", value = f"**{total_boosts}** Boosts ( Niveau **{boost_level}** )", inline = False)
    embed.add_field(name = "🗺 Nombre de salons :", value = f'**{total_channels}**', inline = False)
    embed.add_field(name = "🏢 Nombre de catégories :", value = f'**{total_categories}**', inline = False)
    embed.add_field(name = "💬 Nombre de salons textuels :", value = f'**{total_text_channels}**', inline = False)
    embed.add_field(name = "🎧 Nombre de salons vocaux :", value = f'**{total_voice_channels}**', inline = False)
    embed.add_field(name = "🪧 Bannière :", value = f'**{banniere}**', inline = False)
    embed.add_field(name = "🏷 Caractéristiques Spéciales :", value=", ".join(features))
    embed.add_field(name = "🔨 A2F demandé ?:", value = 'Oui' if ctx.guild.mfa_level else 'Non')
    embed.add_field(name = "🔒 Niveau de vérification:",value=f"{str(ctx.guild.verification_level).replace('_', ' ').title()}")
    embed.add_field(name = "🔞 Filtre NSWF",value=f"{str(ctx.guild.explicit_content_filter).replace('_', ' ').title()}")
    await ctx.send(embed = embed)



def embed_create(ctx, title=discord.Embed.Empty, description=discord.Embed.Empty, color=0x46ff2e):
    embed = discord.Embed(description=description, title=title, color=color)
    embed.set_footer(
        text="Command sent by {}".format(ctx.author),
        icon_url=ctx.author.avatar,
    )
    return embed

@bot.command(help="Lists all of the roles that the server has",aliases=['lr','l_r'])
async def list_roles(ctx):
        private = embed_create(ctx, title="Listing all roles:")
        for role in ctx.guild.roles:
            perms = get_perms(role.permissions)
            if len(private) >= 5000:
                try:
                    await ctx.author.send(embed=private)
                except:
                    err = embed_create(ctx, title="Error!", description="The bot can't DM you! Check your privacy settings...")
                    await ctx.send(embed=err)
                private = embed_create(ctx, title="Continuing...")
            private.add_field(name=f"@{role.name}", value=f"Top permission: {perms[0]}\n{len(role.members)} member(s) with {role.mention}\nRole ID: {role.id}\nCreated at: {role.created_at.strftime('%A, %d %b %Y, %I:%M:%S %p')}", inline=False)
        try:
            public = embed_create(ctx, title="Success!", description="List of roles have been sent to you!")
            await ctx.author.send(embed=private)
            await ctx.send(embed=public)
        except:
            err = embed_create(ctx, title="Error!", description="The bot can't DM you! Check your privacy settings...")
            await ctx.send(embed=err)


@bot.group(name = "profil", help = "View someone's profile")
async def _8488484848484(ctx, *,member: discord.Member = None, age = None):

    date_format = "%a, %d %b %Y %I:%M %p"

    pltfrm = "Travail"
    if str(member.mobile_status) != "offline":
        pltfrm = "Mobile"
    elif str(member.web_status) != "offline":
        pltfrm = "Site web"
    elif str(member.desktop_status) != "offline":
        pltfrm = "PC"
    else:
        pltfrm = "placeholder"



    emb = discord.Embed(title=f"Profil de {member}" , description='Ce profil est personnel (❌ En dev: ||Pour renseignez votre profil +profil age , +profil name , +profil color ou +profil help et autre||)')
    emb.add_field(name='Pseudo:',value=f"{member.mention}")
    emb.set_author(name=str(member), icon_url=member.avatar)
    emb.set_thumbnail(url=member.avatar)
    emb.add_field(name="A rejoin le :", value=member.joined_at.strftime(date_format))
    emb.add_field(name="Status :",value=(f"{pltfrm} ({str(member.status).capitalize()})" if pltfrm != "placeholder" else "Offline everywhere"))
    
    if isinstance(member.activity,discord.Spotify):
        title = "Écoute Spotify :"
        gm = f"Chanson: {member.activity.title}\nDe: {', '.join(member.activity.artists)}\nAlbum: {member.activity.album}"
    elif isinstance(member.activity,discord.Streaming):
        title = "En stream :"
        gm = f"{member.activity.name}"
    elif isinstance(member.activity,discord.Game) or isinstance(member.activity,discord.Activity):
        title = "Joue a :"
        gm = f"{member.activity.name}"
    else:
        title = "Joue a :"
        gm = "Ne joue a rien."
    emb.add_field(name=title,value=gm)
    await ctx.send(embed = emb)

    
    con = sqlite3.connect(f'{profile_db}')
    cur = con.cursor()


    cur.execute(f"INSERT INTO profile VALUES (,{age}")
    con.commit
    con.close

    await ctx.send(f'Age rensigné {ctx.author.mention}')


@bot.command()
async def emote(ctx, emojiname):
    for i in bot.guilds:
        emoji = discord.utils.get(i.emojis, name=emojiname)
        await ctx.send(emoji)

@bot.command(aliases = ['qrcode'])
async def qr(ctx, *, url):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(str(url))
        qr.make(fit=True)
        img = qr.make_image(fill_color="black",
                            back_color="white").convert('RGB')
        img.save('qrcode.png')
        await ctx.send(file=discord.File('qrcode.png'))

@bot.command()
async def translate(ctx, lang, *, thing):
    translator = Translator()
    translation = translator.translate(thing, dest=lang)
    await ctx.send(f'Vous avez traduit |`{thing}`| en |`{lang}`| et :\n **{translation.text}**')

@bot.command(aliases=['color', 'colour', 'sc'])
async def show_color(ctx, *, color: discord.Colour):
        '''Enter a color and you will see it!'''
        file = io.BytesIO()
        Image.new('RGB', (200, 90), color.to_rgb()).save(file, format='PNG')
        file.seek(0)
        em = discord.Embed(color=color, title=f'Showing Color: {str(color)}')
        em.set_image(url='attachment://color.png')
        await ctx.send(file=discord.File(file, 'color.png'), embed=em)

@bot.command()
async def tinyurl(ctx, *, link: str):
        await ctx.message.delete()
        url = 'http://tinyurl.com/api-create.php?url=' + link
        async with ctx.session.get(url) as resp:
            new = await resp.text()
        emb = discord.Embed(colour=await ctx.get_dominant_color(ctx.author.avatar))
        emb.add_field(name="Original Link", value=link, inline=False)
        emb.add_field(name="Shortened Link", value=new, inline=False)
        await ctx.send(embed=emb)

@bot.command()
async def uptime(ctx):
    startTime = time.time()
    uptime = str(datetime.timedelta(seconds=int(round(time.time()-startTime))))
    await ctx.send(uptime)
    


@bot.group(pass_context=True, aliases=['eji'], invoke_without_command=True)
async def emoji(ctx, *, msg):
        """
        View, copy, add or remove emoji.
        Usage:
        1) [p]emoji <emoji> - View a large image of a given emoji. Use [p]emoji s for additional info.
        2) [p]emoji copy <emoji> - Copy a custom emoji on another server and add it to the current server if you have the permissions.
        3) [p]emoji add <url> - Add a new emoji to the current server if you have the permissions.
        4) [p]emoji remove <emoji> - Remove an emoji from the current server if you have the permissions
        """
        await ctx.message.delete()
        emojis = msg.split()
        if msg.startswith('s '):
            emojis = emojis[1:]
            get_guild = True
        else:
            get_guild = False

        if len(emojis) > 5:
            return await ctx.send( "Maximum of 5 emojis at a time.")

        images = []
        for emoji in emojis:
            name, url, id, guild = (emoji)
            if url == "":
                await ctx.send("Could not find {}. Skipping.".format(emoji))
                continue
            response = requests.get(url, stream=True)
            if response.status_code == 404:
                await ctx.send("Emoji {} not available. Open an issue on <https://github.com/astronautlevel2/twemoji> with the name of the missing emoji".format(emoji))
                continue

            img = io.BytesIO()
            for block in response.iter_content(1024):
                if not block:
                    break
                img.write(block)
            img.seek(0)
            images.append((guild, str(id), url, discord.File(img, name)))

        for (guild, id, url, file) in images:
            if ctx.channel.permissions_for(ctx.author).attach_files:
                if get_guild:
                    await ctx.send(content='**ID:** {}\n**Server:** {}'.format(id, guild), file=file)
                else:
                    await ctx.send(file=file)
            else:
                if get_guild:
                    await ctx.send('**ID:** {}\n**Server:** {}\n**URL: {}**'.format(id, guild, url))
                else:
                    await ctx.send(url)
            file.close()

@emoji.command(pass_context=True, aliases=["steal"])
@commands.has_permissions(manage_emojis=True)
async def copy(ctx, *, msg):
        await ctx.message.delete()
        msg = re.sub("<:(.+):([0-9]+)>", "\\2", msg)

        match = None
        exact_match = False
        for guild in bot.guilds:
            for emoji in guild.emojis:
                if msg.strip().lower() in str(emoji):
                    match = emoji
                if msg.strip() in (str(emoji.id), emoji.name):
                    match = emoji
                    exact_match = True
                    break
            if exact_match:
                break

        if not match:
            return await ctx.send('Could not find emoji.')

        response = requests.get(match.url)
        emoji = await ctx.guild.create_custom_emoji(name=match.name, image=response.content)
        await ctx.send("Successfully added the emoji {0.name} <{1}:{0.name}:{0.id}>!".format(emoji, "a" if emoji.animated else ""))

@emoji.command(pass_context=True)
@commands.has_permissions(manage_emojis=True)
async def add(ctx, name, url):
        await ctx.message.delete()
        try:
            response = requests.get(url)
        except (requests.exceptions.MissingSchema, requests.exceptions.InvalidURL, requests.exceptions.InvalidSchema, requests.exceptions.ConnectionError):
            return await ctx.send( "The URL you have provided is invalid.")
        if response.status_code == 404:
            return await ctx.send("The URL you have provided leads to a 404.")
        try:
            emoji = await ctx.guild.create_custom_emoji(name=name, image=response.content)
        except discord.InvalidArgument:
            return await ctx.send("Invalid image type. Only PNG, JPEG and GIF are supported.")
        await ctx.send("Successfully added the emoji {0.name} <{1}:{0.name}:{0.id}>!".format(emoji, "a" if emoji.animated else ""))

@emoji.command(pass_context=True)
@commands.has_permissions(manage_emojis=True)
async def remove(ctx, name):
        await ctx.message.delete()
        emotes = [x for x in ctx.guild.emojis if x.name == name]
        emote_length = len(emotes)
        if not emotes:
            return await ctx.send("No emotes with that name could be found on this server.")
        for emote in emotes:
            await emote.delete()
        if emote_length == 1:
            await ctx.send(f"Successfully removed the {emote} emoji!".format(name))
        else:
            await ctx.send(f"Successfully removed {emote} emoji with the name {emote}.".format(emote_length, name))


@bot.command(aliases=['modonline'])
async def mods(ctx):
        """ Check which mods are online on current guild """
        message = ""
        all_status = {
            "online": {"users": [], "emoji": "Enligne (🟢) :"},
            "idle": {"users": [], "emoji": "Idle (🟡) :"},
            "dnd": {"users": [], "emoji": "Ne pas déranger (🔴) :"},
            "offline": {"users": [], "emoji": "Offline (⚪️) :"}
        }

        for user in ctx.guild.members:
            user_perm = ctx.channel.permissions_for(user)
            if user_perm.kick_members or user_perm.ban_members:
                if not user.bot:
                    all_status[str(user.status)]["users"].append(f"**{user}**")

        for g in all_status:
            if all_status[g]["users"]:
                message += f"**{all_status[g]['emoji']}** {', '.join(all_status[g]['users'])}\n"

        await ctx.send(f"Modérateur ou Administrateur en ligne du serveur: **{ctx.guild.name}**\n{message}")



#NSWF 
@commands.is_nsfw()
@bot.command()
async def fuck(ctx, user : discord.Member):
    r = requests.get("https://nekos.life/api/v2/img/randomHentaiGif")
    res = r.json()
    embed=discord.Embed(title=f"{ctx.author.mention} fucks {user.mention}! Must be real tight!",color=pink)
    embed.set_footer(text="Powered by furry.bot")
    embed.set_image(url=res['url'])
    await ctx.send(embed=embed)

@commands.is_nsfw()
@bot.command(brief="Test Command",hidden=True)
async def nsfwtest(ctx):
    await ctx.send("Worked")


@commands.is_nsfw()
@bot.command(brief="Searches Urban Dictionary for a definition of a word")
async def urban(ctx,*,word : str):
    res = await requests.get(f"http://api.urbandictionary.com/v0/define?term={word}")
    data = await res.json()
    obj = data['list'][1]
    em = discord.Embed(title=f"Urban Dictionary: {word}",color=discord.Color.dark_magenta())
    em.add_field(name="Definition",value=(obj['definition'] if len(obj['definition']) >= 2000 else obj['definition'][1:2000]))
    em.add_field(name="Example",value=obj['example'],inline=False)
    em.set_footer(text=f"Written by: {obj['author']}")
    await ctx.send(embed=em)




@commands.is_nsfw()
@bot.command(brief="Grabs a random hentai gif" , aliases = ['hgif' , 'gifh'])
async def hentaigif(ctx):
    r = requests.get("https://nekos.life/api/v2/img/Random_hentai_gif")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)

@commands.is_nsfw()
@bot.command( aliases = ['orgams'])
async def gams(ctx):
    r = requests.get("https://nekos.life/api/v2/img/gams")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)
  
@commands.is_nsfw()
@bot.command(brief="Grabs a random futanari pic")
async def futanari(ctx):
    r = requests.get("https://nekos.life/api/v2/img/futanari")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)

@commands.is_nsfw()
@bot.command(brief="Grabs a random anime pussy pic")
async def pussy(ctx):
    r = requests.get("https://nekos.life/api/v2/img/pussy")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)
    



@commands.is_nsfw()
@bot.command(brief="Grabs a random nsfw neko gif")
async def nsfwneko(ctx):                                                   
    r = requests.get("https://nekos.life/api/v2/img/nsfw_neko_gif")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)

@commands.is_nsfw()
@bot.command(brief="Grabs a lewd-y anime picture")
async def lewd(ctx):
    r = requests.get("https://nekos.life/api/v2/img/lewd")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)


@commands.is_nsfw()
@bot.command(brief="Grabs a picture of an anime trap")
async def trap(ctx):
    r = requests.get("https://nekos.life/api/v2/img/trap")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)



@commands.is_nsfw()
@bot.command(brief="Grabs a pic of anime girls solo'ing")
async def solo(ctx):
    r = requests.get("https://nekos.life/api/v2/img/solo")
    res = r.json()
    em = discord.Embed(color=discord.Color.random())
    em.set_image(url=res['url'])
    await ctx.send(embed=em)

#New ajouts


@bot.command(aliases=["flip", "coin"])
async def coinflip(ctx):
    """ Coinflip! """
    coinsides = ["Pile", "Face"]
    coinsidesrandom = random.choice(coinsides)
    if coinsidesrandom == "Pile":
        imagepile = 'https://c.tenor.com/nEu74vu_sT4AAAAC/heads-coinflip.gif'
    else:
        imagepile = "https://c.tenor.com/kK8D7hQXX5wAAAAS/coins-tails.gif"
    emb = discord.Embed(title="Pile ou face" , description=f"**{ctx.author.name}** A lancé la la piéce et a eu  **{coinsidesrandom}** !" , color = discord.Color.random())
    emb.set_image(url=imagepile)
    await ctx.send(embed = emb)

@bot.command(pass_context=True , aliases =['activity' , 'wip' 'quijoue'])
async def whoisplaying(ctx, *, game):
        """Check how many people are playing a certain game."""
        msg = ""
        for guild in bot.guilds:
            for user in guild.members:
                if user.activity is not None:
                    if user.activity.name is not None:
                        if user.activity.name.lower() == game.lower():
                            msg += "{}#{}\n".format(user.name, user.discriminator)
        msg = "\n".join(set(msg.split("\n")))  # remove dupes
        if len(msg) > 1500:
            hastebin_output = await hastebin(msg)
            await ctx.send("{}Large output posted to Hastebin: {}".format(hastebin_output))
        elif len(msg) == 0:
            await ctx.send("Nobody is playing that game!")
        else:
            embed = discord.Embed(title="Number of people playing {}".format(game), description=msg , color=pink)
            await ctx.send("", embed=embed)

@bot.command(aliases=['covid19'])
async def covid( ctx, country):

        embed = discord.Embed(title='🚧 Maintenance',description='🚧 Cette commande est en maintenance', color = warned)
        await ctx.send(embed=embed)
       # request_result = covid_api_request(f'dayone/country/{country}')

       # data_set = [(datetime.strptime(date_index['Date'], '%Y-%m-%dT%H:%M:%SZ').strftime('%b'), death_index['Deaths'])
                    #for date_index, death_index in zip(request_result, request_result)]

        # Plot
       # data_frame = pd.DataFrame(data_set)
        #data_frame.plot(x=0, y=1, color='#00012C', label='Months')

        # Label
       # pyplot.title(f'Showing Deaths in {country}')
       # pyplot.xlabel('Months')
       # pyplot.ylabel('Number of Deaths')
#
        # Legend
      #  pyplot.legend(loc='upper left')
##
        # Color
       # pyplot.axes().set_facecolor('#9A1622')

       # pyplot.savefig('.\\assets\\covid_death_graph.png', bbox_inches='tight')
##
       # await ctx.send(file=discord.File('.\\assets\\covid_death_graph.png'))

@bot.command()
async def afk(ctx, *, mins = None):
    current_nick = ctx.author.nick
    if mins == None:
        await ctx.send(f"{ctx.author.mention} merci de préciser le temps de votre afk")
        return
    else:
        emb = discord.Embed(title= "Afk" , description=f'{ctx.author.mention} est afk pour {mins} minute(s)' , color = 0xFFFFFF)
        await ctx.send(embed = emb)
        await ctx.author.edit(nick=f"{ctx.author.name} [AFK]")

    counter = 0
    while counter <= int(mins):
        counter += 1
        await asyncio.sleep(60)

        if counter == int(mins):
            await ctx.author.edit(nick=current_nick)
            await ctx.send(f"{ctx.author.mention} is no longer AFK")
            break

@bot.command(aliases=["mc"])
async def member_count(ctx):
    a=ctx.guild.member_count
    b=discord.Embed(title=f"Membres de {ctx.guild.name}",description=f" Il y a **{a}** membres",color=0xFFFFFF)
    b.set_author(name=f"{ctx.guild.name}",icon_url=bot.user.avatar)
    await ctx.send(embed=b)

@bot.command()
async def read(ctx, id: int=None):
        """Marks a specified server as read. If an ID is not provided, all servers will be marked as read."""
        await ctx.message.delete()
        if id:
            guild = bot.get_guild(int(id))
            if guild:
                await guild.ack()
                await ctx.send("Marked {} as read.".format(guild.name))
            else:
                await ctx.send("Invalid server ID.")
        else:
            for guild in bot.guilds:
                await guild.ack()
            await ctx.send("Marked {} guilds as read.".format(len(bot.guilds)))

@bot.command(pass_context=True)
async def code(ctx, *, msg):
        """Write text in code format."""
        await ctx.message.delete()
        await ctx.send("```" + msg.replace("`", "") + "```")

@bot.command()
async def calculate(ctx, operation, *nums):
    if operation not in ['+', '-', '*', '/']:
        await ctx.send('Please type a valid operation type.')
    var = f' {operation} '.join(nums)
    await ctx.send(f'{var} = {eval(var)}')

@bot.command(aliases=['d'], pass_context=True)
async def delete( ctx, txt=None, channel=None):
        """Deletes the last message sent or n messages sent. Ex: [p]d 5"""
        if txt:  # If number of seconds/messages are specified
            await ctx.message.delete()
            deleted = 0
            if txt == "all":
                limit = 1000
            else:
                txt = int(txt)
                limit = 200
                if txt > 200: 
                    txt = 200
            if channel:
                channel = (ctx.message.guild.channels, channel)
                if not channel: 
                    channel = (bot.get_all_channels(), channel)
            else: 
                channel = ctx.message.channel
            async for sent_message in channel.history():
                if sent_message.author == ctx.message.author:
                    try:
                        await sent_message.delete()
                        deleted += 1
                    except: 
                        pass
                    if deleted == txt: 
                        break
        else: # If no number specified, delete last message immediately
            msg = await ctx.message.channel.history(before=ctx.message).get(author=ctx.message.author)
            await ctx.message.delete()
            try:
                await msg.delete()
            except:
                pass
            

@bot.command(aliases = ['server' , 'serveur'])
async def support(ctx):
    embed = discord.Embed(color=pink,title = 'Invitation au serveur' , description='https://discord.gg/5R5486z773')
    await ctx.send(embed = embed)

@bot.command(aliases = ['invitation'])
async def invite(ctx):
    embed = discord.Embed(color=pink,title = 'Inviter le bot' , description='https://discord.com/api/oauth2/authorize?client_id=947123817132752916&permissions=1644972474359&scope=bot')
    await ctx.send(embed = embed)

@bot.command(pass_context=True)
async def spoiler(ctx, *, msg):
        """Spoiler tag. Ex: [p]spoiler Some book | They get married."""
        try:
            if " | " in msg:
                spoiled_work, spoiler = msg.lower().split(" | ", 1)
            else:
                spoiled_work = msg
                spoiler = msg
            await ctx.message.edit(content='Spoiler for `' + spoiled_work + '`: \n`'
                                        + ''.join(
                map(lambda c: chr(ord('a') + (((ord(c) - ord('a')) + 13) % 26)) if c >= 'a' and c <= 'z' else c,
                    spoiler))
                                        + '`\n'  + 'Use http://rot13.com to decode')
        except:
            await ctx.send('Could not encrypt spoiler.')


@bot.command(aliases = ['holp'])
async def aide(ctx):
    guild = ctx.guild
    emb = discord.Embed(color=soft_color , title= f"Fiche d'aide de {guild.name}" , description=f'{version} , Codée par nounou#4483')
    emb.set_author(name = guild.name , icon_url=guild.icon)
    emb.add_field(name='+helpall', value='Montre toutes les commandes')
    emb.add_field(name='+music', value='Joue de le musique')
    emb.add_field(name='+valorant', value='Get the most recent version of Valorant stats')
    emb.add_field(name='+join', value='Connect le bot a un channel vocal')
    emb.add_field(name='+leave', value='Deconnecte le bot du channel vocal')
    await ctx.send(embed=emb)


@bot.command(aliases = ['aidetout' , 'cmds'])
async def helpall(ctx):
    guild = ctx.guild
    embed = discord.Embed(color=soft_color , title= f"Fiche d'aide de {guild.name}" , description=f'{version} , Codée par nounou#4483')
    embed.add_field(name='__**Bot**__', value='ㅤ', inline=False)
    embed.add_field(name='+invite', value='Reçois un lien pour inviter le bot', inline=False)
    embed.add_field(name='+prefix', value='Reçevoir le prefix du bot', inline=False)
    embed.add_field(name='+support', value='Direct vers le serveur du créateur du bot \n', inline=False)
    embed.add_field(name='__**Modération**__', value='ㅤ')
    embed.add_field(name="+addrole", value="Description : La commande add role consiste à ajouter un rôle à un utilisateur, vous avez besoin de l'autorisation d'administrateur pour cette commande.", inline=False)
    embed.add_field(name="+addrole", value="Description : La commande add role consiste à ajouter un rôle à un utilisateur, vous avez besoin de l'autorisation d'administrateur pour cette commande.", inline=False)
    embed.add_field(name="+addrole", value="Description : La commande add role consiste à ajouter un rôle à un utilisateur, vous avez besoin de l'autorisation d'administrateur pour cette commande.", inline=False)
    embed.add_field(name="+ban", value="Description : il s'agit de la commande pour bannir un utilisateur, vous avez besoin de l'autorisation de bannissement des membres pour cette commande", inline=False)
    embed.add_field(name='+kick', value="Description : il s'agit de la commande pour expulser un utilisateur, vous avez besoin de l'autorisation d'expulser les membres pour cette commande", inline=False)
    embed.add_field(name='+clear', value = "Description : il s'agit de la commande pour supprimmer de messages, vous avez besoin de l'autorisation de gérer les messages pour cette commande", inline=False)
    embed.add_field(name="+unban", value="Description: Il s'agit de la commande pour débannir un utilisateur, vous avez besoin de l'autorisation de ban des membres pour cette commande", inline=False)
    embed.add_field(name="+warn", value="Description: C'est la commande pour avertir un utilisateur, vous avez besoin de la permission des membres kick pour cette commande.", inline=False)
    embed.add_field(name="+tempban", value="Description: C'est la commande pour bannir temporairement un utilisateur, vous avez besoin de la permission de ban pour cette commande.", inline=False)
    embed.add_field(name="+removerole", value="Description: La commande de suppression de rôle consiste à ajouter un rôle à un utilisateur, vous avez besoin de l'autorisation d'administrateur pour cette commande.", inline=False)
    embed.add_field(name="+tempmute ", value="Description: La commande de tempmute de membres consiste à mute un membre pendant le temps défini : d = jours ; m = minutes ; h = heures ; s = secondes, vous avez besoin de l'autorisation de kick pour cette commande. \n", inline=False)
    embed.add_field(name='**En cours de devloppement faites +help pour avoir toutes les commandes en affichage défaut et embed**', value='ㅤ')
    embed.add_field(name="Continuer ? (**indisponible merci d'attendre la version 1.2 de la bêta**)", value="Please select a reaction, choose the X mark to close or the check mark to continue.",inline=False)
    await ctx.send(embed=embed)



@bot.command(aliases=['fortnite_bug','f_bug','fbug'])
async def bugf(ctx):
        """Where to report a bug found in Fortnite."""
        embed = discord.Embed()
        embed.title = 'Epic Games Support'
        embed.colour = discord.Colour.blue()
        embed.description = 'How do I submit a bug report for Fortnite?'
        embed.url = 'http://fortnitehelp.epicgames.com/customer/en/portal/articles/2841545-how-do-i-submit-a-bug' \
                    '-report-for-fortnite- '
        embed.add_field(name='Report the Bug In-game',
                        value='• Open the game menu\n\n• Select *Feedback*\n\n• Select *Bug*\n\n'
                              '• Fill in the *Subject* and *Body* fields with your feedback\n\n• Select *Send*',
                        inline=False)
        embed.add_field(name='Report the Bug Online',
                        value='Additionally you can post in the Bug Reporting section of the forums.', inline=False)
        await ctx.send(embed=embed)


@bot.command(aliases = ['fortnitenews','f_news','fnews','newsf','news_f'])
async def newsbr(ctx):
    async with ctx.message.channel.typing():
        fortnite = requests.get("https://fortnite-api.com/v2/news/br").json()
        embed = discord.Embed(title="Fortnite BR News", color=0x2093C2)
        embed.set_image(url=fortnite["data"]["image"])
        embed.set_footer(text="Thanks For Using Lynx | @Grenadevisuals", icon_url='https://cdn.discordapp.com/attachments/748585359335489596/749286321109073930/H3IcPDkt_400x400.jpg')
        await ctx.send(embed=embed)

@bot.command()
async def fakeperson( ctx):
    async with ctx.message.channel.typing():
        embed = discord.Embed(title="Fake person generate", color=0x2093C2)
        embed.set_image(url="https://thispersondoesnotexist.com/image")
        embed.set_footer(text="Thanks For Using Lynx | @Grenadevisuals", icon_url='https://cdn.discordapp.com/attachments/748585359335489596/749286321109073930/H3IcPDkt_400x400.jpg')
        await ctx.send(embed=embed)
        
@bot.command()
async def song(ctx):
    async with ctx.message.channel.typing():
        fortnite = requests.get("https://sad-music-json-test.herokuapp.com/song").json()
        embed = discord.Embed(title=fortnite["Song"], color=0x2093C2)
        embed.set_footer(text="Thanks For Using Lynx | @Grenadevisuals", icon_url='https://cdn.discordapp.com/attachments/748585359335489596/749286321109073930/H3IcPDkt_400x400.jpg')
        await ctx.send(embed=embed)


@bot.command()
async def export(ctx, *, arg):
        embed = discord.Embed(title="Fortnite Export", color=0x2093C2)
        embed.set_image(url=f"https://benbotfn.tk/api/v1/exportAsset?path={arg}&lang=en&noVariants=false&rawIcon=false")
        embed.set_footer(text="By BenBot API | @Grenadevisuals")
        await ctx.send(embed=embed)




@bot.command(aliases=['fortnite_player','p_fortnite','fplayer','f_player' , 'fp','fortniteplayer','fortniteuser','fstats'])
async def fs(ctx, *args):
        username = list(args)
        format_player_name = '%20'.join(username)

        fortnite_response = fortnite_api_request_stats(username=format_player_name)

        if fortnite_response['status'] == 200:
            # Images
            fortnite_template_image = Image.open('/Users/nouhame/Bot_des_cerisiers/Python/assets/fortnite_template.png')

            # Fonts
            username_font = ImageFont.truetype('theboldfont.ttf', 50)
            stats_font = ImageFont.truetype('theboldfont.ttf', 40)

            # Positions
            username_position = 135, 163

            # Overall stats
            overall_wins_position = 43, 300
            overall_win_rate_position = 155, 300
            overall_kd_position = 285, 300
            overall_kpm_position = 400, 300
            overall_matches_position = 63, 450
            overall_kills_position = 210, 450
            overall_deaths_position = 350, 450

            # Solo stats
            solo_matches_position = 540, 130
            solo_wins_position = 685, 130
            solo_win_rate_position = 795, 130
            solo_kills_position = 910, 130
            solo_deaths_position = 1050, 130
            solo_kd_position = 1170, 130
            solo_kpm_position = 1270, 130

            # Duo stats
            duo_matches_position = 540, 345
            duo_wins_position = 685, 345
            duo_win_rate_position = 795, 345
            duo_kills_position = 910, 345
            duo_deaths_position = 1050, 345
            duo_kd_position = 1170, 345
            duo_kpm_position = 1270, 345

            # Squad stats
            squad_matches_position = 540, 560
            squad_wins_position = 685, 560
            squad_win_rate_position = 795, 560
            squad_kills_position = 910, 560
            squad_deaths_position = 1050, 560
            squad_kd_position = 1170, 560
            squad_kpm_position = 1270, 560

            # Draws
            draw_on_image = ImageDraw.Draw(fortnite_template_image)

            # Username
            draw_on_image.text(username_position, fortnite_response['data']['account']['name'], 'white',
                               font=username_font)

            # Overall stats
            if fortnite_response['data']['stats']['all']['overall'] is not None:
                draw_on_image.text(overall_wins_position,
                                   str(fortnite_response['data']['stats']['all']['overall']['wins']),
                                   'white', font=stats_font)
                draw_on_image.text(overall_win_rate_position,
                                   str(round(fortnite_response['data']['stats']['all']['overall']['winRate'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(overall_kd_position,
                                   str(round(fortnite_response['data']['stats']['all']['overall']['kd'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(overall_kpm_position,
                                   str(round(fortnite_response['data']['stats']['all']['overall']['killsPerMatch'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(overall_matches_position,
                                   str(fortnite_response['data']['stats']['all']['overall']['matches']),
                                   'white', font=stats_font)
                draw_on_image.text(overall_kills_position,
                                   str(fortnite_response['data']['stats']['all']['overall']['kills']),
                                   'white', font=stats_font)
                draw_on_image.text(overall_deaths_position,
                                   str(fortnite_response['data']['stats']['all']['overall']['deaths']),
                                   'white', font=stats_font)

            # Solo stats
            if fortnite_response['data']['stats']['all']['solo'] is not None:
                draw_on_image.text(duo_matches_position,
                                   str(fortnite_response['data']['stats']['all']['solo']['matches']),
                                   'white', font=stats_font)
                draw_on_image.text(duo_wins_position, str(fortnite_response['data']['stats']['all']['solo']['wins']),
                                   'white', font=stats_font)
                draw_on_image.text(duo_win_rate_position,
                                   str(round(fortnite_response['data']['stats']['all']['solo']['winRate'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(duo_kills_position,
                                   str(fortnite_response['data']['stats']['all']['solo']['kills']),
                                   'white', font=stats_font)
                draw_on_image.text(duo_deaths_position,
                                   str(fortnite_response['data']['stats']['all']['solo']['deaths']),
                                   'white', font=stats_font)
                draw_on_image.text(duo_kd_position,
                                   str(round(fortnite_response['data']['stats']['all']['solo']['kd'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(duo_kpm_position,
                                   str(round(fortnite_response['data']['stats']['all']['solo']['killsPerMatch'], 2)),
                                   'white', font=stats_font)

            # Duo stats
            if fortnite_response['data']['stats']['all']['duo'] is not None:
                draw_on_image.text(solo_matches_position,
                                   str(fortnite_response['data']['stats']['all']['duo']['matches']),
                                   'white', font=stats_font)
                draw_on_image.text(solo_wins_position, str(fortnite_response['data']['stats']['all']['duo']['wins']),
                                   'white', font=stats_font)
                draw_on_image.text(solo_win_rate_position,
                                   str(round(fortnite_response['data']['stats']['all']['duo']['winRate'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(solo_kills_position,
                                   str(fortnite_response['data']['stats']['all']['duo']['kills']),
                                   'white', font=stats_font)
                draw_on_image.text(solo_deaths_position,
                                   str(fortnite_response['data']['stats']['all']['duo']['deaths']),
                                   'white', font=stats_font)
                draw_on_image.text(solo_kd_position,
                                   str(round(fortnite_response['data']['stats']['all']['duo']['kd'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(solo_kpm_position,
                                   str(round(fortnite_response['data']['stats']['all']['duo']['killsPerMatch'], 2)),
                                   'white', font=stats_font)

            # Squad stats
            if fortnite_response['data']['stats']['all']['squad'] is not None:
                draw_on_image.text(squad_matches_position,
                                   str(fortnite_response['data']['stats']['all']['squad']['matches']),
                                   'white', font=stats_font)
                draw_on_image.text(squad_wins_position, str(fortnite_response['data']['stats']['all']['squad']['wins']),
                                   'white', font=stats_font)
                draw_on_image.text(squad_win_rate_position,
                                   str(round(fortnite_response['data']['stats']['all']['squad']['winRate'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(squad_kills_position,
                                   str(fortnite_response['data']['stats']['all']['squad']['kills']),
                                   'white', font=stats_font)
                draw_on_image.text(squad_deaths_position,
                                   str(fortnite_response['data']['stats']['all']['squad']['deaths']),
                                   'white', font=stats_font)
                draw_on_image.text(squad_kd_position,
                                   str(round(fortnite_response['data']['stats']['all']['squad']['kd'], 2)),
                                   'white', font=stats_font)
                draw_on_image.text(squad_kpm_position,
                                   str(round(fortnite_response['data']['stats']['all']['squad']['killsPerMatch'], 2)),
                                   'white', font=stats_font)

            # Save image
            fortnite_template_image.convert('RGB').save('fortnite.jpg', 'JPEG')

            await ctx.send(file=discord.File('fortnite.jpg'))

        else:
            await ctx.send(f":no_entry: **{fortnite_response['error']}**")


@bot.command()
async def fm(ctx):
    'k'
@bot.command(aliases=['listen'])
async def track(ctx, user: discord.Member = None):
        user = user or ctx.author
        spotify_result = next((activity for activity in user.activities if isinstance(activity, discord.Spotify)), None)

        if spotify_result is None:
            await ctx.send(f'{user.name} is not listening to Spotify.')

        # Images
        track_background_image = Image.open('Python/assets/spotify_template.png')
        album_image = Image.open(requests.get(spotify_result.album_cover_url, stream=True).raw).convert('RGBA')

        # Fonts
        title_font = ImageFont.truetype('theboldfont.ttf', 16)
        artist_font = ImageFont.truetype('theboldfont.ttf', 14)
        album_font = ImageFont.truetype('theboldfont.ttf', 14)
        start_duration_font = ImageFont.truetype('theboldfont.ttf', 12)
        end_duration_font = ImageFont.truetype('theboldfont.ttf', 12)

        # Positions
        title_text_position = 150, 30
        artist_text_position = 150, 60
        album_text_position = 150, 80
        start_duration_text_position = 150, 122
        end_duration_text_position = 515, 122

        # Draws
        draw_on_image = ImageDraw.Draw(track_background_image)
        draw_on_image.text(title_text_position, spotify_result.title, 'white', font=title_font)
        draw_on_image.text(artist_text_position, f'by {spotify_result.artist}', 'white', font=artist_font)
        draw_on_image.text(album_text_position, spotify_result.album, 'white', font=album_font)
        draw_on_image.text(start_duration_text_position, '0:00', 'white', font=start_duration_font)
        draw_on_image.text(end_duration_text_position,
                           f"{dateutil.parser.parse(str(spotify_result.duration)).strftime('%M:%S')}",
                           'white', font=end_duration_font)

        # Background colour
        album_color = album_image.getpixel((250, 100))
        background_image_color = Image.new('RGBA', track_background_image.size, album_color)
        background_image_color.paste(track_background_image, (0, 0), track_background_image)

        # Resize
        album_image_resize = album_image.resize((140, 160))
        background_image_color.paste(album_image_resize, (0, 0), album_image_resize)

        # Save image
        background_image_color.convert('RGB').save('spotify.jpg', 'JPEG')

        await ctx.send(file=discord.File('spotify.jpg'))

@bot.command()
async def voice(ctx):
        with open('Python/ext/voice_leaderbord.json', 'r') as file:
            voice_data = json.load(file)

        user_ids = list(voice_data.keys())
        user_time_spents = list(voice_data.values())

        new_leaderboard = []

        for index, user_id in enumerate(user_ids, 1):
            new_leaderboard.append([user_id, user_time_spents[index - 1]])

        # Sort leaderboard order by user time spent
        new_leaderboard.sort(key=lambda items: items[1], reverse=True)

        user_rank_column = []
        user_name_column = []
        user_time_spent_column = []

        # User rank
        for rank_index, rank_value in enumerate(new_leaderboard[:10]):
            user_rank_column.append([rank_index + 1])

        # User name
        for name_index, name_value in enumerate(new_leaderboard[:10]):
            user_name_column.append([await bot.fetch_user(int(name_value[0]))])

        # User time spend
        for time_spent_index, time_spent_value in enumerate(new_leaderboard[:10]):
            user_time_spent_column.append([time_spent_value[1]])

        # Append column to table
        user_rank_table = tabulate(user_rank_column, tablefmt='plain', headers=['#\n'], numalign='left')
        user_name_table = tabulate(user_name_column, tablefmt='plain', headers=['Name\n'], numalign='left')
        user_time_spent_table = tabulate(user_time_spent_column, tablefmt='plain', headers=['Time Spent\n'],
                                         numalign='left')

        # Image
        image_template = Image.open('Python/assets/voice_leaderboard_template.png')

        # Font
        font = ImageFont.truetype('theboldfont.ttf', 14)

        # Positions
        rank_text_position = 30, 50
        name_text_position = 80, 50
        rank_time_spent_text_position = 330, 50

        # Draws
        draw_on_image = ImageDraw.Draw(image_template)
        draw_on_image.text(rank_text_position, user_rank_table, 'white', font=font)
        draw_on_image.text(name_text_position, user_name_table, 'white', font=font)
        draw_on_image.text(rank_time_spent_text_position, user_time_spent_table, 'white', font=font)

        # Save image
        image_template.convert('RGB').save('voice_leaderboard.jpg', 'JPEG')

        await ctx.send(file=discord.File('voice_leaderboard.jpg'))

@pussy.error
@delete.error
@mods.error
@code.error
@kill.error
@calculate.error
@solo.error
@hug.error
@lenny.error
@slap.error
@kiss.error
@emojinfo.error
@trap.error
@emoji.error
@avatar.error
@banner.error
@virus.error
@qr.error
@translate.error
@covid.error
@nsfwtest.error
@nsfwneko.error
@spoiler.error
@google.error
@textmojify.error
@translate.error
async def error_handeler(ctx, error): #Error handler     
    if isinstance(error, commands.MissingPermissions):
        coderror = 'Erreur 201'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Permission non valide !", description = f" {ctx.author.name}, Vous devez avoir la bonne permission !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return

    if isinstance(error, commands.CommandNotFound):
        coderror = 'Erreur 101'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Commande introuvable !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.DisabledCommand):
        coderror = 'Erreur 102'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, La commande est désavctivée !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.NoPrivateMessage):
        coderror =  'Erreur 402'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Il y a un problème avec l'user que je ne peux définir !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.NotOwner):
        coderror = 'Erreur 401'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Cette commande est réservée aux devloppeurs !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.CommandOnCooldown):
        coderror = 'Erreur 103'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Merci d'attendre la fin du cooldown !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.CheckFailure):
        coderror = 'Erreur 202'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Erreur depuis le code source !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.MissingRequiredArgument):
        coderror = 'Erreur 302'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Il manque un argument !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    else:
        coderror = 'Erreur 000'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f'Erreur indeterminée: {error} \n (**{coderror}**)' , color = red ))
        print(error)
        print(coderror)

    code = ''.join(random.choice(string.ascii_letters + string.digits) for i in range(10))


bot.run('OTQ0NTcyODYxODc0NjAyMDU0.GcQCUD.R1GHmfb79mYZVxyw6tou3QZU8bqMKliteYWNWk')

