import React, {useEffect,useState} from 'react';
import axios from 'axios';
export default function Admin(){
  const [users,setUsers]=useState([]);
  useEffect(()=>{ const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'; axios.get(`${API}/api/admin/users/1`,{ headers: { Authorization: 'Bearer '+localStorage.getItem('token') }}).then(r=>setUsers(r.data)).catch(e=>console.error(e)); },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin - Users</h2>
      {users.map(u=> <div key={u.id} className="bg-white p-3 rounded mb-2">{u.name} — {u.email} — {u.role}</div>)}
    </div>
  );
}
