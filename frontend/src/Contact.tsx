import { useEffect } from 'react';
import './Contact.css';

function Contact() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "QukLink - Contact Us";
  }, []);

  return (
    <div className="contact-page">
      {/* Navigation */}
      <nav className="main-nav">
        <div className="logo">
          <img src="/images/QUKLINK_black.png" alt="QukLink Logo" />
        </div>
        <div className="nav-links">
          <a href="/">HOME</a>
          <a href="/pricing">PRICING</a>
          <a href="#about">ABOUT</a>
          <a href="/contact" className="active">CONTACT</a>
        </div>
        <button className="login-button">LOGIN/SIGNUP</button>
      </nav>

      {/* Contact Hero Section */}
      <section className="contact-hero">
        <h1 className="contact-title">CONTACT US</h1>
        
        <div className="contact-form-container">
          <img src="/images/contactus_bg.png" alt="People using laptop" style={{ width: '100%', borderRadius: '20px' }} />
          <div className="contact-form-wrapper">
            <h2 className="form-title">Drop us a line</h2>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone number" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" required></textarea>
              </div>
              <button type="submit" className="submit-button">SEND A MESSAGE</button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="socials-section">
        <div className="social-icons-wrapper">
          {/* Social media icons */}
          <div className="twitter-icon">
            <img src="/images/C_twitter.png" alt="Twitter" className="social-icon-img" />
          </div>
          <div className="behance-icon">
            <img src="/images/C_behance.png" alt="Behance" className="social-icon-img" />
          </div>
          <div className="dribbble-icon">
            <img src="/images/C_dribble.png" alt="Dribbble" className="social-icon-img" />
          </div>
          <div className="facebook-icon">
            <img src="/images/C_facebook.png" alt="Facebook" className="social-icon-img" />
          </div>
          <div className="instagram-icon">
            <img src="/images/C_instagram.png" alt="Instagram" className="social-icon-img" />
          </div>
          
          {/* Big text in the center */}
          <h2 className="contact-page-social-title">WE ARE ON<br />SOCIALS</h2>
          
          {/* Follow now button */}
          <button className="follow-now-button">Follow Now</button>
          
          {/* Emoji decorations */}
          <div className="emoji1">
            <img src="/images/C_right_pic.png" alt="Decoration" className="emoji-img" />
          </div>
          <div className="emoji2">
            <img src="/images/C_bottomright.png" alt="Decoration" className="emoji-img" />
          </div>
          <div className="emoji3">
            <img src="/images/C_middle.png" alt="Decoration" className="emoji-img" />
          </div>
          <div className="emoji4">
            <img src="/images/C_left_pic.png" alt="Decoration" className="emoji-img" />
          </div>
        </div>
      </section>
      
      {/* Get in touch section */}
      <section className="get-in-touch-section">
        <div className="quklink-agency">QUKLINK AGENCY</div>
        <h2 className="get-in-touch-title">Get in touch today!</h2>
        <p className="get-in-touch-text">With QukLink, you can combine the exciting, interactive nature of a community with your content — all in one seamless experience.</p>
        
        <div className="contact-options">
          <div className="contact-option">
            <h3 className="contact-option-title">Send us an email</h3>
            <p>Scan the QR code or click the button below to send an email</p>
            <a href="mailto:support@quklink.com">support@quklink.com</a>
          </div>
          
          <div className="contact-option">
            <h3 className="contact-option-title">Give us a call</h3>
            <p>Scan the QR code or click the button below to call us</p>
            <a href="tel:+1(201)555-0123">(201) 555-0123</a>
          </div>
          
          <div className="contact-option">
            <h3 className="contact-option-title">Visit our office</h3>
            <p>Scan the QR code or click the button below for directions</p>
            <address>8751 Elgin St, Dallas, Delaware 10299</address>
          </div>
        </div>
      </section>
      
      {/* CTA Section - to match yellow section in screenshot */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h3>CONTACT US</h3>
            <h2>Ready to Start Earning from Your Links?</h2>
            <p>Join thousands of creators and businesses already monetizing their links with QukLink.</p>
          </div>
          <button className="cta-button">
            CREATE<br />FREE<br />ACCOUNT
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="hello-section">
            <h3 className="hello-title">Say Hello!</h3>
            <a href="mailto:info@quklink.com" className="contact-email">info@quklink.com</a>
          </div>
          
          <div className="footer-logo">
            <img src="/images/QUKLINK_footer.png" alt="QukLink Logo" />
          </div>
          
          <div className="footer-nav">
            <div className="footer-links">
              <a href="/">HOME</a>
              <a href="/pricing">PRICING</a>
              <a href="#about">ABOUT</a>
              <a href="/contact">CONTACT</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">© 2024 QukLinks. All rights reserved. Made with ❤️ for creators worldwide.</p>
            
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms & Conditions</a>
            </div>
            
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006V3.01006Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.9079 12.2385 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22774 13.4229 8.09408 12.5922C7.96042 11.7615 8.09208 10.9099 8.47034 10.1584C8.8486 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988759 13.537 1.14273 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0113 9.96295 22.8573 8.17862 22.54 6.42V6.42Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;

