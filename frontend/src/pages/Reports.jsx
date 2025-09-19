import React, {useEffect,useState} from 'react';
import axios from 'axios';
export default function Reports(){
  const [rep,setRep]=useState(null);
  useEffect(()=>{ const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'; axios.get(`${API}/api/reports/basic/1`,{ headers: { Authorization: 'Bearer '+localStorage.getItem('token') }}).then(r=>setRep(r.data)).catch(e=>console.error(e)); },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basic Report</h2>
      <pre>{JSON.stringify(rep,null,2)}</pre>
    </div>
  );
}
