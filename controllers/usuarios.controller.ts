import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const getUsuarios = async ( req: Request, res: Response ) => {

    try {
        const usuarios = await Usuario.findAll();

        if(usuarios){
            res.status(200).json(usuarios);
        } else{
            res.status(404).json([]);
        }
    } catch (error) {       
        if (error instanceof Error) {
            console.log(error.message);
          }
        res.status(500).json([]);
    }
}

export const getUsuario = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if(usuario){
            res.status(200).json(usuario);
        } else{
            res.status(404).json([]);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
          }
        res.status(500).json([]);
    }
}

export const postUsuario = async ( req: Request, res: Response ) => {

    const { body } = req;
    
    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeEmail){
            return res.status(400).json({ msg: `Ya existe un usuario con el email ${body.email} :(` });
        }

        const usuario = await Usuario.create(body);
        await usuario.save();
        res.status(200).json(usuario);
        
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
          }
        res.status(500).json([]);
    }
}

export const putUsuario = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(400).json({ msg: `No existe ningún usuario con el id ${id} :/` });
        }

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if(existeEmail){
            return res.status(400).json({ msg: `Ya existe un usuario con el email ${body.email} :(` });
        }

        await usuario.update(body);
        res.status(200).json(usuario);
        
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
          }
        res.status(500).json([]);
    }

}
export const deleteUsuario = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(400).json({ msg: `No existe ningún usuario con el id ${id} :/` });
        }

        await usuario.update({ estado : false });
        return res.status(200).json({ msg: `Usuario eliminado correctamente :)` });

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
          }
        res.status(500).json([]);
    }
}
