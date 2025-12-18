import './App.css'
import { useState, useRef, useEffect } from 'react';

function App() {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "QukLink - Homepage";
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Creators', 'Influencers', 'Businesses'];
  
  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef(null);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Emma Watson",
      username: "@emmaw",
      quote: "QukLink has transformed the way I monetize my content. I'm earning 3x more from my links than before, and the analytics help me understand which products my audience loves most.",
    },
    {
      id: 2,
      name: "Jason Miller",
      username: "@jasonm",
      quote: "Since switching to QukLink, my revenue has increased by 45%. The platform is intuitive and the support team is always helpful with any questions I have.",
    },
    {
      id: 3,
      name: "Sophia Chen",
      username: "@sophiac",
      quote: "As a content creator, finding ways to monetize my work has always been challenging. QukLink made it simple with their all-in-one platform. Highly recommend!",
    },
    {
      id: 4,
      name: "Marcus Johnson",
      username: "@marcusj",
      quote: "QukLink's features like timed posts and limited user access have been game-changers for my exclusive product launches. My audience engagement has never been higher.",
    },
    {
      id: 5,
      name: "Aisha Patel",
      username: "@aishap",
      quote: "The analytics provided by QukLink are incredibly detailed. I can see exactly which links perform best and optimize my strategy accordingly. Worth every penny!",
    },
  ];

  // Add pause functionality
  const [isPaused, setIsPaused] = useState(false);

  // Navigate through testimonials
  const handlePrevClick = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-scroll testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="homepage">
      <div className="container">
        {/* Navigation */}
        <nav className="main-nav">
          <div className="logo">
            <img src="/images/logo.png" alt="QukLink Logo" />
          </div>
          <div className="nav-links">
            <a href="/" className="active">HOME</a>
            <a href="/pricing">PRICING</a>
            <a href="#about">ABOUT</a>
            <a href="/contact">CONTACT</a>
          </div>
          <a href="/signin" className="login-button">LOGIN/SIGNUP</a>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                <span className="big-text">TURN EVERY</span><br />
                <span className="big-text">LINK INTO</span><br />
                <span className="big-text highlight">REVENUE</span>
              </h1>
              <p className="hero-description">
                The ultimate link monetization platform designed specifically for creators, influencers, and
                businesses. Create shortened URLs that generate income with every click through our advanced ad
                system and affiliate tools.
              </p>
            </div>
            <div className="hero-image">
              <div className="product-card">
                <img src="/images/user.png" className="user-float" alt="User" />
                <img src="/images/price.png" className="price-float" alt="Price Tag" />
                <img src="/images/headphones.png" className="product-image" alt="AirPods Max" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="stat-item">
            <h2>2.5M+</h2>
            <p>ACTIVE USERS</p>
          </div>
          <div className="stat-item">
            <h2>10M+</h2>
            <p>LINKS CREATED</p>
          </div>
          <div className="stat-item">
            <h2>$5M+</h2>
            <p>PAID TO USERS</p>
          </div>
          <div className="stat-item">
            <h2>120M+</h2>
            <p>TOTAL CLICKS</p>
          </div>
        </section>

        {/* Content Creators Section */}
        <section className="creators-section">
          <div className="tab-navigation">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`tab-button ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="creators-content">
            <div className="creators-text">
              <span className="section-label">
                {activeTab === 0 ? 'FOR CREATORS' : `FOR ${tabs[activeTab]}`}
              </span>
              <h2>Turn Your Content<br />Into Income</h2>
              <p>Transform your creative content into a sustainable income stream. QukLink helps content creators 
                monetize their links across all platforms including YouTube, TikTok, Instagram, and more.</p>
              <button className="start-button">START CREATING</button>
            </div>
            <div className="creators-image">
              <img src="/images/ads.png" alt="Monetization Interface" />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="howitworks-bg">
          <div className="howitworks-container">
            <div className="howitworks-header">
              <div className="howitworks-title-group">
                <span className="howitworks-featured">FEATURED PROJECTS</span>
                <h2 className="howitworks-title">How it Works</h2>
              </div>
              <button className="howitworks-cta">GET STARTED NOW</button>
            </div>
            <div className="howitworks-steps">
              {/* Step 1 */}
              <div className="howitworks-step">
                <div className="howitworks-step-left">
                  <span className="howitworks-step-number">1</span>
                  <h3 className="howitworks-step-title">Create</h3>
                  <p className="howitworks-step-desc">
                    ADD ANY LINK YOU WANT TO SHARE — WHETHER IT'S A VIDEO, PRODUCT, BLOG, OR ANYTHING ELSE. JUST ENTER THE URL AND CREATE A NEW LINK INSTANTLY.
                  </p>
                </div>
                <div className="howitworks-step-right">
                  <img 
                    src="/images/create.png" 
                    alt="Create" 
                    className="howitworks-step-img" 
                    style={{ width: '670px', height: '670px', objectFit: 'contain' }}
                  />
                </div>
              </div>
              {/* Step 2 */}
              <div className="howitworks-step">
                <div className="howitworks-step-right">
                  <img 
                    src="/images/share.png" 
                    alt="Share" 
                    className="howitworks-step-img" 
                    style={{ width: '670px', height: '670px', objectFit: 'contain' }}
                  />
                </div>
                <div className="howitworks-step-left">
                  <span className="howitworks-step-number">2</span>
                  <h3 className="howitworks-step-title">Share</h3>
                  <p className="howitworks-step-desc">
                    SHARE YOUR LINK ANYWHERE — ON SOCIAL MEDIA, IN YOUR BIO, MESSAGES, OR EMAILS — AND LET YOUR AUDIENCE ACCESS YOUR CONTENT WITH EASE.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="howitworks-step">
                <div className="howitworks-step-left">
                  <span className="howitworks-step-number">3</span>
                  <h3 className="howitworks-step-title">Earn</h3>
                  <p className="howitworks-step-desc">
                    START EARNING FROM THE TRAFFIC YOU DRIVE. WHEN PEOPLE CLICK YOUR LINKS AND VISIT YOUR PAGE, YOU EARN A SHARE OF THE AD REVENUE — IT'S THAT SIMPLE.
                  </p>
                </div>
                <div className="howitworks-step-right">
                  <img 
                    src="/images/earn.png" 
                    alt="Earn" 
                    className="howitworks-step-img" 
                    style={{ width: '670px', height: '670px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose QukLink Section */}
        <section className="why-choose-bg">
          <div className="why-choose-container">
            <div className="why-choose-content">
              <div className="why-choose-text">
                <span className="why-choose-label">ABOUT US</span>
                <h2 className="why-choose-title">Why Choose<br />Quklink?</h2>
                <ul className="why-choose-list">
                  <li>• <strong>Boost Your Earnings</strong> – Monetize every click</li>
                  <li>• <strong>Advanced Analytics</strong> – Make data-driven decisions with powerful insights</li>
                  <li>• <strong>Privacy Focused</strong> – Control what you share and with whom</li>
                  <li>• <strong>Customization</strong> – Match your brand with personalized themes, layouts, and features</li>
                </ul>
              </div>
              <div className="why-choose-image">
                <img 
                  src="/images/about.png" 
                  alt="People using QukLink" 
                  className="about-img" 
                  style={{ width: '760px', height: '575px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Multiple Ways to Make Money Section */}
        <section className="ways-to-make-bg">
          <div className="ways-to-make-container">
            <div className="ways-to-make-header">
              <div className="title-group">
                <span className="services-label">SERVICES</span>
                <h2 className="ways-to-make-title">Multiple Ways to Make Money</h2>
              </div>
              <button className="see-all-button">SEE ALL SERVICES</button>
            </div>
            
            <div className="ways-to-make-grid">
              {/* Card 1 */}
              <div className="money-card">
                <div className="money-card-icon purple">
                  <img 
                    src="/icons/icon_purple.png" 
                    alt="Ad Revenue Icon" 
                    width="64" 
                    height="64" 
                  />
                </div>
                <h3 className="money-card-title">AD REVENUE</h3>
                <p className="money-card-text">
                  Earn money from the 5-second ad display shown before users reach their destination. Our high-quality ad network ensures maximum revenue per view.
                </p>
              </div>

              {/* Card 2 */}
              <div className="money-card">
                <div className="money-card-icon orange">
                  <img 
                    src="/icons/icon_orange.png" 
                    alt="Digital Shop Icon" 
                    width="64" 
                    height="64" 
                  />
                </div>
                <h3 className="money-card-title">DIGITAL SHOP SALES</h3>
                <p className="money-card-text">
                  Create your own digital shop to sell products directly through your shortened links.
                </p>
              </div>

              {/* Card 3 */}
              <div className="money-card">
                <div className="money-card-icon pink">
                  <img 
                    src="/icons/icon_pink.png" 
                    alt="Subscriber Content Icon" 
                    width="64" 
                    height="64" 
                  />
                </div>
                <h3 className="money-card-title">SUBSCRIBER-ONLY CONTENT</h3>
                <p className="money-card-text">
                  Create exclusive content for paying subscribers and manage access through our platform.
                </p>
              </div>

              {/* Card 4 */}
              <div className="money-card">
                <div className="money-card-icon gold">
                  <img 
                    src="/icons/icon_yellow.png" 
                    alt="Affiliate Links Icon" 
                    width="64" 
                    height="64" 
                  />
                </div>
                <h3 className="money-card-title">AFFILIATE LINKS</h3>
                <p className="money-card-text">
                  Incorporate affiliate links from various programs into your shortened URLs to maximize earnings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Powerful Features Section */}
        <section className="features-section">
          <div className="features-container">
            <h2 className="features-title">Powerful Features</h2>
            
            <div className="features-grid">
              {/* Feature 1 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/ad_monetization.png" 
                    alt="Ad Monetization Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Ad Monetization</h3>
                <p className="feature-text">Earn from traffic that visits your shared links.</p>
              </div>

              {/* Feature 2 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/native_app_opening.png" 
                    alt="Native App Opening Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Native App Opening</h3>
                <p className="feature-text">Automatically open content in relevant apps to increase engagement and subscriptions.</p>
              </div>

              {/* Feature 3 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/analytics.png" 
                    alt="Analytics Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Detailed Analytics</h3>
                <p className="feature-text">Understand your audience and optimize your strategy with in-depth metrics.</p>
              </div>

              {/* Feature 4 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/shop.png" 
                    alt="Shop Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Shop</h3>
                <p className="feature-text">Add links to premium resources and digital products. Sell and earn directly from your QukLink.</p>
              </div>

              {/* Feature 5 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/subs.png" 
                    alt="Subscription Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Subscription</h3>
                <p className="feature-text">Post exclusive content available only to your paying subscribers.</p>
              </div>

              {/* Feature 6 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/collections.png" 
                    alt="Collections Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Collections</h3>
                <p className="feature-text">Group multiple links into a folder for organized sharing (e.g. tutorials, tools, resources).</p>
              </div>

              {/* Feature 7 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/direct_share.png" 
                    alt="Direct Share Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Direct Share & Unlisted Links</h3>
                <p className="feature-text">Share content privately without publishing it on your public profile.</p>
              </div>

              {/* Feature 8 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/bookmark.png" 
                    alt="Bookmark Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Bookmark & Add to Collection</h3>
                <p className="feature-text">Bookmark content shared by your favorite creators and build your own private Collections.</p>
              </div>

              {/* Feature 9 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/schedule.png" 
                    alt="Schedule Post Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Schedule Post</h3>
                <p className="feature-text">Plan your content calendar with scheduled links to go live at the perfect time — even while you're offline.</p>
              </div>

              {/* Feature 10 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/post_with_timer.png" 
                    alt="Post with Timer Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Post with Timer</h3>
                <p className="feature-text">Share time-sensitive content that disappears from your profile after a set duration. Great for limited-time offers, exclusive drops, or temporary announcements.</p>
              </div>

              {/* Feature 11 */}
              <div className="feature-card">
                <div className="feature-icon">
                  <img 
                    src="/icons/limited_user_post.png" 
                    alt="Limited User Post Icon" 
                    width="45" 
                    height="45" 
                  />
                </div>
                <h3 className="feature-title">Limited User Post</h3>
                <p className="feature-text">Make a post available only to a limited number of users (e.g., first 20 users).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="testimonials-container">
            <div className="testimonials-header">
              <span className="testimonials-label">TESTIMONIAL</span>
              <h2 className="testimonials-title">What customers say about us</h2>
              
              <div className="testimonials-navigation">
                <button className="nav-button pause" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4H6V20H10V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 4H14V20H18V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <button className="nav-button prev" onClick={handlePrevClick}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="nav-button next" onClick={handleNextClick}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="testimonials-slider" ref={testimonialsRef}>
              <div 
                className="testimonials-track" 
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div className="testimonial" key={testimonial.id}>
                    <div className="testimonial-image">
                      <img src="/images/review.png" alt="Customer using QukLink" />
                    </div>
                    <div className="testimonial-content">
                      <div className="quote-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V14C10 14.5304 9.78929 15.0391 9.41421 15.4142C9.03914 15.7893 8.53043 16 8 16H6M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="testimonial-quote">QukLink has transformed the way I monetize my content.</h3>
                      <p className="testimonial-text">{testimonial.quote}</p>
                      <div className="testimonial-author">
                        <div className="author-avatar">
                          <img src="/images/avatar.png" alt={testimonial.name} />
                        </div>
                        <div className="author-info">
                          <h4>{testimonial.name}</h4>
                          <span>{testimonial.username}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-content">
              <span className="contact-label">CONTACT US</span>
              <h2 className="homepage-contact-title">Ready to Start Earning from Your Links?</h2>
              <p className="contact-text">
                Join thousands of creators and businesses already monetizing their links with QukLink.
              </p>
              <button className="create-account-button">
                <span>CREATE</span>
                <span>FREE</span>
                <span>ACCOUNT</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      
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
  )
}

export default App

