import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Context } from "../includes/GlobalState";
import { getCookie } from '../includes/Functions'
import axios from 'axios'

const Daftar = () =>
{
    const navigate = useNavigate()
    const get_user = getCookie('user_login')
    const [ stateGlobal ] = useContext(Context)
    const [ stateLocal, setStateLocal ] = useState({
        proses_register: false,
        error_msg: '',
        input_email: '',
        input_password: '',
        input_confirm: ''
    })

    if (get_user !== '')
        navigate('/')

    else
    {
        document.title = 'Daftar | '+ stateGlobal.title_web

        return (
            <div className="box-login">
                <div className="title mb-5">
                    <h3>Daftar</h3>
                    <p className="text-muted">Daftar dan buat akun kamu secara gratis disini.</p>
                </div>

                <form method="post">
                    <div className="mb-3">
                        <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
                        <input type="text" id="nama_lengkap" placeholder="Nama Lengkap" className="form-control" disabled={stateLocal.proses_register}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" placeholder="Email" className="form-control" disabled={stateLocal.proses_register}/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Kata Sandi</label>
                        <input type="password" id="password" placeholder="Kata Sandi" className="form-control" disabled={stateLocal.proses_register} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="konfirmasi_password" className="form-label">Konfirmasi Sandi</label>
                        <input type="password" id="konfirmasi_password" placeholder="Konfirmasi Sandi" className="form-control" disabled={stateLocal.proses_register} />
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
        )
    }
}

export default Daftar