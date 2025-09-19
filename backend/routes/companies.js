const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../middleware/authMiddleware');

router.get('/', async (req,res)=>{
  const [rows] = await db.query('SELECT id,name,slug,created_at FROM companies');
  res.json(rows);
});

router.post('/', auth, async (req,res)=>{
  if(!['admin','manager'].includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
  const {name,slug,billing_rate} = req.body;
  const [r] = await db.query('INSERT INTO companies (name,slug,billing_rate) VALUES (?,?,?)',[name,slug,billing_rate]);
  res.json({ok:true,id:r.insertId});
});

module.exports = router;
