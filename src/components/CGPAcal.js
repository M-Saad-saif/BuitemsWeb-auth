import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";
import buitemsLogo from "./images/buitems logo.png";

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState([]);
  const [semesterInput, setSemesterInput] = useState("");
  const [gpaInput, setGpaInput] = useState("");
  const [creditInput, setCreditInput] = useState("");
  const [semesterError, setSemesterError] = useState("");
  const [gpaError, setGpaError] = useState("");
  const [creditError, setCreditError] = useState("");
  const [cgpa, setCgpa] = useState("0.00");
  const [visibleRows, setVisibleRows] = useState(0);

  const pdfContentRef = useRef(null);

  const maxRows = 15; // Maximum number of semesters

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((semester) => {
      const gpa = parseFloat(semester.gpa);
      const credits = parseFloat(semester.credits);

      if (!isNaN(gpa) && !isNaN(credits)) {
        totalPoints += gpa * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      const totalCGPA = totalPoints / totalCredits;
      setCgpa(totalCGPA.toFixed(2));
    } else {
      setCgpa("0.00");
    }
  };

  const addSemester = () => {
    // Reset errors
    setSemesterError("");
    setGpaError("");
    setCreditError("");

    let hasError = false;

    // Validation
    if (!semesterInput.trim()) {
      setSemesterError("Enter a semester");
      hasError = true;
    }

    if (
      !gpaInput.trim() ||
      isNaN(gpaInput) ||
      parseFloat(gpaInput) > 4.0 ||
      parseFloat(gpaInput) < 0.0
    ) {
      setGpaError("Enter valid number (0.00 - 4.00)");
      hasError = true;
    }

    if (!creditInput.trim() || isNaN(creditInput)) {
      setCreditError("Enter a valid number");
      hasError = true;
    }

    if (hasError) return;

    // Check if maximum rows reached
    if (visibleRows >= maxRows) {
      alert("Maximum number of semesters reached (9)");
      return;
    }

    // Add new semester
    const newSemester = {
      id: Date.now(),
      name: semesterInput,
      gpa: gpaInput,
      credits: creditInput,
    };

    setSemesters((prev) => [...prev, newSemester]);
    setVisibleRows((prev) => prev + 1);

    // Reset inputs
    setSemesterInput("");
    setGpaInput("");
    setCreditInput("");
  };

  const deleteSemester = (id) => {
    const updatedSemesters = semesters.filter((semester) => semester.id !== id);
    setSemesters(updatedSemesters);
    setVisibleRows((prev) => prev - 1);
  };

  const generatePDF = () => {
    const element = pdfContentRef.current;
    const opt = {
      margin: 10.5,
      filename: "CGPA file.pdf",
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
      pagebreak: {
        mode: ["css"],
      },
    };

    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    calculateCGPA();
     // eslint-disable-next-line
  }, [semesters]);

  return (
    <div className="Cgpa-container">
      <img src={buitemsLogo} alt="BUITEMS Logo" id="logoimg-Cgpa-sec" />
      <h2 style={{ marginTop: "-21px" }}>CGPA Calculator</h2>

      <div className="Cgpa-inputs">
        <label htmlFor="sem-input">Semester</label>
        <input
          type="text"
          placeholder="Enter semester"
          id="sem-input"
          value={semesterInput}
          onChange={(e) => setSemesterInput(e.target.value)}
        />
        {semesterError && <p id="sem-validation">{semesterError}</p>}

        <label htmlFor="gpa-input">GPA</label>
        <input
          type="text"
          placeholder="Enter GPA (0.00 - 4.00)"
          id="gpa-input"
          value={gpaInput}
          onChange={(e) => setGpaInput(e.target.value)}
        />
        {gpaError && <p id="gpa-validation">{gpaError}</p>}

        <label htmlFor="CGPAcrdt-hrs-input">Total Credit hours</label>
        <input
          type="text"
          placeholder="Enter total credit hours"
          id="CGPAcrdt-hrs-input"
          value={creditInput}
          onChange={(e) => setCreditInput(e.target.value)}
        />
        {creditError && <p id="crdt-validation">{creditError}</p>}
      </div>

      <div className="cgpa-buttons">
        <button id="adding-semester-btn" onClick={addSemester}>
          Add Semester
        </button>
        <button id="cgpa-pdf-btn" onClick={generatePDF}>
          Save your CGPA as PDF
        </button>
      </div>

      <div id="pdfcontent" ref={pdfContentRef}>
        <table>
          <thead>
            <tr id="table-hdng">
              <th>Semester name</th>
              <th>GPA</th>
              <th>Credit hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester) => (
              <tr key={semester.id} className="table-bdy">
                <td>{semester.name}</td>
                <td>{semester.gpa}</td>
                <td>{semester.credits}</td>
                <td>
                  <button
                    className="deletebtn"
                    onClick={() => deleteSemester(semester.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty rows for formatting */}
            {Array.from({
              length: Math.max(0, maxRows - semesters.length),
            }).map((_, index) => (
              <tr
                key={`empty-${index}`}
                className="table-bdy"
                style={{ display: "none" }}
              >
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>
                  <button className="deletebtn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 id="ans-disp">
          Your CGPA is: <span id="answer-para">{cgpa}</span>
        </h3>
      </div>

      <Link to="/">
        <button id="homepg">Home</button>
      </Link>
    </div>
  );
};

export default CGPACalculator;
