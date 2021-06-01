const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class unmute extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['unmute', 'retirarmute']
    this.category = 'Moderation'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    let member = message.mentions.members.first() || message.member.guild.members.get(args[1]);
    const embedA = new Discord.MessageEmbed()

      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', `${member}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`KICK_MEMBERS`', true)
      .setFooter("🧁・Discord da Jeth", message.member.guild.iconURL({ dynamic: true, size: 1024 }))
    if (!message.member.hasPermission('KICK_MEMBERS'))
      return message.channel.createMessage(embedA)

    if (!member) return message.reply(`Mencione alguém por favor.`)
    let role = message.member.guild.roles.find(r => r.name === "Muted Jeth")
    if (!message.member.guild.member(member).roles.find(r => r.name === "Muted Jeth")) return message.channel.createMessage(`Esse membro não esta mutado.`)
    let reason = args.slice(1).join(" ")
    if (!reason) {
      reason = `Motivo: Sem-Motivo`
    }

    message.member.guild.member(member).roles.remove(role.id).then(() => {
      message.channel.createMessage(`${member} foi **desmutado** por ${message.author}`)
      this.client.database.Mutados.findByIdAndDelete(member.id)
    })
      .catch(err => console.log('Algo deu errado: ' + err))
  }
}