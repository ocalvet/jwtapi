const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const auth = require("./auth");
const users = require("./data/users");
const app = express();

if (!config || !config.port || !config.secret) {
  throw new Error(
    "Missing configuration, make sure your config.js has the correct properties"
  );
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ hi: "Master of none!" });
});

app.get("/public", (req, res) => {
  res.json({ visible: "Everyone can see this line" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.email === username && u.password === password);
  console.log(user, req.body);
  if (user) {
    const token = auth.sign(user);
    res.json({ token });
  } else {
    res.status(401);
    res.end();
  }
});

app.get("/private", auth.checkToken, (req, res) => {
  res.json({ visible: "Only you can see it" });
});

app.get("/private/role", auth.checkToken, (req, res) => {
  res.json({ visible: "Only you with role can see it" });
});

app.listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});
