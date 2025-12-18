// API Service Layer for QukLink Frontend
// Connects to Express backend at localhost:5000

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface User {
  _id: string;
  email: string;
  displayName: string;
  username: string;
  profileImage?: string;
  bio?: string;
  profile?: {
    phone?: string;
    location?: string;
    website?: string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      youtube?: string;
      tiktok?: string;
    };
  };
  settings?: {
    theme: 'light' | 'dark' | 'system';
    emailNotifications: boolean;
    pushNotifications: boolean;
    adMonetization: boolean;
  };
  stats?: {
    totalViews: number;
    totalClicks: number;
    totalEarnings: number;
    subscriberCount: number;
  };
}

export interface Link {
  _id: string;
  user: string | User;
  title: string;
  originalUrl: string;
  shortCode: string;
  thumbnail?: string;
  description?: string;
  collection?: string;
  tags?: string[];
  isActive: boolean;
  stats: {
    views: number;
    clicks: number;
    earnings: number;
  };
  scheduling?: {
    startDate?: Date;
    endDate?: Date;
  };
  limitedAccess?: {
    enabled: boolean;
    maxClicks?: number;
    password?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  _id: string;
  user: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  isPublic: boolean;
  linkCount: number;
  createdAt: string;
}

export interface Notification {
  _id: string;
  user: string;
  type: 'subscriber' | 'tip' | 'purchase' | 'milestone' | 'system' | 'payout';
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Product {
  _id: string;
  user: string;
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  thumbnail?: string;
  category?: string;
  productType: 'digital' | 'physical' | 'service';
  status: 'draft' | 'active' | 'archived';
  stats: {
    views: number;
    sales: number;
    revenue: number;
  };
  createdAt: string;
}

export interface Subscription {
  _id: string;
  creator: string | User;
  subscriber: string | User;
  plan: 'free' | 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  price: number;
  startDate: string;
  endDate?: string;
}

export interface Payout {
  _id: string;
  user: string;
  amount: number;
  provider: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    credentials: 'include', // Include cookies for auth
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = localStorage.getItem('quklink_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error: any) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ============ AUTH API ============
export const authApi = {
  register: (data: { email: string; password: string; displayName?: string }) =>
    apiCall<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiCall<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiCall('/auth/logout', { method: 'POST' }),

  getMe: () =>
    apiCall<User>('/auth/me'),

  googleAuth: () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },
};

// ============ USER API ============
export const userApi = {
  updateProfile: (data: Partial<User>) =>
    apiCall<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateSettings: (settings: User['settings']) =>
    apiCall<User>('/users/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  getStats: () =>
    apiCall<User['stats']>('/users/stats'),

  getPublicProfile: (username: string) =>
    apiCall<User>(`/users/profile/${username}`),

  getPaymentProviders: () =>
    apiCall<any[]>('/users/payment-providers'),

  addPaymentProvider: (data: { provider: string; accountDetails: any }) =>
    apiCall('/users/payment-providers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePaymentProvider: (providerId: string, data: any) =>
    apiCall(`/users/payment-providers/${providerId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  removePaymentProvider: (providerId: string) =>
    apiCall(`/users/payment-providers/${providerId}`, {
      method: 'DELETE',
    }),
};

// ============ LINKS API ============
export const linksApi = {
  getLinks: (params?: { page?: number; limit?: number; collection?: string; status?: string }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<Link[]>(`/links${queryString ? `?${queryString}` : ''}`);
  },

  getLink: (id: string) =>
    apiCall<Link>(`/links/${id}`),

  createLink: (data: Partial<Link>) =>
    apiCall<Link>('/links', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateLink: (id: string, data: Partial<Link>) =>
    apiCall<Link>(`/links/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteLink: (id: string) =>
    apiCall(`/links/${id}`, { method: 'DELETE' }),

  getRecentLinks: (limit = 5) =>
    apiCall<Link[]>(`/links/recent?limit=${limit}`),
};

// ============ COLLECTIONS API ============
export const collectionsApi = {
  getCollections: () =>
    apiCall<Collection[]>('/collections'),

  getCollection: (id: string) =>
    apiCall<Collection>(`/collections/${id}`),

  createCollection: (data: Partial<Collection>) =>
    apiCall<Collection>('/collections', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCollection: (id: string, data: Partial<Collection>) =>
    apiCall<Collection>(`/collections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCollection: (id: string) =>
    apiCall(`/collections/${id}`, { method: 'DELETE' }),
};

// ============ ANALYTICS API ============
export const analyticsApi = {
  getInsights: (period = '30d') =>
    apiCall<{
      totalViews: number;
      totalClicks: number;
      totalEarnings: number;
      subscriberCount: number;
      viewsChange: number;
      clicksChange: number;
      earningsChange: number;
      subscribersChange: number;
    }>(`/analytics/insights?period=${period}`),

  getTopLinks: (limit = 5) =>
    apiCall<Link[]>(`/analytics/top-links?limit=${limit}`),

  getChartData: (period = '30d') =>
    apiCall<{ date: string; views: number; clicks: number; earnings: number }[]>(
      `/analytics/chart?period=${period}`
    ),

  getDeviceAnalytics: () =>
    apiCall<{ device: string; count: number; percentage: number }[]>('/analytics/devices'),
};

// ============ NOTIFICATIONS API ============
export const notificationsApi = {
  getNotifications: (params?: { page?: number; limit?: number; type?: string; isRead?: boolean }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<Notification[]>(`/notifications${queryString ? `?${queryString}` : ''}`);
  },

  markAsRead: (id: string) =>
    apiCall(`/notifications/${id}/read`, { method: 'PUT' }),

  markAllAsRead: () =>
    apiCall('/notifications/read-all', { method: 'PUT' }),

  deleteNotification: (id: string) =>
    apiCall(`/notifications/${id}`, { method: 'DELETE' }),

  getUnreadCount: () =>
    apiCall<{ count: number }>('/notifications/unread-count'),
};

// ============ SHOP API ============
export const shopApi = {
  // Products
  getProducts: (params?: { page?: number; limit?: number; status?: string; category?: string }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<Product[]>(`/shop/products${queryString ? `?${queryString}` : ''}`);
  },

  getProduct: (id: string) =>
    apiCall<Product>(`/shop/products/${id}`),

  createProduct: (data: Partial<Product>) =>
    apiCall<Product>('/shop/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProduct: (id: string, data: Partial<Product>) =>
    apiCall<Product>(`/shop/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProduct: (id: string) =>
    apiCall(`/shop/products/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: (params?: { page?: number; limit?: number; status?: string }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<any[]>(`/shop/orders${queryString ? `?${queryString}` : ''}`);
  },

  getOrder: (id: string) =>
    apiCall(`/shop/orders/${id}`),

  updateOrder: (id: string, data: { status?: string; notes?: string }) =>
    apiCall(`/shop/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Sales
  getSalesAnalytics: (period = '30d') =>
    apiCall<{
      totalRevenue: number;
      totalOrders: number;
      avgOrderValue: number;
      dailySales: { _id: string; revenue: number; orders: number }[];
    }>(`/shop/sales?period=${period}`),
};

// ============ SUBSCRIPTIONS API ============
export const subscriptionsApi = {
  getSubscriptions: (params?: { page?: number; limit?: number; status?: string }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<Subscription[]>(`/subscriptions${queryString ? `?${queryString}` : ''}`);
  },

  getSubscribers: (params?: { page?: number; limit?: number; status?: string; plan?: string }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<Subscription[]>(`/subscriptions/subscribers${queryString ? `?${queryString}` : ''}`);
  },

  subscribe: (creatorId: string, data: { plan?: string; paymentMethod?: string }) =>
    apiCall<Subscription>(`/subscriptions/${creatorId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  unsubscribe: (creatorId: string) =>
    apiCall(`/subscriptions/${creatorId}`, { method: 'DELETE' }),

  getStats: () =>
    apiCall<{
      totalSubscribers: number;
      activeSubscribers: number;
      newSubscribers: number;
      monthlyRevenue: number;
    }>('/subscriptions/stats'),

  updateSettings: (data: { monthly?: number; yearly?: number; benefits?: string[] }) =>
    apiCall('/subscriptions/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// ============ BOOKMARKS API ============
export const bookmarksApi = {
  getBookmarks: (params?: { page?: number; limit?: number; collection?: string }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<any[]>(`/bookmarks${queryString ? `?${queryString}` : ''}`);
  },

  addBookmark: (data: { linkId: string; collectionId?: string; notes?: string }) =>
    apiCall('/bookmarks', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  removeBookmark: (id: string) =>
    apiCall(`/bookmarks/${id}`, { method: 'DELETE' }),

  moveBookmark: (id: string, collectionId: string | null) =>
    apiCall(`/bookmarks/${id}/move`, {
      method: 'PUT',
      body: JSON.stringify({ collectionId }),
    }),

  // Bookmark Collections
  getCollections: () =>
    apiCall<any[]>('/bookmarks/collections'),

  createCollection: (data: { name: string; color?: string; description?: string }) =>
    apiCall('/bookmarks/collections', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCollection: (id: string, data: any) =>
    apiCall(`/bookmarks/collections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCollection: (id: string) =>
    apiCall(`/bookmarks/collections/${id}`, { method: 'DELETE' }),
};

// ============ PAYOUTS API ============
export const payoutsApi = {
  getPayouts: (params?: { page?: number; limit?: number; status?: string }) => {
    const queryString = new URLSearchParams(params as any).toString();
    return apiCall<Payout[]>(`/payouts${queryString ? `?${queryString}` : ''}`);
  },

  getPayout: (id: string) =>
    apiCall<Payout>(`/payouts/${id}`),

  requestPayout: (data: { amount: number; provider: string }) =>
    apiCall<Payout>('/payouts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  cancelPayout: (id: string) =>
    apiCall(`/payouts/${id}`, { method: 'DELETE' }),

  getStats: () =>
    apiCall<{
      availableBalance: number;
      lifetimeEarnings: number;
      totalPaidOut: number;
      pendingAmount: number;
    }>('/payouts/stats'),
};

// Export all APIs as a single object
export const api = {
  auth: authApi,
  users: userApi,
  links: linksApi,
  collections: collectionsApi,
  analytics: analyticsApi,
  notifications: notificationsApi,
  shop: shopApi,
  subscriptions: subscriptionsApi,
  bookmarks: bookmarksApi,
  payouts: payoutsApi,
};

export default api;
