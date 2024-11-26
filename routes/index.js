import { Router } from "express";
import user from "../controllers/userCntrl.js";
import {
  onlyUserAccess,
  onlyAdminAccess,
  onlyModeratorAccess,
  Auth,
} from "../middleware/auth.js";
const router = Router();

//========= user routes =======
router.post("/signUp", user.register);
// router.post("/verfiyMail/:token", user.verfiyMail);
router.post("/login", user.login);
router.post("/logout", Auth, user.logout);
router.put("/update/:id", Auth, onlyAdminAccess, user.update);
//Here admin and moderator have access for delete route under RBAC
router.delete("/delete/:id", Auth, onlyAdminAccess, user.delete);

router.get("/:id", Auth, onlyAdminAccess, user.getOnlyUserData);
router.get(
  "/usersvalues",
  Auth,
  onlyAdminAccess,
  onlyModeratorAccess,
  user.dataInfoUser
);

router.get("/vaildateToken", Auth, user.vaildateToken);

export default router;
