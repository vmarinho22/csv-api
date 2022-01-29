import { Router } from "express";

import { UsersController } from "../controllers/UsersController"; 

export const routerUsers = Router();

// Analysis
routerUsers.route('/')
        .post(UsersController.index);

