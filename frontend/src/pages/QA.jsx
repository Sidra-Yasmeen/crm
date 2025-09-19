import React, { useEffect, useState } from "react";
import axios from "axios";

export default function QA() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get(`${API}/api/qa/agent/`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => setReviews(r.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          CRM
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-700">
            Dashboard
          </a>
          <a href="/kb/1" className="block px-3 py-2 rounded hover:bg-gray-700">
            Knowledgebase
          </a>
          <a href="/hr" className="block px-3 py-2 rounded hover:bg-gray-700">
            HR
          </a>
          <a href="/payroll" className="block px-3 py-2 rounded hover:bg-gray-700">
            Payroll
          </a>
          <a href="/qa" className="block px-3 py-2 rounded bg-gray-700">
            QA
          </a>
          <a href="/attendance" className="block px-3 py-2 rounded hover:bg-gray-700">
            Attendance
          </a>
          <a href="/billing" className="block px-3 py-2 rounded hover:bg-gray-700">
            Billing
          </a>
          <a href="/reports" className="block px-3 py-2 rounded hover:bg-gray-700">
            Reports
          </a>
          <a href="/admin" className="block px-3 py-2 rounded hover:bg-gray-700">
            Admin
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">QA Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-600">No QA reviews available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Agent ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Call ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{r.agent_id || "N/A"}</td>
                    <td className="px-6 py-3">{r.call_id || "N/A"}</td>
                    <td className="px-6 py-3">
                      {r.date ? new Date(r.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-3 font-semibold">{r.score}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {r.comments || "No comments"}
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
