import React, { useState } from "react";
import "./userPortal.css";

const EditProfileDialog = ({
  open,
  onClose,
  profileData,
  setProfileData,
  handleUpdateProfile,
  handleProfilePicUpload,
}) => {
  const [uploading, setUploading] = useState(false);
  // const [UploadMessageType, setUploadMessageType] = useState("");
  // const [UploadMessage, setUploadMessage] = useState("");
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const uploadingPFP = (e) => {
    setUploading(true);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }

    handleProfilePicUpload(e);

    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={handleBackdropClick}>
      <div className="dialog-container">
        <div className="dialog-header">
          <h2 className="dialog-title">Edit Profile</h2>
        </div>

        <div className="dialog-content">
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label required">Full Name</label>
              <input
                type="text"
                className={`form-input ${!profileData.Fullname.trim() ? "error" : ""}`}
                value={profileData.Fullname}
                onChange={(e) =>
                  setProfileData({ ...profileData, Fullname: e.target.value })
                }
                placeholder="Enter your full name"
                required
              />
              {!profileData.Fullname.trim() && (
                <span className="error-text">Full name is required</span>
              )}
            </div>

            {/* Current Semester */}
            <div className="form-group">
              <label className="form-label required">Current Semester</label>
              <select
                className="form-select"
                value={profileData.Semester}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    Semester: parseInt(e.target.value) || 1,
                  })
                }
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    Semester {num}
                  </option>
                ))}
              </select>
            </div>

            {/* CMS ID */}
            <div className="form-group">
              <label className="form-label required">CMS ID</label>
              <input
                type="text"
                className={`form-input ${!profileData.CMS ? "error" : ""}`}
                value={profileData.CMS}
                onChange={(e) =>
                  setProfileData({ ...profileData, CMS: e.target.value })
                }
                placeholder="Enter your CMS ID"
                required
              />
              {!profileData.CMS && (
                <span className="error-text">CMS ID is required</span>
              )}
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-input"
                value={profileData.department}
                onChange={(e) =>
                  setProfileData({ ...profileData, department: e.target.value })
                }
                placeholder="Enter your department"
              />
            </div>

            <div className="profile-upload-section">
              <label htmlFor="profilePicInput" className="upload-label">
                <input
                  id="profilePicInput"
                  type="file"
                  name="profilepic"
                  className="file-input"
                  onChange={uploadingPFP}
                  disabled={uploading}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button
                  style={{ background: "#077eff", color: "white" }}
                  className="btn btn-info btn-sm"
                  disabled={uploading}
                  type="button"
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                >
                  {uploading ? "Uploading..." : "Choose Profile Picture"}
                </button>
              </label>

              {/* Image Preview */}
              {profileData.profileImage && (
                <div className="image-preview">
                  <div className="preview-label">Preview:</div>
                  <img
                    src={profileData.profileImage}
                    alt="Profile preview"
                    className="preview-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "block";
                    }}
                  />
                  <div className="preview-fallback" style={{ display: "none" }}>
                    <div className="fallback-icon">🖼️</div>
                    <div className="fallback-text">Invalid image URL</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dialog Actions */}
        <div className="dialog-actions">
          <button className="btn-cancel" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="btn-save"
            onClick={handleUpdateProfile}
            disabled={!profileData.Fullname.trim() || !profileData.CMS}
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileDialog;
