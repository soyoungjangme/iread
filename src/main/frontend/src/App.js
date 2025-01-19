import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main.js';
import RegistSearchBook from './components/admin/RegistSearchBook.js';
import BookList from './components/admin/BookList.js';

function App() {

  return (
    <Router basename="/iread">
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/admin/RegistSearchBook" element={<RegistSearchBook />} />
        <Route path="/admin/BookList" element={<BookList />} />
      </Routes>
    </Router>
);
}

export default App;


