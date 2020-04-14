const express = require("express");

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());

require("./api/client")(app);
require("./api/pow")(app);

app.get("/health", (req, res) => {
  res.json({ success: "ok" });
});

app.post("/heartbeat", (req, res) => {});

app.listen(port, () => {
  console.log("Server started: ", port);
});
