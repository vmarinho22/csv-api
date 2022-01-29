import { Request, Response } from "express";
import Log from "../middlewares/logs/logger";
import * as jwt from "jsonwebtoken";

// Importando a classe
import User from "../models/User";


export const UsersController = {

    async index(req: Request, res: Response) : Promise<any> {

        const {user,password} = req.body;

        // Validações
        if (!user) return res.status(422).json({ status: 0, response: "O email obrigatório!" });
        if (!password) return res.status(422).json({ status: 0, response: "A senha é obrigatória!" });

        if(!User.validateUser(user, password)) {
            Log.info(`Tentativa de acesso com o usuário: ${user}`);
            return res.status(403).json({ status: 0, response: "Usuário não encontrado, por favor reveja suas credenciais!" });
        } 

        // Cria o token
        const token: string = jwt.sign({ user: user},process.env.SECRET || '', {
            expiresIn: "1h",
        });

        Log.info(`Usuário: ${user} autenticado com sucesso!`);

        return res.status(200).json({
            status: 1,
            response: "Usuário logado com sucesso",
            token: token
        });

    }
}