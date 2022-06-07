import React from 'react'
import {NavLink} from "react-router-dom";

export const ServicesList = ({services}) => {
    if (!services.length) {
        return <h4 className="center">Услуг пока нет</h4>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Cпециалист</th>
                <th>Цена от</th>
            </tr>
            </thead>

            <tbody>
            {services.map((service) => {
                return (
                    <tr key={service._id}>
                        <td>
                            <NavLink to={`${service.href}`}>{service.specialist}</NavLink>
                        </td>
                        <td>{service.price_from}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}