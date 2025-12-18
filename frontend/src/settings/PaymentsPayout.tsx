import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Dashboard.css';
import '../Settings.css';

type SubMenuKey = 'shop' | 'subscriptions' | 'bookmarks' | 'settings';

function PaymentsPayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('settings');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('payout-settings');
  const [insightsPeriod, setInsightsPeriod] = useState('Last 7 days');
  const [insightsDropdownOpen, setInsightsDropdownOpen] = useState(false);
  
  // Payout Settings State
  const [stripeSchedule, setStripeSchedule] = useState('Weekly');
  const [stripeMinAmount, setStripeMinAmount] = useState('25');
  const [stripeAutoPayout, setStripeAutoPayout] = useState(true);
  const [razorpaySchedule, setRazorpaySchedule] = useState('Select category');
  const [razorpayMinAmount, setRazorpayMinAmount] = useState('25');
  const [razorpayAutoPayout, setRazorpayAutoPayout] = useState(true);
  const [preferredPayoutMethod, setPreferredPayoutMethod] = useState('Stripe');
  
  // Dropdown states
  const [stripeScheduleOpen, setStripeScheduleOpen] = useState(false);
  const [razorpayScheduleOpen, setRazorpayScheduleOpen] = useState(false);
  const [preferredMethodOpen, setPreferredMethodOpen] = useState(false);
  
  const [subMenus, setSubMenus] = useState<Record<SubMenuKey, boolean>>({
    shop: false,
    subscriptions: false,
    bookmarks: false,
    settings: true
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
      setSubMenus(prev => ({ ...prev, shop: true }));
    } else if (path.startsWith('/subscriptions/')) {
      setActiveSection('subscriptions');
      setSubMenus(prev => ({ ...prev, subscriptions: true }));
    } else if (path.startsWith('/bookmarks/')) {
      setActiveSection('bookmarks');
      setSubMenus(prev => ({ ...prev, bookmarks: true }));
    } else if (path === '/analytics') {
      setActiveSection('analytics');
    } else if (path === '/notifications') {
      setActiveSection('notifications');
    } else if (path === '/settings' || path.startsWith('/settings/')) {
      setActiveSection('settings');
      if (path.startsWith('/settings/')) {
        setSubMenus(prev => ({ ...prev, settings: true }));
      }
    }
  }, [location]);

  useEffect(() => {
    document.title = "QukLink - Payments & Payout";
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-avatar-container')) {
        setProfileDropdownOpen(false);
      }
      if (!target.closest('.insights-period-dropdown')) {
        setInsightsDropdownOpen(false);
      }
      if (!target.closest('.setting-dropdown')) {
        setStripeScheduleOpen(false);
        setRazorpayScheduleOpen(false);
        setPreferredMethodOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = (mode: 'light' | 'dark') => {
    setIsDarkMode(mode === 'dark');
    document.body.classList.toggle('dark-theme', mode === 'dark');
  };

  const toggleSubmenu = (menu: SubMenuKey, e: React.MouseEvent) => {
    e.preventDefault();
    setSubMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-theme' : ''}`}>
      <aside className={`sidebar ${expanded ? '' : 'collapsed'}`}>
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
              <a onClick={(e) => toggleSubmenu('settings', e)}
                className={subMenus.settings ? 'expanded' : ''}
              >
                <span className="nav-icon">
                  <img src="/icons/settings_sidebar.png" alt="Settings" />
                </span>
                <span className="nav-text">Settings</span>
                <span className={`nav-chevron ${subMenus.settings ? 'expanded' : ''}`}></span>
              </a>
              <ul className={`submenu ${subMenus.settings ? 'expanded' : ''}`}>
                <li onClick={(e) => { e.preventDefault(); navigate('/settings'); }}>
                  <a>Settings</a>
                </li>
                <li onClick={(e) => { e.preventDefault(); navigate('/settings/payments-payout'); }}>
                  <a>Payments & Payout</a>
                </li>
                <li onClick={(e) => { e.preventDefault(); navigate('/settings/profile'); }}>
                  <a>Profile Settings</a>
                </li>
              </ul>
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
                    <>
                      <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                      <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                    </>
                  ) : (
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
      </aside>

      <main className="main-content">
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
                        <div className="profile-email">sarah.smith@example.com</div>
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
                      <span className="menu-icon">📁</span>
                      Collections
                    </button>
                  </div>
                  
                  <div className="profile-dropdown-divider"></div>
                  
                  <div className="profile-dropdown-footer">
                    <button 
                      className="profile-menu-item logout-item"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/');
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
        
        <div className="dashboard-content settings-content">
          <div className="payout-header">
            <h1>Payments & Payouts</h1>
            <p className="payout-subtitle">Connect payment providers to receive customer payments with automatic payouts</p>
          </div>
          
          {/* Insights Panel - Always Visible */}
          <div className="payout-insights-panel">
            <div className="insights-header">
              <div className="insights-title">
                <div className="section-icon orange"></div>
                <h2>Insights</h2>
              </div>
              <div className="insights-period-dropdown">
                <button 
                  className="period-dropdown-btn"
                  onClick={() => setInsightsDropdownOpen(!insightsDropdownOpen)}
                >
                  {insightsPeriod}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {insightsDropdownOpen && (
                  <div className="period-dropdown-menu">
                    {['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year', 'All time'].map(period => (
                      <button
                        key={period}
                        className={`period-option ${insightsPeriod === period ? 'active' : ''}`}
                        onClick={() => {
                          setInsightsPeriod(period);
                          setInsightsDropdownOpen(false);
                        }}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="insights-stats-row">
              <div className="insight-stat-card">
                <div className="insight-stat-icon green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="insight-stat-label">Next Payout</span>
                <span className="insight-stat-value">25</span>
                <span className="insight-stat-change green">↑ Ready for payout</span>
              </div>
              
              <div className="insight-stat-card">
                <div className="insight-stat-icon blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="insight-stat-label">Last Payout</span>
                <span className="insight-stat-value">60+</span>
                <span className="insight-stat-change green">↑ Last Paid Amount</span>
              </div>
              
              <div className="insight-stat-card">
                <div className="insight-stat-icon purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="insight-stat-label">Pending Payout</span>
                <span className="insight-stat-value">128</span>
                <span className="insight-stat-change orange">↑ Unpaid Amount</span>
              </div>
              
              <div className="insight-stat-card">
                <div className="insight-stat-icon cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <span className="insight-stat-label">Ads Revenue</span>
                <span className="insight-stat-value">$2325</span>
                <span className="insight-stat-change green">↑ Revenue From Ads</span>
              </div>
              
              <div className="insight-stat-card">
                <div className="insight-stat-icon orange">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="insight-stat-label">Total Earnings</span>
                <span className="insight-stat-value">800+</span>
                <span className="insight-stat-change orange">↑ All time earnings</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="payout-tabs">
            <button 
              className={`payout-tab ${activeTab === 'payment-providers' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment-providers')}
            >
              Payment Providers
            </button>
            <button 
              className={`payout-tab ${activeTab === 'payout-settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('payout-settings')}
            >
              Payout Settings
            </button>
            <button 
              className={`payout-tab ${activeTab === 'transaction-history' ? 'active' : ''}`}
              onClick={() => setActiveTab('transaction-history')}
            >
              Transaction History
            </button>
          </div>

          {/* Payment Providers Tab Content */}
          {activeTab === 'payment-providers' && (
            <div className="payout-content payout-tab-content">
              {/* Connected Payment Providers Section */}
              <div className="payout-section">
                <div className="payout-section-header">
                  <div className="section-title-container">
                    <div className="section-icon purple"></div>
                    <h2>Connected Payment Providers</h2>
                  </div>
                  <button className="manage-btn">
                    Manage <span className="settings-icon">⚙️</span>
                  </button>
                </div>

                {/* Stripe Provider */}
                <div className="provider-card">
                  <div className="provider-header">
                    <div className="provider-logo stripe">
                      <span className="provider-initial">S</span>
                    </div>
                    <div className="provider-info">
                      <h3>Stripe</h3>
                      <p>Global payment processing with instant payouts</p>
                      <div className="provider-badges">
                        <span className="badge connected">Connected</span>
                        <span className="badge kyc">KYC Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="provider-stats">
                    <div className="stat-card">
                      <div className="stat-icon earnings"></div>
                      <div className="stat-info">
                        <span className="stat-label">Total Earnings</span>
                        <div className="stat-value-row">
                          <span className="stat-value">$1,570.56</span>
                          <span className="stat-change positive">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 9L6 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            +4.85%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon payout"></div>
                      <div className="stat-info">
                        <span className="stat-label">Last Payout</span>
                        <div className="stat-value-row">
                          <span className="stat-value">$324.89</span>
                          <span className="stat-change positive">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 9L6 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            +2.02%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon next-payout"></div>
                      <div className="stat-info">
                        <span className="stat-label">Next Payout</span>
                        <div className="stat-value-row">
                          <span className="stat-value">$798,15.00</span>
                          <span className="stat-change positive">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 9L6 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            +2.74%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bank-account">
                    <div className="bank-icon"></div>
                    <div className="bank-info">
                      <h4>Bank Account</h4>
                      <p>Chase Bank ******1234</p>
                    </div>
                    <span className="badge connected">Connected</span>
                  </div>
                </div>

                {/* Razorpay Provider */}
                <div className="provider-card">
                  <div className="provider-header">
                    <div className="provider-logo razorpay">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4L20 20M4 20L20 4" stroke="white" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="provider-info">
                      <h3>Razorpay</h3>
                      <p>Global payment processing with instant payouts</p>
                    </div>
                  </div>

                  <div className="provider-stats">
                    <div className="stat-card">
                      <div className="stat-icon earnings"></div>
                      <div className="stat-info">
                        <span className="stat-label">Total Earnings</span>
                        <div className="stat-value-row">
                          <span className="stat-value">$1,570.56</span>
                          <span className="stat-change positive">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 9L6 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            +4.85%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon payout"></div>
                      <div className="stat-info">
                        <span className="stat-label">Last Payout</span>
                        <div className="stat-value-row">
                          <span className="stat-value">$324.89</span>
                          <span className="stat-change positive">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 9L6 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            +2.02%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon next-payout"></div>
                      <div className="stat-info">
                        <span className="stat-label">Next Payout</span>
                        <div className="stat-value-row">
                          <span className="stat-value">$798,15.00</span>
                          <span className="stat-change positive">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 9L6 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            +2.74%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bank-account">
                    <div className="bank-icon"></div>
                    <div className="bank-info">
                      <h4>Bank Account</h4>
                      <p>Chase Bank ******1234</p>
                    </div>
                    <span className="badge connected">Connected</span>
                  </div>
                </div>

                {/* PayPal Provider */}
                <div className="provider-card">
                  <div className="provider-header">
                    <div className="provider-logo paypal">
                      <span className="provider-initial">P</span>
                    </div>
                    <div className="provider-info">
                      <h3>PayPal</h3>
                      <p>Global payment processing with instant payouts</p>
                    </div>
                    <button className="disconnect-btn">Disconnect</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payout Settings Tab */}
          {activeTab === 'payout-settings' && (
            <div className="payout-content payout-tab-content">
              {/* Connected Payment Providers - Two Column Layout */}
              <div className="payout-providers-grid">
                {/* Stripe Provider Card */}
                <div className="payout-provider-card">
                  <div className="payout-section-header">
                    <div className="section-title-container">
                      <div className="section-icon cyan"></div>
                      <h2>Connected Payment Providers</h2>
                    </div>
                  </div>
                  
                  <div className="provider-brand-row">
                    <div className="provider-logo stripe">
                      <span className="provider-initial">S</span>
                    </div>
                    <div className="provider-brand-info">
                      <h3>Stripe</h3>
                      <p>Global payment processing with instant payouts</p>
                    </div>
                  </div>
                  
                  <div className="payout-setting-row">
                    <span className="setting-label">Payment Schedule</span>
                    <div className="setting-dropdown">
                      <button 
                        className="dropdown-select-btn"
                        onClick={() => setStripeScheduleOpen(!stripeScheduleOpen)}
                      >
                        {stripeSchedule}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {stripeScheduleOpen && (
                        <div className="dropdown-select-menu">
                          {['Daily', 'Weekly', 'Bi-weekly', 'Monthly'].map(option => (
                            <button
                              key={option}
                              className={`dropdown-option ${stripeSchedule === option ? 'active' : ''}`}
                              onClick={() => {
                                setStripeSchedule(option);
                                setStripeScheduleOpen(false);
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="payout-setting-row">
                    <span className="setting-label">Minimum Amount</span>
                    <input 
                      type="text" 
                      className="setting-input"
                      value={stripeMinAmount}
                      onChange={(e) => setStripeMinAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="payout-setting-row">
                    <div className="setting-label-group">
                      <span className="setting-label">Automatic Payout</span>
                      <span className="setting-sublabel">Managed By Stripe</span>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={stripeAutoPayout}
                        onChange={() => setStripeAutoPayout(!stripeAutoPayout)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="next-payout-info">
                    <div className="next-payout-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 14H8.01M12 14H12.01M16 14H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="next-payout-text">
                      <span className="next-payout-label">Next Payout</span>
                      <span className="next-payout-date">Oct 22, 2023, 04:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Razorpay Provider Card */}
                <div className="payout-provider-card">
                  <div className="payout-section-header">
                    <div className="section-title-container">
                      <div className="section-icon orange"></div>
                      <h2>Connected Payment Providers</h2>
                    </div>
                  </div>
                  
                  <div className="provider-brand-row">
                    <div className="provider-logo razorpay">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 19L19 5M5 5L19 19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="provider-brand-info">
                      <h3>Razorpay</h3>
                      <p>Global payment processing with instant payouts</p>
                    </div>
                  </div>
                  
                  <div className="payout-setting-row">
                    <span className="setting-label">Payment Schedule</span>
                    <div className="setting-dropdown">
                      <button 
                        className="dropdown-select-btn"
                        onClick={() => setRazorpayScheduleOpen(!razorpayScheduleOpen)}
                      >
                        {razorpaySchedule}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {razorpayScheduleOpen && (
                        <div className="dropdown-select-menu">
                          {['Daily', 'Weekly', 'Bi-weekly', 'Monthly'].map(option => (
                            <button
                              key={option}
                              className={`dropdown-option ${razorpaySchedule === option ? 'active' : ''}`}
                              onClick={() => {
                                setRazorpaySchedule(option);
                                setRazorpayScheduleOpen(false);
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="payout-setting-row">
                    <span className="setting-label">Minimum Amount</span>
                    <input 
                      type="text" 
                      className="setting-input"
                      value={razorpayMinAmount}
                      onChange={(e) => setRazorpayMinAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="payout-setting-row">
                    <div className="setting-label-group">
                      <span className="setting-label">Automatic Payout</span>
                      <span className="setting-sublabel">Managed By Stripe</span>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={razorpayAutoPayout}
                        onChange={() => setRazorpayAutoPayout(!razorpayAutoPayout)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="next-payout-info">
                    <div className="next-payout-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 14H8.01M12 14H12.01M16 14H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="next-payout-text">
                      <span className="next-payout-label">Next Payout</span>
                      <span className="next-payout-date">Oct 22, 2023, 04:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ad Revenue Payout Section */}
              <div className="ad-revenue-section">
                <div className="payout-section-header">
                  <div className="section-title-container">
                    <div className="section-icon blue"></div>
                    <h2>Ad Revenue Payout</h2>
                  </div>
                </div>
                
                <div className="ad-revenue-content">
                  <div className="ad-revenue-row">
                    <div className="ad-revenue-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 14L12 9L16 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="ad-revenue-info">
                      <h4>Preferred Payout Method</h4>
                      <p>Ad revenue will be automatically transferred to your selected payout method on the 10th of each month.</p>
                    </div>
                    <div className="setting-dropdown preferred-method">
                      <button 
                        className="dropdown-select-btn"
                        onClick={() => setPreferredMethodOpen(!preferredMethodOpen)}
                      >
                        {preferredPayoutMethod}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {preferredMethodOpen && (
                        <div className="dropdown-select-menu">
                          {['Stripe', 'Razorpay', 'PayPal', 'Bank Transfer'].map(option => (
                            <button
                              key={option}
                              className={`dropdown-option ${preferredPayoutMethod === option ? 'active' : ''}`}
                              onClick={() => {
                                setPreferredPayoutMethod(option);
                                setPreferredMethodOpen(false);
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transaction History Tab */}
          {activeTab === 'transaction-history' && (
            <div className="payout-content payout-tab-content">
              {/* Recent Transactions Section */}
              <div className="transactions-section">
                <div className="transactions-section-header">
                  <div className="section-title-container">
                    <div className="section-icon yellow"></div>
                    <h2>Recent Transactions</h2>
                  </div>
                </div>
                
                <div className="transactions-list">
                  <div className="transaction-item">
                    <div className="transaction-icon payout-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="transaction-info">
                      <h4>Weekly payout</h4>
                      <p>Thu 11 Jun, 2020 02:22 am • Stripe</p>
                    </div>
                    <div className="transaction-amount-col">
                      <span className="transaction-amount positive">+ $2,568.00</span>
                      <span className="transaction-status transferred">Transferred</span>
                    </div>
                  </div>
                  
                  <div className="transaction-item">
                    <div className="transaction-icon commission-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="transaction-info">
                      <h4>Affiliate commission - Affiliate commission</h4>
                      <p>Mon 08 Jun, 2020 01:55 am • Stripe</p>
                    </div>
                    <div className="transaction-amount-col">
                      <span className="transaction-amount positive">+ $2,568.00</span>
                      <span className="transaction-status transferred">Transferred</span>
                    </div>
                  </div>
                  
                  <div className="transaction-item">
                    <div className="transaction-icon fee-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="transaction-info">
                      <h4>Processing Fee</h4>
                      <p>Thu 04 Jun, 2020 04:51 am • Stripe</p>
                    </div>
                    <div className="transaction-amount-col">
                      <span className="transaction-amount positive">+ $2,568.00</span>
                      <span className="transaction-status pending">Pending</span>
                    </div>
                  </div>
                  
                  <div className="transaction-item">
                    <div className="transaction-icon revenue-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="transaction-info">
                      <h4>Ad Revenue</h4>
                      <p>Tue 02 Jun, 2020 09:12 am • Stripe</p>
                    </div>
                    <div className="transaction-amount-col">
                      <span className="transaction-amount negative">- $2,568.00</span>
                      <span className="transaction-status transferred">Transferred</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions History Section */}
              <div className="transactions-section">
                <div className="transactions-section-header">
                  <div className="section-title-container">
                    <div className="section-icon purple"></div>
                    <h2>Transactions History</h2>
                  </div>
                </div>
                
                <div className="transactions-list detailed">
                  <div className="transaction-item detailed">
                    <div className="transaction-icon success-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="transaction-info">
                      <h4>Link monetization - Premium User subscription</h4>
                      <p>Thu 11 Jun, 2020 02:22 am • Stripe • john.doe@example.com</p>
                      <div className="transaction-breakdown">
                        <span className="breakdown-item">Gross: <strong>$680</strong></span>
                        <span className="breakdown-item fee">Platform Fees: <strong>-12.55</strong></span>
                        <span className="breakdown-item net">Net: <strong>$112.95</strong></span>
                      </div>
                    </div>
                    <div className="transaction-amount-col">
                      <span className="transaction-amount positive">+ $2,568.00</span>
                      <span className="transaction-status transferred">Transferred</span>
                    </div>
                  </div>
                  
                  <div className="transaction-item detailed">
                    <div className="transaction-icon payout-arrow-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="transaction-info">
                      <h4>Weekly payout to bank account</h4>
                      <p>Mon 08 Jun, 2020 01:55 am • Stripe</p>
                      <div className="transaction-breakdown">
                        <span className="breakdown-item">Gross: <strong>$680</strong></span>
                        <span className="breakdown-item fee">Platform Fees: <strong>-12.55</strong></span>
                        <span className="breakdown-item net">Net: <strong>$112.95</strong></span>
                      </div>
                    </div>
                    <div className="transaction-amount-col">
                      <span className="transaction-amount positive">+ $2,568.00</span>
                      <span className="transaction-status transferred">Transferred</span>
                    </div>
                  </div>
                  
                  <div className="transaction-item detailed">
                    <div className="transaction-icon success-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="transaction-info">
                      <h4>Link monetization - one-time purchase</h4>
                      <p>Thu 04 Jun, 2020 04:51 am • Stripe</p>
                      <div className="transaction-breakdown">
                        <span className="breakdown-item">Gross: <strong>$680</strong></span>
                        <span className="breakdown-item fee">Platform Fees: <strong>-12.55</strong></span>
                        <span className="breakdown-item net">Net: <strong>$112.95</strong></span>
                      </div>
                    </div>
                    <div className="transaction-amount-col">
                      <span className="transaction-amount positive">+ $2,568.00</span>
                      <span className="transaction-status pending">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button className="back-to-top-btn" onClick={() => {
          window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
          });
        }}>
          <svg className="back-to-top-icon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      </main>
    </div>
  );
}

export default PaymentsPayout;
