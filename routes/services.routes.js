const {Router} = require('express')
const Services = require('../models/Services')
const router = Router()

const docRouter = Router({mergeParams: true});
router.use('/services/:href', docRouter);

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

router.get(
    '/services/:href',
    async (req, res) => {
        try {
            const services = await Services.find({href: req.params.href})
            res.json(services)
        }catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

docRouter.get(
    '/:id',
    async (req,res) => {
        try {
            const services = await Services.find({href:req.params.href},
                {clinic: {$elemMatch: {id: Number(req.params.id)}}})
            console.log(services)
            res.json(services)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router

