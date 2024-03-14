import React, { useState } from "react";
import { GlobalState, Context } from './components/includes/GlobalState';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import DetailPaket from "./components/pages/DetailPaket";
import Logout from "./components/pages/Logout";
import TransaksiSaya from "./components/pages/TransaksiSaya";
import LihatTransaksi from "./components/pages/LihatTransaksi";
import Daftar from "./components/pages/Daftar";

const App = () =>
{
    const [state, setState] = useState(GlobalState);

    return (
        <Context.Provider value={[state, setState]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Daftar/>} />
                    <Route path="/paket-data/:id" element={<DetailPaket/>} /> 
                    <Route path="/transaksi" element={<TransaksiSaya/>} />
                    <Route path="/transaksi/:id" element={<LihatTransaksi/>} />
                    <Route path="/logout" element={<Logout/>} /> 
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App;