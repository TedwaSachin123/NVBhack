import { ipfs,json } from "@graphprotocol/graph-ts"
import {
  PostAnswer,
  PostComment,
  PostCreated
} from "../generated/Token/Token"
import { Post,Answer,Comment } from "../generated/schema"

export function handlePostCreated(event: PostCreated): void {
  let post = new Post(event.params.id.toString());

  post.hash = event.params.hash;
  post.by = event.transaction.from.toHex();
  let metadata =  ipfs.cat(event.params.hash);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const body = value.get("body");
        if (body) {
          post.body = body.toString();
        }
        const title = value.get("title");
        if (title) {
          post.title = title.toString();
        }
        const tag = value.get("tag");
        if (tag) {
          let tagArray = tag.toArray()
          post.tags = new Array<string>()
          for(let i = 0; i < tagArray.length; i++){
              let arr = post.tags
              arr.push(tagArray[i].toString())
              post.tags = arr
            }
          }
        
      }
    }
  post.createdAtTimestamp = event.block.timestamp;
  
  post.save()
}

export function handlePostComment(event: PostComment): void {
  let post = Post.load(event.params.id.toString());
  if(post){
  let comment = new Comment(event.transaction.hash.toHexString());
  comment.Postid = event.params.id;
  let metadata =  ipfs.cat(event.params.hash);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const commt = value.get("comment");
        if (commt) {
          comment.comment = commt.toString();
        }}}
  
  comment.by = event.transaction.from.toHex();
  comment.createdAtTimestamp = event.block.timestamp;
  comment.save()
  
}}


export function handlePostAnswer(event: PostAnswer): void {
  let answer = new Answer(event.transaction.hash.toHexString());
  answer.Postid = event.params.id;
  let metadata =  ipfs.cat(event.params.hash);
    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const ans = value.get("answer");
        if (ans) {
          answer.answer = ans.toString();
        }}}
  
  answer.by = event.transaction.from.toHex();
  answer.createdAtTimestamp = event.block.timestamp;
  answer.save()
}
