import dotenv from 'dotenv'
import Server from './models/server';

// Leyendo variables de entorno del archivo .env
const setEnvVar = () => {
    dotenv.config();
}

setEnvVar();

// Nueva instancia del servidor
const server = new Server();

// Iniciando servidor
server.listen();