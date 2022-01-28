import { parse } from "csv-parse";
import * as path from "path";
const csv = require('async-csv');
const fs = require('fs').promises;
import Log from "../middlewares/logs/logger";

type CompetitorsType = {
  code: string;
  name: string;
  category: string;
  price_range: string;
  address: string;
  county: string;
  uf: string;
  cod_district: string;
};

class Competitors {
  public resultCSV: CompetitorsType[] = [];

  async getData() {
    // Pegando o caminho do arquivo
    const csvFilePath = path.resolve(__dirname, "../../data/concorrentes.csv");
    // Criando os indices do objeto
    const headers = [
      "code",
      "name",
      "category",
      "price_range",
      "address",
      "county",
      "uf",
      "cod_district",
    ];
    // Lendo o arquivo

    const options: any = {
      delimiter: ",",
      columns: headers,
    };

    const fileContent = await fs.readFile(csvFilePath, "utf-8");

    // Transformando o conteúdo do arquivo em objeto
    let csvParse = await csv.parse(fileContent, options);
    csvParse = csvParse.slice(1);

    Log.info('Pegando informações dos concorrentes');

    return csvParse;
  }

}

export default new Competitors();
