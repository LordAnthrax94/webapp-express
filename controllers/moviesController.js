const connection = require("../data/db")
const path = require('path')
const fs = require('fs')

const index = (req, res) =>{
 
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, results) =>{
    if(err) return res.status(500).json({error: 'Connessione al server fallita'})
      
      const movies = results.map(movie =>{
        return{
          ...movie,
          image: `${req.imagePath}/img/${movie.image}`
        }
    })
      res.json(movies);
  })

}

const show = (req, res) => {
  const id = req.params.id
  const sql = 'SELECT movies.*, ROUND(AVG(reviews.vote), 1) AS vote FROM movies LEFT JOIN reviews ON movies.id = reviews.movie_id WHERE movies.id = ?;'
  const sqlReview = 'SELECT reviews.* FROM reviews WHERE reviews.movie_id = ?'

  connection.query(sql, [id], (err, results) =>{

    if(err) return res.status(500).json({error: 'Film non trovato'});

    if(results.length === 0) return res.status(404).json({error: 'Richiesta film non riuscita'})      

      connection.query(sqlReview, [id], (err, resultsReview)=>{
        console.log(resultsReview);
        let movie = results[0];
        
        if (err) return res.status(500).json({error: 'Risorsa non trvata'})
          movie.reviews = resultsReview        
        res.json({
          ...movie,
          image: `${req.imagePath}/img/${movie.image}`,  
         
        }) 
      })
  })
}

const addReview = (req, res) =>{
  const id = req.params.id
  const {name, text, vote} = req.body

  const sql = 'INSERT INTO reviews ( movie_id, name, vote, text) VALUE (?, ?, ?, ?);'
  
  connection.query(sql, [id, name, vote, text], (err, results) =>{
    if(err) return res.status(500).json({error: err})
    res.status(201)
    res.json({message: "Recensione aggiunta", id:results.insertId})
    
  })
}

const store = (req, res) =>{
  const {title, director, genre} = req.body
  const imgName = req.file.filename;

  const sql = 'INSERT INTO movies (title, director, genre, image) VALUES (?, ?, ?, ?)'

 connection.query(sql, [title, director, genre, imgName], (err, results) =>{
   if(err) return res.status(500).json({error: err})
   res.status(201).json({status: 'success', message: 'Film aggiunto con successo'})
  
  
 }) 
}

const destroy = (req, res) =>{
 const id = req.params.id  

 const sqlSelect= 'SELECT image FROM movies WHERE id = ?'
 connection.query(sqlSelect, [id], (err, results)=>{
  if(err) res.status(500).json({error: 'Risorsa non trovata'})
    
    const imageName = results[0].image;
     const imgPath = path.join(__dirname, '../public/img/', imageName) 
    
     fs.unlink(imgPath, (err) =>{
      console.log(err);  
     })
     const sql = 'DELETE FROM movies WHERE id = ?'
    
     connection.query(sql, [id], (err, results) =>{
        if(err) res.status(500).json({errore: 'Risorsa non trovata'})
          res.status(204).json({message: 'Film eliminato con successo'})    
   })
 })
}

module.exports ={
  index,
  show,
  addReview,
  store,
  destroy
}
