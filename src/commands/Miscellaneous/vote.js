const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");

module.exports = class Ajuda extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['votar']
        this.category = 'Miscellaneous'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let embed = new Discord.MessageEmbed()
            .setThumbnail(this.client.user.avatarURL())
            .setTitle("<:2690chart:832746523980201994> **Jeth Analytic:**")
            .setColor(colors.default)
            .setImage('https://i.imgur.com/qUzuwG8.png')
            .setDescription(`<:9461systemmessageuser:832746523758166088> Deixe seu voto no bot da Jeth nos ajudando a crescer no discord e podendo ganhar recompensas dependendo de eventos, não se esqueça também de deixar sua análise nos comentários do bot, seja boa ou ruim, isto nos ajuda a melhorar [Avalie Aqui!](https://top.gg/servers/804575416098488380/vote)`)
            .setFooter(`・Avaliado pela equipe Trust & Safety`, message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp(new Date());
        message.channel.send(embed)
    }
}