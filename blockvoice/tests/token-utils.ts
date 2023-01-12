import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { PostAnswer, PostComment, PostCreated } from "../generated/Token/Token"

export function createPostAnswerEvent(id: BigInt, hash: string): PostAnswer {
  let postAnswerEvent = changetype<PostAnswer>(newMockEvent())

  postAnswerEvent.parameters = new Array()

  postAnswerEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  postAnswerEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )

  return postAnswerEvent
}

export function createPostCommentEvent(id: BigInt, hash: string): PostComment {
  let postCommentEvent = changetype<PostComment>(newMockEvent())

  postCommentEvent.parameters = new Array()

  postCommentEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  postCommentEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )

  return postCommentEvent
}

export function createPostCreatedEvent(id: BigInt, hash: string): PostCreated {
  let postCreatedEvent = changetype<PostCreated>(newMockEvent())

  postCreatedEvent.parameters = new Array()

  postCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )

  return postCreatedEvent
}
