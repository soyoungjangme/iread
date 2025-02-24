import React from "react";
import { Route } from "react-router-dom";
import BookNote from '../components/user/BookNote';
import BookNoteList from '../components/user/BookNoteList';
import UserBookList from '../components/user/UserBookList';


function UserRoutes(){
    return(
        <>
            <Route path="/user/BookNote" element={<BookNote />} />
            <Route path="/user/BookNoteList" element={<BookNoteList />} />
            <Route path="/user/UserBookList" element={<UserBookList />} />
        </>
    )
}

export default UserRoutes;