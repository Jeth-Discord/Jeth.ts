import { IllyaClient } from '../Client'

export interface CommandInterface {
  name: string
  aliases?: string[]
  category: string
  UserPerms?: string[]
  ClientPerms?: string[]
  dev?: boolean
}

export class CommandContext {
  public client: IllyaClient
  public config: object
  public constructor(client: IllyaClient, options: CommandInterface) {
    this.client = client
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      category: options.category,
      UserPerms: options.UserPerms || null,
      ClientPerms: options.ClientPerms || null,
      dev: options.dev || false
    }
  }
}