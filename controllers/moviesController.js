const connection = require("../data/db")

const index = (req, res) =>{
 
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, results) =>{
    if(err) return res.status(500).json({error: 'Connessione al server fallita'})
      res.json(results)
  })

}

const show = (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM movies WHERE id = ?';
  connection.query(sql, [id], (err, results) =>{
    if(err) return res.status(500).json({error: 'Richiesta query non riuscita'});
    if(results.length === 0) return res.status(404).json({error: 'Richiesta film non riuscita'})
      res.json(results[0]);
  })
}

module.exports ={
  index,
  show
}
