import React from "react";
import { Route } from "react-router-dom";
import BookNote from '../components/user/BookNote';
import BookNoteList from '../components/user/BookNoteList';
import PerPage from '../components/user/PerPage';

function UserRoutes(){
    return(
        <>
            <Route path="/user/BookNote" element={<BookNote />} />
            <Route path="/user/BookNoteList" element={<BookNoteList />} />
            <Route path="/user/PerPage" element={<PerPage />} />
        </>
    )
}

export default UserRoutes;