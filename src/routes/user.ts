import express from "express";
import { authGoogle ,authGoogleCallback} from "../controller/user.js";

const router = express.Router();

router.get("/auth/google", authGoogle);
router.get("/google/callback", authGoogleCallback);

export default router;
