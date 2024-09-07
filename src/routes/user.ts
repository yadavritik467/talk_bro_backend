import express from "express";
import {
    allUsers,
  authGoogle,
  authGoogleCallback,
  myProfile,
} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/auth/google", authGoogle);
router.get("/google/callback", authGoogleCallback);
router.get("/my-profile", isAuthenticated, myProfile);
router.get("/all-users", isAuthenticated, allUsers);

export default router;
