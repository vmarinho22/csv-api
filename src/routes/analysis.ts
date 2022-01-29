import { Router } from "express";
import {verifyToken} from '../middlewares/auth/auth';

import { AnalysisController } from "../controllers/AnalysisController"; 

export const routerAnalysis = Router();

// Analysis
routerAnalysis.route('/:id')
        .all(verifyToken)
        .get(AnalysisController.index);

