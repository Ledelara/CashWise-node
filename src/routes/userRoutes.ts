import express from "express";
import {
  depositAmount,
  getStatement,
  getUserProfile,
  handleTransaction,
  transferAmount,
  withdrawAmount,
} from "../controllers/userController";

const router = express.Router();

router.get("/user/statement/:userId", getStatement);
router.get("/user/profile/:userId", getUserProfile);
router.post("/user/:id/deposit", depositAmount);
router.post("/user/transfer", transferAmount);
router.post("/user/transaction", handleTransaction);
router.put("/user/withdraw/:id", withdrawAmount);

export default router;
