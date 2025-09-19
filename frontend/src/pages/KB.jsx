import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function KB(){
  const { companyId } = useParams();
  const [articles,setArticles] = useState([]);
  useEffect(()=>{
    const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    axios.get(`${API}/api/kb/${companyId}`).then(r=>setArticles(r.data)).catch(e=>console.error(e));
  },[]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Knowledgebase</h2>
      {articles.map(a=>(
        <div key={a.id} className="bg-white p-4 rounded mb-3 shadow">
          <h3 className="font-semibold">{a.title}</h3>
          <div dangerouslySetInnerHTML={{__html: a.content}} />
        </div>
      ))}
    </div>
  );
}
