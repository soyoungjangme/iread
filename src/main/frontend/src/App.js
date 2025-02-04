import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AppRoutes/AdminRoutes";
import UserRoutes from "./AppRoutes/UserRoutes";

function App() {
    return (
        <Router basename="/iread">
            <Routes>
                {/* 관리자 페이지 라우트 */}
                {AdminRoutes()}

                {/* 유저 페이지 라우트 */}
                {UserRoutes()}
            </Routes>
        </Router>
    );
}

export default App;
