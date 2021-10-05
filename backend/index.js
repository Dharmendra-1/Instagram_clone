const express = require('express');
const app = express();
const port = 4000;
const userRouter = require('../backend/users/routes');

app.use(express.json());

app.use(userRouter);

app.use((request, response, next) => {
  response
    .status(404)
    .send('<h1>Unable to find the requested resource! 404 Not Founds</h1>');
  next();
});

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
