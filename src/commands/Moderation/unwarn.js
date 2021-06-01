const { Command, colors } = require('../../utils')
const Discord = require("discord.js");


module.exports = class unwarn extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = []
        this.category = 'Moderation'
    }
    async run(message, args) {

        let adv1 = message.member.guild.roles.find(role => role.name === 'Advertência 1');
        let adv2 = message.member.guild.roles.find(role => role.name === 'Advertência 2');
        let adv3 = message.member.guild.roles.find(role => role.name === 'Advertência 3');

        var unwarn = message.mentions.members.first();
        let usuario = message.mentions.members.first() || message.member.guild.members.get(args[0])

        const embedA = new Discord.MessageEmbed()

            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${usuario}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
            .setFooter("🧁・Discord da Jeth", message.member.guild.iconURL({ dynamic: true, size: 1024 }))

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.createMessage(embedA)
        if (!unwarn) return message.reply("Mencione o membro que deseja dar warn!")

        const unwarnembed = new Discord.MessageEmbed()

            .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
            .setTitle('Aviso | Removido')
            .setColor("#ff004c")
            .addField('**Staff:**', `${message.author.username}`, true)
            .addField('**ID:**', `${message.author.id}`, true) //inline
            .addField('**Usuário**:', `${unwarn}`, true)
            .setFooter("🧁・Discord da Jeth", message.member.guild.iconURL({ dynamic: true, size: 1024 }))
            .setTimestamp();

        if (unwarn.roles.cache.has(adv1.id))
            unwarn.roles.remove(adv1)


        if (unwarn.roles.cache.has(adv2.id))
            unwarn.roles.remove(adv2)


        if (unwarn.roles.cache.has(adv3.id))
            unwarn.roles.remove(adv3)
        message.channel.createMessage(unwarnembed)
    }
}