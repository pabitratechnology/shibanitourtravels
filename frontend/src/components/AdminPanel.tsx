import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Calendar, Users, FileText, CheckCircle,
  Clock, Trash2, Send, Plus, Search, RefreshCw, BarChart3,
  TrendingUp, AlertTriangle, Image as ImageIcon, PhoneCall,
  Mail, Settings, LogOut, ChevronRight, Menu, X, Edit, Upload, Car, Compass, MessageSquare, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BlogEditorStudio from './admin/BlogEditorStudio.js';

// Helper fetch wrapper
const adminFetch = async (url: string, options: any = {}) => {
  const token = localStorage.getItem('admin_token');
  const headers: any = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : ''
  };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, { ...options, headers });
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('admin_token');
    window.location.reload();
  }
  return response;
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Sidebar toggle for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tab control
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'packages' | 'blogs' | 'gallery' | 'callbacks' | 'enquiries' | 'fleet' | 'drivers'>('dashboard');

  // Data states
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [callbacks, setCallbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isBlogStudioOpen, setIsBlogStudioOpen] = useState(false);

  // Filters
  const [bookingFilter, setBookingFilter] = useState('All');
  const [bookingServiceFilter, setBookingServiceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Auth logic ---
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        try {
          const res = await adminFetch('/api/auth/verify');
          if (res.ok) {
            setIsAuthenticated(true);
            loadAdminData();
          } else {
            localStorage.removeItem('admin_token');
          }
        } catch (_) {
          localStorage.removeItem('admin_token');
        }
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        loadAdminData();
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (_) {
      setAuthError('Connection error to server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    window.location.reload();
  };

  // --- Data Loading ---
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [bkRes, vRes, dRes, eqRes, nRes, bRes, pRes, gRes, cbRes] = await Promise.all([
        adminFetch('/api/bookings'),
        adminFetch('/api/vehicles'),
        adminFetch('/api/drivers'),
        adminFetch('/api/enquiries'),
        adminFetch('/api/notifications'),
        adminFetch('/api/blogs'),
        adminFetch('/api/tour-packages'),
        adminFetch('/api/gallery'),
        adminFetch('/api/callback')
      ]);

      if (bkRes.ok) setBookings(await bkRes.json());
      if (vRes.ok) setVehicles(await vRes.json());
      if (dRes.ok) setDrivers(await dRes.json());
      if (eqRes.ok) setEnquiries(await eqRes.json());
      if (nRes.ok) setNotifications(await nRes.json());
      if (bRes.ok) setBlogs(await bRes.json());
      if (pRes.ok) setPackages(await pRes.json());
      if (gRes.ok) setGallery(await gRes.json());
      if (cbRes.ok) setCallbacks(await cbRes.json());
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers for CRUD ---
  const handleUpdateBookingStatus = async (id: string, status: string, driverId?: string) => {
    try {
      const res = await adminFetch(`/api/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ bookingStatus: status, driverId })
      });
      if (res.ok) {
        alert(`Booking updated to ${status}`);
        loadAdminData();
      }
    } catch (err) {
      alert('Error updating booking');
    }
  };

  const handleUpdateCallbackStatus = async (id: string, status: string) => {
    try {
      const res = await adminFetch(`/api/callback/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        loadAdminData();
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, status: string) => {
    try {
      const res = await adminFetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        loadAdminData();
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteItem = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      let endpoint = '';
      if (type === 'blog') endpoint = `/api/blogs/${id}`;
      else if (type === 'package') endpoint = `/api/tour-packages/${id}`;
      else if (type === 'gallery') endpoint = `/api/gallery/${id}`;
      else if (type === 'vehicle') endpoint = `/api/vehicles/${id}`;
      else if (type === 'driver') endpoint = `/api/drivers/${id}`;

      const res = await adminFetch(endpoint, { method: 'DELETE' });
      if (res.ok) {
        loadAdminData();
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      alert('Error deleting item');
    }
  };

  // Full-screen Studio Blog Save
  const handleStudioSaveBlog = async (blogData: any) => {
    const url = editingItem ? `/api/blogs/${editingItem.id}` : '/api/blogs';
    const method = editingItem ? 'PUT' : 'POST';
    const res = await adminFetch(url, {
      method,
      body: JSON.stringify(blogData)
    });
    if (res.ok) {
      setIsBlogStudioOpen(false);
      setEditingItem(null);
      loadAdminData();
    } else {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to save blog post');
    }
  };

  // Package Form Submit
  const handlePackageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      highlights: (formData.get('highlights') as string).split('\n').filter(h => h.trim() !== ''),
      locations: (formData.get('locations') as string).split(',').map(l => l.trim()),
      itinerary: JSON.parse(formData.get('itinerary') as string || '[]'),
      title: formData.get('title'),
      duration: formData.get('duration'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price') as string || '0'),
      image: formData.get('image')
    };

    try {
      const url = editingItem ? `/api/tour-packages/${editingItem.id}` : '/api/tour-packages';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setEditingItem(null);
        setShowAddModal(false);
        loadAdminData();
      } else {
        alert('Failed to save package');
      }
    } catch (err) {
      alert('Error saving package');
    }
  };

  // Vehicle Form Submit
  const handleVehicleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      id: formData.get('id'),
      name: formData.get('name'),
      category: formData.get('category'),
      image: formData.get('image'),
      pricePerKm: parseFloat(formData.get('pricePerKm') as string || '0'),
      pricePerDay: parseFloat(formData.get('pricePerDay') as string || '0'),
      capacity: parseInt(formData.get('capacity') as string || '4'),
      luggage: parseInt(formData.get('luggage') as string || '2'),
      mileage: formData.get('mileage'),
      availability: formData.get('availability'),
      specifications: {
        ac: formData.get('spec_ac') === 'on',
        musicSystem: formData.get('spec_music') === 'on',
        chargingPort: formData.get('spec_charge') === 'on',
        pushbackSeats: formData.get('spec_seats') === 'on',
        airbags: formData.get('spec_airbags') === 'on',
        gps: formData.get('spec_gps') === 'on'
      },
      features: (formData.get('features') as string).split(',').map(f => f.trim())
    };

    try {
      const url = editingItem ? `/api/vehicles/${editingItem.id}` : '/api/vehicles';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setEditingItem(null);
        setShowAddModal(false);
        loadAdminData();
      } else {
        alert('Failed to save vehicle');
      }
    } catch (err) {
      alert('Error saving vehicle');
    }
  };

  // Gallery File Upload
  const handleGalleryUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await adminFetch('/api/gallery/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setShowAddModal(false);
        loadAdminData();
      } else {
        alert('Failed to upload file');
      }
    } catch (err) {
      alert('Error uploading file');
    }
  };

  const handleMarkNotificationsRead = async () => {
    await adminFetch('/api/notifications/read', { method: 'POST' });
    loadAdminData();
  };

  // --- Calculations for Dashboard ---
  const totalRevenue = bookings
    .filter(b => b.bookingStatus === 'Completed' || b.bookingStatus === 'Confirmed')
    .reduce((acc, curr) => acc + curr.totalFare, 0);

  const pendingBookings = bookings.filter(b => b.bookingStatus === 'Pending').length;
  const pendingCallbacks = callbacks.filter(c => c.status === 'Pending').length;

  // Search/Filters logic
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = bookingFilter === 'All' || b.bookingStatus === bookingFilter;
    const matchesService = bookingServiceFilter === 'All' || b.vehicleCategory === bookingServiceFilter || b.journeyType === bookingServiceFilter;
    const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.vehicleName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesService && matchesSearch;
  });

  // ═════════════════════════════════════════════════════════════════
  // 1. CLEAN WHITE LOGIN SCREEN
  // ═════════════════════════════════════════════════════════════════
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAFDFB] flex items-center justify-center text-slate-800 font-sans">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-10 h-10 border-4 border-[#006837] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#006837]">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0FDF4] via-[#FAFDFB] to-[#ECFDF5] flex items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
        
        {/* Soft Ambient Shapes */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-left">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#006837] to-[#008746] flex items-center justify-center shadow-lg shadow-emerald-900/10 mb-4">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Shibani Admin Portal</h2>
            <p className="text-xs text-[#006837] font-black uppercase tracking-wider mt-1">Authorized Management &amp; Fleet Hub</p>
          </div>

          {/* Quick Demo Credentials Banner (Prominently Displayed with 1-Click Auto-Fill) */}
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#006837] flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#006837]" />
                Admin Login Credentials
              </span>
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('ShibaniAdmin2026!');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#006837] hover:bg-[#008746] text-white text-[11px] font-black tracking-wider uppercase transition-colors cursor-pointer shadow-xs active:scale-95"
              >
                Click to Auto-Fill
              </button>
            </div>
            <div className="text-xs font-mono text-slate-700 space-y-1">
              <p className="flex items-center justify-between">
                <span className="font-sans text-slate-500 font-semibold">Username:</span>
                <strong className="text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 font-bold">admin</strong>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-sans text-slate-500 font-semibold">Password:</span>
                <strong className="text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 font-bold">ShibaniAdmin2026!</strong>
              </p>
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-semibold">{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-[#006837] focus:ring-2 focus:ring-[#006837]/15 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-[#006837] focus:ring-2 focus:ring-[#006837]/15 outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#006837] hover:bg-[#008746] text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer mt-2"
            >
              Sign In to Control Desk
            </button>
          </form>

          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <p className="text-[11px] text-slate-400 font-medium">
              Shibani Travels Admin Dashboard &copy; 2026. Secured SQLite Portal.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const NAV_TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Reservations', icon: Calendar },
    { id: 'packages', label: 'Tour Packages', icon: Compass },
    { id: 'blogs', label: 'Blogs & Articles', icon: FileText },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'callbacks', label: 'Callback Requests', icon: PhoneCall },
    { id: 'enquiries', label: 'Contact Enquiries', icon: Mail },
    { id: 'fleet', label: 'Fleet Vehicles', icon: Car },
    { id: 'drivers', label: 'Chauffeurs / Drivers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-800 flex relative font-sans">

      {/* ── Mobile Overlay Backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Left Sidebar (Clean Crisp White) ── */}
      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col justify-between z-40 fixed inset-y-0 left-0 transition-transform duration-300 lg:translate-x-0 lg:static lg:flex shadow-xs ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-white shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#006837] to-[#008746] p-[2px] shrink-0 flex items-center justify-center text-white font-black shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <h2 className="font-black text-sm text-slate-900 leading-tight">Shibani Travels</h2>
              <span className="text-[10px] text-[#006837] font-black uppercase tracking-wider">Admin Control Desk</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-800 p-1 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-50 text-[#006837] border-l-4 border-[#006837] font-black shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <tab.icon className={`w-4 h-4 shrink-0 ${activeTab === tab.id ? 'text-[#006837]' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer User Info & Logout */}
          <div className="p-3 border-t border-slate-200 bg-slate-50/70 shrink-0">
            <div className="flex items-center gap-2 mb-3 px-1 text-left">
              <div className="w-7 h-7 rounded-full bg-[#006837] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                A
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Administrator</p>
                <p className="text-[10px] text-slate-500 font-mono">admin@shibanitravels.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>

        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:h-screen">

        {/* Mobile Header (White Theme) */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-slate-700 p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer">
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-black text-sm text-slate-900">Shibani Admin</span>
          </div>
          <span className="text-[10px] bg-emerald-50 text-[#006837] border border-emerald-200 px-2 py-0.5 rounded-full font-black uppercase">
            Active
          </span>
        </header>

        {/* Mobile Quick Horizontal Navigation Pills */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-3 py-2 overflow-x-auto flex items-center gap-1.5 sticky top-[49px] z-10 select-none">
          {NAV_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#006837] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Inner Content Wrapper */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">

            {/* Page Top Title Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 mb-6 gap-3 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#006837]">Operations Control</span>
                <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">
                  {activeTab} Management
                </h2>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={loadAdminData}
                  className="p-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
                  title="Sync Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#006837]' : ''}`} />
                </button>
                {['packages', 'blogs', 'gallery', 'fleet', 'drivers'].includes(activeTab) && (
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      if (activeTab === 'blogs') {
                        setIsBlogStudioOpen(true);
                      } else {
                        setShowAddModal(true);
                      }
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#006837] hover:bg-[#008746] text-white font-black text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                )}
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 1: DASHBOARD BENTO HUB */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Bento Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, sub: 'Active & Completed', icon: TrendingUp, color: '#006837' },
                    { label: 'Pending Bookings', value: pendingBookings, sub: 'Needs Driver Assignment', icon: Clock, color: '#E25822' },
                    { label: 'Callback Requests', value: pendingCallbacks, sub: 'Pending Customer Calls', icon: PhoneCall, color: '#0284C7' },
                    { label: 'Active Fleet', value: vehicles.length, sub: 'GPS-Ready Vehicles', icon: Car, color: '#7C3AED' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden text-left shadow-xs hover:shadow-md transition-shadow">
                      <stat.icon className="absolute right-4 top-4 w-9 h-9 opacity-10" style={{ color: stat.color }} />
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{stat.label}</p>
                      <h3 className="text-2xl font-black font-mono mt-1" style={{ color: stat.color }}>{stat.value}</h3>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                  {/* Journey Distribution */}
                  <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#006837]" /> Odisha Route Distribution
                    </h4>
                    <div className="h-64 relative bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                      <div className="flex items-end justify-around h-48 z-10">
                        {[
                          { label: 'Outstation', val: bookings.filter(b => b.journeyType?.toLowerCase().includes('out')).length * 20 || 30 },
                          { label: 'Local City', val: bookings.filter(b => b.journeyType?.toLowerCase().includes('loc')).length * 20 || 45 },
                          { label: 'Airport Pick', val: bookings.filter(b => b.journeyType?.toLowerCase().includes('air')).length * 20 || 60 },
                          { label: 'Wedding Duty', val: bookings.filter(b => b.vehicleCategory?.toLowerCase().includes('wed')).length * 20 || 20 },
                          { label: 'Group Tour', val: bookings.filter(b => b.vehicleCategory?.toLowerCase().includes('bus') || b.vehicleCategory?.toLowerCase().includes('urbania')).length * 20 || 40 }
                        ].map((bar, i) => (
                          <div key={i} className="flex flex-col items-center gap-1.5">
                            <span className="text-[10px] font-mono text-slate-600 font-bold">{Math.max(10, bar.val / 20)} bookings</span>
                            <div className="w-10 rounded-t-lg bg-gradient-to-t from-[#006837] to-[#008746] shadow-xs" style={{ height: `${Math.min(130, bar.val * 1.5)}px` }} />
                            <span className="text-[10px] text-slate-600 font-bold whitespace-nowrap">{bar.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* System Logs */}
                  <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">System Alerts</h4>
                      <button onClick={handleMarkNotificationsRead} className="text-[10px] text-[#006837] hover:underline font-bold uppercase cursor-pointer">
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-3 rounded-xl border text-left ${
                          n.isRead ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-emerald-50/80 border-emerald-200 text-slate-800'
                        }`}>
                          <p className="font-bold text-xs text-[#006837]">{n.title}</p>
                          <p className="text-[11px] leading-relaxed mt-0.5 text-slate-600">{n.message}</p>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-12">No new alerts.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 2: RESERVATIONS TABLE (Clean White) */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'bookings' && (
              <div className="space-y-4 text-left">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="relative w-full md:max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search by Guest name, ID, or vehicle..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select
                      value={bookingFilter}
                      onChange={e => setBookingFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <select
                      value={bookingServiceFilter}
                      onChange={e => setBookingServiceFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none cursor-pointer"
                    >
                      <option value="All">All Services</option>
                      <option value="Local">Local City Rides</option>
                      <option value="Outstation">Outstation Trips</option>
                      <option value="Airport Transfer">Airport Transfers</option>
                      <option value="Wedding Cars">Wedding Duty</option>
                    </select>
                  </div>
                </div>

                {filteredBookings.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center text-slate-400 font-medium">
                    No matching reservations found.
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[900px] border-collapse text-left">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase font-bold tracking-wider">
                            <th className="p-4">ID &amp; Guest Info</th>
                            <th className="p-4">Service</th>
                            <th className="p-4">Route Details</th>
                            <th className="p-4">Vehicle</th>
                            <th className="p-4">Total Fare</th>
                            <th className="p-4">Assigned Chauffeur</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                          {filteredBookings.map(b => (
                            <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="p-4">
                                <p className="font-bold text-slate-900">{b.customerName}</p>
                                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{b.id} • {b.customerPhone}</p>
                                <p className="text-[10px] text-[#006837] mt-0.5">{b.customerEmail}</p>
                              </td>
                              <td className="p-4">
                                <span className="bg-emerald-50 text-[#006837] border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                                  {b.journeyType}
                                </span>
                              </td>
                              <td className="p-4">
                                <p className="font-bold text-slate-800 truncate max-w-[180px]">{b.pickupLocation}</p>
                                <p className="text-[11px] text-slate-500 mt-0.5">To: <span className="text-slate-800">{b.dropLocation}</span></p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{b.pickupDate} at {b.pickupTime}</p>
                              </td>
                              <td className="p-4">
                                <p className="font-semibold text-slate-900">{b.vehicleName}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">{b.vehicleCategory}</p>
                              </td>
                              <td className="p-4 font-mono font-bold text-slate-900 text-sm">
                                ₹{b.totalFare.toLocaleString()}
                              </td>
                              <td className="p-4">
                                {b.driverName ? (
                                  <span className="text-[#006837] font-bold">{b.driverName}</span>
                                ) : (
                                  <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px]">Unassigned</span>
                                )}
                              </td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                                  b.bookingStatus === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                                  b.bookingStatus === 'Confirmed' ? 'bg-emerald-50 text-[#006837] border border-emerald-200' :
                                  b.bookingStatus === 'Completed' ? 'bg-slate-100 text-slate-600' :
                                  'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                  {b.bookingStatus}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                {b.bookingStatus === 'Pending' && (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <select
                                      onChange={(e) => handleUpdateBookingStatus(b.id, 'Confirmed', e.target.value)}
                                      className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-800 focus:border-[#006837] outline-none cursor-pointer"
                                      defaultValue=""
                                    >
                                      <option value="" disabled>Assign Chauffeur...</option>
                                      {drivers.filter(d => d.status === 'Available').map(d => (
                                        <option key={d.id} value={d.id}>{d.name} ({d.phone})</option>
                                      ))}
                                    </select>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled')}
                                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2 py-1 rounded text-[11px] font-bold cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                                {b.bookingStatus === 'Confirmed' && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(b.id, 'Completed')}
                                    className="bg-[#006837] hover:bg-[#008746] text-white font-bold px-3 py-1 rounded text-[10px] uppercase cursor-pointer"
                                  >
                                    Complete
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 3: TOUR PACKAGES (Clean White Grid) */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'packages' && (
              <div className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {packages.map(p => (
                    <div key={p.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div className="h-44 relative overflow-hidden bg-slate-100">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-[#006837] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                          {p.duration}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-black text-slate-900 text-base leading-tight">{p.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">ID: {p.id}</p>
                          <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{p.description}</p>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            {p.locations?.map((l: string, idx: number) => (
                              <span key={idx} className="bg-emerald-50 text-[#006837] text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                                {l}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between">
                          <span className="text-[#006837] font-black font-mono text-base">₹{p.price.toLocaleString()}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingItem(p); setShowAddModal(true); }}
                              className="p-2 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006837] border border-slate-200 rounded-xl cursor-pointer transition-colors"
                              title="Edit Tour Package"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('package', p.id)}
                              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl cursor-pointer transition-colors"
                              title="Delete Tour Package"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 4: BLOGS TABLE (Opens Full-Screen BlogEditorStudio) */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'blogs' && (
              <div className="space-y-6 text-left">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] uppercase font-bold tracking-wider">
                          <th className="p-4">Cover &amp; Title</th>
                          <th className="p-4">Author / Date</th>
                          <th className="p-4">Slug</th>
                          <th className="p-4">Tags</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {blogs.map(b => (
                          <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-4 flex items-center gap-3">
                              <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 leading-tight">{b.title}</p>
                                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{b.summary}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-slate-900">{b.author}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{b.date}</p>
                            </td>
                            <td className="p-4 font-mono text-slate-500">{b.slug}</td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-[160px]">
                                {b.tags?.map((t: string, idx: number) => (
                                  <span key={idx} className="bg-emerald-50 text-[#006837] text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => { setEditingItem(b); setIsBlogStudioOpen(true); }}
                                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#006837] font-bold border border-emerald-200 rounded-xl cursor-pointer transition-colors inline-flex items-center gap-1 text-xs"
                                title="Open Full-Screen Blog Studio"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit Studio</span>
                              </button>
                              <button
                                onClick={() => handleDeleteItem('blog', b.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 5: GALLERY */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 text-left">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map(item => (
                    <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs h-48">
                      <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                        <p className="text-xs font-bold leading-tight">{item.caption}</p>
                        <span className="text-[10px] text-amber-300 font-mono mt-0.5">{item.category}</span>
                        <button
                          onClick={() => handleDeleteItem('gallery', item.id)}
                          className="mt-2 text-rose-400 hover:text-rose-200 text-xs font-bold self-start cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 6: CALLBACK REQUESTS */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'callbacks' && (
              <div className="space-y-6 text-left">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] uppercase font-bold tracking-wider">
                          <th className="p-4">Customer Name</th>
                          <th className="p-4">Phone Number</th>
                          <th className="p-4">Time Slot</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {callbacks.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-4 font-bold text-slate-900">{c.name}</td>
                            <td className="p-4 font-mono font-bold text-[#006837]">
                              <a href={`tel:${c.phone}`} className="hover:underline">
                                {c.phone}
                              </a>
                            </td>
                            <td className="p-4">
                              <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold">
                                {c.timeSlot}
                              </span>
                            </td>
                            <td className="p-4 text-slate-500 font-mono">{c.createdAt?.split('T')[0]}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                c.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-[#006837] border border-emerald-200'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="p-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`https://wa.me/91${c.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(c.name)},%20this%20is%20Shibani%20Travels%20regarding%20your%20callback%20request.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-2.5 py-1 rounded-lg text-[10px] uppercase flex items-center gap-1 cursor-pointer shadow-xs"
                                >
                                  <MessageSquare className="w-3 h-3 fill-current" />
                                  <span>WhatsApp</span>
                                </a>

                                {c.status === 'Pending' ? (
                                  <button
                                    onClick={() => handleUpdateCallbackStatus(c.id, 'Resolved')}
                                    className="bg-[#006837] hover:bg-[#008746] text-white font-bold px-2.5 py-1 rounded-lg text-[10px] uppercase cursor-pointer"
                                  >
                                    Mark Resolved
                                  </button>
                                ) : (
                                  <span className="text-slate-400 text-[10px] font-bold uppercase">Called</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 7: ENQUIRIES DESK */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enquiries.map(eq => (
                    <div key={eq.id} className="bg-white border border-slate-200 p-6 rounded-3xl relative shadow-xs hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-emerald-50 text-[#006837] border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                          {eq.subject}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{eq.createdAt?.split('T')[0]}</span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm">{eq.name}</h4>
                      <p className="text-[11px] text-slate-500 mb-3">Email: {eq.email} • Phone: {eq.phone}</p>
                      
                      <p className="text-xs text-slate-700 bg-slate-50 border border-slate-100 p-3.5 rounded-xl leading-relaxed italic">
                        "{eq.message}"
                      </p>

                      <div className="flex justify-between items-center mt-5 border-t border-slate-100 pt-4 flex-wrap gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          eq.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {eq.status}
                        </span>

                        <div className="flex gap-2 flex-wrap items-center">
                          <a
                            href={`https://wa.me/91${eq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(eq.name)},%20thank%20you%20for%20contacting%20Shibani%20Travels.`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => handleUpdateEnquiryStatus(eq.id, 'Replied')}
                            className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] uppercase inline-flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <MessageSquare className="w-3 h-3 fill-current" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${eq.phone}`}
                            className="bg-[#006837] hover:bg-[#008746] text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] uppercase inline-flex items-center gap-1 cursor-pointer"
                          >
                            <PhoneCall className="w-3 h-3" />
                            <span>Call</span>
                          </a>

                          <a
                            href={`mailto:${eq.email}?subject=Response to your inquiry: ${eq.subject}`}
                            onClick={() => handleUpdateEnquiryStatus(eq.id, 'Replied')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded-lg text-[10px] uppercase inline-block cursor-pointer"
                          >
                            Email
                          </a>

                          {eq.status === 'Pending' && (
                            <button
                              onClick={() => handleUpdateEnquiryStatus(eq.id, 'Resolved')}
                              className="bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006837] font-bold px-2.5 py-1.5 rounded-lg text-[10px] uppercase cursor-pointer"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 8: FLEET VEHICLES */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'fleet' && (
              <div className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {vehicles.map(v => (
                    <div key={v.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div className="h-40 relative bg-slate-100">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-[#006837] text-white px-2 py-0.5 rounded text-[9.5px] font-bold font-mono">
                          ID: {v.id}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-900 text-sm leading-tight">{v.name}</h4>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                              {v.category}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 font-medium">
                            <span>₹{v.pricePerKm}/km</span>
                            <span>•</span>
                            <span>{v.capacity} Seater</span>
                            <span>•</span>
                            <span>{v.availability}</span>
                          </div>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-3 flex justify-between items-center">
                          <span className="text-xs font-mono font-bold text-[#006837]">₹{v.pricePerDay || v.pricePerKm * 100}/day</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingItem(v); setShowAddModal(true); }}
                              className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006837] border border-slate-200 rounded-lg cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('vehicle', v.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────────────── */}
            {/* TAB 9: DRIVERS */}
            {/* ────────────────────────────────────────────────────────── */}
            {activeTab === 'drivers' && (
              <div className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {drivers.map(d => (
                    <div key={d.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{d.name}</h4>
                            <p className="text-xs text-[#006837] font-mono font-bold mt-0.5">{d.phone}</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            d.status === 'Available' ? 'bg-emerald-50 text-[#006837] border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {d.status}
                          </span>
                        </div>

                        <div className="mt-4 text-xs text-slate-600 space-y-1">
                          <p><span className="text-slate-400 font-semibold">License:</span> <strong className="font-mono text-slate-800">{d.licenseNumber}</strong></p>
                          <p><span className="text-slate-400 font-semibold">Experience:</span> {d.experienceYears} Years in Odisha</p>
                          <p><span className="text-slate-400 font-semibold">Assigned Cab:</span> {d.assignedVehicleId || 'Standby'}</p>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-slate-100 pt-3 flex justify-end gap-2">
                        <button
                          onClick={() => { setEditingItem(d); setShowAddModal(true); }}
                          className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#006837] border border-slate-200 rounded-lg cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('driver', d.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>{/* /max-w-7xl */}
        </main>

        {/* ── Mobile Bottom Navigation Bar ── */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-20 shadow-lg safe-area-pb">
          <div className="flex items-center justify-around px-1 py-1">
            {[
              { id: 'dashboard', icon: LayoutDashboard },
              { id: 'bookings', icon: Calendar },
              { id: 'packages', icon: Compass },
              { id: 'blogs', icon: FileText },
              { id: 'enquiries', icon: Mail },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id ? 'text-[#006837] font-black' : 'text-slate-400'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-[9px] font-bold capitalize">{tab.id}</span>
              </button>
            ))}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-slate-400 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
              <span className="text-[9px] font-bold">More</span>
            </button>
          </div>
        </nav>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ADD/EDIT MODAL OVERLAYS (Packages, Vehicles, Drivers - Clean White) */}
      {/* Note: Blogs are handled strictly via full-screen BlogEditorStudio */}
      {/* ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-left shadow-2xl relative text-slate-900"
            >
              <button
                onClick={() => { setShowAddModal(false); setEditingItem(null); }}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 mb-6">
                {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1).toUpperCase()}
              </h3>

              {/* PACKAGE FORM */}
              {activeTab === 'packages' && (
                <form onSubmit={handlePackageSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Title</label>
                      <input type="text" name="title" required defaultValue={editingItem?.title || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Duration (e.g. 4D / 3N)</label>
                      <input type="text" name="duration" required defaultValue={editingItem?.duration || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Description</label>
                    <textarea name="description" required defaultValue={editingItem?.description || ''} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Base Fare Price (₹)</label>
                      <input type="number" name="price" required defaultValue={editingItem?.price || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Featured Image URL</label>
                      <input type="text" name="image" required defaultValue={editingItem?.image || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none font-mono" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Highlights (one per line)</label>
                      <textarea name="highlights" rows={3} defaultValue={editingItem?.highlights?.join('\n') || ''} placeholder="VIP Darshan&#10;AC Vehicle" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Locations (comma separated)</label>
                      <textarea name="locations" rows={3} defaultValue={editingItem?.locations?.join(', ') || ''} placeholder="Puri, Konark, Chilika" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Itinerary Array JSON</label>
                    <textarea name="itinerary" rows={2} defaultValue={editingItem ? JSON.stringify(editingItem.itinerary) : '[{"day":"Day 1","title":"Bhubaneswar Arrival","desc":"Pickup from Airport, transfer to Puri."}]'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#006837] outline-none" />
                  </div>

                  <button type="submit" className="w-full py-3.5 bg-[#006837] hover:bg-[#008746] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-md">
                    Save Tour Package
                  </button>
                </form>
              )}

              {/* GALLERY UPLOAD FORM */}
              {activeTab === 'gallery' && (
                <form onSubmit={handleGalleryUpload} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Image Title / Caption</label>
                    <input type="text" name="caption" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Category</label>
                    <select name="category" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none">
                      <option value="Fleet">Fleet</option>
                      <option value="Destinations">Destinations</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Upload File</label>
                    <input type="file" name="file" required accept="image/*" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none" />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#006837] hover:bg-[#008746] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-md">
                    Upload to Photo Gallery
                  </button>
                </form>
              )}

              {/* FLEET FORM */}
              {activeTab === 'fleet' && (
                <form onSubmit={handleVehicleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">ID</label>
                      <input type="text" name="id" required defaultValue={editingItem?.id || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Name</label>
                      <input type="text" name="name" required defaultValue={editingItem?.name || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Category</label>
                      <input type="text" name="category" required defaultValue={editingItem?.category || 'SUV'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Image URL</label>
                      <input type="text" name="image" required defaultValue={editingItem?.image || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Price Per KM (₹)</label>
                      <input type="number" name="pricePerKm" required defaultValue={editingItem?.pricePerKm || 18} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Daily Rental (₹)</label>
                      <input type="number" name="pricePerDay" required defaultValue={editingItem?.pricePerDay || 2500} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Seating Capacity</label>
                      <input type="number" name="capacity" defaultValue={editingItem?.capacity || 7} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Availability</label>
                      <select name="availability" defaultValue={editingItem?.availability || 'Available'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none">
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Features (comma separated)</label>
                    <input type="text" name="features" defaultValue={editingItem?.features?.join(', ') || 'GPS, AC, Mineral Water'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#006837] hover:bg-[#008746] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-md">
                    Save Vehicle
                  </button>
                </form>
              )}

              {/* DRIVER FORM */}
              {activeTab === 'drivers' && (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data: any = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    licenseNumber: formData.get('licenseNumber'),
                    experienceYears: parseInt(formData.get('experienceYears') as string || '5'),
                    status: formData.get('status')
                  };
                  const url = editingItem ? `/api/drivers/${editingItem.id}` : '/api/drivers';
                  const method = editingItem ? 'PUT' : 'POST';
                  const res = await adminFetch(url, { method, body: JSON.stringify(data) });
                  if (res.ok) {
                    setShowAddModal(false);
                    setEditingItem(null);
                    loadAdminData();
                  } else {
                    alert('Failed to save driver');
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Chauffeur Full Name</label>
                    <input type="text" name="name" required defaultValue={editingItem?.name || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input type="text" name="phone" required defaultValue={editingItem?.phone || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Commercial License No.</label>
                      <input type="text" name="licenseNumber" required defaultValue={editingItem?.licenseNumber || ''} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none font-mono" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Experience (Years)</label>
                      <input type="number" name="experienceYears" required defaultValue={editingItem?.experienceYears || '8'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#006837] outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Status</label>
                      <select name="status" defaultValue={editingItem?.status || 'Available'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#006837] outline-none">
                        <option value="Available">Available</option>
                        <option value="On Trip">On Trip</option>
                        <option value="Off Duty">Off Duty</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#006837] hover:bg-[#008746] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-md">
                    Save Driver Profile
                  </button>
                </form>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. FULL-SCREEN BLOG EDITOR STUDIO ── */}
      {/* Opens exclusively in 100vw × 100vh full screen */}
      {isBlogStudioOpen && (
        <BlogEditorStudio
          initialBlog={editingItem}
          onSave={handleStudioSaveBlog}
          onClose={() => {
            setIsBlogStudioOpen(false);
            setEditingItem(null);
          }}
        />
      )}

    </div>
  );
}
