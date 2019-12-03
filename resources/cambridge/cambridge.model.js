const mongoose = require('mongoose');

const cambridgeSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, 'Se debe tener una palabra']
  },
  graCat: {
    type: String,
    required: [true, 'Se debe tener una categoria gramatical']
  },
  uk_pron_text: {
    type: String,
    required: [true, 'Se debe tener una fonetica UK']
  },
  uk_pron_audio_url: {
    type: String,
    required: [true, 'Se debe tener un url del audio en UK']
  },
  us_pron_text: {
    type: String,
    required: [true, 'Se debe tener una fonetica US']
  },
  us_pron_audio_url: {
    type: String,
    required: [true, 'Se debe tener un url del audio US']
  },
  html: {
    type: String,
    required: [ true, 'Se debe tener html del resultado de la busqueda']
  }
});

module.exports = mongoose.model('cambridge', cambridgeSchema);