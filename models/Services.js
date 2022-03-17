const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    serviceName: {type: String, required: true},
    clinic: {type: String, required: true},
    price: {type: String, required: true},
    doctor: {type: String, required: true}
})

module.exports = model('Service', schema)