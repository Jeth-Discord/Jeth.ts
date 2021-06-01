const { Command, colors } = require('../../utils')
const Discord = require('discord.js')

module.exports = class serverinfo extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['sugestão']
        this.category = 'Miscellaneous'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        const embedA = new Discord.MessageEmbed()

            .setTimestamp()
            .setColor(colors.mod)
            .setTitle('**Err:**', `${message.author}`, true)
            .setDescription('Missing Permissions') // inline false
            .addField('*Verifique se você possui a permissão:*', '`MANAGE_GUILD`', true)
            .setFooter('🧁・Discord da Jeth', message.author.avatarURL)
        if (!message.member.hasPermission('MANAGE_GUILD'))
            return message.channel.createMessage(embedA)
        let guildDocument = await this.client.database.Guilds.findById(message.member.guild.id)
        let documento = await this.client.database.Guilds.findById(message.member.guild.id)
        let prefix = documento.prefix
        const mododeuso = new Discord.MessageEmbed()

            .setTimestamp()
            .setColor(colors.default)
            .setTitle('**PAINEL DE AJUDA**')
            .setThumbnail(message.author.avatarURL)
            .setDescription(`Para definir o canal de sugestão basta utilizar o comando\n **${prefix}suggestion canal <#canal>** \n\nAssim que o canal for definido, qualquer mensagem enviada nele, receberá a reação dos emojis Sim, não ou não especificado.\nCaso queira desativar o canal de sugestões basta utilizar \n**${prefix}suggestion remover**`) // inline false
            .setFooter('🧁・Discord da Jeth', message.author.avatarURL)
        if (!args[0]) message.channel.createMessage(mododeuso)
        if (args[0] === 'canal') {
            let channel = message.member.guild.channels.find(c => c.name === args.slice(1).join(' ')) || message.member.guild.channels.get(args[1]) || message.mentions.channels.first()
            if (!channel || channel.type === 'category') return message.channel.createMessage('Coloque um canal válido!')

            guildDocument.sugesChannel = channel.id
            guildDocument.sugesModule = true
            guildDocument.save().then(async () => {
                await message.channel.createMessage(`Canal definido: ${channel}\n<:b_verified:742270909225893989> O Canal de sugestões foi definido e está ativo!`)
            })
        }
        else if (args[0] === 'remover') {
            guildDocument.sugesChannel = ''
            guildDocument.sugesModule = false
            guildDocument.save().then(async () => {
                await message.channel.createMessage(`<a:warnRoxo:664240941175144489> O canal de sugestões foi desativado`)
            })
        }
    }
}
exports.help = {
    name: "serverinfo"
}