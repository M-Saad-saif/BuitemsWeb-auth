// components/PortalDetails/ProfileHeader.jsx
import React from 'react';

const ProfileHeader = ({ user, profileLoading }) => {
  if (profileLoading) {
    return (
      <div className="profile-header profile-header-loading">
        <div className="spinner"></div>
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-header">
      <div className="profile-content">
        <div className="profile-avatar-container">
          <img 
            src={user?.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
            alt={user?.Fullname || 'User'}
            className="profile-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
              e.target.style.backgroundColor = '#2196F3';
              e.target.style.color = 'white';
              e.target.style.display = 'flex';
              e.target.style.alignItems = 'center';
              e.target.style.justifyContent = 'center';
              e.target.style.fontSize = '40px';
              e.target.textContent = user?.Fullname?.charAt(0) || 'U';
            }}
          />
        </div>
        
        <div className="profile-info">
          <h1 className="profile-name">{user?.Fullname || 'User'}</h1>
          <h2 className="profile-subtitle">
            {user?.department || 'No Department'} • Semester {user?.Semester || 'N/A'}
          </h2>
          
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-icon"></span>
              <span className="detail-text">{user?.Email || 'No Email'}</span>
            </div>
            
            {user?.CMS && (
              <div className="detail-item">
                <span className="detail-icon"></span>
                <span className="detail-text">CMS: {user.CMS}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-cgpa">
          <div className="cgpa-chip">
            <span className="cgpa-label">CGPA:</span>
            <span className="cgpa-value">
              {parseFloat(user?.currentCGPA || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;