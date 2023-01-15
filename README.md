<div id="top"></div>

<br />
<div align="center">
  <a href="https://github.com/TedwaSachin123/BlockVoice">
    <img src="./public/Block-removebg-preview.png" alt="Logo" >
  </a>

<h3 align="center">BlockVoice  — It is like a decentralized version of StackOverflow</h3>

</div>

## About The Project

https://user-images.githubusercontent.com/50701251/192131510-ab3ecafa-b2d9-40cf-836c-38fe13cb608e.mp4


BlockVoice is a question and answer website for professional and enthusiast programmers built on top of Polygon network and The Graph, that allows users to create questions, comment and answer them, without worrying about their privacy.

### Full Demo Video - https://drive.google.com/file/d/11DBZPi5paUr66YwUfDBKfugRfcTLvxgx/view?usp=sharing

### Built With

- Frontend framework: React.js
- Smart contracts: Solidity
- Ethereum web client library: Ethers.js
- File storage: IPFS
- Querying data: The Graph
- CSS Framework: Material-UI, Emotion
- Ethereum development environment: Hardhat
- Layer 2 blockchain: Polygon


<!-- GETTING STARTED -->

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/TedwaSachin123/BlockVoice
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```
3. Create an `.env` file and get an API key from infura, Web3 Storage. 
   ```sh
   PRIVATE_KEY="156a3ffca59392a7c7139d2a4576eb8b736b60a8a986a776b5f9f0970285a4f7"
   ```
4. Compile the smart contract
   ```sh
   npx hardhat compile
   ```
5. Deploy the smart contract
6. Get your contract address and paste in on `constants/index.ts`

7. Deploy subgraph in `indexer` directory by following steps in `indexer/README.md` (optional, since it is already deployed in hosted service)

8. Get subgraph query endpoint after deployment and update it in `constants/index.t`

9. Run the app

   ```sh
   npm start
   ```


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License

This project is an open source software licensed under the MIT License





