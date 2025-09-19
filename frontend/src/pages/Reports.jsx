import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [rep, setRep] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get(`${API}/api/reports/basic/1`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => {
        console.log("📊 Reports API Response:", r.data); // Debugging log
        setRep(r.data || {});
      })
      .catch((e) => {
        console.error("❌ Reports API Error:", e);
        setRep({});
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">CRM</h1>
        <nav className="space-y-3">
          <a href="/" className="block text-gray-700 hover:text-blue-600">
            🏠 Dashboard
          </a>
          <a href="/kb/1" className="block text-gray-700 hover:text-blue-600">
            📘 Knowledgebase
          </a>
          <a href="/hr" className="block text-gray-700 hover:text-blue-600">
            👥 HR
          </a>
          <a href="/payroll" className="block text-gray-700 hover:text-blue-600">
            💰 Payroll
          </a>
          <a href="/qa" className="block text-gray-700 hover:text-blue-600">
            ✅ QA
          </a>
          <a
            href="/attendance"
            className="block text-gray-700 hover:text-blue-600"
          >
            🕒 Attendance
          </a>
          <a href="/billing" className="block text-gray-700 hover:text-blue-600">
            💳 Billing
          </a>
          <a href="/reports" className="block text-blue-600 font-semibold">
            📊 Reports
          </a>
          <a href="/admin" className="block text-gray-700 hover:text-blue-600">
            ⚙️ Admin
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">📊 Basic Report</h2>

        {loading && <div>Loading report...</div>}

        {!loading && (!rep || Object.keys(rep).length === 0) && (
          <div className="text-red-600">
            No report data available. (Check backend response in console)
          </div>
        )}

        {rep && Object.keys(rep).length > 0 && (
          <>
            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-sm text-gray-500">Total Calls</h3>
                <p className="text-2xl font-bold">{rep.total_calls || 0}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-sm text-gray-500">Answered Calls</h3>
                <p className="text-2xl font-bold text-green-600">
                  {rep.answered_calls || 0}
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-sm text-gray-500">Abandoned Calls</h3>
                <p className="text-2xl font-bold text-red-600">
                  {rep.abandoned_calls || 0}
                </p>
              </div>
            </div>

            {/* Agent Performance */}
            {rep.agents && rep.agents.length > 0 && (
              <div className="bg-white shadow rounded-lg p-4 mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  Agent Performance
                </h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-2 border">Agent</th>
                      <th className="p-2 border">Calls</th>
                      <th className="p-2 border">Avg Score</th>
                      <th className="p-2 border">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rep.agents.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50">
                        <td className="p-2 border">{a.name}</td>
                        <td className="p-2 border">{a.calls}</td>
                        <td className="p-2 border">{a.score}%</td>
                        <td className="p-2 border">{a.attendance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Always show Raw JSON */}
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4">Raw Data</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(rep, null, 2)}
              </pre>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
