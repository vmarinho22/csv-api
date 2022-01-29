import * as path from "path";
import fs from "fs";
import Log from "../middlewares/logs/logger";


class Users {

  public resultJSON: any = [];

  constructor()  {
    (async () => {
      this.resultJSON = await this.readJSON();
    })();
  }

  async readJSON() {
    
    // Pegando o caminho do arquivo
    const jsonFilePath = path.resolve(__dirname, "../../data/users.json");

    // Lendo o arquivo
    const fileContent = fs.readFileSync(jsonFilePath, { encoding: "utf-8" });

    // Transformando o conteúdo do arquivo em objeto
    let jsonParse = await JSON.parse(fileContent);

    Log.info('Pegando informações dos usuários');

    return jsonParse;
  }

  validateUser(userLogin: string, password : string) : any {
    const userResult : any = this.resultJSON.find( (user: any) => user.user == userLogin && user.password == password);
    return userResult != undefined ? true : false;
  }
}

export default new Users();
