const express = require("express");

const router = express.Router();

const {
  viewAssets,
  addAssets,
  makeRequests,
  updateRequests,
  viewRequests,
  search,
  getTotal
} = require("../controllers/tasks");

router.route("/viewAssets").get(viewAssets);
router.route("/addAssets/").post(addAssets);
router.route("/makeRequests").post(makeRequests);
router.route("/updateRequests").post(updateRequests);
router.route("/viewRequests").post(viewRequests);
router.route("/search/:searchValue/:searchType").get(search);
router.route("/getTotal").get(getTotal);

module.exports = router;

