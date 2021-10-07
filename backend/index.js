const express = require("express");
const app = express();
const port = 4000;
const userRoutes = require("../backend/users/routes");
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
