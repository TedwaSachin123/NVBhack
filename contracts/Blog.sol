// contracts/Blog.sol
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Blog {
    
    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
      uint id;
      string content;
      string[] comments;
      string[] answers;
    }

    /* mappings can be seen as hash tables */
    /* here we create lookups for posts by id and posts by ipfs hash */
    mapping(uint => Post) private idToPost;
    mapping(string => Post) private hashToPost;

    /* events facilitate communication between smart contractsand their user interfaces  */
    /* i.e. we can create listeners for events in the client and also use them in The Graph  */
    event PostCreated(uint id, string hash);
    event PostComment(uint id,string hash);
    event PostAnswer(uint id,string hash);
    

    /* fetches an individual post by the content hash */
    // function fetchPost(uint id) public view returns(Post memory){
    //     return idToPost[id];
    // }

    /* creates a new post */
    function createPost(string memory hash) public  {
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.content = hash;
        hashToPost[hash] = post;
        emit PostCreated(postId, hash);
    }

    /* add an comment post */
    function addcomment(uint _postId, string memory _comment) public  {
        Post storage post =  idToPost[_postId];
        post.comments.push(_comment);
        emit PostComment(_postId,_comment);

    }
    // /* add an answer post */
        function addanswer(uint _postId, string memory _answer) public  {
        Post storage post =  idToPost[_postId];
        post.answers.push(_answer);
        emit PostAnswer(_postId,_answer);
    }
}

    /* fetches all posts */
    // function fetchPosts() public view returns (Post[] memory) {
    //     uint itemCount = _postIds.current();

    //     Post[] memory posts = new Post[](itemCount);
    //     for (uint i = 0; i < itemCount; i++) {
    //         uint currentId = i + 1;
    //         Post storage currentItem = idToPost[currentId];
    //         posts[i] = currentItem;
    //     }
    //     return posts;
    // }

    /* this modifier means only the contract owner can */
    /* invoke the function */
    // modifier onlyOwner() {
    //     require(msg.sender == owner);
    // _;
    // }