import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

// Define a type for our submenu keys
type SubMenuKey = 'shop' | 'subscriptions' | 'bookmarks';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeInsightsFilter, setActiveInsightsFilter] = useState('7days');
  const [activeChartTab, setActiveChartTab] = useState('view');
  const [activeChartFilter, setActiveChartFilter] = useState('30days');
  const [activeListCategory, setActiveListCategory] = useState('link');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const [subMenus, setSubMenus] = useState<Record<SubMenuKey, boolean>>({
    shop: false,
    subscriptions: false,
    bookmarks: false
  });

  // Set active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveSection('dashboard');
    } else if (path === '/my-links') {
      setActiveSection('myLinks');
    } else if (path === '/collections') {
      setActiveSection('collections');
    } else if (path.startsWith('/shop/')) {
      setActiveSection('shop');
    } else if (path.startsWith('/subscriptions/')) {
      setActiveSection('subscriptions');
    } else if (path.startsWith('/bookmarks/')) {
      setActiveSection('bookmarks');
    } else if (path === '/analytics') {
      setActiveSection('analytics');
    } else if (path === '/notifications') {
      setActiveSection('notifications');
    } else if (path === '/settings') {
      setActiveSection('settings');
    }
  }, [location]);

  // Set document title when component mounts
  useEffect(() => {
    document.title = "QukLink - Dashboard";
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
    setExpanded(!expanded);
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-theme' : ''}`}>
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
              {/* Render submenu always but control visibility with CSS */}
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
              {/* Render submenu always but control visibility with CSS */}
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
              {/* Render submenu always but control visibility with CSS */}
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
                    <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path>
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
                    // Close arrow (pointing left)
                    <>
                      <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                      <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                    </>
                  ) : (
                    // Open arrow (pointing right)
                    <>
                      <path fill="#000000" d="M160 480h640a32 32 0 1 1 0 64H160a32 32 0 0 1 0-64z"></path>
                      <path fill="#000000" d="m786.752 512-265.408-265.344a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 1 1-45.312-45.312L786.752 512z"></path>
                    </>
                  )}
                </svg>
              </div>
              <p className="toggle-btn-text">{expanded ? 'Close' : 'Open'}</p>
            </button>
          </div>
        </div>
        
        {/* Remove the separate expand button since we're using the toggle button */}
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
            
            <div 
              className="notification-bell"
              onClick={() => navigate('/notifications')}
              style={{ cursor: 'pointer' }}
            >
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
        
        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Welcome Section - Make left-aligned */}
          <div className="welcome-section">
            <h1>Welcome back, Sarah</h1>
            <p>Your Pro subscription is active until Jan 1, 2025</p>
          </div>
          
          {/* Insights Section */}
          <section className="insights-section">
            <div className="insights-panel">
              <div className="insights-header">
                <h2>Insights</h2>
                <div className="insights-filter">
                  <span>Last 7 days</span>
                  <span className="dropdown-arrow"></span>
                </div>
              </div>
              
              <div className="insights-content">
                <div className="insight-item">
                  <div className="insight-icon-circle">
                    <img src="/icons/link_insights.png" alt="Links Created" className="insight-icon" />
                  </div>
                  <div className="insight-info">
                    <h4>Links Created</h4>
                    <div className="insight-value">25</div>
                    <div className="insight-trend">
                      <span className="trend-arrow">↑</span>
                      37.8% this week
                    </div>
                  </div>
                </div>
                
                <div className="insight-item">
                  <div className="insight-icon-circle">
                    <img src="/icons/eye_insights.png" alt="Total Views" className="insight-icon" />
                  </div>
                  <div className="insight-info">
                    <h4>Total Views</h4>
                    <div className="insight-value">60+</div>
                    <div className="insight-trend">
                      <span className="trend-arrow">↑</span>
                      37.8% this week
                    </div>
                  </div>
                </div>
                
                <div className="insight-item">
                  <div className="insight-icon-circle">
                    <img src="/icons/mouse_insights.png" alt="Click-Through Rate" className="insight-icon" />
                  </div>
                  <div className="insight-info">
                    <h4>Click-Through Rate (CTR)</h4>
                    <div className="insight-value">128</div>
                    <div className="insight-trend">
                      <span className="trend-arrow">↑</span>
                      37.8% this week
                    </div>
                  </div>
                </div>
                
                <div className="insight-item">
                  <div className="insight-icon-circle">
                    <img src="/icons/wallet_insights.png" alt="Estimated Revenue" className="insight-icon" />
                  </div>
                  <div className="insight-info">
                    <h4>Estimated Revenue</h4>
                    <div className="insight-value">$2325</div>
                    <div className="insight-trend">
                      <span className="trend-arrow">↑</span>
                      37.8% this week
                    </div>
                  </div>
                </div>
                
                <div className="insight-item">
                  <div className="insight-icon-circle">
                    <img src="/icons/crown_insights.png" alt="Total Subscribers" className="insight-icon" />
                  </div>
                  <div className="insight-info">
                    <h4>Total Subscribers</h4>
                    <div className="insight-value">800+</div>
                    <div className="insight-trend">
                      <span className="trend-arrow">↑</span>
                      37.8% this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Two-column layout */}
          <div className="dashboard-grid">
            {/* Earning Overview */}
            <section className="widget earning-widget">
              <div className="widget-header">
                <h2>Earning Overview</h2>
                <button className="more-options-button">•••</button>
              </div>
              
              <div className="earning-chart-container">
                <div className="donut-chart">
                  <div className="donut-inner">
                    <div className="donut-label">
                      <span>Total</span>
                      <h3>$65</h3>
                    </div>
                  </div>
                </div>
                
                <div className="earning-legend">
                  <div className="legend-item">
                    <span className="legend-color email-capture"></span>
                    <span className="legend-label">Email Capture</span>
                    <span className="legend-value">$25</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color affiliate"></span>
                    <span className="legend-label">Affiliate</span>
                    <span className="legend-value">$15</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color ads"></span>
                    <span className="legend-label">Ads</span>
                    <span className="legend-value">$10</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color products"></span>
                    <span className="legend-label">Products</span>
                    <span className="legend-value">$15</span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Quick Action */}
            <section className="widget action-widget">
              <div className="widget-header">
                <h2>Quick Action</h2>
              </div>
              
              <div className="action-grid">
                <button className="action-button create-link-button">
                  <div className="action-icon link-action-icon">
                    <img src="/icons/create_link_btn.png" alt="Create Link" />
                  </div>
                </button>
                
                <button className="action-button create-collection-button">
                  <div className="action-icon collection-action-icon">
                    <img src="/icons/create_collections_btn.png" alt="Create Collection" />
                  </div>
                </button>
                
                <button className="action-button create-product-button">
                  <div className="action-icon product-action-icon">
                    <img src="/icons/create_product_btn.png" alt="Create Product" />
                  </div>
                </button>
                
                <button className="action-button profile-button">
                  <div className="action-icon profile-action-icon">
                    <img src="/icons/profile_btn.png" alt="Profile" />
                  </div>
                </button>
              </div>
            </section>
          </div>
          
          {/* Views Chart */}
          <section className="widget views-chart-widget">
            <div className="widget-header">
              <h2>10k views</h2>
              
              <div className="chart-controls">
                <div className="chart-tabs">
                  <button 
                    className={`chart-tab ${activeChartTab === 'view' ? 'active' : ''}`}
                    onClick={() => setActiveChartTab('view')}
                  >
                    View
                  </button>
                  <button 
                    className={`chart-tab ${activeChartTab === 'clicks' ? 'active' : ''}`}
                    onClick={() => setActiveChartTab('clicks')}
                  >
                    Clicks
                  </button>
                  <button 
                    className={`chart-tab ${activeChartTab === 'earnings' ? 'active' : ''}`}
                    onClick={() => setActiveChartTab('earnings')}
                  >
                    Earnings
                  </button>
                </div>
                
                <div className="chart-filter">
                  <span>Last 30 days</span>
                  <span className="dropdown-arrow"></span>
                </div>
              </div>
            </div>
            
            <div className="chart-container">
              {/* Chart visualization - in real app would use Chart.js or similar */}
              <div className="line-chart">
                {/* SVG chart visualization that will be animated */}
                <svg width="100%" height="100%" viewBox="0 0 800 250" preserveAspectRatio="none">
                  {/* Background grid lines */}
                  <line x1="0" y1="50" x2="800" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="100" x2="800" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="150" x2="800" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="200" x2="800" y2="200" stroke="#f0f0f0" strokeWidth="1" />
                  
                  {/* Link line (blue) */}
                  <path 
                    d="M0,150 C100,100 200,90 300,70 S400,50 500,80 S600,130 800,120" 
                    fill="none" 
                    stroke="#4076ff" 
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={`chart-path ${activeChartTab === 'view' ? 'active' : ''}`}
                  />
                  
                  {/* Collection line (green) */}
                  <path 
                    d="M0,180 C100,160 200,170 300,140 S400,130 500,150 S600,180 800,170" 
                    fill="none" 
                    stroke="#71d398" 
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={`chart-path ${activeChartTab === 'clicks' ? 'active' : ''}`}
                  />
                  
                  {/* Earnings line (orange) */}
                  <path 
                    d="M0,200 C100,180 200,150 300,120 S400,100 500,90 S600,110 800,100" 
                    fill="none" 
                    stroke="#ffa26b" 
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={`chart-path ${activeChartTab === 'earnings' ? 'active' : ''}`}
                  />
                  
                  {/* Focus point */}
                  <circle cx="400" cy="80" r="6" fill="#fff" stroke="#4076ff" strokeWidth="2" />
                </svg>
                
                <div className="chart-tooltip">
                  <div className="tooltip-date">Sep 15</div>
                  <div className="tooltip-item">
                    <span className="tooltip-label">Views:</span>
                    <span className="tooltip-value">500</span>
                  </div>
                  <div className="tooltip-item">
                    <span className="tooltip-label">Collection:</span>
                    <span className="tooltip-value">200</span>
                  </div>
                  <div className="tooltip-item">
                    <span className="tooltip-label">Earning:</span>
                    <span className="tooltip-value">$154</span>
                  </div>
                </div>
              </div>
              
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color link-color"></span>
                  <span>Link</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color collection-color"></span>
                  <span>Collection</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color product-color"></span>
                  <span>Product</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color subscribers-color"></span>
                  <span>Subscribers</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color earning-color"></span>
                  <span>Earning</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Top Performing Links with Navigation */}
          <section className="widget links-widget">
            <div className="widget-header">
              <h2>Top Performing {activeListCategory === 'link' ? 'Links' : 
                                 activeListCategory === 'collection' ? 'Collections' :
                                 activeListCategory === 'product' ? 'Products' :
                                 activeListCategory === 'subscribers' ? 'Subscribers' :
                                 'Earnings'}</h2>
              <div className="widget-filter">
                <span>Last 30 days</span>
                <span className="dropdown-arrow"></span>
              </div>
            </div>
            
            {/* Navigation tabs for table */}
            <div className="table-nav" data-active={activeListCategory}>
              <button 
                className={`table-nav-btn ${activeListCategory === 'link' ? 'active' : ''}`}
                onClick={() => setActiveListCategory('link')}
              >
                Links
              </button>
              <button 
                className={`table-nav-btn ${activeListCategory === 'collection' ? 'active' : ''}`}
                onClick={() => setActiveListCategory('collection')}
              >
                Collections
              </button>
              <button 
                className={`table-nav-btn ${activeListCategory === 'product' ? 'active' : ''}`}
                onClick={() => setActiveListCategory('product')}
              >
                Products
              </button>
              <button 
                className={`table-nav-btn ${activeListCategory === 'subscribers' ? 'active' : ''}`}
                onClick={() => setActiveListCategory('subscribers')}
              >
                Subscribers
              </button>
              <button 
                className={`table-nav-btn ${activeListCategory === 'earning' ? 'active' : ''}`}
                onClick={() => setActiveListCategory('earning')}
              >
                Earnings
              </button>
            </div>
            
            {/* Dynamic table content based on active category */}
            {activeListCategory === 'link' && (
              <table className="links-table">
                <thead>
                  <tr>
                    <th>Link Name</th>
                    <th>Date Created</th>
                    <th>Views</th>
                    <th>Clicks</th>
                    <th>CTR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">MacBook Pro Deal</div>
                        <div className="link-url">qukl.ink/macbook-pro</div>
                      </div>
                    </td>
                    <td>Fri, Apr 9</td>
                    <td>1,240</td>
                    <td>186</td>
                    <td>15.0%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">iPhone 15 Launch</div>
                        <div className="link-url">qukl.ink/iphone-15</div>
                      </div>
                    </td>
                    <td>Sat, Apr 10</td>
                    <td>980</td>
                    <td>147</td>
                    <td>12.3%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Tech Reviews</div>
                        <div className="link-url">qukl.ink/tech-reviews</div>
                      </div>
                    </td>
                    <td>Sun, Apr 11</td>
                    <td>756</td>
                    <td>98</td>
                    <td>13.0%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Gaming Setup</div>
                        <div className="link-url">qukl.ink/gaming-setup</div>
                      </div>
                    </td>
                    <td>Mon, Apr 12</td>
                    <td>642</td>
                    <td>89</td>
                    <td>13.9%</td>
                  </tr>
                </tbody>
              </table>
            )}
            
            {activeListCategory === 'collection' && (
              <table className="links-table">
                <thead>
                  <tr>
                    <th>Collection Name</th>
                    <th>Date Created</th>
                    <th>Total Links</th>
                    <th>Views</th>
                    <th>Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Tech Deals 2024</div>
                        <div className="link-url">8 links</div>
                      </div>
                    </td>
                    <td>Mar 15</td>
                    <td>8</td>
                    <td>3,240</td>
                    <td>18.5%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Productivity Tools</div>
                        <div className="link-url">12 links</div>
                      </div>
                    </td>
                    <td>Mar 20</td>
                    <td>12</td>
                    <td>2,890</td>
                    <td>16.2%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Design Resources</div>
                        <div className="link-url">6 links</div>
                      </div>
                    </td>
                    <td>Mar 25</td>
                    <td>6</td>
                    <td>1,980</td>
                    <td>22.1%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Learning Courses</div>
                        <div className="link-url">15 links</div>
                      </div>
                    </td>
                    <td>Apr 1</td>
                    <td>15</td>
                    <td>1,560</td>
                    <td>14.8%</td>
                  </tr>
                </tbody>
              </table>
            )}
            
            {activeListCategory === 'product' && (
              <table className="links-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Date Added</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                    <th>Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Premium Template Pack</div>
                        <div className="link-url">Digital Product</div>
                      </div>
                    </td>
                    <td>Feb 10</td>
                    <td>156</td>
                    <td>$4,680</td>
                    <td>8.2%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">UI Kit Pro</div>
                        <div className="link-url">Digital Product</div>
                      </div>
                    </td>
                    <td>Feb 15</td>
                    <td>89</td>
                    <td>$2,670</td>
                    <td>6.5%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Online Course</div>
                        <div className="link-url">Digital Product</div>
                      </div>
                    </td>
                    <td>Mar 1</td>
                    <td>67</td>
                    <td>$6,700</td>
                    <td>4.3%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">E-book Bundle</div>
                        <div className="link-url">Digital Product</div>
                      </div>
                    </td>
                    <td>Mar 10</td>
                    <td>124</td>
                    <td>$1,860</td>
                    <td>7.8%</td>
                  </tr>
                </tbody>
              </table>
            )}
            
            {activeListCategory === 'subscribers' && (
              <table className="links-table">
                <thead>
                  <tr>
                    <th>Subscriber</th>
                    <th>Join Date</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">john.doe@email.com</div>
                        <div className="link-url">Premium Subscriber</div>
                      </div>
                    </td>
                    <td>Jan 15</td>
                    <td>Premium</td>
                    <td>Active</td>
                    <td>92%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">sarah.smith@email.com</div>
                        <div className="link-url">Pro Subscriber</div>
                      </div>
                    </td>
                    <td>Jan 20</td>
                    <td>Pro</td>
                    <td>Active</td>
                    <td>87%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">mike.wilson@email.com</div>
                        <div className="link-url">Basic Subscriber</div>
                      </div>
                    </td>
                    <td>Feb 1</td>
                    <td>Basic</td>
                    <td>Active</td>
                    <td>65%</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">emma.jones@email.com</div>
                        <div className="link-url">Premium Subscriber</div>
                      </div>
                    </td>
                    <td>Feb 10</td>
                    <td>Premium</td>
                    <td>Active</td>
                    <td>94%</td>
                  </tr>
                </tbody>
              </table>
            )}
            
            {activeListCategory === 'earning' && (
              <table className="links-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Affiliate Commission</div>
                        <div className="link-url">Amazon Partnership</div>
                      </div>
                    </td>
                    <td>Apr 10</td>
                    <td>Affiliate</td>
                    <td>$485.20</td>
                    <td>Paid</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Product Sales</div>
                        <div className="link-url">Template Pack</div>
                      </div>
                    </td>
                    <td>Apr 11</td>
                    <td>Product</td>
                    <td>$320.00</td>
                    <td>Paid</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Ad Revenue</div>
                        <div className="link-url">Google AdSense</div>
                      </div>
                    </td>
                    <td>Apr 12</td>
                    <td>Ads</td>
                    <td>$156.50</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td className="link-status">
                      <div className="link-info">
                        <div className="link-name">Subscription</div>
                        <div className="link-url">Monthly Plan</div>
                      </div>
                    </td>
                    <td>Apr 13</td>
                    <td>Subscription</td>
                    <td>$89.99</td>
                    <td>Paid</td>
                  </tr>
                </tbody>
              </table>
            )}
          </section>
          
          {/* Simple Links Table */}
          <section className="widget links-widget">
            <div className="widget-header">
              <h2>Recently Created Links</h2>
              <div className="widget-filter">
                <span>Last 30 days</span>
                <span className="dropdown-arrow"></span>
              </div>
            </div>
            
            <table className="links-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Views</th>
                  <th>Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="link-status">
                    <div className="link-info">
                      <div className="link-name">Amazon</div>
                      <div className="link-url">qukl.ink/macbook-pro</div>
                    </div>
                  </td>
                  <td>Fri, Apr 9</td>
                  <td>28 Views</td>
                  <td>$3,140.00</td>
                </tr>
                <tr>
                  <td className="link-status">
                    <div className="link-info">
                      <div className="link-name">Amazon</div>
                      <div className="link-url">qukl.ink/macbook-pro</div>
                    </div>
                  </td>
                  <td>Sat, Apr 10</td>
                  <td>24 Views</td>
                  <td>$2,568.00</td>
                </tr>
                <tr>
                  <td className="link-status">
                    <div className="link-info">
                      <div className="link-name">Amazon</div>
                      <div className="link-url">qukl.ink/macbook-pro</div>
                    </div>
                  </td>
                  <td>Sun, Apr 11</td>
                  <td>16 Views</td>
                  <td>$1,375.98</td>
                </tr>
                <tr>
                  <td className="link-status">
                    <div className="link-info">
                      <div className="link-name">Amazon</div>
                      <div className="link-url">qukl.ink/macbook-pro</div>
                    </div>
                  </td>
                  <td>Mon, Apr 12</td>
                  <td>48 Views</td>
                  <td>$4,955.86</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
        
        {/* Back to top button */}
        <button
          className="back-to-top-btn"
          onClick={() => {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
              mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <svg className="back-to-top-icon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      </main>
    </div>
  );
}

export default Dashboard;

