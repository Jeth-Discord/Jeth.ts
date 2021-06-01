const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class fake extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'Entertainment'
    }
    async run(message, args) {
        const embedA = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${message.author}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
            .setFooter('🧁・Discord da Jeth', message.author.avatarURL)
        if (!message.member.hasPermission('MANAGE_MESSAGES'))

            return message.channel.createMessage(embedA)
        let user = message.mentions.users.first();
        let botmessage = args.slice(1).join(' ')
        if (user == null) {
            message.channel.createMessage("`Faltou você mencionar o usuario`")
        }
        if (botmessage == null) {
            message.channel.createMessage("`Ops parace que você esqueceu de colocar a mensagem`")
        }
        message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL({ format: "png" }) }).then(async w => {
            w.send(botmessage);
        })

    }

}