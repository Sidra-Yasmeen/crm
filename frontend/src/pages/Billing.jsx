import React, {useEffect,useState} from 'react';
import axios from 'axios';
export default function Billing(){
  const [invoices,setInvoices]=useState([]);
  useEffect(()=>{ const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'; axios.get(`${API}/api/invoices/1`,{ headers: { Authorization: 'Bearer '+localStorage.getItem('token') }}).then(r=>setInvoices(r.data)).catch(e=>console.error(e)); },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      {invoices.map(inv=> <div key={inv.id} className="bg-white p-3 rounded mb-2">Invoice {inv.invoice_no} — {inv.amount} <a className="text-blue-600 ml-2" href={`${(import.meta.env.VITE_API_URL||'http://localhost:4000')}/api/invoices/pdf/${inv.id}`}>Download PDF</a></div>)}
    </div>
  );
}
