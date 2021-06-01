import { Client, Shard } from 'eris'
import { readdir } from 'fs'

export class IllyaClient extends Client {
  aliases: any
  commands: any
  shardUptime: any
  public constructor(token: string, options: object) {
    super(token, options)

    this.aliases = new Map()
    this.commands = new Map()
    this.shardUptime = new Map()
  }

  public connect() {
    this.shards.forEach((shard: Shard) => {
      this.shardUptime.set(shard.id, {
        shardID: shard.id,
        uptime: 0
      })
    })
    return super.connect()
  }

  public loadCommands(path: string) {
    readdir(`${__dirname}/${path}`, (err, f) => {
      if (err) return console.error(err)
      for (let category of f) {
        readdir(`./${path}/${category}`, (err, cmd) => {
          if (err) return console.error(err)

          for (let command of cmd) {
            const Commands = require(`${__dirname}/${path}/${category}/${command}`)
            const commands = new Commands(this)
            this.commands.set(commands.config.name, commands)
            commands.config.aliases.forEach((alias: any) => {
              return this.aliases.set(alias, commands.config.name)
            })
          }
        })
      }
    })
  }

  public loadEvents(path: string) {
    readdir(`${__dirname}/${path}`, (err, f) => {
      if (err) return console.error(err)

      f.forEach((files) => {
        const Events = require(`${__dirname}/${path}/${files}`)
        const events = new Events(this)
        super.on(events.name, (...args) => events.run(...args))
      })
    })
  }
}