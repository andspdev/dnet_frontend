import React, { useState } from "react";
import { GlobalState, Context } from './components/includes/GlobalState';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from "./components/pages/Home";

const App = () =>
{
    const [state, setState] = useState(GlobalState);

    return (
        <Context.Provider value={[state, setState]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App;