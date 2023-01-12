import React,{ useState, useEffect} from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./css/Main.css";
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";
//import { Connect } from '../../Connect';
import { createClient } from 'urql'
// import axios from "axios";

function Main() {
  // const [questions, setQuestions] = useState([]);
  // const state = useContext(Connect);
  const [post, setpost] = useState([]);

  useEffect(() => {
    getpost();
  },[]);

  const getpost = async()=>{
    const APIURL = 'https://api.thegraph.com/subgraphs/name/tedwasachin123/blockvoice'
    const tokensQuery = `
    query {
      posts(
      orderDirection: desc
      orderBy:createdAtTimestamp) {
        id
        title
        body
        createdAtTimestamp
        by
        tags
      }      
    }
  `  
    const client = createClient({
    url: APIURL,})
  
    const Post = await client.query(tokensQuery).toPromise()
  
    //const Post = await state.contract.fetchPosts()
    setpost(Post.data?.posts)
  }
  
  // console.log(questions);
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>

          {/* <a href="/add-question"> */}

          {/* </a> */}
        </div>
        <div className="main-desc">
          <p>
            {/* {questions.length}  */}
          All questions stat</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                {/* <a href="/">Newest</a> */}
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>

                {/* <a href="/">Active</a> */}
              </div>
              <div className="main-tab">
                {/* <a href="/">More</a> */}
                <Link to="/">More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          {/* {questions?.map((_q) => ( */}
            <div className="question">
              {/* <AllQuestions data={_q} /> */}
              {post.map((cvalue)=>{
                return <AllQuestions cvalue={cvalue} />})}
              
            </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}

export default Main;
