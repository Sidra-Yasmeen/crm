const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const auth = require('../middleware/authMiddleware');
const PDFDocument = require('pdfkit');

router.get('/:companyId', auth, async (req,res)=>{
  const companyId = req.params.companyId;
  if(req.user.company_id != companyId && req.user.role!=='admin') return res.status(403).json({error:'Forbidden'});
  const [rows] = await db.query('SELECT * FROM invoices WHERE company_id=?',[companyId]);
  res.json(rows);
});

router.post('/', auth, async (req,res)=>{
  if(!['admin','manager'].includes(req.user.role)) return res.status(403).json({error:'Forbidden'});
  const {company_id,invoice_no,amount,description,issued_at,due_at} = req.body;
  const [r] = await db.query('INSERT INTO invoices (company_id,invoice_no,amount,description,issued_at,due_at) VALUES (?,?,?,?,?)',
    [company_id,invoice_no,amount,description,issued_at,due_at]);
  res.json({ok:true,id:r.insertId});
});

// Download invoice PDF (simple PDF generator)
router.get('/pdf/:invoiceId', auth, async (req,res)=>{
  const invoiceId = req.params.invoiceId;
  const [[invoiceRows]] = await db.query('SELECT * FROM invoices WHERE id=?',[invoiceId]);
  const invoice = invoiceRows[0] || null;
  if(!invoice) return res.status(404).json({error:'Not found'});
  const doc = new PDFDocument();
  res.setHeader('Content-Type','application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoice_no}.pdf`);
  doc.text('Invoice: ' + invoice.invoice_no);
  doc.text('Amount: ' + invoice.amount);
  doc.text('Issued: ' + invoice.issued_at);
  doc.text('Due: ' + invoice.due_at);
  doc.end();
  doc.pipe(res);
});

module.exports = router;
