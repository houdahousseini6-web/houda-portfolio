import { useState } from 'react'
import AdminReviews from './AdminReviews'
import AdminMessages from './AdminMessages'
import AdminProjects from './AdminProjects'
import '../../styles/Admin.css'

const AdminLayout = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('reviews')

  const tabs = [
    { id: 'reviews', label: '⭐ Reviews', component: AdminReviews },
    { id: 'messages', label: '📧 Messages', component: AdminMessages },
    { id: 'projects', label: '📦 Projects', component: AdminProjects },
  ]

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>🛠️ Admin</h2>
        </div>

        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button className="admin-logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>{tabs.find((t) => t.id === activeTab)?.label}</h1>
        </div>

        <div className="admin-content">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout