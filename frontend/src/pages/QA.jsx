import React, {useEffect,useState} from 'react';
import axios from 'axios';
export default function QA(){
  const [reviews,setReviews]=useState([]);
  useEffect(()=>{ const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'; axios.get(`${API}/api/qa/agent/1`,{ headers: { Authorization: 'Bearer '+localStorage.getItem('token') }}).then(r=>setReviews(r.data)).catch(e=>console.error(e)); },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">QA Reviews</h2>
      {reviews.map(r=> <div key={r.id} className="bg-white p-3 rounded mb-2">Agent {r.agent_id} — Score: {r.score}</div>)}
    </div>
  );
}
