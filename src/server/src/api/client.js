const service = require("../service");

module.exports = (app) => {
  app.get("/client", async (req, res) => {
    try {
      const clients = await service.client.all();
      res.json(clients);
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });

  app.post("/client", async (req, res) => {
    try {
      await service.client.add({
        nano: req.body.nano,
        pubKey: req.body.pubKey,
        signature: req.body.signature,
      });

      res.json({ success: "ok" });
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });

  app.get("/client/:address", async (req, res) => {
    try {
      const client = await service.client.get({
        nano: req.params.address,
      });

      if (!client || client.length === 0) {
        res.status(404).send();
      } else {
        res.json(client[0]);
      }
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });
};
