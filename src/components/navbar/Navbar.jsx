import React from "react";
import "./Navbar.css";
import { FaGithub } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar__main">
      <div className="navbar__container">
        <div className="navbar__logoDiv">
          <h1>
            <Link to={"/"} className="navbar__link">
              Covid App
            </Link>{" "}
          </h1>
        </div>
        <div className="navbar__icons">
          <Link to={"/github"} className="navbar__link navbar__icon">
            <FaGithub />
          </Link>
          <Link to={"/me"} className="navbar__link navbar__icon">
            <SiAboutdotme />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
