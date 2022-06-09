import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const DeleteUserPage = () => {
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

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const deleteUserHandler = async () => {
        try {
            const data = await request('/api/auth/deleteuser', 'DELETE', {...form})
            auth.logout()
            message(data.message)
        } catch (e) {
        }
    }

    return (
        <div className="row">
            <div>
                <h5>Для подтверждения удаления профиля введите пароль</h5>
                <div className="input-field waves-effect blue">
                    <input
                        placeholder="Введите пароль"
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
                        onClick={deleteUserHandler}
                        style={{marginRight: 10}}
                        disabled={loading}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}