import express from "express";
const router = express.Router();

import { signIn, signUp, getUser, saveCode } from "../controllers/userController.js";

import auth from "../middleware/auth.js";

router.get('/:id', auth, getUser);
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/:id/code", auth, saveCode);

export default router;