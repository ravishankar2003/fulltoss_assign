import express from "express";

const router = express.Router();

import {signup , signin, getdetails, update} from "../controllers/auth.js";
import {verifyToken} from "../utils/jwt.js";

router.post("/register", signup);
router.post("/login", signin);
router.get("/details", verifyToken , getdetails);
router.put("/update", verifyToken, update);

export default router;
