import React from "react";
import "./userPortal.css";
import { InfinitySpin } from "react-loader-spinner";

const ProfileHeader = ({ user, profileLoading, HandleLogout }) => {
  const ClickHandleLogout = () => {
    HandleLogout();
  };

  const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return ""; // Handles empty strings or non-string input
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (profileLoading) {
    return (
      <div className="profile-header profile-header-loading">
        <div className="text-center">
          <InfinitySpin width="200" color="#4d6aa9" />
          <h6>Loading profile...</h6>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-header">
      <div className="profile-content">
        <div className="profile-avatar-container">
          <img
            src={
              user.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={user.Fullname || "User"}
            className="profile-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              e.target.style.backgroundColor = "#2196F3";
              e.target.style.color = "white";
              e.target.style.display = "flex";
              e.target.style.alignItems = "center";
              e.target.style.justifyContent = "center";
              e.target.style.fontSize = "40px";
              e.target.textContent = user.Fullname.charAt(0) || "U";
            }}
          />
        </div>

        <div className="profile-info">
          <div className="information">
            <h1 className="profile-name">
              {capitalizeFirstLetter(user.Fullname) || "User"}
            </h1>
            <h2 className="profile-subtitle">
              {capitalizeFirstLetter(user.department) || "No Department"} •
              Semester {user.Semester || "N/A"}
            </h2>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-icon"></span>
              <span className="detail-text">
                <i className="ri-mail-line"></i> {user.Email || "No Email"}
              </span>
            </div>

            {user.CMS && (
              <div className="detail-item">
                <span className="detail-icon"></span>
                <span className="detail-text">CMS: {user.CMS}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button id="LogoutBTN" onClick={ClickHandleLogout}>
            Logout <i className="ri-logout-box-r-line"></i>
          </button>

          <div className="profile-cgpa">
            <div className="cgpa-chip">
              <span className="cgpa-label">CGPA:</span>
              <span className="cgpa-value">
                {parseFloat(user.currentCGPA || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
