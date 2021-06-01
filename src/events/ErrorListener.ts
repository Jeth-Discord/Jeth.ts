import { IllyaClient } from '../Client'
import { EventContext } from '../utils'

module.exports = class ErrorListener extends EventContext {
  public constructor(client: IllyaClient) {
    super(client, 'error')
  }

  run(err: Error) {
    console.log(err.stack)
  }
}