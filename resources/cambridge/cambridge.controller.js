const Cambridge = require('./cambridge.model');

function crearWordCambridge(schema) {
  return new Cambridge(schema).save();
}

function obtenerWordsCambridge() {
  return Cambridge.find({});
}

function obtenerWordCambridge(id) {
  return Cambridge.findById(id);
}

function buscarWordCambridge(text,query) {
  return Cambridge.find({"word": text},{},query,function(err,  data) {
    if(err) {
      response = {
        "error": true,
        "message": "Error fetching data"  
      };
    } else {
      response = {
        "error": false,
        "message": data,
      };
    }
  })
}

function modificarWordCambridge(id, Cambridge) {
  return Cambridge.findOneAndUpdate({ _id: id}, {
    ...Cambridge
  }, { new: true });
}

function eliminarWordCambridge(id) {
  return Cambridge.findOneAndDelete(id);
}

module.exports = {
  crearWordCambridge,
  obtenerWordsCambridge,
  obtenerWordCambridge,
  modificarWordCambridge,
  eliminarWordCambridge,
  buscarWordCambridge,
}