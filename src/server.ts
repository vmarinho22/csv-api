import app from './app';

const port: number | string = process.env.PORT || 3000;

// Inicia o servidor
const server = app.listen(port, () => {
    console.log(`[API] Executando na porta: ${port}`);
});

// Interrompe o serviço caso o processo seja parado
process.on('SIGINT', () =>{
    server.close();
    console.log("[API] Encerrada");
});