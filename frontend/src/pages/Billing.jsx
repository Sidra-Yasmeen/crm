import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get(`${API}/api/invoices/1`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => setInvoices(r.data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
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
          <a href="/attendance" className="block px-3 py-2 rounded hover:bg-gray-700">
            🕒 Attendance
          </a>
          <a href="/billing" className="block px-3 py-2 rounded bg-gray-700">
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
        <h2 className="text-3xl font-bold mb-6">💳 Invoices</h2>

        {loading ? (
          <p className="text-gray-600">Loading invoices...</p>
        ) : invoices.length === 0 ? (
          <p className="text-gray-600">No invoices found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Invoice #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{inv.invoice_no}</td>
                    <td className="px-6 py-3">
                      {new Date(inv.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 font-medium text-blue-600">
                      ${inv.amount}
                    </td>
                    <td className="px-6 py-3">
                      {inv.status === "Paid" ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Paid
                        </span>
                      ) : inv.status === "Pending" ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                          Pending
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <a
                        className="text-blue-600 hover:underline"
                        href={`${
                          import.meta.env.VITE_API_URL || "http://localhost:4000"
                        }/api/invoices/pdf/${inv.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
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
