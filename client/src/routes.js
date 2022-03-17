import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {ServicesPage} from "./pages/ServicesPage";
import {AboutPage} from "./pages/AboutPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/services" exact element={<ServicesPage/>}/>
                <Route path="/about" exact element={<AboutPage/>}/>
                <Route path="*" exact element={<Navigate to="/services"/>}/>
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