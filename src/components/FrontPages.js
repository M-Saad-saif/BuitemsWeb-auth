import React from "react";
import { Link } from "react-router-dom";
import FP1 from "./images/ass pg 1.png";
import FP2 from "./images/ass pg 2.png";
import FP3 from "./images/ass pg 3.png";
import FP4 from "./images/ass pg 4.png";

export default function FrontPages() {
  return (
    <>
    <title>BUITEMS - FrontPages</title>
      <div className="fp-body">
        <div className="fp-container" id="genfp-body">
          <div className="fp-grid">
            <div className="fp-card">
              <h3 className="design-title">Design 1</h3>
              <Link to="/design/1">
                <div className="image-container">
                  <img src={FP1} alt="Design 1" className="design-image" />
                  <div className="image-overlay">
                    <span>Preview</span>
                    <i className="ri-eye-fill"></i>
                  </div>
                </div>
              </Link>
              <div className="click-indicator">
                <span>Click to select</span>
                <i className="ri-corner-right-up-fill"></i>
              </div>
            </div>

            <div className="fp-card">
              <h3 className="design-title">Design 2</h3>
              <Link to="/design/2">
                <div className="image-container">
                  <img src={FP2} alt="Design 2" className="design-image" />
                  <div className="image-overlay">
                    <span>Preview</span>
                    <i className="ri-eye-fill"></i>
                  </div>
                </div>
              </Link>
              <div className="click-indicator">
                <span>Click to select</span>
                <i className="ri-corner-right-up-fill"></i>
              </div>
            </div>

            <div className="fp-card">
              <h3 className="design-title">Design 3</h3>
              <Link to="/design/3">
                <div className="image-container">
                  <img src={FP3} alt="Design 3" className="design-image" />
                  <div className="image-overlay">
                    <span>Preview</span>
                    <i className="ri-eye-fill"></i>
                  </div>
                </div>
              </Link>
              <div className="click-indicator">
                <span>Click to select</span>
                <i className="ri-corner-right-up-fill"></i>
              </div>
            </div>

            <div className="fp-card">
              <h3 className="design-title">Design 4</h3>
              <Link to="/design/4">
                <div className="image-container">
                  <img src={FP4} alt="Design 4" className="design-image" />
                  <div className="image-overlay">
                    <span>Preview</span>
                    <i className="ri-eye-fill"></i>
                  </div>
                </div>
              </Link>
              <div className="click-indicator">
                <span>Click to select</span>
                <i className="ri-corner-right-up-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="fp-footer">
          <p className="footer-note">
            <i className="ri-information-fill"></i>
            Choose a design to customize your assignment front page
          </p>
        </div>
      </div>
    </>
  );
}
