import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolopen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleToolDropdown = () => {
    setIsToolopen(!isToolsOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-lg d-none d-lg-block">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            BUITEMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tools
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/AggregateCalculator">
                      <span style={{color:"#ffd700 " }}>➤</span> Aggregate Calculator
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/GPAcalculator">
                       <span style={{color:"#ffd700" }}>➤</span> GPA Calculator
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/CGPACalculator">
                       <span style={{color:"#ffd700" }}>➤</span> CGPA Calculator
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/TimeTable">
                      <span style={{color:"#ffd700 "}}>➤</span> Timetable Generator
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/FrontPages">
                       <span style={{color:"#ffd700 " }}>➤</span> Front Pages
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/FacultiesDepartments">
                      <span style={{color:"#ffd700 ",}}>➤</span> Faculties & Departments
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div>
              <Link
                to="https://github.com/M-Saad-saif"
                target="_blank"
                className="mx-2"
              >
                <button>
                  GitHub <i className="ri-github-fill"></i>
                </button>
              </Link>

              {!localStorage.getItem("token") ? (
                ""
              ) : (
                <Link to="/portal">
                  <button>
                    Portal <i className="fa-solid fa-graduation-cap "></i>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="d-lg-none">
        {/* Mobile Header */}
        <div className="mobile-nav-header">
          <div className="mobile-nav-brand">
            <Link to="/" onClick={closeMobileMenu}>
              BUITEMS
            </Link>
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <i className="ri-close-line"></i>
            ) : (
              <i className="ri-menu-line"></i>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        ></div>

        {/* Mobile Menu Sidebar */}
        <div
          className={`mobile-menu-sidebar ${isMobileMenuOpen ? "active" : ""}`}
        >
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button
              className="mobile-menu-close"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <div className="mobile-menu-content">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <Link
                  className="mobile-nav-link active"
                  to="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>

              <li className="mobile-nav-item">
                <Link
                  className="mobile-nav-link"
                  to="/about"
                  onClick={closeMobileMenu}
                >
                  <i className="ri-information-line"></i>
                  About
                </Link>
              </li>

              <li className="mobile-nav-item mobile-nav-dropdown">
                <div
                  className="mobile-nav-dropdown-header"
                  onClick={toggleToolDropdown}
                >
                  <i className="ri-tools-line"></i>
                  <span>Tools</span>
                  <i
                    className={`ri-arrow-down-s-line dropdown-arrow ${isToolsOpen ? "rotate-180" : ""}`}
                  ></i>
                </div>
                <ul
                  className={`mobile-nav-dropdown-menu ${isToolsOpen ? "show" : "hide"}`}
                >
                  <li>
                    <Link
                      className="mobile-dropdown-item"
                      to="/AggregateCalculator"
                      onClick={closeMobileMenu}
                    >
                       <span style={{color:"#ffd700 "}}>➤</span>
                      Aggregate Calculator
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="mobile-dropdown-item"
                      to="/GPAcalculator"
                      onClick={closeMobileMenu}
                    >
                      <span style={{color:"#ffd700 "}}>➤</span>
                      GPA Calculator
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="mobile-dropdown-item"
                      to="/CGPACalculator"
                      onClick={closeMobileMenu}
                    >
                      <span style={{color:"#ffd700 ", fontSize:"19px"}}>➤</span>
                      CGPA Calculator
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="mobile-dropdown-item"
                      to="/TimeTable"
                      onClick={closeMobileMenu}
                    >
                      <span style={{color:"#ffd700 "}}>➤</span>
                      Timetable Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="mobile-dropdown-item"
                      to="/FrontPages"
                      onClick={closeMobileMenu}
                    > <span style={{color:"#ffd700 "}}>➤</span>
                      Front Pages
                    </Link>
                  </li>
                  <li className="mobile-dropdown-divider"></li>
                  <li>
                    <Link
                      className="mobile-dropdown-item"
                      to="/FacultiesDepartments"
                      onClick={closeMobileMenu}
                    >
          <span style={{color:"#ffd700 "}}>➤</span>
                      Faculties & Departments
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="Mob-navbar-footer-btn">
              <Link
                to="https://github.com/M-Saad-saif"
                target="_blank"
                className="mx-2"
              >
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ background: "#0a4da1" }}
                >
                  Github <i class="ri-github-fill"></i>
                </button>
              </Link>

              {!localStorage.getItem("token") ? (
                ""
              ) : (
                <Link to="/portal">
                  <button
                    type="button"
                    class="btn btn-primary"
                    style={{ background: "#0a4da1" }}
                    onClick={closeMobileMenu}
                  >
                    Portal <i className="fa-solid fa-graduation-cap "></i>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
