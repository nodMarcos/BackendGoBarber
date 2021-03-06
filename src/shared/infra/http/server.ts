import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import 'reflect-metadata';
import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import '@shared/container'

import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files',express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof AppError){
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
        });
    }

    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
},
);

app.listen(3333, () =>{
    console.log('Server Started. Port 3333');
});