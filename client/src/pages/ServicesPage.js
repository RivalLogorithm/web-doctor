import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {ServicesList} from "../components/ServicesList";
import {Loader} from "../components/Loader";

export const ServicesPage = () => {
    const [services, setServices] = useState([])
    const {request, loading} = useHttp()

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

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading &&<ServicesList services={services}/>}
        </>
    )
}