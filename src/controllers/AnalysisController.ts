import { Request, Response } from "express";

// Importando a classe
import Competitors from "../models/Competitors";
import District from '../models/District';
import FlowEvents from "../models/FlowEvents";
import Population from "../models/Population";
let flowEventsResult: any; 
let districtResult: any;
let competitorsResult: any;
let populationResult: any;

// Otimização de parse
(async () => {
    districtResult = await District.getData();
    flowEventsResult = await FlowEvents.getData();
    competitorsResult = await Competitors.getData();
    populationResult = await Population.getData();
})();

export const AnalysisController = {

    async index(req: Request, res: Response) : Promise<any> {

        const {id} = req.params;

        // Busca a empresa concorrente
        const competitor: any = competitorsResult.find( (competitors: any) => competitors.code == id );

        // Faz a busca do distrito em que a empresa está alocada
        const district: any = districtResult.find( (district: any) => district.code == competitor.cod_district);

        // Faz a busca da população do local
        const population: any = populationResult.find( (population: any) => population.codigo == district.code);

        // Realiza o calculo da densidade do local
        let density: number = (parseInt(population.populacao) / parseFloat(district.area));
        density = parseFloat(density.toFixed(2));

        const flowEvents: any = flowEventsResult.filter( (flowEvents: any) => flowEvents.cod_competitor == id);

        
        let weekday: any = {
            morning: 0,
            evening: 0,
            night: 0
        };

        let week: any = {
            monday: {...weekday},
            tuesday: {...weekday},
            wednesday: {...weekday},
            thursday: {...weekday},
            friday: {...weekday},
            saturday: {...weekday},
            sunday: {...weekday},

        }

        let weekmap : any  = {
            0 : "sunday",
            1 : "monday",
            2 : "tuesday",
            3 : "wednesday",
            4 : "thursday",
            5 : "friday",
            6 : "saturday",
        }

        // Varre o array com os fluxos de pessoas no dia
        flowEvents.forEach((flowEvent: any) => {
            const dateTime: Date = new Date(flowEvent.datetime);
            const weekDay: number = dateTime.getDay();
            const getHour: number = dateTime.getHours();
          
            if(getHour <= 12) {
                week[weekmap[weekDay]].morning += 1;  
            }else if(getHour > 12 && getHour <=18) {
                week[weekmap[weekDay]].evening += 1;
            }else{
                week[weekmap[weekDay]].night += 1;
            }
        });

        // Fluxo em % = (periodo * 100)/ total_dia
        let weekResul : any = {
            segunda: {
                manha:  ((week.monday.morning * 100) / (week.monday.morning + week.monday.evening + week.monday.night)).toFixed(1),
                tarde:  ((week.monday.evening * 100) / (week.monday.morning + week.monday.evening + week.monday.night)).toFixed(1),
                noite:  ((week.monday.night * 100) / (week.monday.morning + week.monday.evening + week.monday.night)).toFixed(1),
            },
            terca: {
                manha:  ((week.tuesday.morning * 100) / (week.tuesday.morning + week.tuesday.evening + week.tuesday.night)).toFixed(1),
                tarde:  ((week.tuesday.evening * 100) / (week.tuesday.morning + week.tuesday.evening + week.tuesday.night)).toFixed(1),
                noite:  ((week.tuesday.night * 100) / (week.tuesday.morning + week.tuesday.evening + week.tuesday.night)).toFixed(1)
            },
            quarta: {
                manha:  ((week.wednesday.morning * 100) / (week.wednesday.morning + week.wednesday.evening + week.wednesday.night)).toFixed(1),
                tarde:  ((week.wednesday.evening * 100) / (week.wednesday.morning + week.wednesday.evening + week.wednesday.night)).toFixed(1),
                noite:  ((week.wednesday.night * 100) / (week.wednesday.morning + week.wednesday.evening + week.wednesday.night)).toFixed(1)
            },
            quinta: {
                manha:  ((week.thursday.morning * 100) / (week.thursday.morning + week.thursday.evening + week.thursday.night)).toFixed(1),
                tarde:  ((week.thursday.evening * 100) / (week.thursday.morning + week.thursday.evening + week.thursday.night)).toFixed(1),
                noite:  ((week.thursday.night * 100) / (week.thursday.morning + week.thursday.evening + week.thursday.night)).toFixed(1)
            },
            sexta: {
                manha:  ((week.friday.morning * 100) / (week.friday.morning + week.friday.evening + week.friday.night)).toFixed(1),
                tarde:  ((week.friday.evening * 100) / (week.friday.morning + week.friday.evening + week.friday.night)).toFixed(1),
                noite:  ((week.friday.night * 100) / (week.friday.morning + week.friday.evening + week.friday.night)).toFixed(1)
            },
            sabado: {
                manha:  ((week.saturday.morning * 100) / (week.saturday.morning + week.saturday.evening + week.saturday.night)).toFixed(1),
                tarde:  ((week.saturday.evening * 100) / (week.saturday.morning + week.saturday.evening + week.saturday.night)).toFixed(1),
                noite:  ((week.saturday.night * 100) / (week.saturday.morning + week.saturday.evening + week.saturday.night)).toFixed(1)
            },
            domingo: {
                manha:  ((week.sunday.morning * 100) / (week.sunday.morning + week.sunday.evening + week.sunday.night)).toFixed(1),
                tarde:  ((week.sunday.evening * 100) / (week.sunday.morning + week.sunday.evening + week.sunday.night)).toFixed(1),
                noite:  ((week.sunday.night * 100) / (week.sunday.morning + week.sunday.evening + week.sunday.night)).toFixed(1)
            }
        }

        const finalAnalysis: any = {
            cod_concorrente: competitor.code,
            nome_concorrente: competitor.name,
            endereco: competitor.address,
            preco_praticado: (parseFloat(competitor.price_range)).toFixed(2),
            fluxo_medio: weekResul,
            bairro: district.name,
            populacao: population.populacao,
            densidade: density
        }

        return res.status(200).json(finalAnalysis);
    }
}