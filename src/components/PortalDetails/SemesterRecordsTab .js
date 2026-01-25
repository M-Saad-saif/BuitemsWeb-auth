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

const SemesterRecordsTab = ({
  semesterRecords,
  recordsLoading,
  onAddSemester,
  onDeleteSemester,
}) => {
  const getGradeColor = (grade) => {
    if (["A", "A-"].includes(grade)) return "grade-a";
    if (["B+", "B", "B-"].includes(grade)) return "grade-b";
    if (["C+", "C", "C-"].includes(grade)) return "grade-c";
    if (["D", "F"].includes(grade)) return "grade-df";
    return "grade-df";  
  };

  if (recordsLoading) {
    return (
      <>
        <title>BUITEMS - Portal | Semester Records</title>
        <div className="semester-tab">
          <div className="tab-header">
            <h2>Semester Records</h2>
            <button className="add-semester-btn" onClick={onAddSemester}>
              <span className="btn-icon">➕</span>
              Add New Semester
            </button>
          </div>
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading semester records...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>BUITEMS - Portal | Semester Records</title>
      <div className="semester-tab">
        <div className="tab-header">
          <h2>Semester Records</h2>
          <button className="add-semester-btn" onClick={onAddSemester}>
            <span className="btn-icon">➕</span>
            Add New Semester
          </button>
        </div>

        {semesterRecords.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Semester Records Found</h3>
            <p>
              Add your first semester record to start tracking your academic
              progress.
            </p>
            <button className="add-first-btn" onClick={onAddSemester}>
              <span className="btn-icon">➕</span>
              Add First Semester
            </button>
          </div>
        ) : (
          <div className="semester-list">
            {semesterRecords
              .sort((a, b) => a.semesterNumber - b.semesterNumber)
              .map((semester) => (
                <div
                  key={semester._id || semester.semesterNumber}
                  className="semester-card"
                >
                  <div className="semester-header">
                    <div className="semester-title">
                      <h3>Semester {semester.semesterNumber}</h3>
                      <span className="semester-gpa">
                        GPA: {parseFloat(semester.semesterGPA || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="semester-actions">
                      <span className="credit-hours-badge">
                        {semester.totalCreditHours || 0} Credit Hours
                      </span>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          onDeleteSemester(semester.semesterNumber)
                        }
                        title="Delete Semester"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="subjects-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th className="text-right">Credit Hours</th>
                          <th className="text-right">Grade</th>
                          <th className="text-right">Grade Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.subjects.map((subject, idx) => (
                          <tr key={idx}>
                            <td>{subject.name}</td>
                            <td className="text-right">
                              {subject.creditHours}
                            </td>
                            <td className="text-right">
                              <span
                                className={`grade-badge ${getGradeColor(subject.grade)}`}
                              >
                                {subject.grade}
                              </span>
                            </td>
                            <td className="text-right">
                              {(
                                (GRADE_POINTS[subject.grade] || 0) *
                                subject.creditHours
                              ).toFixed(1)}
                            </td>
                          </tr>
                        ))}
                        <tr className="total-row">
                          <td colSpan="2">
                            <strong>Total</strong>
                          </td>
                          <td className="text-right">
                            <strong>GPA:</strong>
                          </td>
                          <td className="text-right">
                            <strong className="total-gpa">
                              {parseFloat(semester.semesterGPA || 0).toFixed(2)}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SemesterRecordsTab;
