import React from "react";
import { Route } from "react-router-dom";
import BookNote from '../components/user/BookNote';
import BookNoteList from '../components/user/BookNoteList';
import UserBookList from '../components/user/UserBookList';
import BookDetail from '../components/user/BookDetail';
import MyReviewList from '../components/user/MyReviewList';

function UserRoutes(){
    return(
        <>
            <Route path="/user/BookNote" element={<BookNote />} />
            <Route path="/user/BookNoteList" element={<BookNoteList />} />
            <Route path="/user/UserBookList" element={<UserBookList />} />
            <Route path="/user/BookDetail" element={<BookDetail />} />
            <Route path="/user/MyReviewList" element={<MyReviewList />} />
        </>
    )
}

export default UserRoutes;