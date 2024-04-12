const mongoose = require('mongoose')

const libroSchema = new mongoose.Schema({
 nombre: {type: String, required: true},
 autor: {type: String, required: true},
 año: {type:Number, required: false},
 editorial: {type: String, required: true},
 precio: {type: Number, required: true},
 categoria: {type: String, required: true, enum:[
'aventura',
'miedo',
'amor',
'historia',
'thriller',
'biografia'
 ]},
 imagen: {type: String, required: true}
},
{
  timestamps: true,
  collection: "libros"
})


const Libro = mongoose.model('libros', libroSchema, 'libros')
module.exports = Libro