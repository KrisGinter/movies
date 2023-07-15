import React, {useEffect, useState } from 'react';
import logo from './logo.svg';
import {
    HashRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Outlet
} from 'react-router-dom';
import './App.css';
import Home from "./Components/Pages/Home/Home";
import Search from "./Components/Pages/Search/Search";
import Favourites from "./Components/Pages/Favourites/Favourites";
import Contact from "./Components/Pages/Contact/Contact";

const App = () => {
    return (
        <>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </HashRouter>
        </>
    );

}

export default App;
