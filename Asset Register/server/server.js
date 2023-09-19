const express = require("express");
const cors = require("cors");
const app = express();

const port = 5000;

//middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended : false}))

const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", tasksRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
