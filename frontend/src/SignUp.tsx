import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Set document title when component mounts
  useEffect(() => {
    document.title = "QukLink - Sign Up";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with email:', email);
    
    // Development paths based on specific email values
    if (email.toLowerCase() === 'welcome') {
      console.log('Redirecting to profile setup');
      navigate('/profile-setup');
    } else if (email.toLowerCase() === 'dashboard') {
      console.log('Redirecting to dashboard');
      navigate('/dashboard');
    } else {
      // In the future, this would validate with a backend
      alert('Please enter "welcome" to go to profile setup or "dashboard" to see the dashboard');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <img src="/images/signup_login.png" alt="QukLink Platform" />
        </div>
        
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <h1>Sign Up</h1>
            
            <div className="auth-tabs">
              <Link to="/signin" className="auth-tab">Sign in</Link>
              <Link to="/signup" className="auth-tab active">Sign Up</Link>
            </div>
            
            <div className="social-auth-buttons">
              <button className="social-auth-button">
                <img src="/icons/google.png" alt="Google" className="provider-icon" />
                Continue with Google
              </button>
              
              <button className="social-auth-button">
                <img src="/icons/amazon.png" alt="Amazon" className="provider-icon" />
                Continue with Amazon
              </button>
              
              <button className="social-auth-button">
                <img src="/icons/github.png" alt="Github" className="provider-icon" />
                Continue with Github
              </button>
            </div>
            
            <div className="auth-divider">
              <span>Or continue with email address</span>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="email-input-container">
                <div className="email-icon">
                  <img src="/icons/email_icon.png" alt="Email" />
                </div>
                <input 
                  type="text" 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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

export default SignUp;

