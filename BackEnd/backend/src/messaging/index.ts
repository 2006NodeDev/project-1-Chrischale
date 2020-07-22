//setup pub sub topics
import {PubSub} from '@google-cloud/pubsub'

let pubsubClient = new PubSub()

export const userTopic = pubsubClient.topic('projects/tidy-simplicity-279818/topics/user-service')