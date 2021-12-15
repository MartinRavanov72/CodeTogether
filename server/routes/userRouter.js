import express from "express";
const router = express.Router();

import { signIn, signUp, getUser } from "../controllers/userController.js";

import auth from "../middleware/auth.js";

router.get('/:id', auth, getUser);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;