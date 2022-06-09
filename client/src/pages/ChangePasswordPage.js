import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const ChangePasswordPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        id: auth.userId,
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changePasswordHandler = async () => {
        try {
            const data = await request('/api/auth/changepass', 'PUT', {...form})
            auth.logout()
            message(data.message)
        } catch (e) {
        }
    }

    return (
        <div className="row">
            <div>
                <h4>Смена пароля</h4>
                <div className="input-field waves-effect blue">
                    <input
                        placeholder="Введите новый пароль"
                        id="password"
                        type="password"
                        name="password"
                        className="black-input"
                        onChange={changeHandler}
                        size={128}
                    />
                </div>
                <div>
                    <button
                        className="btn yellow darken-4"
                        onClick={changePasswordHandler}
                        style={{marginRight: 10}}
                        disabled={loading}
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    )
}