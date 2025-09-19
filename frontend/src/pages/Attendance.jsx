import React, {useEffect,useState} from 'react';
import axios from 'axios';
export default function Attendance(){
  const [att,setAtt]=useState([]);
  useEffect(()=>{ const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'; axios.get(`${API}/api/attendance/1`,{ headers: { Authorization: 'Bearer '+localStorage.getItem('token') }}).then(r=>setAtt(r.data)).catch(e=>console.error(e)); },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      {att.map(a=> <div key={a.id} className="bg-white p-3 rounded mb-2">{a.date} — {a.check_in} - {a.check_out}</div>)}
    </div>
  );
}
