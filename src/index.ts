import {app} from './app';
import Log from './middlewares/logs/logger';


const port: number | string = process.env.PORT || 3000;

// Inicia o servidor
const server = app.listen(port, () => {
    Log.info(`[API] Executando na porta: ${port}`);
});

// Interrompe o serviço caso o processo seja parado
process.on('SIGINT', () =>{
    server.close();
    Log.info('[API] Encerrada');
});