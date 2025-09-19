const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=>{
  try{
    const {company_id,name,email,password,role='agent'} = req.body;
    const password_hash = await bcrypt.hash(password,10);
    const [resu] = await db.query('INSERT INTO users (company_id,name,email,password_hash,role) VALUES (?,?,?,?,?)',
      [company_id,name,email,password_hash,role]);
    res.json({ok:true,userId:resu.insertId});
  }catch(e){ console.error(e); res.status(500).json({error:e.message}); }
});
// Login route without bcrypt
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: "User not found" });
    }

    const user = rows[0];

    if (password !== user.password_hash) {
      return res.status(401).json({ success: false, error: "Invalid password" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});


module.exports = router;
