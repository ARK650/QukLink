import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import './Collections.css';

type SubMenuKey = 'shop' | 'subscriptions' | 'bookmarks';

interface CollectionData {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  overlayText?: string;
  status: 'active' | 'unlisted' | 'subscriber' | 'scheduled';
  created: string;
  linkClicks: number;
  linkClicksChange: number;
  views: number;
  viewsChange: number;
  lifeGrowth: number;
  lifeGrowthChange: number;
}

function Collections() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('collections');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'active' | 'unlisted' | 'subscriber' | 'total' | 'earnings'>('active');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [showAnalyticsView, setShowAnalyticsView] = useState(false);
  const [analyticsCollection, setAnalyticsCollection] = useState<CollectionData | null>(null);
  
  const [subMenus, setSubMenus] = useState<Record<SubMenuKey, boolean>>({
    shop: false,
    subscriptions: false,
    bookmarks: false
  });

  // Dummy data for collections - Updated with laptop and car images + 25 more entries
  const [collectionsData] = useState<CollectionData[]>([
    {
      id: '1',
      title: 'MacBook Pro 16-inch',
      url: 'qukl.ink/macbook-pro-16',
      thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=135&h=115&fit=crop&auto=format',
      overlayText: '50% OFF',
      status: 'active',
      created: '21 Sep, 2020',
      linkClicks: 26,
      linkClicksChange: 37.8,
      views: 256,
      viewsChange: 37.8,
      lifeGrowth: 883,
      lifeGrowthChange: 4.2
    },
    {
      id: '2',
      title: 'Tesla Model 3',
      url: 'qukl.ink/tesla-model-3',
      thumbnail: 'https://images.unsplash.com/photo-1549927681-0bb2ee2c665d?w=135&h=115&fit=crop&auto=format',
      overlayText: '30% OFF',
      status: 'active',
      created: '22 Oct, 2020',
      linkClicks: 16,
      linkClicksChange: 37.8,
      views: 256,
      viewsChange: 37.8,
      lifeGrowth: 583,
      lifeGrowthChange: -0.8
    },
    {
      id: '3',
      title: 'Dell XPS 13',
      url: 'qukl.ink/dell-xps-13',
      thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 3 days',
      status: 'unlisted',
      created: '1 Feb, 2020',
      linkClicks: 26,
      linkClicksChange: 37.8,
      views: 160,
      viewsChange: 37.8,
      lifeGrowth: 274,
      lifeGrowthChange: 3.2
    },
    {
      id: '4',
      title: 'BMW M3 Series',
      url: 'qukl.ink/bmw-m3',
      thumbnail: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=135&h=115&fit=crop&auto=format',
      overlayText: '15% OFF',
      status: 'active',
      created: '17 Oct, 2020',
      linkClicks: 16,
      linkClicksChange: 37.8,
      views: 256,
      viewsChange: 37.8,
      lifeGrowth: 556,
      lifeGrowthChange: 6.1
    },
    {
      id: '5',
      title: 'MacBook Air M2',
      url: 'qukl.ink/macbook-air-m2',
      thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 5 days',
      status: 'unlisted',
      created: '8 Sep, 2020',
      linkClicks: 26,
      linkClicksChange: 37.8,
      views: 256,
      viewsChange: 37.8,
      lifeGrowth: 453,
      lifeGrowthChange: 2.7
    },
    {
      id: '6',
      title: 'Audi A4 Sedan',
      url: 'qukl.ink/audi-a4',
      thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=135&h=115&fit=crop&auto=format',
      overlayText: '25% OFF',
      status: 'active',
      created: '15 Nov, 2020',
      linkClicks: 34,
      linkClicksChange: 45.2,
      views: 320,
      viewsChange: 25.6,
      lifeGrowth: 720,
      lifeGrowthChange: 8.5
    },
    {
      id: '7',
      title: 'Gaming Laptop ROG',
      url: 'qukl.ink/rog-gaming',
      thumbnail: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=135&h=115&fit=crop&auto=format',
      overlayText: '40% OFF',
      status: 'subscriber',
      created: '3 Dec, 2020',
      linkClicks: 42,
      linkClicksChange: 28.9,
      views: 180,
      viewsChange: 15.3,
      lifeGrowth: 615,
      lifeGrowthChange: 12.1
    },
    {
      id: '8',
      title: 'Mercedes C-Class',
      url: 'qukl.ink/mercedes-c',
      thumbnail: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=135&h=115&fit=crop&auto=format',
      overlayText: '20% OFF',
      status: 'active',
      created: '12 Jan, 2021',
      linkClicks: 28,
      linkClicksChange: 22.7,
      views: 290,
      viewsChange: 33.4,
      lifeGrowth: 498,
      lifeGrowthChange: 6.8
    },
    {
      id: '9',
      title: 'Surface Pro 8',
      url: 'qukl.ink/surface-pro-8',
      thumbnail: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 2 days',
      status: 'scheduled',
      created: '25 Feb, 2021',
      linkClicks: 19,
      linkClicksChange: 18.5,
      views: 210,
      viewsChange: 12.8,
      lifeGrowth: 387,
      lifeGrowthChange: 4.3
    },
    {
      id: '10',
      title: 'Honda Civic',
      url: 'qukl.ink/honda-civic',
      thumbnail: 'https://images.unsplash.com/photo-1549399479-1519ba4e8831?w=135&h=115&fit=crop&auto=format',
      overlayText: '10% OFF',
      status: 'active',
      created: '8 Mar, 2021',
      linkClicks: 31,
      linkClicksChange: 35.1,
      views: 275,
      viewsChange: 28.7,
      lifeGrowth: 642,
      lifeGrowthChange: 9.2
    },
    {
      id: '11',
      title: 'ThinkPad X1 Carbon',
      url: 'qukl.ink/thinkpad-x1',
      thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=135&h=115&fit=crop&auto=format',
      overlayText: '35% OFF',
      status: 'unlisted',
      created: '20 Apr, 2021',
      linkClicks: 37,
      linkClicksChange: 41.6,
      views: 195,
      viewsChange: 19.4,
      lifeGrowth: 521,
      lifeGrowthChange: 7.9
    },
    {
      id: '12',
      title: 'Ford Mustang',
      url: 'qukl.ink/ford-mustang',
      thumbnail: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=135&h=115&fit=crop&auto=format',
      overlayText: '18% OFF',
      status: 'active',
      created: '5 May, 2021',
      linkClicks: 29,
      linkClicksChange: 24.3,
      views: 330,
      viewsChange: 36.9,
      lifeGrowth: 789,
      lifeGrowthChange: 13.5
    },
    {
      id: '13',
      title: 'HP Pavilion',
      url: 'qukl.ink/hp-pavilion',
      thumbnail: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 7 days',
      status: 'subscriber',
      created: '18 Jun, 2021',
      linkClicks: 22,
      linkClicksChange: 16.8,
      views: 245,
      viewsChange: 21.2,
      lifeGrowth: 434,
      lifeGrowthChange: 5.1
    },
    {
      id: '14',
      title: 'Porsche 911',
      url: 'qukl.ink/porsche-911',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=135&h=115&fit=crop&auto=format',
      overlayText: '12% OFF',
      status: 'active',
      created: '2 Jul, 2021',
      linkClicks: 45,
      linkClicksChange: 52.4,
      views: 380,
      viewsChange: 44.7,
      lifeGrowth: 925,
      lifeGrowthChange: 18.3
    },
    {
      id: '15',
      title: 'Alienware Aurora',
      url: 'qukl.ink/alienware-aurora',
      thumbnail: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=135&h=115&fit=crop&auto=format',
      overlayText: '45% OFF',
      status: 'scheduled',
      created: '16 Aug, 2021',
      linkClicks: 38,
      linkClicksChange: 29.7,
      views: 165,
      viewsChange: 14.6,
      lifeGrowth: 578,
      lifeGrowthChange: 8.9
    },
    {
      id: '16',
      title: 'Toyota Camry',
      url: 'qukl.ink/toyota-camry',
      thumbnail: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=135&h=115&fit=crop&auto=format',
      overlayText: '22% OFF',
      status: 'active',
      created: '29 Sep, 2021',
      linkClicks: 33,
      linkClicksChange: 38.9,
      views: 315,
      viewsChange: 31.5,
      lifeGrowth: 697,
      lifeGrowthChange: 11.7
    },
    {
      id: '17',
      title: 'MacBook Pro M1',
      url: 'qukl.ink/macbook-pro-m1',
      thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 4 days',
      status: 'unlisted',
      created: '14 Oct, 2021',
      linkClicks: 41,
      linkClicksChange: 46.8,
      views: 220,
      viewsChange: 26.3,
      lifeGrowth: 812,
      lifeGrowthChange: 15.2
    },
    {
      id: '18',
      title: 'Chevrolet Corvette',
      url: 'qukl.ink/chevrolet-corvette',
      thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=135&h=115&fit=crop&auto=format',
      overlayText: '28% OFF',
      status: 'active',
      created: '27 Nov, 2021',
      linkClicks: 36,
      linkClicksChange: 33.2,
      views: 295,
      viewsChange: 27.8,
      lifeGrowth: 743,
      lifeGrowthChange: 12.9
    },
    {
      id: '19',
      title: 'ASUS ZenBook',
      url: 'qukl.ink/asus-zenbook',
      thumbnail: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=135&h=115&fit=crop&auto=format',
      overlayText: '33% OFF',
      status: 'subscriber',
      created: '10 Dec, 2021',
      linkClicks: 24,
      linkClicksChange: 19.4,
      views: 185,
      viewsChange: 17.9,
      lifeGrowth: 456,
      lifeGrowthChange: 6.2
    },
    {
      id: '20',
      title: 'Lexus ES 350',
      url: 'qukl.ink/lexus-es-350',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=135&h=115&fit=crop&auto=format',
      overlayText: '16% OFF',
      status: 'active',
      created: '23 Jan, 2022',
      linkClicks: 30,
      linkClicksChange: 26.7,
      views: 265,
      viewsChange: 23.5,
      lifeGrowth: 589,
      lifeGrowthChange: 9.8
    },
    {
      id: '21',
      title: 'Razer Blade 15',
      url: 'qukl.ink/razer-blade-15',
      thumbnail: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 6 days',
      status: 'scheduled',
      created: '7 Feb, 2022',
      linkClicks: 39,
      linkClicksChange: 42.1,
      views: 175,
      viewsChange: 15.8,
      lifeGrowth: 634,
      lifeGrowthChange: 10.5
    },
    {
      id: '22',
      title: 'Jaguar F-Type',
      url: 'qukl.ink/jaguar-f-type',
      thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=135&h=115&fit=crop&auto=format',
      overlayText: '24% OFF',
      status: 'active',
      created: '21 Mar, 2022',
      linkClicks: 35,
      linkClicksChange: 39.6,
      views: 340,
      viewsChange: 38.2,
      lifeGrowth: 876,
      lifeGrowthChange: 16.4
    },
    {
      id: '23',
      title: 'Surface Laptop 4',
      url: 'qukl.ink/surface-laptop-4',
      thumbnail: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=135&h=115&fit=crop&auto=format',
      overlayText: '38% OFF',
      status: 'unlisted',
      created: '4 Apr, 2022',
      linkClicks: 27,
      linkClicksChange: 23.8,
      views: 235,
      viewsChange: 20.7,
      lifeGrowth: 512,
      lifeGrowthChange: 7.3
    },
    {
      id: '24',
      title: 'Nissan Altima',
      url: 'qukl.ink/nissan-altima',
      thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=135&h=115&fit=crop&auto=format',
      overlayText: '19% OFF',
      status: 'active',
      created: '17 May, 2022',
      linkClicks: 32,
      linkClicksChange: 28.4,
      views: 285,
      viewsChange: 25.1,
      lifeGrowth: 658,
      lifeGrowthChange: 10.9
    },
    {
      id: '25',
      title: 'LG Gram 17',
      url: 'qukl.ink/lg-gram-17',
      thumbnail: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 8 days',
      status: 'subscriber',
      created: '30 Jun, 2022',
      linkClicks: 26,
      linkClicksChange: 21.5,
      views: 200,
      viewsChange: 18.6,
      lifeGrowth: 467,
      lifeGrowthChange: 6.7
    },
    {
      id: '26',
      title: 'Subaru Outback',
      url: 'qukl.ink/subaru-outback',
      thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=135&h=115&fit=crop&auto=format',
      overlayText: '21% OFF',
      status: 'active',
      created: '13 Jul, 2022',
      linkClicks: 29,
      linkClicksChange: 25.9,
      views: 270,
      viewsChange: 24.3,
      lifeGrowth: 601,
      lifeGrowthChange: 8.6
    },
    {
      id: '27',
      title: 'iPad Pro M2',
      url: 'qukl.ink/ipad-pro-m2',
      thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=135&h=115&fit=crop&auto=format',
      overlayText: '27% OFF',
      status: 'scheduled',
      created: '26 Aug, 2022',
      linkClicks: 34,
      linkClicksChange: 31.7,
      views: 250,
      viewsChange: 22.4,
      lifeGrowth: 723,
      lifeGrowthChange: 11.8
    },
    {
      id: '28',
      title: 'Volkswagen Jetta',
      url: 'qukl.ink/volkswagen-jetta',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=135&h=115&fit=crop&auto=format',
      overlayText: 'Exp: 9 days',
      status: 'unlisted',
      created: '9 Sep, 2022',
      linkClicks: 23,
      linkClicksChange: 18.2,
      views: 190,
      viewsChange: 16.5,
      lifeGrowth: 389,
      lifeGrowthChange: 4.8
    },
    {
      id: '29',
      title: 'MSI Creator 15',
      url: 'qukl.ink/msi-creator-15',
      thumbnail: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=135&h=115&fit=crop&auto=format',
      overlayText: '42% OFF',
      status: 'active',
      created: '22 Oct, 2022',
      linkClicks: 40,
      linkClicksChange: 44.3,
      views: 310,
      viewsChange: 29.8,
      lifeGrowth: 845,
      lifeGrowthChange: 14.7
    },
    {
      id: '30',
      title: 'Hyundai Elantra',
      url: 'qukl.ink/hyundai-elantra',
      thumbnail: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=135&h=115&fit=crop&auto=format',
      overlayText: '14% OFF',
      status: 'active',
      created: '5 Nov, 2022',
      linkClicks: 28,
      linkClicksChange: 24.6,
      views: 280,
      viewsChange: 26.9,
      lifeGrowth: 567,
      lifeGrowthChange: 8.2
    }
  ]);

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
    } else if (path === '/settings') {
      setActiveSection('settings');
    }
  }, [location]);

  useEffect(() => {
    document.title = "QukLink - Collections";
    
    // Close dropdown when clicking outside
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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

  const handleActionsClick = (collectionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === collectionId ? null : collectionId);
  };

  const handleDropdownAction = (action: string, collectionId: string) => {
    if (action === 'analytics') {
      const collection = collectionsData.find(c => c.id === collectionId);
      setAnalyticsCollection(collection || null);
      setShowAnalyticsView(true);
    }
    setOpenDropdown(null);
  };

  const closeAnalyticsView = () => {
    setShowAnalyticsView(false);
    setAnalyticsCollection(null);
  };

  const handleFilterClick = (filter: 'active' | 'unlisted' | 'subscriber' | 'total' | 'earnings') => {
    setActiveFilter(filter);
  };

  const handleSeeAllClick = () => {
    setActiveFilter('total');
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCollections([]);
    } else {
      setSelectedCollections(filteredCollections.map(collection => collection.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCollectionSelect = (collectionId: string) => {
    setSelectedCollections(prev => {
      if (prev.includes(collectionId)) {
        const newSelected = prev.filter(id => id !== collectionId);
        if (newSelected.length === 0) {
          setSelectAll(false);
        }
        return newSelected;
      } else {
        const newSelected = [...prev, collectionId];
        if (newSelected.length === filteredCollections.length) {
          setSelectAll(true);
        }
        return newSelected;
      }
    });
  };

  const getFilteredCollections = () => {
    switch (activeFilter) {
      case 'active':
        return collectionsData.filter(collection => collection.status === 'active');
      case 'unlisted':
        return collectionsData.filter(collection => collection.status === 'unlisted');
      case 'subscriber':
        return collectionsData.filter(collection => collection.status === 'subscriber');
      case 'total':
        return collectionsData; // Show all collections
      case 'earnings':
        return collectionsData.sort((a, b) => b.lifeGrowth - a.lifeGrowth); // Sort by life growth
      default:
        return collectionsData;
    }
  };

  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'active':
        return 'Active Collections';
      case 'unlisted':
        return 'Unlisted Collections';
      case 'subscriber':
        return 'Subscriber Collections';
      case 'total':
        return 'All Collections';
      case 'earnings':
        return 'Collections by Life Growth';
      default:
        return 'All Collections';
    }
  };

  const filteredCollections = getFilteredCollections();

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* Sidebar */}
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
            
            <div className="user-avatar">
              <img src="/icons/avatar.png" alt="User" />
            </div>
          </div>
        </header>
        
        {/* Collections Content */}
        <div className="dashboard-content">
          {showAnalyticsView && analyticsCollection ? (
            /* Analytics View - Full screen replacement */
            <div className="analytics-view">
              <div className="analytics-header">
                <button className="back-button" onClick={closeAnalyticsView}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Collections
                </button>
                <div className="analytics-link-info">
                  <img src={analyticsCollection.thumbnail} alt={analyticsCollection.title} className="analytics-link-thumbnail" />
                  <div className="analytics-link-details">
                    <h1>{analyticsCollection.title}</h1>
                    <span className="analytics-link-url">{analyticsCollection.url}</span>
                  </div>
                </div>
              </div>

              <div className="analytics-content">
                {/* Key Metrics Row */}
                <div className="analytics-metrics-grid">
                  <div className="analytics-metric-card">
                    <div className="metric-icon views-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="metric-content">
                      <div className="metric-value">{analyticsCollection.views.toLocaleString()}</div>
                      <div className="metric-label">Total Views</div>
                      <div className={`metric-change ${analyticsCollection.viewsChange >= 0 ? 'positive' : 'negative'}`}>
                        {analyticsCollection.viewsChange >= 0 ? '↑' : '↓'} {Math.abs(analyticsCollection.viewsChange)}%
                      </div>
                    </div>
                  </div>

                  <div className="analytics-metric-card">
                    <div className="metric-icon clicks-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12L5 10L9 14L19 4L21 6L9 18L3 12Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="metric-content">
                      <div className="metric-value">{analyticsCollection.linkClicks.toLocaleString()}</div>
                      <div className="metric-label">Total Clicks</div>
                      <div className={`metric-change ${analyticsCollection.linkClicksChange >= 0 ? 'positive' : 'negative'}`}>
                        {analyticsCollection.linkClicksChange >= 0 ? '↑' : '↓'} {Math.abs(analyticsCollection.linkClicksChange)}%
                      </div>
                    </div>
                  </div>

                  <div className="analytics-metric-card">
                    <div className="metric-icon earnings-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="metric-content">
                      <div className="metric-value">${analyticsCollection.lifeGrowth.toFixed(2)}</div>
                      <div className="metric-label">Life Growth</div>
                      <div className={`metric-change ${analyticsCollection.lifeGrowthChange >= 0 ? 'positive' : 'negative'}`}>
                        {analyticsCollection.lifeGrowthChange >= 0 ? '↑' : '↓'} {Math.abs(analyticsCollection.lifeGrowthChange)}%
                      </div>
                    </div>
                  </div>

                  <div className="analytics-metric-card">
                    <div className="metric-icon ctr-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="metric-content">
                      <div className="metric-value">2.4%</div>
                      <div className="metric-label">Click Rate</div>
                      <div className="metric-change positive">↑ 12.5%</div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="analytics-charts-section">
                  <div className="chart-container">
                    <h3>Performance Over Time</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-content">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 13L12 8L16 12L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Interactive Chart: Views & Clicks Over Time</p>
                        <small>Real-time data visualization will be implemented here</small>
                      </div>
                    </div>
                  </div>

                  <div className="chart-container">
                    <h3>Traffic Sources</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-content">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <p>Traffic Source Breakdown</p>
                        <small>Instagram, Facebook, Google, WhatsApp, etc.</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analytics */}
                <div className="detailed-analytics">
                  <div className="analytics-section">
                    <h3>Geographic Distribution</h3>
                    <div className="analytics-table">
                      <div className="analytics-table-row">
                        <span>United States</span>
                        <span>1.9K views</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '45%'}}></div>
                        </div>
                      </div>
                      <div className="analytics-table-row">
                        <span>Germany</span>
                        <span>992 views</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '23%'}}></div>
                        </div>
                      </div>
                      <div className="analytics-table-row">
                        <span>Netherlands</span>
                        <span>24.9K views</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '58%'}}></div>
                        </div>
                      </div>
                      <div className="analytics-table-row">
                        <span>United Kingdom</span>
                        <span>532 views</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '12%'}}></div>
                        </div>
                      </div>
                      <div className="analytics-table-row">
                        <span>Vietnam</span>
                        <span>44.4K views</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '100%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="analytics-section">
                    <h3>Device Breakdown</h3>
                    <div className="device-stats">
                      <div className="device-stat">
                        <div className="device-icon mobile">
                          📱
                        </div>
                        <div className="device-info">
                          <span className="device-name">Mobile</span>
                          <span className="device-percentage">68.5%</span>
                        </div>
                      </div>
                      <div className="device-stat">
                        <div className="device-icon desktop">
                          💻
                        </div>
                        <div className="device-info">
                          <span className="device-name">Desktop</span>
                          <span className="device-percentage">24.3%</span>
                        </div>
                      </div>
                      <div className="device-stat">
                        <div className="device-icon tablet">
                          📱
                        </div>
                        <div className="device-info">
                          <span className="device-name">Tablet</span>
                          <span className="device-percentage">7.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
          {/* Collection Overview Section */}
          <section className="collection-overview-section">
            <div className="overview-header">
              <h2>Collection Overview</h2>
              <div className="overview-filter">
                <span>Last 7 days</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div className="collection-overview-panel">
              <div className="overview-content">
                <div 
                  className={`overview-item ${activeFilter === 'active' ? 'active' : ''}`}
                  onClick={() => handleFilterClick('active')}
                >
                  <div className="overview-metric">
                    <div className="overview-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Active
                    </div>
                    <div className="overview-value">1,293</div>
                    <div className="overview-change negative">
                      <span className="trend-arrow">↓</span>
                      36.8%
                    </div>
                    <div className="overview-period">vs last month</div>
                  </div>
                </div>
                
                <div 
                  className={`overview-item ${activeFilter === 'unlisted' ? 'active' : ''}`}
                  onClick={() => handleFilterClick('unlisted')}
                >
                  <div className="overview-metric">
                    <div className="overview-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Unlisted
                    </div>
                    <div className="overview-value">25</div>
                    <div className="overview-change positive">
                      <span className="trend-arrow">↗</span>
                      36.8%
                    </div>
                    <div className="overview-period">vs last month</div>
                  </div>
                </div>
                
                <div 
                  className={`overview-item ${activeFilter === 'subscriber' ? 'active' : ''}`}
                  onClick={() => handleFilterClick('subscriber')}
                >
                  <div className="overview-metric">
                    <div className="overview-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Subscriber
                    </div>
                    <div className="overview-value">2325</div>
                    <div className="overview-change positive">
                      <span className="trend-arrow">↗</span>
                      36.8%
                    </div>
                    <div className="overview-period">vs last month</div>
                  </div>
                </div>
                
                <div 
                  className={`overview-item ${activeFilter === 'total' ? 'active' : ''}`}
                  onClick={() => handleFilterClick('total')}
                >
                  <div className="overview-metric">
                    <div className="overview-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Total Links
                    </div>
                    <div className="overview-value">256</div>
                    <div className="overview-change positive">
                      <span className="trend-arrow">↗</span>
                      36.8%
                    </div>
                    <div className="overview-period">vs last month</div>
                  </div>
                </div>
                
                <div 
                  className={`overview-item ${activeFilter === 'earnings' ? 'active' : ''}`}
                  onClick={() => handleFilterClick('earnings')}
                >
                  <div className="overview-metric">
                    <div className="overview-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Earnings
                    </div>
                    <div className="overview-value">2500</div>
                    <div className="overview-change positive">
                      <span className="trend-arrow">↗</span>
                      36.8%
                    </div>
                    <div className="overview-period">vs last month</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* All Collections Section */}
          <section className="all-collections-container">
            <div className="all-collections-header">
              <div className="header-left">
                <h2>{getFilterTitle()}</h2>
                <div className="search-collections">
                  <input type="text" placeholder="Search by name or email" />
                </div>
              </div>
              <div className="collections-controls">
                <div className="subscriber-only-dropdown">
                  <span>Subscriber Only</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="last-7-days-dropdown">
                  <span>Last 7 days</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <button className="filter-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Filter
                </button>
              </div>
            </div>
            
            <div className="collections-table-container">
              <table className="collections-table">
                <thead>
                  <tr>
                    <th>
                      <input 
                        type="checkbox" 
                        className="select-all-checkbox" 
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Post</th>
                    <th>Created</th>
                    <th>Link clicks</th>
                    <th>Views</th>
                    <th>Life Growth</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCollections.length > 0 ? (
                    filteredCollections.map((collection) => (
                      <tr key={collection.id}>
                        <td>
                          <input 
                            type="checkbox" 
                            className="collection-checkbox" 
                            checked={selectedCollections.includes(collection.id)}
                            onChange={() => handleCollectionSelect(collection.id)}
                          />
                        </td>
                        <td>
                          <div className="collection-post">
                            <div className="post-thumbnail">
                              <img src={collection.thumbnail} alt={collection.title} />
                              {collection.overlayText && (
                                <div className="post-overlay">
                                  <span className="file-type">{collection.overlayText}</span>
                                </div>
                              )}
                            </div>
                            <div className="post-info">
                              <div className="post-title">{collection.title}</div>
                              <div className="post-url">{collection.url} 📋</div>
                              <div className="post-status">
                                {collection.status === 'active' && <span className="status-badge archive">Archive</span>}
                                {collection.status === 'unlisted' && <span className="status-badge unarchive">Unarchive</span>}
                                {collection.status === 'subscriber' && <span className="status-badge subscriber">Subscriber-Only</span>}
                                {collection.status === 'scheduled' && <span className="status-badge scheduled">Scheduled</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="created-cell">{collection.created}</td>
                        <td className="clicks-cell">
                          <div className="metric-cell">
                            <span className="metric-value">{collection.linkClicks}</span>
                            <div className="mini-graph clicks">
                              <div className="mini-graph-line"></div>
                            </div>
                          </div>
                        </td>
                        <td className="views-cell">
                          <div className="metric-cell">
                            <span className="metric-value">{collection.views}</span>
                            <div className="mini-graph views">
                              <div className="mini-graph-line"></div>
                            </div>
                          </div>
                        </td>
                        <td className="life-growth-cell">
                          <div className="metric-cell">
                            <span className="metric-value">{collection.lifeGrowth}</span>
                            <div className="mini-graph collections">
                              <div className="mini-graph-line"></div>
                            </div>
                          </div>
                        </td>
                        <td className="actions-cell">
                          <button 
                            className="actions-button"
                            onClick={(e) => handleActionsClick(collection.id, e)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>
                          
                          {openDropdown === collection.id && (
                            <div className="actions-dropdown">
                              <button 
                                className="dropdown-item"
                                onClick={() => handleDropdownAction('edit', collection.id)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Edit Link
                              </button>
                              
                              <button 
                                className="dropdown-item"
                                onClick={() => handleDropdownAction('analytics', collection.id)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
                                </svg>
                                View Analytics
                              </button>
                              
                              <button 
                                className="dropdown-item"
                                onClick={() => handleDropdownAction('collection', collection.id)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7C5 6.44772 5.44772 6 6 6H18C18.5523 6 19 6.44772 19 7Z" fill="currentColor"/>
                                  <path d="M19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12Z" fill="currentColor"/>
                                  <path d="M18 18C18.5523 18 19 17.5523 19 17C19 16.4477 18.5523 16 18 16H6C5.44772 16 5 16.4477 5 17C5 17.5523 5.44772 18 6 18H18Z" fill="currentColor"/>
                                </svg>
                                Add to Collection
                              </button>
                              
                              <div className="dropdown-divider"></div>
                              
                              <button 
                                className="dropdown-item danger"
                                onClick={() => handleDropdownAction('delete', collection.id)}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Delete forever
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--secondary-text)' }}>
                        No collections found for the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="load-more-container">
              <button className="load-more-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Load more
              </button>
            </div>
          </section>
            </>
          )}
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

export default Collections;