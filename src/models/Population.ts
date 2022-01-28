import * as path from "path";
import fs from "fs";
import Log from "../middlewares/logs/logger";


class Population {

  async getData() {
    
    // Pegando o caminho do arquivo
    const jsonFilePath = path.resolve(__dirname, "../../data/populacao.json");

    // Lendo o arquivo
    const fileContent = fs.readFileSync(jsonFilePath, { encoding: "utf-8" });

    // Transformando o conteúdo do arquivo em objeto
    let jsonParse = await JSON.parse(fileContent);

    Log.info('Pegando informações da população');

    return jsonParse;
  }
}

export default new Population();
