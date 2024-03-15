import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Context } from "../includes/GlobalState";
import { setCookie, getCookie } from '../includes/Functions'
import axios from 'axios'
import Footer from '../includes/Footer'

const Login = () =>
{
    const navigate = useNavigate();
    const [ stateLocal, setStateLocal ] = useState({
        input_email: '',
            input_password: '',
            error_login: '',
            proses_login: false
    })
    const [ stateGlobal ] = useContext(Context)

    const get_login = getCookie('user_login');

    if (get_login !== '')
        navigate('/')

    else
    {
        document.title = 'Masuk | ' + stateGlobal.title_web

        const submitLogin = (e) =>
        {
            e.preventDefault()
            const input_email = stateLocal.input_email
            const input_password = stateLocal.input_password

            setStateLocal(prevState => ({
                ...prevState,
                error_login: '', 
                proses_login: true
            }))

            axios({
                url: `${stateGlobal.url_api}/pengguna`,
                method: 'GET',
            })
            .then(data =>
            {
                setStateLocal(prevState => ({
                    ...prevState,
                    proses_login: false
                }))
    
                const response = data.data
                const get_data_user = response.find(function(value)
                {
                    return (value.email === input_email && value.password === input_password)
                });
    
                if (get_data_user !== undefined)
                {
                    setCookie('user_login', get_data_user.id, 30, '/', stateGlobal.domain_api, true);
                    navigate('/')
                }
                else
                {
                    setStateLocal(prevState => ({
                        ...prevState,
                        error_login: 'Email atau Katasandi tidak dapat ditemukan.'
                    }))
                }
            })
            .catch(error => 
            {
                alert(`Terjadi kesalahan saat logi. (Error: ${error.message})`)
                console.log('Error login:', error)
    
                setStateLocal(prevState => ({
                    ...prevState,
                    proses_login: false
                }))
            })
        }

        return(
            <>
                <div className="box-login">
                    <div className="title mb-5">
                        <h3>Masuk</h3>
                        <p className="text-muted">Silakan masuk untuk melanjutkan ke akun Anda.</p>
                    </div>
                    <form method="post" onSubmit={(e) => submitLogin(e)}>
                        {
                            stateLocal.error_login !== '' ? (
                                <div className="alert alert-danger">
                                    {stateLocal.error_login}
                                </div>
                            ) : ''
                        }

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" placeholder="Email" className="form-control" onChange={(e) => setStateLocal(prevState => ({
                                ...prevState,
                                input_email: e.target.value
                            }))} disabled={stateLocal.proses_login}/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Kata Sandi</label>
                            <input type="password" id="password" placeholder="Kata Sandi" className="form-control" onChange={(e) => setStateLocal(prevState => ({
                                ...prevState,
                                input_password: e.target.value
                            }))} disabled={stateLocal.proses_login} />
                        </div>

                        <div className="d-grid mb-4">
                            <button className="btn btn-primary btn-lg">Masuk</button>
                        </div>

                        <div className="text-center my-3">
                            <p>Belum punya akun? <Link to="/register">Buat akun</Link></p>
                        </div>

                        <div className="text-center">
                            <Link to="/">&laquo; Kembali</Link>
                        </div>
                    </form>
                </div>

                <Footer/>
            </>
        )
    }
}

export default Login