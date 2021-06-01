const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class RenameChannel extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['RenomearCanal', 'ChannelRename']
        this.category = 'Moderation'
    }

    async run(message, args, server) {
        const embedA = new Discord.MessageEmbed()

            .setTimestamp()
            .setColor(colors.default)
            .setTitle('**Err:**', true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_CHANNEL`', true)
            .setFooter("🧁・Discord da Jeth", message.member.guild.iconURL({ dynamic: true, size: 1024 }))
        if (!message.member.hasPermission('MANAGE_CHANNEL')) message.channel.createMessage(embedA)
        let channel = message.mentions.channels.first() || message.member.guild.channels.get(args[0])
        if (!channel) return message.channel.createMessage('Mencione o canal que deseja trocar o nome')
        let name = args.slice(1).join("\u2006").replace("&", "＆").replace("|", "│")
        if (!name) return message.channel.createMessage("Nenhum nome foi inserido")

        channel.setName(name).then(() => {
            message.channel.createMessage(`Nome do canal ${channel} alterado com sucesso para ${name}!`)
        })
    }
}