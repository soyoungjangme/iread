import React from "react";
import { Route } from "react-router-dom";
import BookNote from '../components/user/BookNote';
import BookNoteList from '../components/user/BookNoteList';
import PerPage from '../components/user/PerPage';
import BookNoteReview from '../components/user/BookNoteReview';

function UserRoutes(){
    return(
        <>
            <Route path="/user/BookNote" element={<BookNote />} />
    <Route path="/user/BookNoteList" element={<BookNoteList />} />
    <Route path="/user/BookNoteReview" element={<BookNoteReview />} />
        </>
    )
}

export default UserRoutes;