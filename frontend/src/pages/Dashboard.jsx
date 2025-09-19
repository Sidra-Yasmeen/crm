import React from 'react';
export default function Dashboard(){
  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>
        <nav className="space-x-4">
          <a href="/kb/1" className="text-blue-600">KB</a>
          <a href="/hr" className="text-blue-600">HR</a>
          <a href="/payroll" className="text-blue-600">Payroll</a>
          <a href="/qa" className="text-blue-600">QA</a>
          <a href="/attendance" className="text-blue-600">Attendance</a>
          <a href="/billing" className="text-blue-600">Billing</a>
          <a href="/reports" className="text-blue-600">Reports</a>
          <a href="/admin" className="text-blue-600">Admin</a>
        </nav>
      </header>
      <p>Welcome to your CRM. Use the left menu to navigate modules.</p>
    </div>
  );
}
