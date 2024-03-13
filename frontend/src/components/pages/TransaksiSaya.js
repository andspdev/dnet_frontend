import { Header } from '../includes/Header'
import Footer from '../includes/Footer'
import { useContext, useEffect, useState } from 'react'
import { Context } from "../includes/GlobalState";
import { getCookie } from '../includes/Functions';
import axios from 'axios';
import ItemTerakhir from "../includes/ItemTerakhir";
import ImageLoader from '../../assets/images/loader.svg'

import { Link } from 'react-router-dom'

const TransaksiSaya = () =>
{
    const [ stateGlobal ] = useContext(Context)
    const [ stateLocal, setStateLocal ] = useState({
        load_transaksi: true,
        data_transaksi_backup: [],
        data_transaksi: [],
        status_pembayaran: 'semua',
        input_pencarian: ''
    })

    useEffect(() =>
    {
        const get_user = getCookie('user_login')

        if (get_user === '')
        {
            window.location.href = '/login';
        }
        else
        {
            document.title = 'Transaksi Saya | '+stateGlobal.title_web

            axios({
                url: `${stateGlobal.url_api}/transaksi_user`,
                method: 'GET'
            })
            .then(data => {
                const response = data.data

                let data_transaksi = []
                response.forEach(element => {
                    if (element.pengguna_id === get_user)
                        data_transaksi.push(element)
                });

                setStateLocal({
                    load_transaksi: false,
                    data_transaksi_backup: data_transaksi,
                    data_transaksi: data_transaksi
                })
            })
            .catch(error => {
                alert(`Terjadi kesalahan saat mengambil data. (Error: ${error.message})`)
                console.log('Error Transaksi: ', error)
            })
        }
    }, [])

    return(
        <>
            <Header/>

            <div className='card-transaksi-saya'>
                <div className='title'>
                    <h3 className='m-0'>Transaksi Saya</h3>
                </div>
                <div className='content'>
                    <div className='row align-items-center'>
                        <div className='col-md-8 mb-3'>
                            <label htmlFor='pencarian' className='form-label'>Pencarian</label>
                            <input type='text' id="pencarian" className='form-control' placeholder='Cari berdasarkan transaksi id ...'/>
                        </div>
                        <div className='col-md-4 mb-3'>
                            <label htmlFor='status_pembayaran' className='form-label'>Status Pembayaran</label>
                            <select className='form-select' id="status_pembayaran">
                                <option value="semua">Semua</option>
                                <option value="pending">- Belum Lunas</option>
                                <option value="lunas">- Lunas</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='content'>

                    {stateLocal.load_transaksi ? (
                        <div className='loader text-center my-3'>
                            <img src={ImageLoader} alt="Loader"/>
                        </div>
                    ) : stateLocal.data_transaksi.length === 0 ? (
                        <p className='text-center'>Tidak ada data transaksi yang ditemukan.</p>
                    ) : (
                        <div className='table-responsive mt-3'>
                            <table className='table table-hover table-stripped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Transaksi ID</th>
                                        <th>Status Pembayaran</th>
                                        <th>Dibuat Pada</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateLocal.data_transaksi.map((value, _) =>
                                        (
                                            <>
                                                <tr>
                                                    <td>{value.transaksi_id}</td>
                                                    <td>
                                                        {value.status === 'PENDING' ? (
                                                            <span className='badge bg-warning text-dark'>PENDING</span>
                                                        ) : (
                                                            <span className='badge bg-success'>PAID</span>
                                                        )}
                                                    </td>
                                                    <td>{value.created_at}</td>
                                                    <td>
                                                        <Link to={'/transaksi/'+value.id} className='btn btn-secondary btn-sm'>Detail</Link>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {stateLocal.data_transaksi.length > 20 ? (
                <Footer/>
            ) : ''}

            <ItemTerakhir/>
        </>
    )
}

export default TransaksiSaya