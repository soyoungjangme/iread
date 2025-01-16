import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main.js';
import BookRegist from './components/admin/BookRegist.js';

function App() {

  return (
    <Router basename="/iread">
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/admin/BookRegist" element={<BookRegist />} />
      </Routes>
    </Router>
);
}

export default App;


