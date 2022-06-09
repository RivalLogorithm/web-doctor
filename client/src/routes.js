import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {ServicesPage} from "./pages/ServicesPage";
import {AboutPage} from "./pages/AboutPage";
import {AuthPage} from "./pages/AuthPage";
import {ClinicsPage} from "./pages/ClinicsPage";
import {DoctorsPage} from "./pages/DoctorsPage";
import {ChangePasswordPage} from "./pages/ChangePasswordPage";
import {DeleteUserPage} from "./pages/DeleteUserPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/services" exact element={<ServicesPage/>}/>
                <Route path="/about" exact element={<AboutPage/>}/>
                <Route path="/changepass" exact element={<ChangePasswordPage/>}/>
                <Route path="/deleteuser" exact element={<DeleteUserPage/>}/>
                <Route path="*" exact element={<Navigate to="/services"/>}/>
                <Route path={"/services/:href"} exact element={<ClinicsPage/>}/>
                <Route path={"/services/:href/:id"} exact element={<DoctorsPage/>}/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path="/" exact element={<AuthPage/>}/>
            <Route path="*" exact element={<Navigate to="/"/>}/>
        </Routes>
    )
}