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
      await service.pow.start({
        blockHash: req.body.blockHash,
        nano: req.body.nano,
      });

      // Wait for the pow to be calculated
      const pow = await service.pow.watch({
        blockHash: req.body.blockHash,
      });

      res.json({
        blockHash: req.body.blockHash,
        pow,
      });
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });
};
