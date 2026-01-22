import React, { useState, useEffect } from "react";
import axios from "axios";

import ProfileHeader from "./PortalDetails/ProfileHeader";
import ProfileTab from "./PortalDetails/ProfileTab";
import SemesterRecordsTab from "./PortalDetails/SemesterRecordsTab ";
import GPAAnalysisTab from "./PortalDetails/GPAAnalysisTab";
import GPACalculatorTab from "./PortalDetails/GPACalculatorTab";
import AddSemesterDialog from "./PortalDetails/AddSemesterDialog";
import EditProfileDialog from "./PortalDetails/EditProfileDialog";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export const GRADE_POINTS = {
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

const UserPortal = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [semesterRecords, setSemesterRecords] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [openAddSemester, setOpenAddSemester] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [newSemester, setNewSemester] = useState({
    semesterNumber: 1,
    subjects: [{ name: "", creditHours: 3, grade: "A" }],
  });
  const [profileData, setProfileData] = useState({
    Fullname: "",
    Semester: 0,
    CMS: "",
    department: "",
    profileImage: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchSemesterRecords();
    } else {
      setLoading(false);
      setProfileLoading(false);
      setRecordsLoading(false);
      showSnackbar("Please login first", "error");
    }
    // eslint-disable-next-line
  }, [token]);

  const fetchUserData = async () => {
    try {
      setProfileLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: { "auth-token": token },
        },
      );

      console.log("Profile API Response:", response.data);

      if (response.data.success) {
        setUser(response.data.profile);
        setProfileData({
          Fullname: response.data.profile.Fullname || "",
          Semester: response.data.profile.Semester || 1,
          CMS: response.data.profile.CMS || "",
          department: response.data.profile.department || "",
          profileImage: response.data.profile.profileImage || "",
        });
      } else {
        showSnackbar(
          response.data.error || "Failed to fetch user data",
          "error",
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showSnackbar(
        error.response?.data?.error ||
          "Failed to fetch user data. Please try logging in again.",
        "error",
      );
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setProfileLoading(false);
      setLoading(false);
    }
  };

  const fetchSemesterRecords = async () => {
    try {
      setRecordsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/auth/semester-records",
        {
          headers: { "auth-token": token },
        },
      );

      console.log("Semester Records Response:", response.data);

      if (response.data.success) {
        setSemesterRecords(response.data.semesterRecords || []);
      } else {
        showSnackbar(
          response.data.error || "Failed to fetch semester records",
          "error",
        );
      }
    } catch (error) {
      console.error("Error fetching semester records:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to fetch semester records",
        "error",
      );
    } finally {
      setRecordsLoading(false);
    }
  };

  const handleAddSubject = () => {
    setNewSemester((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", creditHours: 3, grade: "A" }],
    }));
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = [...newSemester.subjects];
    newSubjects.splice(index, 1);
    setNewSemester({ ...newSemester, subjects: newSubjects });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...newSemester.subjects];
    newSubjects[index][field] = value;
    setNewSemester({ ...newSemester, subjects: newSubjects });
  };

  const handleAddSemester = async () => {
    const invalidSubjects = newSemester.subjects.filter(
      (subject) => !subject.name.trim(),
    );
    if (invalidSubjects.length > 0) {
      showSnackbar("Please fill all subject names", "error");
      return;
    }

    const validGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
    const invalidGrades = newSemester.subjects.filter(
      (subject) => !validGrades.includes(subject.grade),
    );

    if (invalidGrades.length > 0) {
      console.error("Invalid grades found:", invalidGrades);
      showSnackbar(
        `Invalid grade: ${invalidGrades[0].grade}. Please select a valid grade from the dropdown.`,
        "error",
      );
      return;
    }

    console.log(
      "Sending data with grades:",
      newSemester.subjects.map((s) => s.grade),
    );

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/add-semester",
        newSemester,
        {
          headers: { "auth-token": token },
        },
      );

      if (response.data.success) {
        showSnackbar("Semester added successfully!", "success");
        setOpenAddSemester(false);
        fetchSemesterRecords();
        fetchUserData();
        setNewSemester({
          semesterNumber: 1,
          subjects: [{ name: "", creditHours: 3, grade: "A" }],
        });
      } else {
        showSnackbar(response.data.error || "Failed to add semester", "error");
      }
    } catch (error) {
      console.error("Error adding semester:", error.response?.data);
      showSnackbar(
        error.response?.data?.error || "Failed to add semester",
        "error",
      );
    }
  };

  const handleDeleteSemester = async (semesterNumber) => {
    if (
      window.confirm(
        `Are you sure you want to delete semester ${semesterNumber}? This action cannot be undone.`,
      )
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/auth/delete-semester/${semesterNumber}`,
          {
            headers: { "auth-token": token },
          },
        );

        if (response.data.success) {
          showSnackbar("Semester deleted successfully!", "success");
          fetchSemesterRecords();
          fetchUserData();
        } else {
          showSnackbar(
            response.data.error || "Failed to delete semester",
            "error",
          );
        }
      } catch (error) {
        console.error("Error deleting semester:", error);
        showSnackbar(
          error.response?.data?.error || "Failed to delete semester",
          "error",
        );
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (!profileData.Fullname.trim()) {
      showSnackbar("Full name is required", "error");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        profileData,
        {
          headers: { "auth-token": token },
        },
      );

      if (response.data.success) {
        showSnackbar("Profile updated successfully!", "success");
        setOpenEditProfile(false);
        fetchUserData();
      } else {
        showSnackbar(
          response.data.error || "Failed to update profile",
          "error",
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showSnackbar(
        error.response?.data?.error || "Failed to update profile",
        "error",
      );
    }
  };

  const showSnackbar = (message, type) => {
    setSnackbar({ open: true, message, type });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [logout, setLoggingOut] = useState(false);
  const HandleLogout = () => {
    setLoggingOut(true);
    localStorage.removeItem("token");

    setUser(null);

    setTimeout(() => {
      navigate("/");
      setLoggingOut(false);
    }, 1500);
  };

  // Logging out
  if (logout) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3 className="loading-text">Logging OUT please wait</h3>
      </div>
    );
  }

  // Loading state
  if (loading && !user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3 className="loading-text">Loading User Portal...</h3>
      </div>
    );
  }

  // No user state or token expired
  if (!user || !token) {
    return (
      <div className="session-expired">
        <div className="expired-icon">🎓</div>
        <h2>Session Expired or User Not Found</h2>
        <p>Please login again to access the portal</p>
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="user-portal-container">
      {/* Header */}
      <ProfileHeader
        user={user}
        profileLoading={profileLoading}
        HandleLogout={HandleLogout}
      />

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab-btn ${currentTab === 0 ? "active" : ""}`}
            onClick={() => setCurrentTab(0)}
          >
            <span className="tab-icon">👤</span>
            <span className="tab-label">Profile</span>
          </button>
          <button
            className={`tab-btn ${currentTab === 1 ? "active" : ""}`}
            onClick={() => setCurrentTab(1)}
          >
            <span className="tab-icon">📚</span>
            <span className="tab-label">Semester Records</span>
          </button>
          <button
            className={`tab-btn ${currentTab === 2 ? "active" : ""}`}
            onClick={() => setCurrentTab(2)}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-label">GPA Analysis</span>
          </button>
          <button
            className={`tab-btn ${currentTab === 3 ? "active" : ""}`}
            onClick={() => setCurrentTab(3)}
          >
            <span className="tab-icon">🧮</span>
            <span className="tab-label">GPA Calculator</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {currentTab === 0 && (
        <ProfileTab
          user={user}
          semesterRecords={semesterRecords}
          onEditProfile={() => setOpenEditProfile(true)}
        />
      )}

      {currentTab === 1 && (
        <SemesterRecordsTab
          semesterRecords={semesterRecords}
          recordsLoading={recordsLoading}
          onAddSemester={() => setOpenAddSemester(true)}
          onDeleteSemester={handleDeleteSemester}
        />
      )}

      {currentTab === 2 && (
        <GPAAnalysisTab
          user={user}
          semesterRecords={semesterRecords}
          onAddSemester={() => setOpenAddSemester(true)}
        />
      )}

      {currentTab === 3 && (
        <GPACalculatorTab onAddSemester={() => setOpenAddSemester(true)} />
      )}

      {/* Dialogs */}
      <AddSemesterDialog
        open={openAddSemester}
        onClose={() => setOpenAddSemester(false)}
        newSemester={newSemester}
        setNewSemester={setNewSemester}
        handleAddSubject={handleAddSubject}
        handleRemoveSubject={handleRemoveSubject}
        handleSubjectChange={handleSubjectChange}
        handleAddSemester={handleAddSemester}
      />

      <EditProfileDialog
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
        profileData={profileData}
        setProfileData={setProfileData}
        handleUpdateProfile={handleUpdateProfile}
      />

      {/* snackbar */}
      {snackbar.open && (
        <div className={`snackbar snackbar-${snackbar.type}`}>
          <span className="snackbar-message">{snackbar.message}</span>
          <button onClick={handleCloseSnackbar} className="snackbar-close-btn">
            ✕
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserPortal;
