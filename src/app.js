import express from 'express';
import newsPaths from './paths/news.paths.js'
import indexPaths from './paths/index.paths.js'
import {PORT} from './config.js'

const app = express()

app.use(express.json())
app.use(indexPaths)
app.use('/api', newsPaths)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint no encontrado'
    })
}) //En caso de una ruta errónea, en vez de retornar un HTML que solo pueda interpretar el navegador, retorno un JSON

export default app;