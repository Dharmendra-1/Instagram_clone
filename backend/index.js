const express = require("express");
const app = express();
const port = 8000;
const userRoutes = require("../backend/users/routes");
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

app.use((request, response, next) => {
  response
    .status(404)
    .send("<h1>Unable to find the requested resource! 404 Not Founds</h1>");
  response.end();
  next();
});

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
