const express = require('express');
const app = express();
const port = 4000;
const userRoutes = require('./users/routes/routes');
const dashboard = require('./users/routes/dashboard');
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/dashboard', dashboard);

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
