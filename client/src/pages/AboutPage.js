import React, {useContext} from "react";
import {NavLink} from "react-router-dom";

export const AboutPage = () => {
    return (
        <div>
            <h1>О проекте</h1>
            <h4>Приложение для отслеживания цен на медицинские услуги</h4>
            Программа выполнена в соответствии с заданием по дисциплине «Управление информационно-технологической
            инфраструктурой и архитектурой»
            <p>
                <NavLink to="/changepass" className="waves-effect waves-light btn">Сменить пароль</NavLink>
            </p>
            <p>
                <NavLink to="/deleteuser" className="waves-effect red btn">Удалить профиль</NavLink>
            </p>
        </div>
    )
}