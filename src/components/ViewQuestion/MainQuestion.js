import { Avatar } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import HistoryIcon from "@material-ui/icons/History";
import ReactQuill from "react-quill";
import { Connect } from '../../Connect';
//import Editor from "react-quill/lib/toolbar";
//import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Link, withRouter } from "react-router-dom";
import "./index.css";
//import { useSelector } from "react-redux";
//import { stringAvatar } from "../../utils/Avatar";
import { createClient } from 'urql'
//const axios = require('axios')
const { create } = require('ipfs-http-client')



function MainQuestion(props) {

   const {account,provider,contract,connectWallet} = useContext(Connect);
  const [Data, setData] = useState([]);

  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  // // const [comments, setComments] = useState([]);
  // const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    hashtopost();
    
  },[]);

  const createPostComment = async () => {
    /* saves post to ipfs then anchors to smart contract */
    if(!account) {
      connectWallet();
      
    } else{
    const hash = await saveComToIpfs()
    await IpfscomtoSC(hash)
    //history.push(`/`)
    }
  };

  
  

  const saveComToIpfs = async () => {
    if (!comment) return;
    /* first, upload to IPFS */
    try {
      const data = JSON.stringify({
        comment 
      });

      const ipfs = create('https://api.thegraph.com/ipfs/api/v0')
      const added = await ipfs.add(data)
      await ipfs.pin.add(added.path)
      return added.path
      
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const IpfscomtoSC = async (hash) => {
    /* anchor post to smart contract */
    //if (typeof window.ethereum !== 'undefined') {

      try {
      const val = await contract.addcomment(props.match.params.id,hash)
      /* wait for transaction to be confirmed before rerouting */
      await provider.waitForTransaction(val.hash)
      Data.comments.push({
        "createdAtTimestamp": Math.floor(Date.now() / 1000),
        "by": account,
        "comment": comment
      })
      setComment("")
      setShow(false)
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  const createPostAnswer = async () => {
    /* saves post to ipfs then anchors to smart contract */
    if(!account) {
      connectWallet();
      
    }else{
    const hash = await saveAnsToIpfs()
    await IpfstoSC(hash)
    //history.push(`/`)
  }
  };

  const saveAnsToIpfs = async () => {
    if (!answer) return;
    /* first, upload to IPFS */
    try {
      const data = JSON.stringify({
        answer 
      });

      const ipfs = create('https://api.thegraph.com/ipfs/api/v0')
      const added = await ipfs.add(data)
      await ipfs.pin.add(added.path)
      return added.path
      
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const IpfstoSC = async (hash) => {

      try {

      const val = await contract.addanswer(props.match.params.id,hash)
      /* wait for transaction to be confirmed before rerouting */
      await provider.waitForTransaction(val.hash)
      Data.answers.push({
        "createdAtTimestamp": Math.floor(Date.now() / 1000),
        "by": account,
        "answer": answer
      })
      setAnswer("")
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

    async function hashtopost() {
      // try{
      const getData = props.match.params.id
      const APIURL = 'https://api.thegraph.com/subgraphs/name/tedwasachin123/blockvoice'
      const tokensQuery = `
      query {
        posts(where:{id:${getData}} ) {
          id
          title
          body
          hash
          createdAtTimestamp
          by
          tags
        }
        comments(where:{Postid:${getData}} 
        orderDirection: asc
        orderBy:createdAtTimestamp){
      
          createdAtTimestamp
          by
          comment
        }
        answers(where:{Postid:${getData}}
        orderDirection: asc
        orderBy:createdAtTimestamp){
      
          createdAtTimestamp
          by
          answer
        }
        
      }
    `
      const client = createClient({
        url: APIURL,
      })
      const data = await client.query(tokensQuery).toPromise()
      setData(data.data)
      
      // } catch (err) {
      //   console.log('error: ', err)
      // }
    
  }


  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">
            {Data.posts?.[0]?.title}
            </h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
          
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              <span>
              {new Date((Data.posts?.[0]?.createdAtTimestamp)*1000).toLocaleString()}
                </span>
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed<span>{Math.floor(Math.random() * 10) + 1}</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>

                <p className="arrow">{Math.floor(Math.random() * 5) + 1}</p>

                <p className="arrow">▼</p>

                <BookmarkIcon />

                <HistoryIcon />
              </div>
            </div>
            <div className="question-answer">
              
                {ReactHtmlParser(Data.posts?.[0]?.body)}
                <div
            style={{
              display: "flex",
            }}
          >
            {Data.posts?.[0]?.tags?.map((_tag) => {
              return ( 
              <p
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
              )
              })}
          </div>
              <div className="author">
                <small>
                  asked {new Date((Data.posts?.[0]?.createdAtTimestamp)*1000).toLocaleString()}                  
                </small>
                <div className="auth-details">
                  <Avatar 
                  // {...stringAvatar(questionData?.user?.displayName)} 
                  />
                  <p>
                    {/* {questionData?.user?.displayName
                      ? questionData?.user?.displayName
                      : "Natalia lee"} */}
                      {truncate(Data.posts?.[0]?.by,10)}
                  </p>
                </div>
              </div>
              
              <div className="comments">
                <div className="comment">
                  {Data.comments?.map((_qc,i) => (
                      <p key={i}>
                        
                        {(_qc.comment)}{" "}
                        <span>
                          - {_qc.by ? truncate(_qc.by,10) : "Nate Eldredge"}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date((_qc?.createdAtTimestamp)*1000).toLocaleString()}
                        </small>
                      </p>
                    ))}
                    
                </div>
                <p 
                onClick={() => setShow(!show)}
                >Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={createPostComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
          className="all-questions"
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {Data.answers?.length} 
            No. of Answers
          </p>
          {Data.answers?.map((_q,i) => (
            <> 
              <div
                style={{
                  borderBottom: "1px solid #eee",
                }}
                key={i}
                className="all-questions-container"
              >
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">{Math.floor(Math.random() * 5) + 1}</p>

                    <p className="arrow">▼</p>

                    <BookmarkIcon />

                    <HistoryIcon />
                  </div>
                </div>
                <div className="question-answer">
                  <p>{ReactHtmlParser(_q?.answer)}</p>
                  {/* {ReactHtmlParser(_q.answer)} */}
                  <div className="author">
                    <small>
                      asked {new Date((_q?.createdAtTimestamp)*1000).toLocaleString()}
                    </small>
                    <div className="auth-details">
                      <Avatar
                      // {...stringAvatar(_q?.user?.displayName)} 
                      />
                      <p>
                        {/* {_q?.user?.displayName
                          ? _q?.user?.displayName
                          : "Natalia lee"} */} {truncate(_q?.by,10)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </> 
          ))} 
        </div>
        
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          // modules={Editor.modules}
          className="react-quill"
          theme="snow"
          style={{
            height: "200px",
          }}
        />
      </div>
      <button
        onClick={createPostAnswer}
        style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default  withRouter(MainQuestion);
