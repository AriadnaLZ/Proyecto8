const mongoose = require('mongoose')

const autorSchema = new mongoose.Schema({
 nombre: {type: String, required: true},
 libros: [{type: mongoose.Types.ObjectId, ref: "libros", required: false}],
 imagen: {type: String, required: true},
 nacionalidad: {type: String, required: true}
},
{
  timestamps: true,
  collection: "autores"
})

const Autor = mongoose.model('autores', autorSchema, 'autores')
module.exports = Autor