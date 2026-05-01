const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./src/routes/contact');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const publicDir = path.join(__dirname, 'public');

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/contact', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use(express.static(publicDir));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  return res.sendFile(path.join(publicDir, 'index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
