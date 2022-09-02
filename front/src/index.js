import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ReactDom from 'react-dom/client';
import FrontHome from './frontstage/index';
import BackHome from './backstage/index';

function Main () {
    return <Router>
        <Routes>
            <Route path='/' element={<FrontHome/>} />
            <Route path='/backstage' element={<BackHome/>} />
        </Routes>
    </Router>
}

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(<Main/>)