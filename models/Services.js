const {Schema, model} = require('mongoose')

const schema = new Schema({
    href: {type: String, required: true},
    specialist: {type: String, required: true},
    price_from: {type: Number, required: true},
    clinic: {type: Array, required: true}
})

module.exports = model('Service', schema)