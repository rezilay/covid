import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { abbrNum } from "../numberFormat";
import "./Home.css";

const Home = () => {
  const [current, setCurrent] = useState("Iran");
  const [info, setInfo] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let api = "https://corona.lmao.ninja/v3/covid-19/countries";
    fetch(api)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

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
      <div className="home__container">
        <div className="home__country"></div>
        <div className="home__table">
          <input
            type="text"
            className="home__myInput"
            // onKeyUp={2 + 2}
            placeholder="Search for names.."
          />
          <table className="home__table">
            <thead>
              <tr className="home__header">
                <th style={{ width: "60%" }}>Country</th>
                <th style={{ width: "40%" }}>Cases</th>
              </tr>
            </thead>

            <tbody>
              {countries.map((c) => (
                <tr key={c.country} onClick={() => setCurrent(c.country)}>
                  <td>{c.country}</td>
                  <td>{c.cases}</td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
