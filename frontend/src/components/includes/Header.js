import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () =>
{
    return(
        <nav className='navbar navbar-expand-lg navbar-custom'>
            <div className='container-fluid'>
                <Link to="/" className='navbar-brand'>Logo</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/">Beranda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to='/login'>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}