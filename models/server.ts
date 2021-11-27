import express, { Application } from 'express';
import userRoutes from '../routes/usuario.routes';
import rootRoutes from '../routes/root.routes';
import cors from 'cors';
import morgan from 'morgan';
import database from '../database/connection';


class Server {

   private app: Application;
   private port: string | number;
   private apiPaths = {
      usuarios: '/api/usuarios',
      root: '/'
   }

   constructor(){
      this.app = express();
      this.port = process.env.PORT || 8000;
      this.dbConnection();
      this.middlewares();
      this.routes();
   }

   async dbConnection(){
      try {
         await database.authenticate();
         console.log('Database is connected! :D');
      } catch ( error ) {
         if (error instanceof Error) {
            console.log(error.message);
          }
      }
   }

   middlewares(){
      // Info de cada request
      this.app.use( morgan('tiny') );
      // CORS
      this.app.use( cors() );
      // Lectura del body
      this.app.use( express.json() ); 
   }

   routes(){
      this.app.use( this.apiPaths.root, rootRoutes )
      this.app.use( this.apiPaths.usuarios, userRoutes );
   }

   listen(){
      this.app.listen( this.port, () => {
         console.log("Servidor corriendo en puerto " + this.port + " :D !");
      });
   }

}

export default Server;