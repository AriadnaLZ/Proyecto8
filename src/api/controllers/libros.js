const { deleteFile } = require("../../utils/deleteFile")
const Libro = require("../models/libros")


const getLibros = async (req, res, next) => {
  try {
    const libros = await Libro.find()
    return res.status(200).json(libros)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getLibroById = async (req, res, next) => {
  try {
    const {id} = req.params
    const libro = await Libro.findById(id)
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getLibrobyPrices = async (req, res, next) => {
  try {
    const {precio}= req.params
    const libros = await Libro.find({precio: {$lt: precio}})
    return res.status(200).json(libros)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getLibrosByName = async (req, res, next) => {
  try {
    const {nombre} = req.params
    const libro = await Libro.find({nombre})
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getLibrosByCategory = async (req, res, next) => {
  try {
    const {categoria}= req.params
    const libros = await Libro.find({categoria})
    return res.status(200).json(libros)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getLibrosByAutor = async (req, res, next) => {
  try {
    const {autor} = req.params
    const libros = await Libro.find({autor})
    return res.status(200).json(libros)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getLibrosByEditorial = async (req, res, next) => {
  try {
    const {editorial} = req.params
    const libros = await Libro.find({editorial})
    return res.status(200).json(libros)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}


const postLibro = async (req, res, next) => {
  try {
    const newLibro = new Libro(req.body)
    if (req.file) {
      newLibro.imagen = req.file.path
    }
    const libroSaved = await newLibro.save()
    return res.status(201).json(libroSaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error en la solicitud')
  }
}

const putLibro = async (req, res, next) => {
  try {
    const {id} = req.params
    const newLibro = new Libro(req.body)
    newLibro._id = id
    
    if (req.file) {
      newLibro.imagen = req.file.path
      const oldLibro = await Libro.findById(id)
      deleteFile(oldLibro.imagen)
    }
    const LibroUpdated = await Libro.findByIdAndUpdate(id, newLibro, {
      new: true
    })
    return res.status(200).json(LibroUpdated)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const deleteLibro = async (req, res, next) => {
  try {
    const {id} = req.params
    const libroDeleted = await Libro.findByIdAndDelete(id)
    deleteFile(libroDeleted.imagen)
    return res.status(200).json(libroDeleted)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

module.exports = {
  getLibros,
getLibroById,
getLibrobyPrices,
getLibrosByCategory,
getLibrosByAutor,
getLibrosByEditorial,
getLibrosByName,
postLibro,
putLibro,
deleteLibro
}