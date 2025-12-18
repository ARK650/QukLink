import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Dashboard.css';

type SubMenuKey = 'shop' | 'subscriptions' | 'bookmarks';

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('shop');
  
  const [subMenus, setSubMenus] = useState<Record<SubMenuKey, boolean>>({
    shop: true, // Keep shop submenu open
    subscriptions: false,
    bookmarks: false
  });

  useEffect(() => {
    document.title = "QukLink - Products";
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
        {/* ...existing sidebar code... */}
        <div className="sidebar-logo">
          <img src="/images/logo.png" alt="QukLink" />
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className={activeSection === 'dashboard' ? 'active' : ''}>
              <a href="#" onClick={() => navigate('/dashboard')}>
                <span className="nav-icon">
                  <img src="/icons/dashboard_sidebar.png" alt="Dashboard" />
                </span>
                <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li className={activeSection === 'myLinks' ? 'active' : ''}>
              <a href="#" onClick={() => navigate('/my-links')}>
                <span className="nav-icon">
                  <img src="/icons/my_links_sidebar.png" alt="My Links" />
                </span>
                <span className="nav-text">My Links</span>
              </a>
            </li>
            <li className={activeSection === 'collections' ? 'active' : ''}>
              <a href="#" onClick={() => navigate('/collections')}>
                <span className="nav-icon">
                  <img src="/icons/collections_sidebar.png" alt="Collections" />
                </span>
                <span className="nav-text">Collections</span>
              </a>
            </li>
            <li className={activeSection === 'shop' ? 'active' : ''}>
              <a href="#" 
                onClick={(e) => toggleSubmenu('shop', e)}
                className={subMenus.shop ? 'expanded' : ''}
              >
                <span className="nav-icon">
                  <img src="/icons/shop_sidebar.png" alt="Shop" />
                </span>
                <span className="nav-text">Shop</span>
                <span className={`nav-chevron ${subMenus.shop ? 'expanded' : ''}`}></span>
              </a>
              <ul className={`submenu ${subMenus.shop ? 'expanded' : ''}`}>
                <li onClick={() => navigate('/shop/products')} className="active">
                  <a href="#">Products</a>
                </li>
                <li onClick={() => navigate('/shop/orders')}>
                  <a href="#">Orders</a>
                </li>
                <li onClick={() => navigate('/shop/sales')}>
                  <a href="#">Sales</a>
                </li>
              </ul>
            </li>
            {/* ...rest of navigation... */}
            <li className={activeSection === 'subscriptions' ? 'active' : ''}>
              <a href="#" 
                onClick={(e) => toggleSubmenu('subscriptions', e)}
                className={subMenus.subscriptions ? 'expanded' : ''}
              >
                <span className="nav-icon">
                  <img src="/icons/subscriptions_sidebar.png" alt="Subscriptions" />
                </span>
                <span className="nav-text">Subscriptions</span>
                <span className={`nav-chevron ${subMenus.subscriptions ? 'expanded' : ''}`}></span>
              </a>
              <ul className={`submenu ${subMenus.subscriptions ? 'expanded' : ''}`}>
                <li onClick={() => navigate('/subscriptions/my-subscriptions')}>
                  <a href="#">My Subscriptions</a>
                </li>
                <li onClick={() => navigate('/subscriptions/subscribers')}>
                  <a href="#">Subscribers</a>
                </li>
              </ul>
            </li>
            <li className={activeSection === 'bookmarks' ? 'active' : ''}>
              <a href="#" 
                onClick={(e) => toggleSubmenu('bookmarks', e)}
                className={subMenus.bookmarks ? 'expanded' : ''}
              >
                <span className="nav-icon">
                  <img src="/icons/bookmark_sidebar.png" alt="Bookmarks" />
                </span>
                <span className="nav-text">Bookmarks</span>
                <span className={`nav-chevron ${subMenus.bookmarks ? 'expanded' : ''}`}></span>
              </a>
              <ul className={`submenu ${subMenus.bookmarks ? 'expanded' : ''}`}>
                <li onClick={() => navigate('/bookmarks/my-bookmarks')}>
                  <a href="#">My Bookmarks</a>
                </li>
                <li onClick={() => navigate('/bookmarks/collections')}>
                  <a href="#">Collections</a>
                </li>
              </ul>
            </li>
            <li className={activeSection === 'analytics' ? 'active' : ''}>
              <a href="#" onClick={() => navigate('/analytics')}>
                <span className="nav-icon">
                  <img src="/icons/analytics_sidebar.png" alt="Analytics" />
                </span>
                <span className="nav-text">Analytics</span>
              </a>
            </li>
            <li className={activeSection === 'notifications' ? 'active' : ''}>
              <a href="#" onClick={() => navigate('/notifications')}>
                <span className="nav-icon">
                  <img src="/icons/notification_sidebar.png" alt="Notifications" />
                </span>
                <span className="nav-text">Notifications</span>
              </a>
            </li>
            <li className={activeSection === 'settings' ? 'active' : ''}>
              <a href="#" onClick={() => navigate('/settings')}>
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
            
            <div className="notification-bell">
              <span className="notification-badge">2</span>
            </div>
            
            <div className="user-avatar">
              <img src="/icons/avatar.png" alt="User" />
            </div>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="welcome-section">
            <h1>Products</h1>
            <p>Manage your digital products and offerings</p>
          </div>
          
          <section className="widget">
            <div className="widget-header">
              <h2>Your Products</h2>
              <button className="create-button">
                <span className="create-icon">+</span>
                <span>Add Product</span>
              </button>
            </div>
            
            <div style={{ 
              padding: '60px 40px', 
              textAlign: 'center', 
              color: 'var(--secondary-text)' 
            }}>
              <div style={{ marginBottom: '16px', fontSize: '48px', opacity: 0.3 }}>📦</div>
              <h3 style={{ 
                marginBottom: '8px', 
                color: 'var(--primary-text)',
                fontSize: '18px',
                fontWeight: '500'
              }}>
                No products added yet
              </h3>
              <p style={{ marginBottom: '24px', fontSize: '14px' }}>
                Create your first product to start selling through your links
              </p>
              <button className="create-button" style={{ marginTop: '8px' }}>
                <span className="create-icon">+</span>
                <span>Add Your First Product</span>
              </button>
            </div>
          </section>
        </div>
        
        <button className="back-to-top-btn" onClick={() => {
          const mainContent = document.querySelector('.main-content');
          if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          <svg className="back-to-top-icon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      </main>
    </div>
  );
}

export default Products;