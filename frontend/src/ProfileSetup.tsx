import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSetup.css';

function ProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: 'Jane Cooper',
    username: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    bio: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form, redirecting to dashboard');
    navigate('/dashboard');
  };

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-container">
        <div className="setup-image">
          <img src="/images/signup_login.png" alt="QukLink Platform" />
        </div>
        
        <div className="setup-form-container">
          <div className="setup-form-wrapper">
            <h1>Your Journey Begins Here.</h1>
            <p className="setup-subtitle">Let's set up your profile.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="photo-upload-area">
                <div className="profile-photo-container">
                  <img src="/icons/avatar.png" alt="Profile" className="profile-photo" />
                  <div className="add-icon">+</div>
                </div>
                
                <button type="button" className="upload-cover-btn">
                  <span>+</span> Upload your Cover photo
                </button>
              </div>
              
              <div className="form-group">
                <label>Display name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>User</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your user"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    placeholder="Enter your gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Date Of Birth</label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    placeholder="Enter your date of birth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Bio <span className="info-icon">i</span></label>
                <div className="bio-editor">
                  <div className="editor-toolbar">
                    <button type="button" className="toolbar-btn bold">B</button>
                    <button type="button" className="toolbar-btn italic">I</button>
                    <button type="button" className="toolbar-btn underline">U</button>
                    <button type="button" className="toolbar-btn">😊</button>
                    <button type="button" className="toolbar-btn">🔗</button>
                    <button type="button" className="toolbar-btn">•</button>
                    <button type="button" className="toolbar-btn">≡</button>
                    <div className="spacer"></div>
                    <button type="button" className="toolbar-btn">←</button>
                    <button type="button" className="toolbar-btn">→</button>
                  </div>
                  <textarea
                    name="bio"
                    placeholder="Write something about yourself..."
                    value={formData.bio}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className="continue-button">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;

