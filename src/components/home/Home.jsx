import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { abbrNum } from "../numberFormat";
import "./Home.css";
import Map from "../map/Map";

const Home = () => {
  const [current, setCurrent] = useState("Iran");
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
    let api = `https://disease.sh/v3/covid-19/countries/${current}`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => setInfo(data));
  }, [current]);

  let filtered = countries.filter((c) => {
    if (value === "") {
      return c.country;
    } else {
      let uppered = String(c.country).toUpperCase();
      return uppered.indexOf(value.toUpperCase()) > -1;
    }
  });


  console.log(info.countryInfo.lat)

  return (
    <div className="home__main">
      <div className="home__container">
        <div className="home__country">
          <div className="home__info">
            <div className="nameAndFlag">
              <div className="flag">
                <img src={info.countryInfo.flag} alt="" />
              </div>
              <div className="name">
                {" "}
                <h1>{info.country}</h1> <h3>{info.continent}</h3>{" "}
              </div>
            </div>
            <div className="pupolation">
              {" "}
              <h1>Population : {abbrNum(info.population, 2)}</h1>{" "}
            </div>
            <div className="cases">
              {" "}
              <h1>Cases : {abbrNum(info.cases, 2)}</h1>{" "}
            </div>
            <div className="recovered">
              {" "}
              <h1>Recovered : {abbrNum(info.recovered, 2)}</h1>{" "}
            </div>
            <div className="death">
              {" "}
              <h1>Death : {abbrNum(info.deaths, 2)}</h1>{" "}
            </div>
          </div>
          <div className="home__map">
            <Map lat={info.countryInfo.lat} long={info.countryInfo.long} />
          </div>
        </div>
        <div className="home__table">
          <input
            type="text"
            className="home__myInput"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for names.."
          />
          <table className="home__tableMain">
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
                  <td>{abbrNum(c.cases, 2)}</td>{" "}
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
