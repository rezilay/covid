import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { abbrNum } from "../numberFormat";
import "./Home.css";

const Home = () => {
  const [current, setCurrent] = useState("Iran");
  const [info, setInfo] = useState({});

  useEffect(() => {
    let api;
    if (current === "WorldWide") {
      api = "https://disease.sh/v3/covid-19/all";
      fetch(api)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    }

    if (current !== "WorldWide") {
      api = `https://disease.sh/v3/covid-19/countries/${current}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    }
  }, [current]);

  return (
    <div className="home__main">
      
    </div>
  );
};

export default Home;
