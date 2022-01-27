import { parse } from "csv-parse";
import * as path from "path";
const csv = require('async-csv');
import fs from "fs";
import Log from "../middlewares/logs/logger";

const zlib = require('zlib');

type FlowEventsType = {
  code: string;
  name: string;
  district: string;
  uf: string;
  area: string;
};

class FlowEvents {

  public resultCSV: FlowEventsType[] = [];

  async getData() {

    const fileContents = fs.createReadStream('./data/eventos_de_fluxo.csv.gz');
    const writeStream = fs.createWriteStream('./data/eventos_de_fluxo.csv');
    const unzip = zlib.createGunzip();

    fileContents.pipe(unzip).pipe(writeStream);
    
    // Pegando o caminho do arquivo
    const csvFilePath = path.resolve(__dirname, "../../data/eventos_de_fluxo.csv");
    // Criando os indices do objeto
    const headers = ["code", "datetime", "cod_competitor"];
    // Lendo o arquivo
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const options: any = {
      delimiter: ",",
      columns: headers,
    }

    // Transformando o conteúdo do arquivo em objeto
    let csvParse = await csv.parse(fileContent, options);
    csvParse = csvParse.slice(1);

    return csvParse;
  }
}

export default new FlowEvents();
