const express = require("express");
const app = express();
const { login, register } = require("../../db/login.js");

app.use(express.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
  username = req.body.registerUsername;
  password = req.body.registerPassword;
  const result = await register(username, password);
  if (result === 1) {
    res.send("registered");
  } else {
    res.send("not regitered");
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.loginUsername;
  const password = req.body.loginPassword;
  // console.log(req.body);

  try {
    const result = await login(username, password);
    if (result === 0) {
      res.send("authentication failed");
    } else {
      res.send("logged in");
    }
  } catch {
    res.send("404 error occured");
  }
});

app.all("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Replace with the actual path to your HTML form
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
