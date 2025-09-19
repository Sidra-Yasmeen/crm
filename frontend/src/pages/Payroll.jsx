import React, {useEffect,useState} from 'react';
import axios from 'axios';
export default function Payroll(){
  const [payslips,setPayslips]=useState([]);
  useEffect(()=>{ const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'; axios.get(`${API}/api/hr/payslips/1`,{ headers: { Authorization: 'Bearer '+localStorage.getItem('token') }}).then(r=>setPayslips(r.data)).catch(e=>console.error(e)); },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payslips</h2>
      {payslips.map(p=> <div key={p.id} className="bg-white p-3 rounded mb-2">Payslip {p.id} — Net: {p.net}</div>)}
    </div>
  );
}
