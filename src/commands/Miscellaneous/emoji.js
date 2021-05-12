const { Command, colors } = require('../../utils')
const Discord = require("discord.js");

module.exports = class emoji extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['emojis']
        this.category = 'Miscellaneous'
    }
    async run(client, message, args) {
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
            return this.client.emojis.cache.get(id).toString()
        }
        this.message.guild.emojis.forEach(emoji => {
            OverallEmojis++;
            if (emoji.animated) {
                Animated++;
                EmojisAnimated += Emoji(emoji.id)
            } else {
                EmojiCount++;
                Emojis += Emoji(emoji.id)
            }
        })
        let Embed = new Discord.MessageEmbed()
            .setTitle(`Emojis em ${message.guild.name}.`)
            .setDescription(`**Animado [${Animated}]**:\n${EmojisAnimated}\n\nNormais [${EmojiCount}]**:\n${Emojis}\n\n**Total de emojis [${OverallEmojis}]**`)
            .setColor(colors.default)
        message.channel.send(Embed)
    }
}