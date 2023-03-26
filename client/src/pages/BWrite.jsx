import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
// import {ethers} from 'ethers'
import {ethers} from "ethers"
import {NFTStorage} from 'nft.storage'


const BWrite = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [metaDataURL, setMetaDataURL] = useState()
  const [account, setAccount] = useState(null)
  const [uploadFile, setUploadFile] = useState()


  let contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_url",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tags",
          "type": "string"
        }
      ],
      "name": "createBlog",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_url",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tags",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_blogCounter",
          "type": "uint256"
        }
      ],
      "name": "deleteBlog",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_url",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tags",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_blogCounter",
          "type": "uint256"
        }
      ],
      "name": "updateBlog",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "availableBlogs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "blogId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "blogUrl",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "blogOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tags",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "blogCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  // let contractAddress= '0x8E44a3f0A34a588b7c8Dfd21DfBB4A617a4C396C'  //Polygon
  let contractAddress= '0x055B6FF659Ea52f5d99fcc7A9827d7f2DCC39372'   //FVM
  console.log(value);

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  //connect metamask wallet if not connected 
  const connectWallet = async() =>{
    window.ethereum.request( {method: "eth_requestAccounts"})
    .then((accounts) => {
      setAccount(accounts[0]);
    }).catch( (e) => {
      alert(e)
    })
}

const handleFileUpload= async(event) =>{
  event.preventDefault()
  setUploadFile(event.target.files[0])
}

const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const submitProjectFun = async() => {

    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    
 
     let p = await uploadDetailsToIPFS();
     console.log("Done with uploads")
    // const submitProjectTx = await contractInstance.submitProject(metaDataURL, String(ProjectDate))
    // console.log()
    const submitProjectTx = await contractInstance.createBlog(p, cat)
    
    console.log("here");
 
    await submitProjectTx.wait();
    window.alert("Project submitted successfully!");
  };

  const uploadDetailsToIPFS = async (inputFile) => {
    // uploadFile should be passed here.
    const nftStorage = new NFTStorage({ token: API_KEY });

    try {
      const metaData = await nftStorage.store({
        name: title,
        description: value,
        tag: cat, // In unix
        image: uploadFile, // Banner image for the Project
      });

      // setMetaDataURl(getIPFSGatewayURL(metaData.url));
      // MetaDataURL = metaData.url;

      setMetaDataURL(metaData.url)
      console.log(metaData.url);
      console.log(metaData);
      console.log("Inside the upload IPFS")
      return metaData.url;
    } catch (error) {
      alert(error);
    }
  };

  const getData = async() => {
    const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

    let blogCount = await contractInstance.blogCounter() 
    console.log(blogCount.toString());
    for(let i = 0; i <= blogCount.toString(); i ++){

      let data = await contractInstance.availableBlogs(i)
      console.log(data[1]) 
    }
  }

  
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            {/* <b>Status: </b> Draft */}
          </span>
          <span>
            <b>Blog in Decentralized manner</b> 
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* <label className="file" htmlFor="file">
            Upload Image
          </label> */}
          <input className='fileUpload' type="file" id='chooseFile' onChange={handleFileUpload}/>
          <div className="buttons">
            {/* <button>Save as a draft</button> */}
            <button onClick={connectWallet}>Connect Metamask</button>
            {/* <button onClick={handleClick}>Publish</button> */}
            <button onClick={submitProjectFun}>Submit Blog</button>
            {/* <button onClick={getData}>Get Data</button> */}
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BWrite;