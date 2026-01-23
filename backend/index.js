const path = require("path");
const express = require("express");
const connetionToMongooDB = require("./DB");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("./utils/cloudinary"); 

const app = express();
connetionToMongooDB();

app.use(
  cors({
    origin: "*", // Allowign aLL origins for now
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "auth-token"],
  }),
);

// middle ware to parse json
app.use(express.json());

app.use("/api/auth", require("./routes/userauth"));

// cheaking health
app.get("/health", (req, res) => {
  res.send({ status: "OK", message: "Server is running properly" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Buitems app listening on port http://localhost:${port}`);
});
