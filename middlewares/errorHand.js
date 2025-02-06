const errorHandlers = (err, req, res, next) =>{
  res.status(500)
  res.json({
    message: err.message,
    status: 500,
    error: 'Internal Server error'
  })
}

module.exports = errorHandlers;