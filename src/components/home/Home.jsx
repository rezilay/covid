import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { abbrNum } from "../numberFormat";
import "./Home.css";

const Home = () => {
  const [current, setCurrent] = useState("WorldWide");
  const [info, setInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");

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

  let filtered = countries.filter((c) => {
    if (value === "") {
      return c.country;
    } else {
      let uppered = String(c.country).toUpperCase();
      return uppered.indexOf(value.toUpperCase()) > -1;
    }
  });

  return (
    <div className="home__main">
      <div className="home__container">
        <div className="home__country"></div>
        <div className="home__table">
          <input
            type="text"
            className="home__myInput"
            onChange={(e) => setValue(e.target.value)}
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
              {filtered.map((c) => (
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
