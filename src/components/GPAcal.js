import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import buitemsLogo from "./images/buitems logo.png";

const GPACalculator = () => {
  const [courses, setCourses] = useState([]);
  const [courseInput, setCourseInput] = useState("");
  const [gradeInput, setGradeInput] = useState("");
  const [creditInput, setCreditInput] = useState("1");
  const [courseError, setCourseError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [gpa, setGpa] = useState("0.00");

  const pdfContentRef = useRef(null);

  const gradeOptions = [
    { value: "", label: "Select grade" },
    { value: "F", label: "49% or below (F)" },
    { value: "D", label: "50% - 54% (D)" },
    { value: "C-", label: "55% - 57% (C-)" },
    { value: "C", label: "58% - 60% (C)" },
    { value: "C+", label: "61% - 64% (C+)" },
    { value: "B-", label: "65% - 69% (B-)" },
    { value: "B", label: "70% - 74% (B)" },
    { value: "B+", label: "75% - 79% (B+)" },
    { value: "A-", label: "80% - 84% (A-)" },
    { value: "A", label: "85% or above (A)" },
  ];

  const creditOptions = ["1", "2", "3", "4", "5", "6"];

  const gpaMap = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    D: 1.0,
    F: 0.0,
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const gradePoints = gpaMap[course.grade] || 0;
      const credits = parseFloat(course.credits);
      totalPoints += gradePoints * credits;
      totalCredits += credits;
    });

    if (totalCredits > 0) {
      const finalGPA = totalPoints / totalCredits;
      setGpa(finalGPA.toFixed(2));
    } else {
      setGpa("0.00");
    }
  };

  const addCourse = () => {
    // Reset errors
    setCourseError("");
    setGradeError("");

    // Validation
    let hasError = false;

    if (!courseInput.trim()) {
      setCourseError("Enter course please");
      hasError = true;
    }

    if (!gradeInput) {
      setGradeError("Enter grade please");
      hasError = true;
    }

    if (hasError) return;

    // Add new course
    const newCourse = {
      id: Date.now(),
      name: courseInput.toUpperCase(),
      grade: gradeInput,
      credits: creditInput,
    };

    setCourses((prev) => [...prev, newCourse]);

    // Reset inputs
    setCourseInput("");
    setGradeInput("");
    setCreditInput("1");
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const generatePDF = () => {
    const element = pdfContentRef.current;
    const opt = {
      margin: 10.5,
      filename: "GPA.pdf",
      image: { type: "jpeg", quality: 1 },
      scale: 3,
      html2canvas: {
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape",
      },
      pagebreak: { mode: ["css"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    calculateGPA();
    // eslint-disable-next-line
  }, [courses]);

  return (
    <>
    <title>BUITEMS - GPA Calculator</title>
    <div className="gpa-container">
      <img src={buitemsLogo} alt="BUITEMS Logo" id="logoimg-gpa-sec" />
      <h2 style={{ marginTop: "-21px" }}>GPA Calculator</h2>

      <div className="gpa-inputs">
        <label htmlFor="course-input">Course</label>
        <input
          type="text"
          placeholder="Enter course"
          id="course-input"
          value={courseInput}
          onChange={(e) => setCourseInput(e.target.value)}
        />
        {courseError && <p id="crs-validation">{courseError}</p>}

        <label htmlFor="grade-input">Grade percentage</label>
        <select
          id="grade-input"
          value={gradeInput}
          onChange={(e) => setGradeInput(e.target.value)}
        >
          {gradeOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {gradeError && <p id="grade-valid">{gradeError}</p>}

        <label htmlFor="crdt-hrs-input">Credit hours</label>
        <select
          id="crdt-hrs-input"
          value={creditInput}
          onChange={(e) => setCreditInput(e.target.value)}
        >
          {creditOptions.map((credit, index) => (
            <option key={index} value={credit}>
              {credit}
            </option>
          ))}
        </select>
      </div>

      <div className="gpa-buttons">
        <button id="adding-crs-btn" onClick={addCourse}>
          Add course
        </button>
        <button id="gen-pdf" onClick={generatePDF}>
          Save your GPA
        </button>
      </div>

      <div className="pdf-content" ref={pdfContentRef}>
        <table id="whole-timetable">
          <thead>
            <tr id="table-hdng">
              <th>Course name</th>
              <th>Grade</th>
              <th>Credit hours</th>
              <th className="no-print">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="table-bdy">
                <td>{course.name}</td>
                <td>{course.grade}</td>
                <td>{course.credits}</td>
                <td className="no-print">
                  <button
                    className="deletebtn"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {/* Placeholder rows for empty spaces */}
            {Array.from({ length: Math.max(0, 10 - courses.length) }).map(
              (_, index) => (
                <tr
                  key={`empty-${index}`}
                  className="table-bdy"
                  style={{ display: "none" }}
                >
                  <td>00</td>
                  <td>00</td>
                  <td>00</td>
                  <td className="no-print">
                    <button className="deletebtn">Delete</button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>

        <h3 id="ans-disp">
          Your GPA is: <span id="answer-para">{gpa}</span>
        </h3>
      </div>

      <Link to="/">
        <button id="homepg">Home</button>
      </Link>
    </div>
    </>

  );
};

export default GPACalculator;
