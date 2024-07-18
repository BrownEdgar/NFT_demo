import React from "react";
import "./filter.css";
import axios from 'axios';

const categors = [
  "all",
  "Art",
  "3D Art",
  "Game",
  "Painting",
  "Wall Art",
  "Others",
]
const Filter = ({ setProducts, setLoading }) => {

  const handleClick = (category) => {
    setLoading(true)
    axios(`http://localhost:3000/products/category?category=${category}`)
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false))
  }

  return (
    <div className="filter-section">
      <div className="main-text-box">
        <p className="main-text">|</p>
        <p className="main-text">Explore</p>
        <p className="white-text">Welcome to Feed</p>
        <br />
        <p className="secondary-text">
          Home {"> "} <span className="orange-text">Food</span>
        </p>
      </div>

      <div className="filters">
        <div>
          <label className="select" htmlFor="slct">
            <select id="slct" required="required">
              <option value="">
                Select option
              </option>
              <option value="#">One</option>
              <option value="#">Two</option>
              <option value="#">Three</option>
              <option value="#">Four</option>
              <option value="#">Five</option>
              <option value="#">Six</option>
              <option value="#">Seven</option>
            </select>
            <svg>
              <use xlinkHref="#select-arrow-down"></use>
            </svg>
          </label>
          <svg className="sprites">
            <symbol id="select-arrow-down" viewBox="0 0 10 6">
              <polyline points="1 1 5 5 9 1"></polyline>
            </symbol>
          </svg>
        </div>
        <div className="filter-buttons">
          {categors.map((cur) => {
            return (
              <button key={cur} onClick={() => handleClick(cur)} className='filter-button'>{cur}</button>
            )
          })}
        </div>
        <div className="filter-buttons-end">
          <button className="filter-button"></button>
          <button className="filter-button"></button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
