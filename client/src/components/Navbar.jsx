import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";


import * as PushAPI from "@pushprotocol/restapi";
import { Chat } from "@pushprotocol/uiweb";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext); //updates the navbar with the current user info

  const [account, setAccount] = useState(null)

  const connectWallet = async() =>{
    window.ethereum.request( {method: "eth_requestAccounts"})
    .then((accounts) => {
      setAccount(accounts[0]);
    }).catch( (e) => {
      alert(e)
    })
}

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/deblogs">
            <button onClick={connectWallet}>Get Decentralized Blogs</button>
          </Link>
          
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=animals">
            <h6>ANIMALS</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
          <span className="write">
            <Link className="link" to="/bwrite">
              DeWrite
            </Link>
          </span>
        </div>
      </div>

      <Chat                   
      // style={{ position: "absolute", margin: "5000px", cursor: "pointer" }}
                    // account={account} //user address 
                    account= '0x5dA67e37780C77E5cB4565fD4995854153911Df9' //user address 
                    // supportAddress="0x5dA67e37780C77E5cB4565fD4995854153911Df9" //support address
                    supportAddress="0xc221979949e0ACc4E1E715FbB232284f7eE412d4" //support address
                    apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                    // apiKey="vzOQa8Hda3.lD6Yvrij1T4qHrE07Mp7XcE3mRWu8Yl6WAmOzLSfI63xWuGSoNkXsHeBDVvG63Hs"
                        env="staging"
        />
    </div>
  );
};

export default Navbar;
