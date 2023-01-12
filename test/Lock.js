const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Blog", async function () {
  it("Should create a post", async function () {
    const Blog = await ethers.getContractFactory("Blog")
    const blog = await Blog.deploy()
    await blog.deployed()
    await blog.createPost("My first post", "12345")

    const posts = await blog.fetchPosts()
    expect(posts[0].title).to.equal("My first post")
  })

  it("Should edit a post", async function () {
    const Blog = await ethers.getContractFactory("Blog")
    const blog = await Blog.deploy()
    await blog.deployed()
    await blog.createPost("My Second post", "12345")

    await blog.updatePost(1, "My updated post", "23456")

    posts = await blog.fetchPosts()
    expect(posts[0].title).to.equal("My updated post")
  })

})
