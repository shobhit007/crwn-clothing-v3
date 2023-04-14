import "./categories.list.style.css";
import React, { useState } from "react";

import Button from "../button/button.component";

import AnimatedLink from "../link/link.component";

function CategoriesList() {
  const [isLinksExpanded, setIsLinksExpanded] = useState(false);

  const expandLinks = () => {
    setIsLinksExpanded((p) => !p);
  };
  return (
    <div className="shop-container">
      <div className="shop-wrapper">
        <div className="shop-sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar-content">
              <div className="sidebar-header">
                <button className="sidebar-header-button" onClick={expandLinks}>
                  <h2 className="fs-600">Shop by categories</h2>
                  <i
                    className={`ri-arrow-${
                      isLinksExpanded ? "up-s" : "down-s"
                    }-line arrow-down`}
                  ></i>
                </button>
              </div>
              <ul
                className={`categories-links ${
                  isLinksExpanded && "categories-links-visible"
                }`}
              >
                <li className="cat-link-item">
                  <AnimatedLink to="men_all" text="View all" />
                </li>
                <li className="cat-link-item">
                  <AnimatedLink to="men_tshirtstanks" text="T-shirts & Tanks" />
                </li>
                <li className="cat-link-item">
                  <AnimatedLink to="men_trousers" text="Pants" />
                </li>
                <li className="cat-link-item">
                  <AnimatedLink
                    to="men_hoodiessweatshirts"
                    text="Hoodies & Sweatshirts"
                  />
                </li>
                <li className="cat-link-item">
                  <AnimatedLink to="men_shirts" text="Shirts" />
                </li>
                <li className="cat-link-item">
                  <AnimatedLink to="men_blazerssuits" text="Suits & Blazers" />
                </li>
                <li className="cat-link-item">
                  <AnimatedLink to="men_shorts" text="Shorts" />
                </li>
                <li className="cat-link-item">
                  <AnimatedLink to="men_jacketscoats" text="Jackets & Coats" />
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
                  <Button to="WK11_bestsellers_shop" />
                </div>
              </div>
            </div>

            {/* linen collection */}
            <div className="col-wrapper">
              <div className="linen content-col">
                <div className="linen-content text-align-center">
                  <h2 className="mb content-col-label">The linen collection</h2>
                  <p className="fs-500 mt mb">Light, airy & effortless</p>
                  <Button to="men_linenclothing" />
                </div>
              </div>
            </div>

            {/* tailored collection */}
            <div className="col-wrapper">
              <div className="tailored content-col">
                <div className="tailored-content text-align-center">
                  <h2 className="mb content-col-label">Tailored collection</h2>
                  <Button to="men_tailored" />
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
