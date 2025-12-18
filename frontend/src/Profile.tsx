import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expanded, setSidebarExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Define a type for our submenu keys
  type SubMenuKey = 'shop' | 'subscriptions' | 'bookmarks';
  
  const [subMenus, setSubMenus] = useState<Record<SubMenuKey, boolean>>({
    shop: false,
    subscriptions: false,
    bookmarks: false
  });

  // Set document title when component mounts
  useEffect(() => {
    document.title = "QukLink - Profile";
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-avatar-container')) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Toggle dark mode
  const toggleDarkMode = (mode: 'light' | 'dark') => {
    setIsDarkMode(mode === 'dark');
    document.body.classList.toggle('dark-theme', mode === 'dark');
  };

  // Handle submenu toggle with proper typing
  const toggleSubmenu = (menu: SubMenuKey, e: React.MouseEvent) => {
    e.preventDefault();
    setSubMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setSidebarExpanded(!expanded);
  };

  return (
    <div className={`dashboard profile-page ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* Sidebar */}
      <aside 
        className={`sidebar ${expanded ? '' : 'collapsed'}`}
      >
        <div className="sidebar-logo">
          <img src="/images/logo.png" alt="QukLink" />
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className={activeSection === 'dashboard' ? 'active' : ''}>
              <a onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                <span className="nav-icon">
                  <img src="/icons/dashboard_sidebar.png" alt="Dashboard" />
                </span>
                <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li className={activeSection === 'myLinks' ? 'active' : ''}>
              <a onClick={(e) => { e.preventDefault(); navigate('/my-links'); }}>
                <span className="nav-icon">
                  <img src="/icons/my_links_sidebar.png" alt="My Links" />
                </span>
                <span className="nav-text">My Links</span>
              </a>
            </li>
            
            <li className={activeSection === 'collections' ? 'active' : ''}>
              <a onClick={(e) => { e.preventDefault(); navigate('/collections'); }}>
                <span className="nav-icon">
                  <img src="/icons/collections_sidebar.png" alt="Collections" />
                </span>
                <span className="nav-text">Collections</span>
              </a>
            </li>
            
            <li className={activeSection === 'shop' ? 'active' : ''}>
              <a onClick={(e) => toggleSubmenu('shop', e)}
                className={subMenus.shop ? 'expanded' : ''}
              >
                <span className="nav-icon">
                  <img src="/icons/shop_sidebar.png" alt="Shop" />
                </span>
                <span className="nav-text">Shop</span>
                <span className={`nav-chevron ${subMenus.shop ? 'expanded' : ''}`}></span>
              </a>
              <ul className={`submenu ${subMenus.shop ? 'expanded' : ''}`}>
                <li onClick={(e) => { e.preventDefault(); navigate('/shop/products'); }}>
                  <a>Products</a>
                </li>
                <li onClick={(e) => { e.preventDefault(); navigate('/shop/orders'); }}>
                  <a>Orders</a>
                </li>
                <li onClick={(e) => { e.preventDefault(); navigate('/shop/sales'); }}>
                  <a>Sales</a>
                </li>
              </ul>
            </li>
            
            <li className={activeSection === 'subscriptions' ? 'active' : ''}>
              <a onClick={(e) => toggleSubmenu('subscriptions', e)}
                className={subMenus.subscriptions ? 'expanded' : ''}
              >
                <span className="nav-icon">
                  <img src="/icons/subscriptions_sidebar.png" alt="Subscriptions" />
                </span>
                <span className="nav-text">Subscriptions</span>
                <span className={`nav-chevron ${subMenus.subscriptions ? 'expanded' : ''}`}></span>
              </a>
              <ul className={`submenu ${subMenus.subscriptions ? 'expanded' : ''}`}>
                <li onClick={(e) => { e.preventDefault(); navigate('/subscriptions/my-subscriptions'); }}>
                  <a>My Subscriptions</a>
                </li>
                <li onClick={(e) => { e.preventDefault(); navigate('/subscriptions/subscribers'); }}>
                  <a>Subscribers</a>
                </li>
              </ul>
            </li>
            
            <li className={activeSection === 'bookmarks' ? 'active' : ''}>
              <a onClick={(e) => toggleSubmenu('bookmarks', e)}
                className={subMenus.bookmarks ? 'expanded' : ''}
              >
                <span className="nav-icon">
                  <img src="/icons/bookmark_sidebar.png" alt="Bookmarks" />
                </span>
                <span className="nav-text">Bookmarks</span>
                <span className={`nav-chevron ${subMenus.bookmarks ? 'expanded' : ''}`}></span>
              </a>
              <ul className={`submenu ${subMenus.bookmarks ? 'expanded' : ''}`}>
                <li onClick={(e) => { e.preventDefault(); navigate('/bookmarks/my-bookmarks'); }}>
                  <a>My Bookmarks</a>
                </li>
                <li onClick={(e) => { e.preventDefault(); navigate('/bookmarks/collections'); }}>
                  <a>Collections</a>
                </li>
              </ul>
            </li>
            
            <li className={activeSection === 'analytics' ? 'active' : ''}>
              <a onClick={(e) => { e.preventDefault(); navigate('/analytics'); }}>
                <span className="nav-icon">
                  <img src="/icons/analytics_sidebar.png" alt="Analytics" />
                </span>
                <span className="nav-text">Analytics</span>
              </a>
            </li>
            <li className={activeSection === 'notifications' ? 'active' : ''}>
              <a onClick={(e) => { e.preventDefault(); navigate('/notifications'); }}>
                <span className="nav-icon">
                  <img src="/icons/notification_sidebar.png" alt="Notifications" />
                </span>
                <span className="nav-text">Notifications</span>
              </a>
            </li>
            <li className={activeSection === 'settings' ? 'active' : ''}>
              <a onClick={(e) => { e.preventDefault(); navigate('/settings'); }}>
                <span className="nav-icon">
                  <img src="/icons/settings_sidebar.png" alt="Settings" />
                </span>
                <span className="nav-text">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="help-section">
            <span className="help-icon">?</span>
            <span>Help & getting started</span>
          </div>
          
          <div className="theme-switcher-container">
            <label className="theme-switch">
              <input 
                type="checkbox" 
                className="theme-switch__checkbox" 
                checked={isDarkMode}
                onChange={() => toggleDarkMode(isDarkMode ? 'light' : 'dark')}
              />
              <div className="theme-switch__container">
                <div className="theme-switch__clouds"></div>
                <div className="theme-switch__stars-container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="m25.0548 15.684c-1.063-.426-2.4211-.426-3.4841 0l-7.3717 2.9487c-.5316.2126-.9505.6315-1.1631 1.1631l-2.9487 7.3717c-.426 1.063-.426 2.4211 0 3.4841l2.9487 7.3717c.2126.5316.6315.9505 1.1631 1.1631l7.3717 2.9487c1.063.426 2.4211.426 3.4841 0l7.3717-2.9487c.5316-.2126.9505-.6315 1.1631-1.1631l2.9487-7.3717c.426-1.063.426-2.4211 0-3.4841l-2.9487-7.3717c-.2126-.5316-.6315-.9505-1.1631-1.1631z" fill="var(--stars-color)"/>
                  </svg>
                </div>
                <div className="theme-switch__circle-container">
                  <div className="theme-switch__sun-moon-container">
                    <div className="theme-switch__moon">
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>
          
          <div className="sidebar-toggle-container">
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
              <div className="toggle-btn-bg">
                <svg width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  {expanded ? (
                    <path fill="var(--primary-text)" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/>
                  ) : (
                    <path fill="var(--primary-text)" d="M160 448a32 32 0 0 1 32-32h640a32 32 0 1 1 0 64H192a32 32 0 0 1-32-32zm0-192a32 32 0 0 1 32-32h640a32 32 0 1 1 0 64H192a32 32 0 0 1-32-32zm0 384a32 32 0 0 1 32-32h640a32 32 0 1 1 0 64H192a32 32 0 0 1-32-32z"/>
                  )}
                </svg>
              </div>
              <p className="toggle-btn-text">{expanded ? 'Close' : 'Open'}</p>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="search-container">
            <input type="text" placeholder="Search or type a command" className="search-input" />
            <span className="search-shortcut">⌘F</span>
          </div>
          
          <div className="header-actions">
            <button className="create-button">
              <span className="create-icon">+</span>
              <span>Create</span>
            </button>
            
            <div className="notification-bell">
              <span className="notification-badge">2</span>
            </div>
            
            <div className="user-avatar-container">
              <div 
                className="user-avatar"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <img src="/icons/avatar.png" alt="User" />
              </div>
              
              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-info">
                      <img src="/icons/avatar.png" alt="Sarah Smith" className="profile-avatar" />
                      <div className="profile-details">
                        <div className="profile-name">Sarah Smith</div>
                        <div className="profile-username">@sarah.smith</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="profile-dropdown-divider"></div>
                  
                  <div className="profile-dropdown-menu">
                    <button 
                      className="profile-menu-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/profile');
                      }}
                    >
                      <span className="menu-icon">👤</span>
                      View Profile
                    </button>
                    <button 
                      className="profile-menu-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/settings');
                      }}
                    >
                      <span className="menu-icon">⚙️</span>
                      Settings
                    </button>
                    <button 
                      className="profile-menu-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/my-links');
                      }}
                    >
                      <span className="menu-icon">🔗</span>
                      My Links
                    </button>
                    <button 
                      className="profile-menu-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/collections');
                      }}
                    >
                      <span className="menu-icon">📚</span>
                      Collections
                    </button>
                  </div>
                  
                  <div className="profile-dropdown-divider"></div>
                  
                  <div className="profile-dropdown-footer">
                    <button 
                      className="profile-menu-item logout-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/signin');
                      }}
                    >
                      <span className="menu-icon">🚪</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Profile Content */}
        <div className="profile-content">
          {/* Cover Image Section */}
          <div className="profile-cover">
            <div className="cover-image">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
                alt="Cover" 
                className="cover-img"
              />
              <div className="cover-overlay">
                <button className="share-button">
                  <span className="share-icon">↗</span>
                  SHARE
                </button>
              </div>
            </div>
            
            <div className="profile-header">
              <div className="profile-avatar-section">
                <img 
                  src="/icons/avatar.png" 
                  alt="Sarah Smith" 
                  className="profile-main-avatar"
                />
                <div className="profile-title">
                  <h1>Sarah Smith</h1>
                  <p className="profile-handle">@Sarah.Smith</p>
                </div>
              </div>
              
              <button className="subscribe-button">
                <span className="subscribe-icon">👑</span>
                SUBSCRIBE
              </button>
            </div>
          </div>
          
          {/* Bio Section */}
          <div className="profile-bio">
            <h2>Bio:</h2>
            <p>Tech enthusiast & affiliate marketer, I share the best deals on gadgets, software, and online courses.</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <img src="/icons/bookmark.png" alt="Links" className="stat-icon" />
                <span className="stat-number">57 Links</span>
              </div>
              <div className="stat-item">
                <img src="/icons/collections.png" alt="Collections" className="stat-icon" />
                <span className="stat-number">10 Collections</span>
              </div>
              <div className="stat-item">
                <img src="/icons/subs.png" alt="Followers" className="stat-icon" />
                <span className="stat-number">8K Followers</span>
              </div>
            </div>
            
            <div className="social-links">
              <button className="social-btn twitter">
                <span className="social-icon">🐦</span>
              </button>
              <button className="social-btn instagram">
                <span className="social-icon">📷</span>
              </button>
              <button className="social-btn linkedin">
                <span className="social-icon">💼</span>
              </button>
            </div>
          </div>
          
          {/* Profile Navigation */}
          <div className="profile-nav">
            <div className="nav-tabs">
              <button className="nav-tab active">Featured</button>
              <button className="nav-tab">Links</button>
              <button className="nav-tab">Collections</button>
              <button className="nav-tab">Shop</button>
              <button className="nav-tab">About</button>
            </div>
          </div>
          
          {/* Featured Content Grid */}
          <div className="featured-content">
            {/* Featured Product Card */}
            <div className="featured-card product-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="BEARDO Whisky Smoke EAU Parfum" 
                />
                <div className="card-badges">
                  <span className="discount-badge">20% Off</span>
                  <div className="brand-badge">
                    <img src="/icons/beardo.png" alt="beardo.in" />
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="user-info">
                  <img src="/icons/avatar.png" alt="Allen Walker" className="user-avatar-small" />
                  <span className="user-name">Allen Walker</span>
                  <span className="post-date">October 13, 2024</span>
                  <span className="view-count">• 194k Views</span>
                </div>
                <h3 className="card-title">BEARDO Whisky Smoke EAU Parfum - 100 ML For Mens</h3>
                <div className="card-price">
                  <span className="current-price">$2000</span>
                </div>
                <button className="card-action-btn">View</button>
              </div>
            </div>
            
            {/* Another Featured Card */}
            <div className="featured-card product-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="BEARDO Whisky Smoke EAU Parfum" 
                />
                <div className="card-badges">
                  <span className="bestseller-badge">BESTSELLER</span>
                  <div className="brand-badge">
                    <img src="/icons/beardo.png" alt="beardo.in" />
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="user-info">
                  <img src="/icons/avatar.png" alt="Allen Walker" className="user-avatar-small" />
                  <span className="user-name">Allen Walker</span>
                  <span className="post-date">October 12, 2024</span>
                  <span className="view-count">• 286k Views</span>
                </div>
                <h3 className="card-title">BEARDO Whisky Smoke EAU Parfum - 100 ML For Mens</h3>
                <div className="card-price">
                  <span className="current-price">$2000</span>
                </div>
                <button className="card-action-btn">Buy Now</button>
              </div>
            </div>
            
            {/* Featured Card 3 */}
            <div className="featured-card product-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Premium Sunglasses" 
                />
                <div className="card-badges">
                  <span className="new-badge">NEW</span>
                  <div className="brand-badge">
                    <img src="/icons/beardo.png" alt="beardo.in" />
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="user-info">
                  <img src="/icons/avatar.png" alt="Allen Walker" className="user-avatar-small" />
                  <span className="user-name">Allen Walker</span>
                  <span className="post-date">October 11, 2024</span>
                  <span className="view-count">• 145k Views</span>
                </div>
                <h3 className="card-title">Premium Sunglasses Collection - UV Protection</h3>
                <div className="card-price">
                  <span className="current-price">$2000</span>
                </div>
                <button className="card-action-btn">Buy Now</button>
              </div>
            </div>
            
            {/* Additional Featured Cards */}
            <div className="featured-card product-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Smart Speaker" 
                />
                <div className="card-badges">
                  <div className="brand-badge">
                    <img src="/icons/beardo.png" alt="beardo.in" />
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="user-info">
                  <img src="/icons/avatar.png" alt="Allen Walker" className="user-avatar-small" />
                  <span className="user-name">Allen Walker</span>
                  <span className="post-date">October 10, 2024</span>
                  <span className="view-count">• 98k Views</span>
                </div>
                <h3 className="card-title">Smart AI Speaker with Voice Assistant</h3>
                <div className="card-price">
                  <span className="current-price">$2000</span>
                </div>
                <button className="card-action-btn">Subscriber Only</button>
              </div>
            </div>
            
            <div className="featured-card product-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Wireless Headphones" 
                />
                <div className="card-badges">
                  <span className="limited-badge">LIMITED</span>
                  <div className="brand-badge">
                    <img src="/icons/beardo.png" alt="beardo.in" />
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="user-info">
                  <img src="/icons/avatar.png" alt="Allen Walker" className="user-avatar-small" />
                  <span className="user-name">Allen Walker</span>
                  <span className="post-date">October 9, 2024</span>
                  <span className="view-count">• 234k Views</span>
                </div>
                <h3 className="card-title">Premium Wireless Headphones - Noise Cancelling</h3>
                <div className="card-price">
                  <span className="current-price">$2000</span>
                </div>
                <button className="card-action-btn">Buy Now</button>
              </div>
            </div>
            
            <div className="featured-card product-card">
              <div className="card-image">
                <img 
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Gaming Setup" 
                />
                <div className="card-badges">
                  <div className="brand-badge">
                    <img src="/icons/beardo.png" alt="beardo.in" />
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="user-info">
                  <img src="/icons/avatar.png" alt="Allen Walker" className="user-avatar-small" />
                  <span className="post-date">24 Users Left</span>
                </div>
                <h3 className="card-title">Gaming Setup Complete Bundle - RGB Lighting</h3>
                <div className="card-price">
                  <span className="current-price">$2000</span>
                </div>
                <button className="card-action-btn special">24 Users Left</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;