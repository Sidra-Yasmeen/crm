const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../middleware/authMiddleware');

router.get('/:companyId', async (req,res)=>{
  const companyId = req.params.companyId;
  const [rows] = await db.query('SELECT * FROM kb_articles WHERE company_id=?',[companyId]);
  res.json(rows);
});

router.post('/', auth, async (req,res)=>{
  const {title,content,tags,company_id} = req.body;
  const userId = req.user.userId;
  if(req.user.company_id !== company_id && req.user.role!=='admin') return res.status(403).json({error:'Forbidden'});
  const [r] = await db.query('INSERT INTO kb_articles (company_id,title,content,tags,created_by) VALUES (?,?,?,?,?)',
    [company_id,title,content,tags,userId]);
  res.json({ok:true,id:r.insertId});
});

module.exports = router;
