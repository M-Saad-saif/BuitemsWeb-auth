import React from "react";
import Footer from "./Footer";
import Mypic from "../components/images/pic.jfif";

export default function About() {
  return (
    <>
      <title>BUITEMS - About</title>

      <div className="About-container">
        <header className="header-design">
          <div className="footer-wave"></div>
        </header>
        <div className="pset">
          <div className="container">
            <div className="row listar-feature-items">
              <div
                className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
                data-aos="fade-zoom-in"
                data-aos-group="features"
                data-line-height="25.2px"
              >
                <div className="listar-feature-item listar-feature-has-link">
                  <div className="listar-feature-item-inner">
                    <div className="listar-feature-right-border"></div>

                    <div className="listar-feature-block-content-wrapper">
                      <div className="listar-feature-icon-wrapper">
                        <div className="listar-feature-icon-inner">
                          <div>
                            <img
                              alt="Businesses"
                              className="listar-image-icon"
                              src="https://cdn-icons-png.flaticon.com/128/2166/2166978.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="listar-feature-content-wrapper"
                        style={{ paddingTtop: "0px" }}
                      >
                        <div className="listar-feature-item-title listar-feature-counter-added">
                          <span>
                            <span>01</span>
                            Student Portal{" "}
                          </span>
                        </div>

                        <div className="listar-feature-item-excerpt">
                          “Secure student portal with profile management,
                          authentication send protected access.”
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
                data-aos="fade-zoom-in"
                data-aos-group="features"
                data-line-height="25.2px"
              >
                <div className="listar-feature-item listar-feature-has-link">
                  <div className="listar-feature-item-inner">
                    <div className="listar-feature-right-border"></div>

                    <div className="listar-feature-block-content-wrapper">
                      <div className="listar-feature-icon-wrapper">
                        <div className="listar-feature-icon-inner">
                          <div>
                            <img
                              alt="Customers"
                              className="listar-image-icon"
                              src="https://cdn-icons-png.flaticon.com/512/537/537069.png"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="listar-feature-content-wrapper"
                        style={{ paddingTtop: "0px" }}
                      >
                        <div className="listar-feature-item-title listar-feature-counter-added">
                          <span>
                            <span>02</span>
                            Tools & Resources
                          </span>
                        </div>

                        <div className="listar-feature-item-excerpt">
                          “Student GPA/CGPA calculator tool and Front page
                          generator”
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4 listar-feature-item-wrapper listar-feature-with-image listar-height-changed"
                data-aos="fade-zoom-in"
                data-aos-group="features"
                data-line-height="25.2px"
              >
                <div className="listar-feature-item listar-feature-has-link">
                  <div className="listar-feature-item-inner">
                    <div className="listar-feature-right-border"></div>

                    <div className="listar-feature-block-content-wrapper">
                      <div className="listar-feature-icon-wrapper">
                        <div className="listar-feature-icon-inner">
                          <div>
                            <img
                              alt="Feedback"
                              className="listar-image-icon"
                              src={Mypic}
                              style={{
                                width: "71%",
                                height: " 71%",
                                borderRadius: "50px",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="listar-feature-content-wrapper"
                        style={{ paddingTtop: "0px" }}
                      >
                        <div className="listar-feature-item-title listar-feature-counter-added">
                          <span>
                            <span>03</span>
                               Made By 
                          </span>
                        </div>

                        <div className="listar-feature-item-excerpt">
                          Muhammad Saad Saif  Undergraguate Computer Science Student 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="listar-feature-fix-bottom-padding listar-fix-feature-arrow-button-height"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
