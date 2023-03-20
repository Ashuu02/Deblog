import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Deblogs = () => {
  const [posts, setPosts] = useState([]);
  

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


  let contractAddress= '0x8E44a3f0A34a588b7c8Dfd21DfBB4A617a4C396C'

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const getData = async() => {
    const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

    let blogCount = await contractInstance.blogCounter() 
    console.log(blogCount.toString());
    for(let i = 0; i <= blogCount.toString(); i ++){

      let data = await contractInstance.availableBlogs(i)
      console.log(data[1]) 
    }
  }

  useEffect(() => {
    getData();
  },[])
  

  const cat = useLocation().search;

  console.log(cat);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);


  // for(let i=0;i<=)

  // const posts = [
  //     {
  //       id: 1,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 ",
  //     },
  //     {
  //       id: 2,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 3,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //     {
  //       id: 4,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     },
  //   ];

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deblogs;
