import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HR() {
  const [emps, setEmps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get(`${API}/api/hr/employees/1`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => setEmps(r.data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar (same as KB & Dashboard) */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">CRM</h1>
        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            🏠 <span className="ml-2">Dashboard</span>
          </a>
          <a
            href="/kb/1"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            📘 <span className="ml-2">Knowledgebase</span>
          </a>
          <a
            href="/hr"
            className="flex items-center text-blue-600 font-semibold"
          >
            👥 <span className="ml-2">HR</span>
          </a>
          <a
            href="/payroll"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            💰 <span className="ml-2">Payroll</span>
          </a>
          <a
            href="/qa"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            ✅ <span className="ml-2">QA</span>
          </a>
          <a
            href="/attendance"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            🕒 <span className="ml-2">Attendance</span>
          </a>
          <a
            href="/billing"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            💳 <span className="ml-2">Billing</span>
          </a>
          <a
            href="/reports"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            📊 <span className="ml-2">Reports</span>
          </a>
          <a
            href="/admin"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            ⚙️ <span className="ml-2">Admin</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">👥 Employees</h2>

        {loading && <p className="text-gray-500">Loading employees...</p>}

        {!loading && emps.length === 0 && (
          <p className="text-gray-500">No employees found.</p>
        )}

        {/* Employee Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {emps.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {e.name}
              </h3>
              <p className="text-gray-700">
                <span className="font-medium">Position:</span> {e.position}
              </p>
              {e.department && (
                <p className="text-gray-700">
                  <span className="font-medium">Department:</span>{" "}
                  {e.department}
                </p>
              )}
              {e.email && (
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {e.email}
                </p>
              )}
              {e.phone && (
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {e.phone}
                </p>
              )}
              {e.doj && (
                <p className="text-gray-700">
                  <span className="font-medium">Joined:</span>{" "}
                  {new Date(e.doj).toLocaleDateString()}
                </p>
              )}
              {e.status && (
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                    e.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {e.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
