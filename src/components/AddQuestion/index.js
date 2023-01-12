import React, {  useState, useContext } from "react";
//import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./index.css";
import Editor from "react-quill/lib/toolbar";
import Sidebar from "../blockvoice/Sidebar"
import { TagsInput } from "react-tag-input-component";
import { useHistory } from "react-router-dom";
import { Connect } from '../../Connect';
const { create } = require('ipfs-http-client')

function Index() {
  // const user = useSelector(selectUser);
  // var toolbarOptions = [
  //   ["bold", "italic", "underline", "strike"], // toggled buttons
  //   ["blockquote", "code-block"],

  //   [{ header: 1 }, { header: 2 }], // custom button values
  //   [{ list: "ordered" }, { list: "bullet" }],
  //   [{ script: "sub" }, { script: "super" }], // superscript/subscript
  //   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  //   [{ direction: "rtl" }], // text direction

  //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

  //   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  //   [{ font: [] }],
  //   [{ align: [] }],

  //   ["clean"], // remove formatting button
  // ];
  // Editor.modules = {
  //   syntax: false,
  //   toolbar: toolbarOptions,
  //   clipboard: {
  //     // toggle to add extra line breaks when pasting HTML:
  //     matchVisual: false,
  //   },
  // };
  // /*
  //  * Quill editor formats
  //  * See https://quilljs.com/docs/formats/
  //  */
  // Editor.formats = [
  //   "header",
  //   "font",
  //   "size",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "video",
  // ];

  // /*
  //  * PropType validation
  //  */
  const state = useContext(Connect);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const history = useHistory();


  const handleQuill = (value) => {
    setBody(value);
  };

  const createNewPost = async () => {
    /* saves post to ipfs then anchors to smart contract */
    if(!state.account) {
      state.connectWallet();
      
     } else{
    const hash = await savePostToIpfs()
    await savePost(hash)

  }};

  const savePostToIpfs = async () => {
    if (!title || !body || !tag ) return;
    /* first, upload to IPFS */
    
    /* save post metadata to ipfs */
    try {
      const data = JSON.stringify({
        title,
        body,
        tag,
      });
      //const ipfs = ipfsClient()
      const ipfs = create('https://api.thegraph.com/ipfs/api/v0')
      const added = await ipfs.add(data)
      await ipfs.pin.add(added.path)
      return added.path
      
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const savePost = async (hash) => {


      try {
      //console.log(state)
      const val = await state.contract.createPost(hash)
      /* optional - wait for transaction to be confirmed before rerouting */
      await state.provider.waitForTransaction(val.hash)
      history.push("/");
    } catch (err) {
      console.log('Error: ', err)
    }
  }


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // if (title !== "" && body !== "") {
  //   //   const bodyJSON = {
  //   //     title: title,
  //   //     body: body,
  //   //     tag: JSON.stringify(tag),
  //   //     user: user,
  //   //   };
  //   //   await axios
  //   //     .post("/api/question", bodyJSON)
  //   //     .then((res) => {
  //   //       // console.log(res.data);
  //   //       alert("Question added successfully");
  //   //       history.push("/");
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err);
  //   //     });
  //   // }
  // };
  return (
    <div className="stack-index">
    <div className="stack-index-content">
    <Sidebar />
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  modules={Editor.modules}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>

                <TagsInput
                  value={tag}
                  onChange={setTag}
                  name="fruits"
                  placeHolder="press enter to add new tag"
                />

              </div>
            </div>
          </div>
        </div>

        <button
          onClick={createNewPost}
          className="button">
          Add your question
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Index;
