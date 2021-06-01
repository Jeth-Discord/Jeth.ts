const { Command, colors } = require('../../utils')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const { DiscordAPIError } = require('discord.js')
moment.locale('pt-br')

module.exports = class Registrou extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'SocialCommands'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let member = message.member.guild.member(message.mentions.users.first() || message.member.guild.members.get(args[0]) || message.author)
        if (!member) return message.channel.createMessage('Algum erro terrível aconteceu, entre em contato com skedaddle via /bug')
        let author = await this.client.database.Users.findById(message.author.id)
        let user = await this.client.database.Users.findById(member.id)
        if (!user) {
            new this.client.database.Users({
                _id: member.id
            }).save()
        }
        if (author) {
            if (user) {
                let embed = new MessageEmbed()
                    .setColor(colors.default)
                    .setTimestamp()
                    .setThumbnail('https://cdn.discordapp.com/emojis/763532885935259688.png?v=1')
                    .setDescription('**REPUTAÇÃO TOTAL:**')
                    .addField('Usuário:', `${member}`)
                    .addField('Reps:', `${user.rep}`)
                    .setFooter("🧁・Discord da Jeth", message.member.guild.iconURL({ dynamic: true, size: 1024 }))
                message.channel.createMessage(embed)
            }
        }
    }
}