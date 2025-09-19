import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get(`${API}/api/admin/users/1`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => setUsers(r.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link to="/qa" className="block py-2 px-3 rounded hover:bg-gray-700">
            QA Reviews
          </Link>
          <Link
            to="/attendance"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Attendance
          </Link>
          <Link
            to="/billing"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Billing
          </Link>
          <Link
            to="/reports"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Reports
          </Link>
          <Link
            to="/admin"
            className="block py-2 px-3 rounded bg-gray-700 font-semibold"
          >
            Admin
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Admin - Users</h2>

        {users.length === 0 ? (
          <div className="text-gray-600">No users found.</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{u.id}</td>
                    <td className="py-2 px-4 border">{u.name}</td>
                    <td className="py-2 px-4 border">{u.email}</td>
                    <td className="py-2 px-4 border">{u.role}</td>
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
