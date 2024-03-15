import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from "../includes/GlobalState";
import Header from "../includes/Header";
import { Link, useNavigate } from 'react-router-dom';
import ImageLoader from '../../assets/images/loader.svg'
import axios from 'axios'
import { getCookie } from '../includes/Functions';
import Footer from '../includes/Footer';

const SettingsProfile = () =>
{
    const navigate = useNavigate()
    const [ stateLocal, setStateLocal ] = useState({
        is_load_profil: true,
        proses_simpan: false,
        fetch_profil: '',

        input_nama: '',
        input_email: '',

        input_sandi_baru: '',
        input_konfirmasi_sandi: '',
        input_sandi_simpan: '',

        error_msg: '',
        success_msg: ''
    })

    const refFormEdit = useRef()
    const [ stateGlobal ] = useContext(Context)
    const get_user = getCookie('user_login')
    
    useEffect(() =>
    {
        document.title = 'Sunting Akun | ' + stateGlobal.title_web

        if (get_user === '')
        {
            navigate('/login')
        }
        else
        {
            axios({
                url: `${stateGlobal.url_api}/pengguna/${get_user}`,
                method: 'GET'
            })
            .then(data => {
                const response = data.data

                setStateLocal(prevState => ({
                    ...prevState,
                    is_load_profil: false,
                    fetch_profil: response,

                    input_nama: response.nama,
                    input_email: response.email,
                }))
            })
            .catch(error => {
                alert(`Terjadi kesalahan saat mengambil data pengguna. (Error: ${error.message})`)
                console.log('Error Fetch Pengguna: ', error)
            })
        }
    }, [navigate, stateGlobal.url_api, stateGlobal.title_web, get_user]);


    const setErrorMessage = (message) =>
    {
        setStateLocal(prevState => ({
            ...prevState,
            error_msg: message
        }))
    }


    const simpanAkun = (e) =>
    {
        e.preventDefault()

        const fetch_akun = stateLocal.fetch_profil
        const sandi_lama = fetch_akun.password
        const input_nama = stateLocal.input_nama.trim()
        const input_email = stateLocal.input_email.trim()
        const input_sandi_baru = stateLocal.input_sandi_baru
        const input_sandi_simpan = stateLocal.input_sandi_simpan
        const input_konfirmasi_sandi = stateLocal.input_konfirmasi_sandi

        if (!(/^[a-zA-Z\s]+$/.test(input_nama)) || input_nama === '')
            setErrorMessage('Nama lengkap tidak valid.')

        else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input_email)))
            setErrorMessage('Email tidak valid.')

        else if (input_sandi_baru !== '' && !(/^.{6,}$/.test(input_sandi_baru)))
            setErrorMessage('Kata sandi minimal 6 karakter.')

        else if (input_sandi_baru !== '' && (input_konfirmasi_sandi !== input_sandi_baru))
            setErrorMessage('Konfirmasi kata sandi tidak sama.')

        else if (input_sandi_baru !== '' && (input_sandi_baru === sandi_lama))
            setErrorMessage('Kata sandi baru tidak boleh sama dengan kata sandi lama.')

        else if (input_sandi_simpan !== sandi_lama)
            setErrorMessage('Kata sandi simpan salah.')
        else
        {
            setErrorMessage('')

            setStateLocal(prevState => ({
                ...prevState,
                proses_simpan: true
            }))

            fetch_akun.nama = input_nama
            fetch_akun.email = input_email
            fetch_akun.password = input_sandi_baru !== '' ? input_sandi_baru : fetch_akun.password

            axios({
                url: `${stateGlobal.url_api}/pengguna/${get_user}`,
                method: 'PUT',
                data: fetch_akun
            })
            .then(() =>
            {
                setStateLocal(prevState => ({
                    ...prevState,
                    proses_simpan: false,
                    success_msg: 'Berhasil menyimpan informasi akun Anda.',
                    input_sandi_baru: '',
                    input_konfirmasi_sandi: '',
                    input_sandi_simpan: ''
                }))

                setTimeout(() =>
                {
                    setStateLocal(prevState => ({
                        ...prevState,
                        success_msg: ''
                    }))

                }, 1500)

                refFormEdit.current.reset()
            })
            .catch(error =>
            {
                alert(`Terjadi kesalahan saat menyimpan akun. (Error: ${error.message})`)
                console.log('Error Simpan Akun: ', error)

                setStateLocal(prevState => ({
                    ...prevState,
                    proses_simpan: false
                }))
            });
        }
    }


    return (
        <>
            {stateLocal.is_load_profil ? (
                <div className='loader-full'>
                    <img src={ImageLoader} alt="Loader"/>
                </div>
            ): (
                <>
                    <Header/>

                    <div className='container my-4 me-auto' style={{maxWidth: '1000px', padding: '20px'}}>
                        <h3>Sunting Akun</h3>
                        <p>Anda dapat mengubah informasi dan kata sandi pada halaman ini.</p>

                        {
                            stateLocal.error_msg !== '' ? (
                                <div className='alert alert-danger'>
                                    {stateLocal.error_msg}
                                </div>
                            ) : stateLocal.success_msg !== '' ? (
                                <div className='alert alert-success mt-3'>
                                    {stateLocal.success_msg}
                                </div>
                            ) : ''
                        }

                        <form method='POST' onSubmit={(e) => simpanAkun(e)} ref={refFormEdit}>
                            <div className='row mt-5'>
                                <div className='col-md-6 mb-3'>
                                    <b>Informasi Akun</b>
                                    <p className='text-muted'>Ubah informasi akun Anda dan simpan.</p>

                                    <div className='mt-4'>
                                        <div className='mb-3'>
                                            <label htmlFor='nama' className='form-label'>Nama Lengkap <span className='text-danger'>*</span></label>
                                            <input type='text' className='form-control' placeholder='Nama Lengkap' defaultValue={stateLocal.fetch_profil.nama}
                                            onChange={(e) => setStateLocal(prevState => ({
                                                ...prevState,
                                                input_nama: e.target.value
                                            }))} disabled={stateLocal.proses_simpan} />
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='email' className='form-label'>Email <span className='text-danger'>*</span></label>
                                            <input type='email' id="email" className='form-control' placeholder='Alamat Email' defaultValue={stateLocal.fetch_profil.email} 
                                            onChange={(e) => setStateLocal(prevState => ({
                                                ...prevState,
                                                input_email: e.target.value
                                            }))} disabled={stateLocal.proses_simpan} />
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <b>Ubah Kata Sandi</b>
                                    <p className='text-muted'>Isi form kata sandi untuk merubah kata sandi Anda.</p>

                                    <div className='mt-4'>
                                        <div className='mb-3'>
                                            <label htmlFor='sandi_baru' className='form-label'>Kata Sandi Baru <span className='text-danger'>*</span></label>
                                            <input type='password' id="sandi_baru" className='form-control' placeholder='Kata Sandi Baru'
                                            onChange={(e) => setStateLocal(prevState => ({
                                                ...prevState,
                                                input_sandi_baru: e.target.value
                                            }))} disabled={stateLocal.proses_simpan} />
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor='konfirmasi_sandi' className='form-label'>Konfirmasi Kata Sandi <span className='text-danger'>*</span></label>
                                            <input type='password' id="konfirmasi_sandi" className='form-control' placeholder='Konfirmasi Sandi'
                                            onChange={(e) => setStateLocal(prevState => ({
                                                ...prevState,
                                                input_konfirmasi_sandi: e.target.value
                                            }))} disabled={stateLocal.proses_simpan} />
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-12'>
                                    <div className='mb-3'>
                                        <label htmlFor='sandi_simpan' className='form-label'>Ketik Sandi Untuk Menyimpan <span className='text-danger'>*</span></label>
                                        <input type='password' id="sandi_simpan" className='form-control' placeholder='Kata Sandi Simpan' 
                                        onChange={(e) => setStateLocal(prevState => ({
                                            ...prevState,
                                            input_sandi_simpan: e.target.value
                                        }))} disabled={stateLocal.proses_simpan} />
                                    </div>
                                </div>
                            </div>


                            <div className='my-4 text-center'>
                                
                                <Link to='/profil' className='btn btn-outline-secondary me-2'>&laquo; Batalkan</Link>
                                <button className='btn btn-primary' disabled={stateLocal.proses_simpan}>Simpan</button>
                            </div>
                        </form>
                    </div>

                    <Footer/>
                </>
            )}
        </>
    )
}

export default SettingsProfile