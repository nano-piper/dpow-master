const service = require("../service");

module.exports = (app) => {
  app.post("/pow", async (req, res) => {
    try {
      req.body = req.body || {};

      await service.pow.add({
        blockHash: req.body.blockHash,
        pow: req.body.pow,
        miner: req.body.nano,
      });

      res.json({ success: "ok" });
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });

  app.get("/pow/:blockHash", async (req, res) => {
    try {
      const result = await service.pow.get({
        blockHash: req.params.blockHash,
        nano: req.query.nano,
      });

      res.json({
        blockHash: req.params.blockHash,
        pow: result.pow,
      });
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });
};
