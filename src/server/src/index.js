const express = require("express");

const port = process.env.PORT || 4000;
const app = express();

require("./api/client")(app);

app.get("/health", (req, res) => {
  res.json({ success: "ok" });
});

app.get("/pow/:blockHash", (req, res) => {});

app.post("/heartbeat", (req, res) => {});

app.listen(port, () => {
  console.log("Server started: ", port);
});
