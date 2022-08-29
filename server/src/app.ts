import express, { Express, NextFunction, Request, RequestHandler, Response } from 'express';
import { createServer, Server } from 'http';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import {Table} from 'console-table-printer'

dotenv.config();

import { NotFoundError } from './utils/http-error';
import { errorHandler } from './utils/common';
import { router } from './routes';

declare global {
    namespace Express {
        export interface Request {
          auth: Record<any, any>
        }
      }
}
 

const app: Express = express();

export const server: Server = createServer(app);

app.use(express.json()).use(cors()).use(morgan('dev'))
    .use(express.urlencoded({ extended: true }))

app.use('/api/v1', router);

app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError('Route not found'))
})

app.use(errorHandler)


const routes:any[] = []

function print (path:any, layer:any) {
    if (layer.route) {
        // console.log(layer.route)
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method && layer.name == '<anonymous>') {
      routes.push({
        method: layer.method.toUpperCase(),
        path: path.concat(split(layer.regexp)).filter(Boolean).join('/')
      })
        
        
    }
  }
  
  function split (thing:any) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }

export function logRoutes() {
    app._router.stack.forEach(print.bind(null, []))

    const p = new Table({
        columns: [
          { name: "method", alignment: "left",  color: "cyan" },
          { name: "path", alignment: "left", color: "blue" },
        ],
      });
      p.addRows(routes)
    p.printTable()
}
  
