
from ast import Str
from importlib import reload
from io import BytesIO
import sqlite3
from tkinter import Image
from unicodedata import category
from wsgiref.simple_server import sys_version
import discord
from discord.ext import commands
import time
import asyncio
from datetime import datetime, timedelta
import random
from matplotlib.pyplot import title
import requests
import sys
import humanfriendly
import datetime as tiime
from discord.ui import Button, View
from PIL import Image
import os
from better_profanity import profanity
import psutil


weather_key = 'a95f57e8f8b93ef367d40c4e364323f0'
base_url = "http://api.openweathermap.org/data/2.5/weather?"

intents = discord.Intents.all()
bot = commands.Bot(command_prefix='+' , intents = intents )
upTime = time.time()
db_name='bot.sqlite'

bot_id = '947123817132752916'


verified_emoji = "<a:verified:950028918553989151>"



footer = "**Fleur de cersisier © 2022**"
green = 0xFF000 
red = 0xD9001D
warned = 0xff9f40
color1 = [0xFD6C9E , 0xFFFFFF]
pink =0xFD6C9E

balance_emoji = "<:balance:993908048231944312>"
brillance_emoji = "<:brillance:993908025331023973>"
bravery_emoji = "<:bravery:993908023242281171>"

maintenance = discord.Embed(title='🚧 Maintenance',description=':tools: Cette commande est en maintenance', color = warned)


soft_color = random.choice(color1)

bot_emoji = '<:Bot:993821529123070013>'
nitro_animate = '<a:nitro:994950099555864598>'
alert_arrows_emoji = '<:alert:994948044678250536>'
alert_emoji = '<:alert1:994950131029921833>'
analytics_emoji = '<:analytics:994948046314012772>'
chat_emoji ='<:chat:995075584147345439>'
checkcase_emoji = '<:checkcase:994948722922377219>'
id_emoji ='<:id:994948765515530290>'
join_emoji = '<:join:994948651539513404>'
leave_emoji = '<:leave:994949690103693352>'
no = '<:no:994948190606475334>'
rules_emoji = '<:rules:995075545924636733>'
vocal_emoji = '<:vocal:995075622198054992>'
timeout_emoji = '<:timeout:994965546212786236>'
mod_emoji = '<:4641moderator:995084784990691409>'
chat1_emoji = "<:chat1:995085442812747957>"


button_false_user_emb = discord.Embed(title=f'{no} Erreur',description="⛔ **Cette interaction ne t'appartiens pas**",color=red)

apikeycrypto = '70bdea57-277a-40b7-862f-6df6b8c14017'

warn_footer = 'Une fois le bouton choisis le message se supprimera automatiquement au bout de 10 secondes'


bot.remove_command('help')

version = '1.2'

server_name = "Fleur de cerisier"
devMode = False               
helpContinue = "✅"
helpStop = "❌"
supportCreate = "✋"
supportCategory = "TICKETS"
serverId = 901203095411892324
numOfTickets = 0
aide = 'nounou#4483 ou un admin'

missing_req_arg = "Il manque un argument raison , user , commande ou d'autres regardez l'utilisation de la commande"

@bot.event
async def on_ready():
    print('Bot en réveil')
    profanity.load_censor_words()


    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS warn
                (idAuthor int,
                idMember int,
                date float, 
                reason text,
                type text,
                server int)''')

    cur.execute('''CREATE TABLE IF NOT EXISTS kick
                (idAuthor int,
                idMember int,
                date float, 
                reason text,
                type text,
                server int)''')

    cur.execute('''CREATE TABLE IF NOT EXISTS softkick
                (idAuthor int,
                idMember int,
                date float, 
                reason text,
                type text,
                server int)''')
    
    cur.execute('''CREATE TABLE IF NOT EXISTS ban
                (idAuthor int,
                idMember int,
                date float, 
                reason text,
                type text,
                server int)''')

    cur.execute('''CREATE TABLE IF NOT EXISTS mute
                (idAuthor int,
                idMember int,
                date float, 
                reason text,
                time text,
                type text,
                server int)''')
        
    cur.execute('''CREATE TABLE IF NOT EXISTS softban
                (idAuthor int,
                idMember int,
                date float, 
                reason text,
                type text,
                server int)''')

    cur.execute('''CREATE TABLE IF NOT EXISTS tempban
                (idAuthor int,
                idMember int,
                date float, 
                reason text,
                time float,
                type text,
                server int)''')

    cur.execute('''CREATE TABLE IF NOT EXISTS automod
                (idMember int,
                count int DEFAULT '0',
                server int,
                activated bool DEFAULT '0')''')

    print('Base SQLite chargée')
    

    con.commit()
    con.close()


@bot.event
async def on_message(message):

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    await bot.process_commands(message)

    ctx = await bot.get_context(message)

    if profanity.contains_profanity(message.content) == True:

        if message.author.guild_permissions.administrator or message.author.guild_permissions.ban_members or message.author.guild_permissions.kick_members == True:
            return

        await message.delete()

        censored_text = profanity.censor(message.content,'-')




        count_member_automod = cur.execute(f'SELECT count FROM automod WHERE idMember={message.author.id}').fetchone()
        print(count_member_automod)

        if count_member_automod == None:
            count_member_automod = 1
            cur.execute(f"INSERT INTO automod VALUES ({message.author.id}, {count_member_automod},{message.guild.id},{True})")
        else:
            count_member_automod = count_member_automod[0] + 1
            cur.execute(f"UPDATE automod SET count = {count_member_automod} WHERE idMember={message.author.id} AND server = {message.guild.id}")
        
        con.commit()
        con.close()

        sent1 = await message.channel.send(message.author.mention)
        emb = discord.Embed(title = ":warning: Automod", description=f"🚫 **Votre message a été supprimé car il contenait un mot interdit sur le serveur.**\n En l'occurence le mot : `{censored_text}`\nCeci est votre **{count_member_automod}** avertissement",color = warned)
        emb.set_footer(text="🤖 BOT AUTOMOD SYSTEM")
        sent = await message.channel.send(embed = emb)



        if count_member_automod == 3:
            sent1 = await message.channel.send(message.author.mention)
            emb = discord.Embed(title = ":warning: Automod", description=f"🚫 **Votre message a été supprimé car il contenait un mot interdit sur le serveur.**\n En l'occurence le mot : `{censored_text}`\nCeci est votre **{count_member_automod}** avertissement\n**Sanction:** `Warn`",color = warned)
            emb.set_footer(text="🤖 BOT AUTOMOD SYSTEM")
            sent = await message.author.send(embed = emb)
            await message.channel.send(embed = emb)
            await do_warn(ctx, message.author,'BOT AUTOMOD SYSTEM: Mot interdits envoyés a 3 reprises')



        elif count_member_automod == 6:
            sent1 = await message.channel.send(message.author.mention)
            emb = discord.Embed(title = ":warning: Automod", description=f"🚫 **Votre message a été supprimé car il contenait un mot interdit sur le serveur.**\n En l'occurence le mot : `{censored_text}`\nCeci est votre **{count_member_automod}** avertissement\n**Sanction:** `Mute`",color = warned)
            emb.set_footer(text="🤖 BOT AUTOMOD SYSTEM")
            await message.author.send(embed = emb)
            sent = await message.channel.send(embed = emb)
            await do_mute(ctx, message.author, '1h', 'BOT AUTOMOD SYSTEM: Mot interdits envoyés a 6 reprises')



        elif count_member_automod >= 8:
            
            sent1 = message.channel.send(message.author.mention)
            emb = discord.Embed(title = ":warning: Automod", description=f"🚫 **Votre message a été supprimé car il contenait un mot interdit sur le serveur.**\n En l'occurence le mot : `{censored_text}`\nCeci est votre **{count_member_automod}** avertissement\n**Sanction:** `Admin and Moderator Alert + Mute 2h`",color = warned)
            emb.set_footer(text="🤖 BOT AUTOMOD SYSTEM")
            await message.author.send(embed = emb)
            sent = await message.channel.send(embed = emb)
            await do_mute(ctx, message.author, '2h', 'BOT AUTOMOD SYSTEM: Mot interdits envoyés a 8 reprises')
        await asyncio.sleep(10)
        await sent.delete()
        await sent1.delete()


@bot.command(aliases=['infobot'])
async def botinfo(ctx):
    '''Shows info about bot'''

    is_verified_bot = bot.user.public_flags.verified_bot

    latency_total = bot.latency

    python_version_all = sys.version

    python_version = python_version_all[0:6]

    latency = round(latency_total,3)

    memory_still_all = psutil.virtual_memory().available * 100 / psutil.virtual_memory().total
    memory_still = round(memory_still_all,3)

    serversembed = discord.Embed( title = f'📝 Informations sur {bot.user.name}', color=ctx.guild.me.top_role.color)
    serversembed.add_field(name = '🤖 | Bot certifié :', value = is_verified_bot)
    serversembed.add_field(name = '📡 | Je suis actif sur :',value = f"{len(bot.guilds)} serveurs.", inline = False)
    serversembed.add_field(name ="🏓 | J'ai un ping de : ",value = f"{latency} ms", inline = False)
    serversembed.add_field(name ="📋 | Nom :", value = bot.user.name, inline = False)
    serversembed.add_field(name ="🔗 | Tag :",value = f"#{bot.user.discriminator}", inline = False)
    serversembed.add_field(name ="📊 | Utilisateurs :", value = len(bot.users), inline = False)
    serversembed.add_field(name ="👥 | Utilisateurs en ligne :", value=str(len({m.id for m in bot.get_all_members() if m.status is not discord.Status.offline})))
    serversembed.add_field(name ="🔧 | Version de discord.py :", value=discord.__version__, inline = False)
    serversembed.add_field(name ="🔨 | Version de Python :", value= python_version, inline = False)
    serversembed.add_field(name ="🟢 | En ligne depuis :", value = f"{round(time.time() - upTime)} seconds", inline = False)
    serversembed.add_field(name ="💾 | Mémoire et CPU :", value = f"💽 CPU Utilisé : `{psutil.cpu_percent()}%`\n💾 Mémoire Utilisée : `{psutil.virtual_memory().percent}%`\n💾 Mémoire Restante: `{memory_still}%`", inline = False)
    serversembed.add_field(name ="🧑🏻‍💻 | Développeurs :", value =  "**nounou#0001** , **Deku Midoriya#6946**", inline = False)
    serversembed.set_footer(text=ctx.guild.name,icon_url= ctx.guild.icon)

    serversembed.set_thumbnail(url = bot.user.avatar)
    serversembed.timestamp = datetime.utcnow()
    await ctx.send(embed = serversembed)


@bot.command()
async def uptime(ctx):
        text = f'{round(time.time() - upTime)}'
        embed = discord.Embed(colour=soft_color)
        embed.add_field(name="🕰 Bot Uptime", value=f'`{text} secondes`')
        try:
            await ctx.send(embed=embed)
        except discord.HTTPException:
            await ctx.send("Current uptime: " + text)

@bot.command(aliases=['btc','bitcoins','BTC'])
async def bitcoin(ctx):
    headers = {
    'X-CMC_PRO_API_KEY' : apikeycrypto,
    'Accepts': 'application/json'
    }

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

    json = requests.get(url, headers=headers).json()

    crypto = json['data']

    for x in crypto:
        if x['symbol'] == 'BTC':
            coin = f"**{x['symbol']} :** {x['quote']['USD']['price']}"
            embed = discord.Embed(title="📈 Cours du Bitcoin (BTC)" , color = discord.Color.orange())
            embed.add_field(name=f"En DOLLAR :",value=f"{coin}$")     
            await ctx.send(embed=embed)

@bot.command(aliases=['ethereum','ether','ETH'])
async def eth(ctx): 
    headers = {
    'X-CMC_PRO_API_KEY' : apikeycrypto,
    'Accepts': 'application/json'
    }
    

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

    json = requests.get(url, headers=headers).json()

    crypto = json['data']

    for x in crypto:
        if x['symbol'] == 'ETH':
            coin = f"**{x['symbol']} :** {x['quote']['USD']['price']} USD"
            embed = discord.Embed(title="📈 Cours de l'Ethereum (ETH)", color = discord.Color.dark_grey())
            embed.add_field(name=f"En USD:",value=f"{coin}")
            await ctx.send(embed=embed)

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


@bot.command(aliases=['mon_ip','my_ip','ip_find','mon_id','my_id'])
async def iplookup(ctx, *, ippadr: str = '9.9.9.9'):

    warnemb = discord.Embed(title=f":warning: Vous vous apprêtez a afficher toutes vos données privées dans ce salon.",description=f"**Vous pouvez recevoir vos données par Messagerie Privée grace au bouton MP**. Êtes vous sur de vouloir continuer votre action.\n\n**Merci de valider :**\n",color=warned)
    warnemb.set_footer(text=warn_footer)


    buttonYes = Button(label='Oui', style=discord.ButtonStyle.green)
    buttonMP = Button(label='MP', style=discord.ButtonStyle.blurple , emoji='📨')


    r = requests.get(f"https://extreme-ip-lookup.com/json/?key=85mAMb7HJMXhKbeToK63")
    geo = r.json()
    em = discord.Embed(color = discord.Color.blurple())
    fields = [
        {'name': 'IP', 'value': geo['query']},
        {'name': 'IP Type', 'value': geo['ipType']},
        {'name': 'Country', 'value': geo['country']},
        {'name': 'City', 'value': geo['city']},
        {'name': 'Continent', 'value': geo['continent']},
        {'name': 'IP Name', 'value': geo['ipName']},
        {'name': 'ISP', 'value': geo['isp']},
        {'name': 'Latitude', 'value': geo['lat']},
        {'name': 'Longitude', 'value': geo['lon']},
        {'name': 'ORG', 'value': geo['org']},
        {'name': 'Region', 'value': geo['region']},
        {'name': 'Status', 'value': geo['status']},
    ]
    for field in fields:
        if field['value']:
            em.set_footer(text='\u200b')
            em.timestamp = datetime.utcnow()
            em.add_field(name = field['name'], value = field['value'], inline = True)

        

    async def button_callbackYes(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        await interaction.response.send_message(embed = em)
        buttonYes.callback = button_disabled
        buttonMP.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        return

    async def button_callbackMP(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        await ctx.author.send(embed=em)
        await interaction.response.send_message('✅ Votre ip vous a été envoyée par MP.')
        buttonYes.callback = button_disabled
        buttonMP.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        return
    
    async def button_disabled(interaction):
        return


    buttonYes.callback = button_callbackYes
    buttonMP.callback = button_callbackMP

    view = View()
    view.add_item(buttonYes)
    view.add_item(buttonMP)
    sent = await ctx.send(embed=warnemb, view=view)

@bot.command()
async def wanted(ctx, member: discord.Member = None):
    if member == None:
        member = ctx.author

    wanted = Image.open('/Users/nouhame/Bot_des_cerisiers/Python/data/data.jpeg')


    data = BytesIO(await member.display_avatar.read())
    pfp = Image.open(data)

    pfp = pfp.resize((90, 90))

    wanted.paste(pfp, (50, 115))
    wanted.save("wanted.jpg")

    await ctx.reply(file = discord.File('wanted.jpg'))


@bot.command()
async def drake(ctx, msg1, msg2):
    embed = discord.Embed(title='Drake Meme', color=discord.Color.random())
    embed.set_image(url=f"https://api.popcat.xyz/drake?text1={msg1}&text2={msg2}")
    await ctx.send(embed=embed)

@bot.command()
async def pooh(ctx, msg1, msg2):
    embed = discord.Embed(title="Winnie l'Ourson Meme", color=discord.Color.random())
    embed.set_image(url=f"https://api.popcat.xyz/pooh?text1={msg1}&text2={msg2}")
    await ctx.send(embed=embed)


@bot.command(aliases = ['reloadactivity','bot_stop','stopbot','botstop','stopactivity','botreload','reloadbot','veillle','stop','éteindre'])
@commands.has_permissions(administrator = True)
async def emergencystop(ctx):

    await ctx.send(embed = maintenance)
    return
    emb = discord.Embed(title='🔀 Choisissez votre action',description='Merci de bien vouloir choisir un des boutons ci-dessous :',color=soft_color)

    buttonStop = Button(label='Éteindre le bot', style=discord.ButtonStyle.danger, emoji = '⛔')
    buttonReload = Button(label='Redémarrer le bot', style=discord.ButtonStyle.blurple, emoji='🔄')
    buttonVeille = Button(label='Mode veille', style=discord.ButtonStyle.blurple, emoji='🌙')
    buttonCancel = Button(label='Annuler', style=discord.ButtonStyle.danger)



    async def button_callbackStop(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        emb2 = discord.Embed(title='🛑 Bot Arrêté',description="Vous avez choisi d'éteindre le bot. Le bot peut prendre un certain temps avand de totalement s'éteindre `(Pour rallumer le bot merci de contacter son dévloppeur)`",color=warned)
        await interaction.response.send_message(embed = emb2)
        buttonStop.callback = button_disabled
        buttonReload.callback = button_disabled
        buttonVeille.callback = button_disabled
        buttonCancel.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        await bot.close()
        return

    async def button_callbackReload(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return
        emb3 = discord.Embed(title='✅ Redémarrage complet',description='Le bot a bien redemmaré correctement',color=soft_color)
        buttonStop.callback = button_disabled
        buttonReload.callback = button_disabled
        buttonVeille.callback = button_disabled
        buttonCancel.callback = button_disabled
        await interaction.response.send_message('Redémarrage maintenant...')
        message = await ctx.send("\n<a:loading:978955361862184980> Chargement en cours ...\n")
        await asyncio.sleep(10)
        await message.edit('✅ Chargement complet.')
        await sent.delete()
        bot.close()
        await asyncio.sleep(1)
        bot.login('OTQ3MTIzODE3MTMyNzUyOTE2.Yhoryg.dL-PaJ9L7n8KsYu5FlMamg1Lxgo')
        await ctx.send(embed=emb3)
        return

    async def button_callbackVeille(interaction):
        ''

    async def button_callbackCancel(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return
        emb4 = discord.Embed(title='🛑 Commande annulée',description="Vous avez choisi d'annuler la commande",color=warned)
        await interaction.response.send_message(embed = emb4)
        buttonStop.callback = button_disabled
        buttonReload.callback = button_disabled
        buttonVeille.callback = button_disabled
        buttonCancel.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        return

    async def button_disabled(interaction):
        return

    

    buttonStop.callback = button_callbackStop
    buttonReload.callback = button_callbackReload
    buttonVeille.callback = button_callbackVeille
    buttonCancel.callback = button_callbackCancel

    view = View()
    view.add_item(buttonStop)
    view.add_item(buttonReload)
    view.add_item(buttonVeille)
    view.add_item(buttonCancel)
    sent = await ctx.send(embed=emb, view=view)



@bot.command()
@commands.cooldown(1, 5, commands.BucketType.guild)
async def ping(ctx):
    
    em = discord.Embed(title=f'🏓 Pong ! : ',description = f'Mon ping est de : **{round(bot.latency * 1000)} ms**',color=soft_color)

    button = Button(label='Relancer', style=discord.ButtonStyle.blurple , emoji="🔄")

    view = View()
    view.add_item(button)

    async def butrton_callback(interaction):
        em1 = discord.Embed(title=f'🏓 Pong ! : ',description = f'Mon ping est de : **{round(bot.latency * 1000)} ms**',color=soft_color)
        await interaction.response.send_message(embed = em1 , view = view)

    button.callback = butrton_callback

    await ctx.send(embed=em, view = view)




@bot.command()
async def dm(ctx, user: discord.User, *, message: str):
        """ DM the user of your choice """
        try:
            await user.send(f'{ctx.author.mention} vous a DM depuis {ctx.guild.name}. **Message: **`{message}`')
            await ctx.send(f"📩 DM emvoyé a **{user}**")
        except discord.Forbidden:
            await ctx.send("❌ Erreur. Il est possible que cet utilisateur m'ai bloqué ou que vous soyez actuellement muet ...")

@bot.command()
@commands.has_permissions(administrator=True)
async def test(ctx):
    await ctx.send(f"{ctx.author} a utilisée la commande test, regarde si utilisable par l'utilisateur")
    await bot.change_presence(status=discord.Status.online)
    user = ctx.author
    embed = discord.Embed(title='Test command' , description = f'{user} a exécuté la commande de test avec les autorisations appropriées. Envoi direct des informations sur le bot par messagerie...' , color = soft_color)
    embed.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb2 = discord.Embed(title= 'Info test commande', description = f'Bot information: \n**Nom du serveur:** {server_name}\n**Bot uptime:** {round(time.time() - upTime)} secondes\n**Mode Dev:** {devMode}' , color = soft_color)
    #emb2.set_author(name = ctx.author, icon_url = ctx.author.avatar_url)
    await user.send(embed=emb2)
    await ctx.send(embed=embed)

@bot.command()
@commands.has_permissions(administrator=True)
async def rule_spawn(ctx):

    buttonRule = Button(label='Accepter le réglement', style=discord.ButtonStyle.green)

    emb1 = discord.Embed(color = discord.Color.blurple())
    emb1.set_image(url = 'https://media.discordapp.net/attachments/882537546637246474/902993874753060985/BannerRules.png')
    await ctx.send(embed = emb1)
    
    emb = discord.Embed(title=f"{rules_emoji} Règlement pour {ctx.guild.name}",color=ctx.guild.me.top_role.color)
    emb.set_author(name = ctx.guild.name, icon_url = ctx.guild.icon)
    emb.add_field(name = f"> {rules_emoji} Règles généraux", value="• Pas de pseudos vides.\n• Aucun pseudos inapproprié.\n• Pas de pseudos sexuellement explicites.\n• Pas de pseudos offensants.\n• Pas de pseudos avec Unicode inhabituel ou illisible.\n• Aucune photo de profil vierge.\n• Aucune photo de profil inappropriée.\n• Aucune photo de profil sexuellement explicite.\n• Pas de photos de profil offensantes.\n• Aucune adhésion accordée aux mineurs (moins de 18 ans).\n• Les modérateurs se réservent le droit de changer les pseudos.\n• Les modérateurs se réservent le droit d'utiliser leur propre discrétion quelle que soit la règle.\n• Pas de failles d'exploitation dans les règles (veuillez les signaler).\n• Pas de DMing d'autres membres du serveur.\n• Les règles s'appliquent au DMing d'autres membres du serveur.\n• Pas de bugs, exploits, pépins, hacks, bugs, etc.\n‎ ",inline=False)
    emb.add_field(name = f"> {chat_emoji} Règles pour les chats textuels", value ="• Pas de demande d'attribution de rôle de modérateur.\n• Contactez le role d'aide pour le support pour le soutien.\n• Contactez les modérateurs sous le channel réservé a cet usage pour obtenir de l'aide.\n• Aucun contenu sexuellement explicite.\n• Aucun contenu pornographique.\n• Aucun contenu NSFW.\n• Aucun contenu illégal.\n• Pas de piratage.\n• Pas de modding.\n• Aucune publication d'informations personnelles (y compris les vrais noms, adresses, e-mails, mots de passe, informations de compte bancaire et de carte de crédit, etc.).\n• Aucune attaque personnelle.\n• Pas de harcèlement.\n• Pas de racisme.\n• Pas de discours de haine.\n• Pas de langage offensant.\n• Pas de discussions religieuses **haineuses**\n• Pas de discussions politiques **haineuses**\n• Pas de discussions sexuelles.\n• Pas de spam (Sauf salon reservé a cet usage)\n• Pas de message excessif (briser une idée dans de nombreux messages au lieu de tout écrire dans un seul article).\n‎ ",inline=False)
    emb.add_field(name = f"> {chat1_emoji} Règles pour les chats textuels 2", value ="• Pas de murs de texte (que ce soit dans des messages séparés ou comme un seul message).\n• Pas de verrouillage des majuscules.\n• Pas d'emojis abusifs.\n• Pas de réactions abusives.\n• Les modérateurs se réservent le droit de supprimer ou modifier tout message.\n• Pas de publicité sans permission.\n• Aucun lien vers d'autres serveurs(Sauf channel réservé a cet usage)\n• Les commandes du bot uniquement sous le channel réservé a cet usage.\n‎ ",inline=False)
    emb.add_field(name = f"> {vocal_emoji} Règles pour les chats vocaux", value ="• Aucun saut de canal de chat vocal.\n• Aucun bruit gênant, fort ou aigu.\n• Aucune soundboard\n• Réduisez la quantité de bruit de fond, si possible.\n• Les modérateurs se réservent le droit de déconnecter, de mettre en sourdine, d'assourdir ou de déplacer des membres vers et depuis les canaux vocaux.\n‎ ",inline=False)
    emb.add_field(name = f"> {bot_emoji} Règles pour les bots", value ="• Pas de spam de commande.\n• Pas de macros.\n• Pas de hacks.",inline=False)

    await ctx.send(embed=emb)

    emb3 = discord.Embed(description = f"{mod_emoji} Ces règles sont **non exhaustives**, l'équipe de modération a **le dernier mot** sur la sanction à appliquer, néanmoins, si vous avez un problème avec un modérateur, merci de **MP un administrateur** ." , color = discord.Color.blurple())
    emb3.set_footer(text="Merci de valider le règlement pour avoir accés à la totalité du serveur")
    await ctx.send(embed = emb3)

@bot.command()
async def slowmode(ctx, seconds: int):
    await ctx.channel.edit(slowmode_delay=seconds)
    await ctx.send(f"👮 Slowmode activée pour **{seconds}** secondes!")

@bot.command(aliases = ['expulse' , 'getout'])
@commands.has_permissions(kick_members=True)
async def kick(ctx, member: discord.Member, *, reason=None):
 
        sent = None

        if reason == None:
            reason_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier la raison du kick ! (**+kick @membre raison**)`",color = red) 
            await ctx.send(embed = reason_none_embed)
            return

        if member == ctx.author:
            member_author_embed = discord.Embed(title='❌ Erreur !',description="`Impossible de vous expulser vous même ! (**+kick @membre raison**)`",color = red) 
            await ctx.send(embed = member_author_embed)
            return

        if member == None:
            member_author_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier le membre a expulser ! (**+kick @membre raison**)`",color = red) 
            await ctx.send(embed = member_author_embed)
            return

        if member == ctx.author:
            member_author_embed = discord.Embed(title='❌ Erreur !',description="`Vous ne pouvez pas vous kick vous même ! (**+kick @membre raison**)`",color = red) 
            await ctx.send(embed = member_author_embed)
            return
        
        warnemb = discord.Embed(title=f":warning: Vous vous apprêtez a expulser {member.name}.",description=f"Cette action expulsera {member.mention} du serveur. Êtes vous sur de vouloir continuer votre action.\n\n**Merci de valider :**\n",color=warned)
        warnemb.set_footer(text=warn_footer)


        buttonYes = Button(label='Oui', style=discord.ButtonStyle.green)
        buttonNo = Button(label='Non', style=discord.ButtonStyle.danger)

        async def button_callbackYes(interaction):
            if interaction.user.id != ctx.author.id:
                await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
                return

            message = await ctx.send("\n<a:loading:978955361862184980> Chargement en cours ...\n")
            await asyncio.sleep(1)
            await message.edit(content = "✅ Chargement complet")

            emb1 = discord.Embed(title="Membre expulsé avec succés ✅ ", color=green)
            emb1.add_field(name="Kick pour : ", value=f"Raison : {reason}", inline=False)
            emb1.add_field(name="User expulsée: ", value=f"{member.mention}", inline=False)
            emb1.add_field(name="Expulsée par : ", value=f'{ctx.author}', inline=False)
            emb1.set_author(name = ctx.author, icon_url = ctx.author.avatar)

            await interaction.response.send_message(embed = emb1)

            await member.send(f'Vous avez été expulsée mais vous pouvez toujours rejoindre le serveur {ctx.guild.name} Expulsé pour **{reason}**!')
            await member.send("Si c'est une erreur ou bavure merci de contacter **nounou#4483**")

            embed2 = discord.Embed(title='👮 Vous avez été expulsée', color=soft_color)
            embed2.add_field(name='Modérateur / administrateur :',value= ctx.message.author,inline=False)
            embed2.add_field(name='User expulsée :',value=member.mention,inline=False)
            embed2.add_field(name='Serveur :',value=f'{member.guild.name}',inline=False)
            embed2.add_field(name='Raison :',value=reason,inline=False)

            con = sqlite3.connect(f'{db_name}')
            cur = con.cursor()

            count_member_kicks = cur.execute(f'SELECT COUNT(*) FROM kick WHERE idMember={member.id}').fetchone()[0]
            print(count_member_kicks)

            if count_member_kicks >= 2:
                print(f'{member.mention} a dejà été kick au moins 3 fois !')

            current_timestamp = datetime.now().timestamp()
            #print(f'{datetime.fromtimestamp(current_timestamp)}')
            cur.execute(f"INSERT INTO kick VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}','Kick',{ctx.guild.id})")
            con.commit()
            con.close()

            print(interaction)

            await member.send(embed=embed2)
            await member.kick(reason=reason)
            buttonYes.callback = button_disabled
            buttonNo.callback = button_disabled
            await asyncio.sleep(10)
            await sent.delete()
            return

        async def button_callbackNo(interaction):
            if interaction.user.id != ctx.author.id:
                await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
                return

            emb = discord.Embed(title='🛑 Commande annulée',description="Vous avez choisi d'annuler la commande",color=warned)
            await interaction.response.send_message(embed = emb)
            buttonYes.callback = button_disabled
            buttonNo.callback = button_disabled
            await asyncio.sleep(10)
            await sent.delete()
            return

        async def button_disabled(interaction):
            return

        buttonYes.callback = button_callbackYes
        buttonNo.callback = button_callbackNo

        view = View()
        view.add_item(buttonYes)
        view.add_item(buttonNo)
        sent = await ctx.send(embed=warnemb, view=view)


@bot.command(aliases = ['softexpulse' , 'softgetout','skick'])
@commands.has_permissions(kick_members=True)
async def softkick(ctx, member: discord.Member, *, reason=None):


    logsChannel = bot.get_channel(910974543454171136)

    await ctx.send(embed = maintenance)
    return



    guild = ctx.guild
    if reason == None:
        reason = " Raison non fournie"
    if member == ctx.author:
        await ctx.send("❌ Vous ne pouvez pas vous softexpulser vous même !")
    
    else:
        embed = discord.Embed(title="Membre softkick avec succés ✅ ", color=green)
        embed.add_field(name="Kick pour : ", value=f"Raison : {reason}", inline=False)
        embed.add_field(name="User softkick: ", value=f"{member.mention}", inline=False)
        embed.add_field(name="Expulsée par : ", value=f'{ctx.author}', inline=False)
        embed.set_author(name = ctx.author, icon_url = ctx.author.avatar)
        await member.send(f'Vous avez été expulsée mais vous pouvez toujours rejoindre le serveur {ctx.guild.name} Expulsé pour **{reason}**!')
        await member.send("Si c'est une erreur ou bavure merci de contacter **nounou#4483**")

        embed2 = discord.Embed(title='👮 Vous avez été softexpulsée',description = 'Vous ne puvez plus accéder aux autres salons', color=soft_color)
        embed2.add_field(name='Modérateur / administrateur :',value= ctx.message.author,inline=False)
        embed2.add_field(name='User softexpulsée :',value=member.mention,inline=False)
        embed2.add_field(name='Serveur :',value=f'{member.guild.name}',inline=False)
        embed2.add_field(name='Raison :',value=reason,inline=False)

        punish = discord.utils.get(guild.roles, name='Punish')

        if not punish:
            punish = await guild.create_role(name="Punish")
            emb1 = discord.Embed(title=f'✅ Role créé avec succés. Refaites la commande',description='Le role attribué au personnes softkick a été créé il se nomme Punish',color=soft_color)
            await ctx.send(embed = emb1)

            for channel in guild.channels:
                await channel.set_permissions(punish, speak=False, send_messages=False, read_message_history=False, read_messages=False, view_channel = False)
                return


        await member.edit(roles=[punish])

        author = ctx.author

        overwrites = {
        guild.default_role: discord.PermissionOverwrite(view_channel=False),
        author: discord.PermissionOverwrite(view_channel=True),
        punish: discord.PermissionOverwrite(view_channel=True,speak=True, send_messages=True, read_message_history=True, read_messages=True)
        }

        channel1 = discord.utils.get(guild.channels, name='⛓ - Les expulsés')

        if not channel1:
            channel1 = await guild.create_text_channel(name='⛓ - Les expulsés', overwrites=overwrites)
            emb = discord.Embed(title=f'✅ Salon créer avec succés',description='Le salon des personnes softkick a été créé :  #⛓ - Les expulsés',color=soft_color)
            await ctx.send(embed = emb)
            return




        con = sqlite3.connect(f'{db_name}')
        cur = con.cursor()

        count_member_kicks = cur.execute(f'SELECT COUNT(*) FROM softkick WHERE idMember={member.id}').fetchone()[0]
        print(count_member_kicks)

        if count_member_kicks >= 2:
            print(f'{member.mention} a dejà été softkick au moins 3 fois !')

        current_timestamp = datetime.now().timestamp()
        #print(f'{datetime.fromtimestamp(current_timestamp)}')
        cur.execute(f"INSERT INTO softkick VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}','Softkick')")
        con.commit()
        con.close()

        await member.send(embed=embed2)
        message = await ctx.send(embed=embed)
        await message.add_reaction('✅')

@bot.command(aliases = ['kicks_count' , 'expulsing','kicking'])
@commands.has_permissions(kick_members=True)
async def kickings(ctx, *, member: discord.Member = None):

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    guild = ctx.guild
    await ctx.send(ctx.author.mention)

    for row in cur.execute('SELECT * FROM kick'):
        server = row[5]
        if server == guild.id:
            pass
        elif member == None:
                emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucune expulsion' , color=warned)
                emb2.set_author(name = guild, icon_url = guild.icon)
                await ctx.send(embed = emb2)
                return
        else:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucune expulsion**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

    if member == None:
        count_server_kicks = cur.execute(f'SELECT COUNT(*) FROM kick').fetchone()[0]
        emb1 = discord.Embed(description= f'Ce serveur compte un total de **{count_server_kicks}** expulsion(s)' , color = green)
        emb1.set_author(name = guild, icon_url = guild.icon)

        if count_server_kicks == 0:
            emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucune expulsion' , color=warned)
            emb2.set_author(name = guild, icon_url = guild.icon)
            await ctx.send(embed = emb2)
            return

        else:
            for row in cur.execute('SELECT * FROM kick'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}*', inline=False)
    else:
        count_member_kicks = cur.execute(f'SELECT COUNT(*) FROM kick WHERE idMember = {member.id}').fetchone()[0]
        emb1 = discord.Embed(description= f'Cet utilisateur compte un total de **{count_member_kicks}** expulsion(s)' , color = green)
        emb1.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)

        if count_member_kicks == 0:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucune expulsion**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

        else:

            for row in cur.execute(f'SELECT * FROM kick WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}*', inline=False)
    
    await ctx.send(embed = emb1)

    con.close()


@bot.command(aliases = ['clearchannel'])
@commands.has_permissions(administrator=True)
async def nuke(ctx, channel: discord.TextChannel = None):

    total_channels = ctx.guild.channels


    if channel == None:
        channel_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier un channel à nuke !`",color = red) 
        await ctx.send(embed = channel_none_embed)
        return


    if channel not in total_channels:
        channel_none_embed = discord.Embed(title='❌ Erreur !',description="`Channel introuvable sur ce serveur !`",color = red) 
        await ctx.send(embed = channel_none_embed)
        return

    warnemb = discord.Embed(title=f":warning: Vous vous apprêtez a supprimer tout les messages de `#{channel.name}`.",description=f"Cette action supprimera tout les messages de `#{channel.name}`. Êtes vous sur de vouloir continuer votre action.\n\n**Merci de valider :**\n",color=warned)
    warnemb.set_footer(text=warn_footer)


    buttonYes = Button(label='Oui', style=discord.ButtonStyle.green)
    buttonNo = Button(label='Non', style=discord.ButtonStyle.danger)

    async def button_callbackYes(interaction):

        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        nuke_channel = discord.utils.get(ctx.guild.channels, name=channel.name)

        if nuke_channel is not None:
            new_channel = await nuke_channel.clone(reason="Nuke!")
            await nuke_channel.delete()
            await interaction.response.send_message("🪖 Execution confirmé capitaine tout les messages ont été éliminés!")
            await new_channel.send(f"🪖 Le général {ctx.author.mention} a atomisé ce channel")
            buttonYes.callback = button_disabled
            buttonNo.callback = button_disabled
            await asyncio.sleep(10)
            await sent.delete()
            return
        else:
            await ctx.send(f":warn: Pas de {channel.name} a atomisé!")
            buttonYes.callback = button_disabled
            buttonNo.callback = button_disabled
            await asyncio.sleep(10)
            await sent.delete()
            return

    async def button_callbackNo(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        emb = discord.Embed(title='🛑 Commande annulée',description="Vous avez choisi d'annuler la commande",color=warned)
        await interaction.response.send_message(embed = emb)
        buttonYes.callback = button_disabled
        buttonNo.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        return

    buttonYes.callback = button_callbackYes
    buttonNo.callback = button_callbackNo

    async def button_disabled(interaction):
        return

    view = View()
    view.add_item(buttonYes)
    view.add_item(buttonNo)
    sent = await ctx.send(embed=warnemb, view=view)


@bot.command()
@commands.has_permissions(kick_members=True)
async def userinfo(ctx, *, member: discord.Member = None): # b'\xfc'
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

    embed = discord.Embed(title= f'ℹ️ Info de {member}', description=member.mention,color= member.top_role.color)
    embed.set_author(name=member.name,icon_url=member.avatar)
    embed.set_thumbnail(url=member.avatar)
    embed.add_field(name="👤 Mention :", value=member.mention)
    embed.add_field(name="👥 Pseudo :",value=f"`{member}`")
    embed.add_field(name='🆔 ID: ', value = f"`{member.id}`")
    embed.add_field(name="🛬 A rejoin le :", value=member.joined_at.strftime(date_format))
    embed.add_field(name="📑 Status :",value=(f"{pltfrm} ({str(member.status).capitalize()})" if pltfrm != "placeholder" else "Offline everywhere"))
    
    if isinstance(member.activity,discord.Spotify):
        title = "🎼 Écoute Spotify :"
        gm = f"🎤 Chanson: {member.activity.title}\n🧑‍🎤 De: {', '.join(member.activity.artists)}\n🎻 Album: {member.activity.album}"
    elif isinstance(member.activity,discord.Streaming):
        title = "🧑🏻‍💻 En stream :"
        gm = f"{member.activity.name}"
    elif isinstance(member.activity,discord.Game) or isinstance(member.activity,discord.Activity):
        title = "🎮 Joue a :"
        gm = f"{member.activity.name}"
    else:
        title = "🎮 Joue a :"
        gm = "🚫 Ne joue a rien."

    hypesquad_class = str(member.public_flags.all()).replace('[<UserFlags.', '').replace('>]', '').replace('_',
                                                                                                         ' ').replace(
        ':', '').title()

    hypesquad_class = ''.join([i for i in hypesquad_class if not i.isdigit()])


    if hypesquad_class == "Hypesquad Balance ":
        hypesquad_class = f"{balance_emoji} Hypesquad Balance"

    if hypesquad_class == 'Hypesquad Bravery':
        hypesquad_class = f"{bravery_emoji} Hypesquad Bravery "

    if hypesquad_class == 'Hypesquad Brillance':
        hypesquad_class = f"{brillance_emoji} Hypesquad Brillance "

    has_nitro = 'Non'

    # Check if the User boosts the guild

    if ctx.author.premium_since is not None:
        has_nitro = 'Oui'

    embed.add_field(name=title,value=gm)
    embed.add_field(name="🤖 Bot :", value=("Oui" if member.bot else "Non"))
    members = sorted(ctx.guild.members, key=lambda m: m.joined_at)
    embed.add_field(name="📊 Position :", value=str(members.index(member)+1))
    embed.add_field(name="🗳 HypeSquad :", value=hypesquad_class)
    embed.add_field(name="💎 Nitro :", value=has_nitro)
    embed.add_field(name="📅 Compte créer le :", value=member.created_at.strftime(date_format))
    fm = member.created_at.strftime("%A %d %B %Y (%H:%M.%S)")

    embed.add_field(name="📆 A rejoin discord:",value=fm)
    if len(member.roles) > 1:
        role_string = ' '.join([r.mention for r in member.roles][1:])
        embed.add_field(name="🎭 Roles [{}]".format(len(member.roles)-1), value=role_string, inline=False)
    perm_string = ', '.join([str(p[0]).replace("_", " ").title() for p in member.guild_permissions if p[1]])
    embed.add_field(name="🔐 Permission:", value=f"`{perm_string}`", inline=False)
    embed.set_footer(text=f"Demandé par {ctx.author}")
    embed.timestamp = datetime.utcnow()
    return await ctx.send(embed=embed)

@bot.command(help="Shows info for an invite using a invite URL", aliases=["invinfo",'invitinfo'])
async def inviteinfo(ctx, invite: discord.Invite):
        embed = discord.Embed(title="📩 Invite Info:",color=ctx.guild.me.top_role.color)
        embed.set_thumbnail(url=invite.guild.icon)
        embed.add_field(name="🏠 Invite channel:", value=f"‎ ", inline=False)
        embed.add_field(name="📛 Nom du channel:", value = f"{invite.channel.mention}")
        embed.add_field(name="🆔 ID du channel:", value=  f"`{invite.channel.id}`")
        embed.add_field(name="👑 Invite creator:", value=invite.inviter, inline=False)
        embed.add_field(name="🆔 Invite ID:", value=invite.id, inline=False)
        embed.add_field(name="💾 Server name:", value=invite.guild, inline=False)
        embed.add_field(name="🆔 Server ID:", value=invite.guild.id, inline=False)
        embed.add_field(name="📅 Server created at:", value=invite.guild.created_at.strftime("%A, %d %b %Y, %I:%M:%S %p"), inline=False)
        await ctx.send(embed=embed)





async def do_warn(ctx, member: discord.Member, reason):

        if "BOT AUTOMOD" in reason:
            ctx.author = f"`BOT AUTOMOD SYSTEM:` (<@{bot_id}>)"
            ctx.author.mention = f"`BOT AUTOMOD SYSTEM:` (<@{bot_id}>)"



        embed1 = discord.Embed(title="✅ Avertissement envoyé avec succés", color=green)
        embed1.add_field(name="Membre averti: ", value=f'{member.mention}', inline=False)
        embed1.add_field(name="Modérateur / administrateur : ", value=f'{ctx.author}', inline=False)
        embed1.add_field(name="Raison : ", value=f'`{reason}`', inline=False)
        
        embed2 = discord.Embed(title='👮 Vous avez été averti', color=soft_color)
        embed2.add_field(name='Modérateur / administrateur :',value= ctx.author.mention,inline=False)
        embed2.add_field(name='Membre averti :',value=member.mention,inline=False)
        embed2.add_field(name='Serveur :',value=f'{member.guild.name}',inline=False)
        embed2.add_field(name='Raison :',value=f'`{reason}`',inline=False)


        #await logsChannel.send(embed=embed2)
        await member.send(embed=embed2)
        await ctx.send(embed=embed1)


        con = sqlite3.connect(f'{db_name}')
        cur = con.cursor()

        count_member_warns = cur.execute(f'SELECT COUNT(*) FROM warn WHERE idMember={member.id}').fetchone()[0]
        print(count_member_warns)

        if count_member_warns >= 3:
            print(f'{member.mention} a dejà été averti au moins 3 fois !')

        current_timestamp = datetime.now().timestamp()
        #print(f'{datetime.fromtimestamp(current_timestamp)}')
        cur.execute(f"INSERT INTO warn VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}','Warn')")
        con.commit()
        con.close()

@bot.command(help="Shows info for the channel specified using channel mention or ID", aliases=["channinfo"])
async def channelinfo(ctx, channel):
        if channel.isnumeric():
            channel_obj = ctx.guild.get_channel(int(channel))
        elif len(ctx.message.channel_mentions) > 0:
            if len(ctx.message.channel_mentions) > 1:
                embed = discord.Embed(title="❌ Erreur!", description="Vous ne pouvez pas utiliser 2 ou plus channels!", color=0xff2e2e)
                await ctx.send(embed=embed)
                return # ERROR - TOO MANY CHANNELS
            channel_obj = ctx.guild.get_channel(ctx.message.channel_mentions[0].id)
        else:
            channel_obj = None

        embed = discord.Embed(title=f"ℹ️ Info Du channel ``{channel_obj.name}``",color=ctx.guild.me.top_role.color)
        embed.set_thumbnail(url=ctx.guild.icon)

        if isinstance(channel_obj, discord.TextChannel):
            slowmode = ":warning: Le slowmode est désactivé" if channel_obj.slowmode_delay == 0 else channel_obj.slowmode_delay
            embed.add_field(name="🐢 Slowmode:", value=slowmode, inline=False)
            embed.add_field(name="🔞 NSFW ?:", value=("Oui" if channel_obj.is_nsfw() else "Non"), inline=False)
            embed.add_field(name="📋 Sujet:", value=(channel_obj.topic or ":warning: Aucun sujet"), inline=False)



        if isinstance(channel_obj, discord.VoiceChannel):
            user_limit = ":warning: La limite de membre est désactivé" if channel_obj.user_limit == 0 else f"{channel_obj.user_limit} max"
            embed.add_field(name="📟 Débit binaire:", value=f"{round(channel_obj.bitrate/1000)}kbps")
            embed.add_field(name="🚷 Limite de membres", value=user_limit)
            embed.add_field(name="🟢 Connecté:", value=f"**{len(channel_obj.members)}** membres connecté(s)")
            embed.add_field(name="🌍 Region:", value=str(channel_obj.rtc_region or ":warning: La région est automatique"))


        if isinstance(channel_obj, discord.StageChannel):
            embed.add_field(name="🟢 Connecté:", value=f"**{len(channel_obj.members)}** membres connecté(s)")
            embed.add_field(name="🌍 Region:", value=str(channel_obj.rtc_region or ":warning: La région est automatique"))

        channelType = str(channel_obj.type).capitalize()

        if channelType == "Stage_voice":
            channelType = "Salon de conférence"

        if channelType == "Text":
            channelType = "Salon textuel"

        if channelType == "Voice":
            channelType = "Salon vocal"

        embed.add_field(name="💾 Type de salon:", value=f"`{channelType}`", inline=False)
        embed.add_field(name="🗄 Catégorie du salon", value=channel_obj.category)
        embed.add_field(name="🆔 Channel ID", value=channel_obj.id, inline=False)
        embed.add_field(name="📅 Creation date:", value=channel_obj.created_at.strftime("%A, %d %b %Y, %I:%M:%S %p"), inline=False)
        await ctx.send(embed=embed)

@bot.group(aliases = ['avertissement','avertir'])
@commands.has_permissions(kick_members=True)
async def warn(ctx, member: discord.Member, reason):

    warnemb = discord.Embed(title=f":warning: Vous vous apprêtez a avertir le membre {member.name}.",description=f"Cette action enverra un avertissement à {member.mention} selon la raison choisis. Êtes vous sur de vouloir continuer votre action.\n\n**Merci de valider :**\n",color=warned)
    warnemb.set_footer(text=warn_footer)

    buttonYes = Button(label='Oui', style=discord.ButtonStyle.green)
    buttonNo = Button(label='Non', style=discord.ButtonStyle.danger)

    
    if reason == None:
        reason_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier la raison du warn ! (**+warn @membre raison**)`",color = red) 
        await ctx.send(embed = reason_none_embed)
        return

    if member == ctx.author:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Impossible de vous warn vous même ! (**+warn @membre raison**)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return

    if member == None:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier le membre a warn ! (**+warn @membre raison**)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return


    async def button_callbackYes(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        await do_warn(ctx, member, reason) 
                
        buttonYes.callback = button_disabled
        buttonNo.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        return

    async def button_callbackNo(interaction):
        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        emb = discord.Embed(title='🛑 Commande annulée',description="Vous avez choisi d'annuler la commande",color=warned)
        await interaction.response.send_message(embed = emb)
        buttonYes.callback = button_disabled
        buttonNo.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        return

    buttonYes.callback = button_callbackYes
    buttonNo.callback = button_callbackNo

    async def button_disabled(interaction):
        return

    view = View()
    view.add_item(buttonYes)
    view.add_item(buttonNo)
    sent = await ctx.send(embed=warnemb, view=view)



@bot.command()
@commands.has_permissions(kick_members=True)
async def warnings(ctx, *, member: discord.Member = None):

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    guild = ctx.guild
    await ctx.send(ctx.author.mention)

    for row in cur.execute('SELECT * FROM warn'):
        server = row[5]
        if server == guild.id:
            pass
        elif member == None:
                emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucun avertissement' , color=warned)
                emb2.set_author(name = guild, icon_url = guild.icon)
                await ctx.send(embed = emb2)
                return
        else:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucun avetissement**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

    if member == None:
        count_server_warns = cur.execute(f'SELECT COUNT(*) FROM warn').fetchone()[0]
        emb1 = discord.Embed(description= f'Ce serveur compte un total de **{count_server_warns}** avertissement(s)' , color = green)
        emb1.set_author(name = guild, icon_url = guild.icon)

        if count_server_warns == 0:
            emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucun avertissement' , color=warned)
            emb2.set_author(name = guild, icon_url = guild.icon)
            await ctx.send(embed = emb2)
            return

        else:
            for row in cur.execute('SELECT * FROM warn'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}*', inline=False)
    else:
        count_member_warns = cur.execute(f'SELECT COUNT(*) FROM warn WHERE idMember = {member.id}').fetchone()[0]
        emb1 = discord.Embed(description= f'Cet utilisateur compte un total de **{count_member_warns}** avertissement(s)' , color = green)
        emb1.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)

        if count_member_warns == 0:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucun avertissement**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

        else:

            for row in cur.execute(f'SELECT * FROM warn WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}*', inline=False)
    
    await ctx.send(embed = emb1)

    con.close()

settings = bot.get_cog("Settings")

@bot.command()
async def member_update(before, after):
		# Check if the member went offline and log the time
		if after.status == discord.Status.offline:
			currentTime = int(time.time())
			settings.setUserStat(after, after.guild, "Dernière fois en ligne :", currentTime)



@bot.command(aliases = ['météo' , 'meteo' , 'méteo'])
async def weather(ctx, *, city: str):
    city_name = city
    complete_url = base_url + "appid=" + weather_key + "&q=" + city_name + '&lang=fr'
    response = requests.get(complete_url)
    x = response.json()
    channel = ctx.message.channel
    embed = discord.Embed(title=f"Météo pour {city_name}",
        color=ctx.guild.me.top_role.color,
        timestamp=ctx.message.created_at,)
    if x["cod"] != "404":
        async with channel.typing():
            y = x["main"]
            w = x["coord"]
            current_temperature = y["temp"]
            current_temperature_celsiuis = str(round(current_temperature - 273.15))
            current_pressure = y["pressure"]
            current_humidity = y["humidity"]
            current_feels_like = y["feels_like"]
            current_feels_like_celsius = str(round(current_feels_like - 273.15))
            timezone = x["timezone"]
            temp_max = y["temp_max"]
            temp_min = y["temp_min"]
            temp_max_celsius = str(round(temp_max - 273.15))
            temp_min_celsius = str(round(temp_min - 273.15))
            current_timezone = str(round(timezone / 3600))
            z = x["weather"]
            weather_description = z[0]["description"]
            lat = w["lat"]
            lon = w["lon"]


            if weather_description == 'ciel dégagé':
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/2600.png")
                weather_description = ':sunny: Ciel dégagé'

            if weather_description == 'peu nuageux':
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/1f324.png")
                weather_description = ':white_sun_small_cloud: Peu nuageux'

            if weather_description == 'partiellement nuageux':
                weather_description = ':partly_sunny: Partiellement nuageux'
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/26c5.png")

            if weather_description == 'couvert':
                weather_description = ':cloud: Ciel couvert'
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/2601.png")

            if weather_description == 'légère pluie':
                weather_description = ':cloud_rain: Légère Pluie'
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/1f327.png")

            if weather_description == 'nuageux':
                weather_description = ':cloud: Nuageux'
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/2601.png")

            if weather_description == 'orage':
                weather_description = ':cloud_lightning: Orage'
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/1f329.png")

            if weather_description == 'pluie très fine':
                weather_description = ':sweat_drops: Pluie très fine'
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/1f4a6.png")

            if weather_description == 'pluie modéré':
                weather_description = ':cloud_rain: Pluie modéré'
                embed.set_thumbnail(url="https://images.emojiterra.com/twitter/v14.0/512px/1f327.png")

            embed.add_field(name="Descripition", value=f"**{weather_description}**", inline=False)
            embed.add_field(name="🌡 Temperature(C)", value=f"**{current_temperature_celsiuis}°C**", inline=False)
            embed.add_field(name="🔥 - 🧊 Temperature Max et Min(C)", value=f"**Temp.max: {temp_max_celsius}°C\nTemp.min: {temp_min_celsius}°C**", inline=False)
            embed.add_field(name=":thermometer_face: Température ressentie(C)", value=f"**{current_feels_like_celsius}°C**", inline=False)
            embed.add_field(name="💧 Humidité(%)", value=f"**{current_humidity}%**", inline=False)
            embed.add_field(name="🌍 Pression athmosphérique(hPa)", value=f"**{current_pressure}hPa**", inline=False)
            embed.add_field(name="🍃 Vitesse du vent(m/s)",value=f"**{x['wind']['speed']}m/s**")
            embed.add_field(name="☁ Couverture nuageuse(%)",value=f"**{x['clouds']['all']}%**")
            embed.add_field(name="🗺 Coordonées(lat-lon)",value=f"**Latitude: {lat}\nLongitude: {lon}**",inline=False)
            embed.add_field(name="🕰 Décalage Horaire UTC(h)",value=f"**{current_timezone}h**",inline=False)
            embed.set_footer(text=f"Requested by {ctx.author.name}")
            await channel.send(embed=embed)
    else:
        await channel.send("❌ Uhm votre ville me semble imaginaire, essayez de vérifier l'ortographe.")


@bot.command()
async def weathermap(ctx, *, layer = None, z=None, x=None, y=None):
    await ctx.send(embed = maintenance)
    return
    complete_url = f"https://tile.openweathermap.org/map/{layer}_new/{z}/{x}/{y}.png?appid={weather_key}"
    await ctx.send(complete_url)


@bot.command(pass_context=True)
@commands.has_permissions(kick_members=True)
async def nick(ctx, member: discord.Member, nick):
    await member.edit(nick=nick)
    await ctx.send(f'**Pseudo changée pour {member.mention}**')

#@bot.command(aliases=['commands'])
#async def cmds(ctx):
    #embed = discord.Embed(title="Fleur de cerisier Commandes: ", color=0xf40000)
    #embed.add_field(name="+addrole", value="Description : La commande add role consiste à ajouter un rôle à un utilisateur, vous avez besoin de l'autorisation d'administrateur pour cette commande.", inline=False)
    #embed.add_field(name="+ban", value="Description : il s'agit de la commande pour bannir un utilisateur, vous avez besoin de l'autorisation de bannissement des membres pour cette commande", inline=False)
    #embed.add_field(name='+kick', value="Description : il s'agit de la commande pour expulser un utilisateur, vous avez besoin de l'autorisation d'expulser les membres pour cette commande", inline=False)
    #embed.add_field(name='+clear', value = "Description : il s'agit de la commande pour supprimmer de messages, vous avez besoin de l'autorisation de gérer les messages pour cette commande", inline=False)
    #embed.add_field(name="+unban", value="Description: Il s'agit de la commande pour débannir un utilisateur, vous avez besoin de l'autorisation de ban des membres pour cette commande", inline=False)
    #embed.add_field(name="+warn", value="Description: C'est la commande pour avertir un utilisateur, vous avez besoin de la permission des membres kick pour cette commande.", inline=False)
    #embed.add_field(name="+tempban", value="Description: C'est la commande pour bannir temporairement un utilisateur, vous avez besoin de la permission de ban pour cette commande.", inline=False)
    #embed.add_field(name="+removerole", value="Description: La commande de suppression de rôle consiste à ajouter un rôle à un utilisateur, vous avez besoin de l'autorisation d'administrateur pour cette commande.", inline=False)
    #embed.add_field(name="+tempmute ", value="Description: La commande de tempmute de membres consiste à mute un membre pendant le temps défini : d = jours ; m = minutes ; h = heures ; s = secondes, vous avez besoin de l'autorisation de kick pour cette commande.", inline=False)
    #embed.add_field(name="Continuer ? (**indisponible merci d'attendre la version 1.2 de la bêta**)", value="Please select a reaction, choose the X mark to close or the check mark to continue.",inline=False)
    



@bot.command()
@commands.has_permissions(administrator=True)
async def addrole(ctx,member: discord.Member,*,arg):
    role =  discord.utils.get(member.guild.roles, name=arg)
    await discord.Member.add_roles(member, role)
    message = await ctx.send(f"{member} a reçu le role : **{role}**")
    await message.add_reaction('✅')

@bot.command(aliases=["google"])
async def search(ctx, *, search): 
    await ctx.send(f"https://www.google.com//?q={search}")
    
@bot.command()
@commands.has_permissions(administrator=True)
async def removerole(ctx,member: discord.Member,*,arg):
    role =  discord.utils.get(member.guild.roles, name=arg)
    await discord.Member.remove_roles(member, role)
    message = await ctx.send(f"{member} a éte rétracté du role: **{role}**")
    await message.add_reaction('✅')

@bot.command()
@commands.has_permissions(administrator=True)
async def reboot(ctx):
    """ Reboot the bot """
    await ctx.send("Rebooting now...")
    time.sleep(1)
    sys.exit(0)


@bot.command()
@commands.has_permissions(manage_roles = True)
async def refuse(ctx , member: discord.Member , *, reason = None):
    if reason == None:
        reason = 'Raison non fournie vous avez le droit de demander une réponse au modérateur'
    emb = discord.Embed(title="❌ Vous avez été refusée  !", description = 'Vous pouvez passer la canditature dans une semaine' , color=red)
    emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb.add_field(name='Modérateur / administrateur :',value=ctx.message.author ,inline=False)
    emb.add_field(name='Membre refusé :',value=member.mention,inline=False)
    emb.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await member.send(embed = emb)

    emb1 = discord.Embed(title="❌ L'utilisateur est refusé !",description = 'Il a reçu avec succés le message de refus',color=red)
    emb1.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb1.add_field(name='Modérateur / administrateur :',value=ctx.message.author.mention,inline=False)
    emb1.add_field(name='User refusé :',value=member.mention,inline=False)
    emb1.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await ctx.send(embed = emb1)


@bot.command()
@commands.has_permissions(manage_roles = True)
async def accept(ctx , member: discord.Member , role: discord.Role, *, reason = 'Vous avez été accepté'  ):
    emb = discord.Embed(title="✅ Vous avez été accepté !", description = "Bienvenue dans le staff" , color=green)
    emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb.add_field(name='Modérateur / administrateur :',value=ctx.message.author ,inline=False)
    emb.add_field(name='Membre accepté :',value=member.mention,inline=False)
    emb.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    emb.add_field(name='Role :',value=role.name,inline=False)
    await member.send(embed = emb)

    emb1 = discord.Embed(title="✅ L'utilisateur est accepté !",description = f"Il a reçu avec succés le message d'acceptation , {member.mention} a reçu son role avec succés",color=green)
    emb1.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb1.add_field(name='Modérateur / administrateur :',value=ctx.message.author.mention,inline=False)
    emb1.add_field(name='User accepté :',value=member.mention,inline=False)
    emb1.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    emb1.add_field(name='Role :',value=role.mention ,inline=False)
    await discord.Member.add_roles(member, role)
    await ctx.send(embed = emb1)


@bot.command(aliases=["ri","role"], no_pm=True)
@commands.guild_only()
async def roleinfo(ctx, *, role: discord.Role):
        '''Shows information about a role'''
        guild = ctx.guild

        since_created = (ctx.message.created_at - role.created_at).days
        role_created = role.created_at.strftime("%d %b %Y %H:%M")
        created_on = "{} ({} Jours)".format(role_created, since_created)
        members = ''
        i = 0
        for user in role.members:
            members += f'{user.name}, '
            i+=1
            if i > 30:
                break

        if str(role.colour) == "#000000":
            colour = "default"
            color = ("#%06x" % random.randint(0, 0xFFFFFF))
            color = int(colour[1:], 16)
        else:
            colour = str(role.colour).upper()
            color = role.colour


        if role.managed == True:
            role.managed = "Oui"

        if role.managed == False:
            role.managed = "Non"

        if role.mentionable == True:
            role.mentionable = "Oui"

        if role.mentionable == False:
            role.mentionable = "Non"

        if role.hoist == True:
            role.hoist = "Oui"

        if role.hoist == False:
            role.hoist = "Non"
        
        perms = get_perms(role.permissions)


        em = discord.Embed(colour=color)
        em.set_author(name=role.name)
        em.add_field(name="👥 Membres:", value=len(role.members))
        em.add_field(name="＠ Mentionnable:", value=role.mentionable)
        em.add_field(name="🎖 Hiérarchie", value=role.hoist)
        em.add_field(name="📊 Position:", value=role.position)
        em.add_field(name="📌 Managé:", value=role.managed)
        em.add_field(name=":no_entry: Permissions:", value=" ,".join(perms), inline=False)
        em.add_field(name="🎨 Couleur:", value=colour)
        em.add_field(name='📅 Date de création:', value=created_on)
        em.add_field(name='👤 Membres:', value=members[:-2], inline=False)
        em.add_field(name=f'🆔 Role ID:', value = f'`{role.id}`')
        em.set_footer(text=f"Demandé par {ctx.author}")
        em.timestamp = datetime.utcnow()

        await ctx.send(embed=em)



    
@bot.command(aliases=['ticket-close', 't-close'])
async def ticketclose(ctx: commands.Context):
    if ctx.channel.category and ctx.channel.category.name == "TICKETS":
        embed = discord.Embed(title="Scheduled closure:", color=0xf40000)
        embed.add_field(name="Scheduled closer:", value=f'{ctx.author} has scheduled to close this ticket!', inline=False)
        embed.add_field(name="Time remaining:", value="This ticket will close in 60 seconds.", inline=False)
        await ctx.send(embed=embed)
        await asyncio.sleep(60)
        await ctx.channel.delete()

    

@bot.command(aliases=['ticket-rename', 't-rename'])
async def ticketrename(ctx: commands.Context, name_input): 
    if ctx.channel.category and ctx.channel.category.name == "TICKETS":
        name = f"{name_input}-{numOfTickets}"
        await ctx.channel.edit(name=name )
        await ctx.send(f'Ticket name changed to **{name_input}**!')


@bot.command()
async def ticketclaim(ctx):
    if ctx.channel.category and ctx.channel.category.name == "TICKETS":
        embed = discord.Embed(title="Ticket Claimed:", color=0xf40000)
        embed.add_field(name="Claimed by:", value=f"{ctx.author}",inline=False)
        embed.add_field(name="PTS Enabled:", value="Support team, remember you must use PTS in order to speak in a claimed ticket, unless you are a senior moderator+.", inline=False)
    
        await ctx.send(embed=embed)
    
@bot.command(aliases=['bannir'])
@commands.has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member = None, *, reason = None):


    warnemb = discord.Embed(title=f":warning: Vous vous apprêtez a bannir le membre {member.name}.",description=f"Cette action bannira {member.mention} du serveur. Êtes vous sur de vouloir continuer votre action.\n\n**Merci de valider :**\n",color=warned)
    warnemb.set_footer(text=warn_footer)

    buttonYes = Button(label='Oui', style=discord.ButtonStyle.green)
    buttonNo = Button(label='Non', style=discord.ButtonStyle.danger)

    if member == ctx.author:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Impossible de vous bannir vous même !`\n\n `(+ban @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return


    if reason == None:
        reason_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier la raison du bannissement !`\n\n `(+ban @membre <raison>)`",color = red) 
        await ctx.send(embed = reason_none_embed)
        return

    if member == None:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier le membre a bannir !`\n\n `(+ban @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return
        
    else:
        async def button_callbackYes(interaction):

            if interaction.user.id != ctx.author.id:
                await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
                return


            emb1 = discord.Embed(title= '✅ Membre ban avec succés' , color = green)
            emb1.add_field(name='Modérateur / administrateur :',value= ctx.author.mention,inline=False)
            emb1.add_field(name='Membre ban :',value=member.mention,inline=False)
            emb1.add_field(name='Raison :',value=f'`{reason}`',inline=False)

            
            await interaction.response.send_message(embed = emb1)

        
            embed2 = discord.Embed(title='👮 Vous avez été ban', color=soft_color)
            embed2.add_field(name='Modérateur / administrateur :',value= ctx.author.mention,inline=False)
            embed2.add_field(name='Membre ban :',value=member.mention,inline=False)
            embed2.add_field(name='Raison :',value=f'`{reason}`',inline=False)
        
            con = sqlite3.connect(f'{db_name}')
            cur = con.cursor()

            count_member_kicks = cur.execute(f'SELECT COUNT(*) FROM ban WHERE idMember={member.id}').fetchone()[0]
            print(count_member_kicks)

            if count_member_kicks >= 2:
                print(f'{member.mention} a dejà été ban au moins 2 fois !')

            current_timestamp = datetime.now().timestamp()
            #print(f'{datetime.fromtimestamp(current_timestamp)}')
            cur.execute(f"INSERT INTO ban VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}','Ban')")
            con.commit()
            con.close()

            await member.send(embed = embed2)
            await member.ban(reason=reason)
            buttonYes.callback = button_disabled
            buttonNo.callback = button_disabled
            await asyncio.sleep(10)
            await sent.delete()
            return

        async def button_callbackNo(interaction):

            if interaction.user.id != ctx.author.id:
                await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
                return

            emb = discord.Embed(title='🛑 Commande annulée',description="Vous avez choisi d'annuler la commande",color=warned)
            await interaction.response.send_message(embed = emb)
            buttonYes.callback = button_disabled
            buttonNo.callback = button_disabled
            await asyncio.sleep(10)
            await sent.delete()
            return

        buttonYes.callback = button_callbackYes
        buttonNo.callback = button_callbackNo

        async def button_disabled(interaction):
            return

        view = View()
        view.add_item(buttonYes)
        view.add_item(buttonNo)
        sent = await ctx.send(embed=warnemb, view=view)


@bot.command(aliases = ['count_bans','inf_ban','infraction_banings','tempbanings'])
@commands.has_permissions(kick_members=True)
async def banings(ctx, *, member: discord.Member = None):

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    guild = ctx.guild
    await ctx.send(ctx.author.mention)

    for row in cur.execute('SELECT * FROM ban'):
        server = row[5]
        if server == guild.id:
            pass
        elif member == None:
                emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucun banissement' , color=warned)
                emb2.set_author(name = guild, icon_url = guild.icon)
                await ctx.send(embed = emb2)
                return
        else:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucun banissement**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

    

    if member == None:
        count_server_bans = cur.execute(f'SELECT COUNT(*) FROM ban').fetchone()[0]
        count_server_tempbans = cur.execute(f'SELECT COUNT(*) FROM tempban').fetchone()[0]
        count_server_softbans = cur.execute(f'SELECT COUNT(*) FROM softban').fetchone()[0]

        count_all_bans = count_server_bans + count_server_softbans + count_server_tempbans

        emb1 = discord.Embed(description= f'Ce serveur compte un total de **{count_all_bans}** action(s) liés au banissement' , color = green)
        emb1.set_author(name = guild, icon_url = guild.icon)

        if count_all_bans == 0:
            emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucune action liés au banissement' , color=warned)
            emb2.set_author(name = guild, icon_url = guild.icon)
            await ctx.send(embed = emb2)
            return

        else:
            for row in cur.execute('SELECT * FROM ban'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM tempban'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                time = row[4]
                type = row[5]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Temps:** `{time}` \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM softban'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

    else:
        count_member_bans = cur.execute(f'SELECT COUNT(*) FROM ban WHERE idMember = {member.id}').fetchone()[0]
        count_member_softbans = cur.execute(f'SELECT COUNT(*) FROM tempban').fetchone()[0]
        count_member_tempbans = cur.execute(f'SELECT COUNT(*) FROM softban').fetchone()[0]

        count_all_member_bans = count_member_bans + count_member_softbans + count_member_tempbans


        emb1 = discord.Embed(description= f'Cet utilisateur compte un total de **{count_all_member_bans}** banissement(s)' , color = green)
        emb1.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)

        if count_all_member_bans == 0:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucun banissement**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

        else:

            for row in cur.execute(f'SELECT * FROM ban WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute(f'SELECT * FROM softban WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute(f'SELECT * FROM tempban WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                time = row[4]
                type = row[5]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Temps:** `{time}` \n**Type:** *{type}*', inline=False)
    
    await ctx.send(embed = emb1)

    con.close()

@bot.command()
@commands.has_permissions(ban_members=True)
async def unban(ctx, member = None ,* , reason = None ):


    if member == None:
        await ctx.send('**❌ Merci de préciser un membre a bannir, voici la liste des membres banni pour vous aider :**')
        try:
            bans = await ctx.guild.bans()
        except:
            return await ctx.send(embed = discord.Embed(title = f"❌ Permission non valide !", description = f"{ctx.author.name}, vous n'avez pas les droits nécessaires!" , color = red))

        em = discord.Embed(title=f'Liste des membres ban ({len(bans)}):')
        em.description = f'\n '.join([str(b.user) for b in bans])
        em.color = green

        if len(bans) == 0:
            await ctx.send(ctx.author.mention)
            return await ctx.send(embed = discord.Embed(title = f":warning: Erreur !", description = f"{ctx.author.mention}, Il semblerait qu'aucun membre soit ban!" , color = warned))

        if len(bans) > 0:
            await ctx.send(embed=em)
            await ctx.send('`💡 Astuce: Pour les membre banni avec des espaces dans leurs pseudo. Mettez leur pseudo entre guillaumets.` `Ex: +unban "Ikko le vrai" raison`, `Ex 2: +unban "Thomas zozo #1234" Raison`')
            return


    banned_users = await ctx.guild.bans()
    if member.startswith('@'):
        member = member[1:]

    res = member.split('#')
    member_name = res[0]
    member_discriminator = None
    if len(res) > 1:
        member_discriminator = res[1]

    if reason == None:
        reason = "Raison non fournie"

    is_ban = False

    for ban_entry in banned_users:
        ban_entry_user = ban_entry.user
        
        if member_name == ban_entry_user.name :
            if member_discriminator == None :
                print(f'Etes-vous sur de vouloir unban  {ban_entry_user}?')
                #TODO

                await ctx.guild.unban(ban_entry_user)
                is_ban = True
                break
            elif member_discriminator == ban_entry_user.discriminator :
                await ctx.guild.unban(ban_entry_user)
                is_ban = True
                break
            else:
                print(f'Ban user {ban_entry_user} exists but the specified discriminator {member_discriminator} is not the same')

    if is_ban == False :
        await ctx.send("**❌ Ce membre n'existe pas ou n'est pas ban, voici la liste des membres banni pour vous aider :**")
        try:
            bans = await ctx.guild.bans()
        except:
            return await ctx.send(embed = discord.Embed(title = f"❌ Permission non valide !", description = f"{ctx.author.name}, vous n'avez pas les droits nécessaires!" , color = red))

        em = discord.Embed(title=f'Liste des membres ban ({len(bans)}):')
        em.description = f'\n '.join([str(b.user) for b in bans])
        em.color = green

        await ctx.send(embed=em)
        await ctx.send('`💡 Astuce: Pour les membre banni avec des espaces dans leurs pseudo. Mettez leur pseudo entre guillaumets.` `Ex: +unban "Ikko le vrai" raison`, `Ex 2: +unban "Thomas zozo #1234" raison`')


    else:
        emb = discord.Embed(title="✅ L'utilisateur est unban !",color=green)
        emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
        emb.add_field(name='Modérateur / administrateur :',value=ctx.message.author.mention,inline=False)
        emb.add_field(name='Membre unban :',value=member,inline=False)
        emb.add_field(name="Raison de l'unban:",value=f'`{reason}`',inline=False)
        await ctx.send(embed = emb)
        await ctx.send('`💡 Astuce: Pour les membre banni avec des espaces dans leurs pseudo. Mettez leur pseudo entre guillaumets.` `Ex: +unban "Ikko le vrai" raison`, `Ex 2: +unban "Thomas zozo #1234" Raison`')


async def do_mute(ctx, member: discord.Member = None , time = None, reason = None):

    time1 =  humanfriendly.parse_timespan(time)
    await member.timeout(until= discord.utils.utcnow() + tiime.timedelta(seconds = time1), reason=reason)
    print('did')

    guild = ctx.guild



    emb = discord.Embed(title="✅ L'utilisateur est réduit au silence !",color=green)
    emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb.add_field(name='Modérateur / administrateur :',value=ctx.author.mention,inline=False)
    emb.add_field(name='Membre réduit au silence :',value=member.mention,inline=False)
    emb.add_field(name='Temps :', value = f'`{time}`')
    emb.add_field(name="Serveur :", value=f'*{ctx.guild.name}*')
    emb.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await ctx.send(embed = emb)
    emb2 = discord.Embed(title="👮 Vous êtes muet ! ",color=green)
    emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb2.add_field(name='Modérateur / administrateur :',value=ctx.author,inline=False)
    emb2.add_field(name='Membre réduit au silence :',value=member.mention,inline=False)
    emb2.add_field(name='Temps :', value = f'`{time}`')
    emb2.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await member.send(embed = emb2)

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    count_member_kicks = cur.execute(f'SELECT COUNT(*) FROM mute WHERE idMember={member.id}').fetchone()[0]
    print(count_member_kicks)

    if count_member_kicks >= 3:
        print(f'{member.mention} a dejà été réduit au silence au moins 3 fois !')

    current_timestamp = datetime.now().timestamp()
    #print(f'{datetime.fromtimestamp(current_timestamp)}')
    cur.execute(f"INSERT INTO mute VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}','{time}','Mute',{ctx.guild.id})")
    con.commit()
    con.close()



        
@bot.command(aliases=['Timeout','timeout'])
@commands.has_permissions(kick_members = True)
async def mute(ctx, member: discord.Member = None , time = None, *, reason = None):

    #print(f'time: {time}')
    time_unit = time[-1]
    time_duration = time[:-1] 
    
    print(f'time_unit: {time_unit}')
    print(f'time_duration: {time_duration}')


    if reason == None:
        reason_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier la raison du bannissement !`\n\n `(+mute @membre <raison>)`",color = red) 
        await ctx.send(embed = reason_none_embed)
        return

    if member == ctx.author:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Impossible de vous bannir vous même !`\n\n `(+mute @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return

    if member == None:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier le membre a mute !`\n\n `(+mute @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return


    if time == None:
        await ctx.send("**❌ Merci de préciser un chiffre suivi d'une lettre exprimant la durée** `(d pour jours, h pour heures, m pour minutes, s pour secondes)`.")
        return
        
    if time_duration.isdigit() == False :
        await ctx.send("**❌ Merci de préciser un chiffre suivi d'une lettre exprimant la durée** `(d pour jours, h pour heures, m pour minutes, s pour secondes. Ex: 1 h ; 3 d ; 5 m)`.")
        return


    ##if time_unit != 'd' and 's' and 'm' and 'h' :
        #await ctx.send("**❌ Merci de préciser un chiffre suivi d'une lettre exprimant la durée** `(d pour jours, h pour heures, m pour minutes, s pour secondes)`.")
       # return


    time1 =  humanfriendly.parse_timespan(time)
    await member.timeout(until= discord.utils.utcnow() + tiime.timedelta(seconds = time1), reason=reason)

    guild = ctx.guild



    emb = discord.Embed(title="✅ L'utilisateur est réduit au silence !",color=green)
    emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb.add_field(name='Modérateur / administrateur :',value=ctx.author.mention,inline=False)
    emb.add_field(name='Membre réduit au silence :',value=member.mention,inline=False)
    emb.add_field(name='Temps :', value = f'`{time}`')
    emb.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await ctx.send(embed = emb)
    emb2 = discord.Embed(title="👮 Vous êtes muet ! ",color=green)
    emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb2.add_field(name='Modérateur / administrateur :',value=ctx.author,inline=False)
    emb2.add_field(name='Membre réduit au silence :',value=member.mention,inline=False)
    emb2.add_field(name='Temps :', value = f'`{time}`')
    emb2.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await member.send(embed = emb2)

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    count_member_kicks = cur.execute(f'SELECT COUNT(*) FROM mute WHERE idMember={member.id}').fetchone()[0]
    print(count_member_kicks)

    if count_member_kicks >= 3:
        print(f'{member.mention} a dejà été réduit au silence au moins 3 fois !')

    current_timestamp = datetime.now().timestamp()
    #print(f'{datetime.fromtimestamp(current_timestamp)}')
    cur.execute(f"INSERT INTO mute VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}','{time}','Mute')")
    con.commit()
    con.close()


@bot.command(aliases = ['count_mutes'])
@commands.has_permissions(kick_members=True)
async def mutings(ctx, *, member: discord.Member = None):

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    guild = ctx.guild
    await ctx.send(ctx.author.mention)

    

    if member == None:
        count_server_mutes = cur.execute(f'SELECT COUNT(*) FROM mute').fetchone()[0]
        emb1 = discord.Embed(description= f'Ce serveur compte un total de **{count_server_mutes}** mute(s)' , color = green)
        emb1.set_author(name = guild, icon_url = guild.icon)

        if count_server_mutes == 0:
            emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucun mute' , color=warned)
            emb2.set_author(name = guild, icon_url = guild.icon)
            await ctx.send(embed = emb2)
            return

        else:
            for row in cur.execute('SELECT * FROM mute'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                time = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}` \n**Temps:** `{time}` \n**Raison:** *{reason}*', inline=False)
    else:
        count_member_mutes = cur.execute(f'SELECT COUNT(*) FROM mute WHERE idMember = {member.id}').fetchone()[0]
        emb1 = discord.Embed(description= f'Cet utilisateur compte un total de **{count_member_mutes}** mute(s)' , color = green)
        emb1.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)

        if count_member_mutes == 0:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucun mute**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

        else:

            for row in cur.execute(f'SELECT * FROM mute WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}` \n**Temps:** `{time}` \n**Raison:** *{reason}*', inline=False)
    
    await ctx.send(embed = emb1)

    con.close()


@bot.command(aliases= ['untimeout','detimeout','demute'])
@commands.has_permissions(kick_members = True)
async def unmute(ctx, member: discord.Member = None , *, reason = None):

    if reason == None:
        reason_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier la raison du unmute !`\n\n `(+unmute @membre <raison>)`",color = red) 
        await ctx.send(embed = reason_none_embed)
        return

    if member == ctx.author:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Impossible de vous unmute vous même !`\n\n `(+unmute @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return

    if member == None:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier le membre a unmute !`\n\n `(+unmute @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return
    
    await member.timeout(until= None, reason=reason)
    emb = discord.Embed(title="👮 L'utilisateur a été unmute avec succés ! ",color=green)
    emb.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb.add_field(name='Modérateur / administrateur :',value= ctx.author.mention,inline=False)
    emb.add_field(name='Membre unmute :',value=member.mention,inline=False)
    emb.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await ctx.send(embed=emb)
    emb2 = discord.Embed(title="✅ Vous etes plus muet !",color=green)
    emb2.set_author(name = ctx.author, icon_url = ctx.author.avatar)
    emb2.add_field(name='Modérateur / administrateur :',value=ctx.author.mention,inline=False)
    emb2.add_field(name='Membre unmute :',value=member.mention,inline=False)
    emb2.add_field(name='Raison :',value=f'`{reason}`',inline=False)
    await member.send(embed = emb2)

@bot.command(pass_context=True)
@commands.has_permissions(ban_members=True)
@commands.cooldown(1, 10, commands.BucketType.user)
async def softban(ctx, member: discord.Member , *, reason):

    if reason == None:
        reason_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier la raison du softban !`\n\n `(+softban @membre <raison>)`",color = red) 
        await ctx.send(embed = reason_none_embed)
        return

    if member == ctx.author:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Impossible de vous softban vous même !`\n\n `(+softban @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return

    if member == None:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier le membre a softban !`\n\n `(+softban @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return

        
    inv = await ctx.channel.create_invite(max_uses=1)
    emb = discord.Embed(title= '👮 Vous avez été softban' , color = soft_color)
    emb.add_field(name='Modérateur / administrateur :',value= ctx.message.author.mention,inline=False)
    emb.add_field(name = 'Reviens nous voir avec le lien' , value = f'{inv}')
    emb.add_field(name='User softban :',value=member.mention,inline=False)
    emb.add_field(name='Raison :',value=reason,inline=False)
    await member.send(embed = emb)
    await ctx.send(ctx.author.mention)
    emb1 = discord.Embed(title= '✅ Softban executé avec succés' , color = green)
    emb1.add_field(name='Modérateur / administrateur :',value= ctx.message.author.mention,inline=False)
    emb1.add_field(name='User softban :',value=member.mention,inline=False)
    emb1.add_field(name='Raison :',value=reason,inline=False)
    await ctx.send(embed = emb1)
    await ctx.guild.ban(member)
    await asyncio.sleep(0.1)
    await ctx.guild.unban(member)

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    count_member_softban = cur.execute(f'SELECT COUNT(*) FROM softban WHERE idMember={member.id}').fetchone()[0]
    print(count_member_softban)

    if count_member_softban >= 2:
        print(f'{member.mention} a dejà été softban au moins 2 fois !')

    current_timestamp = datetime.now().timestamp()
    #print(f'{datetime.fromtimestamp(current_timestamp)}')
    cur.execute(f"INSERT INTO softban VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}','Softban')")
    con.commit()
    con.close()

    print(f"{member} got softbanned from {ctx.guild.name}")

@bot.command(aliases = ['count_softbans'])
@commands.has_permissions(kick_members=True)
@commands.cooldown(1, 10, commands.BucketType.user)
async def softbanings(ctx, *, member: discord.Member = None):

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    guild = ctx.guild
    await ctx.send(ctx.author.mention)

    

    if member == None:
        count_server_softban = cur.execute(f'SELECT COUNT(*) FROM softban').fetchone()[0]
        emb1 = discord.Embed(description= f'Ce serveur compte un total de **{count_server_softban}** softban(s)' , color = green)
        emb1.set_author(name = guild, icon_url = guild.icon)

        if count_server_softban == 0:
            emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucun softban' , color=warned)
            emb2.set_author(name = guild, icon_url = guild.icon)
            await ctx.send(embed = emb2)
            return

        else:
            for row in cur.execute('SELECT * FROM softban'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}*', inline=False)
    else:
        count_member_softban = cur.execute(f'SELECT COUNT(*) FROM softban WHERE idMember = {member.id}').fetchone()[0]
        emb1 = discord.Embed(description= f'Cet utilisateur compte un total de **{count_member_softban}** softban(s)' , color = green)
        emb1.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)

        if count_member_softban == 0:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucun softban**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

        else:

            for row in cur.execute(f'SELECT * FROM softban WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}*', inline=False)
    
    await ctx.send(embed = emb1)

    con.close()


@bot.command()
@commands.has_permissions(ban_members=True)
@commands.cooldown(1, 10, commands.BucketType.user)
async def tempban(ctx, member: discord.Member = None , time = None, *, reason = None):

    time_unit = time[-1]
    time_duration = time[:-1]
    
    print(f'{time_unit}')
    print(f'{time_duration}')

    print(f'{member.mention}')

    if reason == None:
        reason_none_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier la raison du tempban !`\n\n `(+tempban @membre <raison>)`",color = red) 
        await ctx.send(embed = reason_none_embed)
        return

    if member == ctx.author:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Impossible de vous tempban vous même !`\n\n `(+tempban @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return

    if member == None:
        member_author_embed = discord.Embed(title='❌ Erreur !',description="`Merci de spécifier le membre a tempban !`\n\n `(+tempban @membre <raison>)`",color = red) 
        await ctx.send(embed = member_author_embed)
        return
    #if time == None:
        #await ctx.send("**❌ Merci de préciser un chiffre suivi d'une lettre exprimant la durée** `(d pour jours, h pour heures, m pour minutes, s pour secondes)`.")
        #return

        
    if time_duration.isdigit() == False :
        await ctx.send("**❌ Merci de préciser un chiffre suivi d'une lettre exprimant la durée** `(d pour jours, h pour heures, m pour minutes. Ex: 1h ; 3d ; 5m)`.")
        return


    #TODO Régler l'erreur du 'if time_duration != 'd' or 's' or 'm' or 'h' :'

    ####if time_unit != 'd' or 'm' or 'h' or 'M' or 'H' or 'D' :
    ###    print('Erreur 22')
    ##    await ctx.send("**❌ Merci de préciser un chiffre suivi d'une lettre exprimant la durée** `(d pour jours, h pour heures, m pour minutes)`.")
    #    return
#

    time1 =  humanfriendly.parse_timespan(time)
    #await member.timeout(until= discord.utils.utcnow() + tiime.timedelta(seconds = time1), reason=reason)
    
    print(time1)
    guild = ctx.guild

    warnemb = discord.Embed(title=f":warning: Vous vous apprêtez a bannir temporairement {member.name}.",description=f"Cette action bannira temporairement {member.mention} du serveur. Êtes vous sur de vouloir continuer votre action.\n\n**Merci de valider :**\n",color=warned)
    warnemb.set_footer(text=warn_footer)


    buttonYes = Button(label='Oui', style=discord.ButtonStyle.green)
    buttonNo = Button(label='Non', style=discord.ButtonStyle.danger)


    async def button_callbackNo(interaction):

        if interaction.user.id != ctx.author.id:
            await interaction.response.send_message(embed = button_false_user_emb,ephemeral=True)
            return

        emb = discord.Embed(title='🛑 Commande annulée',description="Vous avez choisi d'annuler la commande",color=warned)
        await interaction.response.send_message(embed = emb)
        buttonYes.callback = button_disabled
        buttonNo.callback = button_disabled
        await asyncio.sleep(10)
        await sent.delete()
        return

    member = await bot.fetch_user(member.id)


    async def button_callbackYes(interaction):

        emb1 = discord.Embed(title = '👮 Vous avez été tempban' , color = soft_color)
        emb1.add_field(name='Modérateur / administrateur :',value= ctx.message.author.mention,inline=False )
        emb1.add_field(name='User tempban :',value=member.mention,inline=False)
        emb1.add_field(name='Temps du tempban :',value=f'`{time}`',inline=False)
        emb1.add_field(name='Raison :',value=f"{reason}",inline=False)

        emb = discord.Embed(title = '✅ Tempban executé avec succès' , color = green )
        emb.add_field(name='Modérateur / administrateur :',value= ctx.message.author.mention,inline=False)
        emb.add_field(name='User tempban :',value=member.mention,inline=False)
        emb.add_field(name='Temps du tempban :',value=f'`{time}`',inline=False)
        emb.add_field(name='Raison :',value=f"{reason}",inline=False)

        emb2 = discord.Embed(title = '✅ Votre tempban est terminé' , description = 'Bon retour parmis nous', color = soft_color )
        emb2.add_field(name='Lien du serveur :',value= 'https://discord.gg/5R5486z773',inline=False)
        emb2.add_field(name='Ancienne raison du tempban :',value=f"{reason}",inline=False)

        time_minutes = time1 / 60
        
        con = sqlite3.connect(f'{db_name}')
        cur = con.cursor()

        count_member_softban = cur.execute(f'SELECT COUNT(*) FROM tempban WHERE idMember={member.id}').fetchone()[0]
        print(count_member_softban)

        if count_member_softban >= 2:
            print(f'{member.mention} a dejà été tempban au moins 2 fois !')

        current_timestamp = datetime.now().timestamp()
        #print(f'{datetime.fromtimestamp(current_timestamp)}')
        cur.execute(f"INSERT INTO tempban VALUES ({ctx.author.id},{member.id},'{current_timestamp}','{reason}',{time_minutes },'Tempban')")
        con.commit()
        con.close()
        
        
        await member.send(embed = emb1)
        await ctx.guild.ban(member)
        await interaction.response.send_message(embed = emb)
        print(f'ban ok {time1}')
        await asyncio.sleep(int(time1))
        print('sleep ok')
        await ctx.guild.unban(member)
        print('unban ok')


    buttonYes.callback = button_callbackYes
    buttonNo.callback = button_callbackNo

    async def button_disabled(interaction):
        return

    view = View()
    view.add_item(buttonYes)
    view.add_item(buttonNo)
    sent = await ctx.send(embed=warnemb, view=view)




@bot.command(aliases = ['sanctions'])
@commands.has_permissions(ban_members=True)
@commands.cooldown(1, 20, commands.BucketType.user)
async def infractions(ctx, *, member: discord.Member = None):
 
    guild = ctx.guild

    con = sqlite3.connect(f'{db_name}')
    cur = con.cursor()

    if member == None:
        count_server_warn = cur.execute(f'SELECT COUNT(*) FROM warn').fetchone()[0]
        count_server_ban = cur.execute(f'SELECT COUNT(*) FROM ban').fetchone()[0]
        count_server_softban = cur.execute(f'SELECT COUNT(*) FROM softban').fetchone()[0]
        count_server_tempban = cur.execute(f'SELECT COUNT(*) FROM tempban').fetchone()[0]
        count_server_kick = cur.execute(f'SELECT COUNT(*) FROM kick').fetchone()[0]
        count_server_softkick = cur.execute(f'SELECT COUNT(*) FROM softkick').fetchone()[0]
        count_server_mute = cur.execute(f'SELECT COUNT(*) FROM mute').fetchone()[0]
        count_server_inf = count_server_kick + count_server_ban + count_server_mute + count_server_warn + count_server_softban + count_server_softkick + count_server_tempban
        emb1 = discord.Embed(description= f'Ce serveur compte un total de **{count_server_inf}** infractions(s)' , color = green)
        emb1.set_author(name = guild, icon_url = guild.icon)


        if count_server_inf == 0:
                emb2=discord.Embed(title=':warning: Erreur :' , description=f'{guild.name}  ne compte aucune infraction' , color=warned)
                emb2.set_author(name = guild, icon_url = guild.icon)
                await ctx.send(embed = emb2)
                return

        #Wewe la on fait le serveur

        else:
            for row in cur.execute('SELECT * FROM softban'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM tempban'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                time = row[4]
                type = row[5]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Temps:** `{time}m` \n**Type:** *{type}*', inline=False)


            for row in cur.execute('SELECT * FROM ban'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM mute'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                time = row[4]
                type = row[5]

                if "BOT AUTOMOD" in reason: 
                    emb1.add_field(
                        name=f"ID: {idMember}",
                        value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** `BOT AUTOMOD SYSTEM:` (<@{bot_id}>) \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Temps:** `{time}` \n**Type:** *System Automod: Mute*', inline=False)

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}` \n**Raison:** *{reason}* \n**Temps:** `{time}` \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM warn'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4] 

                if "BOT AUTOMOD" in reason: 
                    emb1.add_field(
                        name=f"ID: {idMember}",
                        value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** `BOT AUTOMOD SYSTEM:` (<@{bot_id}>) \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *System Automod: Warn*', inline=False)

                else:
                    emb1.add_field(
                        name=f"ID: {idMember}",
                        value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM kick'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM softkick'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Utilisateur:** <@{idMember}> (`{idMember}`) \n**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

    
    else:
        count_member_softban = cur.execute(f'SELECT COUNT(*) FROM softban WHERE idMember = {member.id}').fetchone()[0]
        count_member_ban = cur.execute(f'SELECT COUNT(*) FROM ban WHERE idMember = {member.id}').fetchone()[0]
        count_member_tempban = cur.execute(f'SELECT COUNT(*) FROM tempban WHERE idMember = {member.id}').fetchone()[0]
        count_member_kick = cur.execute(f'SELECT COUNT(*) FROM kick WHERE idMember = {member.id}').fetchone()[0]
        count_member_mute = cur.execute(f'SELECT COUNT(*) FROM mute WHERE idMember = {member.id}').fetchone()[0]
        count_member_warn = cur.execute(f'SELECT COUNT(*) FROM warn WHERE idMember = {member.id}').fetchone()[0]
        count_member_softkick = cur.execute(f'SELECT COUNT(*) FROM softkick WHERE idMember = {member.id}').fetchone()[0]

        count_member_inf = count_member_kick + count_member_ban + count_member_mute + count_member_warn + count_member_softban + count_member_softkick + count_member_tempban

        emb1 = discord.Embed(title=f'Membre : {member}',description= f'Cet utilisateur compte un total de **{count_member_inf}** softban(s)' , color = green)
        emb1.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)

        if count_member_inf == 0:
                    emb3=discord.Embed(title=':warning: Erreur :' , description=f'**{member.name}  ne compte aucune infractions**' , color=warned)
                    emb3.set_author(name = f'{member} ({member.id})', icon_url = member.avatar)
                    await ctx.send(embed = emb3)
                    return

        else:

            for row in cur.execute(f'SELECT * FROM softban WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]


                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute(f'SELECT * FROM ban WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Temps:** `{time}m` \n**Type:** *{type}*', inline=False)

            for row in cur.execute(f'SELECT * FROM softban WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                time = row[4]
                type = row[5]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute(f'SELECT * FROM kick WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]


                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)
            
            for row in cur.execute(f'SELECT * FROM mute WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                time = row[4]
                type = row[5]

                if "BOT AUTOMOD" in reason: 
                    emb1.add_field(
                        name=f"ID: {idMember}",
                        value=f'**Modérateur:** `BOT AUTOMOD SYSTEM:` (<@{bot_id}>) \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Temps:** `{time}` \n**Type:** *System Automod: Mute*', inline=False)

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}` \n**Raison:** *{reason}* \n**Temps:** `{time}` \n**Type:** *{type}*', inline=False)

            for row in cur.execute(f'SELECT * FROM warn WHERE idMember = {member.id}'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                if "BOT AUTOMOD" in reason: 
                    emb1.add_field(
                        name=f"ID: {idMember}",
                        value=f'**Modérateur:** `BOT AUTOMOD SYSTEM:` (<@{bot_id}>) \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *System Automod: Warn*', inline=False)

                else:
                    emb1.add_field(
                        name=f"ID: {idMember}",
                        value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)

            for row in cur.execute('SELECT * FROM softkick'):
                idAuthor= row[0]
                idMember = row[1]
                date = f'{datetime.fromtimestamp(row[2]).strftime("%A %d %b %Y %H:%M:%S")}'
                reason= row[3]
                type = row[4]

                emb1.add_field(
                    name=f"ID: {idMember}",
                    value=f'**Modérateur:** <@{idAuthor}> \n**Date:** `{date}`\n**Raison:** *{reason}* \n**Type:** *{type}*', inline=False)
    
    await ctx.send(embed = emb1)

    con.close()
  
@bot.command(aliases=['i_c','inf_clear'])
@commands.has_permissions(administrator=True)
#@commands.cooldown(1, 20, commands.BucketType.user)
async def infractions_clear(ctx, param1=None, *, param2=None):
    #warnemb = discord.Embed(title=f":warning: Vous vous apprêtez a expulser {member.name}.",description=f"Cette action expulsera {member.mention} du serveur. Êtes vous sur de vouloir continuer votre action.\n\n**Merci de valider :**\n",color=warned)
    #warnemb.set_footer(text=warn_footer)


    buttonYes = Button(label='Oui', style=discord.ButtonStyle.green)
    buttonNo = Button(label='Non', style=discord.ButtonStyle.danger)
    print(param1)
    print(param2)

   

    member = None
    category = None


    if param1 == None:
        print(param1)
        return

    if param1.startswith('<') or param1.startswith('@'):
        member = param1
        print(f"param1 = member")

    elif isinstance(param1, str):
        category = param1
        print(f"param1 = category")


    if param2 == None:
        print(param2)
        return

    if param2.startswith('<') or param2.startswith('@'):
        member = param2
        print(f"param2 = member")

    elif isinstance(param2, str):
        category = param2
        print(f"param2 = category")


  #  con = sqlite3.connect(f"{db_name}")
    #cur = con.cursor()

    #if param1 == None and category == "Warn" or "warn" or "warnings" or "Warnings":
     #  cur.execute(f'DELETE FROM warn')
      #  await ctx.send('Database cleaned')

    #con.commit()
    #con.close()



@bot.command()
@commands.cooldown(1, 20, commands.BucketType.user)
@commands.has_permissions(ban_members=True)
async def bans(ctx):
        '''See a list of banned users in the guild'''
        

        try:
            bans = await ctx.guild.bans()
        except:
            return await ctx.send(embed = discord.Embed(title = f"❌ Permission non valide !", description = f"{ctx.author.mention}, vous n'avez pas les droits nécessaires!" , color = red))

        if len(bans) == 0:
            await ctx.send(ctx.author.mention)
            return await ctx.send(embed = discord.Embed(title = f":warning: Erreur !", description = f"{ctx.author.mention}, Il semblerait qu'aucun membre soit ban!" , color = warned))


        em = discord.Embed(title=f'🛡 Liste des membres ban ({len(bans)}):')
        em.description = f'\n '.join([str(b.user) for b in bans])
        em.color = ctx.guild.me.top_role.color

        await ctx.send(embed=em)

@bot.command()
@commands.has_permissions(ban_members=True)
async def baninfo(ctx, *, name):
        '''Check the reason of a ban from the audit logs.'''
        ban = await ctx.guild.bans(name)
        em = discord.Embed()
        em.color = green
        em.set_author(name=str(ban.user), icon_url=ban.user.avatar_url)
        em.add_field(name='Reason', value=ban.reason or 'None')
        em.set_thumbnail(url=ban.user.avatar_url)
        em.set_footer(text=f'User ID: {ban.user.id}')

        await ctx.send(embed=em)


@bot.command(name="toggle",alases=['disable' , 'enable'], description="Enable or disable a command!")
@commands.is_owner()
async def toggle(ctx, *, command):
        command = bot.get_command(command)
        if command is None:
            embed = discord.Embed(title="❌ ERROR", description=f"I can't find a command named {command}!", color=0xff0000)
            await ctx.send(embed=embed)

        elif ctx.command == command:
            embed = discord.Embed(title="❌ ERROR", description="You cannot disable this command.", color=0xff0000)
            await ctx.send(embed=embed)

        else:
            command.enabled = not command.enabled
            ternary = "Activation" if command.enabled else "Désactivation"
            embed = discord.Embed(title=f":warning: {ternary}", description=f" {ternary} de la commande {command.qualified_name} pour le serveur !", color=pink)
            await ctx.send(embed=embed)

@bot.command()
async def nagaroshi(ctx):

    await ctx.send("https://tenor.com/view/nagaroshi-gif-26311338")



@bot.command(aliases=['purge', 'prune', 'cls'])
@commands.cooldown(1, 20 ,commands.BucketType.user)
@commands.has_permissions(manage_messages=True)
async def clear(ctx, amount=0):

        if amount == 0:
            emb1 = discord.Embed(title= "❌ Erreur" , description = "Merci de spécifier le nombres de messages à supprimer !" , color = red)
            await ctx.send(embed = emb1)
            await ctx.message.add_reaction(emoji='❌')
        elif amount <= 0:  # lower then 0
            emb2 = discord.Embed(title='❌ Erreur' , description = "Le nombre se doit être au dessus 0 !", color=red)
            await ctx.send(embed = emb2)
            await ctx.message.add_reaction(emoji='❌')

        elif amount > 300:  # lower then 300
            emb2 = discord.Embed(title='❌ Erreur' , description = "Le nombre se doit d'être en dessous de 300 !", color=red)
            await ctx.send(embed = emb2)
            await ctx.message.add_reaction(emoji='❌')
        else:
            emb3 = discord.Embed(title='✅ Commande executé avec succés', color = green)
            emb3.add_field(name = "Nombre de meesages supprimés :" , value = f"Vous avez supprimés **{amount}** messages")
            emb3.add_field(name='Modérateur / administrateur :',value= ctx.message.author.mention,inline=False)
            await ctx.channel.purge(limit=amount)
            await ctx.send(embed = emb3)


#Error handeler

@accept.error
@userinfo.error
@ban.error
@bans.error
@clear.error
@kick.error
@tempban.error
@member_update.error
@mute.error
@dm.error
@nick.error
@refuse.error
@test.error
@toggle.error
@unmute.error
@infractions.error
@warn.error
@unban.error
@addrole.error
@warnings.error
async def error_handler(ctx , error):
    coderror = 'None'
    if isinstance(error, commands.MissingPermissions):
        coderror = 'Erreur 201'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Permission non valide !", description = f" {ctx.author.name}, Vous devez avoir la bonne permission: `{error.missing_permissions}` !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.CommandNotFound):
        coderror = '101'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Commande introuvable !\n (**Erreur {coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.DisabledCommand):
        coderror = '204'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, La commande est désavctivée !\n (**Erreur {coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.NoPrivateMessage):
        coderror =  'Erreur 402'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Il semblerait que je ne peux envoyer de Messages Privées !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.NotOwner):
        coderror = 'Erreur 401'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Cette commande est réservée aux devloppeurs !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    if isinstance(error, commands.CommandOnCooldown):
        coderror = 'Erreur 203'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Merci d'attendre la fin du cooldown. Vous pouvez la réexecuter dans `{error.retry_after:.2f}s` !\n (**{coderror}**)" , color = red ))
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
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Il manque un l'argument : `{error.param}` !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return

    if isinstance(error, commands.MemberNotFound):
        coderror = 'Erreur 102'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Le membre `{error.argument}` est introuvable !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return

    if isinstance(error, commands.ChannelNotFound):
        coderror = 'Erreur 103'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Le channel `{error.argument}` est introuvable !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return

    if isinstance(error, commands.ChannelNotReadable):
        coderror = 'Erreur 402'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Je n'ai pas le droit de lire les messages de ce salon: `{error.argument}` !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return

    if isinstance(error, commands.BadInviteArgument):
        coderror = 'Erreur 204'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Il semblerait que l'invitation est expiré ou invalide !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return
    
    if isinstance(error, commands.MaxConcurrencyReached):
        coderror = 'Erreur 304'
        await ctx.send(ctx.author.mention)
        await ctx.send(embed = discord.Embed(title = f"❌ Erreur !", description = f" {ctx.author.name}, Il semblerait que le nombre maximum de personnes pouvant utiliser la commande en même temps est été atteint. Merci de bien vouloir attendre un peu !\n (**{coderror}**)" , color = red ))
        print(coderror)
        return


    coderror = '000'
    await ctx.send(ctx.author.mention)
    await ctx.send(embed = discord.Embed(title = f"❌ ERROR !", description = f'Erreur : {error} \n (Erreur **{coderror}**)' , color = red ))
    print(error)
    print(coderror)



bot.run('OTQ3MTIzODE3MTMyNzUyOTE2.Yhoryg.dL-PaJ9L7n8KsYu5FlMamg1Lxgo')