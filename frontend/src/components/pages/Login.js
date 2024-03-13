import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Context } from "../includes/GlobalState";

class Login extends Component
{
    static contextType = Context;

    componentDidMount()
    {
        const [getState] = this.context;
        document.title = 'Masuk | ' + getState.title_web
    }

    submitLogin(e) {
        e.preventDefault()
    }

    render()
    {
        const [getState] = this.context;

        return(
            <div className="box-login">
                <div className="title mb-5">
                    <h3>Masuk</h3>
                    <p className="text-muted">Silakan masuk untuk melanjutkan ke akun Anda.</p>
                </div>
                <form method="post" onSubmit={(e) => this.submitLogin(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" placeholder="Email" className="form-control"/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" placeholder="Password" className="form-control"/>
                    </div>

                    <div className="d-grid mb-4">
                        <button className="btn btn-primary btn-lg">Masuk</button>
                    </div>

                    <div className="text-center">
                        <Link to="/">&laquo; Kembali</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login