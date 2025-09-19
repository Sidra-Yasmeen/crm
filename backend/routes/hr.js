const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../middleware/authMiddleware');

// Employees
router.get('/employees/:companyId', auth, async (req,res)=>{
  const companyId = req.params.companyId;
  if(req.user.company_id != companyId && req.user.role!=='admin') return res.status(403).json({error:'Forbidden'});
  const [rows] = await db.query('SELECT * FROM employees WHERE company_id=?',[companyId]);
  res.json(rows);
});

router.post('/employees', auth, async (req,res)=>{
  if(!['admin','manager'].includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
  const {company_id,name,email,position,hire_date,salary} = req.body;
  const [r] = await db.query('INSERT INTO employees (company_id,name,email,position,hire_date,salary) VALUES (?,?,?,?,?)',
    [company_id,name,email,position,hire_date,salary]);
  res.json({ok:true,id:r.insertId});
});

// Payroll run creation (basic)
router.post('/payroll/run', auth, async (req,res)=>{
  if(!['admin','manager'].includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
  const {company_id,period_start,period_end,total_amount} = req.body;
  const [r] = await db.query('INSERT INTO payroll_runs (company_id,period_start,period_end,total_amount) VALUES (?,?,?,?)',
    [company_id,period_start,period_end,total_amount]);
  res.json({ok:true,id:r.insertId});
});

// Payslip fetch
router.get('/payslips/:companyId', auth, async (req,res)=>{
  const companyId = req.params.companyId;
  if(req.user.company_id != companyId && req.user.role!=='admin') return res.status(403).json({error:'Forbidden'});
  const [rows] = await db.query('SELECT * FROM payslips WHERE company_id=?',[companyId]);
  res.json(rows);
});

module.exports = router;
