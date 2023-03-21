import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext); //updates the navbar with the current user info

  const deBlogs = async () => {};

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
    </div>
  );
};

export default Navbar;
