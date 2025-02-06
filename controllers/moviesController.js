const connection = require("../data/db")

const index = (req, res) =>{
 
  const sql = 'SELECT * FROM movies'

  connection.query(sql, (err, results) =>{
    if(err) return res.status(500).json({error: 'Connessione al server fallita'})
      res.json(results)
  })

}

const show = (req, res) => {
  res.send('Dettaglio film')
}

module.exports ={
  index,
  show
}
