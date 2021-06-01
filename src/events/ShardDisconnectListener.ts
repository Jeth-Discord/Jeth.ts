import { IllyaClient } from '../Client'
import { EventContext } from '../utils'

module.exports = class ShardDisconnectListener extends EventContext {
  public constructor(client: IllyaClient) {
    super(client, 'shardDisconnect')
  }

  run(err: Error, id: number) {

    this.client.shardUptime.set(id, {
      shardID: id,
      uptime: 0
    })
  }
}