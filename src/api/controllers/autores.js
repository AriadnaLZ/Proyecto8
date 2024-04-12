const Autor = require('../models/autores')

const getAutores = async (req, res, next) => {
  try {
    const autores = await Autor.find().populate('libros')
    return res.status(200).json(autores)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getAutoresById = async (req, res, next) => {
  try {
    const { id } = req.params
    const autor = await Autor.findById(id).populate('libros')
    return res.status(200).json(autor)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getAutoresByNacionalidad = async (req, res, next) => {
  try {
    const { nacionalidad } = req.params
    const autores = await Autor.find({ nacionalidad }).populate('libros')
    return res.status(200).json(autores)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const postAutor = async (req, res, next) => {
  try {
    const newAutor = new Autor(req.body)
    if (req.file) {
      newAutor.imagen = req.file.path
    }
    const autorSaved = await newAutor.save()
    return res.status(201).json(autorSaved)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const putAutor = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldAutor = await Autor.findById(id)
    const newAutor = new Autor(req.body)
    newAutor._id = id
    const libros = req.body.libros || []
    newAutor.libros = [...oldAutor.juegos, ...req.body.libros]
    if (req.file) {
      newAutor.imagen = req.file.path
      deleteFile(oldAutor.imagen)
    }
    const autorUpdated = await Autor.findByIdAndUpdate(id, newAutor, {
      new: true
    })
    return res.status(200).json(autorUpdated)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const deleteAutor = async (req, res, next) => {
  try {
    const { id } = req.params
    const autorDeleted = await Autor.findByIdAndDelete(id)
    deleteFile(autorDeleted.imagen)
    return res.status(200).json(autorDeleted)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

module.exports = {
  getAutores,
  getAutoresById,
  getAutoresByNacionalidad,
  postAutor,
  putAutor,
  deleteAutor
}
