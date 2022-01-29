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

        if(competitor == undefined) {
            Log.info(`Busca realizada no concorrente com o id: ${id}, porém sem resultado na base de dados.`);
            return res.status(200).json({status: 1, response: 'Não foi encontrado nenhum concorrente com esse ID'});
        }

        const district : any = District.getDistrictData(competitor.cod_district);

        let population : number = 0;
        let density : number = 0;
        let districtName: string = '';
        if(district != undefined) {
            // Pega o valor da população
            population = Population.getPopulationNumber(district.code || 0);
            
            // Realiza o calculo da densidade do local
            density = parseFloat((population / parseFloat(district.area)).toFixed(2));
            // Nome do distrito
            districtName = district.name
        }

        const flowEvents : any = FlowEvents.getFormatedWeekFow(id);

        const finalAnalysis: any = {
            cod_concorrente: competitor.code,
            nome_concorrente: competitor.name,
            endereco: competitor.address,
            preco_praticado: (parseFloat(competitor.price_range)).toFixed(2),
            fluxo_medio: flowEvents,
            bairro: districtName,
            populacao: population,
            densidade: density
        }

        Log.info(`Busca realizada no concorrente: ${competitor.name}, com o id: ${id}`);

        return res.status(200).json({status: 1,response: finalAnalysis});
    }
}