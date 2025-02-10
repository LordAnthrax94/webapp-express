const connection = require("../data/db")

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

  connection.query(sql, [id], (err, results) =>{

    if(err) return res.status(500).json({error: 'Film non trovato'});

    if(results.length === 0) return res.status(404).json({error: 'Richiesta film non riuscita'})

      const movies = results.map(movie =>{
        return{
          ...movie,
          image: `${req.imagePath}/img/${movie.image}`
        }
    })
      res.json(movies[0]);
  })
}

const addReview = (req, res) =>{
  const id = req.params.id

  const sql = 'INSERT INTO reviews ( id, name, vote, text) VALUE (?, ?, ?, ?);'
  
  connection.query(sql, [id, name, vote, text], (err, results) =>{
    if(err) return res.status(500).json({error: 'Recensione non trovata'})
    res.status(201)
    res.json({message: "Recensione aggiunta", id:results.insertId})
    
  })
}

module.exports ={
  index,
  show,
  addReview
}
