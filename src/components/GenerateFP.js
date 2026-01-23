import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import BuitemsLogo from "./images/buitems logo.png";
import BackgroundImage1 from "./images/ass pg 1.png";
import BackgroundImage2 from "./images/ass pg 2.png";
import BackgroundImage3 from "./images/ass pg 3.png";
import BackgroundImage4 from "./images/ass pg 4.png";

const GenerateFP = () => {
  const { id } = useParams();
  const designNumber = id || "1";

  const [formData, setFormData] = useState({
    name: "",
    cms: "",
    course: "",
    topic: "",
    department: "",
    semester: "",
    submitTo: "",
    date: "",
  });

  const pdfContentRef = useRef(null);

  const backgroundImages = {
    1: BackgroundImage1,
    2: BackgroundImage2,
    3: BackgroundImage3,
    4: BackgroundImage4,
  };

  const backgroundImage = backgroundImages[designNumber];

  //   setting positions of text
  const getTextPositions = (designNum) => {
    const positions = {
      1: {
        name: { top: "150mm", left: "70mm" },
        cms: { top: "158mm", left: "61mm" },
        course: { top: "165mm", left: "64mm" },
        topic: { top: "172mm", left: "62mm" },
        department: { top: "180mm", left: "76mm" },
        semester: { top: "187mm", left: "72mm" },
        submitTo: { top: "194mm", left: "72mm" },
        date: { top: "202mm", left: "60mm" },
      },
      2: {
        name: { top: "151mm", left: "66mm" },
        cms: { top: "161mm", left: "63mm" },
        course: { top: "170mm", left: "70mm" },
        topic: { top: "179mm", left: "67mm" },
        department: { top: "189mm", left: "82mm" },
        semester: { top: "198mm", left: "74mm" },
        submitTo: { top: "207mm", left: "77mm" },
        date: { top: "216mm", left: "63mm" },
      },
      3: {
        name: { top: "137mm", left: "77mm" },
        cms: { top: "148mm", left: "69mm" },
        course: { top: "159mm", left: "78mm" },
        topic: { top: "181mm", left: "74mm" },
        department: { top: "192mm", left: "93mm" },
        semester: { top: "203mm", left: "84mm" },
        submitTo: { top: "170mm", left: "94mm" },
        date: { top: "214mm", left: "70mm" },
      },
      4: {
        name: { top: "105mm", left: "43mm" },
        cms: { top: "117mm", left: "39mm" },
        course: { top: "128mm", left: "46mm" },
        topic: { top: "152mm", left: "43mm" },
        department: { top: "163mm", left: "61mm" },
        semester: { top: "175mm", left: "51mm" },
        submitTo: { top: "140mm", left: "59mm" },
        date: { top: "186mm", left: "41mm" },
      },
    };

    return positions[designNum] || positions["1"];
  };

  const textPositions = getTextPositions(designNumber);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // useEffect(() => {
  //   document.title = `BUITEMS - FrontPage Design ${designNumber}`;
  // }, [designNumber]);

  const generatePDF = () => {
    const element = pdfContentRef.current;
    if (!element) {
      console.error("PDF content element not found");
      return;
    }

    // Set the text content
    document.querySelector("#input1-d0").textContent = formData.name;
    document.querySelector("#input2-d0").textContent = formData.cms;
    document.querySelector("#input3-d0").textContent = formData.course;
    document.querySelector("#input4-d0").textContent = formData.topic;
    document.querySelector("#input5-d0").textContent = formData.department;
    document.querySelector("#input6-d0").textContent = formData.semester;
    document.querySelector("#input7-d0").textContent = formData.submitTo;
    document.querySelector("#input8-d0").textContent = formData.date;

    // Check if image is loaded
    const image = document.getElementById("bg-image");
    const createPDF = () => {
      const opt = {
        margin: 0,
        filename: `AssignmentFrontpage-Design${designNumber}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(opt).from(element).save();
    };

    if (!image.complete) {
      image.onload = () => {
        createPDF();
      };
    } else {
      createPDF();
    }
  };

  return (
    <>
      <title>{`BUITEMS - FrontPage Design ${designNumber}`}</title>

      <div className="design-container">
        <div className="image-input-container-design">
          <img src={BuitemsLogo} alt="BUITEMS Logo" id="logoimg-design-sec" />

          <h2 style={{ marginTop: "-21px" }} id="design-heading">
            Front Page - Design {designNumber}
          </h2>

          <div className="allinputs">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <label htmlFor="cms">CMS:</label>
            <input
              type="text"
              placeholder="Enter CMS"
              id="cms"
              value={formData.cms}
              onChange={handleInputChange}
            />

            <label htmlFor="course">Course:</label>
            <input
              type="text"
              placeholder="Enter Course name"
              id="course"
              value={formData.course}
              onChange={handleInputChange}
            />

            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              placeholder="Enter Topic (optional)"
              id="topic"
              value={formData.topic}
              onChange={handleInputChange}
            />

            <label htmlFor="department">Department:</label>
            <input
              type="text"
              placeholder="Enter Department"
              id="department"
              value={formData.department}
              onChange={handleInputChange}
            />

            <label htmlFor="semester">Semester:</label>
            <input
              type="text"
              placeholder="Enter semester"
              id="semester"
              value={formData.semester}
              onChange={handleInputChange}
            />

            <label htmlFor="submitTo">Submit To:</label>
            <input
              type="text"
              placeholder="Enter Instructor name"
              id="submitTo"
              value={formData.submitTo}
              onChange={handleInputChange}
            />

            <label htmlFor="date">Date:</label>
            <input
              type="text"
              placeholder="Enter date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="action-buttons">
            <button onClick={generatePDF} className="saveBTN">
              Save to PDF
            </button>
            <Link to="/frontpages">
              <button id="back-to-designBTN" className="saveBTN">
                <i className="ri-arrow-left-fill"></i>Back to designs
              </button>
            </Link>
          </div>
        </div>

        {/* PDF Content */}
        <div id="pdf-content" ref={pdfContentRef} style={{}}>
          <img
            id="bg-image"
            src={backgroundImage}
            alt={`Front Page Design ${designNumber}`}
          />
          <div className="dynamic-inputs">
            <p
              id="input1-d0"
              style={{
                position: "absolute",
                top: textPositions.name.top,
                left: textPositions.name.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
            <p
              id="input2-d0"
              style={{
                position: "absolute",
                top: textPositions.cms.top,
                left: textPositions.cms.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
            <p
              id="input3-d0"
              style={{
                position: "absolute",
                top: textPositions.course.top,
                left: textPositions.course.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
            <p
              id="input4-d0"
              style={{
                position: "absolute",
                top: textPositions.topic.top,
                left: textPositions.topic.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
            <p
              id="input5-d0"
              style={{
                position: "absolute",
                top: textPositions.department.top,
                left: textPositions.department.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
            <p
              id="input6-d0"
              style={{
                position: "absolute",
                top: textPositions.semester.top,
                left: textPositions.semester.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
            <p
              id="input7-d0"
              style={{
                position: "absolute",
                top: textPositions.submitTo.top,
                left: textPositions.submitTo.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
            <p
              id="input8-d0"
              style={{
                position: "absolute",
                top: textPositions.date.top,
                left: textPositions.date.left,
                fontSize: "16pt",
                fontFamily: "Arial, sans-serif",
                margin: "0",
                padding: "0",
              }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateFP;
