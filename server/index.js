require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const importRoutes = require('./src/routes/import.routes')
require('./src/jobs/jobWorker'); // start the job worker
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use('/api', importRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    
  })
  .catch(err => console.error('MongoDB connection error:', err));
app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });