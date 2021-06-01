import { IllyaClient } from '../Client'
import { EventContext } from '../utils'

module.exports = class ShardReadyListener extends EventContext {
  public constructor(client: IllyaClient) {
    super(client, 'shardReady')
  }

  run(id: number) {

    this.client.shardUptime.set(id, {
      shardID: id,
      uptime: Date.now()
    })
  }
}