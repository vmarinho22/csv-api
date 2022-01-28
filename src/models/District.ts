import { parse } from "csv-parse";
import * as path from "path";
const csv = require('async-csv');
const fs = require('fs').promises;
import Log from "../middlewares/logs/logger";

type DistrictType = {
  code: string;
  name: string;
  district: string;
  uf: string;
  area: string;
};

class District {

  async getData() {
       // Pegando o caminho do arquivo
    const csvFilePath = path.resolve(__dirname, "../../data/bairros.csv");
    // Criando os indices do objeto
    const headers = ["code", "name", "district", "uf", "area"];
    // Lendo o arquivo

    const options: any = {
        delimiter: ",",
        columns: headers,
      }

    const fileContent = await fs.readFile(csvFilePath, "utf-8");

    // Transformando o conteúdo do arquivo em objeto
    let csvParse = await csv.parse(fileContent, options);
    csvParse = csvParse.slice(1);

    Log.info('Pegando informações dos bairros');

    return csvParse;
    
  }

}

export default new District();
