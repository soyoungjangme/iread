import React from "react";
import { Route } from "react-router-dom";
import Main from "../components/Main";
import RegistSearchBook from "../components/admin/RegistSearchBook";
import RegistWriteBook from "../components/admin/RegistWriteBook";
import AdminBookList from "../components/admin/AdminBookList";
import GenreManage from "../components/admin/GenreManage";
import UserManage from "../components/admin/UserManage";
import ComplaintManage from "../components/admin/ComplaintManage";

function AdminRoutes() {
    return (
        <>
            <Route path="/main" element={<Main />} />
            <Route path="/admin/AdminBookList" element={<AdminBookList />} />
            <Route path="/admin/RegistWriteBook" element={<RegistWriteBook />} />
            <Route path="/admin/RegistSearchBook" element={<RegistSearchBook />} />
            <Route path="/admin/GenreManage" element={<GenreManage />} />
            <Route path="/admin/UserManage" element={<UserManage />} />
            <Route path="/admin/ComplaintManage" element={<ComplaintManage />} />
        </>
    );
}

export default AdminRoutes;
