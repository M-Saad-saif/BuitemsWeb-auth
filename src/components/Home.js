import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <h1 className="home-title">BUITEMS Student Portal</h1>
        <p className="home-subtitle">
          Your all-in-one platform for academic tools, calculators, and
          university resources. Everything you need for a successful academic
          journey.
        </p>
      </header>

      {/* credential buttons */}
      <div className="buttons">
        <div className="credential-card">
          <div className="credentialBTNs">
            <p>Create Account to have personal portal</p>
            <div className="buttons">
              <Link to="/Signup">
                <button className="credentialBTN ">
                  Create Account <i className="ri-user-add-line"></i>
                </button>
              </Link>

              <Link to="/login">
                <button className="credentialBTN  mx-2">
                  Login <i className="ri-login-box-line"></i>
                </button>
              </Link>
            </div>
          </div>

          <div className="Credential-divider"></div>

          <div id="studentPortal" style={{ gap: "8px", display: "grid" }}>
            <p>Student Protal</p>
            <Link to="/portal">
              <button className="credentialBTN">
                Portal <i className="fa-solid fa-graduation-cap"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="home-main-container">
        {/* AI chat container */}
        <div className="feature-card">
          <div className="iconHeading-container">
            <i className="ri-ai-generate-2 home-card-icon mx-2"></i>
            <h3 className="card-title">AI Assisstant</h3>
          </div>
          <p className="card-description">
            Get detailed, easy-to-understand theoretical answers to your
            specific questions and doubts.
          </p>
          <Link to="/aichat">
            <button className="card-action-btn">
              Start Asking <i className="ri-arrow-right-line"></i>
            </button>
          </Link>
        </div>

        {/* Aggregate Calculator */}
        <div className="feature-card">
          <div className="iconHeading-container">
            <i className="ri-calculator-line home-card-icon"></i>
            <h3 className="card-title">Aggregate Calculator</h3>
          </div>
          <p className="card-description">
            Calculate your admission aggregate based on matric, FSC, and NTS
            marks.
          </p>
          <Link to="/AggregateCalculator">
            <button className="card-action-btn">
              Calculate Now <i className="ri-arrow-right-line"></i>
            </button>
          </Link>
        </div>

        {/* GPA Calculator */}
        <div className="feature-card">
          <div className="iconHeading-container">
            <i className="ri-line-chart-line home-card-icon"></i>
            <h3 className="card-title">GPA Calculator</h3>
          </div>
          <p className="card-description">
            Calculate your semester GPA with our easy-to-use calculator.
            Supports multiple courses.
          </p>
          <Link to="/GPAcalculator">
            <button className="card-action-btn">
              Calculate GPA <i className="ri-arrow-right-line"></i>
            </button>
          </Link>
        </div>

        {/* CGPA Calculator */}
        <div className="feature-card">
          <div
            className="iconHeading-container"
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   marginTop: "2rem",
            //   flexWrap: "wrap",
            // }}
          >
            <i className="ri-bar-chart-line home-card-icon"></i>
            <h3 className="card-title">CGPA Calculator</h3>
          </div>
          <p className="card-description">
            Track your cumulative GPA across all semesters. Monitor your
            academic progress and set goals.
          </p>
          <Link to="/CGPACalculator">
            <button className="card-action-btn">
              Calculate CGPA <i className="ri-arrow-right-line"></i>
            </button>
          </Link>
        </div>

        {/* Timetable Generator */}
        <div className="feature-card">
          <div className="iconHeading-container">
            <i className="ri-calendar-line home-card-icon"></i>
            <h3 className="card-title">Timetable Generator</h3>
          </div>
          <p className="card-description">
            Create and customize your weekly class schedule. Generate PDF
            timetables.
          </p>
          <Link to="/timetable">
            <button className="card-action-btn">
              Create Timetable <i className="ri-arrow-right-line"></i>
            </button>
          </Link>
        </div>

        {/* Front Page Designs */}
        <div className="feature-card">
          <div className="iconHeading-container">
            <i className="ri-file-text-line home-card-icon"></i>
            <h3 className="card-title">Front Page Designs</h3>
          </div>
          <p className="card-description">
            Professional assignment front page templates. Customize and download
            in PDF format.
          </p>
          <Link to="/frontpages">
            <button className="card-action-btn">
              Browse Designs <i className="ri-arrow-right-line"></i>
            </button>
          </Link>
        </div>

        {/* Faculties & Departments */}
        <div className="feature-card" id="Facu-and-Dep-card">
          <div className="iconHeading-container">
            <i className="ri-building-line home-card-icon"></i>
            <h3 className="card-title">Faculties & Departments</h3>
          </div>
          <p className="card-description">
            Explore all BUITEMS faculties and departments. Quick access to
            department websites.
          </p>
          <Link to="/FacultiesDepartments">
            <button className="card-action-btn">
              Explore Dep <i className="ri-arrow-right-line"></i>
            </button>
          </Link>
        </div>
      </main>

      {/* Stats Section */}
      <div className="home-stats">
        <div className="stat-item">
          <img
            src="https://cdn-icons-png.flaticon.com/128/12538/12538748.png"
            alt=""
            srcset=""
            style={{
              verticalAlign: "middle",
              width: "60px",
              display: "flex",
              justifySelf: "center",
              color: "yellow",
              marginBottom: "8px",
            }}
          />
          <span className="stat-label text-white">Tools Available</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            <img
              src="https://cdn-icons-png.flaticon.com/128/5845/5845492.png"
              alt=""
              style={{
                verticalAlign: "middle",
                width: "60px",
                display: "flex",
                justifySelf: "center",
                color: "yellow",
                marginBottom: "8px",
              }}
            />
          </span>
          <span className="stat-label text-white">AI integrated</span>
        </div>
        <div className="stat-item">
          <img
            src="https://cdn-icons-png.flaticon.com/128/8743/8743989.png"
            alt=""
            style={{
              verticalAlign: "middle",
              width: "60px",
              display: "flex",
              justifySelf: "center",
              color: "yellow",
              marginBottom: "8px",
            }}
          />

          <span className="stat-label text-white"> Available</span>
        </div>
        <div className="stat-item">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2974/2974498.png"
            alt=""
            style={{
              verticalAlign: "middle",
              width: "55px",
              display: "flex",
              justifySelf: "center",
              color: "yellow",
              marginBottom: "8px",
            }}
          />

          <span className="stat-label text-white">Secure your data</span>
        </div>
      </div>

      <div className="intro-div">
        <p style={{ alignItems: "anchor-center", marginBottom: "0" }}>
          Muhammad Saad Saif | Computer Science | 4th semester{" "}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
