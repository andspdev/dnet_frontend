import { useContext, useEffect, useState } from 'react'
import { Context } from "../includes/GlobalState";
import { Header } from '../includes/Header'
import { Link, useNavigate } from 'react-router-dom';
import ImageUserIcon from '../../assets/images/user-icon.svg'
import ImageLoader from '../../assets/images/loader.svg'
import axios from 'axios'
import { getCookie } from '../includes/Functions';

const SettingsProfile = () =>
{
    const navigate = useNavigate()
    const [ stateLocal, setStateLocal ] = useState({
        is_load_profil: true,
        proses_simpan: false,
        fetch_profil: ''
    })

    const [ stateGlobal ] = useContext(Context)
    
    useEffect(() =>
    {
        document.title = 'Sunting Akun | ' + stateGlobal.title_web
        const get_user = getCookie('user_login')

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
                    fetch_profil: response
                }))
            })
            .catch(error => {
                alert(`Terjadi kesalahan saat mengambil data pengguna. (Error: ${error.message})`)
                console.log('Error Fetch Pengguna: ', error)
            })
        }
    }, [navigate, stateGlobal.url_api, stateGlobal.title_web]);

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
                        {/* <div className='alert alert-success mt-3'>s</div> */}

                        <div className='row mt-5'>
                            <div className='col-md-6 mb-3'>
                                <b>Informasi Akun</b>
                                <p className='text-muted'>Ubah informasi akun Anda dan simpan.</p>

                                <div className='mt-4'>
                                    <div className='mb-3'>
                                        <label htmlFor='nama' className='form-label'>Nama Lengkap <span className='text-danger'>*</span></label>
                                        <input type='text' className='form-control' placeholder='Nama Lengkap' defaultValue={stateLocal.fetch_profil.nama} />
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor='email' className='form-label'>Email <span className='text-danger'>*</span></label>
                                        <input type='email' id="email" className='form-control' placeholder='Alamat Email' defaultValue={stateLocal.fetch_profil.email} />
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-6 mb-3'>
                                <b>Ubah Kata Sandi</b>
                                <p className='text-muted'>Isi form kata sandi untuk merubah kata sandi Anda.</p>

                                <div className='mt-4'>
                                    <div className='mb-3'>
                                        <label htmlFor='sandi_baru' className='form-label'>Kata Sandi Baru <span className='text-danger'>*</span></label>
                                        <input type='password' id="sandi_baru" className='form-control' placeholder='Kata Sandi Baru' />
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor='konfirmasi_sandi' className='form-label'>Konfirmasi Kata Sandi <span className='text-danger'>*</span></label>
                                        <input type='password' id="konfirmasi_sandi" className='form-control' placeholder='Konfirmasi Sandi' />
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-12'>
                                <div className='mb-3'>
                                    <label htmlFor='sandi_simpan' className='form-label'>Ketik Sandi Untuk Menyimpan <span className='text-danger'>*</span></label>
                                    <input type='password' id="sandi_simpan" className='form-control' placeholder='Kata Sandi Simpan' />
                                </div>
                            </div>
                        </div>


                        <div className='my-4 text-center'>
                            
                            <Link to='/profil' className='btn btn-outline-secondary me-2'>&laquo; Batalkan</Link>
                            <button className='btn btn-primary'>Simpan</button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default SettingsProfile