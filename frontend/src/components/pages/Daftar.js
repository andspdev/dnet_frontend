import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Context } from "../includes/GlobalState";
import { getCookie } from '../includes/Functions'
import axios from 'axios'
import Footer from "../includes/Footer";

const Daftar = () =>
{
    const navigate = useNavigate()
    const get_user = getCookie('user_login')
    const [ stateGlobal ] = useContext(Context)
    const [ stateLocal, setStateLocal ] = useState({
        proses_register: false,
        error_msg: '',
        input_nama: '',
        input_email: '',
        input_password: '',
        input_confirm: '',
        email_already: false
    })

    if (get_user !== '')
        navigate('/')

    else
    {
        document.title = 'Daftar | '+ stateGlobal.title_web
        
        const setErrorMessage = (message) =>
        {
            setStateLocal(prevState => ({
                ...prevState,
                error_msg: message
            }))
        }

        const submitForm = (e) =>
        {
            e.preventDefault()

            const input_nama = stateLocal.input_nama.trim()
            const input_email = stateLocal.input_email.trim()
            const input_password = stateLocal.input_password
            const input_confirm = stateLocal.input_confirm

            if (!(/^[a-zA-Z\s]+$/.test(input_nama)) || input_nama === '')
                setErrorMessage('Nama lengkap tidak valid.')

            else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input_email)))
                setErrorMessage('Email tidak valid.')

            else if (!(/^.{6,}$/.test(input_password)))
                setErrorMessage('Kata sandi minimal 6 karakter.')

            else if (input_confirm !== input_password)
                setErrorMessage('Konfirmasi kata sandi tidak sama.')

            else
            {
                if (stateLocal.email_already)
                    setErrorMessage('Email telah digunakan oleh pengguna lain.')

                else
                {
                    axios({
                        url: `${stateGlobal.url_api}/pengguna`,
                        method: 'POST',
                        data: {
                            "nama": input_nama,
                            "email": input_email,
                            "password": input_password,
                            "bergabung_pada": new Date().getTime()
                        }
                    })
                    .then(data => {
                        const response = data.data;
                        
                        if (response !== undefined || response !== '')
                            navigate('/login')
                    })
                    .catch(error => {
                        alert(`Terjadi kesalahan saat daftar akun. (Error: ${error.message})`)
                        console.log('Error Daftar Akun: ', error);
                    });
                }
            }
        }

        return (
            <>
                <div className="box-login">
                    <div className="title mb-5">
                        <h3>Daftar</h3>
                        <p className="text-muted">Daftar dan buat akun kamu secara gratis disini.</p>
                    </div>

                    <form method="post" onSubmit={(e) => submitForm(e)}>
                        {stateLocal.error_msg !== '' ? (
                            <div className="alert alert-danger">
                                {stateLocal.error_msg}
                            </div>
                        ) : ''}

                        <div className="mb-3">
                            <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
                            <input type="text" id="nama_lengkap" placeholder="Nama Lengkap" className="form-control" disabled={stateLocal.proses_register}
                            onChange={(e) => setStateLocal(prevState => ({
                                ...prevState,
                                input_nama: e.target.value
                            }))}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" placeholder="Email" className="form-control" disabled={stateLocal.proses_register}
                            onChange={(e) => setStateLocal(prevState => ({
                                ...prevState,
                                input_email: e.target.value
                            }))}/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Kata Sandi</label>
                            <input type="password" id="password" placeholder="Kata Sandi" className="form-control" disabled={stateLocal.proses_register}
                            onChange={(e) => setStateLocal(prevState => ({
                                ...prevState,
                                input_password: e.target.value
                            }))}/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="konfirmasi_password" className="form-label">Konfirmasi Sandi</label>
                            <input type="password" id="konfirmasi_password" placeholder="Konfirmasi Sandi" className="form-control" disabled={stateLocal.proses_register}
                            onChange={(e) => setStateLocal(prevState => ({
                                ...prevState,
                                input_confirm: e.target.value
                            }))} />
                        </div>

                        <div className="d-grid mb-4">
                            <button className="btn btn-primary btn-lg">Daftar</button>
                        </div>

                        <div className="text-center my-3">
                            <p>Sudah punya akun? <Link to="/login">Masuk</Link></p>
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

export default Daftar