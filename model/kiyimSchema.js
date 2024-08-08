const {Schema, model} = require('mongoose')

const kiyimShema = new Schema({
     title: {type: String},
     model:{type: String},
     desc:{type: String},
     color:{type: String},
     image:{ type: String}

})

const Kiyim = model('kiyim',kiyimShema);
module.exports = Kiyim;