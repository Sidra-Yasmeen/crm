import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Attendance() {
  const [att, setAtt] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get(`${API}/api/attendance/1`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => setAtt(r.data))
      .catch((e) => console.error(e));
  }, []);

  // Helper: calculate hours worked
  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "N/A";
    const start = new Date(`1970-01-01T${checkIn}Z`);
    const end = new Date(`1970-01-01T${checkOut}Z`);
    const diff = (end - start) / (1000 * 60 * 60); // in hours
    return `${diff.toFixed(2)} hrs`;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          CRM
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-700">
            🏠 Dashboard
          </a>
          <a href="/kb/1" className="block px-3 py-2 rounded hover:bg-gray-700">
            📘 Knowledgebase
          </a>
          <a href="/hr" className="block px-3 py-2 rounded hover:bg-gray-700">
            👥 HR
          </a>
          <a href="/payroll" className="block px-3 py-2 rounded hover:bg-gray-700">
            💰 Payroll
          </a>
          <a href="/qa" className="block px-3 py-2 rounded hover:bg-gray-700">
            ✅ QA
          </a>
          <a href="/attendance" className="block px-3 py-2 rounded bg-gray-700">
            🕒 Attendance
          </a>
          <a href="/billing" className="block px-3 py-2 rounded hover:bg-gray-700">
            💳 Billing
          </a>
          <a href="/reports" className="block px-3 py-2 rounded hover:bg-gray-700">
            📊 Reports
          </a>
          <a href="/admin" className="block px-3 py-2 rounded hover:bg-gray-700">
            ⚙️ Admin
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">🕒 Attendance</h2>

        {att.length === 0 ? (
          <p className="text-gray-600">No attendance records found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Check-In
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Check-Out
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Hours Worked
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {att.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">
                      {new Date(a.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{a.check_in || "N/A"}</td>
                    <td className="px-6 py-3">{a.check_out || "N/A"}</td>
                    <td className="px-6 py-3">
                      {calculateHours(a.check_in, a.check_out)}
                    </td>
                    <td className="px-6 py-3">
                      {a.status === "Present" ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Present
                        </span>
                      ) : a.status === "Absent" ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                          Absent
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                          {a.status || "Pending"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
