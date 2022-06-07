import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {ClinicsList} from "../components/ClinicsList";
import {Loader} from "../components/Loader";

export const ClinicsPage = () => {
    const [clinics, setClinics] = useState([])
    const {request, loading} = useHttp()
    const serviceHref = useParams().href

    const getClinics = useCallback(async () => {
        try {
            const fetched = await request(`/api/data/services/${serviceHref}`, 'GET', null)
            setClinics(fetched)
        }catch (e) {
        }
    }, [request, serviceHref])

    useEffect(() => {
        getClinics()
    }, [getClinics])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <ClinicsList clinics={clinics}/>}
        </>
    )
}