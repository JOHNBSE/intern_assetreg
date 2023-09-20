const express = require("express");

const router = express.Router();

const {
  viewAssets,
  addAssets,
  makeRequests,
  updateRequests,
  viewRequests,
  search,
  getTotal,
  viewLocations,
  viewCategories,
  viewConsumables,
} = require("../controllers/tasks");

router.route("/viewAssets").get(viewAssets);
router.route("/addAssets/").post(addAssets);
router.route("/makeRequests").post(makeRequests);
router.route("/updateRequests").post(updateRequests);
router.route("/viewRequests").get(viewRequests);
router.route("/search/:searchValue/:searchType").get(search);
router.route("/getTotal").get(getTotal);
router.route("/viewLocations").get(viewLocations);
router.route("/viewCategories").get(viewCategories);
router.route("/viewConsumables").get(viewConsumables);

module.exports = router;
