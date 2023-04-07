import "./categories.list.style.css";
import React from "react";

import { Link } from "react-router-dom";

import Button from "../button/button.component";

function CategoriesList() {
  return (
    <div className="shop-container">
      <div className="shop-wrapper">
        <div className="shop-sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar-content">
              <h2 className="fs-600">Shop by categories</h2>
              <ul className="categories-link">
                <li className="cat-link-item">
                  <Link
                    to="men_all"
                    className="cat-link fs-500 text-color-black"
                  >
                    View all
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_tshirtstanks"
                    className="cat-link fs-500 text-color-black"
                  >
                    T-shirts & Tanks
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_trousers"
                    className="cat-link fs-500 text-color-black"
                  >
                    Pants
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_hoodiessweatshirts"
                    className="cat-link fs-500 text-color-black"
                  >
                    Hoodies & Sweatshirts
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_shirts"
                    className="cat-link fs-500 text-color-black"
                  >
                    Shirts
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_blazerssuits"
                    className="cat-link fs-500 text-color-black"
                  >
                    Suits & Blazers
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_shorts"
                    className="cat-link fs-500 text-color-black"
                  >
                    Shorts
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_jacketscoats"
                    className="cat-link fs-500 text-color-black"
                  >
                    Jackets & Coats
                  </Link>
                </li>
                <li className="cat-link-item">
                  <Link
                    to="men_underwear"
                    className="cat-link fs-500 text-color-black"
                  >
                    Underwear
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="shop-main">
          <div className="shop-content">
            {/* new arrival */}
            <div className="col-wrapper">
              <div className="new-arrival content-col">
                <div className="new-arrival-content text-align-center">
                  <h2 className="mb content-col-label">The Bestsellers</h2>
                  <Button />
                </div>
              </div>
            </div>

            {/* linen collection */}
            <div className="col-wrapper">
              <div className="linen content-col">
                <div className="linen-content text-align-center">
                  <h2 className="mb content-col-label">The linen collection</h2>
                  <p className="fs-500 mt mb">Light, airy & effortless</p>
                  <Button />
                </div>
              </div>
            </div>

            {/* tailored collection */}
            <div className="col-wrapper">
              <div className="tailored content-col">
                <div className="tailored-content text-align-center">
                  <h2 className="mb content-col-label">Tailored collection</h2>
                  <Button />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesList;
