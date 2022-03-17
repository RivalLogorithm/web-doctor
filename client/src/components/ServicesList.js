import React from 'react'

export const ServicesList = ({services}) => {
    if (!services.length) {
        return <h4 className="center">Услуг пока нет</h4>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Цена</th>
                <th>Клиника</th>
                <th>Доктор</th>
            </tr>
            </thead>

            <tbody>
            {services.map((service) => {
                return (
                    <tr key={service._id}>
                        <td>{service.name}</td>
                        <td>{service.price}</td>
                        <td>{service.clinic}</td>
                        <td>{service.doctor}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}