import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ReactDom from 'react-dom/client';
import Home from './pages/home.js'
import Backstage from './pages/backstage.js'

function Main () {
    return <Router>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/backstage' element={<Backstage/>} />
        </Routes>
    </Router>
}

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(<Main/>)