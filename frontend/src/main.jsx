import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KB from './pages/KB';
import HR from './pages/HR';
import Payroll from './pages/Payroll';
import QA from './pages/QA';
import Attendance from './pages/Attendance';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import Admin from './pages/Admin';

function Protected({ children }){
  const token = localStorage.getItem('token');
  if(!token) return <Navigate to="/login" replace />;
  return children;
}

function App(){
  return (
    <BrowserRouter future={{
      // Opt-in to state updates being wrapped in `React.startTransition`
      v7_startTransition: true,
      // Opt-in to relative path resolution for splat routes
      v7_relativeSplatPath: true,
    }}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Protected><Dashboard/></Protected>} />
            <Route path="/kb/:companyId" element={<Protected><KB/></Protected>} />
            <Route path="/hr" element={<Protected><HR/></Protected>} />
            <Route path="/payroll" element={<Protected><Payroll/></Protected>} />
            <Route path="/qa" element={<Protected><QA/></Protected>} />
            <Route path="/attendance" element={<Protected><Attendance/></Protected>} />
            <Route path="/billing" element={<Protected><Billing/></Protected>} />
            <Route path="/reports" element={<Protected><Reports/></Protected>} />
            <Route path="/admin" element={<Protected><Admin/></Protected>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
