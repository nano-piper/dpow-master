const service = require("../service");

module.exports = (app) => {
  app.post("/pow", async (req, res) => {
    try {
      await service.pow.add({
        blockHash: req.body.blockHash,
        pow: req.body.pow,
        nano: req.body.nano,
      });

      res.json({ success: "ok" });
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });
};
