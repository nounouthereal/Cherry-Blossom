
import discord
from discord.ext import commands

class ReactionsRolesNotSetup(commands.CommandError):
    '''Reactions roles aren't setup'''
    pass

def is_setup():
    async def wrap_func(ctx):
        data = await ctx.bot.config.find(ctx.guild.id)
        if data is None:
            raise ReactionsRolesNotSetup

        if data.get("message.id") is None:
            raise ReactionsRolesNotSetup

        return True

    return commands.check(wrap_func)

class Reactions(commands.Cog, name = "ReactionRoles"):
    def __init__(self, bot):
        self.bot = bot


    @commands.group(invoke_without_command=True, aliases=['anim'])

    @commands.guild_only()
    async def reactionroles(self, ctx):
        await ctx.invoke(self.bot.get_command('Help'), entity ='reactionroles')


def setup(bot):
    bot.add_cog(Reactions(bot))