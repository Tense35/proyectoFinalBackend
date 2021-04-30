// Terceros
import { Request, Response } from "express";

// Propios
import Producto from '../models/producto';

// Función para errores

const sendError = ( error: Error, res: Response, area:string ) =>
{
    console.log('------------------------------------------');
    console.log(`Error productos/controller, ${ area }`);
    console.log('------------------------------------------');
    console.log(error);
    res.status(500).json
    ({
        ok: false,
        msg: 'Avisar al administrador del backend - categorias/controller'
    });
}

// Obtener todos los productos de la base de datos
export const getProductos = async( req: Request, res: Response ) => 
{
    let { estado = true } = req.query;

    estado = ( estado === 'false' )? false : true;

    try 
    {
        const data = ( estado )? await Producto.findAll({ where: { estado: true } }) : await Producto.findAll();

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getProductos' );
    }
}

// Obtener un producto específico de la base de datos
export const getProducto = async( req: Request, res: Response ) => 
{
    let { estado = 1 } = req.query;
    let { id_producto } = req.params;
    id_producto = id_producto.toLowerCase();

    estado = ( estado === 'false' )? 0 : 1;

    try 
    {
        let data = ( estado )? await Producto.findOne({ where: {id_producto, estado: 1 }}) : await Producto.findByPk( id_producto );

        if (!data)
        {
            return res.status(404).json
            ({
                ok: true,
                data: 'No se encontró el producto, probablemente fue eliminado.'
            });
        }

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'getProducto' );
    }
}

export const postProducto = async( req: Request, res: Response ) => 
{
    const info = req.body;
    info.color = info.color.toLowerCase();
    info.talla = info.talla.toLowerCase();
    info.marca = info.marca.toLowerCase();
    info.nombre = info.nombre.toLowerCase();
    info.genero = info.genero.toLowerCase();
    info.descripcion = info.descripcion.toLowerCase();

    try 
    {
        const data = await Producto.create( info );

        res.json
        ({
            ok: true,
            data
        });
    } 
    catch (error) 
    {
        sendError(error, res, 'postProducto' );
    }
}

export const putProducto = async( req: Request, res: Response ) => 
{
    const { id_producto } = req.params;
    const info = req.body;

    if ( info.color )
    {
        info.color = info.color.toLowerCase();
    }

    if ( info.talla )
    {
        info.talla = info.talla.toLowerCase();
    }

    if ( info.marca )
    {
        info.marca = info.marca.toLowerCase();
    }

    if ( info.nombre )
    {
        info.nombre = info.nombre.toLowerCase();
    }

    if ( info.enero )
    {
        info.genero = info.genero.toLowerCase();
    }

    if ( info.descripcion )
    {
        info.descripcion = info.descripcion.toLowerCase();
    }

    try 
    {
        const producto = await Producto.findByPk( id_producto );
        const data = ( producto )? await producto.update(info) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'putProducto' );
    }
}

export const deleteProducto = async( req: Request, res: Response ) => 
{
    const { id_producto } = req.params;

    try 
    {
        const producto = await Producto.findByPk( id_producto );
        const data = ( producto )? await producto.update({ estado: 0 }) : null;

        res.json
        ({
            ok: true,
            data
        });

    } 
    catch (error) 
    {
        sendError(error, res, 'deleteProducto' );
    }
}