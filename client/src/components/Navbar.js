import React, {useContext} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import logo from './logo.png'

export const Navbar = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo">
                    <img
                        src={logo}
                        height="30"
                        width="30"
                        alt="Logo"
                    />{' '}
                    Web Doctor</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/services" style={{marginLeft: 20}}>Услуги</NavLink></li>
                    <li><NavLink to="/about">О проекте</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}