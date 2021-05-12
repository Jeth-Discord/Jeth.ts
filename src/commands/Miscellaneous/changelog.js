const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class bug extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = ['changelogs']
    this.category = 'Miscellaneous'
    this.subcommandsOnly = false
  }

  async run(message, args) {
      let embed = new Discord.MessageEmbed()
      .setTitle('Jeth - ChangeLog • 1.0')
      .setDescription('Veja minha lista de modificações:')
      .setColor(colors.changelog)
      .setTimestamp()
      .setFooter(`Comando feito pelo usuario: ${message.author.username}`, message.guild.iconURL({ dynamic: true, size: 1024 }))
      .addFields(
        {
            name: '[+] Adicionado CHANGE-LOG (Comando)',
            value: `Adicionada para facilitar o meio dos usuarios saberem as alterações feitas, dentro de nossa bot.`,
            inline: true
        },
        
        {
            name: '[+] Adicionado Curiosidades (Comando)',
            value: `Adicionado para nossos usuarios que são curiosos ou estão no tédio, se você esta entre estas duas opções, este comando foi feito para você!`,
            inline: true
        },
    )
    message.channel.send(embed);
}
  }