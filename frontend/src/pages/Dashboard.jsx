import React from "react";

export default function Dashboard() {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">CRM Dashboard</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-3">
          <a href="/kb/1" className="block p-2 rounded hover:bg-blue-100">📘 KB</a>
          <a href="/hr" className="block p-2 rounded hover:bg-blue-100">👥 HR</a>
          <a href="/payroll" className="block p-2 rounded hover:bg-blue-100">💰 Payroll</a>
          <a href="/qa" className="block p-2 rounded hover:bg-blue-100">✅ QA</a>
          <a href="/attendance" className="block p-2 rounded hover:bg-blue-100">📅 Attendance</a>
          <a href="/billing" className="block p-2 rounded hover:bg-blue-100">🧾 Billing</a>
          <a href="/reports" className="block p-2 rounded hover:bg-blue-100">📊 Reports</a>
          <a href="/admin" className="block p-2 rounded hover:bg-blue-100">⚙️ Admin</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back 👋</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Logout
          </button>
        </header>

        {/* Stats grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">1,245</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Active Projects</p>
            <h2 className="text-2xl font-bold">32</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Pending Tasks</p>
            <h2 className="text-2xl font-bold">87</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold">$56,430</h2>
          </div>
        </section>

        {/* Chart placeholder */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            [Insert chart here 📊]
          </div>
        </section>
      </main>
    </div>
  );
}
