import { pool } from '../db.js'

export const getNews = async (req, res) => {
   try {
      const [rows] = await pool.query('SELECT * FROM UPBNEWS')
      res.json(rows)
   } catch (error) {
      return res.status(500).json({
         message: 'Algo salió mal'
      })
   }
}

export const getNewsItem = async (req, res) => {
   try {
      const [rows] = await pool.query('SELECT * FROM UPBNEWS WHERE ID = ?', [req.params.id])
      if (rows.length <= 0) return res.status(404).json({
         message: 'Noticia no encontrada'
      })
      res.json(rows[0])
   } catch (error) {
      return res.status(500).json({
         message: 'Algo salió mal'
      })
   }
}

export const createNews = async (req, res) => {
   const { headline, content, author } = req.body
   try {

      const [rows] = await pool.query('INSERT INTO UPBNEWS (HEADLINE, CONTENT, AUTHOR) VALUES (?, ?, ?)', [headline, content, author])
      res.send({
         id: rows.insertId
      })
   } catch (error) {
      return res.status(500).json({
         message: 'Algo salió mal'
      })
   }
}

export const updateNews = async (req, res) => {
   const { id } = req.params
   const { headline, content, author } = req.body

   try {
      const [result] = await pool.query('UPDATE UPBNEWS SET HEADLINE = IFNULL(?, HEADLINE), CONTENT = IFNULL(?, CONTENT), AUTHOR = IFNULL(?, AUTHOR) WHERE ID = ?', [headline, content, author, id])

      console.log(result)

      if (result.affectedRows === 0) return res.status(404).json({
         message: 'Noticia no encontrada'
      })

      const [rows] = await pool.query('SELECT * FROM UPBNEWS WHERE ID = ?', [id])

      res.json(rows[0])
   } catch (error) {
      return res.status(500).json({
         message: 'Algo salió mal'
      })
   }
}

export const deleteNews = async (req, res) => {
   try {
      const [result] = await pool.query('DELETE FROM UPBNEWS WHERE ID = ?', [req.params.id])

      if (result.affectedRows <= 0) return res.status(404).json({
         message: 'Noticia no encontrada'
      })

      res.sendStatus(204)
   } catch (error) {
      return res.status(500).json({
         message: 'Algo salió mal'
      })
   }
}