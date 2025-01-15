import React from 'react';
import ReactDOM from 'react-dom/client';

function Main() {
    return(
        <div>
            <p>메인.js</p>
        </div>
    );
}

const root = ReactDom.createRoot(Document.getElemenById('root'));
root.render(
    <Main/>
);