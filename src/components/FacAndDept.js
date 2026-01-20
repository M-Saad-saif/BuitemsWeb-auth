import React from "react";
import { Link } from "react-router-dom";

const FacultiesDept = () => {
  return (
    <div id="facu-and-eng-body">
      <section className="propectus-portion">
        {/* Basic Sciences */}
        <div className="portion" style={{marginTop: "5rem"}}>
          <h1 className="pp_headings">
            _____Basics Sciences___<i class="ri-brain-line"></i>
          </h1>
          <div className="basic-science" >
            <Link
              to="https://www.buitms.edu.pk/Chemistry"
              id="bs-chemistrys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="super-button">
                <div className="div12">
                  {" "}
                  <span>Chemistry</span>
                </div>
                <svg fill="none" viewBox="0 0 24 24" className="arrow">
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    d="M5 12h14M13 6l6 6-6 6"
                  ></path>
                </svg>
              </button>
            </Link>

            <div className="div13">
              <Link
                to="https://www.buitms.edu.pk/Mathematics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Mathematics</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div14">
              <Link
                to="https://www.buitms.edu.pk/Physics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Physics</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Engineering and Architecture */}
        <div className="portion">
          <h1 className="pp_headings" id="engineer-archi-portion">
            _____Engineering and Architechure____
            <i class="fa-solid fa-sitemap"></i>
          </h1>
          <div className="eng-arch">
            <div className="div15">
              <Link
                to="https://www.buitms.edu.pk/Textile-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Textile Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div16">
              <Link
                to="https://www.buitms.edu.pk/Civil-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Civil Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div17">
              <Link
                to="https://www.buitms.edu.pk/Mechanical-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="mechenicalBTN">
                  <div className="div12">
                    {" "}
                    <span>Mechanical Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div18">
              <Link
                to="https://www.buitms.edu.pk/Petroleum-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="petrolBTN">
                  <div className="div12">
                    {" "}
                    <span>Petroleum and Gas Engineering </span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div19">
              <Link
                to="https://www.buitms.edu.pk/Chemical-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Chemical Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div20">
              <Link
                to="https://www.buitms.edu.pk/Mining-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="miningengBTN">
                  <div className="div12">
                    {" "}
                    <span>Mining Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div21">
              <Link
                to="https://www.buitms.edu.pk/Geological-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="geologyBTN">
                  <div className="div12">
                    {" "}
                    <span>Geological Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div22">
              <Link
                to="https://www.buitms.edu.pk/Architecture"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Architecture</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Faculty of Information & Communication Technology */}
        <div className="portion">
          <h1 className="pp_headings" id="fict-portion">
            _____Faculty of Information & Communication Technology___
            <i class="fa-solid fa-code"></i>
          </h1>
          <div className="fict">
            <div className="div23">
              <Link
                to="https://www.buitms.edu.pk/Computer-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Computer Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div24">
              <Link
                to="https://www.buitms.edu.pk/Electronic-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Electronic Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div25">
              <Link
                to="https://www.buitms.edu.pk/Electrical-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Electrical Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div26">
              <Link
                to="https://www.buitms.edu.pk/Software-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Software Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div27">
              <Link
                to="https://www.buitms.edu.pk/Information-Technology"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Information Technology</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div28">
              <Link
                to="https://www.buitms.edu.pk/Computer-Science"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Computer Science</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div29">
              <Link
                to="https://www.buitms.edu.pk/Telecommunication"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Telecommunication Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Faculty of Life Sciences & Informatics */}
        <div className="portion">
          <h1 className="pp_headings" id="flsi-portion">
            _____Faculty of Life Sciences & Informatics___
            <i class="fa-solid fa-heart-pulse"></i>
          </h1>
          <div className="flsi">
            <div className="div30">
              <Link
                to="https://www.buitms.edu.pk/Biotechnology"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Biotechnology</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div31">
              <Link
                to="https://www.buitms.edu.pk/Environmental"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="envirnmentalBTN">
                  <div className="div12">
                    {" "}
                    <span>Environmental Science</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div32">
              <Link
                to="https://www.buitms.edu.pk/Microbiology"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Microbiology</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Faculty of Management Sciences */}
        <div className="portion">
          <h1 className="pp_headings" id="fms-portion">
            _____Faculty of Management Sciences___
            <i class="fa-solid fa-bars-progress"></i>
          </h1>
          <div className="fms">
            <div className="div33">
              <Link
                to="https://www.buitms.edu.pk/Management-Sciences"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Management Sciences</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div34">
              <Link
                to="https://www.buitms.edu.pk/Economics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="ecnomicsBTN">
                  <div className="div12">
                    {" "}
                    <span>Economics</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div35">
              <Link
                to="https://www.buitms.edu.pk/Public-Administration"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Public Administration</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div36">
              <Link
                to="https://www.buitms.edu.pk/Department-Law"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Department of Law</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Faculty of Social Sciences and Humanities */}
        <div className="portion">
          <h1 className="pp_headings" id="fssh-portion">
            _____Faculty of Social Sciences and Humanities_____
          </h1>
          <div className="fssh">
            <div className="div37">
              <Link
                to="https://www.buitms.edu.pk/Education"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Department of Education</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div38">
              <Link
                to="https://www.buitms.edu.pk/English"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Department of English</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div39">
              <Link
                to="https://www.buitms.edu.pk/International-Relation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>International Relations</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div40">
              <Link
                to="https://www.buitms.edu.pk/Mass-Communication"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Mass Communication</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div41">
              <Link
                to="https://www.buitms.edu.pk/Psychology"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="psychologyBTN">
                  <div className="div12">
                    {" "}
                    <span>Department of Psychology</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div42">
              <Link
                to="https://www.buitms.edu.pk/Sociology"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Department of Sociology</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div43">
              <Link
                to="https://www.buitms.edu.pk/Department-Law"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Department of Law</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* BUITEMS Sub Campus Muslimbagh */}
        <div className="portion">
          <h1 className="pp_headings" id="muslimbhg-portion">
            _____BUITEMS Sub Campus Muslimbagh_____
          </h1>
          <div className="mslmbgh">
            <div className="div44">
              <Link
                to="https://www.buitms.edu.pk/Computer-Engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Computer Engineering</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div45">
              <Link
                to="https://www.buitms.edu.pk/Economics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="msl-economicsBTN">
                  <div className="div12">
                    {" "}
                    <span>Economics</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div46">
              <Link
                to="https://www.buitms.edu.pk/Management-Sciences"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Management Sciences</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div47">
              <Link
                to="https://www.buitms.edu.pk/Public-Administration"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Public Administration</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* BUITEMS Sub Campus University College of Zhob, (UCoZ) */}
        <div className="portion">
          <h1 className="pp_headings" id="zhob-portion">
            _____BUITEMS Sub Campus University College of Zhob, (UCoZ)_____
          </h1>
          <div className="zhob">
            <div className="div48">
              <Link
                to="https://www.buitms.edu.pk/Education"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Department of Education</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div49">
              <Link
                to="https://www.buitms.edu.pk/Economics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button" id="zhob-economicsBTN">
                  <div className="div12">
                    {" "}
                    <span>Economics</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div50">
              <Link
                to="https://www.buitms.edu.pk/Management-Sciences"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Management Sciences</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>

            <div className="div51">
              <Link
                to="https://www.buitms.edu.pk/Computer-Science"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="super-button">
                  <div className="div12">
                    {" "}
                    <span>Computer Science</span>
                  </div>
                  <svg fill="none" viewBox="0 0 24 24" className="arrow">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      d="M5 12h14M13 6l6 6-6 6"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultiesDept;
