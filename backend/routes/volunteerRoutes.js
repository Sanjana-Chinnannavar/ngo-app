const express = require("express");
const {
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer
} = require("../controllers/volunteerController");

const router = express.Router();

// /volunteers/
router.route("/")
  .get(getVolunteers)
  .post(addVolunteer);

// /volunteers/:id
router.route("/:id")
  .put(updateVolunteer)
  .delete(deleteVolunteer);

module.exports = router;
