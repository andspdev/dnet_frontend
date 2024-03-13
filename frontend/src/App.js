import React, { useState } from "react";
import { GlobalState, Context } from './components/includes/GlobalState';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import DetailPaket from "./components/pages/DetailPaket";

const App = () =>
{
    const [state, setState] = useState(GlobalState);

    const PaketDataWrapper = () => 
    {
        let { id } = useParams();
        return <DetailPaket id={id} />
    }

    return (
        <Context.Provider value={[state, setState]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/paket-data/:id" element={<PaketDataWrapper/>} />                    
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App;