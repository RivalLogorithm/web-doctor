import React from "react";

export const DoctorsList = ({doctors}) => {
    if (!doctors.length) {
        return <h4 className="center">Нет доступных клиник</h4>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Врач</th>
                <th>Цена от</th>
            </tr>
            </thead>

            <tbody>
            {doctors[0].clinic[0].doctor.map((doc) => {
                return (
                    <tr>
                        <td>{doc.fio}</td>
                        <td>{doc.price}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}