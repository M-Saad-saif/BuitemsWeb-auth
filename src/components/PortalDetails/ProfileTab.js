import React from "react";
import "./userPortal.css";

const ProfileTab = ({ user, semesterRecords, onEditProfile }) => {
  const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return ""; // Handles empty strings or non-string input
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <title>BUITEMS - Portal | Profile</title>
      <div className="profile-tab">
        <div className="profile-header-section">
          <h2>Profile Information</h2>
          <button className="edit-profile-btn" onClick={onEditProfile}>
            <span className="btn-icon">✏️</span>
            Edit Profile
          </button>
        </div>

        <div className="profile-content-grid">
          {/* Personal Details Card */}
          <div className="profile-card">
            <div className="card-header">
              <span className="card-icon">👤</span>
              <h3>Personal Details</h3>
            </div>
            <div className="card-divider"></div>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">
                  {capitalizeFirstLetter(user.Fullname) || "Not set"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.Email || "Not set"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">CMS ID</span>
                <span className="detail-value">{user.CMS || "Not set"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Department</span>
                <span className="detail-value">
                  {capitalizeFirstLetter(user.department) || "Not set"}
                </span>
              </div>
            </div>
          </div>

          {/* Academic Summary Card */}
          <div className="profile-card">
            <div className="card-header">
              <span className="card-icon">📚</span>
              <h3>Academic Summary</h3>
            </div>
            <div className="card-divider"></div>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Current Semester</span>
                <span className="detail-value">{user.Semester || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current CGPA</span>
                <span className="detail-value highlight">
                  {parseFloat(user.currentCGPA || 0).toFixed(2)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total Credit Hours</span>
                <span className="detail-value">
                  {user.totalCreditHoursCompleted || 0}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Semesters Completed</span>
                <span className="detail-value">
                  {semesterRecords?.length || 0}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
