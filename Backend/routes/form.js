import { Router } from "express";
import {
  addPDF,
  deletePDF,
  getFormsByGroup,
  getGroups,
  getPDFs,
  updatePDF,
} from "../controllers/formController.js";
const router = Router();

router.post("/upload", addPDF);
router.get("/get", getPDFs);
router.get("/getgroups", getGroups);
router.get("/group/:group",getFormsByGroup);
router.delete("/delete/:id", deletePDF);
router.patch("/update/:id",  updatePDF);

export default router;
