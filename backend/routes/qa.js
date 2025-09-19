const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../middleware/authMiddleware');

router.post('/evaluate', auth, async (req,res)=>{
  if(!['qa','manager','admin'].includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
  const {company_id,agent_id,evaluator_id,score,notes} = req.body;
  const [r] = await db.query('INSERT INTO qa_reviews (company_id,agent_id,evaluator_id,score,notes) VALUES (?,?,?,?,?)',
    [company_id,agent_id,evaluator_id,score,notes]);
  res.json({ok:true,id:r.insertId});
});

router.get('/agent/:agentId', auth, async (req,res)=>{
  const agentId = req.params.agentId;
  const [rows] = await db.query('SELECT * FROM qa_reviews WHERE agent_id=?',[agentId]);
  res.json(rows);
});

module.exports = router;
