import React from "react";
import './userPortal.css'

const GPAAnalysisTab = ({ user, semesterRecords, onAddSemester }) => {
  const calculateGPAAnalysis = () => {
    if (!semesterRecords || semesterRecords.length === 0) {
      return {
        highestGPA: 0,
        lowestGPA: 0,
        averageGPA: 0,
        gpaTrend: [],
        totalCreditHours: 0,
        totalSubjects: 0,
      };
    }

    const sortedRecords = [...semesterRecords].sort(
      (a, b) => a.semesterNumber - b.semesterNumber,
    );

    const gpas = sortedRecords.map((record) => record.semesterGPA || 0);
    const highestGPA = Math.max(...gpas);
    const lowestGPA = Math.min(...gpas);
    const averageGPA = gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length;

    const gpaTrend = sortedRecords.map((record, index) => ({
      semester: record.semesterNumber,
      gpa: record.semesterGPA || 0,
      trend:
        index > 0
          ? (record.semesterGPA - sortedRecords[index - 1].semesterGPA).toFixed(
              2,
            )
          : "N/A",
    }));

    const totalCreditHours = sortedRecords.reduce(
      (sum, record) => sum + (record.totalCreditHours || 0),
      0,
    );
    const totalSubjects = sortedRecords.reduce(
      (sum, record) => sum + (record.subjects?.length || 0),
      0,
    );

    return {
      highestGPA,
      lowestGPA,
      averageGPA,
      gpaTrend,
      totalCreditHours,
      totalSubjects,
    };
  };

  const gpaAnalysis = calculateGPAAnalysis();

  const getGPAColor = (gpa) => {
    if (gpa >= 3.5) return "#28a745";
    if (gpa >= 3.0) return "#007bff";
    if (gpa >= 2.0) return "#ffc107";
    return "#dc3545";
  };

  const getTrendIcon = (trend) => {
    const trendNum = parseFloat(trend);
    if (trendNum > 0) return "📈";
    if (trendNum < 0) return "📉";
    return "➡️";
  };

  if (semesterRecords.length === 0) {
    return (
      <div className="gpa-analysis-tab">
        <div className="tab-header">
          <h2>GPA Analysis</h2>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No GPA Data Available</h3>
          <p>Add semester records to see GPA analysis and trends.</p>
          <button className="add-first-btn" onClick={onAddSemester}>
            <span className="btn-icon">➕</span>
            Add First Semester
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gpa-analysis-tab">
      <div className="tab-header">
        <h2>GPA Analysis</h2>
      </div>

      {/* GPA Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-high">
          <div className="stat-content">
            <div className="stat-text">
              <span className="stat-label">Highest GPA</span>
              <span className="stat-value" style={{ color: "#28a745" }}>
                {gpaAnalysis.highestGPA.toFixed(2)}
              </span>
            </div>
            <div className="stat-icon">📈</div>
          </div>
        </div>

        <div className="stat-card stat-low">
          <div className="stat-content">
            <div className="stat-text">
              <span className="stat-label">Lowest GPA</span>
              <span className="stat-value" style={{ color: "#dc3545" }}>
                {gpaAnalysis.lowestGPA.toFixed(2)}
              </span>
            </div>
            <div className="stat-icon">📉</div>
          </div>
        </div>
      </div>

      {/* GPA Trend Visualization */}
      {/* GPA Trend Visualization */}
      <div className="trend-card">
        <div className="card-header">
          <h3>GPA Trend by Semester</h3>
        </div>
        <div className="trend-visualization">
          <div className="bars-container">
            {gpaAnalysis.gpaTrend.map((item, index) => (
              <div key={index} className="bar-column">
                <div className="bar-wrapper">
                  <div
                    className="gpa-bar"
                    style={{
                      height: `${Math.max((item.gpa / 4) * 100, 5)}%`, 
                      backgroundColor: getGPAColor(item.gpa),
                    }}
                  ></div>
                </div>
                <div className="bar-labels">
                  <span className="semester-label">Sem {item.semester}</span>
                  <span
                    className="gpa-value"
                    style={{ color: getGPAColor(item.gpa) }}
                  >
                    {item.gpa.toFixed(2)}
                  </span>
                  {item.trend !== "N/A" && (
                    <span
                      className="trend-value"
                      style={{
                        color:
                          parseFloat(item.trend) > 0
                            ? "#28a745"
                            : parseFloat(item.trend) < 0
                              ? "#dc3545"
                              : "#6c757d",
                      }}
                    >
                      {parseFloat(item.trend) > 0
                        ? `+${item.trend}`
                        : item.trend}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed GPA Table */}
      <div className="details-card">
        <div className="card-header">
          <h3>Semester-wise GPA Details</h3>
        </div>
        <div className="table-container">
          <table className="gpa-table">
            <thead>
              <tr>
                <th>Semester</th>
                <th className="text-right">GPA</th>
                <th className="text-right">Subjects</th>
                <th className="text-right">Credit Hours</th>
                <th className="text-right">Trend</th>
              </tr>
            </thead>
            <tbody>
              {gpaAnalysis.gpaTrend.map((item, index) => {
                const semesterRecord = semesterRecords.find(
                  (s) => s.semesterNumber === item.semester,
                );
                return (
                  <tr key={index}>
                    <td>Semester {item.semester}</td>
                    <td className="text-right">
                      <span
                        className="gpa-badge"
                        style={{
                          backgroundColor: getGPAColor(item.gpa),
                          color: item.gpa >= 2.0 ? "#fff" : "#fff",
                        }}
                      >
                        {item.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="text-right">
                      {semesterRecord?.subjects?.length || 0}
                    </td>
                    <td className="text-right">
                      {semesterRecord?.totalCreditHours || 0}
                    </td>
                    <td className="text-right">
                      {item.trend !== "N/A" && (
                        <div className="trend-cell">
                          <span className="trend-icon">
                            {getTrendIcon(item.trend)}
                          </span>
                          <span
                            className="trend-text"
                            style={{
                              color:
                                parseFloat(item.trend) > 0
                                  ? "#28a745"
                                  : parseFloat(item.trend) < 0
                                    ? "#dc3545"
                                    : "#6c757d",
                            }}
                          >
                            {parseFloat(item.trend) > 0
                              ? `+${item.trend}`
                              : item.trend}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr className="total-row">
                <td>
                  <strong>Overall</strong>
                </td>
                <td className="text-right">
                  <span className="overall-gpa">
                    {parseFloat(user?.currentCGPA || 0).toFixed(2)}
                  </span>
                </td>
                <td className="text-right">
                  <strong>{gpaAnalysis.totalSubjects}</strong>
                </td>
                <td className="text-right">
                  <strong>{gpaAnalysis.totalCreditHours}</strong>
                </td>
                <td className="text-right">
                  <span className="cgpa-label">CGPA</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GPAAnalysisTab;
