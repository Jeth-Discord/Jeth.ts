const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class serverinfo extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['server', 'infoserver']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    if (!message.member.guild.me.hasPermission('SEND_MESSAGES')) return console.log('DISCORD: Estou sem permissão em um servidor.')
    const embed = new Discord.MessageEmbed()

      .setTimestamp()
      .setColor(colors.default)
      .setThumbnail(message.member.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle('🧭 **Informações do Servidor:**')
      .setDescription(`🙋🏻 **| Nome:** \n${message.member.guild.name} \n \n 👑 **| Dono:** \n ${message.member.guild.owner.user} \n \n  🤹🏼‍♂️ **| Membros:** \n ${message.member.guild.memberCount} \n \n 🗺 **| Região do Servidor:** \n ${message.member.guild.region} \n \n ⌛️ **| Criado:** \n ${message.member.guild.createdAt}`) // inline false
      .setFooter("🧁・Discord da Jeth", message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    message.channel.createMessage(embed)
  }
}

exports.help = {
  name: "serverinfo"
}