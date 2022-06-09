const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные для регистрации"
                })
            }
            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    })

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Такого пользователя не существует'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    })

router.put(
    "/changepass",
    check('password', 'Минимальная длина пароля 6 символов')
        .isLength({min: 6}),
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные для пароля"
                })
            }

            const {id, password} = req.body

            const currentUser = await User.findById(id)
            const isMatch = await bcrypt.compare(password, currentUser.password)

            if (isMatch) {
                return res.status(400).json({message: 'Пароли не должны совпадать'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = await User.findByIdAndUpdate(id, {password: hashedPassword})
            res.status(201).json({message: 'Пароль успешно изменен, повторите вход'})
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    })

router.delete(
    '/deleteuser',
    async (req, res) => {
        try {
            const {id, password} = req.body

            const currentUser = await User.findById(id)
            const isMatch = await bcrypt.compare(password, currentUser.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Пароль неверный'})
            }

            const user = await User.findByIdAndDelete(id)
            res.status(201).json({message: "Аккаунт был успешно удален"})
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    })

module.exports = router