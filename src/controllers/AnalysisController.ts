import { Request, Response } from "express";
import Log from "../middlewares/logs/logger";

// Importando a classe
import Competitors from "../models/Competitors";
import District from '../models/District';
import FlowEvents from "../models/FlowEvents";
import Population from "../models/Population";


export const AnalysisController = {

    async index(req: Request, res: Response) : Promise<any> {

        const {id} = req.params;

        const competitor : any = Competitors.getCompetitorData(id);

        const district : any = District.getDistrictData(competitor.cod_district);

        const flowEvents : any = FlowEvents.getFormatedWeekFow(id);

        const population : any = Population.getPopulationData(district.code);

        // Realiza o calculo da densidade do local
        let density: number = parseFloat((parseFloat(population.populacao) / parseFloat(district.area)).toFixed(2));

        const finalAnalysis: any = {
            cod_concorrente: competitor.code,
            nome_concorrente: competitor.name,
            endereco: competitor.address,
            preco_praticado: (parseFloat(competitor.price_range)).toFixed(2),
            fluxo_medio: flowEvents,
            bairro: district.name,
            populacao: population.populacao,
            densidade: density
        }

        Log.info(`Busca realizada no concorrente: ${competitor.name}, com o id: ${id}`);

        return res.status(200).json(finalAnalysis);
    }
}