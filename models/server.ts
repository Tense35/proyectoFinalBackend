// Terceros
import express, { Application } from "express";
import cors from "cors";

// propios
import db from "../db/connection";

import usuariosRoutes from '../routes/usuarios';


class Server 
{

    // Propieades
    private app: Application;
    private port: string;

    // Definición de endpoints
    private paths =
    {
        usuarios: '/api/usuarios',
        categorias: 'api/categorias',
        clientes: 'api/clientes',
        ventas: 'api/ventas',
        producto: 'api/producto'
    };

    constructor()
    {
        this.app = express();
        this.port = process.env.PORT || '8081';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    

    // Establecer conexión con la base de datos
    async dbConnection()
    {
        try 
        {
            await db.authenticate();
            console.log('Database online');
        } 
        catch (error) 
        {
            throw new Error( error );
        }
    }

    middlewares()
    {
        // Cors
        this.app.use( cors() );

        // Lectura del body - Permite leer el body de las peticiones rest
        this.app.use( express.json() );

        // Carpeta pública -  Carpeta inicial en el navegador
        this.app.use( express.static('public'));
    }

    // Definición de rutas
    routes()
    {
        this.app.use( this.paths.usuarios, usuariosRoutes );
    }


    // Levantar el servidor
    listen(): void
    {
        this.app.listen( this.port, () => 
        {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

// Exportar la clase
export default Server;