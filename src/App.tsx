import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Auth from "./pages/Auth";
import Posts from "./pages/Posts";

import { getCookie } from "./helpers/cookies";

import './App.css';

const App = () => {

    const token = getCookie('sl_token')

    const isAuth = () => typeof token !== 'undefined' ? <Posts /> : <Navigate to="/auth" />

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={ isAuth() }
                    />
                    <Route
                        path="/auth"
                        element={ <Auth /> }
                    />
                    <Route
                        path="/posts"
                        element={ isAuth() }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
