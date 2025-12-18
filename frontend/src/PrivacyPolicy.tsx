import { useEffect } from 'react';
import './PrivacyPolicy.css';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "QukLink - Privacy Policy";
  }, []);

  return (
    <div className="privacy-page">
      {/* Navigation */}
      <nav className="main-nav">
        <div className="logo">
          <Link to="/">
            <img src="/images/QUKLINK_black.png" alt="QukLink Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/pricing">PRICING</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
        <button className="login-button">LOGIN/SIGNUP</button>
      </nav>

      {/* Privacy Policy Content - Structure matches design exactly */}
      <div className="privacy-container">
        <div className="privacy-content">
          <h1>Information We Collect</h1>
          
          <section className="policy-section">
            <h2>1. We may collect the following types of information when you interact with our platform:</h2>

            <div className="sub-section">
              <h3>a. Information You Provide Voluntarily</h3>
              <ul>
                <li>Name, email address, payment information or contact details when signing up</li>
                <li>Profile information (bio, social links, photos, banners)</li>
                <li>User-generated content such as links, pages, or custom URLs</li>
              </ul>
            </div>

            <div className="sub-section">
              <h3>b. Automatically Collected Information</h3>
              <ul>
                <li>IP address, browser type, device type</li>
                <li>Time zone, country, operating system</li>
                <li>Activity logs (e.g., pages visited, links clicked, timestamps)</li>
              </ul>
            </div>

            <div className="sub-section">
              <h3>c. Cookies & Tracking Technologies</h3>
              <ul>
                <li>We use cookies and similar technologies to:</li>
                <li>Remember user preferences and sessions</li>
                <li>Improve page performance and user experience</li>
                <li>Track usage metrics and traffic analysis</li>
              </ul>
              <p>You may disable cookies through your browser settings, but some features may not function properly.</p>
            </div>
          </section>

          <section className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>Your data is used to provide and improve our services in the following ways:</p>
            <ul>
              <li>To create and maintain your user account</li>
              <li>To personalize your experience</li>
              <li>To monitor usage trends and technical issues</li>
              <li>To identify relevant ads and content</li>
              <li>To protect the platform against misuse or fraud</li>
              <li>To communicate with you about support, updates, or announcements</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Third-Party Services</h2>
            <p>We may integrate or use services from third parties to provide better functionality and monetize the platform, such as:</p>
            <ul>
              <li>Analytics providers (to help us understand user behavior)</li>
              <li>Ad networks to display third-party ads (meant to be</li>
              <li>CDNs and hosting services for speed and reliability</li>
              <li>Storage providers for user-uploaded media</li>
            </ul>
            <p>These third parties may collect anonymized data or use cookies as per their respective privacy policies.</p>
          </section>

          <section className="policy-section">
            <h2>4. Information Sharing</h2>
            <p>We do not sell your personal information to third parties.</p>
            <p>We may share information with:</p>
            <ul>
              <li>Service providers (operating on our behalf (e.g., storage, analytics)</li>
              <li>Law enforcement or legal authorities when required by applicable law</li>
              <li>Advertising partners (only non-personalized or consented data)</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Data Security</h2>
            <p>We implement technical and organizational measures to protect your data:</p>
            <ul>
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure servers with access control systems</li>
              <li>Regular security audits and monitoring</li>
            </ul>
            <p>Despite these efforts, no platform is 100% secure. Please use strong passwords and report any suspicious activity.</p>
          </section>

          <section className="policy-section">
            <h2>6. International Users</h2>
            <p>If you access our services from outside our primary operating country, please be aware that your data may be processed and stored in countries where data protection laws may differ.</p>
          </section>

          <section className="policy-section">
            <h2>7. Your Rights & Choices</h2>
            <p>Depending on your jurisdiction, you may have rights to:</p>
            <ul>
              <li>Access, update, or delete your personal data</li>
              <li>Object to data processing or request data portability</li>
              <li>Withdraw consent where applicable (e.g., email communications, ads)</li>
            </ul>
            <p>You can manage most settings from your account dashboard or contact us at [support email].</p>
          </section>

          <section className="policy-section">
            <h2>8. Children's Privacy</h2>
            <p>Our services are not intended for use by children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with information, please contact us for removal.</p>
          </section>

          <section className="policy-section">
            <h2>9. Policy Updates</h2>
            <p>We may update this Privacy Policy occasionally to reflect platform changes or legal requirements. Updated policies will be posted here, and users may be notified via email of platform alerts.</p>
          </section>

          <section className="policy-section">
            <h2>10. Contact Us</h2>
            <p>For any questions, data access requests, or privacy concerns, please contact us at:<br />
            Support@quklink.com</p>
          </section>
        </div>
      </div>

      {/* CTA Section - Updated to match screenshot */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h3>CONTACT US</h3>
            <h2>Ready to Start Earning from Your Links?</h2>
            <p>Join thousands of creators and businesses already monetizing their links with QukLink.</p>
          </div>
          <button className="create-account-button">
            CREATE<br />FREE<br />ACCOUNT
          </button>
          <img src="/images/cta-decoration-1.png" alt="" className="cta-decoration top-right" />
          <img src="/images/cta-decoration-2.png" alt="" className="cta-decoration bottom-left" />
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
              <Link to="/">HOME</Link>
              <Link to="/pricing">PRICING</Link>
              <Link to="/about">ABOUT</Link>
              <Link to="/contact">CONTACT</Link>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">© 2024 QukLinks. All rights reserved. Made with ❤️ for creators worldwide.</p>
            
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms & Conditions</Link>
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

export default PrivacyPolicy;
