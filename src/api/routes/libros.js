const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getLibroById, getLibros, getLibrobyPrices, getLibrosByCategory, getLibrosByAutor, getLibrosByEditorial, postLibro, putLibro, deleteLibro, getLibrosByName } = require("../controllers/libros");

const librosRouter = require('express').Router()

librosRouter.get('/nombre/:nombre', getLibrosByName)
librosRouter.get('/precio/:precio', getLibrobyPrices)
librosRouter.get('/editorial/:editorial',getLibrosByEditorial)
librosRouter.get('/autor/:autor', getLibrosByAutor)
librosRouter.get('/category/:categoria', getLibrosByCategory)
librosRouter.get('/:id', getLibroById)
librosRouter.get('/',getLibros)
librosRouter.post('/', [isAdmin], upload.single('imagen'), postLibro)
librosRouter.put('/:id', [isAdmin],  upload.single('imagen'), putLibro)
librosRouter.delete('/:id',[isAdmin], deleteLibro)

module.exports = librosRouter