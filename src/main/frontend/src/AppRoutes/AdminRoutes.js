import React from "react";
import { Route } from "react-router-dom";
import Main from "../components/Main";
import RegistSearchBook from "../components/admin/RegistSearchBook";
import RegistWriteBook from "../components/admin/RegistWriteBook";
import BookList from "../components/admin/BookList";
import GenreManage from "../components/admin/GenreManage";

function AdminRoutes() {
    return (
        <>
            <Route path="/main" element={<Main />} />
            <Route path="/admin/BookList" element={<BookList />} />
            <Route path="/admin/RegistWriteBook" element={<RegistWriteBook />} />
            <Route path="/admin/RegistSearchBook" element={<RegistSearchBook />} />
            <Route path="/admin/GenreManage" element={<GenreManage />} />
        </>
    );
}

export default AdminRoutes;
