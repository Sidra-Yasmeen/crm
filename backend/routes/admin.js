const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../middleware/authMiddleware');

// Simple example: list users for company
router.get('/users/:companyId', auth, async (req,res)=>{
  const companyId = req.params.companyId;
  if(req.user.role !== 'admin') return res.status(403).json({error:'Forbidden'});
  const [rows] = await db.query('SELECT id,name,email,role,is_active FROM users WHERE company_id=?',[companyId]);
  res.json(rows);
});

module.exports = router;
