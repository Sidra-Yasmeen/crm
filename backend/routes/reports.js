const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../middleware/authMiddleware');

router.get('/basic/:companyId', auth, async (req,res)=>{
  const companyId = req.params.companyId;
  if(req.user.company_id != companyId && req.user.role!=='admin') return res.status(403).json({error:'Forbidden'});
  const [[{users}], [{kb}], [{invoices}]] = await Promise.all([
    db.query('SELECT COUNT(*) as users FROM users WHERE company_id=?',[companyId]),
    db.query('SELECT COUNT(*) as kb FROM kb_articles WHERE company_id=?',[companyId]),
    db.query('SELECT COUNT(*) as invoices FROM invoices WHERE company_id=?',[companyId])
  ]);
  res.json({users:users, kb:kb, invoices:invoices});
});

module.exports = router;
