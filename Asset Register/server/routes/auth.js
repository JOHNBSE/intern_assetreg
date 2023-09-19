const express = require("express");

const router = express.Router();
const { login, signup, getValues, deleteValues, updateValues } = require("../controllers/auth");

router.route("/login").post(login);
router.route("/signup/:email/:password").get(signup);
router.route("/values/:table").get(getValues)
router.route("/values/delete/:table/:id").delete(deleteValues);
router.route("/values/update/:table/:field/:newValue/:id").put(updateValues);

module.exports = router;
