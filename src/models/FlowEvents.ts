import { parse } from "csv-parse";
import * as path from "path";
const csv = require("async-csv");
import fs from "fs";
import Log from "../middlewares/logs/logger";

const zlib = require("zlib");

type FlowEventsType = {
  code: string;
  name: string;
  district: string;
  uf: string;
  area: string;
};

class FlowEvents {
  public resultCSV: any = [];

  constructor() {
    (async () => {
      this.resultCSV = await this.readCSV();
    })();
  }

  async readCSV(): Promise<FlowEventsType> {
    // Abre o arquivo gz e lê o conteúdo
    const fileContents = fs.createReadStream("./data/eventos_de_fluxo.csv.gz");
    // Cria um arquivo csv
    const writeStream = fs.createWriteStream("./data/eventos_de_fluxo.csv");
    // Cria uma instancia binária de zip
    const unzip = zlib.createGunzip();

    // Imprime o conteúdo do arquivo gz dentro do arquivo csv
    await fileContents.pipe(unzip).pipe(writeStream);

    // Pegando o caminho do arquivo
    const csvFilePath = path.resolve(
      __dirname,
      "../../data/eventos_de_fluxo.csv"
    );
    // Criando os indices do objeto
    const headers = ["code", "datetime", "cod_competitor"];
    // Lendo o arquivo
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const options: any = {
      delimiter: ",",
      columns: headers,
    };

    // Transformando o conteúdo do arquivo em objeto
    let csvParse = await csv.parse(fileContent, options);
    csvParse = csvParse.slice(1);

    Log.info("Pegando informações do evento de fluxo");

    return csvParse;
  }

  getFlowEventsData(id: string): string[] {
    return this.resultCSV.filter(
      (flowEvents: any) => flowEvents.cod_competitor == id
    );
  }

  getInfoWeek(id: string): string[] {
    const flowEvents: any = this.getFlowEventsData(id);

    console.log(flowEvents);

    if(flowEvents.length == 0) return [];
      

    let weekday: any = {
      morning: 0,
      evening: 0,
      night: 0,
    };

    let week: any = {
      monday: { ...weekday },
      tuesday: { ...weekday },
      wednesday: { ...weekday },
      thursday: { ...weekday },
      friday: { ...weekday },
      saturday: { ...weekday },
      sunday: { ...weekday },
    };

    let weekmap: any = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",
    };

    // Varre o array com os fluxos de pessoas no dia
    flowEvents.forEach((flowEvent: any) => {
      const dateTime: Date = new Date(flowEvent.datetime);
      const weekDay: number = dateTime.getDay();
      const getHour: number = dateTime.getHours();

      if (getHour <= 12) {
        week[weekmap[weekDay]].morning += 1;
      } else if (getHour > 12 && getHour <= 18) {
        week[weekmap[weekDay]].evening += 1;
      } else {
        week[weekmap[weekDay]].night += 1;
      }
    });

    return week;
  }

  getFormatedWeekFow(id: string): string[] {
    const week : any = this.getInfoWeek(id);

    console.log('week', week);

    if(week.length == 0) return ['Não existem dados de fluxo de pessoas para esse concorrente'];

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

    return weekResul;
  }
}

export default new FlowEvents();
