import { Request, Response } from 'express';

export const getRoot = ( req: Request, res: Response ) => {

        res.json({
            msg: 'API Typescript+Sequelize+MySQL :D'
        });

}