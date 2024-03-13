import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Context } from "../includes/GlobalState";
import { setCookie, getCookie } from '../includes/Functions'
import axios from 'axios'

class Login extends Component
{
    static contextType = Context;

    constructor(props)
    {
        super(props)

        this.state = {
            input_email: '',
            input_password: '',
            error_login: '',
            proses_login: false
        }

        this.submitLogin.bind(this)
    }

    componentDidMount()
    {
        const [getState] = this.context;
        const get_login = getCookie('user_login');

        if (get_login !== '')
            window.location.href = '/'

        document.title = 'Masuk | ' + getState.title_web
    }

    submitLogin(e) 
    {
        e.preventDefault()

        const [getState] = this.context
        const input_email = this.state.input_email
        const input_password = this.state.input_password

        this.setState({ error_login: '', proses_login: true})

        axios({
            url: `${getState.url_api}/pengguna`,
            method: 'GET',
        })
        .then(data =>
        {
            this.setState({ proses_login: false })

            const response = data.data
            const get_data_user = response.find(function(value)
            {
                return (value.email === input_email && value.password === input_password)
            });

            if (get_data_user !== undefined)
            {
                setCookie('user_login', get_data_user.id, 30, '/', 'localhost', true);
                window.location.href = "/"
            }
            else
            {
                this.setState({
                    error_login: 'Email atau Katasandi tidak dapat ditemukan.'
                });
            }
        })
        .catch(error => 
        {
            alert(`Terjadi kesalahan saat logi. (Error: ${error.message})`)
            console.log('Error login:', error)

            this.setState({
                proses_login: false
            })
        })
    }

    render()
    {
        return(
            <div className="box-login">
                <div className="title mb-5">
                    <h3>Masuk</h3>
                    <p className="text-muted">Silakan masuk untuk melanjutkan ke akun Anda.</p>
                </div>
                <form method="post" onSubmit={(e) => this.submitLogin(e)}>
                    {
                        this.state.error_login !== '' ? (
                            <div className="alert alert-danger">
                                {this.state.error_login}
                            </div>
                        ) : ''
                    }

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" placeholder="Email" className="form-control" onChange={(e) => this.setState({
                            input_email: e.target.value
                        })} disabled={this.state.proses_login}/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" placeholder="Password" className="form-control" onChange={(e) => this.setState({
                            input_password: e.target.value
                        })} disabled={this.state.proses_login} />
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