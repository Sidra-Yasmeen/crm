require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./lib/db');
const auth = require('./routes/auth');
const companies = require('./routes/companies');
const kb = require('./routes/kb');
const invoices = require('./routes/invoices');
const reports = require('./routes/reports');
const hr = require('./routes/hr');
const qa = require('./routes/qa');
const admin = require('./routes/admin');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Static for serving built frontend if desired
app.use('/static', express.static(path.join(__dirname,'../frontend/dist')));

app.use('/api/auth', auth);
app.use('/api/companies', companies);
app.use('/api/kb', kb);
app.use('/api/invoices', invoices);
app.use('/api/reports', reports);
app.use('/api/hr', hr);
app.use('/api/qa', qa);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log('Server running on port', PORT));
