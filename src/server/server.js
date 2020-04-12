const express = require("express");

const port = process.env.PORT || 4000;
const app = express();

app.get("/pow/:blockHash", (req, res) => {

});

app.post("/heartbeat", (req, res) => {

});

app.listen(port, () => {
  console.log("Server started: ", port);
});
