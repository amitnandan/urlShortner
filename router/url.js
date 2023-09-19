const express = require("express");
 const {
  handleGenerateNewShortURL,
  handleGetAnalytics
 
}=require("../constroller/url")

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics );

module.exports = router;
