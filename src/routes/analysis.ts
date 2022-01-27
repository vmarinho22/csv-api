import { Router } from "express";

import { AnalysisController } from "../controllers/AnalysisController"; 

export const routerAnalysis = Router();

// Analysis
routerAnalysis.route('/')
        .get(AnalysisController.index);

