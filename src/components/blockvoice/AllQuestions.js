import { Avatar } from "@material-ui/core";
import React from "react";
import "./css/AllQuestions.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
//import { stringAvatar } from "../../utils/Avatar";
//import { Connect } from '../../Connect';
//import ipfs from '../../utils/ipfs';



function AllQuestions({cvalue}) {


  //   async function getData() {
  //     let asyncitr = ipfs.cat(cvalue.content)  
  //     for await (const itr of asyncitr) {  
  //         let data = Buffer.from(itr).toString()          
  //         const content = JSON.parse(data)          
  //         setbody(content)
  //     }
  // }

  // console.log(typeof (body.tag))
  // post.map((cvalue)=>{

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="all-questions"> 
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>{Math.floor(Math.random() * 10) + 1}</p>
              <span>votes</span>
            </div>
            <div className="all-option">
            <p>{Math.floor(Math.random() * 10) + 1}</p>
              {/* <p>{data?.answerDetails?.length}</p> */}
              <span>Answers</span>
            </div>
            <div className="all-option">
              <small>{Math.floor(Math.random() * 10) + 1} views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
        <Link to={"/question/"+cvalue.id+"/"+cvalue.title}>{cvalue.title}</Link>
          {/* <Link to="/question">{cvalue.title}</Link> */}
          {/* <Link to={`/question?q=${data?._id}`}>{data.title}</Link> */}

          {/* <a href=>{data.title}</a> */}

          <div
            style={{
              maxWidth: "90%",
            }}
          > 
          <div>{ReactHtmlParser(truncate(cvalue.body, 200))}</div>
            {/* <div>{ReactHtmlParser(truncate(data.body, 200))}</div> */}
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {cvalue.tags.map((_tag) => {
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
            <small>{new Date((cvalue?.createdAtTimestamp)*1000).toLocaleString()}</small>
            <div className="auth-details">
              <Avatar />
              <p>{truncate(cvalue.by,10)}
                {/* {data?.user?.displayName
                  ? data?.user?.displayName
                  : "Natalie lee"} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // })
}

export default AllQuestions;
