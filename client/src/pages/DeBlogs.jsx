import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Deblogs = () => {
  const [posts, setPosts] = useState([]);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const [postUrls, setPostUrls] = useState([
    // 'https://ipfs.io/ipfs/bafyreighds737svatvsurruikdo543ey4ordmtvee4p5gtiwpqmfbotmia/metadata.json',
    // 'https://ipfs.io/ipfs/bafyreigk2axyql75m7hog5nlr5sfv5hxidyme7hs6ufkgjz3e3msh4qwfm/metadata.json',
    // 'https://ipfs.io/ipfs/bafyreiel737hqefklxmjecbvsxrcc6u7mfvzji37crf23pw5spcfc6zmce/metadata.json'
  ]);

  let contractABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_url",
          type: "string",
        },
        {
          internalType: "string",
          name: "_tags",
          type: "string",
        },
      ],
      name: "createBlog",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_url",
          type: "string",
        },
        {
          internalType: "string",
          name: "_tags",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_blogCounter",
          type: "uint256",
        },
      ],
      name: "deleteBlog",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_url",
          type: "string",
        },
        {
          internalType: "string",
          name: "_tags",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_blogCounter",
          type: "uint256",
        },
      ],
      name: "updateBlog",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "availableBlogs",
      outputs: [
        {
          internalType: "uint256",
          name: "blogId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "blogUrl",
          type: "string",
        },
        {
          internalType: "address",
          name: "blogOwner",
          type: "address",
        },
        {
          internalType: "string",
          name: "tags",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "blogCounter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // let contractAddress = "0x8E44a3f0A34a588b7c8Dfd21DfBB4A617a4C396C";   //polygon
  let contractAddress = "0x055B6FF659Ea52f5d99fcc7A9827d7f2DCC39372";       //FVM

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    getData();
  }, []);

  // const provider2 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai");
  // const provider2 = new ethers.providers.JsonRpcProvider("https://polygon-testnet.public.blastapi.io");
  // const provider2 = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com	");


  const getData = async () => {
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      // provider2
      provider
    );

    // let arr=[]
    let blogCount = await contractInstance.blogCounter();
    console.log(blogCount.toString());
    const newUrls = [];
    for (let i = 0; i <= blogCount.toString(); i++) {
      let data = await contractInstance.availableBlogs(i);
      console.log(data[1]);
      let editedStr = data[1].slice(7);
      newUrls.push(`https://ipfs.io/ipfs/${editedStr}`);

      setPostUrls(newUrls);
      console.log(postUrls);
      // console.log(`https://ipfs.io/ipfs/${editedStr}`)
    }
  };

  const newPosts = [];

  useEffect(() => {
    const fetchPosts = async () => {
      for (let i = 0; i < postUrls.length; i++) {
        const response = await fetch(postUrls[i]);
        const json = await response.json();
        newPosts.push(json);
      }

      setPosts(newPosts);
    };

    fetchPosts();
    // getData();
  }, [newPosts]);

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

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          // <div className="post" key={post.id}>
          <div className="post">
            <div className="img">
              <img src={`https://ipfs.io/ipfs/${post.image.slice(7)}`} alt="" />
            </div>
            <div className="content">
              {/* <Link to={`/post/${post.id}`}> */}
              <h1>{post.name}</h1>
              <p>
                {isReadMore
                  ? getText(`${post.description}`).slice(0, 200)
                  : getText(`${post.description}`)}

                <span
                  onClick={toggleReadMore}
                  style={{ color: "rgb(192,192,192)", cursor: "pointer" }}
                >
                  {isReadMore ? "..." : ""}
                </span>
              </p>
              <button
                onClick={toggleReadMore}
                // style={{ color: "rgb(192,192,192)", cursor: "pointer" }}
              >
                {isReadMore ? "...Read more" : " Show less"}
              </button>
              {/* </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deblogs;
