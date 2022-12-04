const express = require("express");
const router = express.Router();

router.get("/tes", async (req, res) => {
  res.status(200).json({ metadata: "test get data endpoint" });
});
