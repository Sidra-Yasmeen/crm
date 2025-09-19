const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({error:'Missing token'});
  const token = auth.replace('Bearer ','');
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET||'secret');
    req.user = payload;
    next();
  }catch(e){ return res.status(401).json({error:'Invalid token'}); }
}
