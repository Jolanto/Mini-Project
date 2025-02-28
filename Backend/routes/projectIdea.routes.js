const express = require("express");
const router = express.Router();
const {
  verifyToken,
  checkAdmin,
  checkFaculty,
} = require("../middleware/auth.middleware.js"); // Fix import statement

const {
  addProject,
  getAllProject,
  updateProject,
  updateProjectStatus,
  getProjectByGroupId,
  getProject,
  //   getProject,
  delProject,
  //   updStatus,
  //   getApproved,
  //   getUserProject,
  //   getUnapproved,
  //   getSemesterProject,
} = require("../controller/project.controller.js");

router.get("/getAll", getAllProject);
router.get("/get/:id", getProject);
// router.get("/get/:id", getProject);
// router.get("/get/user/:id", getUserProject);
// router.get("/get/project/unapproved", getUnapproved);
// get semester project
// router.get("/get/project/sem", getSemesterProject);

router.post("/add", addProject); // here i have to check user too
router.put("/update/:id", updateProject);
router.put("/updateProjectStatus/:id/:status", updateProjectStatus);
router.get("/getProjByGroupId/:id", getProjectByGroupId);
// router.put("/upd/status/:id/status", updStatus);
router.delete("/del/:id", delProject); // checkUser must be there
// router.put("/upd/:id", updProject);

module.exports = router;
