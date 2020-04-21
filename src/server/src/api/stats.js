const service = require("../service");

module.exports = (app) => {
  app.get("/stats", async (req, res) => {
    try {
      const minerCount = await service.client.count();
      const requestedCount = await service.pow.requestedCount();
      const completedCount = await service.pow.completedCount();

      res.json({ minerCount, requestedCount, completedCount });
    } catch (err) {
      res.status(400).json({
        success: "not ok",
        error: err.message,
      });
    }
  });
};
