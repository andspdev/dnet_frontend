import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ImageLoader from '../../assets/images/loader.svg'
import axios from "axios"
import { Context } from "../includes/GlobalState"
import { getCookie } from "../includes/Functions"
import { Header } from '../includes/Header'
import { Link } from "react-router-dom"

const LihatTransaksi = () =>
{
    const { id } = useParams()
    const [ stateGlobal ] = useContext(Context)
    const [stateLocal, setStateLocal] = useState({
        is_load_detail: true,
        detail_transaksi: '',
        fetch_transaksi: '',
        load_fetch: true
    })

    useEffect(() =>
    {
        const user_id = getCookie('user_login')

        axios({
            url: `${stateGlobal.url_api}/transaksi_user/${id}`,
            method: 'GET'
        })
        .then(data =>
        {
            const response = data.data

            if (response.pengguna_id !== user_id)
                window.location.href = '/transaksi'
            else
            {
                setStateLocal(prevState => ({
                    ...prevState,
                    is_load_detail: false,
                    detail_transaksi: response
                }))

                document.title = `Detail Transaksi: ${response.transaksi_id} | ${stateGlobal.title_web}`


                axios({
                    url: `${stateGlobal.url_api}/paket_data/${response.paket_id}`,
                    method: 'GET'
                })
                .then(data =>
                {
                    const response = data.data

                    setStateLocal(prevState =>({
                        ...prevState,
                        load_fetch: false,
                        fetch_transaksi: response
                    }))
                })
                .catch(error =>
                {
                    alert(`Terjadi kesalahan saat fetch data paket. (Error: ${error.message})`)
                    console.log('Error fetch data: ', error)
                })
            }
        })
        .catch(error =>
        {
            alert(`Terjadi kesalahan saat mengambil data. (Error: ${error.message})`)
            console.log('Error Detail Transaksi: ', error)            
        })
    }, [id, stateGlobal.url_api, stateGlobal.title_web])


    return(
        <>
        {
            stateLocal.is_load_detail ? (
                <div className="loader-full">
                    <img src={ImageLoader} alt="Loader"/>
                </div>
            ) : (
                <>
                    <Header/>

                    <div className="detail-paket">
                        <div className="title">
                            <h3>Detail Transaksi</h3>
                        </div>

                        <div className="content">
                            {
                                stateLocal.load_fetch ? (
                                    <div className="loader text-center">
                                        <img src={ImageLoader} alt="Loader"/>   
                                    </div>

                                ) : (
                                    <>
                                        <Link to="/transaksi" className="btn btn-secondary mb-4 btn-sm">&laquo; Kembali</Link>

                                        <h5>Transaksi Saya</h5>

                                        <div className="my-4">
                                            <div className="row mb-3">
                                                <div className="col-md-4 mb-2">Transaksi ID</div>
                                                <div className="col-md-8">{stateLocal.detail_transaksi.transaksi_id}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4 mb-2">Dipesan Pada</div>
                                                <div className="col-md-8">{stateLocal.detail_transaksi.created_at}</div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4 mb-2">Status Transaksi</div>
                                                <div className="col-md-8">
                                                    {stateLocal.detail_transaksi.status === 'PENDING' ? (
                                                        <span className="badge bg-warning text-dark">PENDING</span>
                                                    ) : (
                                                        <span className="badge bg-success">PAID</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <hr/>

                                        <h5>Paket Data</h5>
                                        
                                        <div className="my-4">
                                            <div className="row mb-3">
                                                <div className="col-md-4 mb-2">Nama Paket</div>
                                                <div className="col-md-8">{stateLocal.fetch_transaksi.nama_paket}</div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4 mb-2">Operator</div>
                                                <div className="col-md-8">{stateLocal.fetch_transaksi.kategori_kartu.toUpperCase()}</div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4 mb-2">Keterangan</div>
                                                <div className="col-md-8">{stateLocal.fetch_transaksi.keterangan}</div>
                                            </div>
                                        </div>

                                        <div className="d-grid mt-5 ">
                                            <button className="btn btn-primary mb-2">Cek Status Pembayaran</button>
                                            <button className="btn btn-outline-secondary">Lihat Cara Pembayaran</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </>
            )
        }
        </>
    )
}

export default LihatTransaksi