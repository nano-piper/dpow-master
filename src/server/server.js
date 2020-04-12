const express = require("express");

const port = process.env.PORT || 4000;
const app = express();

const db = require("./db");

app.get("/health", (req, res) => {
  res.json({ success: "ok" });
});

app.get("/client", async (req, res) => {
  try {
    const clients = await db.client.all();
    res.json(clients);
  } catch (err) {
    res.status(400).json({
      success: "not ok",
      error: err.message
    });
  }
});

app.get("/pow/:blockHash", (req, res) => {

});

app.post("/heartbeat", (req, res) => {

});

app.listen(port, () => {
  console.log("Server started: ", port);
});
