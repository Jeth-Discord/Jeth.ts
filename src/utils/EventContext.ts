import { IllyaClient } from '../Client'

export class EventContext {
    public client: IllyaClient
    public name: string
    public constructor(client: IllyaClient, name: string) {
        this.client = client
        this.name = name
    }
}