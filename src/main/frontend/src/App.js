import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main.js';
import RegistBookSearch from './components/admin/RegistBookSearch.js';

function App() {

  return (
    <Router basename="/iread">
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/admin/RegistBookSearch" element={<RegistBookSearch />} />
      </Routes>
    </Router>
);
}

export default App;


