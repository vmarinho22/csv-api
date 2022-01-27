import { Request, Response } from "express";

// Importando a classe
import Competitors from "../models/Competitors";
import District from '../models/District';
import FlowEvents from "../models/FlowEvents";
let flowEventsResult: any; 
let districtResult: any;
let competitorsResult: any;

// Otimização de parse
(async () => {
    districtResult = await District.getData();
    flowEventsResult = await FlowEvents.getData();
    competitorsResult = await Competitors.getData();
})();

export const AnalysisController = {
    async index(req: Request, res: Response) : Promise<any> {
        // return res.status(200).json(await District.getData());
        return res.status(200).json( flowEventsResult)
    }
}