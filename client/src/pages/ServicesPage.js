import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {ServicesList} from "../components/ServicesList";

export const ServicesPage = () => {
    const [services, setServices] = useState([])
    const {request} = useHttp()

    const fetchServices = useCallback(async () => {
        try {
            const fetched = await request('/api/data/services', 'GET', null)
            setServices(fetched)
        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        fetchServices()
    }, [fetchServices])
    return (
        <div>
            <ServicesList services={services}/>
        </div>
    )
}