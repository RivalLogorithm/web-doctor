import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {DoctorsList} from "../components/DoctorsList";
import {Loader} from "../components/Loader";

export const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([])
    const {request, loading} = useHttp()
    const clinicHref = useParams().href
    const doctorHref = useParams().id
    const url = `/api/data/services/${clinicHref}/${doctorHref}`
    const getDoctors = useCallback(async () => {
        try {
            const fetched = await request(url, 'GET', null)
            setDoctors(fetched)
        }catch (e){
        }
    }, [request, clinicHref, doctorHref])

    useEffect(() => {
        getDoctors()
    }, [getDoctors])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <DoctorsList doctors={doctors}/>}
        </>
    )
}