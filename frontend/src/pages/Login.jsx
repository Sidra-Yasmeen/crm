import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail]=useState('admin@example.com');
  const [password,setPassword]=useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    setError(''); // Clear previous errors
    try{
      const r = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem('token', r.data.token);
      navigate('/'); // Navigate to dashboard without a page reload
    }catch(e){
      setError('Login failed. Please check your credentials.');
      console.error(e);
    }
  }
  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit}>
        <input className="w-full p-2 border rounded mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded mb-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
      <p className="mt-4 text-sm text-gray-500">Use admin@example.com / password (seeded)</p>
    </div>
  );
}
