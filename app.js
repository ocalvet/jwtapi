const express = require("express");
const app = express();
const config = require("./config");
const auth = require("./auth");

if (!config || !config.port || !config.secret) {
  throw new Error(
    "Missing configuration, make sure your config.js has the correct properties"
  );
}

app.get("/", (req, res) => {
  res.json({ hi: "Master of none!" });
});

app.get("/public", (req, res) => {
  res.json({ visible: "Everyone can see this line" });
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
