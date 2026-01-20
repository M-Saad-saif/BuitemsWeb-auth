const express = require("express");
const connetionToMongooDB = require("./DB");

const app = express();
connetionToMongooDB();

// middle ware to parse json
app.use(express.json());

app.use('/api/auth', require("./routes/userauth"))


// cheaking health
app.get("/health", (req, res) => {
  res.send({ status: "OK", message: "Server is running properly" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Buitems app listening on port http://localhost:${port}`);
});
