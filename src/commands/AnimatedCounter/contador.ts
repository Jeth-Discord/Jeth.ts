import { IllyaClient } from '../../Client';
import { Colors, CommandContext, EmbedBuilder, CounterUtils } from '../../utils';
import { Message } from 'eris';

module.exports = class EvalCommand extends CommandContext {
  client: IllyaClient
  public constructor(client: IllyaClient) {
    super(client, {
      name: 'contador',
      category: '',
      dev: true
    })
  }

  async run(message: Message, args: string[]) {
    const embedA = new EmbedBuilder()
    embedA.setTimestamp()
    embedA.setColor(Colors.mod)
    embedA.addField('**Err:**', message.author.mention, true)
    embedA.setDescription('Missing Permissions') // inline false
    embedA.addField('*Verifique se você possui a permissão:*', '`manageGuild`', true)
    embedA.setFooter('🧁・Discord da Jeth', message.author.avatarURL)
    if (!message.member.permissions.has('manageGuild')) return message.channel.createMessage(embedA.build())
    let guildDocument = await this.client.database.Guilds.findById(message.member.guild.id)
    if (args[0] === 'canal') {
      let channel = message.member.guild.channels.find(c => c.name === args.slice(1).join(' ')) || message.member.guild.channels.get(args[1]?.replace(/[<#>]/g, ''))
      if (!channel || channel.type === 4) return message.channel.createMessage('Coloque um canal válido!')

      guildDocument.countChannel = channel.id
      guildDocument.save().then(async () => {
        await message.channel.createMessage(`Canal definido: ${channel}`)
      })
    } else if (args[0] === 'mensagem') {
      let mensagem = args.slice(1).join(' ')

      if (!mensagem) {
        return message.channel.createMessage(`Coloque qual será a mensagem do contador, lembre-se "{cor - tipo}" será o tipo/cor do contador...`)
      }

      // agora é preciso separar estes includes, código por código, pois todos juntos não é aceito e da erro, burlando todo o sistema.
      if (mensagem.includes('{pinky}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{green}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{gold}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{amarelo}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{redblue}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{natal}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{bouncepink}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{roxo}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }
      if (mensagem.includes('{rainbow}') && !guildDocument.partner) {
        return message.channel.createMessage('<a:warnRoxo:664240941175144489> Este tipo de contador é apenas para servidores premium!')
      }

      guildDocument.countMessage = mensagem
      guildDocument.count = true
      guildDocument.save()
      let defaultChannel = await message.member.guild.channels.get(guildDocument.countChannel)
      if (!defaultChannel) return message.channel.createMessage(`Este servidor não possui um canal definido no contador...\nUse: \`${message.prefix}contador canal #canal\` para definir um e use o comando novamente!`)
      setTimeout(async () => {
        //ja volto ai  
        // await message.channel.createMessage(`Mensagem definida como \`${guildDocument.countMessage}\`\nContador ativado...`)
        // defaultChannel.edit
          (guildDocument.countMessage.replace('{azul}', CounterUtils.azul(message.member.guild.memberCount))
            .replace('{pinky}', CounterUtils.pinky(message.member.guild.memberCount))
            .replace('{gold}', CounterUtils.gold(message.member.guild.memberCount))
            .replace('{green}', CounterUtils.green(message.member.guild.memberCount))
            .replace('{rosa}', CounterUtils.rosa(message.member.guild.memberCount))
            .replace('{red}', CounterUtils.red(message.member.guild.memberCount))
            .replace('{ruby}', CounterUtils.ruby(message.member.guild.memberCount))
            .replace('{amarelo}', CounterUtils.amarelo(message.member.guild.memberCount))
            .replace('{violeta}', CounterUtils.violeta(message.member.guild.memberCount))
            .replace('{natal}', CounterUtils.natal(message.member.guild.memberCount))
            .replace('{redblue}', CounterUtils.redblue(message.member.guild.memberCount))
            .replace('{redblack}', CounterUtils.redblack(message.member.guild.memberCount))
            .replace('{aqua}', CounterUtils.aqua(message.member.guild.memberCount))
            .replace('{ice}', CounterUtils.ice(message.member.guild.memberCount))
            .replace('{roxo}', CounterUtils.roxo(message.member.guild.memberCount))
            .replace('{rainbow}', CounterUtils.rainbow(message.member.guild.memberCount))
            .replace('{blk}', CounterUtils.blk(message.member.guild.memberCount))
            .replace('{bouncepink}', CounterUtils.bouncepink(message.member.guild.memberCount)))
      }, 5000)
    } else if (args[0] === 'remover') {
      if (!guildDocument.count) return message.channel.createMessage(`Este servidor não possui um contador ativado!`)
      let lastChannel = message.member.guild.channels.get(guildDocument.countChannel)
      guildDocument.count = false
      guildDocument.countChannel = ''
      guildDocument.countMessage = ''

      guildDocument.save().then(async () => {
        // await lastChannel.edit
        await message.channel.createMessage(`O contador foi removido do canal ${lastChannel} e desativado`)
      })
    } else {
      let embed = new EmbedBuilder()
      embed.setAuthor(`${this.client.user.username}#${this.client.user.discriminator}`, this.client.user.avatarURL)
      embed.setDescription(`**Seja bem vindo(a) ao painel de configuração !**`)
      embed.setColor(colors.default)
      embed.setThumbnail('https://cdn.discordapp.com/emojis/742240408658247791.png')
      embed.addField('**COMANDOS:**', [
        `\`${guildDocument.prefix}contador canal #canal\` - Define o canal onde o contador será definido.`,
        `\`${guildDocument.prefix}contador mensagem <mensagem>\` - Define a mensagem que será exibida no contador.`,
        `\`${guildDocument.prefix}contador remover\` - Caso haja algum contador ligado/definido, ele será removido e o sistema desligado.`,
        `\n**Clique na reação abaixo para ver os \`Placeholders\` digite-os corretamente!**`].join('\n'), false)

      let embed2 = new EmbedBuilder()
      embed2.setAuthor(`${this.client.user.username}#${this.client.user.discriminator}`, this.client.user.avatarURL)
      embed2.setThumbnail('https://cdn.discordapp.com/emojis/742240408658247791.png')
      embed2.setDescription(`**Seja bem vindo(a) ao painel de configuração !**\n**Estilos de contador:**`)
      embed2.addField('**CONTADORES**', '**GERAIS** <:supporter:667149933480247297>', false)
      embed2.addField('**{azul}**', '<a:set1:664306595391602698>', true)
      embed2.addField('**{aqua}**', '<a:fil2:735932752171630663>', true)
      embed2.addField('**{violeta}**', '<a:t3:683857609023160322>', true)
      embed2.addField('**{rosa}**', '<a:j_4:675774964997029918>', true)
      embed2.addField('**{ruby}**', '<a:k5:683064092793110558>', true)
      embed2.addField('**{red}**', '<a:S6:682727136519258124>', true)
      embed2.addField('**{redblack}**', '<a:lo7:735367392703807560>', true)
      embed2.addField('**{ice}**', '<a:8ice:737078967244423189>', true)
      embed2.addField('**{blk}**', '<a:BLK9:770793783583309866>', true)
      embed2.addField('**CONTADORES**', '**PARTNER** <:PartnerT:664588135119847431>', false)
      embed2.addField('**{rainbow}**', '<a:rb_1:742627650803335209>', true)
      embed2.addField('**{roxo}**', '<a:JT2:739977300921024522>', true)
      embed2.addField('**{amarelo}**', '<a:j3:683858525641900103>', true)
      embed2.addField('**{pinky}**', '<a:purple4:669217839030468608>', true)
      embed2.addField('**{bouncepink}**', '<a:el5:735367916320587925>', true)
      embed2.addField('**{redblue}**', '<a:dr6:684473203191578664>', true)
      embed2.addField('**{green}**', '<a:g7:683859048638185487>', true)
      embed2.addField('**{gold}**', '<a:gold8:669218300655435776>', true)
      embed2.addField('**{natal}**', '<a:v9:684833174983147520>', true)
      embed2.setColor(colors.default)
      let canalContador = `<a:warnRoxo:664240941175144489> Desativado`;
      if (guildDocument.countChannel.length) {
        canalContador = `<:JethVerificado:666762183249494027> Ativo | Canal: <#${guildDocument.countChannel}>`;
      }
      embed2.addField("<:ligado:665056984021729320> | Canal do Contador:", canalContador);
      let MsgCount = `<:rejected:739831089543118890> Desativado`;
      if (guildDocument.countMessage.length) {
        MsgCount = `<:concludo:739830713792331817> Ativo | Mensagem: ${guildDocument.countMessage.length > 800 ? `${guildDocument.countMessage.slice(0, 801)}[...]` : guildDocument.countMessage}`;
      }
      embed2.addField("<:ligado:665056984021729320> | Mensagem do Contador:", MsgCount);
      let msgWelcome = guildDocument.count ?
        `<:concludo:739830713792331817> Ativo` :
        `<:rejected:739831089543118890> Desativado`
      embed2.addField("Contador está:", msgWelcome)

      let embedCount = 1

      message.channel.createMessage({ embed }).then(async m => {
        await m.react('666762183249494027')// ir para frente
        let col = m.createReactionCollector((e, u) => (u.id == message.author.id) &&
          (e.emoji.id == '666762183249494027' /* para frente */ || e.emoji.id == '665721366514892839') /* para trás */,
          { time: 180000, errors: ['time'] })
        let reacoes = col.on('collect', async (e, u) => {
          if (embedCount != 2 && e.emoji.id == '666762183249494027') { // ir para frente

            await m.react('665721366514892839')
            e.users.cache.map(u => e.remove(u.id))
            m.edit(embed2)
            embedCount = 2
            await m.react('665721366514892839')// volta para trás
          } else if (e.emoji.id == '665721366514892839' && embedCount == 2) {

            await m.react('666762183249494027')
            e.users.cache.map(u => e.remove(u.id))

            m.edit(embed)
            embedCount = 1
          }
        })
      })
    }
  }
}
