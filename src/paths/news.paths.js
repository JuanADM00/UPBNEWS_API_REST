import {Router} from 'express';
import { getNews, getNewsItem, createNews, updateNews, deleteNews } from '../controllers/news.controllers.js';

const router = Router()
//Endpoints
router.get('/news', getNews)
router.get('/news/:id', getNewsItem)

router.post('/news', createNews)
router.patch('/news/:id', updateNews) //Uso patch en vez de put para el hipotético caso en el que no quiera actualizar todos los datos
router.delete('/news/:id', deleteNews)

export default router