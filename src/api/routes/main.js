const autoresRouter = require('./autores')
const librosRouter = require('./libros')
const usersRoutes = require('./users')

const mainRouter = require('express').Router()

mainRouter.use('/libros', librosRouter)
mainRouter.use('/autores', autoresRouter)
mainRouter.use('/users', usersRoutes)

module.exports = mainRouter