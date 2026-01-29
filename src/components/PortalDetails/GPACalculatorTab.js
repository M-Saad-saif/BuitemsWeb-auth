import React from "react";
import "./userPortal.css";

const GRADE_POINTS = {
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

const MARKS_RANGE = {
  A: "85-100",
  "A-": "80-84",
  "B+": "75-79",
  B: "70-74",
  "B-": "65-69",
  "C+": "61-64 ",
  C: "58-60",
  "C-": "55-57",
  D: "50-54",
  F: "0-49",
};

const getPerformanceText = (grade) => {
  if (["A", "A-"].includes(grade)) return "Excellent";
  if (["B+", "B", "B-"].includes(grade)) return "Good";
  if (["C+", "C", "C-"].includes(grade)) return "Work hard";
  return "Rehny dy bhai";
};

const getGradeColor = (grade) => {
  if ([ "A", "A-"].includes(grade)) return "grade-a";
  if (["B+", "B", "B-"].includes(grade)) return "grade-b";
  if (["C+", "C", "C-"].includes(grade)) return "grade-c";
  return "grade-df";
};

const GPACalculatorTab = ({ onAddSemester }) => {
  return (
    <>
    <title>BUITEMS - Portal | GPA Calculator</title>
    <div className="gpa-calculator-tab">
      <div className="tab-header">
        <h2>GPA Calculator</h2>
      </div>

      <div className="intro-text">
        <p>
          Use this calculator to estimate your GPA before adding it to your
          records.
        </p>
      </div>

      {/* Grade Points Reference Table */}
      <div className="reference-card">
        <div className="card-header">
          <h3>Grade Points Reference</h3>
        </div>
        <div className="table-container">
          <table className="grade-table">
            <thead>
              <tr>
                <th>Grade</th>
                <th>Grade Points</th>
                <th>Marks Range</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(GRADE_POINTS).map((grade) => (
                <tr key={grade}>
                  <td>
                    <span className={`grade-badge ${getGradeColor(grade)}`}>
                      {grade}
                    </span>
                  </td>
                  <td>
                    <span className="grade-points">{GRADE_POINTS[grade]}</span>
                  </td>
                  <td>
                    <span className="marks-range">{MARKS_RANGE[grade]}</span>
                  </td>
                  <td>
                    <span className="performance-text">
                      {getPerformanceText(grade)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Button */}
      <div className="action-section">
        <button className="add-semester-btn" onClick={onAddSemester}>
          <span className="btn-icon">➕</span>
          Add New Semester Record
        </button>
      </div>
    </div>
    </>

  );
};

export default GPACalculatorTab;
