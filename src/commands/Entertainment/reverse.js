const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class reverse extends Command {
  constructor(name, client) {
    super(name, client)

    this.aliases = []
    this.category = 'Entertainment'
  }
  async run(message, args) {
    let reason = args.slice(0).join(' ');

    if (reason.length < 1) return message.channel.createMessage('**' + `${message.author.username}#${message.author.discriminator}` + "** :xShiininha: Diga uma **mensagem**!");

    message.channel.createMessageMessage(`:pencil: Reverse by: **${message.author.username}** \n \n **` + args.join(' ').split('').reverse().join('') + '**');

  }
}