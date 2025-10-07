import { Router } from "express";
import { getWelcomeResponse } from "../controllers/main.controller.js"; 
import { notFoundMiddleware, errorMiddleware } from "../middlewares/error.middleware.js";
import { teamRouter } from "./team.router.js"
import { pokeRouter } from "./poke.router.js"
import { typeRouter } from "./type.router.js";
import { authRouter } from "./auth.router.js";

export const apiRouter = Router();

apiRouter.get("/", getWelcomeResponse);

apiRouter.use(authRouter);
apiRouter.use(teamRouter);
apiRouter.use(pokeRouter);
apiRouter.use(typeRouter);

apiRouter.use(errorMiddleware);
apiRouter.use(notFoundMiddleware);