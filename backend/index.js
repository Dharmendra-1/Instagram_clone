const express = require("express");
const app = express();
const port = 4000;
const userRoutes = require("../backend/users/routes");
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use("/user/signup", userRoutes);

app.get("*", (request, response) => {
  response
    .status(404)
    .send("<h1>Unable to find the requested resource! 404 Not Founds</h1>");
});

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
