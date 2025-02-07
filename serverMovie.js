const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

const movieRouter = require('./routes/movieRouter');
const errorHandlers = require('./middlewares/errorHand');
const notFoundHandlers = require('./middlewares/notFound');

app.use(cors({oring: 'http://localhost:5173/'}))

app.use(express.static('Public'))

app.use(express.json())

app.get('/', (req, res) =>{
  res.send('Lista Film')
})

app.use('/movies', movieRouter)

app.use(errorHandlers)

app.use(notFoundHandlers)

app.listen(port, ()=>{
  console.log(`Sono in ascolto sulla porta ${port}`);
  
})