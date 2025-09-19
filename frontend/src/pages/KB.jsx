import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function KB() {
  const { companyId } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get(`${API}/api/kb/${companyId}`)
      .then((r) => setArticles(r.data))
      .catch((e) => console.error(e));
  }, [companyId]);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">CRM Dashboard</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-3">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">🏠 Dashboard</Link>
          <Link to="/kb/1" className="block p-2 rounded hover:bg-blue-100">📘 KB</Link>
          <Link to="/hr" className="block p-2 rounded hover:bg-blue-100">👥 HR</Link>
          <Link to="/payroll" className="block p-2 rounded hover:bg-blue-100">💰 Payroll</Link>
          <Link to="/qa" className="block p-2 rounded hover:bg-blue-100">✅ QA</Link>
          <Link to="/attendance" className="block p-2 rounded hover:bg-blue-100">📅 Attendance</Link>
          <Link to="/billing" className="block p-2 rounded hover:bg-blue-100">🧾 Billing</Link>
          <Link to="/reports" className="block p-2 rounded hover:bg-blue-100">📊 Reports</Link>
          <Link to="/admin" className="block p-2 rounded hover:bg-blue-100">⚙️ Admin</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Knowledgebase 📘</h1>
        </header>

        {articles.length === 0 ? (
          <p className="text-gray-500">No articles found for this company.</p>
        ) : (
          <div className="space-y-6">
            {articles.map((a) => (
              <div
                key={a.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">{a.title}</h3>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: a.content }}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
