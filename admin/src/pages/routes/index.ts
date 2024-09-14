import { Router } from "express";
import authGuard from "../../middlewares/authGuard";

import dashboardRoute from "./dashboard";
import loginRoute from "./login";

const router = Router();

router.use("/", authGuard, dashboardRoute);

router.use("/login", authGuard, loginRoute);

router.get("/logout", (req, res) => {

    delete (<any>req.session).admin_id;

    return res.redirect("/");
})

export default router;