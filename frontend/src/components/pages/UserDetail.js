import { useContext, useEffect, useState } from 'react'
import { Context } from "../includes/GlobalState";
import { Header } from '../includes/Header'
import { Link, useNavigate } from 'react-router-dom';
import ImageUserIcon from '../../assets/images/user-icon.svg'
import ImageLoader from '../../assets/images/loader.svg'
import axios from 'axios'
import { getCookie, getCurrentDateTime } from '../includes/Functions';

const UserDetail = () =>
{
    const navigate = useNavigate()
    const [ stateLocal, setStateLocal ] = useState({
        is_load_profil: true,
        fetch_profil: '',
        total_transaksi: 0
    })

    const [ stateGlobal ] = useContext(Context)
    
    useEffect(() =>
    {
        document.title = 'Profil Saya | ' + stateGlobal.title_web
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


                axios({
                    url: `${stateGlobal.url_api}/transaksi_user?pengguna_id=${get_user}`,
                    method: 'GET'
                })
                .then(data =>
                {
                    const response = data.data

                    setStateLocal(prevState => ({
                        ...prevState,
                        total_transaksi: response.length
                    }))
                })
            })
            .catch(error => {
                alert(`Terjadi kesalahan saat mengambil data pengguna. (Error: ${error.message})`)
                console.log('Error Fetch Pengguna: ', error)
            })
        }
    }, []);

    return (
        <>
        {
            stateLocal.is_load_profil ? (
                <div className='loader-full'>
                    <img src={ImageLoader} alt="Loader"/>
                </div>
            ): (
                <>
                    <Header/>

                    <div className='container'>
                        <div className='user-profile mt-5'>
                            <div className='row'>
                                <div className='col-md-4 mb-5 text-center'>
                                    <img src={ImageUserIcon} alt={stateLocal.fetch_profil.nama} title={stateLocal.fetch_profil.nama} className='img-user' />
                                </div>

                                <div className='col-md-8 mb-3'>
                                    <h4>Profil Saya</h4>

                                    <div className='my-4 py-2'>
                                        <div className='row mb-3'>
                                            <div className='col-md-4'><span className='fw-bold'>Nama Lengkap</span></div>
                                            <div className='col-md-8'>{stateLocal.fetch_profil.nama}</div>
                                        </div>

                                        <div className='row mb-3'>
                                            <div className='col-md-4'><span className='fw-bold'>Email</span></div>
                                            <div className='col-md-8'>{stateLocal.fetch_profil.email}</div>
                                        </div>

                                        <div className='row mb-3'>
                                            <div className='col-md-4'><span className='fw-bold'>Bergabung Pada</span></div>
                                            <div className='col-md-8'>{getCurrentDateTime(stateLocal.fetch_profil.bergabung_pada)}</div>
                                        </div>

                                        <div className='row mb-5'>
                                            <div className='col-md-4'><span className='fw-bold'>Total Transaksi</span></div>
                                            <div className='col-md-8'>{stateLocal.total_transaksi}</div>
                                        </div>

                                        <Link to="/profil/settings" className='btn btn-primary me-2'>Sunting Akun</Link>
                                        <Link to="/logout" className='btn btn-outline-secondary'>Keluar</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            )
        }
        </>
    )
}

export default UserDetail