const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const Services = require('../models/Services')
const router = Router()

router.get(
    '/services',
    async (req, res) => {
        try {
            const services = await Services.find()
            res.json(services)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })
module.exports = router

