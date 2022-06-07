import React from 'react'
import {NavLink} from "react-router-dom";

export const ClinicsList = ({clinics}) => {
    if (!clinics.length) {
        return <h4 className="center">Нет доступных клиник</h4>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Клиника</th>
                <th>Цена от</th>
            </tr>
            </thead>

            <tbody>
            {clinics[0].clinic.map((clin) => {
                const minPrice = Math.min(...clin.doctor.map(({price}) => price))
                const cheapeastDoctor = clin.doctor.find(({price}) => minPrice === price)
                return (
                    <tr>
                        <td>
                            <NavLink to={`${clin.id}`}>{clin.name}</NavLink>
                        </td>
                        <td>{cheapeastDoctor.price}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}