const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const userRoutes = require('./users/routes/routes');
const dashboard = require('./users/routes/dashboard');

app.use(express.json());
app.use('/user', userRoutes);
app.use('/dashboard', dashboard);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
